import assert from "node:assert/strict";
import test from "node:test";

import sitemap from "@/app/sitemap";
import { getPublicPosts } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";
import { SEO_OPS_DASHBOARD_ROUTE } from "@/lib/seo-ops-dashboard";
import { auditSeoKeywords, readSeoKeywordMap } from "@/lib/seo-keyword-audit";

const fakeMetricKeys = [
  "clicks",
  "impressions",
  "ctr",
  "rank",
  "ranking",
  "pageviews",
  "traffic",
  "sessions",
  "users",
];

test("every published article has a keyword map entry and every entry targets an existing route", () => {
  const posts = getPublicPosts();
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
  const keywordMap = readSeoKeywordMap();

  assert.equal(keywordMap.length, posts.length);
  assert.deepEqual(
    keywordMap.map((entry) => entry.slug).sort(),
    posts.map((post) => post.slug).sort(),
  );

  for (const entry of keywordMap) {
    const post = postsBySlug.get(entry.slug);

    assert.ok(post, `${entry.slug} must point to a published article`);
    assert.equal(entry.route, post.route);
    assert.ok(entry.primaryKeyword.length >= 2);
    assert.ok(entry.secondaryKeywords.length >= 2);
    assert.match(entry.hookStatus, /^(strong|needs-title-hook|needs-intro-hook|needs-meta-hook|needs-cta-hook)$/);
    assert.ok(entry.lossAvoidanceAngle.length >= 10);
  }
});

test("every published article has a loss-avoidance hook status", () => {
  const keywordMap = readSeoKeywordMap();
  const audit = auditSeoKeywords();

  assert.equal(keywordMap.every((entry) => entry.hookStatus === "strong"), true);
  assert.equal(keywordMap.every((entry) => entry.lossAvoidanceAngle.length >= 10), true);
  assert.equal(audit.articles.every((article) => article.hookStatus === "strong"), true);
  assert.equal(audit.articles.every((article) => article.lossAvoidanceAngle.length >= 10), true);
});

test("keyword map does not contain fake analytics or performance fields", () => {
  const keywordMap = readSeoKeywordMap();

  for (const entry of keywordMap) {
    for (const key of fakeMetricKeys) {
      assert.equal(
        Object.hasOwn(entry, key),
        false,
        `${entry.slug} must not contain fake analytics field ${key}`,
      );
    }
  }
});

test("keyword audit keeps index readiness separate from keyword follow-up work", () => {
  const audit = auditSeoKeywords();

  assert.equal(audit.summary.totalArticles, getPublicPosts().length);
  assert.equal(audit.summary.missingKeywordMap, 0);
  assert.equal(audit.summary.weakArticles, 0);
  assert.equal(audit.summary.needsKeywordAlignment, 0);
  assert.equal(audit.summary.needsMetaRewrite, 0);
  assert.equal(audit.summary.needsInternalLinks, 0);
  assert.equal(audit.summary.needsAltText, 0);
  assert.equal(audit.summary.needsIndexCheck, 0);
  assert.equal(audit.articles.every((article) => article.keywordCoverageStatus === "GOOD"), true);
  assert.equal(audit.articles.every((article) => article.indexReadinessStatus === "GOOD"), true);
  assert.equal(audit.articles.every((article) => article.checks.canonicalWww), true);
  assert.equal(audit.articles.every((article) => article.checks.includedInSitemap), true);
  assert.equal(audit.articles.every((article) => article.checks.noindex === false), true);
  assert.equal(audit.articles.every((article) => article.checks.brokenInternalLinks === 0), true);
});

test("reviewed core articles keep descriptive related links without draft-series dependencies", () => {
  const requiredSlugs = new Set([
    "ai-business-automation-guide",
    "automation-priority-method",
    "accounts-receivable-tracker",
    "daily-sales-goal-breakdown",
    "customer-memory-system",
    "unify-order-channels",
  ]);
  const auditBySlug = new Map(auditSeoKeywords().articles.map((article) => [article.slug, article]));

  for (const slug of requiredSlugs) {
    const article = auditBySlug.get(slug);

    assert.ok(article, `${slug} must have a keyword audit row`);
    assert.equal(article.checks.seriesHubLinked, true, `${slug} must not require a held draft-series hub`);
    assert.ok(article.checks.relatedArticleLinks >= 2, `${slug} must keep at least two related links`);
  }
});

test("SEO metadata and discovery files do not add meta keywords or expose noindex dashboard routes", () => {
  const pageMetadata = createMetadata({
    title: "테스트 페이지",
    description: "테스트 설명입니다.",
    path: "/ko/test",
  });

  assert.equal(Object.hasOwn(pageMetadata, "keywords"), false);
  assert.equal(sitemap().some((entry) => entry.url.endsWith(SEO_OPS_DASHBOARD_ROUTE)), false);
});
