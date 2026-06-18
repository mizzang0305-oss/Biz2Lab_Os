import fs from "node:fs";
import path from "node:path";

import { forbiddenPublicRoutePrefixes } from "@/lib/locales";
import { googleSetup } from "@/lib/google-setup";
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

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

function validateGoogleSetupAppliedSafely() {
  const adsTxtPath = path.join(root, "public", "ads.txt");
  const searchConsoleFile = path.join(root, "public", "google-site-verification.html");

  if (!fs.existsSync(adsTxtPath)) {
    errors.push("public/ads.txt: required AdSense ads.txt file is missing");
  } else {
    const adsTxt = fs.readFileSync(adsTxtPath, "utf8");
    const lines = adsTxt.trimEnd().split(/\r?\n/);
    if (lines.length !== 1 || lines[0] !== googleSetup.adsTxtLine) {
      errors.push("public/ads.txt: content must be exactly the approved single AdSense line");
    }
  }

  if (fs.existsSync(searchConsoleFile)) {
    errors.push("public/google-site-verification.html: Search Console file verification must not be added");
  }

  const layout = readProjectFile(path.join("app", "layout.tsx"));
  const setupConstants = readProjectFile(path.join("lib", "google-setup.ts"));

  if (!layout.includes('"google-adsense-account": googleSetup.adsenseClientId')) {
    errors.push("app/layout.tsx: google-adsense-account meta must use the approved AdSense client ID");
  }
  if (!layout.includes('from "next/script"')) {
    errors.push("app/layout.tsx: Google scripts must use next/script");
  }
  if (!layout.includes("biz2lab-adsense-client") || !layout.includes("strategy=\"beforeInteractive\"")) {
    errors.push("app/layout.tsx: AdSense script should be injected in the document head");
  }
  if (!layout.includes("crossOrigin=\"anonymous\"")) {
    errors.push("app/layout.tsx: AdSense script needs crossorigin anonymous");
  }
  if (!layout.includes("biz2lab-ga4-loader") || !layout.includes("biz2lab-ga4-init")) {
    errors.push("app/layout.tsx: GA4 loader and init scripts are required");
  }
  if (!setupConstants.includes("googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}")) {
    errors.push("lib/google-setup.ts: GA4 script URL must be built from the approved Measurement ID");
  }
  if (!setupConstants.includes("adsbygoogle.js?client=${ADSENSE_CLIENT_ID}")) {
    errors.push("lib/google-setup.ts: AdSense script URL must be built from the approved client ID");
  }

  const allowedMeasurementIds = new Set<string>([googleSetup.ga4MeasurementId]);
  const allowedClientIds = new Set<string>([googleSetup.adsenseClientId]);
  const allowedPublisherIds = new Set<string>([googleSetup.adsensePublisherId]);
  const expectedGa4Occurrences = new RegExp(escapeRegex(googleSetup.ga4MeasurementId), "g");
  const expectedClientOccurrences = new RegExp(escapeRegex(googleSetup.adsenseClientId), "g");

  for (const sourceRoot of ["app", "components", "lib"]) {
    for (const filePath of walkFiles(path.join(root, sourceRoot))) {
      const relativePath = path.relative(root, filePath);
      const source = fs.readFileSync(filePath, "utf8");

      if (/google-site-verification/.test(source)) {
        errors.push(`${toPosix(relativePath)}: Search Console verification meta must not be added`);
      }
      for (const match of source.matchAll(/G-[A-Z0-9]{10}/g)) {
        if (!allowedMeasurementIds.has(match[0])) {
          errors.push(`${toPosix(relativePath)}: unexpected GA4 Measurement ID ${match[0]}`);
        }
      }
      for (const match of source.matchAll(/ca-pub-\d{16}/g)) {
        if (!allowedClientIds.has(match[0])) {
          errors.push(`${toPosix(relativePath)}: unexpected AdSense client ID ${match[0]}`);
        }
      }
      for (const match of source.matchAll(/pub-\d{16}/g)) {
        if (!allowedPublisherIds.has(match[0])) {
          errors.push(`${toPosix(relativePath)}: unexpected AdSense publisher ID ${match[0]}`);
        }
      }
      if (/googletagmanager\.com\/gtag\/js/.test(source) && !source.includes("GA4_MEASUREMENT_ID")) {
        errors.push(`${toPosix(relativePath)}: GA4 script URL should be built from the approved constant`);
      }
      if (/pagead2\.googlesyndication\.com/.test(source) && !source.includes("ADSENSE_CLIENT_ID")) {
        errors.push(`${toPosix(relativePath)}: AdSense script URL should be built from the approved constant`);
      }
    }
  }

  if ((setupConstants.match(expectedGa4Occurrences) ?? []).length !== 1) {
    errors.push("lib/google-setup.ts: GA4 Measurement ID should be declared exactly once");
  }
  if ((setupConstants.match(expectedClientOccurrences) ?? []).length !== 1) {
    errors.push("lib/google-setup.ts: AdSense client ID should be declared exactly once");
  }

  checked.push("Google setup exact public values");
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
validateGoogleSetupAppliedSafely();
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
