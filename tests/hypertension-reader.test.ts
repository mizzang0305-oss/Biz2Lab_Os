import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import HypertensionPage, { metadata } from "../app/health/hypertension/page";
import { healthArticles, healthClaims, healthSources, trustPages } from "../lib/health-v3/content";

const html = renderToStaticMarkup(HypertensionPage());
const title = "집에서 잰 혈압, 진료 때 어떻게 보여줄까요?";
const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));

test("reader title, Article, breadcrumb and discovery metadata agree", () => {
  const article = structured.find(item => item["@type"] === "Article");
  assert.equal(healthArticles.hypertension.title, title);
  assert.equal(metadata.title, title);
  assert.equal(article.headline, title);
  assert.equal(article.description, healthArticles.hypertension.description);
  assert.equal(article.dateModified, "2026-10-01");
  assert.equal(article.datePublished, "2026-08-26");
  assert.equal(article.mainEntityOfPage, "https://www.biz2lab.com/health/hypertension");
  assert.equal(structured.find(item => item["@type"] === "BreadcrumbList").itemListElement.at(-1).name, title);
  assert.ok(html.includes(`<h1>${title}</h1>`));
});

test("measurement and fictional example preserve raw readings and no drug changes", () => {
  for (const text of ["30분", "5분 이상", "1분 간격", "두 값 모두 기록", "가상 예시", "실제 환자의 기록이 아니며", "142/88 mmHg", "139/87 mmHg", "07:00", "07:01", "임의로 늘리거나 줄이지", "인쇄용 양식"]) assert.ok(html.includes(text), text);
  assert.ok(html.includes("한 번의 값이나 이 설명만으로 진단할 수는 없습니다"));
  assert.ok(html.includes("24시간 활동혈압"));
  assert.ok(html.includes('href="/health/tools/blood-pressure-log"'));
  assert.ok(html.includes('href="/health/tools/blood-pressure-questions"'));
});

test("emergency thresholds keep strict OR, asymptomatic and nonpregnant adult conditions", () => {
  for (const text of ["임신하지 않은 성인", "180 mmHg 초과", "또는 이완기", "120 mmHg 초과", "최소 1분", "즉시 의료진", "재측정을 기다리지 말고 119", "직접 운전하지", "낮아도 안전이 보장", "임신 중이거나 소아", "개인 상태에 따른 의료진의 지침", "면허 의료인의 검수를 받지 않았습니다"]) assert.ok(html.includes(text), text);
  assert.equal(structured.find(item => item["@type"] === "Article").isBasedOn.length, 6);
  for (const text of ["평소와 다른 가슴", "가볍다고 넘기지", "약하게 시작", "확실하지 않아도", "통증이 심해지기를 기다리지", "https://www.nhlbi.nih.gov/health/heart-attack/symptoms"]) assert.ok(html.includes(text), text);
});

test("reader removes internal codes and repetitive FAQ while original claim/policy history stays", () => {
  assert.doesNotMatch(html, /SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|data-claim-ids|근거 출처 \d|자주 묻는 질문|기존 claim/);
  assert.equal(healthClaims.filter(claim => claim.articleSlug === "hypertension").length, 13);
  assert.equal(healthSources.length, 168);
  assert.ok(trustPages.find(page => page.slug === "contact")?.intro.includes("접수 가능 여부는 확인되지 않았습니다"));
  assert.ok(trustPages.some(page => page.slug === "ai-disclosure"));
});
