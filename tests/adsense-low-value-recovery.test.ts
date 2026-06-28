import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import ResourcesPage, { metadata as resourcesMetadata } from "@/app/ko/resources/page";
import { HomePage } from "@/components/layout/HomePage";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import { getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteSettings } from "@/lib/site-settings";

function read(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
}

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
}

test("public resources page renders practical internal links and is discoverable", async () => {
  const html = renderToStaticMarkup(createElement(ResourcesPage));

  assert.equal(staticPublicRoutes.includes("/ko/resources"), true);
  assert.equal(resourcesMetadata.alternates?.canonical, "https://www.biz2lab.com/ko/resources");
  assert.match(html, /Biz2Lab 실무 자료실/);
  assert.match(html, /달성률 계산법/);
  assert.match(html, /매출 목표 쪼개기/);
  assert.match(html, /미수금 관리 체크리스트/);
  assert.match(html, /주문 채널 통합 체크리스트/);
  assert.match(html, /자동화.*도구 검토/);
  assert.match(html, /해결하는 문제/);
  assert.match(html, /무시하면 생기는 손실/);
  assert.match(html, /다음에 읽을 글/);
  assert.match(html, /\/ko\/automation\/redash-open-source-dashboard-automation/);
  assert.doesNotMatch(html, /\/ko\/ops\/seo-dashboard/);
  assert.equal(sitemap().some((entry) => entry.url === "https://www.biz2lab.com/ko/resources"), true);

  const rss = await getRss().text();
  assert.equal(rss.includes("/ko/resources"), false);
});

test("homepage links to core practical pages instead of exposing internal dashboards", () => {
  const html = renderToStaticMarkup(createElement(HomePage));
  const publicLinks = [
    ...siteSettings.navItems.map((item) => item.href),
    siteSettings.hero.primaryCta.href,
    siteSettings.hero.secondaryCta.href,
  ];

  assert.match(html, /소상공인과 영업팀이 매일 놓치기 쉬운 숫자/);
  assert.match(html, /Biz2Lab이 먼저 밝히는 실무 가치/);
  assert.match(html, /Biz2Lab은 무엇을 해결하나/);
  assert.match(html, /소상공인이 매일 놓치면 손해 보는 숫자/);
  assert.match(html, /실무 체크리스트/);
  assert.match(html, /자동화 도구를 도입하기 전 판단 기준/);
  assert.match(html, /블로그 업무 자료/);
  assert.match(html, /주제별 탐색/);
  assert.match(html, /바로 확인하는 실무 기준/);
  assert.match(html, /\/ko\/resources/);
  assert.match(html, /\/ko\/sales-ops\/sales-achievement-rate/);
  assert.match(html, /\/ko\/small-business\/daily-numbers-for-small-business/);
  assert.match(html, /\/ko\/sales-ops\/accounts-receivable-tracker/);
  assert.match(html, /\/ko\/small-business\/unify-order-channels/);
  assert.match(html, /\/ko\/automation\/free-open-source-automation-tools-series/);
  assert.equal(publicLinks.includes("/ko/resources"), true);
  assert.doesNotMatch(html, /\/ko\/ops\/seo-dashboard/);
});

test("about page includes editorial trust signals without fake biography", () => {
  const source = read("app/ko/about/page.tsx");

  assert.match(source, /운영 목적|현장형 AI 업무 자동화/);
  assert.match(source, /콘텐츠 검토 기준/);
  assert.match(source, /과장 금지/);
  assert.match(source, /도구 소개보다/);
  assert.match(source, /\/ko\/contact/);
  assert.doesNotMatch(source, /박사|수상|공인 전문가|공식 파트너/);
});

test("sales-achievement cluster includes practical formulas and examples", () => {
  const targetFiles = [
    "content/ko/sales-ops/sales-achievement-rate.md",
    "content/ko/small-business/daily-numbers-for-small-business.md",
    "content/ko/sales-ops/daily-sales-goal-breakdown.md",
    "content/ko/sales-ops/accounts-receivable-tracker.md",
  ];

  for (const filePath of targetFiles) {
    const source = read(filePath);
    assert.match(source, /달성률 = 현재 실적 ÷ 목표 × 100/, `${filePath} needs achievement formula`);
    assert.match(source, /부족 금액 = 목표 - 현재 실적/, `${filePath} needs gap formula`);
    assert.match(source, /남은 기간 하루 필요 실적 = 부족 금액 ÷ 남은 영업일/, `${filePath} needs daily-required formula`);
    assert.match(source, /\| .* \| .* \|/, `${filePath} needs practical table`);
    assert.match(source, /이걸 (안 보면|보면).*손해|손해를 줄이는 이유/, `${filePath} needs loss-avoidance framing`);
  }
});

test("important existing articles gained in-body related links without new thin queue files", () => {
  const strengthenedSlugs = [
    "ai-business-automation-guide",
    "automation-priority-method",
    "chatgpt-document-cleanup",
    "google-sheets-ai-automation",
    "reduce-repetitive-work-with-ai",
    "connect-contract-payment-customer-management",
    "electronic-contract-system-basics",
    "reservation-order-review-management",
    "solo-business-systemization",
    "unify-order-channels",
  ];
  const postsBySlug = new Map(getPublicPosts().map((post) => [post.slug, post]));

  for (const slug of strengthenedSlugs) {
    const post = postsBySlug.get(slug);
    assert.ok(post, `${slug} must exist`);
    assert.ok(post.internalLinks.length >= 3, `${slug} needs in-body related links`);
    assert.match(post.content, /## 함께 보면 좋은 글/);
  }

  assert.equal(fs.existsSync(path.join(process.cwd(), "content", "ko", "automation", "new-adsense-queue.md")), false);
});

test("AdSense recovery audit covers every published article without fake metrics", () => {
  const report = read("reports/adsense-low-value-content-recovery-audit.md");

  assert.match(report, /가짜 지표 없음|fake analytics: NO/);
  assert.match(report, /ADSENSE_READY_CORE/);
  assert.match(report, /NOINDEX_CANDIDATE/);
  for (const post of getPublicPosts()) {
    assert.match(report, new RegExp(post.route.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(report, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR|rankings)\b/i);
});

test("official policy recovery audit covers static routes and published articles", () => {
  const report = read("reports/adsense-policy-content-value-recovery.md");

  for (const category of [
    "LOW_VALUE_CONTENT_RISK",
    "THIN_CONTENT_RISK",
    "DUPLICATE_TEMPLATE_RISK",
    "GENERIC_TOOL_SUMMARY_RISK",
    "NO_ORIGINAL_PRACTICAL_VALUE",
    "WEAK_NAVIGATION_OR_DISCOVERY",
    "WEAK_AUTHOR_EDITORIAL_TRUST",
    "ADSENSE_READY_CORE",
  ]) {
    assert.match(report, new RegExp(category));
  }

  assert.match(report, /Public static routes audited:/);
  assert.match(report, /Published Korean articles audited:/);
  assert.match(report, /NOINDEX_OR_MERGE_REVIEW_CANDIDATES/);
  assert.match(report, /Fake analytics added: NO/);
  assert.match(report, /Meta keywords added: NO/);
  assert.match(report, /AdSense ad code added: NO/);
  assert.match(report, /\/ko\/resources/);
  for (const post of getPublicPosts()) {
    assert.match(report, new RegExp(post.route.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(report, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR|rankings)\b/i);
});

test("priority tool articles expose Biz2Lab decision criteria", () => {
  const priorityToolSlugs = [
    "metabase-dashboard-automation-for-small-business",
    "apache-superset-bi-dashboard-automation",
    "redash-open-source-dashboard-automation",
    "dify-llm-app-builder-business-automation",
    "open-webui-local-llm-admin-portal",
    "flowise-ai-agent-workflow-automation",
    "directus-headless-cms-data-automation",
    "pocketbase-lightweight-backend-saas-mvp",
    "supabase-self-hosting-cost-operations-caution",
    "langflow-ai-workflow-automation",
    "activepieces-ai-business-automation-n8n-alternative",
    "node-red-local-business-automation-server",
  ];

  for (const slug of priorityToolSlugs) {
    const source = read(`content/ko/automation/${slug}.md`);
    assert.match(source, /## Biz2Lab 판단 기준: 이런 경우에만 검토하세요/, `${slug} needs named decision criteria`);
    assert.match(source, /설정 부담|운영 비용/, `${slug} needs setup or operating-cost criteria`);
    assert.match(source, /데이터 리스크|self-hosting|권한|credential|백업/, `${slug} needs data or self-hosting risk criteria`);
    assert.match(source, /먼저 (해볼|확인|테스트)/, `${slug} needs pre-adoption step`);
    assert.doesNotMatch(source, /무조건 추천|완전 무료|상업 사용 보장/);
  }
});

test("policy safety keeps meta keywords, fake analytics, admin/login routes, and ad units out", () => {
  const sourceRoots = ["app", "components", "lib", "content", "data"];
  const allSource = sourceRoots
    .flatMap((root) => walkFiles(path.join(process.cwd(), root)))
    .filter((filePath) => /\.(tsx?|md|json|mjs)$/.test(filePath))
    .map((filePath) => fs.readFileSync(filePath, "utf8"))
    .join("\n");

  assert.equal(staticPublicRoutes.some((route) => route.startsWith("/admin") || route.startsWith("/login")), false);
  assert.doesNotMatch(allSource, /<meta[^>]+name=["']keywords["']/i);
  assert.doesNotMatch(allSource, /\bkeywords\s*:\s*\[/);
  assert.doesNotMatch(allSource, /\b(clicks|impressions|sessions|pageviews|CTR|rankings)\s*:\s*\d+\b/i);
  assert.doesNotMatch(allSource, /<ins[^>]+adsbygoogle/i);
  assert.doesNotMatch(allSource, /data-ad-slot/i);
  assert.equal(fs.existsSync(path.join(process.cwd(), "app", "login")), false);
});
