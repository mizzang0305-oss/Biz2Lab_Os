import fs from "node:fs";
import path from "node:path";

import { getArticleImageConcept } from "@/lib/article-image-concepts";
import { isLocalPostImage, publicImagePath } from "@/lib/image";
import { getPublicPosts } from "@/lib/posts";

type OptionalAssetManifestEntry = {
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
  commerceAutoReusable?: boolean;
  status?: string;
};

type PublicManifestEntry = {
  slug?: string;
  postSlug?: string;
  width?: number;
  output?: string;
  src?: string;
  source?: string;
  licenseStatus?: string;
  status?: string;
};

type ImageBrief = {
  id?: string;
  postSlug?: string;
  category?: string;
  usage?: string;
  targetPath?: string;
  rawPath?: string;
  optimizedPath?: string;
  altKo?: string;
  captionKo?: string;
  promptKo?: string;
  providerPromptKo?: string;
  manifestEntry?: OptionalAssetManifestEntry;
};

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const allowedManifestUsages = new Set(["hero", "inline", "hub"]);
const allowedBriefUsages = new Set(["hero", "inline", "hub", "hub-summary"]);
const forbiddenImageTerms = [
  "amazon",
  "products",
  "product",
  "shop",
  "affiliate",
  "commerce",
  "reviews",
  "lotto",
];

function readJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function listJsonFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listJsonFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".json") ? [fullPath] : [];
    })
    .sort();
}

function hasKorean(value: string) {
  return /[\uac00-\ud7a3]/u.test(value);
}

function isDescriptiveKorean(value: string) {
  return value.trim().length >= 8 && hasKorean(value);
}

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
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
  const normalized = src.toLowerCase();
  for (const term of forbiddenImageTerms) {
    if (normalized.includes(term)) {
      errors.push(`${label}: forbidden image path term ${term}`);
    }
  }
}

function checkLocalPublicImage(label: string, src: string, requireFile = true) {
  if (/^https?:\/\//i.test(src)) {
    errors.push(`${label}: external image URL is not allowed: ${src}`);
    return;
  }

  if (!isLocalPostImage(src)) {
    errors.push(`${label}: must use /images/posts/*.webp: ${src}`);
    return;
  }

  if (requireFile && !publicFileExists(src)) {
    errors.push(`${label}: missing image file ${src}`);
  }

  checkForbiddenPath(label, src);
}

function readBriefs(filePath: string): ImageBrief[] {
  const parsed = readJsonFile<ImageBrief[] | { briefs?: ImageBrief[] } | ImageBrief>(filePath);
  if (!parsed) {
    return [];
  }

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if ("briefs" in parsed && Array.isArray(parsed.briefs)) {
    return parsed.briefs;
  }

  if ("id" in parsed) {
    return [parsed as ImageBrief];
  }

  return [];
}

const posts = getPublicPosts();
const heroUsage = new Map<string, string[]>();
let inlineImageCount = 0;

for (const post of posts) {
  const heroImage = post.frontmatter.heroImage;
  const heroAlt = post.frontmatter.heroAlt;

  if (!heroImage) {
    errors.push(`${post.slug}: heroImage is required`);
  } else {
    checkLocalPublicImage(`${post.slug} heroImage`, heroImage);
    if (!heroImage.includes(`${post.slug}-`)) {
      errors.push(`${post.slug}: heroImage path must include the slug`);
    }
    heroUsage.set(heroImage, [...(heroUsage.get(heroImage) ?? []), post.slug]);
  }

  if (!isDescriptiveKorean(heroAlt)) {
    errors.push(`${post.slug}: heroAlt must be descriptive Korean text`);
  }

  const imageConcept = getArticleImageConcept(post.slug);
  if (!imageConcept) {
    errors.push(`${post.slug}: image concept is required`);
  } else if (heroAlt !== imageConcept.altKo) {
    errors.push(`${post.slug}: heroAlt must match image concept altKo`);
  }

  for (const src of imageReferencesFromContent(post.content)) {
    inlineImageCount += 1;
    checkLocalPublicImage(`${post.slug} inline image`, src);
  }
}

for (const [src, slugs] of heroUsage.entries()) {
  if (slugs.length > 1) {
    warnings.push(`approved hero image reuse: ${src} -> ${slugs.join(", ")}`);
  }
}

const publicManifestPath = path.join(root, "public", "images", "posts", "manifest.json");
const publicManifest = readJsonFile<PublicManifestEntry[]>(publicManifestPath) ?? [];

if (!Array.isArray(publicManifest)) {
  errors.push("public/images/posts/manifest.json must be an array when present");
}

for (const entry of Array.isArray(publicManifest) ? publicManifest : []) {
  const src = entry.output ?? entry.src;
  const label = entry.slug ?? entry.postSlug ?? src ?? "public image manifest entry";

  if (!src) {
    errors.push(`${label}: public manifest output or src is required`);
    continue;
  }

  checkLocalPublicImage(`${label} public manifest`, src);

  if (entry.width !== undefined && entry.width <= 0) {
    errors.push(`${label}: public manifest width must be positive`);
  }

  if (entry.status === "active" && entry.licenseStatus === "local-generated-diagram") {
    errors.push(`${label}: rejected local-generated-diagram output must not be active`);
  }
}

const optionalAssetManifestPath = path.join(root, "data", "image-assets.json");
const optionalAssetManifestJson = readJsonFile<
  OptionalAssetManifestEntry[] | { assets?: OptionalAssetManifestEntry[] }
>(optionalAssetManifestPath);
const optionalAssetEntries = Array.isArray(optionalAssetManifestJson)
  ? optionalAssetManifestJson
  : (optionalAssetManifestJson?.assets ?? []);
const optionalManifestIds = new Set<string>();

for (const entry of optionalAssetEntries) {
  const label = entry.id ?? entry.src ?? "optional image asset entry";

  if (entry.id) {
    if (optionalManifestIds.has(entry.id)) {
      errors.push(`${label}: duplicate optional manifest id`);
    }
    optionalManifestIds.add(entry.id);
  }

  if (entry.usage && !allowedManifestUsages.has(entry.usage)) {
    errors.push(`${label}: usage must be hero, inline, or hub`);
  }

  if (entry.src) {
    checkLocalPublicImage(`${label} optional manifest src`, entry.src, entry.status !== "planned");
  }

  if (entry.status === "active" && entry.licenseStatus === "local-generated-diagram") {
    errors.push(`${label}: rejected local-generated-diagram output must not be active`);
  }

  if (entry.rawPath) {
    const normalizedRawPath = normalizeRepoPath(entry.rawPath);
    if (/^https?:\/\//i.test(normalizedRawPath)) {
      errors.push(`${label}: rawPath must not be an external URL`);
    }
    if (normalizedRawPath.startsWith("public/")) {
      errors.push(`${label}: rawPath must not point to a public route`);
    }
    if (entry.status === "active") {
      if (!normalizedRawPath.startsWith("assets/images/raw/")) {
        errors.push(`${label}: active rawPath must stay under assets/images/raw`);
      }
      if (entry.postSlug && !normalizedRawPath.includes(`${entry.postSlug}-`)) {
        errors.push(`${label}: active rawPath must include the post slug`);
      }
      if (!fs.existsSync(path.join(root, normalizedRawPath))) {
        errors.push(`${label}: active rawPath file is missing: ${normalizedRawPath}`);
      }
    }
  }
}

const briefFiles = [
  path.join(root, "image-briefs", "biz2lab-article-image-briefs.json"),
  ...listJsonFiles(path.join(root, "image-briefs", "generated")),
];
let briefCount = 0;

for (const briefFile of briefFiles) {
  for (const brief of readBriefs(briefFile)) {
    briefCount += 1;
    const label = `${normalizeRepoPath(path.relative(root, briefFile))}:${brief.id ?? brief.postSlug ?? "brief"}`;

    if (!brief.id || !brief.postSlug || !brief.category || !brief.usage) {
      errors.push(`${label}: id, postSlug, category, and usage are required`);
    }

    if (brief.usage && !allowedBriefUsages.has(brief.usage)) {
      errors.push(`${label}: usage must be hero, inline, hub, or hub-summary`);
    }

    const rawPath = brief.targetPath ?? brief.rawPath ?? brief.manifestEntry?.rawPath;
    if (!rawPath?.startsWith("assets/images/raw/")) {
      errors.push(`${label}: raw path must stay under assets/images/raw`);
    }

    const optimizedPath = brief.optimizedPath ?? brief.manifestEntry?.src;
    if (!optimizedPath) {
      errors.push(`${label}: optimized path is required`);
    } else {
      const normalizedOptimizedPath = optimizedPath.replace(/^public/, "");
      checkLocalPublicImage(`${label} optimized path`, normalizedOptimizedPath, false);
    }

    if (!brief.altKo || !isDescriptiveKorean(brief.altKo)) {
      errors.push(`${label}: altKo must be descriptive Korean text`);
    }

    if (!brief.captionKo || !hasKorean(brief.captionKo)) {
      errors.push(`${label}: captionKo is required and must be Korean`);
    }

    const prompt = brief.providerPromptKo ?? brief.promptKo ?? "";
    if (!prompt.trim()) {
      errors.push(`${label}: prompt text is required`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`WARN ${warning}`);
}

console.log(
  `validate:images PASS (${posts.length} posts, ${inlineImageCount} inline references, ${publicManifest.length} public manifest entries, ${optionalAssetEntries.length} optional asset entries, ${briefCount} briefs)`,
);
