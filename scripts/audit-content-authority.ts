import fs from "node:fs";
import path from "node:path";

import { getPublicPosts } from "@/lib/posts";

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const protectedAdminRoot = path.join(root, "app", "admin");
const protectedAdminRoute = path.join(protectedAdminRoot, "content-automation");
const protectedAdminApiRoot = path.join(root, "app", "api", "admin", "content-automation");

const top3Slugs = new Set([
  "ai-business-automation-guide",
  "accounts-receivable-tracker",
  "electronic-contract-system-basics",
]);

const p1Slugs = new Set([
  "automation-priority-method",
  "chatgpt-document-cleanup",
  "google-sheets-ai-automation",
  "sales-revenue-ar-structure",
  "connect-contract-payment-customer-management",
  "payment-reminder-message",
  "unify-order-channels",
  "customer-memory-system",
]);

const requiredSectionHeadings = [
  "문제 정의",
  "핵심 개념",
  "현장 시나리오",
  "실행 절차",
  "자동화 구조",
  "리스크와 방지책",
  "도입 순서",
];

const forbiddenContentPatterns = [
  { pattern: /최소 공개 버전/g, label: "minimum-public-version wording" },
  { pattern: /https?:\/\/localhost|127\.0\.0\.1|vercel\.app/g, label: "local or preview URL" },
  { pattern: /google-adsense|adsbygoogle|googlesyndication|gtag\(|GTM-|google-site-verification/g, label: "tracking or verification code" },
];

function publicFileExists(src: string) {
  return fs.existsSync(path.join(root, "public", src.replace(/^\//, "")));
}

function inlineImages(content: string) {
  return [...content.matchAll(/!\[([^\]]+)\]\((\/images\/posts\/[^)\s]+\.webp)(?:\s+"([^"]+)")?\)/g)].map(
    (match) => ({
      alt: match[1],
      src: match[2],
      caption: match[3] ?? "",
    }),
  );
}

function duplicatedValues(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

const posts = getPublicPosts();
const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
const heroUsage = new Map<string, string[]>();
const summaryRows: string[] = [];
const slugOnlyMarkdownLink = /\[([a-z0-9]+(?:-[a-z0-9]+)+)\]\(\/ko\/[^)]+\)/g;

for (const post of posts) {
  const contentLength = [...post.content].length;
  const images = inlineImages(post.content);
  const headingTexts = post.headings.map((heading) => heading.text);
  const duplicateHeadings = duplicatedValues(headingTexts);
  const relatedHeadingCount = headingTexts.filter((heading) => heading === "관련 글").length;
  const minimumLength = top3Slugs.has(post.slug) ? 2000 : p1Slugs.has(post.slug) ? 1500 : 1200;
  const minimumImages = top3Slugs.has(post.slug) ? 3 : p1Slugs.has(post.slug) ? 1 : 0;

  heroUsage.set(post.frontmatter.heroImage, [
    ...(heroUsage.get(post.frontmatter.heroImage) ?? []),
    post.slug,
  ]);

  if (contentLength < minimumLength) {
    errors.push(`${post.slug}: content length ${contentLength} is below ${minimumLength}`);
  }

  if (!post.frontmatter.heroImage || !post.frontmatter.heroAlt.trim()) {
    errors.push(`${post.slug}: heroImage and heroAlt are required`);
  }

  if (!post.frontmatter.faq || post.frontmatter.faq.length < 3) {
    errors.push(`${post.slug}: needs at least three FAQ items`);
  }

  if (images.length < minimumImages) {
    errors.push(`${post.slug}: needs at least ${minimumImages} inline image(s), found ${images.length}`);
  }

  for (const image of images) {
    if (!image.alt.trim()) {
      errors.push(`${post.slug}: inline image alt is missing for ${image.src}`);
    }
    if (!image.caption.trim()) {
      errors.push(`${post.slug}: inline image caption is missing for ${image.src}`);
    }
    if (!publicFileExists(image.src)) {
      errors.push(`${post.slug}: inline image file is missing: ${image.src}`);
    }
  }

  for (const requiredHeading of requiredSectionHeadings) {
    if (!headingTexts.includes(requiredHeading)) {
      errors.push(`${post.slug}: missing section "${requiredHeading}"`);
    }
  }

  if (duplicateHeadings.length > 0) {
    errors.push(`${post.slug}: duplicate headings: ${duplicateHeadings.join(", ")}`);
  }

  if (relatedHeadingCount > 0) {
    errors.push(`${post.slug}: markdown related section should be rendered by RelatedReadingBox`);
  }

  for (const relatedSlug of post.frontmatter.relatedPosts) {
    const relatedPost = postsBySlug.get(relatedSlug);
    if (!relatedPost) {
      errors.push(`${post.slug}: unresolved related post ${relatedSlug}`);
      continue;
    }
    if (relatedPost.frontmatter.title === relatedPost.slug || !/[가-힣]/.test(relatedPost.frontmatter.title)) {
      errors.push(`${post.slug}: related post ${relatedSlug} does not resolve to a Korean title`);
    }
    if (!relatedPost.frontmatter.description.trim()) {
      errors.push(`${post.slug}: related post ${relatedSlug} needs a description`);
    }
  }

  for (const match of post.content.matchAll(slugOnlyMarkdownLink)) {
    errors.push(`${post.slug}: slug-only markdown link label is public: ${match[1]}`);
  }

  for (const { pattern, label } of forbiddenContentPatterns) {
    if (pattern.test(`${post.frontmatter.title}\n${post.frontmatter.description}\n${post.content}`)) {
      errors.push(`${post.slug}: forbidden ${label}`);
    }
    pattern.lastIndex = 0;
  }

  summaryRows.push(
    `${post.slug}: chars=${contentLength}, headings=${headingTexts.length}, faq=${post.frontmatter.faq?.length ?? 0}, inlineImages=${images.length}`,
  );
}

for (const [src, slugs] of heroUsage.entries()) {
  if (slugs.length > 3) {
    errors.push(`hero image reused too often: ${src} -> ${slugs.join(", ")}`);
  } else if (slugs.length > 1) {
    warnings.push(`hero image reuse remains approved but should be reduced later: ${src} -> ${slugs.join(", ")}`);
  }
}

function validateProtectedAdminRoute() {
  if (!fs.existsSync(protectedAdminRoot)) {
    return;
  }

  const entries = fs.readdirSync(protectedAdminRoot).map((entry) => entry);
  const unexpected = entries.filter((entry) => entry !== "content-automation");
  for (const entry of unexpected) {
    errors.push(`forbidden admin path exists: app/admin/${entry}`);
  }

  const pagePath = path.join(protectedAdminRoute, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    errors.push("app/admin/content-automation/page.tsx is required for the protected admin exception");
    return;
  }

  const pageSource = fs.readFileSync(pagePath, "utf8");
  const proxyPath = path.join(root, "proxy.ts");
  if (!pageSource.includes("isContentAutomationAdminEnabled") || !pageSource.includes("notFound()")) {
    errors.push("app/admin/content-automation/page.tsx must stay env-gated and return notFound when disabled");
  }
  if (!pageSource.includes("index: false") || !pageSource.includes("follow: false")) {
    errors.push("app/admin/content-automation/page.tsx must keep noindex/nofollow metadata");
  }
  if (!fs.existsSync(proxyPath) || !fs.readFileSync(proxyPath, "utf8").includes("/admin/content-automation/:path*")) {
    errors.push("proxy.ts must gate /admin/content-automation before rendering");
  }

  const apiRouteFiles = fs.existsSync(protectedAdminApiRoot)
    ? fs
        .readdirSync(protectedAdminApiRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(protectedAdminApiRoot, entry.name, "route.ts"))
    : [];
  if (apiRouteFiles.length === 0) {
    errors.push("app/api/admin/content-automation requires authenticated route handlers");
  }
  for (const routePath of apiRouteFiles) {
    const source = fs.readFileSync(routePath, "utf8");
    if (!source.includes("requireAdminRequest")) {
      errors.push(`${path.relative(root, routePath).replaceAll("\\", "/")} must require admin auth`);
    }
  }
}

const forbiddenPaths = [
  path.join(root, "public", "google-site-verification.html"),
  path.join(root, "app", "login"),
  path.join(root, "app", "en"),
  path.join(root, "app", "ja"),
  path.join(root, "app", "ai"),
  path.join(root, "app", "chat"),
];

for (const forbiddenPath of forbiddenPaths) {
  if (fs.existsSync(forbiddenPath)) {
    errors.push(`forbidden path exists: ${path.relative(root, forbiddenPath).replaceAll("\\", "/")}`);
  }
}
validateProtectedAdminRoute();

if (posts.length !== 33) {
  errors.push(`expected 33 public posts, found ${posts.length}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`WARN ${warning}`);
}

console.log(`audit:content-authority PASS (${posts.length} posts)`);
for (const row of summaryRows) {
  console.log(row);
}
