import fs from "node:fs";
import path from "node:path";

import {
  summarizePublishedPosts,
  validatePublishedPostInventory,
  type ContentIndexRow,
} from "@/lib/content-validation";
import { getPublicPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

const forbiddenTerms = ["affiliate", "amazon", "로또", "lotto"];
const errors: string[] = [];
const publicPosts = getPublicPosts();
const postsBySlug = new Set(publicPosts.map((post) => post.slug));
const contentIndexPath = path.join(process.cwd(), "content", "ko", "content-index.json");

function readContentIndexRows(): ContentIndexRow[] {
  if (!fs.existsSync(contentIndexPath)) {
    errors.push("content/ko/content-index.json is required");
    return [];
  }

  const rows = JSON.parse(fs.readFileSync(contentIndexPath, "utf8")) as unknown;
  if (!Array.isArray(rows)) {
    errors.push("content/ko/content-index.json must be an array");
    return [];
  }

  return rows as ContentIndexRow[];
}

for (const post of publicPosts) {
  const expectedCanonical = `${siteConfig.url}/ko/${post.frontmatter.category}/${post.slug}`;
  if (post.frontmatter.canonical !== expectedCanonical) {
    errors.push(`${post.slug}: canonical must be ${expectedCanonical}`);
  }

  if (!post.frontmatter.heroAlt.trim()) {
    errors.push(`${post.slug}: heroAlt is required`);
  }

  if (post.frontmatter.heroImage.startsWith("http")) {
    errors.push(`${post.slug}: heroImage must be local`);
  }

  if (post.frontmatter.relatedPosts.length < 1) {
    errors.push(`${post.slug}: relatedPosts is required`);
  }

  for (const relatedSlug of post.frontmatter.relatedPosts) {
    if (!postsBySlug.has(relatedSlug)) {
      errors.push(`${post.slug}: unresolved related post ${relatedSlug}`);
    }
  }

  if (post.internalLinks.length + post.frontmatter.relatedPosts.length < 2) {
    errors.push(`${post.slug}: needs at least two internal links or related posts`);
  }

  const haystack = `${post.frontmatter.title}\n${post.frontmatter.description}\n${post.content}`.toLowerCase();
  for (const term of forbiddenTerms) {
    if (haystack.includes(term.toLowerCase())) {
      errors.push(`${post.slug}: forbidden term found: ${term}`);
    }
  }
}

errors.push(
  ...validatePublishedPostInventory({
    posts: publicPosts,
    contentIndexRows: readContentIndexRows(),
    publicFileExists: (src) => fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, ""))),
  }),
);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const summary = summarizePublishedPosts(publicPosts);
const categorySummary = Object.entries(summary.categoryCounts)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([category, count]) => `${category}=${count}`)
  .join(", ");

console.log(`validate:posts PASS (${summary.total} published Korean posts; ${categorySummary})`);
