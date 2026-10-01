import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import SupportGuidePage, { generateMetadata } from "../app/health/guides/[slug]/page";
import { getHealthSupportGuide, healthSupportGuides } from "../lib/health-v3/support-guides";

const baseline = JSON.parse(readFileSync("tests/fixtures/health-support-action-baseline.json", "utf8"));
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const revised = new Set(["medication-list"]);
const danger = getHealthSupportGuide("danger-signals")!;

test("emergency action precedes records and education; no counseling or symptom-strength prerequisite", () => {
  assert.deepEqual(danger.sections.slice(0, 3).map(section => section.id), ["urgent-action", "mental-crisis", "after-calling"]);
  assert.ok(danger.sections.slice(0, 2).every(section => section.tone === "warning"));
  const text = JSON.stringify(danger);
  for (const phrase of ["하나만 있어도", "가벼워도", "직접 운전", "모두 알아내기 전에도 신고", "경찰 보호가 필요하면 112", "24시간", "109 상담을 먼저", "구조·보호를 미루지", "사라져도 안전하다고 단정하지"]) assert.ok(text.includes(phrase), phrase);
  assert.equal(danger.faq, undefined);
  assert.equal(danger.sections.find(section => section.id === "after-calling")?.table?.rows.length, 4);
});

test("breathlessness has its own verified primary source and foreign numbers are not local instructions", () => {
  const source = danger.sources.find(source => source.id === "SUP-NHS-BREATH")!;
  assert.equal(source.url, "https://www.nhs.uk/symptoms/shortness-of-breath/");
  assert.ok(danger.sections.find(section => section.id === "after-safety")?.sourceIds?.includes(source.id));
  assert.ok(!danger.sections.find(section => section.id === "after-safety")?.sourceIds?.includes("SUP-NHS-MI"));
  assert.equal(danger.sources.find(source => source.id === "SUP-POLICE-112")?.url, "https://www.112.go.kr/rpea/web/getBoardDtl.do?type=B&seqNo=313");
  assert.ok(danger.sources.every(source => source.retrievedAt === "2026-10-01"));
  for (const section of danger.sections) for (const id of section.sourceIds ?? []) assert.ok(danger.sources.some(source => source.id === id), id);
  assert.doesNotMatch(JSON.stringify(danger.sections), /(?:999|988|911|111)에/);
});

test("actual danger markup and metadata align without internal codes or invented patient story", async () => {
  const params = Promise.resolve({slug: danger.slug});
  const html = renderToStaticMarkup(await SupportGuidePage({params}));
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
  assert.doesNotMatch(visible, /SUP-|SRC-|OFFICIAL_SOURCE_CHECKED|검수 완료/);
  assert.ok(visible.includes("면허 의료인 검수 미완료"));
  assert.ok(html.indexOf('id="urgent-action"') < html.indexOf('id="after-calling"'));
  const article = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(item => item["@type"] === "Article");
  assert.equal(article.headline, danger.title);
  assert.equal(article.description, danger.description);
  assert.equal(article.dateModified, "2026-10-01");
  const metadata = await generateMetadata({params});
  assert.equal(metadata.description, danger.description);
  assert.equal(article.isBasedOn.length, danger.sources.length);
});

test("all other eight support articles retain their exact approved data and rendered markup", async () => {
  for (const guide of healthSupportGuides.filter(guide => !revised.has(guide.slug))) {
    assert.equal(hash(JSON.stringify(guide)), baseline.guides[guide.slug].data, guide.slug);
    const html = renderToStaticMarkup(await SupportGuidePage({params: Promise.resolve({slug: guide.slug})}));
    assert.equal(hash(html), baseline.guides[guide.slug].html, guide.slug);
  }
});

test("one fictional medication row separates strength, instructions, actual use and uncertain information", () => {
  const guide = getHealthSupportGuide("medication-list")!;
  const example = guide.sections.find(section => section.id === "worked-label")!;
  assert.equal(example.table?.rows.length, 1);
  assert.deepEqual(example.table?.columns, ["제품 이름·형태", "제품 함량", "안내받은 사용법", "실제 사용", "확인 필요", "변경·확인일"]);
  const text = JSON.stringify(guide.sections);
  for (const phrase of ["실제 약·환자·가족의 처방이 아니", "국내 약봉투의 표준 형식이 아닙니다", "함량만 보고 사용량을 계산", "기억나지 않음", "확인 필요", "미국 일반약", "임의로 중단·재시작", "화면 입력을 저장하지"]) assert.ok(text.includes(phrase), phrase);
  assert.doesNotMatch(JSON.stringify(example), /\d+\s*(?:mg|mL)|아스피린|와파린/);
  assert.equal(guide.faq, undefined);
  assert.ok(guide.sections.find(section => section.id === "blank-sheet")?.links?.some(link => link.href === "/health/samples/medication-list-blank.html"));
  const sheet = readFileSync("public/health/samples/medication-list-blank.html", "utf8");
  assert.doesNotMatch(sheet, /<script|<input|<form|fetch\(/);
  assert.ok(sheet.includes("@page{size:A4 landscape"));
  assert.ok(sheet.includes("확인된 없음 구분"));
});

test("medication paragraph sources identify distinct FDA documents; headline and dates align", async () => {
  const guide = getHealthSupportGuide("medication-list")!;
  const html = renderToStaticMarkup(await SupportGuidePage({params: Promise.resolve({slug: guide.slug})}));
  for (const source of guide.sources.filter(source => source.organization === "U.S. FDA")) {
    assert.ok(html.includes(`href="#source-${source.id}">U.S. FDA: ${source.title}`), source.title);
  }
  for (const section of guide.sections) for (const id of section.sourceIds ?? []) assert.ok(guide.sources.some(source => source.id === id), id);
  const data = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(item => item["@type"] === "Article");
  assert.equal(data.headline, guide.title);
  assert.equal(data.description, guide.description);
  assert.equal(data.dateModified, "2026-10-01");
  assert.ok(html.includes('style="grid-template-columns:minmax(0, 1fr)"'));
});
