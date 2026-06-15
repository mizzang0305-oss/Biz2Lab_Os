import { getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";

const available = new Set<string>([
  ...staticPublicRoutes,
  "/rss.xml",
  ...getPublicPosts().map((post) => post.route),
]);
const errors: string[] = [];

for (const post of getPublicPosts()) {
  for (const link of post.internalLinks) {
    if (!available.has(link)) {
      errors.push(`${post.slug}: broken internal link ${link}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("check:links PASS");

