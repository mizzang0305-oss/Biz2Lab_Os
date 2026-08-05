import fs from "node:fs";
import path from "node:path";

import { getAllPosts, getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type AuditMode =
  | "full"
  | "routes"
  | "links"
  | "sitemap"
  | "metadata"
  | "indexability"
  | "sensitive"
  | "similarity";

type Classification =
  | "FLAGSHIP"
  | "SUPPORTING"
  | "CONSOLIDATE"
  | "EXPAND_WITH_EVIDENCE"
  | "NOINDEX_ISOLATE"
  | "REMOVE_FROM_INDEX"
  | "KEEP_404_OR_410"
  | "REDIRECT_301";

type RouteResult = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirectChain: Array<{ status: number; from: string; to: string }>;
  contentType: string;
  html: string;
};

type InventoryRow = {
  url: string;
  locale: string;
  page_type: string;
  title: string;
  meta_description: string;
  h1: string;
  http_status: number;
  redirect_chain: string;
  canonical: string;
  robots_meta: string;
  sitemap_included: boolean;
  navigation_exposed: boolean;
  inbound_internal_links: number;
  outbound_internal_links: number;
  word_count: number;
  image_count: number;
  unique_image: boolean;
  structured_assets: string;
  actual_evidence: string;
  author: string;
  published_at: string;
  updated_at: string;
  topic_fit: number;
  originality: number;
  evidence: number;
  actionability: number;
  trust: number;
  ux: number;
  index_readiness: number;
  total_score: number;
  classification: Classification;
  template_risk: string;
  thin_content_risk: string;
  orphan_risk: string;
  privacy_risk: string;
  final_recommendation: string;
};

const DEFAULT_BASE_URL = "https://www.biz2lab.com";
const DEFAULT_OUTPUT_DIR = path.join(
  process.cwd(),
  "docs",
  "adsense-recovery",
  "2026-08-05",
);
const REQUEST_TIMEOUT_MS = 12_000;
const REQUEST_DELAY_MS = 30;
const FLAGSHIP_SLUGS = new Set([
  "ai-business-automation-guide",
  "automation-priority-method",
  "daily-numbers-for-small-business",
  "unify-order-channels",
  "separate-picking-inspection-loading-status",
  "accounts-receivable-tracker",
]);
const SUPPORTING_SLUGS = new Set([
  "daily-sales-goal-breakdown",
  "daily-sales-report",
  "payment-reminder-message",
  "sales-achievement-rate",
]);
const EVIDENCE_EXPANSION_SLUGS = new Set([
  "chatgpt-document-cleanup",
  "google-sheets-ai-automation",
  "obsidian-business-knowledge-base",
  "pre-automation-task-list",
  "reduce-repetitive-work-with-ai",
]);
const REDIRECT_SOURCE_ROUTE = "/ko/sales-ops/unify-order-channels-for-sales";
const REDIRECT_DESTINATION_ROUTE = "/ko/small-business/unify-order-channels";

function parseArguments(args: string[]) {
  let mode: AuditMode = "full";
  let baseUrl = DEFAULT_BASE_URL;
  let outputDir = DEFAULT_OUTPUT_DIR;

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    const value = args[index + 1];
    if (argument === "--mode" && value) {
      const allowed: AuditMode[] = [
        "full",
        "routes",
        "links",
        "sitemap",
        "metadata",
        "indexability",
        "sensitive",
        "similarity",
      ];
      if (!allowed.includes(value as AuditMode)) {
        throw new Error(`Unsupported audit mode: ${value}`);
      }
      mode = value as AuditMode;
      index += 1;
    } else if (argument === "--base-url" && value) {
      baseUrl = value.replace(/\/$/, "");
      index += 1;
    } else if (argument === "--output-dir" && value) {
      outputDir = path.resolve(value);
      index += 1;
    } else {
      throw new Error(`Unknown or incomplete argument: ${argument}`);
    }
  }

  const parsedBase = new URL(baseUrl);
  if (!/^https?:$/.test(parsedBase.protocol)) {
    throw new Error("--base-url must use http or https");
  }
  return { mode, baseUrl, outputDir };
}

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function fetchWithTimeout(url: string, redirect: RequestRedirect = "manual") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "GET",
      redirect,
      signal: controller.signal,
      headers: { "user-agent": "Biz2Lab-ReadOnly-AdSense-Audit/2026-08-05" },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function inspectRoute(url: string): Promise<RouteResult> {
  const redirectChain: RouteResult["redirectChain"] = [];
  let currentUrl = url;
  let response: Response | null = null;

  for (let hop = 0; hop <= 5; hop += 1) {
    response = await fetchWithTimeout(currentUrl);
    if (response.status < 300 || response.status >= 400) break;
    const location = response.headers.get("location");
    if (!location) break;
    const nextUrl = new URL(location, currentUrl).toString();
    redirectChain.push({ status: response.status, from: currentUrl, to: nextUrl });
    if (redirectChain.some((entry, index) => index < redirectChain.length - 1 && entry.from === nextUrl)) {
      throw new Error(`redirect loop detected without exposing response content: ${url}`);
    }
    currentUrl = nextUrl;
    await delay(REQUEST_DELAY_MS);
  }

  if (!response) throw new Error(`No response received for ${url}`);
  const contentType = response.headers.get("content-type") ?? "";
  const html = contentType.includes("text/html") ? await response.text() : "";
  return {
    requestedUrl: url,
    finalUrl: currentUrl,
    status: response.status,
    redirectChain,
    contentType,
    html,
  };
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function firstMatch(html: string, expressions: RegExp[]) {
  for (const expression of expressions) {
    const match = html.match(expression);
    if (match?.[1]) return decodeHtml(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  }
  return "";
}

function metadataFromHtml(html: string) {
  return {
    title: firstMatch(html, [/<title[^>]*>([\s\S]*?)<\/title>/i]),
    description: firstMatch(html, [/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i]),
    h1: firstMatch(html, [/<h1[^>]*>([\s\S]*?)<\/h1>/i]),
    canonical: firstMatch(html, [/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i]),
    robots: firstMatch(html, [/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["'][^>]*>/i]),
    ogUrl: firstMatch(html, [/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["'][^>]*>/i, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:url["'][^>]*>/i]),
  };
}

function normalizedPath(value: string) {
  const url = new URL(value, DEFAULT_BASE_URL);
  return `${url.pathname}${url.search}`;
}

function internalLinksFromHtml(html: string) {
  const links = new Set<string>();
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const href = decodeHtml(match[1]);
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const url = new URL(href, DEFAULT_BASE_URL);
      if (url.origin === DEFAULT_BASE_URL) links.add(`${url.pathname}${url.search}`);
    } catch {
      // Invalid hrefs are reported as broken by the source validators.
    }
  }
  return [...links];
}

function visibleWordCount(html: string) {
  const text = decodeHtml(
    html
      .replace(/<(script|style|svg)[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
  return text ? text.split(/\s+/).length : 0;
}

function imageSources(html: string) {
  return [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((match) => decodeHtml(match[1]));
}

function contentClassification(slug: string, route: string, category: string, isPublic: boolean): Classification {
  if (route === REDIRECT_SOURCE_ROUTE) return "REDIRECT_301";
  if (FLAGSHIP_SLUGS.has(slug)) return "FLAGSHIP";
  if (SUPPORTING_SLUGS.has(slug)) return "SUPPORTING";
  if (isPublic || category === "contracts-payments" || category === "small-business" || EVIDENCE_EXPANSION_SLUGS.has(slug)) {
    return "EXPAND_WITH_EVIDENCE";
  }
  return "NOINDEX_ISOLATE";
}

function scoreFor(classification: Classification, hasVisualEvidence: boolean) {
  const scores = classification === "FLAGSHIP"
    ? { topic_fit: 5, originality: 5, evidence: hasVisualEvidence ? 5 : 3, actionability: 5, trust: 5, ux: 4, index_readiness: hasVisualEvidence ? 5 : 4 }
    : classification === "SUPPORTING"
      ? { topic_fit: 5, originality: 4, evidence: 2, actionability: 5, trust: 4, ux: 4, index_readiness: 5 }
      : classification === "EXPAND_WITH_EVIDENCE"
        ? { topic_fit: 4, originality: 3, evidence: 1, actionability: 3, trust: 3, ux: 3, index_readiness: 1 }
        : classification === "REDIRECT_301"
          ? { topic_fit: 5, originality: 1, evidence: 2, actionability: 1, trust: 4, ux: 3, index_readiness: 4 }
          : { topic_fit: 1, originality: 2, evidence: 1, actionability: 2, trust: 2, ux: 3, index_readiness: 0 };
  return { ...scores, total_score: Object.values(scores).reduce((sum, value) => sum + value, 0) };
}

function csvValue(value: unknown) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows: InventoryRow[]) {
  const keys = Object.keys(rows[0] ?? {}) as Array<keyof InventoryRow>;
  return [keys.join(","), ...rows.map((row) => keys.map((key) => csvValue(row[key])).join(","))].join("\n") + "\n";
}

function normalizeMarkdown(value: string) {
  return value
    .toLowerCase()
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(value: string, size = 5) {
  const tokens = normalizeMarkdown(value).split(" ").filter((token) => token.length > 1);
  const output = new Set<string>();
  for (let index = 0; index <= tokens.length - size; index += 1) output.add(tokens.slice(index, index + size).join(" "));
  return output;
}

function jaccard(left: Set<string>, right: Set<string>) {
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function buildSimilarityReport() {
  const posts = getAllPosts();
  const comparable = posts.map((post) => ({
    slug: post.slug,
    route: post.route,
    isPublic: post.frontmatter.status === "published" && !post.frontmatter.draft && !post.frontmatter.noindex,
    shingles: shingles(post.content),
  }));
  const pairs: Array<{ left: string; right: string; similarity: number; publicPair: boolean }> = [];
  for (let left = 0; left < comparable.length; left += 1) {
    for (let right = left + 1; right < comparable.length; right += 1) {
      const similarity = jaccard(comparable[left].shingles, comparable[right].shingles);
      pairs.push({
        left: comparable[left].route,
        right: comparable[right].route,
        similarity: Number(similarity.toFixed(3)),
        publicPair: comparable[left].isPublic && comparable[right].isPublic,
      });
    }
  }
  pairs.sort((left, right) => right.similarity - left.similarity);
  const publicPairs = pairs.filter((pair) => pair.publicPair);
  return {
    generatedAt: new Date().toISOString(),
    algorithm: "5-token normalized shingle Jaccard similarity",
    postCount: posts.length,
    publicPostCount: comparable.filter((post) => post.isPublic).length,
    overallMaxSimilarity: pairs[0]?.similarity ?? 0,
    publicMaxSimilarity: publicPairs[0]?.similarity ?? 0,
    highSimilarityThreshold: 0.2,
    highSimilarityPairs: pairs.filter((pair) => pair.similarity >= 0.2),
    topPairs: pairs.slice(0, 20),
  };
}

function walkTextFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) return walkTextFiles(fullPath);
    return /\.(?:md|mdx|csv|json|ts|tsx|txt)$/i.test(entry.name) ? [fullPath] : [];
  });
}

function sensitiveAudit() {
  const roots = [
    path.join(process.cwd(), "content", "ko"),
    path.join(process.cwd(), "public", "downloads"),
    path.join(process.cwd(), "app", "ko"),
    path.join(process.cwd(), "components"),
    path.join(process.cwd(), "lib", "site-settings.ts"),
    path.join(process.cwd(), "lib", "editorial-evidence.ts"),
  ];
  const files = roots.flatMap((root) => fs.statSync(root).isDirectory() ? walkTextFiles(root) : [root]);
  const patterns = [
    { label: "email", regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
    { label: "Korean phone", regex: /(?<!\d)(?:01[016789]|0\d{1,2})[- .]?\d{3,4}[- .]?\d{4}(?!\d)/g },
    { label: "resident registration number", regex: /(?<!\d)\d{6}[- ]?[1-4]\d{6}(?!\d)/g },
    { label: "business registration number", regex: /(?<!\d)\d{3}[- ]?\d{2}[- ]?\d{5}(?!\d)/g },
    { label: "secret assignment", regex: /(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"']{12,}["']/gi },
  ];
  const findings: Array<{ file: string; pattern: string; count: number }> = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const pattern of patterns) {
      const count = [...content.matchAll(pattern.regex)].length;
      pattern.regex.lastIndex = 0;
      if (count > 0) findings.push({ file: path.relative(process.cwd(), file).replaceAll("\\", "/"), pattern: pattern.label, count });
    }
  }
  return { filesScanned: files.length, findings, limitation: "Binary images were not OCR-scanned; approved evidence remains a HUMAN_CHECK." };
}

async function loadSitemapPaths(baseUrl: string) {
  const response = await fetchWithTimeout(`${baseUrl}/sitemap.xml`, "follow");
  if (response.status !== 200) throw new Error(`sitemap.xml returned ${response.status}`);
  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizedPath(match[1]));
  const expectedCount = staticPublicRoutes.length + getPublicPosts().length;
  if (paths.length !== expectedCount) {
    throw new Error(
      `sitemap inventory mismatch: expected ${expectedCount} URLs, found ${paths.length}; the target may be protected or returning non-sitemap HTML`,
    );
  }
  return paths;
}

async function auditPublicGraph(baseUrl: string, sitemapPaths: string[]) {
  const pages = new Map<string, RouteResult>();
  const graph = new Map<string, string[]>();
  for (const route of sitemapPaths) {
    const result = await inspectRoute(`${baseUrl}${route}`);
    pages.set(route, result);
    graph.set(route, internalLinksFromHtml(result.html));
    await delay(REQUEST_DELAY_MS);
  }
  const internalTargets = [...new Set([...graph.values()].flat())];
  const targetResults = new Map<string, RouteResult>();
  for (const route of internalTargets) {
    targetResults.set(route, await inspectRoute(`${baseUrl}${route}`));
    await delay(REQUEST_DELAY_MS);
  }
  return { pages, graph, targetResults };
}

async function buildInventory(baseUrl: string, sitemapPaths: string[]) {
  const posts = getAllPosts();
  const publicPosts = new Set(getPublicPosts().map((post) => post.route));
  const approvedEvidence = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "evidence-manifest.json"), "utf8"),
  ) as Array<{ postSlug: string; status: string }>;
  const approvedBySlug = new Map<string, number>();
  for (const item of approvedEvidence) {
    if (item.status === "approved") approvedBySlug.set(item.postSlug, (approvedBySlug.get(item.postSlug) ?? 0) + 1);
  }
  const routes = [
    ...staticPublicRoutes.map((route) => ({ route, pageType: route === "/ko" ? "home" : route.split("/").at(-1) ?? "static", post: null })),
    ...posts.map((post) => ({ route: post.route, pageType: "article", post })),
    { route: "/ko/ops/seo-dashboard", pageType: "ops-noindex", post: null },
  ];
  const uniqueRoutes = [...new Map(routes.map((entry) => [entry.route, entry])).values()];
  const routeResults = new Map<string, RouteResult>();
  for (const entry of uniqueRoutes) {
    routeResults.set(entry.route, await inspectRoute(`${baseUrl}${entry.route}`));
    await delay(REQUEST_DELAY_MS);
  }

  const sitemapSet = new Set(sitemapPaths);
  const graph = new Map<string, string[]>();
  const imageUsage = new Map<string, number>();
  for (const route of sitemapPaths) {
    const result = routeResults.get(route) ?? await inspectRoute(`${baseUrl}${route}`);
    routeResults.set(route, result);
    graph.set(route, internalLinksFromHtml(result.html));
    for (const source of imageSources(result.html)) imageUsage.set(source, (imageUsage.get(source) ?? 0) + 1);
  }
  const inbound = new Map<string, number>();
  for (const links of graph.values()) for (const link of links) inbound.set(link, (inbound.get(link) ?? 0) + 1);
  const homeLinks = new Set(graph.get("/ko") ?? []);

  const rows: InventoryRow[] = [];
  for (const entry of uniqueRoutes) {
    const result = routeResults.get(entry.route)!;
    const meta = metadataFromHtml(result.html);
    const post = entry.post;
    const isPublic = post ? publicPosts.has(post.route) && !post.frontmatter.noindex : sitemapSet.has(entry.route);
    const classification = post
      ? contentClassification(post.slug, post.route, post.category, isPublic)
      : entry.pageType === "ops-noindex" ? "NOINDEX_ISOLATE" : "SUPPORTING";
    const evidenceCount = post ? approvedBySlug.get(post.slug) ?? 0 : 0;
    const score = scoreFor(classification, evidenceCount > 0);
    const images = imageSources(result.html);
    const redirectText = result.redirectChain.map((item) => `${item.status} ${normalizedPath(item.from)} -> ${normalizedPath(item.to)}`).join(" | ");
    const structuredAssets = post
      ? [
          /\|.+\|/m.test(post.content) ? "table" : "",
          /```/.test(post.content) ? "code" : "",
          /\]\(\/downloads\//.test(post.content) ? "download" : "",
        ].filter(Boolean).join("|")
      : "";
    const isHistorical404 = Boolean(post && !isPublic && result.status === 404);
    const finalRecommendation = classification === "FLAGSHIP"
      ? evidenceCount > 0 ? "KEEP_AND_LINK_AS_FLAGSHIP" : "HUMAN_EVIDENCE_REQUIRED_BEFORE_FLAGSHIP_PROMOTION"
      : classification === "REDIRECT_301"
        ? `KEEP_SINGLE_PERMANENT_REDIRECT_TO_${REDIRECT_DESTINATION_ROUTE}`
        : classification === "NOINDEX_ISOLATE"
          ? isHistorical404 ? "KEEP_404_PENDING_SEARCH_CONSOLE_AND_HUMAN_DECISION" : "KEEP_NOINDEX_AND_OUT_OF_SITEMAP"
          : classification === "EXPAND_WITH_EVIDENCE"
            ? isHistorical404 ? "KEEP_404_UNTIL_TRUTHFUL_EVIDENCE_EXISTS" : "EXPAND_WITH_TRUTHFUL_EVIDENCE"
            : "KEEP_AS_SUPPORTING";
    rows.push({
      url: absoluteUrl(entry.route),
      locale: "ko",
      page_type: entry.pageType,
      title: post?.frontmatter.title ?? meta.title,
      meta_description: post?.frontmatter.description ?? meta.description,
      h1: meta.h1,
      http_status: result.status,
      redirect_chain: redirectText,
      canonical: meta.canonical,
      robots_meta: meta.robots,
      sitemap_included: sitemapSet.has(entry.route),
      navigation_exposed: homeLinks.has(entry.route),
      inbound_internal_links: inbound.get(entry.route) ?? 0,
      outbound_internal_links: graph.get(entry.route)?.length ?? 0,
      word_count: post ? normalizeMarkdown(post.content).split(" ").filter(Boolean).length : visibleWordCount(result.html),
      image_count: images.length,
      unique_image: images.length > 0 && images.every((image) => imageUsage.get(image) === 1),
      structured_assets: structuredAssets,
      actual_evidence: post ? evidenceCount > 0 ? `approved_visual:${evidenceCount}` : post.frontmatter.evidenceRequired ? "source_only_or_missing_visual" : "editorial_or_calculation_only" : "not_applicable",
      author: post?.frontmatter.author ?? "Biz2Lab",
      published_at: post?.frontmatter.publishedAt ?? "",
      updated_at: post?.frontmatter.updatedAt ?? "",
      ...score,
      classification,
      template_risk: post && !isPublic ? "review_before_republication" : "low",
      thin_content_risk: result.status === 200 && visibleWordCount(result.html) < 350 ? "high" : "low",
      orphan_risk: sitemapSet.has(entry.route) && (inbound.get(entry.route) ?? 0) === 0 ? "high" : "low",
      privacy_risk: evidenceCount > 0 ? "human_masking_check_required" : "no_pattern_detected",
      final_recommendation: finalRecommendation,
    });
  }
  return rows;
}

function writeJson(filePath: string, value: unknown) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function countBy<T extends string>(values: T[]) {
  return Object.fromEntries([...new Set(values)].map((value) => [value, values.filter((item) => item === value).length]));
}

async function writeFullReports(baseUrl: string, outputDir: string) {
  fs.mkdirSync(outputDir, { recursive: true });
  const sitemapPaths = await loadSitemapPaths(baseUrl);
  const { pages, targetResults } = await auditPublicGraph(baseUrl, sitemapPaths);
  const inventory = await buildInventory(baseUrl, sitemapPaths);
  const similarity = buildSimilarityReport();
  const sensitive = sensitiveAudit();
  const brokenLinks = [...targetResults.entries()].filter(([, result]) => result.status >= 400 || result.redirectChain.length > 0);
  const sitemapErrors = sitemapPaths.flatMap((route) => {
    const result = pages.get(route)!;
    const meta = metadataFromHtml(result.html);
    const expectedCanonical = absoluteUrl(route);
    const errors: string[] = [];
    if (result.status !== 200) errors.push(`${route}: expected 200, got ${result.status}`);
    if (result.redirectChain.length > 0) errors.push(`${route}: sitemap URL redirects`);
    if (meta.canonical !== expectedCanonical) errors.push(`${route}: canonical mismatch`);
    if (/noindex/i.test(meta.robots)) errors.push(`${route}: sitemap URL is noindex`);
    if (meta.ogUrl !== expectedCanonical) errors.push(`${route}: Open Graph URL mismatch`);
    return errors;
  });
  const duplicateTitles = countBy(inventory.filter((row) => row.sitemap_included).map((row) => row.title));
  const duplicateDescriptions = countBy(inventory.filter((row) => row.sitemap_included).map((row) => row.meta_description));
  const metadataDuplicates = {
    titles: Object.entries(duplicateTitles).filter(([title, count]) => title && count > 1),
    descriptions: Object.entries(duplicateDescriptions).filter(([description, count]) => description && count > 1),
  };

  fs.writeFileSync(path.join(outputDir, "url-inventory.csv"), toCsv(inventory), "utf8");
  writeJson(path.join(outputDir, "url-inventory.json"), {
    generatedAt: new Date().toISOString(),
    baseline: baseUrl,
    methodology: "Read-only GET crawl combined with repository routes and Markdown frontmatter.",
    limitations: ["Search Console export unavailable", "Image OCR is a HUMAN_CHECK", "Scores are triage aids, not AdSense approval predictions"],
    rows: inventory,
  });
  writeJson(path.join(outputDir, "content-similarity-report.json"), similarity);
  fs.writeFileSync(
    path.join(outputDir, "content-similarity-report.md"),
    `# 콘텐츠 유사도 감사\n\n- 기준: 5-token normalized shingle Jaccard\n- 전체 Markdown: ${similarity.postCount}\n- 공개 Markdown: ${similarity.publicPostCount}\n- 공개 최대 유사도: ${similarity.publicMaxSimilarity.toFixed(3)}\n- 전체 최대 유사도: ${similarity.overallMaxSimilarity.toFixed(3)}\n- 0.200 이상 pair: ${similarity.highSimilarityPairs.length}\n\n## 상위 pair\n\n${similarity.topPairs.map((pair) => `- \`${pair.left}\` ↔ \`${pair.right}\`: ${pair.similarity.toFixed(3)}${pair.publicPair ? " (public)" : ""}`).join("\n")}\n\n단어 치환만으로 유사도를 낮추지 않는다. 공개 11편은 별도 authority/originality gate를 함께 통과해야 한다.\n`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(outputDir, "broken-link-report.md"),
    `# 내부 링크·사이트맵 보고서\n\n- 감사 기준: ${baseUrl}\n- sitemap URL: ${sitemapPaths.length}\n- rendered internal target: ${targetResults.size}\n- broken 또는 redirect target: ${brokenLinks.length}\n- sitemap/canonical/indexability 오류: ${sitemapErrors.length}\n\n${brokenLinks.length === 0 ? "공개 sitemap 페이지에서 수집한 내부 링크는 모두 최종 200으로 응답했다." : brokenLinks.map(([route, result]) => `- ${route}: ${result.status}, redirects=${result.redirectChain.length}`).join("\n")}\n\n## 제한\n\nSearch Console crawl/index export는 제공되지 않아 실제 Google 선택 canonical과 과거 URL 유입은 BLOCKED_SEARCH_CONSOLE이다.\n`,
    "utf8",
  );
  const redirectRows = inventory
    .filter((row) => row.page_type === "article" && (row.http_status === 404 || row.redirect_chain))
    .map((row) => ({
      source: new URL(row.url).pathname,
      current_status: row.http_status,
      destination: row.redirect_chain ? new URL(REDIRECT_DESTINATION_ROUTE, DEFAULT_BASE_URL).pathname : "",
      decision: row.classification === "REDIRECT_301" ? "KEEP_PERMANENT_REDIRECT_308" : "KEEP_404_PENDING_HUMAN_DECISION",
      reason: row.classification === "REDIRECT_301" ? "same search intent and a verified replacement exist" : "no verified equivalent replacement; do not redirect to homepage",
    }));
  const redirectKeys = Object.keys(redirectRows[0] ?? {});
  fs.writeFileSync(
    path.join(outputDir, "redirect-map.csv"),
    `${redirectKeys.join(",")}\n${redirectRows.map((row) => redirectKeys.map((key) => csvValue(row[key as keyof typeof row])).join(",")).join("\n")}\n`,
    "utf8",
  );
  const classificationCounts = countBy(inventory.map((row) => row.classification));
  const statusCounts = countBy(inventory.map((row) => String(row.http_status)));
  fs.writeFileSync(
    path.join(outputDir, "current-state-audit.md"),
    `# AdSense low-value-content 복구 기준선 감사\n\n- 감사일: 2026-08-05\n- 기준 URL: ${baseUrl}\n- 방법: Production 읽기 전용 GET + 저장소 route/frontmatter 교차검증\n- AdSense 조작: 수행하지 않음\n\n## 요약\n\n- inventory: ${inventory.length}\n- sitemap: ${sitemapPaths.length}\n- HTTP 상태: ${Object.entries(statusCounts).map(([status, count]) => `${status}=${count}`).join(", ")}\n- 분류: ${Object.entries(classificationCounts).map(([classification, count]) => `${classification}=${count}`).join(", ")}\n- broken/redirect internal target: ${brokenLinks.length}\n- sitemap/canonical/indexability 오류: ${sitemapErrors.length}\n- duplicate title: ${metadataDuplicates.titles.length}\n- duplicate description: ${metadataDuplicates.descriptions.length}\n- 민감 패턴 finding: ${sensitive.findings.length}\n\n## 확인된 근본 원인\n\n- HIGH: 과거 공개 URL 65개 중 동일 의도 redirect 1개를 제외한 URL은 route 미생성 404이며, Search Console 근거 없이 삭제·복원·홈 redirect를 결정할 수 없다.\n- HIGH: 전자계약·결제 공개 증거가 부족해 관련 허브와 글을 정직하게 복원할 수 없다.\n- HIGH: 수정 전 기본 OG 이미지는 영화·OTT 브랜드를 노출했다.\n- MEDIUM: 수정 전 404는 homepage canonical을 상속했다.\n- MEDIUM: 공개 허브 4개의 글 수가 6/2/2/1로 불균형했다.\n- MEDIUM: apex/protocol/root 조합 redirect는 Production 설정 경계이며 이번 PR에서 변경하지 않는다.\n\n## 감사 한계\n\n- Search Console과 AdSense 정책 센터는 계정 접근 없이 자동 통과시키지 않는다.\n- 이미지 OCR은 수행하지 않았으며 승인 증거와 Preview 캡처의 마스킹은 HUMAN_CHECK다.\n- 본 문서는 승인 보장이 아니라 위험 감소 기록이다.\n`,
    "utf8",
  );

  if (sitemapErrors.length > 0 || brokenLinks.length > 0 || metadataDuplicates.titles.length > 0 || metadataDuplicates.descriptions.length > 0 || sensitive.findings.length > 0) {
    throw new Error(`AdSense audit failed: sitemap=${sitemapErrors.length}, links=${brokenLinks.length}, duplicateMetadata=${metadataDuplicates.titles.length + metadataDuplicates.descriptions.length}, sensitive=${sensitive.findings.length}`);
  }
  console.log(`audit:adsense PASS (inventory=${inventory.length}, sitemap=${sitemapPaths.length}, publicLinks=${targetResults.size})`);
}

async function runMode(mode: AuditMode, baseUrl: string, outputDir: string) {
  if (mode === "full") return writeFullReports(baseUrl, outputDir);
  if (mode === "similarity") {
    const report = buildSimilarityReport();
    if (report.publicMaxSimilarity > 0.4) throw new Error(`public content similarity too high: ${report.publicMaxSimilarity}`);
    console.log(`audit:content-similarity PASS (public max=${report.publicMaxSimilarity.toFixed(3)}, all max=${report.overallMaxSimilarity.toFixed(3)})`);
    return;
  }
  if (mode === "sensitive") {
    const report = sensitiveAudit();
    if (report.findings.length > 0) throw new Error(`sensitive pattern audit found ${report.findings.length} sanitized findings`);
    console.log(`audit:sensitive-content PASS (${report.filesScanned} files; image OCR HUMAN_CHECK)`);
    return;
  }
  const sitemapPaths = await loadSitemapPaths(baseUrl);
  const { pages, targetResults } = await auditPublicGraph(baseUrl, sitemapPaths);
  if (mode === "routes") {
    const failures = [...pages.entries()].filter(([, result]) => result.status !== 200 || result.redirectChain.length > 0);
    if (failures.length > 0) throw new Error(`route audit found ${failures.length} sitemap route failures`);
    console.log(`audit:routes PASS (${pages.size} exact 200 routes)`);
    return;
  }
  if (mode === "links") {
    const failures = [...targetResults.values()].filter((result) => result.status !== 200 || result.redirectChain.length > 0);
    if (failures.length > 0) throw new Error(`link audit found ${failures.length} non-final targets`);
    console.log(`audit:links PASS (${targetResults.size} final internal targets)`);
    return;
  }
  if (mode === "sitemap" || mode === "indexability" || mode === "metadata") {
    const titles = new Map<string, string[]>();
    const descriptions = new Map<string, string[]>();
    const errors: string[] = [];
    for (const [route, result] of pages) {
      const meta = metadataFromHtml(result.html);
      const expected = absoluteUrl(route);
      if (result.status !== 200 || result.redirectChain.length > 0) errors.push(`${route}: not final 200`);
      if (meta.canonical !== expected || meta.ogUrl !== expected) errors.push(`${route}: canonical or og:url mismatch`);
      if (/noindex/i.test(meta.robots)) errors.push(`${route}: noindex in sitemap`);
      titles.set(meta.title, [...(titles.get(meta.title) ?? []), route]);
      descriptions.set(meta.description, [...(descriptions.get(meta.description) ?? []), route]);
    }
    if (mode === "metadata") {
      for (const [value, owners] of [...titles, ...descriptions]) if (value && owners.length > 1) errors.push(`duplicate metadata across ${owners.length} routes`);
    }
    if (errors.length > 0) throw new Error(`${mode} audit found ${errors.length} errors`);
    console.log(`audit:${mode} PASS (${pages.size} sitemap routes)`);
    return;
  }
  throw new Error(`Mode did not run: ${mode}`);
}

const { mode, baseUrl, outputDir } = parseArguments(process.argv.slice(2));
runMode(mode, baseUrl, outputDir).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
