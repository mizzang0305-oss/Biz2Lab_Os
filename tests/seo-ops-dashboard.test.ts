import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { OpsDashboardUnlockScreen, SeoOpsDashboardContent, metadata } from "@/app/ko/ops/seo-dashboard/page";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import { getPublicPosts } from "@/lib/posts";
import { getSeoOpsAnalyticsConnectors } from "@/lib/seo-ops-analytics";
import { SEO_OPS_DASHBOARD_ROUTE, getSeoOpsDashboard } from "@/lib/seo-ops-dashboard";
import { staticPublicRoutes } from "@/lib/seo";

test("SEO ops dashboard route is noindex and excluded from public discovery feeds", async () => {
  assert.equal(SEO_OPS_DASHBOARD_ROUTE, "/ko/ops/seo-dashboard");
  assert.deepEqual(metadata.robots, { index: false, follow: false });
  assert.equal(String(metadata.alternates?.canonical).endsWith(SEO_OPS_DASHBOARD_ROUTE), true);

  assert.equal(staticPublicRoutes.includes(SEO_OPS_DASHBOARD_ROUTE as never), false);
  assert.equal(sitemap().some((entry) => entry.url.endsWith(SEO_OPS_DASHBOARD_ROUTE)), false);

  const rss = await getRss().text();
  assert.equal(rss.includes(SEO_OPS_DASHBOARD_ROUTE), false);
  assert.equal(fs.existsSync(path.join(process.cwd(), "app", "admin", "seo-dashboard")), false);
  assert.equal(fs.existsSync(path.join(process.cwd(), "app", "login")), false);
});

test("SEO ops dashboard locked screen does not render operational dashboard details", () => {
  const originalKey = process.env.BIZ2LAB_OPS_DASHBOARD_KEY;
  process.env.BIZ2LAB_OPS_DASHBOARD_KEY = "unit-test-secret";
  try {
    const html = renderToStaticMarkup(createElement(OpsDashboardUnlockScreen, { keyConfigured: true }));

    assert.match(html, /SEO 운영 대시보드 잠금/);
    assert.match(html, /비밀번호/);
    assert.doesNotMatch(html, /글별 SEO 운영 테이블/);
    assert.doesNotMatch(html, /unit-test-secret/);
  } finally {
    if (originalKey === undefined) {
      delete process.env.BIZ2LAB_OPS_DASHBOARD_KEY;
    } else {
      process.env.BIZ2LAB_OPS_DASHBOARD_KEY = originalKey;
    }
  }
});

test("SEO ops dashboard shows locked configuration message when secret is missing", () => {
  delete process.env.BIZ2LAB_OPS_DASHBOARD_KEY;
  const html = renderToStaticMarkup(createElement(OpsDashboardUnlockScreen, { keyConfigured: false }));

  assert.match(html, /운영 대시보드 비밀번호가 아직 설정되지 않았습니다/);
  assert.doesNotMatch(html, /글별 SEO 운영 테이블/);
});

test("SEO ops dashboard derives article rows from local content without fake traffic", () => {
  const dashboard = getSeoOpsDashboard();
  const publicPosts = getPublicPosts();

  assert.equal(dashboard.summary.publishedArticles, publicPosts.length);
  assert.equal(dashboard.sources.contentIndexUsed, true);
  assert.equal(dashboard.sources.realAnalyticsConnected, false);
  assert.equal(dashboard.sources.fakeTrafficNumbersUsed, false);
  assert.equal(dashboard.sources.emptyStatesShown, true);
  assert.equal(dashboard.articles.length, publicPosts.length);
  assert.equal(dashboard.summary.keywordMappedArticles, publicPosts.length);
  assert.equal(
    dashboard.summary.keywordStrongArticles + dashboard.summary.keywordWeakArticles,
    publicPosts.length,
  );

  const firstPost = publicPosts[0];
  const firstRow = dashboard.articles.find((row) => row.slug === firstPost.slug);
  assert.ok(firstRow);
  assert.equal(firstRow.title, firstPost.frontmatter.title);
  assert.equal(firstRow.route, firstPost.route);
  assert.equal(firstRow.canonicalStatus, "ok");
  assert.equal(firstRow.metaDescriptionStatus, "ok");
  assert.equal(firstRow.trafficStatus, "not-connected");
  assert.equal(firstRow.pageviews, undefined);
  assert.equal(firstRow.searchClicks, undefined);
  assert.equal(firstRow.impressions, undefined);
  assert.equal(firstRow.topQueries, undefined);
  assert.equal(firstRow.topReferrers, undefined);
  assert.ok(firstRow.primaryKeyword);
  assert.notEqual(firstRow.primaryKeyword, "키워드 맵 미등록");
  assert.notEqual(firstRow.keywordCluster, "미등록");
  assert.notEqual(firstRow.searchIntent, "미등록");
  assert.match(firstRow.keywordCoverageStatus, /GOOD|NEEDS_/);
  assert.match(firstRow.indexReadinessStatus, /GOOD|NEEDS_/);
  assert.equal(firstRow.hookStatus, "strong");
  assert.ok(firstRow.lossAvoidanceAngle.length >= 10);
  assert.equal(dashboard.summary.hookStrongArticles, publicPosts.length);
  assert.equal(dashboard.summary.hookNeedsReviewArticles, 0);
  assert.ok(dashboard.summary.aiAnswerReadyArticles >= 6);
  assert.equal(dashboard.summary.aiAnswerNeedsFaq, 0);

  assert.equal(dashboard.articles.every((row) => row.trafficStatus === "not-connected"), true);
});

test("SEO ops dashboard surfaces scheduler state and analytics empty states", () => {
  const dashboard = getSeoOpsDashboard();

  assert.equal(dashboard.scheduler.currentTopic, "umami-open-source-analytics-ga-alternative");
  assert.equal(dashboard.scheduler.nextTopic, "다음 topic 없음");
  assert.match(dashboard.scheduler.currentGate, /수동 배포 금지/);
  assert.equal(dashboard.scheduler.nextRequiredArtifact, "umami-open-source-analytics-ga-alternative-hero");

  assert.equal(dashboard.analytics.searchConsole.connected, false);
  assert.match(dashboard.analytics.searchConsole.emptyState, /Search Console/);
  assert.equal(dashboard.analytics.referrers.connected, false);
  assert.match(dashboard.analytics.referrers.emptyState, /GA4|Vercel Analytics|Umami/);
  assert.equal(dashboard.analytics.sourceBreakdown.connected, false);
  assert.equal(dashboard.analytics.providers.length, 5);
  assert.equal(dashboard.sources.realAnalyticsConnected, false);
});

test("SEO ops dashboard exposes manual search registration status without fake metrics", () => {
  const dashboard = getSeoOpsDashboard();

  assert.equal(dashboard.searchRegistration.overallStatus, "manual-check-required");
  assert.match(
    dashboard.searchRegistration.note,
    /Search Console과 Naver Search Advisor 연결 상태는 실제 계정\/API가 연결되기 전까지 수동 확인 항목/,
  );
  assert.equal(dashboard.searchRegistration.providers.length, 3);
  assert.equal(
    dashboard.searchRegistration.providers.every((provider) => provider.status === "manual-check-required"),
    true,
  );
  assert.equal(dashboard.searchRegistration.indexFiles.sitemap, "https://www.biz2lab.com/sitemap.xml");
  assert.equal(dashboard.searchRegistration.indexFiles.robots, "https://www.biz2lab.com/robots.txt");
  assert.equal(dashboard.searchRegistration.indexFiles.rss, "https://www.biz2lab.com/rss.xml");
  assert.equal(dashboard.searchRegistration.indexFiles.canonicalHost, "https://www.biz2lab.com");
  assert.equal(dashboard.searchRegistration.indexFiles.publishedArticlesCovered, getPublicPosts().length);
  assert.equal(dashboard.sources.fakeTrafficNumbersUsed, false);

  const html = renderToStaticMarkup(createElement(SeoOpsDashboardContent));
  assert.match(html, /검색 등록 수동 확인/);
  assert.match(html, /Google Search Console/);
  assert.match(html, /Naver Search Advisor/);
  assert.match(html, /Search Console과 Naver Search Advisor 연결 상태는 실제 계정\/API가 연결되기 전까지 수동 확인 항목/);
  assert.doesNotMatch(html, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
});

test("SEO ops analytics connectors report env readiness without real metrics", () => {
  const disconnected = getSeoOpsAnalyticsConnectors({});

  assert.equal(disconnected.realDataConnected, false);
  assert.equal(disconnected.anyProviderReady, false);
  assert.equal(disconnected.providers.every((provider) => provider.status === "disconnected"), true);

  const ready = getSeoOpsAnalyticsConnectors({
    BIZ2LAB_SEARCH_CONSOLE_SITE_URL: "https://www.biz2lab.com",
    BIZ2LAB_GA4_PROPERTY_ID: "properties/123",
    BIZ2LAB_VERCEL_ANALYTICS_PROJECT_ID: "prj_test",
    BIZ2LAB_UMAMI_URL: "https://analytics.example.test",
    BIZ2LAB_UMAMI_WEBSITE_ID: "website-test",
    BIZ2LAB_REFERRER_LOG_SOURCE: "local-readonly",
  });

  assert.equal(ready.anyProviderReady, true);
  assert.equal(ready.realDataConnected, false);
  assert.equal(ready.readyProviderCount, 5);
});

test("SEO ops dashboard page renders the requested operational sections", () => {
  const html = renderToStaticMarkup(createElement(SeoOpsDashboardContent));

  assert.match(html, /Biz2Lab SEO 운영 대시보드/);
  assert.match(html, /글별 SEO 운영 테이블/);
  assert.match(html, /Primary keyword/);
  assert.match(html, /Keyword \/ index/);
  assert.match(html, /AI answer ready/);
  assert.match(html, /AI 답변 준비 좋음|결론 요약 보강 필요|체크리스트 보강 필요|비교 기준 보강 필요/);
  assert.match(html, /FAQ 있음|FAQ 보강 필요/);
  assert.match(html, /Hook strong/);
  assert.match(html, /loss-avoidance hook ready/);
  assert.match(html, /Keyword map/);
  assert.match(html, /Search Console 데이터가 아직 연결되지 않았습니다/);
  assert.match(html, /유입 사이트 데이터가 아직 연결되지 않았습니다/);
  assert.match(html, /검색어 데이터 미연결/);
  assert.match(html, /조회수 데이터 미연결/);
  assert.match(html, /유입 사이트 데이터 미연결/);
  assert.match(html, /Search Console 연결 전 표시/);
  assert.match(html, /Analytics 연결 전 표시/);
  assert.match(html, /읽기 전용 분석 연결 상태/);
  assert.match(html, /SEO Health/);
  assert.match(html, /확장 실행 체크리스트/);
  assert.match(html, /스케줄러 상태/);
  assert.match(html, /미연결/);
  assert.doesNotMatch(html, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
});
