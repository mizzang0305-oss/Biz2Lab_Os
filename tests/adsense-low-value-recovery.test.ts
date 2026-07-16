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
import { getEditorialMediaEntries } from "@/lib/editorial-media";
import { getAllPosts, getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteSettings } from "@/lib/site-settings";

function read(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
}

test("public portfolio is intentionally rebuilt as 22 entertainment articles", async () => {
  const allPosts = getAllPosts();
  const publicPosts = getPublicPosts();
  const heldPosts = allPosts.filter((post) => post.frontmatter.draft);
  const publicCounts = publicPosts.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {});

  assert.equal(publicPosts.length, 22);
  assert.deepEqual(publicCounts, {
    "what-to-watch": 8,
    "after-the-credits": 8,
    "streaming-life": 6,
  });
  assert.equal(heldPosts.length, 53);
  assert.equal(
    heldPosts.every(
      (post) =>
        post.frontmatter.status === "draft" &&
        post.frontmatter.draft === true &&
        post.frontmatter.noindex === true,
    ),
    true,
  );

  const sitemapUrls = sitemap().map((entry) => entry.url);
  const rss = await getRss().text();
  for (const post of heldPosts) {
    assert.equal(sitemapUrls.some((url) => url.endsWith(post.route)), false);
    assert.equal(rss.includes(post.route), false);
  }
});

test("every public article exposes a human editorial angle and practical reading value", () => {
  const editorNotes = new Set<string>();

  for (const post of getPublicPosts()) {
    assert.equal(post.frontmatter.status, "published");
    assert.equal(post.frontmatter.draft, false);
    assert.equal(post.frontmatter.noindex, false);
    assert.ok(post.frontmatter.editorNote);
    assert.equal(editorNotes.has(post.frontmatter.editorNote), false);
    editorNotes.add(post.frontmatter.editorNote);
    assert.ok(post.frontmatter.audience && post.frontmatter.audience.length >= 3);
    assert.ok(post.frontmatter.faq && post.frontmatter.faq.length >= 3);
    assert.ok(post.headings.filter((heading) => heading.level === 2).length >= 5);
    assert.ok([...post.content].length >= 1200, `${post.slug} needs editorial depth`);
    assert.equal(/\/downloads\//.test(post.content), false);
    assert.equal(/!\[[^\]]*\]\(/.test(post.content), false);
  }
});

test("resources hub provides browser-only viewing tools instead of generic CSV inventory", () => {
  const html = renderToStaticMarkup(createElement(ResourcesPage));
  const source = read("app/ko/resources/page.tsx");
  const toolSource = read("components/tools/ViewingTools.tsx");

  assert.equal(staticPublicRoutes.includes("/ko/resources"), true);
  assert.equal(resourcesMetadata.alternates?.canonical, "https://www.biz2lab.com/ko/resources");
  assert.match(html, /영화·OTT 취향 도구/);
  assert.match(toolSource, /오늘 어떤 기분으로 끝내고 싶나요/);
  assert.match(toolSource, /내가 끝까지 볼 수 있는 러닝타임/);
  assert.match(toolSource, /OTT 구독 유지 비용/);
  assert.match(source, /서버로\s*전송하거나 저장하지 않고/);
  assert.doesNotMatch(source, /CSV|업무 자동화|미수금/);
});

test("homepage starts from viewer state and links only to the new public purpose", () => {
  const source = read("components/layout/HomePage.tsx");

  assert.match(source, /오늘 뭐 볼지/);
  assert.match(source, /기운이 없어요/);
  assert.match(source, /같이 볼 영화가 필요해요/);
  assert.match(source, /결말이 계속 생각나요/);
  assert.match(source, /추천 화면이 마음에 안 들어요/);
  assert.match(source, /\/ko\/what-to-watch/);
  assert.match(source, /\/ko\/after-the-credits/);
  assert.match(source, /\/ko\/streaming-life/);
  assert.doesNotMatch(source, /미수금|매출 목표|Google Sheets 자동화/);
  assert.equal(siteSettings.featureFlags.downloadsEnabled, false);
});

test("about page publishes human review, AI, spoiler, copyright, hold, and date policies", () => {
  const html = renderToStaticMarkup(createElement(AboutPage));

  assert.match(html, /총 22개 글/);
  assert.match(html, /기존 업무 자동화와 매출 관리 글 53개/);
  assert.match(html, /직접 보지 않은 작품의 체험담을 만들지 않습니다/);
  assert.match(html, /AI 도구는 검색어 후보 정리/);
  assert.match(html, /결말 스포일러 포함/);
  assert.match(html, /포스터, 스틸컷과 영상 캡처를 허가 없이/);
  assert.match(html, /2026년 7월 17일/);
  assert.match(html, /Google AdSense/);
  assert.match(html, new RegExp(editorialIdentity.operatorName));
  assert.match(html, /\/ko\/contact/);
});

test("every public article has unique evidence, an honest scope, and sources when official help is claimed", () => {
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

    if (evidence.type === "official-help-review") {
      assert.ok(evidence.sources.length >= 1, `${post.slug} needs an official source`);
    }

    for (const source of evidence.sources) {
      assert.match(source.url, /^https:\/\//);
      assert.match(source.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    }
  }
});

test("official poster and scene stills keep an auditable editorial-use record", () => {
  const entries = getEditorialMediaEntries();
  const assets = entries.flatMap(([, media]) => media.assets);

  assert.equal(entries.length, 1);
  assert.equal(assets.filter((asset) => asset.kind === "key-art").length, 1);
  assert.equal(assets.filter((asset) => asset.kind === "still").length, 2);
  for (const asset of assets) {
    assert.match(asset.src, /^\/images\/editorial\/.+\.webp$/);
    assert.match(asset.usageBasis, /Editorial use only/);
    assert.match(asset.sourcePageUrl, /^https:\/\/press\.disney\.co\.uk\//);
    assert.match(asset.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("article template exposes spoiler, audience, editor note, evidence, and authorship", () => {
  const articleSource = read("app/ko/[category]/[slug]/page.tsx");

  assert.match(articleSource, /spoilerLevel/);
  assert.match(articleSource, /frontmatter\.audience/);
  assert.match(articleSource, /frontmatter\.editorNote/);
  assert.match(articleSource, /EditorialEvidenceBox/);
  assert.match(articleSource, /editorialIdentity\.authorName/);
  assert.match(articleSource, /isAccessibleForFree/);
  assert.doesNotMatch(articleSource, /ChecklistBox|TemplateCTA|SummaryBox/);
});

test("entertainment rebuild report records the scope and keeps deployment outside this change", () => {
  const report = read("reports/adsense-entertainment-rebuild-2026-07-17.md");

  assert.match(report, /공개 글 22개/);
  assert.match(report, /보류 글 53개/);
  assert.match(report, /외부 배포: 하지 않음/);
  assert.match(report, /AdSense 재검토 요청: 하지 않음/);
  assert.match(report, /가짜 감상, 가짜 조회수, 검색 순위를 만들지 않음/);
});
