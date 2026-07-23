import fs from "node:fs";
import path from "node:path";

import { publicImagePath } from "@/lib/image";
import {
  approvedPremiumImageSlugs,
  getPremiumImageStatus,
  isPremiumImageForPost,
  premiumCandidateLicenseStatuses,
  premiumCandidateVisualApprovalStatuses,
  shouldRenderArticleHeroImage,
  shouldRenderCardImage,
} from "@/lib/images/premium-image-policy";
import { getPublicPosts } from "@/lib/posts";

type ManifestEntry = {
  id?: string;
  postSlug?: string;
  usage?: string;
  output?: string;
  src?: string;
  rawPath?: string;
  licenseStatus?: string;
  visualApprovalStatus?: string;
  status?: string;
};

const root = process.cwd();
const errors: string[] = [];
const infos: string[] = [];
const forbiddenPathTerms = [
  "amazon",
  "product",
  "products",
  "shop",
  "affiliate",
  "commerce",
  "reviews",
  "lotto",
] as const;

function repoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function readJson<T>(filePath: string): T | null {
  const fullPath = path.join(root, filePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
}

function existsPublicImage(src: string) {
  return fs.existsSync(path.join(root, "public", publicImagePath(src)));
}

function normalizedImageSource(entry: ManifestEntry) {
  return entry.output ?? entry.src ?? "";
}

function stripStructuralPathToken(value: string, structuralToken?: string) {
  if (!structuralToken) {
    return value.toLowerCase();
  }

  return value.toLowerCase().replaceAll(structuralToken.toLowerCase(), "");
}

function checkForbiddenPath(label: string, value: string | undefined, structuralToken?: string) {
  if (!value) {
    return;
  }

  if (/^https?:\/\//i.test(value)) {
    errors.push(`${label}: external image URL is not allowed: ${value}`);
  }

  const normalized = stripStructuralPathToken(value, structuralToken);
  for (const term of forbiddenPathTerms) {
    if (normalized.includes(term)) {
      errors.push(`${label}: forbidden image path term ${term}`);
    }
  }
}

function entriesForSlug(entries: ManifestEntry[], slug: string) {
  return entries.filter((entry) => entry.postSlug === slug);
}

const posts = getPublicPosts();
const approvedSlugSet = new Set<string>(approvedPremiumImageSlugs);
const publicManifest = readJson<ManifestEntry[]>("public/images/posts/manifest.json") ?? [];

if (!Array.isArray(publicManifest)) {
  errors.push("public/images/posts/manifest.json must be an array");
}

for (const post of posts) {
  const status = getPremiumImageStatus(post.slug);
  const isApproved = approvedSlugSet.has(post.slug);
  const rendersCardImage = shouldRenderCardImage(post);
  const rendersArticleHero = shouldRenderArticleHeroImage(post);

  checkForbiddenPath(`${post.slug} heroImage`, post.frontmatter.heroImage, post.slug);

  if (isApproved) {
    const rawEntries = entriesForSlug(publicManifest, post.slug);
    const heroEntry = rawEntries.find((entry) => normalizedImageSource(entry) === post.frontmatter.heroImage);

    if (status !== "approved") {
      errors.push(`${post.slug}: TOP3 image status must be approved`);
    }
    if (!isPremiumImageForPost(post.slug, post.frontmatter.heroImage)) {
      errors.push(`${post.slug}: TOP3 hero image is not recognized as premium`);
    }
    if (!rendersCardImage || !rendersArticleHero) {
      errors.push(`${post.slug}: TOP3 premium image must render in card and article hero`);
    }
    if (!existsPublicImage(post.frontmatter.heroImage)) {
      errors.push(`${post.slug}: missing TOP3 public hero asset ${post.frontmatter.heroImage}`);
    }
    if (!heroEntry) {
      errors.push(`${post.slug}: TOP3 hero image missing from public image manifest`);
    } else if (!heroEntry.rawPath?.endsWith(".png")) {
      errors.push(`${post.slug}: approved premium image must come from a PNG raw asset`);
    }

    infos.push(`APPROVED ${post.slug}: ${post.frontmatter.heroImage}`);
    continue;
  }

  if (status !== "pending") {
    errors.push(`${post.slug}: non-TOP3 public post should stay pending until premium approval`);
  }
  if (!rendersCardImage) {
    errors.push(`${post.slug}: non-TOP3 post should render its standard image in public card grids`);
  }
  if (!rendersArticleHero) {
    errors.push(`${post.slug}: non-TOP3 post should render its standard article hero image`);
  }

  for (const entry of entriesForSlug(publicManifest, post.slug)) {
    const src = normalizedImageSource(entry);
    checkForbiddenPath(`${post.slug} manifest image`, src, post.slug);
    checkForbiddenPath(`${post.slug} manifest rawPath`, entry.rawPath, post.slug);

    if (entry.rawPath?.endsWith(".svg") && getPremiumImageStatus(post.slug) === "approved") {
      errors.push(`${post.slug}: fallback SVG must not be marked premium`);
    }
    if (
      entry.licenseStatus &&
      premiumCandidateLicenseStatuses.includes(
        entry.licenseStatus as (typeof premiumCandidateLicenseStatuses)[number],
      )
    ) {
      errors.push(`${post.slug}: premium license status is only accepted after explicit TOP3-style approval`);
    }
    if (
      entry.visualApprovalStatus &&
      premiumCandidateVisualApprovalStatuses.includes(
        entry.visualApprovalStatus as (typeof premiumCandidateVisualApprovalStatuses)[number],
      )
    ) {
      errors.push(`${post.slug}: visual approval status cannot make non-TOP3 images public yet`);
    }
  }

  infos.push(`PENDING ${post.slug}: standard image renders in public card and article hero`);
}

const premiumSources = posts
  .filter((post) => shouldRenderCardImage(post))
  .map((post) => post.frontmatter.heroImage);
const duplicatePremiumSources = premiumSources.filter(
  (src, index) => premiumSources.indexOf(src) !== index,
);

if (duplicatePremiumSources.length > 0) {
  errors.push(`duplicate premium mapping: ${duplicatePremiumSources.join(", ")}`);
}

for (const entry of publicManifest) {
  checkForbiddenPath(entry.id ?? "public manifest entry", normalizedImageSource(entry), entry.postSlug ?? entry.id);
  checkForbiddenPath(entry.id ?? "public manifest rawPath", entry.rawPath, entry.postSlug ?? entry.id);
}

const forbiddenFiles = [
  path.join(root, "public", "google-site-verification.html"),
];
for (const filePath of forbiddenFiles) {
  if (fs.existsSync(filePath)) {
    errors.push(`forbidden Google setup file exists: ${repoPath(path.relative(root, filePath))}`);
  }
}

for (const info of infos) {
  console.log(info);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `audit:premium-images PASS (${approvedPremiumImageSlugs.length} approved premium, ${
    posts.length - approvedPremiumImageSlugs.length
  } pending standard)`,
);
