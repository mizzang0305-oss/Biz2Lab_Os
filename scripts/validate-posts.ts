import fs from "node:fs";
import path from "node:path";

import { getPublicPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

const forbiddenTerms = ["affiliate", "amazon", "로또", "lotto"];
const errors: string[] = [];
const publicPosts = getPublicPosts();
const postsBySlug = new Set(publicPosts.map((post) => post.slug));

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

  const imagePath = path.join(process.cwd(), "public", post.frontmatter.heroImage);
  if (!fs.existsSync(imagePath)) {
    errors.push(`${post.slug}: missing hero image ${post.frontmatter.heroImage}`);
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

if (publicPosts.length !== 30) {
  errors.push(`expected 30 public posts, found ${publicPosts.length}`);
}

const expectedCategoryCounts = {
  automation: 12,
  "sales-ops": 7,
  "small-business": 6,
  "contracts-payments": 5,
} as const;

for (const [category, expectedCount] of Object.entries(expectedCategoryCounts)) {
  const actualCount = publicPosts.filter((post) => post.category === category).length;
  if (actualCount !== expectedCount) {
    errors.push(`${category}: expected ${expectedCount} posts, found ${actualCount}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`validate:posts PASS (${publicPosts.length} public Korean posts)`);
