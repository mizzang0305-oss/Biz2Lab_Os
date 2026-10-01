import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { HealthArticlePage } from "../components/health/HealthArticle";
import { healthArticles, healthClaims, healthSources, healthTools } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";
import { bodyTheaterScenes } from "../lib/health-v3/body-theater";
import HypertensionPage from "../app/health/hypertension/page";
import { metadata as diabetesMetadata } from "../app/health/type-2-diabetes/page";

const baseline = JSON.parse(readFileSync("tests/fixtures/health-lab-observation-baseline.json", "utf8"));
const digest = (value: unknown) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const revisedSlugs = ["type-2-diabetes", "allergic-rhinitis", "gastroesophageal-reflux-disease"];
const render = (slug: keyof typeof healthArticles) => renderToStaticMarkup(createElement(HealthArticlePage, { article: healthArticles[slug] }));
const visible = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");

test("three authorized revisions preserve all other disease bodies and previous public releases", () => {
  for (const article of Object.values(healthArticles).filter(item => !revisedSlugs.includes(item.slug))) {
    const html = article.slug === "hypertension" ? renderToStaticMarkup(createElement(HypertensionPage)) : render(article.slug);
    assert.equal(digest(html), baseline.articleHtml[article.slug], article.slug);
    assert.equal(digest(article), baseline.articleData[article.slug], article.slug);
  }
  assert.equal(digest(healthSupportGuides), baseline.supportGuidesSha256);
  assert.equal(digest(healthTools), baseline.toolsSha256);
  assert.equal(digest(healthClaims), baseline.claimRegistrySha256);
  for (const source of baseline.originalSources) assert.deepEqual(healthSources.find(item => item.id === source.id), source);
});

test("diabetes distinguishes test clocks, conditions and recheck questions without prescribing values", () => {
  const article = healthArticles["type-2-diabetes"];
  const html = render(article.slug), text = visible(html);
  assert.equal(article.updatedAt, "2026-10-01");
  assert.equal(article.sourceCheckedAt, "2026-10-01");
  assert.equal(article.faq.length, 0);
  for (const term of ["검사기관의 금식·복약 안내", "지난 3개월", "최근 한 달", "빈혈", "수혈", "재검 질문 세 개", "업데이트 2026-09-16", "이전 출처 대조일 2026-09-06", "2026-10-01에 다시 확인", "검사일은 서로 다른 날짜"]) assert.ok(text.includes(term), term);
  assert.doesNotMatch(text, /SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim|근거 출처 \d|자주 묻는 질문/);
  assert.ok(text.includes("면허 의료인의 검수를 받지 않았습니다"));
  assert.ok(html.includes('data-claim-ids="DIA-B1-007'));
  assert.equal(healthClaims.filter(claim => claim.articleSlug === article.slug).length, 13);
  const ld = JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);
  assert.equal(ld.headline, article.title);
  assert.equal(ld.dateModified, "2026-10-01");
  assert.equal(diabetesMetadata.description, article.description);
});

test("routine diabetes planning is separate from current symptoms with direct official treatment routes", () => {
  const article = healthArticles["type-2-diabetes"], html = render(article.slug), text = visible(html);
  for (const term of ["평소", "지금 증상을 치료하는 순서가 아니라", "지금 저혈당 증상이 있다면", "안전하게 삼킬 수 있는", "방법을 모르거나 회복되지 않으면 즉시", "의식이 없거나 안전하게 삼킬 수 없는", "음식·물·약을 억지로 먹이지", "즉시 119", "화면 입력을 저장하는 서비스가 아닙니다"]) assert.ok(text.includes(term), term);
  assert.ok(html.includes('href="https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/"'));
  assert.ok(html.includes('href="https://www.cdc.gov/diabetes/treatment/treatment-low-blood-sugar-hypoglycemia.html"'));
  assert.doesNotMatch(text, /15그램|15g|15분 후|혈당 목표는 \d|인슐린을 \d/);
  const ids = [...article.sections.flatMap(section => section.sourceIds ?? []), ...bodyTheaterScenes[article.slug].sourceIds];
  for (const id of ids) assert.ok(article.sourceIds.includes(id), id);
  for (const slug of article.toolSlugs) assert.ok(healthTools.some(tool => tool.slug === slug));
});
