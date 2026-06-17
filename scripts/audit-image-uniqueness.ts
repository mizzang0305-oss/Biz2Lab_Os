import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import {
  getArticleImageConcept,
  premiumArticleImageSlugs,
} from "@/lib/article-image-concepts";
import { getFeaturedHomePosts, getPublicPosts } from "@/lib/posts";

type AssetEntry = {
  id?: string;
  postSlug?: string;
  usage?: string;
  src?: string;
  output?: string;
  rawPath?: string;
};

type FileRecord = {
  label: string;
  slug: string;
  kind: "raw" | "public";
  path: string;
  exists: boolean;
  size: number | null;
  hash: string | null;
};

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const infos: string[] = [];
const genericTemplatePatterns = [
  /Hero for practical operations/i,
  /Article workflow/i,
  /문제[\s\S]{0,500}기준[\s\S]{0,500}실행[\s\S]{0,500}검토[\s\S]{0,500}개선/,
];
const premiumSlugSet = new Set<string>(premiumArticleImageSlugs);

function repoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function absolutePath(filePath: string) {
  return path.join(root, filePath);
}

function readJson<T>(filePath: string): T | null {
  const fullPath = absolutePath(filePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
}

function hashFile(filePath: string) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fileRecord(label: string, slug: string, kind: FileRecord["kind"], candidatePath: string): FileRecord {
  const fullPath = absolutePath(candidatePath);
  if (!fs.existsSync(fullPath)) {
    return {
      label,
      slug,
      kind,
      path: repoPath(candidatePath),
      exists: false,
      size: null,
      hash: null,
    };
  }

  const stats = fs.statSync(fullPath);
  return {
    label,
    slug,
    kind,
    path: repoPath(candidatePath),
    exists: true,
    size: stats.size,
    hash: hashFile(fullPath),
  };
}

function groupBy<T>(items: T[], keyForItem: (item: T) => string | null) {
  const grouped = new Map<string, T[]>();
  for (const item of items) {
    const key = keyForItem(item);
    if (!key) {
      continue;
    }
    grouped.set(key, [...(grouped.get(key) ?? []), item]);
  }
  return grouped;
}

function normalizeAssetEntries(raw: unknown): AssetEntry[] {
  if (!raw) {
    return [];
  }
  if (Array.isArray(raw)) {
    return raw as AssetEntry[];
  }
  if (typeof raw === "object" && raw !== null && "assets" in raw) {
    const maybeAssets = (raw as { assets?: unknown }).assets;
    return Array.isArray(maybeAssets) ? (maybeAssets as AssetEntry[]) : [];
  }
  return [];
}

function rawPathForSlug(slug: string) {
  const concept = getArticleImageConcept(slug);
  const extension = concept?.retainedPremium ? "png" : "svg";
  return `assets/images/raw/${slug}-hero.${extension}`;
}

function publicCandidatesForSlug(slug: string) {
  return [
    `public/images/posts/${slug}-1200.webp`,
    `public/images/posts/${slug}-800.webp`,
    `public/images/posts/${slug}-400.webp`,
    `public/images/posts/${slug}-hero.webp`,
  ];
}

function collectFileRecords() {
  return getPublicPosts().flatMap<FileRecord>((post) => [
    fileRecord(`${post.slug}-raw`, post.slug, "raw", rawPathForSlug(post.slug)),
    ...publicCandidatesForSlug(post.slug).map((candidate) =>
      fileRecord(`${post.slug}:${path.basename(candidate)}`, post.slug, "public", candidate),
    ),
  ]);
}

function checkExactHashDuplicates(records: FileRecord[]) {
  for (const [hash, matches] of groupBy(records.filter((record) => record.exists), (record) => record.hash)) {
    const uniqueSlugs = new Set(matches.map((match) => match.slug));
    if (uniqueSlugs.size > 1) {
      errors.push(
        `duplicate file hash ${hash}: ${matches.map((match) => `${match.slug}:${match.path}`).join(", ")}`,
      );
    }
  }
}

function structuralSignature(svg: string) {
  const family = svg.match(/data-family="([^"]+)"/)?.[1] ?? "no-family";
  const tags = [...svg.matchAll(/<([a-zA-Z]+)\b/g)].map((match) => match[1]).join("-");
  const rectCount = (svg.match(/<rect\b/g) ?? []).length;
  const circleCount = (svg.match(/<circle\b/g) ?? []).length;
  const pathCount = (svg.match(/<path\b/g) ?? []).length;
  return `${family}:${rectCount}:${circleCount}:${pathCount}:${tags}`;
}

function checkRawSvgQuality() {
  const posts = getPublicPosts();
  const structuralRecords: { slug: string; signature: string }[] = [];

  for (const post of posts) {
    const concept = getArticleImageConcept(post.slug);
    if (!concept) {
      errors.push(`${post.slug}: missing image concept`);
      continue;
    }

    if (!post.frontmatter.heroImage.includes(`${post.slug}-`)) {
      errors.push(`${post.slug}: heroImage path must include slug`);
    }

    if (post.frontmatter.heroAlt !== concept.altKo) {
      errors.push(`${post.slug}: heroAlt does not match concept altKo`);
    }

    if (concept.retainedPremium) {
      continue;
    }

    const rawPath = absolutePath(rawPathForSlug(post.slug));
    if (!fs.existsSync(rawPath)) {
      errors.push(`${post.slug}: missing raw SVG ${repoPath(path.relative(root, rawPath))}`);
      continue;
    }

    const svg = fs.readFileSync(rawPath, "utf8");
    structuralRecords.push({ slug: post.slug, signature: structuralSignature(svg) });

    if (!svg.includes(`data-family="${concept.visualFamily}"`)) {
      errors.push(`${post.slug}: raw SVG missing visual family ${concept.visualFamily}`);
    }

    for (const pattern of genericTemplatePatterns) {
      if (pattern.test(svg)) {
        errors.push(`${post.slug}: raw SVG still contains old generic workflow template`);
      }
    }

    if (new RegExp(escapeRegExp(post.frontmatter.title)).test(svg)) {
      errors.push(`${post.slug}: raw SVG contains the article title`);
    }
  }

  for (const [signature, matches] of groupBy(structuralRecords, (record) => record.signature)) {
    if (matches.length > 3) {
      errors.push(
        `structural duplicate risk: ${signature} shared by ${matches.map((match) => match.slug).join(", ")}`,
      );
    }
  }
}

function checkConceptDiversity() {
  const posts = getPublicPosts();
  const familyCounts = new Map<string, string[]>();

  for (const post of posts) {
    const concept = getArticleImageConcept(post.slug);
    if (!concept) {
      errors.push(`${post.slug}: missing image concept`);
      continue;
    }
    familyCounts.set(concept.visualFamily, [...(familyCounts.get(concept.visualFamily) ?? []), post.slug]);
  }

  const nonPremiumFamilies = new Set(
    posts
      .filter((post) => !premiumSlugSet.has(post.slug))
      .map((post) => getArticleImageConcept(post.slug)?.visualFamily)
      .filter(Boolean),
  );

  if (nonPremiumFamilies.size < 12) {
    errors.push(`non-TOP3 visual family diversity too low: ${nonPremiumFamilies.size}`);
  }

  for (const [family, slugs] of familyCounts) {
    if (slugs.length > 2) {
      errors.push(`visualFamily ${family} reused too often: ${slugs.join(", ")}`);
    }
  }

  const firstTen = getFeaturedHomePosts(10);
  const firstTenFamilies = firstTen.map((post) => getArticleImageConcept(post.slug)?.visualFamily ?? "missing");
  if (new Set(firstTenFamilies).size < 8) {
    errors.push(`first 10 cards need more visual diversity: ${firstTenFamilies.join(", ")}`);
  }

  for (let index = 1; index < firstTenFamilies.length; index += 1) {
    if (firstTenFamilies[index] === firstTenFamilies[index - 1]) {
      errors.push(`adjacent first-card visual family repeated: ${firstTen[index - 1].slug}, ${firstTen[index].slug}`);
    }
  }
}

function checkDuplicateManifestFields(entries: AssetEntry[], sourceLabel: string) {
  const scoped = entries.filter((entry) => entry.postSlug && getArticleImageConcept(entry.postSlug));

  for (const [src, matches] of groupBy(scoped, (entry) => entry.src ?? entry.output ?? null)) {
    const slugs = new Set(matches.map((match) => match.postSlug).filter(Boolean));
    if (slugs.size > 1) {
      errors.push(`${sourceLabel}: duplicate optimized src assigned to multiple slugs: ${src}`);
    }
  }

  for (const [rawPath, matches] of groupBy(scoped, (entry) => entry.rawPath ?? null)) {
    const slugs = new Set(matches.map((match) => match.postSlug).filter(Boolean));
    if (slugs.size > 1) {
      errors.push(`${sourceLabel}: duplicate rawPath assigned to multiple slugs: ${rawPath}`);
    }
  }
}

const records = collectFileRecords();
for (const record of records.filter((item) => !item.exists)) {
  errors.push(`missing ${record.kind} image: ${record.path}`);
}

checkExactHashDuplicates(records);
checkRawSvgQuality();
checkConceptDiversity();
checkDuplicateManifestFields(normalizeAssetEntries(readJson<unknown>("data/image-assets.json")), "data/image-assets.json");
checkDuplicateManifestFields(
  normalizeAssetEntries(readJson<unknown>("public/images/posts/manifest.json")),
  "public/images/posts/manifest.json",
);

for (const record of records) {
  infos.push(
    `${record.exists ? "FOUND" : "MISSING"} ${record.kind} ${record.slug}: ${record.path}${
      record.size === null ? "" : ` (${record.size} bytes)`
    }`,
  );
}

for (const [family, matches] of groupBy(
  getPublicPosts().map((post) => ({
    slug: post.slug,
    family: getArticleImageConcept(post.slug)?.visualFamily ?? null,
  })),
  (record) => record.family,
)) {
  infos.push(`CONCEPT ${family}: ${matches.map((match) => match.slug).join(", ")}`);
}

for (const info of infos) {
  console.log(info);
}
for (const warning of warnings) {
  console.warn(`WARN ${warning}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const suffix = warnings.length > 0 ? ` with ${warnings.length} warning(s)` : "";
console.log(`audit:image-uniqueness PASS${suffix}`);
