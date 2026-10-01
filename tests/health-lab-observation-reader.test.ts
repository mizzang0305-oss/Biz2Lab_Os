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
import { metadata as rhinitisMetadata } from "../app/health/allergic-rhinitis/page";
import { metadata as refluxMetadata } from "../app/health/gastroesophageal-reflux-disease/page";

const baseline = JSON.parse(readFileSync("tests/fixtures/health-lab-observation-baseline.json", "utf8"));
const digest = (value: unknown) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const revisedSlugs = ["type-2-diabetes", "allergic-rhinitis", "gastroesophageal-reflux-disease", "osteoarthritis", "osteoporosis"];
const render = (slug: keyof typeof healthArticles) => renderToStaticMarkup(createElement(HealthArticlePage, { article: healthArticles[slug] }));
const visible = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");

test("three authorized revisions preserve all other disease bodies and previous public releases", () => {
  for (const article of Object.values(healthArticles).filter(item => !revisedSlugs.includes(item.slug))) {
    const html = article.slug === "hypertension" ? renderToStaticMarkup(createElement(HypertensionPage)) : render(article.slug);
    assert.equal(digest(html), baseline.articleHtml[article.slug], article.slug);
    assert.equal(digest(article), baseline.articleData[article.slug], article.slug);
  }
  const nextBaseline = JSON.parse(readFileSync("tests/fixtures/health-individual-reader-baseline.json", "utf8"));
  assert.equal(digest(healthSupportGuides.filter(guide => guide.slug !== "measuring-blood-pressure")), nextBaseline.remainingSupportGuidesSha256);
  assert.equal(digest(healthTools), baseline.toolsSha256);
  assert.equal(digest(healthClaims), baseline.claimRegistrySha256);
  for (const source of baseline.originalSources) assert.deepEqual(healthSources.find(item => item.id === source.id), source);
});

test("reflux separates endoscopy from a diagnosis and the role of a timing log", () => {
  const article = healthArticles["gastroesophageal-reflux-disease"], html = render(article.slug), text = visible(html);
  assert.ok(article.sections[0].table?.rows.some(row => row[0].includes("GER)")));
  assert.ok(article.sections[0].table?.rows.some(row => row[0].includes("GERD)")));
  for (const term of ["식도염 소견 없음", "모든 역류 문제 없음", "미란성 식도염이 보이지 않는", "혼자 역류질환을 확진하는 근거도 아닙니다", "이번 검사로 무엇을 확인", "식도 pH 검사", "식사·수면", "결과지는 소견을", "시간표는 병명을 붙이거나 약을 계산하는 도구가 아닙니다", "실제 환자의 기록이나 가상 치료 결과가 아닙니다"]) assert.ok(text.includes(term), term);
  assert.equal(article.faq.length, 0);
  assert.equal(article.updatedAt, "2026-10-01");
  assert.equal(refluxMetadata.description, article.description);
  assert.ok(html.includes('href="/health/tools/gerd-symptom-timing-log"'));
  assert.doesNotMatch(text, /SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim|자주 묻는 질문|즉시119|말고119/);
  for (const id of [...article.sections.flatMap(section => section.sourceIds ?? []), ...bodyTheaterScenes[article.slug].sourceIds]) assert.ok(article.sourceIds.includes(id), id);
});

test("swallowing and weight changes prompt care, and suspected bleeding calls for immediate help", () => {
  const article = healthArticles["gastroesophageal-reflux-disease"];
  const prompt = article.sections.find(section => section.title.startsWith("삼킴 변화"))!;
  const urgent = article.sections.find(section => section.tone === "warning")!;
  assert.ok(prompt.paragraphs?.join(" ").includes("신속히 의료진에게 알리고 진료"));
  assert.ok(prompt.paragraphs?.join(" ").includes("정해진 기록 기간을 채울 때까지 기다리지"));
  const text = urgent.paragraphs?.join(" ") ?? "";
  for (const term of ["커피 찌꺼기", "검고 타르 같은", "즉시 의료 도움", "실신", "즉시 119", "증상이 가볍거나 오르내릴", "위장약을 먹어 본 뒤 반응으로", "안전이 보장되는 것은 아닙니다"]) assert.ok(text.includes(term), term);
  assert.ok(urgent.sourceIds?.includes("SRC-NIDDK-GI-BLEEDING"));
  assert.ok(render(article.slug).includes('href="https://www.niddk.nih.gov/health-information/digestive-diseases/gastrointestinal-bleeding/symptoms-causes"'));
  assert.doesNotMatch(text, /\d+시간|\d+일|식도염이면 119|식도염이 없으니 안전/);
});

test("rhinitis pairs a fictional fact-versus-guess table with a single main observation tool", () => {
  const article = healthArticles["allergic-rhinitis"], html = render(article.slug), text = visible(html);
  for (const term of ["양성인 물질이 모두", "실제 가족·지인의 기록이나 검사 결과", "가상 코·눈 관찰 예시", "관찰한 사실", "아직 확인하지 않은 추측", "침실", "실외", "일부러 의심 물질에 노출하거나 약을 끊어 확인하지", "검사기관에 약 이름", "청소나 가족의 노력이 부족해서"]) assert.ok(text.includes(term), term);
  assert.deepEqual(article.toolSlugs, ["allergy-trigger-observation"]);
  assert.equal(article.faq.length, 0);
  assert.equal(article.updatedAt, "2026-10-01");
  assert.equal(rhinitisMetadata.description, article.description);
  assert.doesNotMatch(text, /SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim|자주 묻는 질문/);
  assert.ok(text.includes("MedlinePlus Medical Encyclopedia / A.D.A.M."));
  assert.doesNotMatch(text, /NIH\/MedlinePlus: Allergic rhinitis|NIH\/MedlinePlus, Allergic rhinitis/);
  assert.ok(html.includes('href="/health/tools/allergy-trigger-observation"'));
  for (const id of bodyTheaterScenes[article.slug].sourceIds) assert.ok(article.sourceIds.includes(id), id);
});

test("spray packaging and water safety do not become product or mixing prescriptions", () => {
  const article = healthArticles["allergic-rhinitis"], html = render(article.slug), text = visible(html);
  for (const term of ["제품 추천", "성분명", "안내된 기간", "확인 필요", "비강 스테로이드", "비강 항히스타민제", "비충혈제거제", "생리식염수", "수돗물을 그대로 사용하지", "끓인 뒤 식힌 물", "소금 농도·배합", "코 세척 뒤 두통·열·혼란·구토", "즉시 119"]) assert.ok(text.includes(term), term);
  assert.ok(html.includes('href="https://www.cdc.gov/naegleria/prevention/sinus-rinsing.html"'));
  assert.ok(article.sourceIds.includes("SRC-CDC-SAFE-SINUS-RINSING"));
  assert.doesNotMatch(text, /소금 \d|표백제 \d|몇 방울|하루 \d회|스프레이를 \d/);
  assert.ok(text.includes("면허 의료인의 검수를 받지 않았습니다"));
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
