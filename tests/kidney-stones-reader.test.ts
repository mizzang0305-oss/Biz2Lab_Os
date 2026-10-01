import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { HealthArticlePage } from "../components/health/HealthArticle";
import { healthArticles, healthClaims, healthSources } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";
import { bodyTheaterScenes } from "../lib/health-v3/body-theater";
import HypertensionPage from "../app/health/hypertension/page";

const baseline = JSON.parse(readFileSync("tests/fixtures/health-p1-baseline.json", "utf8"));
const digest = (text: string) => createHash("sha256").update(text).digest("hex");
const article = healthArticles["kidney-stones"];
const html = renderToStaticMarkup(createElement(HealthArticlePage, { article }));
const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");

test("current kidney citations resolve to verified article bodies while historical evidence stays", () => {
  assert.deepEqual(healthSources.find(source => source.id === "SRC-KDCA-KIDNEY-STONES"), baseline.historicalKdcaSource);
  assert.equal(digest(JSON.stringify(healthClaims)), baseline.claimRegistrySha256);
  assert.ok(!article.sourceIds.includes("SRC-KDCA-KIDNEY-STONES"));
  assert.doesNotMatch(html, /cntnts_sn=5433/);
  const sourceIds = [...article.sections.flatMap(section => section.sourceIds ?? []), ...article.faq.flatMap(item => item.sourceIds ?? []), ...bodyTheaterScenes["kidney-stones"].sourceIds];
  for (const id of sourceIds) assert.ok(article.sourceIds.includes(id), id);
  assert.ok(article.sections[1].sourceIds?.includes("SRC-NIDDK-URINARY-TRACT"));
  assert.ok(article.sections[3].sourceIds?.includes("SRC-EAU-UROLITHIASIS"));
  assert.ok(article.sections[4].sourceIds?.includes("SRC-NIDDK-STONE-DIET"));
});

test("reader source names and plain nonreview disclosure replace visible internal bookkeeping", () => {
  assert.doesNotMatch(visible, /SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim|근거 출처 \d/);
  assert.ok(visible.includes("면허 의료인의 검수를 받지 않았습니다"));
  assert.ok(visible.includes("공식 자료 확인 2026-10-01"));
  assert.ok(html.includes('data-claim-ids="KST-P3-005"'));
  assert.ok(html.includes("https://www.niddk.nih.gov/health-information/urologic-diseases/urinary-tract-how-it-works"));
});

test("distinct pain-versus-passage question, urgent care and individual fluid boundaries remain", () => {
  for (const text of ["통증이 가라앉은 것과 배출 확인은 다릅니다", "콩팥 기능", "모두 나타날 때까지 기다리지", "소변이 나오지 않", "즉시 119", "직접 운전하지", "이미 수분 제한", "임의로 늘리지", "칼슘 식품을 모두 끊는", "스스로 약을 늘리거나 중단하지"]) assert.ok(visible.includes(text), text);
  assert.ok(html.includes('href="/health/tools/kidney-stones-visit-card"'));
  const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const data = structured.find(item => item["@type"] === "Article");
  assert.equal(data.headline, article.title);
  assert.equal(data.dateModified, "2026-10-01");
  assert.equal(data.isBasedOn.length, 9);
});

test("shared renderer changes preserve every other disease guide byte for byte", () => {
  for (const other of Object.values(healthArticles).filter(item => !["kidney-stones", "type-2-diabetes", "allergic-rhinitis", "gastroesophageal-reflux-disease", "osteoarthritis", "osteoporosis", "asthma", "stroke", "acute-myocardial-infarction", "dyslipidemia", "obesity", "migraine", "metabolic-dysfunction-associated-steatotic-liver-disease", "irritable-bowel-syndrome", "sleep-apnea"].includes(item.slug))) {
    const rendered = renderToStaticMarkup(other.slug === "hypertension" ? createElement(HypertensionPage) : createElement(HealthArticlePage, { article: other }));
    assert.equal(digest(rendered), baseline.articleHtml[other.slug], other.slug);
  }
  for (const guide of healthSupportGuides.filter(item => item.slug !== "family-medication-support" && item.slug !== "danger-signals" && item.slug !== "medication-list" && item.slug !== "older-parent-health-organizer" && item.slug !== "measuring-blood-pressure")) {
    assert.equal(digest(JSON.stringify(guide)), baseline.supportGuideSha256[guide.slug], guide.slug);
  }
});
