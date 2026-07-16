import fs from "node:fs";
import path from "node:path";

import {
  getEditorialEvidence,
  getEditorialEvidenceEntries,
} from "@/lib/editorial-evidence";
import { getPublicPosts } from "@/lib/posts";

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const protectedAdminRoot = path.join(root, "app", "admin");
const protectedAdminRoute = path.join(protectedAdminRoot, "content-automation");
const protectedAdminApiRoot = path.join(root, "app", "api", "admin", "content-automation");
const MIN_PUBLIC_POSTS = 20;
const MAX_PUBLIC_POSTS = 26;
const MIN_CONTENT_CHARS = 1600;
const MIN_H2_SECTIONS = 5;

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

function downloadableResources(content: string) {
  return [...content.matchAll(/\[[^\]]+\]\((\/downloads\/[^)\s]+)\)/g)].map(
    (match) => match[1],
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

function extractH2Sections(content: string) {
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

const posts = getPublicPosts();
const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
const editorialEvidenceEntries = getEditorialEvidenceEntries();
const editorialEvidenceSlugs = new Set(editorialEvidenceEntries.map(([slug]) => slug));
const heroUsage = new Map<string, string[]>();
const summaryRows: string[] = [];
const slugOnlyMarkdownLink = /\[([a-z0-9]+(?:-[a-z0-9]+)+)\]\(\/ko\/[^)]+\)/g;

if (posts.length < MIN_PUBLIC_POSTS || posts.length > MAX_PUBLIC_POSTS) {
  errors.push(
    `public portfolio must contain ${MIN_PUBLIC_POSTS}-${MAX_PUBLIC_POSTS} posts, found ${posts.length}`,
  );
}

for (const post of posts) {
  const editorialEvidence = getEditorialEvidence(post.slug);
  const contentLength = [...post.content].length;
  const images = inlineImages(post.content);
  const downloads = downloadableResources(post.content);
  const headingTexts = post.headings.map((heading) => heading.text);
  const h2Sections = extractH2Sections(post.content);
  const duplicateHeadings = duplicatedValues(headingTexts);
  const relatedHeadingCount = headingTexts.filter((heading) => heading === "관련 글").length;

  heroUsage.set(post.frontmatter.heroImage, [
    ...(heroUsage.get(post.frontmatter.heroImage) ?? []),
    post.slug,
  ]);

  if (contentLength < MIN_CONTENT_CHARS) {
    errors.push(`${post.slug}: content length ${contentLength} is below ${MIN_CONTENT_CHARS}`);
  }

  if (!post.frontmatter.heroImage || !post.frontmatter.heroAlt.trim()) {
    errors.push(`${post.slug}: heroImage and heroAlt are required`);
  }

  if (!post.frontmatter.faq || post.frontmatter.faq.length < 3) {
    errors.push(`${post.slug}: needs at least three FAQ items`);
  }

  if (h2Sections.length < MIN_H2_SECTIONS) {
    errors.push(`${post.slug}: needs at least ${MIN_H2_SECTIONS} substantive H2 sections`);
  }

  if (downloads.length < 1) {
    errors.push(`${post.slug}: needs at least one real downloadable resource`);
  }

  for (const download of downloads) {
    if (!publicFileExists(download)) {
      errors.push(`${post.slug}: downloadable resource is missing: ${download}`);
    }
  }

  if (!/\|.+\|/m.test(post.content) && !/^\d+\.\s/m.test(post.content)) {
    errors.push(`${post.slug}: needs a practical table or ordered procedure`);
  }

  if (!/(?:예시|샘플|가상 데이터|가상 기록)/.test(post.content)) {
    errors.push(`${post.slug}: needs an explicit worked-example or sample-data disclosure`);
  }

  if (editorialEvidence.summary.length < 40) {
    errors.push(`${post.slug}: editorial evidence summary is too short`);
  }

  if (editorialEvidence.scope.length < 35) {
    errors.push(`${post.slug}: editorial scope disclosure is too short`);
  }

  if (
    editorialEvidence.type === "official-document-review" &&
    editorialEvidence.sources.length === 0
  ) {
    errors.push(`${post.slug}: official-document-review needs at least one source`);
  }

  for (const source of editorialEvidence.sources) {
    if (!source.url.startsWith("https://")) {
      errors.push(`${post.slug}: editorial source must use https: ${source.url}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.reviewedAt)) {
      errors.push(`${post.slug}: editorial source reviewedAt must use YYYY-MM-DD`);
    }
  }

  if (post.frontmatter.templateCta) {
    errors.push(`${post.slug}: placeholder templateCta must not be public`);
  }

  if (/분석:/.test(post.frontmatter.title)) {
    errors.push(`${post.slug}: unverified analysis title must not be public`);
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

  for (const section of h2Sections) {
    if (section.body.length === 0) {
      errors.push(`${post.slug}: empty H2 section: ${section.heading}`);
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
    `${post.slug}: chars=${contentLength}, headings=${headingTexts.length}, faq=${post.frontmatter.faq?.length ?? 0}, downloads=${downloads.length}, inlineImages=${images.length}`,
  );
}

for (const [slug] of editorialEvidenceEntries) {
  if (!postsBySlug.has(slug)) {
    errors.push(`${slug}: editorial evidence exists for a non-public article`);
  }
}

for (const post of posts) {
  if (!editorialEvidenceSlugs.has(post.slug)) {
    errors.push(`${post.slug}: published article is missing editorial evidence`);
  }
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
