import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { healthArticles, healthClaims, healthSources, healthTools } from "../lib/health-v3/content";
import { dailyGuides20261003 } from "../lib/health-v3/daily-guides-20261003";
import { getHealthSupportGuide, healthSupportGuides } from "../lib/health-v3/support-guides";
import { HealthArticlePage } from "../components/health/HealthArticle";
import { HealthToolPage } from "../components/health/HealthToolPage";
import HypertensionPage from "../app/health/hypertension/page";
import GuidePage, { generateMetadata, generateStaticParams } from "../app/health/guides/[slug]/page";
import HealthHub from "../app/health/page";
import sitemap from "../app/sitemap";

const baseline = JSON.parse(readFileSync("tests/fixtures/daily-five-baseline-34.json", "utf8"));
const digest = (value: unknown) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const render = async (slug: string) => renderToStaticMarkup(await GuidePage({ params: Promise.resolve({ slug }) }));

test("October 3 additions preserve all 34 prior articles and all claim/source/tool evidence", async () => {
  assert.equal(Object.keys(baseline.articleData).length + Object.keys(baseline.guideData).length, 34);
  for (const slug of Object.keys(baseline.articleData)) {
    const article = healthArticles[slug as keyof typeof healthArticles];
    assert.ok(article, slug);
    assert.equal(digest(article), baseline.articleData[slug], slug);
    assert.equal(digest(renderToStaticMarkup(slug === "hypertension" ? createElement(HypertensionPage) : createElement(HealthArticlePage, { article }))), baseline.articleHtml[slug], slug);
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

test("October 3 five new articles have original titles, archived navigation and honest source/date metadata", async () => {
  assert.equal(dailyGuides20261003.length, 5);
  assert.equal(healthSupportGuides.length, 19);
  assert.equal(new Set(healthSupportGuides.map(g => g.slug)).size, 19);
  const hub = renderToStaticMarkup(createElement(HealthHub));
  for (const guide of dailyGuides20261003) {
    assert.ok(!Object.hasOwn(baseline.guideData, guide.slug));
    const route = `/health/guides/${guide.slug}`;
    assert.ok(generateStaticParams().some(p => p.slug === guide.slug));
    assert.ok(hub.includes(`href="${route}"`));
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: guide.slug }) });
    assert.equal(metadata.alternates?.canonical, `https://www.biz2lab.com${route}`);
    assert.equal(metadata.description, guide.description);
    assert.equal(sitemap().some(e => new URL(e.url).pathname === route), false);
    const html = await render(guide.slug);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const article = schemas.find(s => s["@type"] === "Article");
    assert.equal(article.headline, guide.title);
    assert.equal(article.datePublished, "2026-10-03");
    assert.equal(article.dateModified, "2026-10-03");
    assert.deepEqual(article.isBasedOn, guide.sources.map(s => s.url));
    assert.doesNotMatch(html, /<input|<form|<textarea|reviewedBy|Physician|coupang|affiliate/i);
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
    assert.ok(visible.includes("면허 의료인 검수 미완료"));
    assert.doesNotMatch(visible, /PRIVATE_DRAFT|SRC-|OFFICIAL_SOURCE_CHECKED|제 지인|제 가족|제가 직접/);
    assert.ok(guide.sources.every(s => s.retrievedAt === "2026-10-03"));
    for (const source of guide.sources) assert.ok(guide.sections.some(section => section.links?.some(link => link.href === source.url)), source.id);
  }
});

test("October 3 source-based instructions keep immediate hearing care and avoid self diagnosis/prescribing", () => {
  const text = (slug: string) => JSON.stringify(getHealthSupportGuide(slug));
  const hearing = getHealthSupportGuide("hearing-sound-and-words")!;
  assert.equal(hearing.sections[0].tone, "warning");
  assert.ok(hearing.sections[0].paragraphs?.some(p => p.includes("즉시") && p.includes("지체하지")));
  for (const [slug, terms] of Object.entries({
    "health-claim-before-forwarding": ["가상 연습 문구", "원문의 대상", "약을 시작·중단·변경하지", "원문을 먼저"],
    "soap-or-sanitizer-different-jobs": ["30초 이상", "60% 이상", "눈에 띄게 더럽거나 기름진", "마르기 전에 닦아", "어른의 감독", "제조·희석법"],
    "hearing-sound-and-words": ["순음검사", "말소리검사", "배경 소음", "가상 표현 연습", "자가판정하지"],
    "vaccination-record-not-found": ["미접종이라고 단정하지", "로그인·본인 확인", "가상 분류 예시", "스스로 재접종", "접종을 생략하지", "미국의 접종 일정표"],
    "eye-exam-and-trip-home": ["시야검사", "안압검사", "동공을 넓혀", "귀가 방법", "흐리거나 불편한 상태에서 운전하지", "가상 준비 메모"],
  })) for (const term of terms) assert.ok(text(slug).includes(term), `${slug}: ${term}`);
});
