import fs from "node:fs";
import path from "node:path";

import { getPublicPosts } from "@/lib/posts";

const output = path.join(process.cwd(), "content", "ko", "content-index.json");
const payload = getPublicPosts().map((post) => ({
  title: post.frontmatter.title,
  slug: post.slug,
  route: post.route,
  category: post.frontmatter.category,
  cluster: post.frontmatter.cluster,
  type: post.frontmatter.type,
  heroImage: post.frontmatter.heroImage,
  heroAlt: post.frontmatter.heroAlt,
  updatedAt: post.frontmatter.updatedAt,
  relatedPosts: post.frontmatter.relatedPosts,
}));

fs.writeFileSync(output, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`generate-content-index PASS (${payload.length} posts)`);
