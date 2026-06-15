import fs from "node:fs";
import path from "node:path";

import { isLocalPostImage, publicImagePath } from "@/lib/image";
import { getPublicPosts } from "@/lib/posts";

type ImageManifestEntry = {
  id?: string;
  postSlug?: string;
  usage?: string;
  src?: string;
  rawPath?: string;
  altKo?: string;
  captionKo?: string;
  width?: number;
  height?: number;
  format?: string;
  licenseStatus?: string;
  status?: string;
};

type ImageBrief = {
  id?: string;
  postSlug?: string;
  category?: string;
  usage?: string;
  targetPath?: string;
  optimizedPath?: string;
  altKo?: string;
  captionKo?: string;
  style?: string;
  promptKo?: string;
};

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const forbiddenPathSegments = ["/amazon", "/products", "/shop", "/affiliate"];

function readJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function hasKorean(value: string) {
  return /[가-힣]/.test(value);
}

function isDescriptiveKorean(value: string) {
  return value.trim().length >= 8 && hasKorean(value);
}

function publicFileExists(src: string) {
  return fs.existsSync(path.join(root, "public", publicImagePath(src)));
}

function imageReferencesFromContent(content: string) {
  return [
    ...content.matchAll(
      /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)|<img\s+[^>]*src=["']([^"']+)["']|<Image\s+[^>]*src=["']([^"']+)["']|<ArticleImage\s+[^>]*src=["']([^"']+)["']/g,
    ),
  ].map((match) => match[1] ?? match[2] ?? match[3] ?? match[4]);
}

function checkForbiddenPath(label: string, src: string) {
  for (const segment of forbiddenPathSegments) {
    if (src.includes(segment)) {
      errors.push(`${label}: forbidden image path segment ${segment}`);
    }
  }
}

const posts = getPublicPosts();
const heroUsage = new Map<string, string[]>();

for (const post of posts) {
  const heroImage = post.frontmatter.heroImage;
  const heroAlt = post.frontmatter.heroAlt;

  if (!heroImage) {
    errors.push(`${post.slug}: heroImage is required`);
  } else {
    if (!isLocalPostImage(heroImage)) {
      errors.push(`${post.slug}: heroImage must be a safe local WebP path under /images/posts`);
    }

    if (!publicFileExists(heroImage)) {
      errors.push(`${post.slug}: missing hero image file ${heroImage}`);
    }

    checkForbiddenPath(`${post.slug} heroImage`, heroImage);
    heroUsage.set(heroImage, [...(heroUsage.get(heroImage) ?? []), post.slug]);

    const heroBasename = path.basename(heroImage);
    if (!/^[a-z0-9][a-z0-9-]*\.webp$/.test(heroBasename)) {
      warnings.push(`${post.slug}: hero image filename is not SEO-friendly: ${heroBasename}`);
    }
  }

  if (!isDescriptiveKorean(heroAlt)) {
    errors.push(`${post.slug}: heroAlt must be descriptive Korean text`);
  }

  for (const src of imageReferencesFromContent(post.content)) {
    if (/^https?:\/\//i.test(src)) {
      errors.push(`${post.slug}: external inline image URL is not allowed: ${src}`);
      continue;
    }

    if (!isLocalPostImage(src)) {
      errors.push(`${post.slug}: inline image must use /images/posts/*.webp: ${src}`);
      continue;
    }

    if (!publicFileExists(src)) {
      errors.push(`${post.slug}: missing inline image file ${src}`);
    }

    checkForbiddenPath(`${post.slug} inline image`, src);
  }
}

for (const [src, slugs] of heroUsage.entries()) {
  if (slugs.length > 1) {
    warnings.push(`duplicate hero image reuse: ${src} -> ${slugs.join(", ")}`);
  }
}

const manifestPath = path.join(root, "data", "image-assets.json");
const manifestJson = readJsonFile<ImageManifestEntry[] | { assets: ImageManifestEntry[] }>(manifestPath);
const manifestEntries = Array.isArray(manifestJson) ? manifestJson : (manifestJson?.assets ?? []);

if (!manifestJson) {
  errors.push("data/image-assets.json is required");
}

const manifestHeroPosts = new Set(
  manifestEntries
    .filter((entry) => entry.usage === "hero" && entry.postSlug)
    .map((entry) => entry.postSlug),
);

for (const post of posts) {
  if (!manifestHeroPosts.has(post.slug)) {
    errors.push(`${post.slug}: missing hero entry in data/image-assets.json`);
  }
}

for (const entry of manifestEntries) {
  const label = entry.id ?? entry.src ?? "image manifest entry";

  if (!entry.id || !entry.postSlug || !entry.usage || !entry.src) {
    errors.push(`${label}: id, postSlug, usage, and src are required`);
  }

  if (!entry.src || !isLocalPostImage(entry.src)) {
    errors.push(`${label}: manifest src must be a safe local WebP path under /images/posts`);
  } else if (entry.status !== "planned" && !publicFileExists(entry.src)) {
    errors.push(`${label}: manifest src file is missing: ${entry.src}`);
  }

  if (!entry.width || !entry.height || entry.width <= 0 || entry.height <= 0) {
    errors.push(`${label}: manifest width and height are required`);
  }

  if (entry.format !== "webp") {
    errors.push(`${label}: manifest format must be webp`);
  }

  if (!entry.altKo || !isDescriptiveKorean(entry.altKo)) {
    errors.push(`${label}: manifest altKo must be descriptive Korean text`);
  }

  if (entry.captionKo && !hasKorean(entry.captionKo)) {
    errors.push(`${label}: manifest captionKo must be Korean when present`);
  }

  if (entry.rawPath?.startsWith("public/")) {
    errors.push(`${label}: rawPath must not point to a public route`);
  }
}

const briefsPath = path.join(root, "image-briefs", "biz2lab-article-image-briefs.json");
const briefsJson = readJsonFile<ImageBrief[] | { briefs: ImageBrief[] }>(briefsPath);
const briefs = Array.isArray(briefsJson) ? briefsJson : (briefsJson?.briefs ?? []);

if (!briefsJson) {
  errors.push("image-briefs/biz2lab-article-image-briefs.json is required");
}

for (const brief of briefs) {
  const label = brief.id ?? "image brief";

  if (!brief.id || !brief.postSlug || !brief.category || !brief.usage) {
    errors.push(`${label}: id, postSlug, category, and usage are required`);
  }

  if (!brief.targetPath?.startsWith("assets/images/raw/")) {
    errors.push(`${label}: targetPath must be under assets/images/raw`);
  }

  if (!brief.optimizedPath?.startsWith("public/images/posts/") || !brief.optimizedPath.endsWith(".webp")) {
    errors.push(`${label}: optimizedPath must be a public/images/posts WebP path`);
  }

  if (!brief.altKo || !isDescriptiveKorean(brief.altKo)) {
    errors.push(`${label}: altKo must be descriptive Korean text`);
  }

  if (!brief.captionKo || !hasKorean(brief.captionKo)) {
    errors.push(`${label}: captionKo is required and must be Korean`);
  }

  if (!brief.promptKo || !hasKorean(brief.promptKo)) {
    errors.push(`${label}: promptKo is required and must be Korean`);
  }

  const rawPath = brief.targetPath ? path.join(root, brief.targetPath) : "";
  if (rawPath && !fs.existsSync(rawPath)) {
    warnings.push(`${label}: raw image is not generated yet`);
  }

  const optimizedPath = brief.optimizedPath ? path.join(root, brief.optimizedPath) : "";
  if (optimizedPath && !fs.existsSync(optimizedPath)) {
    warnings.push(`${label}: optimized image is not generated yet`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`WARN ${warning}`);
}

console.log(`validate:images PASS (${posts.length} posts, ${manifestEntries.length} manifest entries, ${briefs.length} briefs)`);
