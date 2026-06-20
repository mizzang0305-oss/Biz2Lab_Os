import fs from "node:fs";
import path from "node:path";

import { forbiddenPublicRoutePrefixes } from "@/lib/locales";
import { getSitemapPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const errors: string[] = [];
const routes: readonly string[] = staticPublicRoutes;
const forbiddenPrefixes: readonly string[] = forbiddenPublicRoutePrefixes;
const protectedAdminRoot = path.join(process.cwd(), "app", "admin");
const protectedAdminRoute = path.join(protectedAdminRoot, "content-automation");
const protectedAdminApiRoot = path.join(process.cwd(), "app", "api", "admin", "content-automation");

for (const route of routes) {
  for (const forbidden of forbiddenPrefixes) {
    if (route === forbidden || route.startsWith(`${forbidden}/`)) {
      errors.push(`static route exposes forbidden prefix: ${route}`);
    }
  }
}

function validateProtectedAdminRoute() {
  if (!fs.existsSync(protectedAdminRoot)) {
    return;
  }

  const entries = fs.readdirSync(protectedAdminRoot).map((entry) => entry);
  const unexpected = entries.filter((entry) => entry !== "content-automation");
  for (const entry of unexpected) {
    errors.push(`forbidden admin route directory exists: /admin/${entry}`);
  }

  const pagePath = path.join(protectedAdminRoute, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    errors.push("protected admin route is missing app/admin/content-automation/page.tsx");
    return;
  }

  const pageSource = fs.readFileSync(pagePath, "utf8");
  const proxyPath = path.join(process.cwd(), "proxy.ts");
  if (!pageSource.includes("isContentAutomationAdminEnabled") || !pageSource.includes("notFound()")) {
    errors.push("protected admin route must be env-gated and return notFound when disabled");
  }
  if (!pageSource.includes("index: false") || !pageSource.includes("follow: false")) {
    errors.push("protected admin route must keep noindex/nofollow metadata");
  }
  if (!fs.existsSync(proxyPath) || !fs.readFileSync(proxyPath, "utf8").includes("/admin/content-automation/:path*")) {
    errors.push("proxy.ts must protect /admin/content-automation");
  }

  const routeFiles = fs.existsSync(protectedAdminApiRoot)
    ? fs
        .readdirSync(protectedAdminApiRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(protectedAdminApiRoot, entry.name, "route.ts"))
    : [];

  if (routeFiles.length === 0) {
    errors.push("protected admin API route handlers are missing");
  }

  for (const routeFile of routeFiles) {
    const source = fs.readFileSync(routeFile, "utf8");
    if (!source.includes("requireAdminRequest")) {
      errors.push(`${path.relative(process.cwd(), routeFile).replaceAll("\\", "/")} must require admin auth`);
    }
  }
}

for (const forbidden of forbiddenPublicRoutePrefixes) {
  const segment = forbidden.replace(/^\//, "");
  const publicPath = path.join(process.cwd(), "app", segment);
  const koreanPath = path.join(process.cwd(), "app", "ko", segment);
  if (segment === "admin" && fs.existsSync(publicPath)) {
    validateProtectedAdminRoute();
  } else if (fs.existsSync(publicPath)) {
    errors.push(`forbidden route directory exists: ${forbidden}`);
  }
  if (fs.existsSync(koreanPath)) {
    errors.push(`forbidden Korean route directory exists: /ko/${segment}`);
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
