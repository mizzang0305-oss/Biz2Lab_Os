import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { healthArticles, healthClaims, healthSources, healthTools } from "../lib/health-v3/content";
import { dailyGuides20261002 } from "../lib/health-v3/daily-guides-20261002";
import { getHealthSupportGuide, healthSupportGuides } from "../lib/health-v3/support-guides";
import { HealthArticlePage } from "../components/health/HealthArticle";
import { HealthToolPage } from "../components/health/HealthToolPage";
import HypertensionPage from "../app/health/hypertension/page";
import GuidePage, { generateMetadata, generateStaticParams } from "../app/health/guides/[slug]/page";
import HealthHub from "../app/health/page";
import sitemap from "../app/sitemap";

const baseline = JSON.parse(readFileSync("tests/fixtures/daily-five-baseline-29.json", "utf8"));
const digest = (value: unknown) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const render = async (slug: string) => renderToStaticMarkup(await GuidePage({ params: Promise.resolve({ slug }) }));

test("five additions preserve all twenty disease and nine guide data/SSR, claims, sources and tools", async () => {
  for (const slug of Object.keys(baseline.articleData)) {
    const article = healthArticles[slug as keyof typeof healthArticles];
    assert.ok(article, slug);
    assert.equal(digest(article), baseline.articleData[slug], slug);
    const html = renderToStaticMarkup(slug === "hypertension" ? createElement(HypertensionPage) : createElement(HealthArticlePage, { article }));
    assert.equal(digest(html), baseline.articleHtml[slug], slug);
  }
  for (const slug of Object.keys(baseline.guideData)) {
    assert.equal(digest(getHealthSupportGuide(slug)), baseline.guideData[slug], slug);
    assert.equal(digest(await render(slug)), baseline.guideHtml[slug], slug);
  }
  assert.equal(digest(healthClaims), baseline.claimRegistrySha256);
  assert.deepEqual(healthSources, baseline.originalSources);
  assert.equal(digest(healthTools), baseline.toolsSha256);
  for (const tool of healthTools) assert.equal(digest(renderToStaticMarkup(createElement(HealthToolPage, { tool }))), baseline.toolHtml[tool.slug], tool.slug);
});

test("five unique new guides have consistent public metadata, dates, sitemap and health-hub navigation", async () => {
  assert.equal(dailyGuides20261002.length, 5);
  assert.equal(healthSupportGuides.length, 14);
  assert.equal(new Set(healthSupportGuides.map(g => g.slug)).size, 14);
  const hub = renderToStaticMarkup(createElement(HealthHub));
  for (const guide of dailyGuides20261002) {
    assert.ok(!Object.hasOwn(baseline.guideData, guide.slug));
    const route = `/health/guides/${guide.slug}`;
    assert.ok(generateStaticParams().some(p => p.slug === guide.slug));
    assert.ok(hub.includes(`href="${route}"`));
    const meta = await generateMetadata({ params: Promise.resolve({ slug: guide.slug }) });
    assert.equal(meta.alternates?.canonical, `https://www.biz2lab.com${route}`);
    assert.equal(meta.description, guide.description);
    assert.equal(new Date(sitemap().find(e => new URL(e.url).pathname === route)!.lastModified!).toISOString().slice(0, 10), "2026-10-02");
    const html = await render(guide.slug);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const article = schemas.find(s => s["@type"] === "Article");
    assert.equal(article.headline, guide.title);
    assert.equal(article.datePublished, "2026-10-02");
    assert.equal(article.dateModified, "2026-10-02");
    assert.deepEqual(article.isBasedOn, guide.sources.map(s => s.url));
    assert.ok(html.includes("면허 의료인 검수 미완료"));
    assert.doesNotMatch(html, /<input|<form|<textarea|reviewedBy|Physician/);
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
    assert.doesNotMatch(visible, /PRIVATE_DRAFT|planned_date|SRC-|OFFICIAL_SOURCE_CHECKED|\*\*|제 지인|제 가족|제가 직접/);
    assert.ok(guide.sources.every(s => s.retrievedAt === "2026-10-02"));
    for (const source of guide.sources) assert.ok(guide.sections.some(section => section.links?.some(link => link.href === source.url)), source.id);
  }
});

test("practical instructions retain privacy, consent, uncertain route and OCR limits", () => {
  const text = (slug: string) => JSON.stringify(getHealthSupportGuide(slug));
  for (const [slug, terms] of Object.entries({
    "lock-screen-info-before-saving": ["잠금 화면", "동의 없이", "추측하지", "SOS를 실행하지", "모든 자동 공유"],
    "photo-backup-is-not-sharing": ["공유하지 않은", "비공개", "공유 보관함", "동의", "기존 온라인 사본", "완전한 보안을 보장하지"],
    "appointment-route-entrance-and-lift": ["가상 작성 예시", "당일 가동상태", "전국 모든", "긴급 도움을 먼저", "확인 필요"],
    "pdf-search-image-text-difference": ["가상 연습 문구", "제한을 우회하지", "온라인 변환 사이트", "원본 이미지와 대조", "의학적 해석을 제공하지"],
    "nutrition-label-same-quantity": ["가상 영양정보", "실제 식품", "8 × 200 ÷ 100 = 16g", "16 × 100 ÷ 200 = 8g", "8 × 60 ÷ 100 = 4.8g", "개인 처방표", "면허 의료인의 검수를 받지"],
  })) for (const term of terms) assert.ok(text(slug).includes(term), `${slug}: ${term}`);
  assert.equal(8 * 200 / 100, 16);
  assert.equal(16 * 100 / 200, 8);
  assert.equal(8 * 60 / 100, 4.8);
});
