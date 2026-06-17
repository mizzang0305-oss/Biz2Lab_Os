import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import {
  articleImageConceptEntries,
  getArticleImageConcept,
} from "@/lib/article-image-concepts";
import { renderArticleHeroSvg } from "@/lib/article-image-renderer";
import { getPublicPosts } from "@/lib/posts";

type BriefRecord = Record<string, unknown> & {
  id?: string;
  postSlug?: string;
  usage?: string;
  manifestEntry?: Record<string, unknown>;
};

const root = process.cwd();
const contentRoot = path.join(root, "content", "ko");
const rawDir = path.join(root, "assets", "images", "raw");

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkMarkdownFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    })
    .sort();
}

function markdownFilesBySlug() {
  const bySlug = new Map<string, string>();
  for (const filePath of walkMarkdownFiles(contentRoot)) {
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    if (typeof parsed.data.slug === "string") {
      bySlug.set(parsed.data.slug, filePath);
    }
  }
  return bySlug;
}

function replaceHeroAlt(filePath: string, altKo: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  if (!/^heroAlt:.*$/m.test(raw)) {
    throw new Error(`${normalizeRepoPath(path.relative(root, filePath))}: heroAlt line not found`);
  }
  const next = raw.replace(/^heroAlt:.*$/m, `heroAlt: ${altKo}`);
  if (next !== raw) {
    fs.writeFileSync(filePath, next, "utf8");
  }
}

function updateBriefRecord(brief: BriefRecord) {
  if (!brief.postSlug || brief.usage !== "hero") {
    return brief;
  }

  const concept = getArticleImageConcept(brief.postSlug);
  if (!concept) {
    return brief;
  }

  const rawExt = concept.retainedPremium ? "png" : "svg";
  const rawPath = `assets/images/raw/${concept.slug}-hero.${rawExt}`;
  const optimizedPath = `public/images/posts/${concept.slug}-hero.webp`;
  const providerPromptKo = [
    `Biz2Lab ${concept.category} 글을 위한 로컬 hero 이미지.`,
    concept.conceptKo,
    `이미지 안에는 글 제목을 넣지 않고 ${concept.labels.join(", ")} 같은 짧은 라벨만 사용한다.`,
    "실제 회사명, 로고, 사람 얼굴, 개인정보, 결제정보, 가짜 스크린샷은 넣지 않는다.",
  ].join(" ");

  return {
    ...brief,
    targetPath: rawPath,
    optimizedPath,
    altKo: concept.altKo,
    captionKo: concept.captionKo,
    style: `${concept.visualFamily}, Korean business editorial SVG, minimal text, no title inside image`,
    promptKo: providerPromptKo,
    providerPromptKo,
    negativePromptKo:
      "실제 로고, 실명, 고객 정보, 계좌 정보, 카드 정보, 사람 얼굴, 외부 URL, 워터마크, 읽기 어려운 작은 글자, 글 제목 대형 텍스트",
    visualReferenceStyle:
      "Korean business automation editorial illustration, clean SaaS/business visual, light background, minimal text",
    composition: concept.conceptKo,
    categoryStyle: `${concept.category} 카테고리 전용 ${concept.visualFamily} 구성`,
    expectedOutput: concept.retainedPremium
      ? "기존 premium PNG 원본과 hero WebP 유지"
      : "1200x675 SVG raw와 WebP hero image",
    textPolicy:
      "이미지 안에는 글 제목을 넣지 않고 짧은 상태 라벨만 사용한다. 설명은 alt와 caption, 본문에서 제공한다.",
    localOnly: true,
    visualDifferentiationHint: `${concept.slug} 전용 ${concept.visualFamily}: ${concept.conceptKo}`,
    filename: `${concept.slug}-hero.${rawExt}`,
    rawPath,
    manifestEntry: brief.manifestEntry
      ? {
          ...brief.manifestEntry,
          id: `${concept.slug}-hero`,
          project: "biz2lab",
          postSlug: concept.slug,
          usage: "hero",
          src: `/images/posts/${concept.slug}-hero.webp`,
          rawPath,
          altKo: concept.altKo,
          captionKo: concept.captionKo,
          width: 1200,
          height: 675,
          format: "webp",
        }
      : brief.manifestEntry,
  };
}

function updateJsonFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
  let next: unknown = parsed;

  if (Array.isArray(parsed)) {
    next = parsed.map((entry) =>
      entry && typeof entry === "object" ? updateBriefRecord(entry as BriefRecord) : entry,
    );
  } else if (parsed && typeof parsed === "object" && "briefs" in parsed) {
    const container = parsed as { briefs?: unknown[] };
    next = {
      ...container,
      briefs: Array.isArray(container.briefs)
        ? container.briefs.map((entry) =>
            entry && typeof entry === "object" ? updateBriefRecord(entry as BriefRecord) : entry,
          )
        : container.briefs,
    };
  } else if (parsed && typeof parsed === "object") {
    next = updateBriefRecord(parsed as BriefRecord);
  }

  fs.writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return true;
}

function main() {
  const posts = getPublicPosts();
  const postSlugs = new Set(posts.map((post) => post.slug));
  const conceptSlugs = new Set(articleImageConceptEntries.map((concept) => concept.slug));
  const contentBySlug = markdownFilesBySlug();
  let rawWritten = 0;
  let markdownUpdated = 0;
  let jsonUpdated = 0;

  for (const post of posts) {
    if (!conceptSlugs.has(post.slug)) {
      throw new Error(`${post.slug}: missing image concept`);
    }
  }

  for (const concept of articleImageConceptEntries) {
    if (!postSlugs.has(concept.slug)) {
      continue;
    }

    const contentPath = contentBySlug.get(concept.slug);
    if (!contentPath) {
      throw new Error(`${concept.slug}: content file not found`);
    }
    replaceHeroAlt(contentPath, concept.altKo);
    markdownUpdated += 1;

    if (!concept.retainedPremium) {
      fs.mkdirSync(rawDir, { recursive: true });
      const rawPath = path.join(rawDir, `${concept.slug}-hero.svg`);
      fs.writeFileSync(rawPath, `${renderArticleHeroSvg(concept)}\n`, "utf8");
      rawWritten += 1;
    }

    const generatedBriefPath = path.join(root, "image-briefs", "generated", `${concept.slug}-hero.json`);
    if (updateJsonFile(generatedBriefPath)) {
      jsonUpdated += 1;
    }
  }

  if (updateJsonFile(path.join(root, "image-briefs", "biz2lab-article-image-briefs.json"))) {
    jsonUpdated += 1;
  }

  console.log(
    `repair:article-hero-images PASS (posts=${posts.length}, rawWritten=${rawWritten}, markdownUpdated=${markdownUpdated}, jsonUpdated=${jsonUpdated})`,
  );
}

main();
