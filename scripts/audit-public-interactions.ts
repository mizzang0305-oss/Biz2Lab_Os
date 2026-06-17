import fs from "node:fs";
import path from "node:path";

import { forbiddenPublicRoutePrefixes } from "@/lib/locales";
import { getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteSettings } from "@/lib/site-settings";

const root = process.cwd();
const errors: string[] = [];
const checked: string[] = [];

const sourceRoots = ["app", "components", path.join("content", "ko")];
const sourceFiles = [path.join("lib", "site-settings.ts")];
const sourceExtensions = new Set([".ts", ".tsx", ".md", ".mdx"]);
const availableRoutes = new Set<string>([
  ...staticPublicRoutes,
  "/robots.txt",
  "/sitemap.xml",
  "/rss.xml",
  ...getPublicPosts().map((post) => post.route),
]);

function toPosix(filePath: string) {
  return filePath.split(path.sep).join("/");
}

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkFiles(fullPath);
      if (!entry.isFile()) return [];
      return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
    })
    .sort();
}

function readProjectFile(filePath: string) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function addError(filePath: string, message: string) {
  errors.push(`${toPosix(filePath)}: ${message}`);
}

function isForbiddenRoute(route: string) {
  const normalized = route.split(/[?#]/)[0];
  return forbiddenPublicRoutePrefixes.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

function validateInternalRoute(route: string, location: string) {
  const normalized = route.split(/[?#]/)[0];
  if (isForbiddenRoute(normalized)) {
    errors.push(`${location}: forbidden public route reference ${route}`);
    return;
  }

  if (
    normalized.startsWith("/ko") ||
    normalized === "/" ||
    normalized.endsWith(".xml") ||
    normalized.endsWith(".txt")
  ) {
    if (!availableRoutes.has(normalized)) {
      errors.push(`${location}: unresolved public route reference ${route}`);
    }
  }
}

function validateForbiddenRouteDirectories() {
  for (const prefix of forbiddenPublicRoutePrefixes) {
    const segment = prefix.replace(/^\//, "");
    const rootRoute = path.join(root, "app", segment);
    const koRoute = path.join(root, "app", "ko", segment);
    if (fs.existsSync(rootRoute)) {
      errors.push(`app/${segment}: forbidden public route directory exists`);
    }
    if (fs.existsSync(koRoute)) {
      errors.push(`app/ko/${segment}: forbidden Korean route directory exists`);
    }
  }
  checked.push("forbidden route directories");
}

function validateLinksAndButtons(filePath: string) {
  const relativePath = path.relative(root, filePath);
  const source = fs.readFileSync(filePath, "utf8");

  for (const match of source.matchAll(/\bhref\s*=\s*["'`](\/[^"'`]+)["'`]/g)) {
    validateInternalRoute(match[1], `${toPosix(relativePath)} href`);
  }

  for (const match of source.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    validateInternalRoute(match[1], `${toPosix(relativePath)} markdown link`);
  }

  if (/\bhref\s*=\s*["'`](?:#|javascript:void\(0\)|)["'`]/i.test(source)) {
    addError(relativePath, "contains empty, hash-only, or javascript href");
  }

  for (const match of source.matchAll(/<button\b(?![^>]*\btype=)[^>]*>/gi)) {
    const line = source.slice(0, match.index).split(/\r?\n/).length;
    addError(relativePath, `button without explicit type near line ${line}`);
  }

  for (const match of source.matchAll(/<a\b[^>]*\bdownload\b[^>]*>/gi)) {
    const tag = match[0];
    const href = tag.match(/\bhref\s*=\s*["'`](\/[^"'`]+)["'`]/)?.[1];
    const line = source.slice(0, match.index).split(/\r?\n/).length;
    if (!href) {
      addError(relativePath, `download anchor without static href near line ${line}`);
      continue;
    }

    const publicFile = path.join(root, "public", href.replace(/^\//, ""));
    if (!fs.existsSync(publicFile)) {
      addError(relativePath, `download href does not exist in public/: ${href}`);
    }
  }
}

function validateSearchFallback() {
  const siteHeader = readProjectFile(path.join("components", "layout", "SiteHeader.tsx"));
  const searchBox = readProjectFile(path.join("components", "search", "SearchBox.tsx"));
  const envExample = readProjectFile(".env.example");

  if (siteHeader.includes("SearchBox")) {
    errors.push("components/layout/SiteHeader.tsx: disabled search box must not be globally exposed in the article header");
  }

  if (
    envExample.includes("NEXT_PUBLIC_PAGEFIND_ENABLED=false") &&
    (!searchBox.includes("DisabledSearchBox") ||
      !searchBox.includes("siteSettings.messages.disabledSearch") ||
      siteSettings.messages.disabledSearch !== "검색은 승인 후 활성화 예정입니다." ||
      !searchBox.includes("disabled"))
  ) {
    errors.push("components/search/SearchBox.tsx: disabled Pagefind fallback is missing");
  }
  checked.push("Pagefind disabled search fallback and article header exposure");
}

function validateResponsiveArticleTables() {
  const markdownRenderer = readProjectFile(path.join("components", "article", "MarkdownRenderer.tsx"));
  const responsiveTable = readProjectFile(path.join("components", "article", "ResponsiveTable.tsx"));
  const globalCss = readProjectFile(path.join("app", "globals.css"));

  if (!markdownRenderer.includes("ResponsiveTable") || !markdownRenderer.includes("table:")) {
    errors.push("components/article/MarkdownRenderer.tsx: markdown tables must render through ResponsiveTable");
  }
  if (!responsiveTable.includes("md:hidden") || !responsiveTable.includes("md:block")) {
    errors.push("components/article/ResponsiveTable.tsx: mobile card and desktop table modes are required");
  }
  if (/word-break:\s*break-all/.test(globalCss)) {
    errors.push("app/globals.css: word-break break-all can split Korean table text one character at a time");
  }
  if (/\.prose-biz2lab table[\s\S]*overflow-x:\s*auto/.test(globalCss)) {
    errors.push("app/globals.css: markdown tables must not rely only on horizontal overflow");
  }
  checked.push("responsive article tables");
}

function validateGoogleSetupStillAbsent() {
  const forbiddenFiles = [
    path.join(root, "public", "ads.txt"),
    path.join(root, "public", "google-site-verification.html"),
  ];
  for (const forbiddenFile of forbiddenFiles) {
    if (fs.existsSync(forbiddenFile)) {
      errors.push(`forbidden Google setup file exists: ${toPosix(path.relative(root, forbiddenFile))}`);
    }
  }

  const forbiddenPatterns = [
    { pattern: /google-site-verification/, label: "Search Console verification" },
    { pattern: /googletagmanager\.com\/gtag\/js|gtag\(|G-[A-Z0-9]{10}/, label: "GA4 script or measurement ID" },
    { pattern: /adsbygoogle|pagead2\.googlesyndication\.com|ca-pub-\d{16}/, label: "AdSense script or client ID" },
  ];

  for (const sourceRoot of ["app", "components", "lib"]) {
    for (const filePath of walkFiles(path.join(root, sourceRoot))) {
      const relativePath = path.relative(root, filePath);
      const source = fs.readFileSync(filePath, "utf8");
      for (const { pattern, label } of forbiddenPatterns) {
        if (pattern.test(source)) {
          errors.push(`${toPosix(relativePath)}: forbidden ${label} detected before Google setup apply phase`);
        }
      }
    }
  }
  checked.push("Google setup code remains absent");
}

function validateContactFallback() {
  const page = readProjectFile(path.join("app", "ko", "contact", "page.tsx"));
  const form = readProjectFile(path.join("components", "forms", "ContactForm.tsx"));

  if (page.includes('action="/api/contact"') || page.includes("method=\"post\"")) {
    errors.push("app/ko/contact/page.tsx: contact page can navigate directly to JSON API");
  }
  if (!page.includes("ContactForm")) {
    errors.push("app/ko/contact/page.tsx: ContactForm is not rendered");
  }
  if (!form.includes("SUPABASE_NOT_CONFIGURED")) {
    errors.push("components/forms/ContactForm.tsx: Supabase fallback state is not handled");
  }
  checked.push("contact form graceful fallback");
}

function validatePostNextSteps() {
  for (const post of getPublicPosts()) {
    const href = post.frontmatter.nextStep?.href;
    if (!href) continue;
    validateInternalRoute(href, `${post.slug} nextStep.href`);
  }
  checked.push("post next-step links");
}

validateForbiddenRouteDirectories();

for (const sourceRoot of sourceRoots) {
  for (const filePath of walkFiles(path.join(root, sourceRoot))) {
    validateLinksAndButtons(filePath);
  }
}
for (const filePath of sourceFiles) {
  validateLinksAndButtons(path.join(root, filePath));
}
checked.push("public source links, buttons, and downloads");

validateSearchFallback();
validateResponsiveArticleTables();
validateGoogleSetupStillAbsent();
validateContactFallback();
validatePostNextSteps();

if (
  siteSettings.featureFlags.adminEnabled ||
  siteSettings.featureFlags.commerceEnabled ||
  siteSettings.featureFlags.aiEnabled ||
  siteSettings.featureFlags.multilingualEnabled
) {
  errors.push("lib/site-settings.ts: AdSense-unsafe feature flag is enabled");
}
checked.push("settings feature flags");

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`audit:interactions PASS (${checked.join(", ")})`);
