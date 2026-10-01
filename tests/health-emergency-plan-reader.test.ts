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

const baseline=JSON.parse(readFileSync("tests/fixtures/health-emergency-plan-baseline.json","utf8"));
const original=JSON.parse(readFileSync("tests/fixtures/health-emergency-plan-original.json","utf8"));
const selected=["asthma","stroke","acute-myocardial-infarction"] as const;
const digest=(v:unknown)=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const render=(slug:typeof selected[number])=>renderToStaticMarkup(createElement(HealthArticlePage,{article:healthArticles[slug]}));
const plain=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"");

test("earlier batch preserves article bodies not revised subsequently, all original claims, sources and tool data",async()=>{
 for(const a of Object.values(healthArticles).filter(a=>![...selected, "dyslipidemia", "obesity", "migraine", "metabolic-dysfunction-associated-steatotic-liver-disease", "irritable-bowel-syndrome", "sleep-apnea", "gout", "urinary-tract-infection"].includes(a.slug))){
  assert.equal(digest(a),baseline.articleData[a.slug],a.slug);
  assert.equal(digest(renderToStaticMarkup(a.slug==="hypertension"?createElement(HypertensionPage):createElement(HealthArticlePage,{article:a}))),baseline.articleHtml[a.slug],a.slug);
 }
 for(const g of healthSupportGuides.filter(g=>!["reading-health-results","symptom-journal","appointment-questions"].includes(g.slug)&&g.slug!=="understanding-hba1c")){assert.equal(digest(g),baseline.guideData[g.slug],g.slug);assert.equal(digest(renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})}))),baseline.guideHtml[g.slug],g.slug);}
 assert.equal(digest(healthClaims),baseline.claimRegistrySha256);assert.equal(healthClaims.length,144);
 assert.deepEqual(healthSources,baseline.originalSources);assert.equal(healthSources.length,170);
 assert.equal(digest(healthTools),baseline.toolsSha256);
});

test("original emergency wording remains intact and precedes the educational work",()=>{
 for(const [i,slug] of selected.entries()){
  const a=healthArticles[slug],warning=a.sections[0],before=original.articles[i].sections.find((s:{tone?:string})=>s.tone==="warning");
  assert.equal(warning.tone,"warning");
  assert.deepEqual({...warning,imageId:null},{...before,imageId:null},slug);
  const html=render(slug);assert.ok(html.indexOf('id="urgent-action"')<html.indexOf(a.sections[1].title));
  assert.ok(warning.paragraphs?.some(p=>p.includes("119")));assert.ok(plain(html).includes("직접 운전"));
 }
});

test("asthma reads a real existing prescription without deriving doses, role from colour or a universal follow-up deadline",()=>{
 const a=healthArticles.asthma,text=plain(render("asthma"));
 for(const term of ["실제 기기·약 봉투","증상이 있을 때 쓰는 AIR","평소 사용과 증상 완화를 함께 하는 MART","이름과 개인 지침","새 치료계획을 만들거나 용량을 계산","지체 없이 연락","담당 진료팀과 정한 발작 후 연락 시점·연락처","종이·디지털 계획","제 기기로 사용하는 모습을","온라인 용량"])assert.ok(text.includes(term),term);
 assert.doesNotMatch(text,/\d+\s*(회\s*흡입|퍼프|puff|일\s*이내|시간\s*이내|mg)/i);
 assert.ok(a.sections[1].links?.some(l=>l.href==="/health/tools/asthma-visit-card"));
 assert.ok(a.sections.findIndex(s=>s.table)!<a.sections.findIndex(s=>s.imageId==="ast-concept"));
});

test("stroke tells two times after calling, with one openly fictional wake-up example and no treatment deadline",()=>{
 const a=healthArticles.stroke,text=plain(render("stroke")),time=a.sections[1];
 assert.ok(time.title.includes("신고 후"));assert.equal(time.table?.rows.length,2);
 for(const term of ["평소 상태","증상을 처음 발견한 때","가상 설명 예시","깬 때를 실제 발병 시각으로 단정하지","두 시각이 같을 수도","대략 또는 모름","실제 환자 기록이나 치료 가능 시간표가 아닙니다","B.E. F.A.S.T.","외우거나 시험할 때까지 기다리지","음식이나 마실 것을 주지","아스피린"])assert.ok(text.includes(term),term);
 assert.equal(a.sections.filter(s=>s.paragraphs?.some(p=>p.includes("가상"))).length,1);
 assert.doesNotMatch(text,/\d+\s*(시간|분)\s*(이내|안에|까지)/);
 assert.ok(!a.imageIds.includes("stroke-concept"));assert.doesNotMatch(render("stroke"),/stroke%2Fconcept-v2\.webp|stroke\/concept-v2\.webp/);
});

test("heart attack corrects three hesitation questions before post-evaluation tests and separates four discharge questions",()=>{
 const a=healthArticles["acute-myocardial-infarction"],text=plain(render("acute-myocardial-infarction"));
 assert.equal(a.sections[1].table?.rows.length,3);
 assert.ok(a.sections[1].table?.rows.some(r=>r[0].includes("심하게")));
 assert.ok(a.sections[1].table?.rows.some(r=>r[0].includes("몇 분")));
 assert.ok(a.sections[1].table?.rows.some(r=>r[0].includes("소화제")));
 const testing=a.sections.findIndex(s=>s.title==="신고·응급 평가 이후에 읽는 검사 설명");assert.ok(testing>1);
 for(const term of ["119 안내가 먼저","다른 원인의 손상","높은 수치 하나로 심근경색을 확정하지","공통 숫자표는 제공하지","임의로 보충·조절하지","활동·심장재활"])assert.ok(text.includes(term),term);
 assert.equal(a.sections.at(-1)?.table?.rows.length,4);
 assert.doesNotMatch(text,/\d+\s*(시간|분|mg|ng\/)/);
});

test("reader source links, honest review status and Article metadata agree without publishing internal codes",()=>{
 for(const slug of selected){
  const a=healthArticles[slug],html=render(slug),text=plain(html),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);
  assert.equal(a.faq.length,0);assert.equal(a.updatedAt,"2026-10-01");assert.equal(a.sourceCheckedAt,"2026-10-01");
  assert.equal(ld.headline,a.title);assert.equal(ld.description,a.description);assert.equal(ld.dateModified,a.updatedAt);
  assert.ok(text.includes("면허 의료인의 검수를 받지 않았습니다"));
  assert.doesNotMatch(text,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim/);
  for(const id of a.sections.flatMap(s=>s.sourceIds??[])){const source=healthSources.find(s=>s.id===id)!;assert.ok(a.sourceIds.includes(id),id);assert.ok(html.includes('href="'+source.url.replace(/&/g,"&amp;")+'"'),id);assert.ok(html.includes('id="source-'+id+'"'),id);}
 }
});
