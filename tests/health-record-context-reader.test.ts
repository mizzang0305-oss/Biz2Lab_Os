import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {createElement} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import test from "node:test";
import {HealthArticlePage} from "../components/health/HealthArticle";
import {healthArticles,healthClaims,healthSources,healthTools} from "../lib/health-v3/content";
import {healthSupportGuides} from "../lib/health-v3/support-guides";
import GuidePage from "../app/health/guides/[slug]/page";
import HypertensionPage from "../app/health/hypertension/page";
const baseline=JSON.parse(readFileSync("tests/fixtures/health-record-context-baseline.json","utf8"));
const original=JSON.parse(readFileSync("tests/fixtures/health-record-context-original.json","utf8"));
const selected=["dyslipidemia","obesity","migraine"] as const;
const digest=(v:unknown)=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const render=(slug:typeof selected[number])=>renderToStaticMarkup(createElement(HealthArticlePage,{article:healthArticles[slug]}));
const plain=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"");

test("record-context batch preserves bodies not subsequently revised, all claims, sources, tools and guides",async()=>{
 for(const a of Object.values(healthArticles).filter(a=>![...selected, "metabolic-dysfunction-associated-steatotic-liver-disease", "irritable-bowel-syndrome", "sleep-apnea", "gout", "urinary-tract-infection"].includes(a.slug))){
  assert.equal(digest(a),baseline.articleData[a.slug],a.slug);
  assert.equal(digest(renderToStaticMarkup(a.slug==="hypertension"?createElement(HypertensionPage):createElement(HealthArticlePage,{article:a}))),baseline.articleHtml[a.slug],a.slug);
 }
 for(const g of healthSupportGuides.filter(g=>Object.hasOwn(baseline.guideData, g.slug)&&!["reading-health-results","symptom-journal","appointment-questions"].includes(g.slug)&&g.slug!=="understanding-hba1c")){assert.equal(digest(g),baseline.guideData[g.slug],g.slug);assert.equal(digest(renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})}))),baseline.guideHtml[g.slug],g.slug);}
 assert.equal(digest(healthClaims),baseline.claimRegistrySha256);assert.equal(healthClaims.length,144);
 assert.deepEqual(healthSources,baseline.originalSources);assert.equal(healthSources.length,170);
 assert.equal(digest(healthTools),baseline.toolsSha256);
});
test("each original emergency section remains intact without weakening any condition",()=>{
 for(const [i,slug] of selected.entries()){
  const before=original.articles[i].sections.find((s:{tone?:string})=>s.tone==="warning");
  assert.deepEqual(healthArticles[slug].sections.find(s=>s.tone==="warning"),before,slug);
 }
 for(const slug of ["dyslipidemia","migraine"] as const)assert.equal(healthArticles[slug].sections[0].tone,"warning");
});
test("lipid report explains four items once and asks comparison conditions without universal targets",()=>{
 const a=healthArticles.dyslipidemia,t=plain(render("dyslipidemia")),report=a.sections.find(s=>s.title==="한 결과표에 붙이는 네 가지 주석")!;
 assert.equal(report.table?.rows.length,4);
 for(const term of ["설명용 결과표","실제 환자의 검사 결과","LDL","HDL","중성지방(TG)","총콜레스테롤(TC)","실제 마지막 식사 시각","비교 가능한 조건","포화지방","당분과 음주","개인 치료 목표","한 결과만으로 약을 시작·중단·증량하지"])assert.ok(t.includes(term),term);
 assert.doesNotMatch(t,/\d+\s*(mg\/dL|시간\s*(금식|굶)|개월\s*미뤄)/i);
 assert.ok(a.sections.some(s=>s.links?.some(l=>l.href==="/health/tools/dyslipidemia-visit-card")));
});
test("weight conversation gives consent, three factual change boxes and no fictional personal success",()=>{
 const a=healthArticles.obesity,t=plain(render("obesity"));
 assert.equal(a.sections[0].table?.rows.length,2);
 const memo=a.sections.find(s=>s.title.startsWith("최근 변화 세 칸"))!;assert.equal(memo.table?.rows.length,3);
 for(const term of ["가상 대화","실제 가족·환자의 경험","대화를 원하지 않으면 강요하지","가상 메모 예시","원인이라고 결론낸 사례도 아닙니다","국내 서울아산병원","해외 표의 분류","약 이름과 변경 시기","임의로 끊지","원하는 도움은 본인이 한 가지"])assert.ok(t.includes(term),term);
 assert.doesNotMatch(t,/\d+\s*(kg|㎏|kcal|칼로리|cm|BMI|%|분\s*운동)/i);
});
test("headache diary separates actual acute-use dates from prevention and future dosing",()=>{
 const a=healthArticles.migraine,t=plain(render("migraine")),record=a.sections[1];
 assert.equal(record.table?.rows.length,2);assert.equal(record.table?.columns.length,3);
 for(const term of ["가상 달력 두 줄","실제 환자의 경험","정상 사용 빈도","앞으로의 복용 계획이 아닙니다","두통 발생일","예방약의 계획된 사용","하루의 복용 횟수와 사용한 날짜","일반적인 지속 시간이 끝날 때까지 기다리는 안전선","임신 중이거나 출산 직후","언제 어디로 연락하나요","약을 혼자 늘리거나 바꾸거나 중단하지"])assert.ok(t.includes(term),term);
 assert.doesNotMatch(t,/\d+\s*(mg|시간|일\s*이내|회\s*복용|일\s*이상)/i);
 assert.ok(a.sections[1].links?.some(l=>l.href==="/health/tools/migraine-visit-card"));
});
test("plain reader sources and honest review notice agree with Article metadata",()=>{
 for(const slug of selected){
  const a=healthArticles[slug],html=render(slug),t=plain(html),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);
  assert.equal(a.faq.length,0);assert.equal(a.updatedAt,"2026-10-01");assert.equal(a.sourceCheckedAt,"2026-10-01");
  assert.equal(ld.headline,a.title);assert.equal(ld.description,a.description);assert.equal(ld.dateModified,a.updatedAt);
  assert.ok(t.includes("면허 의료인의 검수를 받지 않았습니다"));assert.doesNotMatch(t,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim/);
  for(const id of a.sections.flatMap(s=>s.sourceIds??[])){const source=healthSources.find(s=>s.id===id)!;assert.ok(a.sourceIds.includes(id),id);assert.ok(html.includes('href="'+source.url.replace(/&/g,"&amp;")+'"'),id);assert.ok(html.includes('id="source-'+id+'"'),id);}
 }
});
