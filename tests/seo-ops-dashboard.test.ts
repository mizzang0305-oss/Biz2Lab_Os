import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import SeoOpsDashboardPage, { metadata } from "@/app/ko/ops/seo-dashboard/page";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import { getPublicPosts } from "@/lib/posts";
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

  assert.equal(dashboard.articles.every((row) => row.trafficStatus === "not-connected"), true);
});

test("SEO ops dashboard surfaces scheduler state and analytics empty states", () => {
  const dashboard = getSeoOpsDashboard();

  assert.equal(dashboard.scheduler.currentTopic, "pocketbase-lightweight-backend-saas-mvp");
  assert.equal(dashboard.scheduler.nextTopic, "supabase-self-hosting-cost-operations-caution");
  assert.match(dashboard.scheduler.currentGate, /수동 배포 금지/);
  assert.equal(dashboard.scheduler.nextRequiredArtifact, "pocketbase-lightweight-backend-saas-mvp-hero");

  assert.equal(dashboard.analytics.searchConsole.connected, false);
  assert.match(dashboard.analytics.searchConsole.emptyState, /Search Console/);
  assert.equal(dashboard.analytics.referrers.connected, false);
  assert.match(dashboard.analytics.referrers.emptyState, /GA4|Vercel Analytics|Umami/);
  assert.equal(dashboard.analytics.sourceBreakdown.connected, false);
});

test("SEO ops dashboard page renders the requested operational sections", () => {
  const html = renderToStaticMarkup(createElement(SeoOpsDashboardPage));

  assert.match(html, /Biz2Lab SEO 운영 대시보드/);
  assert.match(html, /글별 SEO 운영 테이블/);
  assert.match(html, /Primary keyword/);
  assert.match(html, /Keyword \/ index/);
  assert.match(html, /Keyword map/);
  assert.match(html, /Search Console 데이터가 아직 연결되지 않았습니다/);
  assert.match(html, /유입 사이트 데이터가 아직 연결되지 않았습니다/);
  assert.match(html, /검색어 데이터 미연결/);
  assert.match(html, /조회수 데이터 미연결/);
  assert.match(html, /SEO Health/);
  assert.match(html, /확장 실행 체크리스트/);
  assert.match(html, /스케줄러 상태/);
  assert.match(html, /미연결/);
});
