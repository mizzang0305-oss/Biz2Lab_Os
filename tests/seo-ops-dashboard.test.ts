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
  assert.equal(dashboard.summary.adsenseReadyArticles, publicPosts.length);
  assert.equal(dashboard.summary.adsenseNeedsTemplateArticles, 0);
  assert.equal(dashboard.summary.adsenseGenericReviewRiskArticles, 0);

  assert.equal(dashboard.articles.every((row) => row.trafficStatus === "not-connected"), true);
  assert.equal(dashboard.articles.every((row) => row.adsenseReadinessStatus === "AdSense-ready core"), true);
  assert.equal(dashboard.articles.every((row) => row.contentValueStatus === "Content value clear"), true);
  assert.equal(dashboard.articles.every((row) => row.originalValueStatus === "Original value clear"), true);
  assert.equal(dashboard.articles.every((row) => row.practicalTemplateStatus === "Practical template present"), true);
  assert.equal(dashboard.articles.every((row) => row.repeatedTemplateRisk === "Low"), true);
  assert.equal(dashboard.articles.every((row) => row.navigationDiscoveryStatus === "Navigation/discovery ready"), true);
  assert.equal(dashboard.articles.every((row) => row.reviewerFacingIssue.length > 0), true);
  assert.equal(dashboard.summary.noindexCandidateArticles, 0);
  assert.equal(dashboard.summary.policyRiskArticles, 0);
});

test("SEO ops dashboard surfaces scheduler state and analytics empty states", () => {
  const dashboard = getSeoOpsDashboard();
  const publicTitles = new Set(getPublicPosts().map((post) => post.frontmatter.title));

  assert.equal(publicTitles.has(dashboard.summary.latestPublishedTitle), true);
  assert.doesNotMatch(dashboard.summary.latestPublishedTitle, /Redash/);
  assert.equal(dashboard.summary.nextPublicationTopic, "CONTENT_SERIES_QUEUE_EXHAUSTED");
  assert.equal(dashboard.scheduler.currentTopic, "redash-open-source-dashboard-automation");
  assert.equal(dashboard.scheduler.nextTopic, "CONTENT_SERIES_QUEUE_EXHAUSTED");
  assert.match(dashboard.scheduler.currentGate, /CONTENT_SERIES_QUEUE_EXHAUSTED/);
  assert.doesNotMatch(dashboard.scheduler.currentGate, /Codex hero artifact/);
  assert.equal(dashboard.scheduler.nextRequiredArtifact, "NONE");
  assert.equal(dashboard.scheduler.lastKnownIssue, "CONTENT_SERIES_QUEUE_EXHAUSTED");

  assert.equal(dashboard.analytics.searchConsole.connected, false);
  assert.match(dashboard.analytics.searchConsole.emptyState, /Search Console/);
  assert.equal(dashboard.analytics.referrers.connected, false);
  assert.match(dashboard.analytics.referrers.emptyState, /GA4|Vercel Analytics|Umami/);
  assert.equal(dashboard.analytics.sourceBreakdown.connected, false);
  assert.equal(dashboard.analytics.providers.length, 5);
  assert.equal(dashboard.sources.realAnalyticsConnected, false);
});

test("SEO ops dashboard exposes owner-action search registration states without fake metrics", () => {
  const dashboard = getSeoOpsDashboard();

  assert.equal(dashboard.searchRegistration.overallStatus, "OWNER_ACTION_REQUIRED");
  assert.equal(dashboard.searchRegistration.verificationTokenProvided, true);
  assert.equal(dashboard.searchRegistration.registrationCompleted, "OWNER_UNKNOWN");
  assert.match(dashboard.searchRegistration.ownerActionCopy, /OWNER_ACTION_REQUIRED/);
  assert.match(dashboard.searchRegistration.ownerActionCopy, /Google Search Console/);
  assert.match(dashboard.searchRegistration.ownerActionCopy, /Naver Search Advisor/);
  assert.equal(dashboard.searchRegistration.providers.length, 3);
  assert.equal(
    dashboard.searchRegistration.providers.find((provider) => provider.id === "google-search-console")?.status,
    "GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED",
  );
  assert.equal(
    dashboard.searchRegistration.providers.find((provider) => provider.id === "naver-search-advisor")?.status,
    "NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED",
  );
  assert.equal(
    dashboard.searchRegistration.providers.find((provider) => provider.id === "naver-search-advisor")
      ?.verificationArtifactPresent,
    true,
  );
  assert.equal(
    dashboard.searchRegistration.providers.every((provider) => provider.connectedApiConfigured === false),
    true,
  );
  assert.deepEqual(
    dashboard.searchRegistration.stateLegend.map((item) => item.state),
    [
      "READY_TO_REGISTER",
      "OWNER_ACTION_REQUIRED",
      "VERIFICATION_TOKEN_NOT_PROVIDED",
      "SUBMITTED_BY_OWNER_UNKNOWN",
      "CONNECTED_API_NOT_CONFIGURED",
      "GOOGLE_PROPERTY_ACCESSIBLE_OWNER_SCREENSHOT",
      "GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
      "GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED",
      "GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT",
      "GOOGLE_URL_INSPECTION_OWNER_UNKNOWN",
      "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
      "NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED",
      "NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
      "NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
      "NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED",
    ],
  );
  assert.equal(dashboard.searchRegistration.indexFiles.sitemap, "https://www.biz2lab.com/sitemap.xml");
  assert.equal(dashboard.searchRegistration.indexFiles.robots, "https://www.biz2lab.com/robots.txt");
  assert.equal(dashboard.searchRegistration.indexFiles.rss, "https://www.biz2lab.com/rss.xml");
  assert.equal(dashboard.searchRegistration.indexFiles.canonicalHost, "https://www.biz2lab.com");
  assert.equal(dashboard.searchRegistration.indexFiles.naverRegisteredSite, "http://www.biz2lab.com");
  assert.equal(dashboard.searchRegistration.indexFiles.naverSubmissionHost, "http://www.biz2lab.com");
  assert.equal(dashboard.searchRegistration.indexFiles.publishedArticlesCovered, getPublicPosts().length);
  assert.equal(dashboard.sources.fakeTrafficNumbersUsed, false);

  const naverProvider = dashboard.searchRegistration.providers.find(
    (provider) => provider.id === "naver-search-advisor",
  );
  assert.ok(naverProvider);
  assert.match(naverProvider.requiredAction, /http:\/\/www\.biz2lab\.com/);
  assert.match(naverProvider.requiredAction, /HTTP to HTTPS redirect is expected/);
  assert.doesNotMatch(naverProvider.requiredAction, /Register https:\/\/www\.biz2lab\.com/);
  assert.equal(naverProvider.submittedByOwner, true);

  const html = renderToStaticMarkup(createElement(SeoOpsDashboardContent));
  assert.match(html, /Google Search Console/);
  assert.match(html, /Naver Search Advisor/);
  assert.match(html, /Naver registered site/);
  assert.match(html, /http:\/\/www\.biz2lab\.com/);
  assert.match(html, /OWNER_ACTION_REQUIRED/);
  assert.match(html, /GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(html, /GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT/);
  assert.match(html, /NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(html, /NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(html, /CONNECTED_API_NOT_CONFIGURED/);
  assert.match(html, /PROVIDED/);
  assert.match(html, /OWNER_UNKNOWN/);
  assert.doesNotMatch(html, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
});

test("webmaster status reports keep provider completion owner-confirmed", () => {
  const currentStatus = fs.readFileSync(
    path.join(process.cwd(), "reports", "webmaster-registration-current-status.md"),
    "utf8",
  );
  const ownerActions = fs.readFileSync(path.join(process.cwd(), "reports", "owner-next-actions-now.md"), "utf8");

  assert.match(currentStatus, /GOOGLE_PROPERTY_VISIBLE_FROM_OWNER_SCREENSHOT/);
  assert.match(currentStatus, /GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(currentStatus, /GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(currentStatus, /GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT/);
  assert.match(currentStatus, /GOOGLE_URL_INSPECTION_OWNER_UNKNOWN/);
  assert.match(currentStatus, /GOOGLE_INDEXING_REQUEST_OWNER_UNKNOWN/);
  assert.match(currentStatus, /NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(currentStatus, /NAVER_VERIFICATION_FILE_DEPLOYED/);
  assert.match(currentStatus, /NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(currentStatus, /NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(currentStatus, /NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(currentStatus, /Naver verified: `OWNER_UNKNOWN`/);
  assert.match(currentStatus, /CONNECTED_API_NOT_CONFIGURED/);
  assert.match(currentStatus, /http:\/\/www\.biz2lab\.com/);
  assert.match(currentStatus, /https:\/\/www\.biz2lab\.com/);
  assert.doesNotMatch(currentStatus, /https 추가 등록 필요/);
  assert.doesNotMatch(currentStatus, /\b(verified|indexed|crawled|submitted):\s*YES\b/i);
  assert.doesNotMatch(currentStatus, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);

  assert.match(ownerActions, /http:\/\/www\.biz2lab\.com/);
  assert.match(ownerActions, /https:\/\/www\.biz2lab\.com\/sitemap\.xml/);
  assert.match(ownerActions, /GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(ownerActions, /NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(ownerActions, /Naver is not verified until owner confirms UI success/);
  assert.doesNotMatch(ownerActions, /https 추가 등록 필요/);
  assert.doesNotMatch(ownerActions, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
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
  assert.match(html, /AdSense ready/);
  assert.match(html, /AdSense-ready core/);
  assert.match(html, /Content value clear/);
  assert.match(html, /Original value clear/);
  assert.match(html, /Practical template present/);
  assert.match(html, /Navigation\/discovery ready/);
  assert.match(html, /Noindex candidates/);
  assert.match(html, /Policy risk/);
  assert.match(html, /Repeated-template risk/);
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
