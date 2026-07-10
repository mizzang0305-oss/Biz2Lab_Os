import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const MIN_CONTENT_CHARS = 2500;
const MAX_PAIR_SIMILARITY = 0.4;
const REPEATED_PARAGRAPH_MIN_LENGTH = 100;
const REPEATED_PARAGRAPH_OWNER_LIMIT = 3;
const OVERUSED_HEADING_OWNER_LIMIT = 5;

const allowedSharedHeadings = new Set([
  "FAQ",
  "무료 오픈소스 자동화 도구 시리즈",
  "함께 보면 좋은 글",
]);

const invalidParticleFragments = [
  "설계은",
  "설계을",
  "단계을",
  "구조은",
  "구조을",
  "관리은",
  "관리을",
  "자동화은",
  "자동화을",
  "목록화은",
  "목록화을",
  "축소은",
  "축소을",
  "지식창고은",
  "지식창고을",
  "정리은",
  "정리을",
  "악화을",
  "Appsmith을",
  "Crawl4AI을",
  "Dify을",
  "Directus을",
  "Flowise을",
  "Langflow을",
  "Metabase을",
  "Open WebUI을",
  "PocketBase을",
  "PostHog을",
  "Redash을",
  "Apache Superset는",
  "Apache Superset가",
  "Apache Superset를",
  "Huginn는",
  "Huginn가",
  "Huginn를",
  "n8n는",
  "n8n가",
  "n8n를",
  "OpenCut는",
  "OpenCut가",
  "OpenCut를",
  "Plausible는",
  "Plausible가",
  "Plausible를",
  "Windmill는",
  "Windmill가",
  "Windmill를",
  "PG/VAN는",
  "PG/VAN가",
  "PG/VAN를",
];

export type ContentOriginalityIssue = {
  type:
    | "thin-content"
    | "empty-section"
    | "repeated-paragraph"
    | "overused-heading"
    | "high-similarity"
    | "particle-error";
  message: string;
  slugs: string[];
};

export type ContentOriginalityAudit = {
  postCount: number;
  minContentChars: number;
  repeatedLongParagraphGroups: number;
  overusedHeadingGroups: number;
  maxPairSimilarity: number;
  particleErrorCount: number;
  emptySectionCount: number;
  issues: ContentOriginalityIssue[];
};

type MarkdownSection = {
  heading: string;
  body: string;
};

type AuditedPost = {
  slug: string;
  raw: string;
  content: string;
  headings: string[];
  sections: MarkdownSection[];
  paragraphs: string[];
  shingles: Set<string>;
};

function walkMarkdownFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkMarkdownFiles(fullPath);
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    })
    .sort();
}

function normalizeContent(value: string) {
  return value
    .toLowerCase()
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[*_>#|:[\](){},.!?'"~\-/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasHangulBatchim(character: string) {
  const code = character.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
}

function invalidObjectParticles(raw: string) {
  return Array.from(raw.matchAll(/([가-힣]+)(을|를)(?=[\s,.)\]:'"]|$)/g))
    .map((match) => {
      const noun = match[1];
      const particle = match[2];
      const expected = hasHangulBatchim(noun.at(-1) ?? "") ? "을" : "를";
      return particle === expected ? null : `${noun}${particle} -> ${noun}${expected}`;
    })
    .filter((value): value is string => Boolean(value));
}

function extractProseParagraphs(content: string) {
  return content
    .split(/\r?\n\s*\r?\n/)
    .map((part) => part.trim())
    .filter(
      (part) =>
        part.length >= 90 &&
        !part.startsWith("#") &&
        !part.startsWith("|") &&
        !part.startsWith("- ") &&
        !part.startsWith("![") &&
        !/^\d+\.\s/.test(part),
    )
    .map(normalizeContent)
    .filter((part) => part.length >= 70);
}

function extractH2Sections(content: string): MarkdownSection[] {
  const matches = [...content.matchAll(/^##\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const headingStart = match.index ?? 0;
    const bodyStart = headingStart + match[0].length;
    const bodyEnd = matches[index + 1]?.index ?? content.length;

    return {
      heading: match[1].trim(),
      body: content.slice(bodyStart, bodyEnd).trim(),
    };
  });
}

function buildShingles(content: string, size = 5) {
  const tokens = normalizeContent(content)
    .split(" ")
    .filter((token) => token.length > 1);
  const shingles = new Set<string>();

  for (let index = 0; index <= tokens.length - size; index += 1) {
    shingles.add(tokens.slice(index, index + size).join(" "));
  }

  return shingles;
}

function jaccardSimilarity(left: Set<string>, right: Set<string>) {
  let intersection = 0;
  for (const value of left) {
    if (right.has(value)) intersection += 1;
  }

  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function loadPublishedPosts(rootDir: string): AuditedPost[] {
  const contentRoot = path.join(rootDir, "content", "ko");

  return walkMarkdownFiles(contentRoot)
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      return { raw, parsed };
    })
    .filter(
      ({ parsed }) =>
        parsed.data.locale === "ko" &&
        parsed.data.status === "published" &&
        parsed.data.draft === false,
    )
    .map(({ raw, parsed }) => ({
      slug: String(parsed.data.slug),
      raw,
      content: parsed.content.trim(),
      headings: Array.from(parsed.content.matchAll(/^#{2,3}\s+(.+)$/gm), (match) => match[1].trim()),
      sections: extractH2Sections(parsed.content),
      paragraphs: extractProseParagraphs(parsed.content),
      shingles: buildShingles(parsed.content),
    }));
}

export function auditContentOriginality(rootDir = process.cwd()): ContentOriginalityAudit {
  const posts = loadPublishedPosts(rootDir);
  const issues: ContentOriginalityIssue[] = [];
  const headingOwners = new Map<string, string[]>();
  const paragraphOwners = new Map<string, string[]>();

  for (const post of posts) {
    if (post.content.length < MIN_CONTENT_CHARS) {
      issues.push({
        type: "thin-content",
        message: `${post.slug} has ${post.content.length} content characters`,
        slugs: [post.slug],
      });
    }

    for (const section of post.sections) {
      if (section.body.length === 0) {
        issues.push({
          type: "empty-section",
          message: `${post.slug} has an empty H2 section: ${section.heading}`,
          slugs: [post.slug],
        });
      }
    }

    for (const heading of new Set(post.headings)) {
      headingOwners.set(heading, [...(headingOwners.get(heading) ?? []), post.slug]);
    }

    for (const paragraph of new Set(post.paragraphs)) {
      paragraphOwners.set(paragraph, [...(paragraphOwners.get(paragraph) ?? []), post.slug]);
    }

    for (const fragment of invalidParticleFragments) {
      if (post.raw.includes(fragment)) {
        issues.push({
          type: "particle-error",
          message: `${post.slug} contains invalid phrase: ${fragment}`,
          slugs: [post.slug],
        });
      }
    }

    for (const mismatch of invalidObjectParticles(post.raw)) {
      issues.push({
        type: "particle-error",
        message: `${post.slug} contains invalid object particle: ${mismatch}`,
        slugs: [post.slug],
      });
    }
  }

  const repeatedParagraphs = [...paragraphOwners.entries()].filter(
    ([paragraph, owners]) =>
      paragraph.length >= REPEATED_PARAGRAPH_MIN_LENGTH &&
      owners.length >= REPEATED_PARAGRAPH_OWNER_LIMIT,
  );
  for (const [paragraph, owners] of repeatedParagraphs) {
    issues.push({
      type: "repeated-paragraph",
      message: `Long paragraph is repeated across ${owners.length} posts: ${paragraph.slice(0, 120)}`,
      slugs: owners,
    });
  }

  const overusedHeadings = [...headingOwners.entries()].filter(
    ([heading, owners]) =>
      owners.length >= OVERUSED_HEADING_OWNER_LIMIT && !allowedSharedHeadings.has(heading),
  );
  for (const [heading, owners] of overusedHeadings) {
    issues.push({
      type: "overused-heading",
      message: `Heading is shared across ${owners.length} posts: ${heading}`,
      slugs: owners,
    });
  }

  let maxPairSimilarity = 0;
  for (let leftIndex = 0; leftIndex < posts.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < posts.length; rightIndex += 1) {
      const left = posts[leftIndex];
      const right = posts[rightIndex];
      const similarity = jaccardSimilarity(left.shingles, right.shingles);
      maxPairSimilarity = Math.max(maxPairSimilarity, similarity);

      if (similarity > MAX_PAIR_SIMILARITY) {
        issues.push({
          type: "high-similarity",
          message: `${left.slug} and ${right.slug} have similarity ${similarity.toFixed(3)}`,
          slugs: [left.slug, right.slug],
        });
      }
    }
  }

  return {
    postCount: posts.length,
    minContentChars: Math.min(...posts.map((post) => post.content.length)),
    repeatedLongParagraphGroups: repeatedParagraphs.length,
    overusedHeadingGroups: overusedHeadings.length,
    maxPairSimilarity: Number(maxPairSimilarity.toFixed(3)),
    particleErrorCount: issues.filter((issue) => issue.type === "particle-error").length,
    emptySectionCount: issues.filter((issue) => issue.type === "empty-section").length,
    issues,
  };
}
