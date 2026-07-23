import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import AboutPage from "@/app/ko/about/page";
import ResourcesPage, { metadata as resourcesMetadata } from "@/app/ko/resources/page";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import {
  editorialIdentity,
  getEditorialEvidence,
  getEditorialEvidenceEntries,
} from "@/lib/editorial-evidence";
import { getAllPosts, getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteSettings } from "@/lib/site-settings";

function read(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
}

function extractDownloadLinks(source: string) {
  return [...source.matchAll(/\/downloads\/[a-z0-9-]+\.csv/g)].map((match) => match[0]);
}

test("public portfolio is intentionally limited to 20 reviewed articles", async () => {
  const allPosts = getAllPosts();
  const publicPosts = getPublicPosts();
  const heldPosts = allPosts.filter((post) => post.frontmatter.draft);
  const publicCounts = publicPosts.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {});

  assert.equal(publicPosts.length, 20);
  assert.deepEqual(publicCounts, {
    automation: 7,
    "sales-ops": 7,
    "small-business": 6,
  });
  assert.equal(heldPosts.length, 55);
  assert.equal(
    heldPosts.every(
      (post) =>
        post.frontmatter.status === "draft" &&
        post.frontmatter.draft === true &&
        post.frontmatter.noindex === true,
    ),
    true,
  );
  assert.equal(publicPosts.some((post) => post.category === "contracts-payments"), false);
  assert.equal(staticPublicRoutes.includes("/ko/contracts-payments" as never), false);

  const sitemapUrls = sitemap().map((entry) => entry.url);
  const rss = await getRss().text();
  for (const post of heldPosts) {
    assert.equal(sitemapUrls.some((url) => url.endsWith(post.route)), false);
    assert.equal(rss.includes(post.route), false);
  }
});

test("every public article has distinct practical value and a real CSV resource", () => {
  for (const post of getPublicPosts()) {
    const downloads = extractDownloadLinks(post.content);

    assert.equal(post.frontmatter.status, "published");
    assert.equal(post.frontmatter.draft, false);
    assert.equal(post.frontmatter.noindex, false);
    assert.equal(post.frontmatter.title.includes("분석:"), false);
    assert.equal(post.frontmatter.templateCta, undefined);
    assert.ok(post.frontmatter.faq && post.frontmatter.faq.length >= 3);
    assert.ok(post.headings.filter((heading) => heading.level === 2).length >= 5);
    assert.ok(/\|.+\|/.test(post.content) || /^\d+\.\s+/m.test(post.content));
    assert.equal(downloads.length, 1, `${post.slug} needs one download`);

    const downloadPath = path.join(process.cwd(), "public", downloads[0].replace(/^\//, ""));
    assert.equal(fs.existsSync(downloadPath), true, `${post.slug} download is missing`);
  }
});

test("resources hub exposes all 20 public guides and 20 real downloads", () => {
  const html = renderToStaticMarkup(createElement(ResourcesPage));
  const source = read("app/ko/resources/page.tsx");
  const articleRoutes = getPublicPosts().map((post) => post.route);
  const downloads = [...new Set(extractDownloadLinks(source))];

  assert.equal(staticPublicRoutes.includes("/ko/resources"), true);
  assert.equal(resourcesMetadata.alternates?.canonical, "https://www.biz2lab.com/ko/resources");
  assert.match(html, /20개 핵심 글 · 20개 CSV/);
  assert.match(html, /CSV 내려받기/);
  assert.equal(downloads.length, 20);

  for (const route of articleRoutes) {
    assert.match(html, new RegExp(route.replaceAll("/", "\\/")));
  }
  for (const download of downloads) {
    assert.equal(fs.existsSync(path.join(process.cwd(), "public", download.replace(/^\//, ""))), true);
  }

  assert.doesNotMatch(html, /free-open-source-automation-tools-series/);
  assert.doesNotMatch(html, /metabase-dashboard-automation-for-small-business/);
  assert.doesNotMatch(html, /contracts-payments/);
  assert.equal(sitemap().some((entry) => entry.url === "https://www.biz2lab.com/ko/resources"), true);
});

test("homepage recommends only reviewed public articles", () => {
  const source = read("components/layout/HomePage.tsx");
  const publicRoutes = new Set(getPublicPosts().map((post) => post.route));
  const articleLinks = [...source.matchAll(/href:\s*"(\/ko\/(?:automation|sales-ops|small-business)\/[^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.match(source, /자동화 우선순위 정하기/);
  assert.match(source, /Google Sheets 자동화 기준/);
  assert.match(source, /\/ko\/resources/);
  assert.doesNotMatch(source, /free-open-source-automation-tools-series/);
  assert.doesNotMatch(source, /metabase-dashboard-automation-for-small-business/);
  assert.doesNotMatch(source, /contracts-payments/);
  assert.equal(articleLinks.every((route) => publicRoutes.has(route)), true);
  assert.equal(siteSettings.featureFlags.downloadsEnabled, true);
});

test("about page publishes AI, sample-data, hold, and update-date policies", () => {
  const html = renderToStaticMarkup(createElement(AboutPage));

  assert.match(html, /현재는 품질을 직접 확인한 20개 핵심 글만 공개/);
  assert.match(html, /도구 비교·계약·결제·엔터테인먼트 글 55개는 검토 보류/);
  assert.match(html, /AI 도구는 초안 구조화/);
  assert.match(html, /가상 예시/);
  assert.match(html, /누가 운영하고 검토하나요/);
  assert.match(html, /왜 이 콘텐츠를 만드나요/);
  assert.match(html, /어떻게 작성하고 검토하나요/);
  assert.match(html, /2026년 6월 15일 처음 공개/);
  assert.match(html, /광고·협찬과 편집 독립성/);
  assert.match(html, new RegExp(editorialIdentity.operatorName));
  assert.match(html, /단순 오탈자 수정만으로 최신 글처럼 보이게 날짜를 바꾸지 않습니다/);
  assert.match(html, /\/ko\/contact/);
  assert.match(html, /\/ko\/privacy/);
  assert.doesNotMatch(html, /박사|수상|공인 전문가|공식 파트너/);
});

test("every public article has unique evidence, an honest scope, and official sources when claimed", () => {
  const publicPosts = getPublicPosts();
  const entries = getEditorialEvidenceEntries();
  const summaries = new Set<string>();

  assert.equal(entries.length, publicPosts.length);

  for (const post of publicPosts) {
    const evidence = getEditorialEvidence(post.slug);

    assert.ok(evidence.summary.length >= 40, `${post.slug} evidence summary is too short`);
    assert.ok(evidence.scope.length >= 35, `${post.slug} scope is too short`);
    assert.equal(summaries.has(evidence.summary), false, `${post.slug} repeats another evidence summary`);
    summaries.add(evidence.summary);

    if (evidence.type === "official-document-review") {
      assert.ok(evidence.sources.length >= 1, `${post.slug} needs an official source`);
    }

    for (const source of evidence.sources) {
      assert.match(source.url, /^https:\/\//);
      assert.match(source.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    }
  }
});

test("article template no longer injects the same generic checklist and CTA into every post", () => {
  const articleSource = read("app/ko/[category]/[slug]/page.tsx");

  assert.doesNotMatch(articleSource, /ChecklistBox/);
  assert.doesNotMatch(articleSource, /TemplateCTA/);
  assert.doesNotMatch(articleSource, /checklistForPost/);
  assert.match(articleSource, /EditorialEvidenceBox/);
  assert.match(articleSource, /editorialIdentity\.authorName/);
  assert.match(articleSource, /isAccessibleForFree/);
});

test("content reset report records the scope and keeps deployment outside this change", () => {
  const report = read("reports/adsense-content-reset-2026-07-16.md");

  assert.match(report, /합계 \| 20/);
  assert.match(report, /33개 글/);
  assert.match(report, /20개 CSV/);
  assert.match(report, /외부 배포: 하지 않음/);
  assert.match(report, /AdSense 재검토 요청: 하지 않음/);
  assert.match(report, /가짜 조회수, 검색 순위, 고객 성과를 추가하지 않음/);
});
