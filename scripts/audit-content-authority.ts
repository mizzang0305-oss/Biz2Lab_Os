import fs from "node:fs";
import path from "node:path";

import {
  getEditorialEvidence,
  getEditorialEvidenceEntries,
} from "@/lib/editorial-evidence";
import { getEditorialMediaEntries } from "@/lib/editorial-media";
import { getPublicPosts } from "@/lib/posts";

const root = process.cwd();
const errors: string[] = [];
const MIN_PUBLIC_POSTS = 20;
const MAX_PUBLIC_POSTS = 26;
const MIN_CONTENT_CHARS = 1200;
const MIN_H2_SECTIONS = 5;

const protectedAdminRoot = path.join(root, "app", "admin");
const protectedAdminRoute = path.join(protectedAdminRoot, "content-automation");
const protectedAdminApiRoot = path.join(root, "app", "api", "admin", "content-automation");

const forbiddenContentPatterns = [
  { pattern: /최소 공개 버전/g, label: "minimum-public-version wording" },
  {
    pattern: /https?:\/\/(?:localhost|127\.0\.0\.1)|vercel\.app/g,
    label: "local or preview URL",
  },
  {
    pattern: /google-adsense|adsbygoogle|googlesyndication|gtag\(|GTM-|google-site-verification/g,
    label: "tracking or verification code",
  },
  {
    pattern: /(?:시사회에서 직접 봤|관객들이 모두|실제 조회수는|검색 1위)/g,
    label: "unverifiable first-hand or performance claim",
  },
];

function publicFileExists(src: string) {
  return fs.existsSync(path.join(root, "public", src.replace(/^\//, "")));
}

function duplicatedValues(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
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
    return { heading: match[1].trim(), body: content.slice(bodyStart, bodyEnd).trim() };
  });
}

function validateProtectedAdminRoute() {
  if (!fs.existsSync(protectedAdminRoot)) return;

  const unexpected = fs
    .readdirSync(protectedAdminRoot)
    .filter((entry) => entry !== "content-automation");
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
    if (!fs.readFileSync(routePath, "utf8").includes("requireAdminRequest")) {
      errors.push(`${path.relative(root, routePath).replaceAll("\\", "/")} must require admin auth`);
    }
  }
}

const posts = getPublicPosts();
const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
const evidenceEntries = getEditorialEvidenceEntries();
const evidenceSlugs = new Set(evidenceEntries.map(([slug]) => slug));
const editorNotes = new Set<string>();
const summaryRows: string[] = [];

if (posts.length < MIN_PUBLIC_POSTS || posts.length > MAX_PUBLIC_POSTS) {
  errors.push(`public portfolio must contain ${MIN_PUBLIC_POSTS}-${MAX_PUBLIC_POSTS} posts, found ${posts.length}`);
}

for (const post of posts) {
  const evidence = getEditorialEvidence(post.slug);
  const contentLength = [...post.content].length;
  const h2Sections = extractH2Sections(post.content);
  const headingTexts = post.headings.map((heading) => heading.text);

  if (contentLength < MIN_CONTENT_CHARS) {
    errors.push(`${post.slug}: content length ${contentLength} is below ${MIN_CONTENT_CHARS}`);
  }
  if (!post.frontmatter.heroImage || !post.frontmatter.heroAlt.trim()) {
    errors.push(`${post.slug}: heroImage and heroAlt are required`);
  }
  if (!post.frontmatter.editorNote || post.frontmatter.editorNote.length < 20) {
    errors.push(`${post.slug}: needs a substantive editor note`);
  } else if (editorNotes.has(post.frontmatter.editorNote)) {
    errors.push(`${post.slug}: editor note repeats another article`);
  } else {
    editorNotes.add(post.frontmatter.editorNote);
  }
  if (!post.frontmatter.audience || post.frontmatter.audience.length < 3) {
    errors.push(`${post.slug}: needs at least three audience cues`);
  }
  if (!post.frontmatter.faq || post.frontmatter.faq.length < 3) {
    errors.push(`${post.slug}: needs at least three FAQ items`);
  }
  if (h2Sections.length < MIN_H2_SECTIONS) {
    errors.push(`${post.slug}: needs at least ${MIN_H2_SECTIONS} substantive H2 sections`);
  }
  if (duplicatedValues(headingTexts).length > 0) {
    errors.push(`${post.slug}: duplicate headings are not allowed`);
  }
  if (post.frontmatter.templateCta) {
    errors.push(`${post.slug}: placeholder templateCta must not be public`);
  }
  if (/\/downloads\//.test(post.content)) {
    errors.push(`${post.slug}: old business download CTA must not remain public`);
  }
  if (/!\[[^\]]*\]\((?:https?:\/\/|\/images\/)/.test(post.content)) {
    errors.push(`${post.slug}: article images must use the reviewed editorial media registry`);
  }

  if (evidence.summary.length < 40) errors.push(`${post.slug}: editorial evidence summary is too short`);
  if (evidence.scope.length < 35) errors.push(`${post.slug}: editorial scope disclosure is too short`);
  if (evidence.type === "official-help-review" && evidence.sources.length === 0) {
    errors.push(`${post.slug}: official-help-review needs at least one official source`);
  }
  if (evidence.type === "scene-analysis" && post.frontmatter.spoilerLevel === "none") {
    errors.push(`${post.slug}: scene analysis must disclose spoiler scope`);
  }
  for (const source of evidence.sources) {
    if (!source.url.startsWith("https://")) errors.push(`${post.slug}: editorial source must use https`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.reviewedAt)) {
      errors.push(`${post.slug}: editorial source reviewedAt must use YYYY-MM-DD`);
    }
  }

  for (const section of h2Sections) {
    if (section.body.length === 0) errors.push(`${post.slug}: empty H2 section: ${section.heading}`);
  }
  for (const relatedSlug of post.frontmatter.relatedPosts) {
    const related = postsBySlug.get(relatedSlug);
    if (!related) errors.push(`${post.slug}: unresolved related post ${relatedSlug}`);
    else if (!/[가-힣]/.test(related.frontmatter.title)) {
      errors.push(`${post.slug}: related post ${relatedSlug} needs a Korean title`);
    }
  }
  for (const { pattern, label } of forbiddenContentPatterns) {
    if (pattern.test(`${post.frontmatter.title}\n${post.frontmatter.description}\n${post.content}`)) {
      errors.push(`${post.slug}: forbidden ${label}`);
    }
    pattern.lastIndex = 0;
  }

  summaryRows.push(
    `${post.slug}: chars=${contentLength}, h2=${h2Sections.length}, faq=${post.frontmatter.faq?.length ?? 0}, evidence=${evidence.type}`,
  );
}

for (const [slug] of evidenceEntries) {
  if (!postsBySlug.has(slug)) errors.push(`${slug}: editorial evidence exists for a non-public article`);
}
for (const post of posts) {
  if (!evidenceSlugs.has(post.slug)) errors.push(`${post.slug}: published article is missing editorial evidence`);
}

const mediaIds = new Set<string>();
const mediaSources = new Set<string>();
for (const [slug, media] of getEditorialMediaEntries()) {
  if (!postsBySlug.has(slug)) errors.push(`${slug}: editorial media exists for a non-public article`);
  if (!media.assets.some((asset) => asset.kind === "key-art")) {
    errors.push(`${slug}: editorial media needs official key art`);
  }
  if (media.assets.filter((asset) => asset.kind === "still").length < 2) {
    errors.push(`${slug}: editorial media needs at least two scene stills`);
  }
  for (const asset of media.assets) {
    if (mediaIds.has(asset.id)) errors.push(`${asset.id}: duplicate editorial media id`);
    mediaIds.add(asset.id);
    if (mediaSources.has(asset.src)) errors.push(`${asset.src}: duplicate editorial media file`);
    mediaSources.add(asset.src);
    if (!asset.src.startsWith("/images/editorial/") || !asset.src.endsWith(".webp")) {
      errors.push(`${asset.id}: media file must be a local optimized editorial WebP`);
    }
    if (!publicFileExists(asset.src)) errors.push(`${asset.id}: missing media file ${asset.src}`);
    if (!/[가-힣]/.test(asset.alt) || asset.alt.length < 20) errors.push(`${asset.id}: needs descriptive Korean alt`);
    if (!asset.caption.includes("©") || !asset.caption.includes("Editorial use only")) {
      errors.push(`${asset.id}: caption must preserve copyright and editorial-use notice`);
    }
    if (!asset.usageBasis.includes("Editorial use only")) errors.push(`${asset.id}: usage basis is unclear`);
    if (!asset.sourcePageUrl.startsWith("https://press.disney.co.uk/")) {
      errors.push(`${asset.id}: source page must be the reviewed official press page`);
    }
    if (!asset.sourceAssetUrl.startsWith("https://lumiere-a.akamaihd.net/")) {
      errors.push(`${asset.id}: source asset must match the official Disney CDN`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asset.checkedAt)) errors.push(`${asset.id}: invalid checkedAt`);
  }
}

for (const forbiddenPath of [
  path.join(root, "public", "google-site-verification.html"),
  path.join(root, "app", "login"),
  path.join(root, "app", "en"),
  path.join(root, "app", "ja"),
  path.join(root, "app", "ai"),
  path.join(root, "app", "chat"),
]) {
  if (fs.existsSync(forbiddenPath)) {
    errors.push(`forbidden path exists: ${path.relative(root, forbiddenPath).replaceAll("\\", "/")}`);
  }
}

validateProtectedAdminRoute();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`audit:content-authority PASS (${posts.length} posts, ${mediaIds.size} licensed editorial assets)`);
for (const row of summaryRows) console.log(row);
