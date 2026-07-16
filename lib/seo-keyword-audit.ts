import fs from "node:fs";
import path from "node:path";

import { z } from "zod";

import { getPublicPosts, getSitemapPosts, type Post } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const keywordSearchIntents = [
  "informational",
  "comparison",
  "caution",
  "how-to",
  "business-use",
] as const;

export const keywordClusters = [
  "automation-tools",
  "ai-workflow",
  "business-automation",
  "open-source-caution",
  "content-automation",
] as const;

export const keywordAudiences = ["소상공인", "1인 사업자", "영업팀", "개발자", "운영자"] as const;

export const keywordHookStatuses = [
  "strong",
  "needs-title-hook",
  "needs-intro-hook",
  "needs-meta-hook",
  "needs-cta-hook",
] as const;

export type KeywordSearchIntent = (typeof keywordSearchIntents)[number];
export type KeywordCluster = (typeof keywordClusters)[number];
export type KeywordAudience = (typeof keywordAudiences)[number];
export type KeywordHookStatus = (typeof keywordHookStatuses)[number];

export type KeywordCoverageStatus =
  | "GOOD"
  | "NEEDS_KEYWORD_ALIGNMENT"
  | "NEEDS_META_REWRITE"
  | "NEEDS_INTERNAL_LINKS"
  | "NEEDS_ALT_TEXT"
  | "NEEDS_INDEX_CHECK";

export type SeoKeywordMapEntry = {
  slug: string;
  route: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: KeywordSearchIntent;
  audience: KeywordAudience;
  cluster: KeywordCluster;
  hookStatus: KeywordHookStatus;
  lossAvoidanceAngle: string;
  recommendedAction: string;
};

export type SeoKeywordArticleAudit = {
  slug: string;
  route: string;
  title: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: KeywordSearchIntent;
  audience: KeywordAudience;
  cluster: KeywordCluster;
  hookStatus: KeywordHookStatus;
  lossAvoidanceAngle: string;
  keywordCoverageStatus: KeywordCoverageStatus;
  indexReadinessStatus: KeywordCoverageStatus;
  recommendedAction: string;
  checks: {
    primaryInTitle: boolean;
    primaryInMetaDescription: boolean;
    primaryInIntro: boolean;
    secondaryKeywordMatches: number;
    descriptiveInternalLinks: boolean;
    seriesHubLinked: boolean;
    relatedArticleLinks: number;
    heroAltDescriptive: boolean;
    canonicalWww: boolean;
    includedInSitemap: boolean;
    noindex: boolean;
    brokenInternalLinks: number;
  };
};

export type SeoKeywordAudit = {
  articles: SeoKeywordArticleAudit[];
  summary: {
    totalArticles: number;
    mappedArticles: number;
    missingKeywordMap: number;
    strongArticles: number;
    weakArticles: number;
    needsKeywordAlignment: number;
    needsMetaRewrite: number;
    needsInternalLinks: number;
    needsAltText: number;
    needsIndexCheck: number;
    clusters: Record<KeywordCluster, number>;
    searchIntents: Record<KeywordSearchIntent, number>;
  };
};

const keywordMapEntrySchema = z.object({
  slug: z.string().min(1),
  route: z.string().startsWith("/ko/"),
  primaryKeyword: z.string().min(2),
  secondaryKeywords: z.array(z.string().min(2)).min(2),
  searchIntent: z.enum(keywordSearchIntents),
  audience: z.enum(keywordAudiences),
  cluster: z.enum(keywordClusters),
  hookStatus: z.enum(keywordHookStatuses),
  lossAvoidanceAngle: z.string().min(10),
  recommendedAction: z.string().min(4),
});

const keywordMapSchema = z.array(keywordMapEntrySchema);

const automationSeriesHubSlug = "free-open-source-automation-tools-series";
const automationSeriesHubRoute = `/ko/automation/${automationSeriesHubSlug}`;
const openSourceSeriesClusters = new Set<KeywordCluster>([
  "automation-tools",
  "ai-workflow",
  "open-source-caution",
  "content-automation",
]);

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
}

export function readSeoKeywordMap(rootDir = process.cwd()): SeoKeywordMapEntry[] {
  const publicSlugs = new Set(getPublicPosts().map((post) => post.slug));
  return keywordMapSchema
    .parse(readJson(path.join(rootDir, "data", "seo-keyword-map.json")))
    .filter((entry) => publicSlugs.has(entry.slug));
}

export function seoKeywordMapBySlug(rootDir = process.cwd()) {
  return new Map(readSeoKeywordMap(rootDir).map((entry) => [entry.slug, entry]));
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordTerms(keyword: string) {
  return Array.from(normalizeText(keyword).matchAll(/[\p{L}\p{N}-]+/gu))
    .map((match) => match[0])
    .filter((term) => term.length >= 2);
}

function textMatchesKeyword(keyword: string, text: string) {
  const normalizedKeyword = normalizeText(keyword);
  const normalizedText = normalizeText(text);

  if (!normalizedKeyword || !normalizedText) {
    return false;
  }

  if (normalizedText.includes(normalizedKeyword)) {
    return true;
  }

  const terms = keywordTerms(keyword);
  if (terms.length === 0) {
    return false;
  }

  const requiredMatches = Math.min(2, terms.length);
  return terms.filter((term) => normalizedText.includes(term)).length >= requiredMatches;
}

function markdownPlainText(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstKoreanText(content: string, maxLength = 150) {
  return markdownPlainText(content).slice(0, maxLength);
}

function markdownLinks(content: string) {
  return Array.from(content.matchAll(/\[([^\]]+)]\(([^)\s#]+)(?:#[^)]+)?\)/g)).map((match) => ({
    text: match[1].trim(),
    href: match[2].trim(),
  }));
}

function outboundLinks(content: string) {
  return markdownLinks(content)
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//i.test(href));
}

function descriptiveInternalLinks(post: Post) {
  const links = markdownLinks(post.content).filter((link) => link.href.startsWith("/ko/"));
  if (links.length === 0 && post.frontmatter.relatedPosts.length === 0) {
    return false;
  }

  return links.every((link) => {
    const text = normalizeText(link.text);
    return text.length >= 3 && !text.includes(normalizeText(link.href.split("/").pop() ?? ""));
  });
}

function seriesHubLinked(post: Post, entry: SeoKeywordMapEntry) {
  if (post.slug === automationSeriesHubSlug || !openSourceSeriesClusters.has(entry.cluster)) {
    return true;
  }

  return post.internalLinks.includes(automationSeriesHubRoute) || post.frontmatter.relatedPosts.includes(automationSeriesHubSlug);
}

function heroAltDescriptive(post: Post, entry: SeoKeywordMapEntry) {
  const alt = post.frontmatter.heroAlt.trim();
  if (alt.length < 10) {
    return false;
  }

  return textMatchesKeyword(entry.primaryKeyword, alt) || keywordTerms(entry.primaryKeyword).some((term) => normalizeText(alt).includes(term));
}

function secondaryMatches(entry: SeoKeywordMapEntry, post: Post) {
  const searchableText = [
    post.frontmatter.title,
    post.frontmatter.description,
    post.frontmatter.heroAlt,
    post.headings.map((heading) => heading.text).join(" "),
    post.content,
  ].join(" ");

  return entry.secondaryKeywords.filter((keyword) => textMatchesKeyword(keyword, searchableText)).length;
}

function brokenInternalLinkCount(post: Post, availableRoutes: Set<string>) {
  return post.internalLinks.filter((link) => !availableRoutes.has(link)).length;
}

function keywordCoverageStatus(checks: SeoKeywordArticleAudit["checks"]): KeywordCoverageStatus {
  if (!checks.heroAltDescriptive) {
    return "NEEDS_ALT_TEXT";
  }
  if (!checks.primaryInTitle && !checks.primaryInMetaDescription) {
    return "NEEDS_META_REWRITE";
  }
  if (
    (!checks.primaryInIntro && !checks.primaryInTitle) ||
    checks.secondaryKeywordMatches < 1
  ) {
    return "NEEDS_KEYWORD_ALIGNMENT";
  }
  if (
    !checks.descriptiveInternalLinks ||
    !checks.seriesHubLinked ||
    checks.relatedArticleLinks < 2 ||
    checks.brokenInternalLinks > 0
  ) {
    return "NEEDS_INTERNAL_LINKS";
  }

  return "GOOD";
}

function indexReadinessStatus(checks: SeoKeywordArticleAudit["checks"]): KeywordCoverageStatus {
  return checks.canonicalWww && checks.includedInSitemap && !checks.noindex ? "GOOD" : "NEEDS_INDEX_CHECK";
}

function recommendedAction(entry: SeoKeywordMapEntry, keywordStatus: KeywordCoverageStatus, indexStatus: KeywordCoverageStatus) {
  if (indexStatus !== "GOOD") {
    return "canonical, sitemap 포함, noindex 상태를 먼저 확인합니다.";
  }
  switch (keywordStatus) {
    case "GOOD":
      return entry.recommendedAction;
    case "NEEDS_META_REWRITE":
      return "검색 의도가 meta description에 자연스럽게 드러나는지 점검합니다.";
    case "NEEDS_INTERNAL_LINKS":
      return "관련 글 anchor와 시리즈 허브 연결을 보강합니다.";
    case "NEEDS_ALT_TEXT":
      return "대표 이미지 alt가 글 주제와 핵심 키워드를 설명하도록 보강합니다.";
    case "NEEDS_KEYWORD_ALIGNMENT":
    default:
      return "제목, 도입부, H2/H3에서 핵심 검색 의도가 자연스럽게 보이는지 점검합니다.";
  }
}

function auditPost({
  post,
  entry,
  availableRoutes,
  sitemapRoutes,
}: {
  post: Post;
  entry: SeoKeywordMapEntry;
  availableRoutes: Set<string>;
  sitemapRoutes: Set<string>;
}): SeoKeywordArticleAudit {
  const intro = firstKoreanText(post.content);
  const secondaryKeywordMatches = secondaryMatches(entry, post);
  const checks = {
    primaryInTitle: textMatchesKeyword(entry.primaryKeyword, post.frontmatter.title),
    primaryInMetaDescription: textMatchesKeyword(entry.primaryKeyword, post.frontmatter.description),
    primaryInIntro: textMatchesKeyword(entry.primaryKeyword, intro),
    secondaryKeywordMatches,
    descriptiveInternalLinks: descriptiveInternalLinks(post),
    seriesHubLinked: seriesHubLinked(post, entry),
    relatedArticleLinks: post.internalLinks.length + post.frontmatter.relatedPosts.length,
    heroAltDescriptive: heroAltDescriptive(post, entry),
    canonicalWww: post.frontmatter.canonical === absoluteUrl(post.route),
    includedInSitemap: sitemapRoutes.has(post.route),
    noindex: post.frontmatter.noindex,
    brokenInternalLinks: brokenInternalLinkCount(post, availableRoutes),
  };
  const coverageStatus = keywordCoverageStatus(checks);
  const indexStatus = indexReadinessStatus(checks);

  return {
    slug: post.slug,
    route: post.route,
    title: post.frontmatter.title,
    category: post.category,
    primaryKeyword: entry.primaryKeyword,
    secondaryKeywords: entry.secondaryKeywords,
    searchIntent: entry.searchIntent,
    audience: entry.audience,
    cluster: entry.cluster,
    hookStatus: entry.hookStatus,
    lossAvoidanceAngle: entry.lossAvoidanceAngle,
    keywordCoverageStatus: coverageStatus,
    indexReadinessStatus: indexStatus,
    recommendedAction: recommendedAction(entry, coverageStatus, indexStatus),
    checks,
  };
}

function countBy<T extends string>(values: readonly T[], keys: readonly T[]): Record<T, number> {
  return Object.fromEntries(keys.map((key) => [key, values.filter((value) => value === key).length])) as Record<T, number>;
}

export function auditSeoKeywords(rootDir = process.cwd()): SeoKeywordAudit {
  const posts = getPublicPosts();
  const keywordMap = seoKeywordMapBySlug(rootDir);
  const availableRoutes = new Set([...staticPublicRoutes, ...posts.map((post) => post.route)]);
  const sitemapRoutes = new Set(getSitemapPosts().map((post) => post.route));
  const articles = posts
    .map((post) => {
      const entry = keywordMap.get(post.slug);
      if (!entry) {
        return null;
      }
      return auditPost({ post, entry, availableRoutes, sitemapRoutes });
    })
    .filter((article): article is SeoKeywordArticleAudit => Boolean(article));
  const missingKeywordMap = posts.length - articles.length;
  const weakArticles = articles.filter(
    (article) => article.keywordCoverageStatus !== "GOOD" || article.indexReadinessStatus !== "GOOD",
  ).length;

  return {
    articles,
    summary: {
      totalArticles: posts.length,
      mappedArticles: articles.length,
      missingKeywordMap,
      strongArticles: articles.length - weakArticles,
      weakArticles,
      needsKeywordAlignment: articles.filter((article) => article.keywordCoverageStatus === "NEEDS_KEYWORD_ALIGNMENT").length,
      needsMetaRewrite: articles.filter((article) => article.keywordCoverageStatus === "NEEDS_META_REWRITE").length,
      needsInternalLinks: articles.filter((article) => article.keywordCoverageStatus === "NEEDS_INTERNAL_LINKS").length,
      needsAltText: articles.filter((article) => article.keywordCoverageStatus === "NEEDS_ALT_TEXT").length,
      needsIndexCheck: articles.filter((article) => article.indexReadinessStatus === "NEEDS_INDEX_CHECK").length,
      clusters: countBy(
        articles.map((article) => article.cluster),
        keywordClusters,
      ),
      searchIntents: countBy(
        articles.map((article) => article.searchIntent),
        keywordSearchIntents,
      ),
    },
  };
}

export function extractOutboundLinks(content: string) {
  return outboundLinks(content);
}
