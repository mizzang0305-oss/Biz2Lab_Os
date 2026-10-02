import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {createElement} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import test from "node:test";
import {HealthArticlePage} from "../components/health/HealthArticle";
import {HealthToolPage} from "../components/health/HealthToolPage";
import {healthArticles,healthClaims,healthSources,healthTools} from "../lib/health-v3/content";
import {healthSupportGuides,getHealthSupportGuide} from "../lib/health-v3/support-guides";
import GuidePage from "../app/health/guides/[slug]/page";
import HypertensionPage from "../app/health/hypertension/page";
const baseline=JSON.parse(readFileSync("tests/fixtures/health-results-questions-baseline.json","utf8"));
const original=JSON.parse(readFileSync("tests/fixtures/health-results-questions-original.json","utf8"));
const selected=["gout","urinary-tract-infection"] as const;
const digest=(v:unknown)=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const render=(slug:typeof selected[number])=>renderToStaticMarkup(createElement(HealthArticlePage,{article:healthArticles[slug]}));
const plain=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"");
test("results batch preserves other18 disease and8 guide data/renderings, claims, sources, all34 tool data and other33 tool renderings apart from the UTI parent-title label",async()=>{
 for(const a of Object.values(healthArticles).filter(a=>!selected.includes(a.slug as typeof selected[number]))){assert.equal(digest(a),baseline.articleData[a.slug],a.slug);assert.equal(digest(renderToStaticMarkup(a.slug==="hypertension"?createElement(HypertensionPage):createElement(HealthArticlePage,{article:a}))),baseline.articleHtml[a.slug],a.slug);}
 for(const g of healthSupportGuides.filter(g=>Object.hasOwn(baseline.guideData, g.slug)&&!["reading-health-results","symptom-journal","appointment-questions"].includes(g.slug)&&g.slug!=="understanding-hba1c")){assert.equal(digest(g),baseline.guideData[g.slug],g.slug);assert.equal(digest(renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})}))),baseline.guideHtml[g.slug],g.slug);}
 assert.equal(healthClaims.length,144);assert.equal(digest(healthClaims),baseline.claimRegistrySha256);assert.equal(healthSources.length,170);assert.deepEqual(healthSources,baseline.originalSources);assert.equal(digest(healthTools),baseline.toolsSha256);
 for(const tool of healthTools.filter(t=>t.articleSlug!=="gout")){let html=renderToStaticMarkup(createElement(HealthToolPage,{tool}));const previous=original.articles.find((a:{slug:string})=>a.slug===tool.articleSlug);if(previous){const current=healthArticles[tool.articleSlug].title;assert.equal(html.split(current).length-1,2,"Only breadcrumb and back-link label update");html=html.replaceAll(current,previous.title);}assert.equal(digest(html),baseline.toolHtml[tool.slug],tool.slug);}
});
test("gout separates opposing assumptions and provides two-purpose questions and actual facts",()=>{
 const a=healthArticles.gout,t=plain(render("gout"));
 for(const term of ["높으니 무조건 통풍이다","높지 않으니 통풍이 아니다","검사 시점","혈액 속 요산","당일 신속히","열이 나거나 모든 증상이 함께","이번 관절 변화에 관해","이후 관리에 관해","현재 복용하는 것","실제 음주·식사 변화","수분 제한 안내 여부","확인 필요"])assert.ok(t.includes(term),term);
 assert.equal(a.sections[3].table?.columns.length,2);assert.equal(a.sections[6].table?.rows.length,3);assert.doesNotMatch(t,/\d+\s*(mg\/dL|리터|mL|mg\s*복용)/i);
});
test("gout emergency actions stay distinct and original diagnosis/treatment and visual evidence survive",()=>{
 const a=healthArticles.gout,w=a.sections[2];assert.equal(w.tone,"warning");assert.deepEqual(w.sourceIds,original.articles[0].sections[2].sourceIds);assert.ok(w.bullets?.[0].includes("즉시 119"));assert.ok(w.bullets?.[1].includes("열이 나거나 모든 증상"));assert.ok(w.bullets?.[2].includes("요산 수치로 감염을 배제하지"));const tool=healthTools.find(t=>t.articleSlug==="gout")!,toolText=plain(renderToStaticMarkup(createElement(HealthToolPage,{tool})));for(const bullet of w.bullets!)assert.ok(toolText.includes(bullet),"Inherited tool warning must display every action");
 assert.deepEqual(a.sections[4],original.articles[0].sections[3]);assert.deepEqual(a.sections[5],original.articles[0].sections[4]);assert.deepEqual(a.visuals,original.articles[0].visuals);assert.deepEqual(a.toolSlugs,original.articles[0].toolSlugs);
});
test("adult UTI keeps original urgent and antibiotic boundaries and pairs tests with follow-up contact",()=>{
 const a=healthArticles["urinary-tract-infection"],t=plain(render("urinary-tract-infection"));assert.deepEqual(a.sections[0],original.articles[1].sections[0]);assert.deepEqual(a.sections[5],original.articles[1].sections[4]);
 for(const term of ["가상 상황","실제 재발·치료 성공·약 부작용 사례가 아닌","성인의 세균성","이 글에서 다루는 세균성 방광염","소아의 판단 기준","남은 약은 사용하지","65세 이상","임신 가능성","도뇨관","면역저하","결과를 언제 어떤 방법","연락이 없거나 악화하면 어디로"])assert.ok(t.includes(term),term);
 assert.equal(a.sections[4].table?.rows.length,3);assert.doesNotMatch(t,/\d+\s*(mg|일간\s*복용|시간\s*기다)/i);assert.deepEqual(a.visuals,original.articles[1].visuals);
});
test("HbA1c fictional pair matches NGSP conversion rounding without importing old targets or diagnosis",async()=>{
 const g=getHealthSupportGuide("understanding-hba1c")!,t=plain(renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})})));
 assert.deepEqual(g.sections[0].table?.rows,[["HbA1c (NGSP)","6.0 %"],["HbA1c (IFCC)","42 mmol/mol"]]);assert.equal((0.09148*42+2.152).toFixed(1),"6.0");
 for(const term of ["학습용 가상 검사표","실제 환자의 검사 결과가 아니며","정상 범위·진단 예시·개인 목표값이 아닙니다","5.99416%","결과지의 수치를 직접 고치거나","2018년 4월","2026년 6월 23일","페이지 자체 업데이트일이 표시되지","원문 검토·표시일","접속 확인일과 원문 검토일","빈혈이 결과를 같은 방향","면허 의료인의 검수를 받지 않았습니다"])assert.ok(t.includes(term),term);
 assert.deepEqual(g.sources,original.guide.sources);assert.doesNotMatch(t,/6\.5\s*%|4\s*[~～–-]\s*6\s*%|정상\s*기준\s*6\.0|\d+\s*mg\s*복용/);assert.equal(g.sections[4].bullets,undefined);
});
test("reader display and structured Article metadata align for both disease pages and the guide",async()=>{
 for(const slug of selected){const a=healthArticles[slug],html=render(slug),t=plain(html),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);assert.equal(a.faq.length,0);assert.equal(a.sourceCheckedAt,"2026-10-01");assert.equal(ld.headline,a.title);assert.equal(ld.description,a.description);assert.equal(ld.dateModified,a.updatedAt);assert.ok(t.includes("면허 의료인의 검수를 받지 않았습니다"));assert.doesNotMatch(t,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim/);for(const id of a.sections.flatMap(s=>s.sourceIds??[])){const src=healthSources.find(s=>s.id===id)!;assert.ok(a.sourceIds.includes(id),id);assert.ok(html.includes('href="'+src.url.replace(/&/g,"&amp;")+'"'),id);}}
 const g=getHealthSupportGuide("understanding-hba1c")!,html=renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})})),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);assert.equal(g.faq?.length,0);assert.equal(ld.headline,g.title);assert.equal(ld.description,g.description);assert.equal(ld.dateModified,"2026-10-01");assert.doesNotMatch(plain(html),/SRC-|OFFICIAL_SOURCE_CHECKED/);
});
