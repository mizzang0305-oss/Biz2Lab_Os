import fs from "node:fs";
import path from "node:path";

import { forbiddenPublicRoutePrefixes } from "@/lib/locales";
import { getSitemapPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const errors: string[] = [];
const routes: readonly string[] = staticPublicRoutes;
const forbiddenPrefixes: readonly string[] = forbiddenPublicRoutePrefixes;

for (const route of routes) {
  for (const forbidden of forbiddenPrefixes) {
    if (route === forbidden || route.startsWith(`${forbidden}/`)) {
      errors.push(`static route exposes forbidden prefix: ${route}`);
    }
  }
}

for (const forbidden of forbiddenPublicRoutePrefixes) {
  const segment = forbidden.replace(/^\//, "");
  const publicPath = path.join(process.cwd(), "app", segment);
  const koreanPath = path.join(process.cwd(), "app", "ko", segment);
  if (fs.existsSync(publicPath) || fs.existsSync(koreanPath)) {
    errors.push(`forbidden route directory exists: ${forbidden}`);
  }
}

for (const post of getSitemapPosts()) {
  if (post.frontmatter.draft || post.frontmatter.noindex) {
    errors.push(`sitemap includes draft/noindex post: ${post.slug}`);
  }
}

const envExample = fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");
if (siteConfig.url !== "https://www.biz2lab.com") {
  errors.push(`siteConfig.url must be https://www.biz2lab.com, found ${siteConfig.url}`);
}

if (!/^NEXT_PUBLIC_SITE_URL=https:\/\/www\.biz2lab\.com$/m.test(envExample)) {
  errors.push(".env.example must set NEXT_PUBLIC_SITE_URL=https://www.biz2lab.com");
}

for (const line of envExample.split(/\r?\n/)) {
  if (/KEY=.+[A-Za-z0-9]{12,}/.test(line) && !line.startsWith("NEXT_PUBLIC_SITE_URL=")) {
    errors.push(`.env.example may contain a secret-like value: ${line.split("=")[0]}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `validate:seo PASS (${staticPublicRoutes.length} static routes, ${getSitemapPosts().length} sitemap posts)`,
);
