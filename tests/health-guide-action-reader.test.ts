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
const baseline=JSON.parse(readFileSync("tests/fixtures/health-guide-action-baseline.json","utf8"));
const original=JSON.parse(readFileSync("tests/fixtures/health-guide-action-original.json","utf8"));
const selected=["reading-health-results","symptom-journal","appointment-questions"];
const digest=(v:unknown)=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const plain=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"");
const render=async(slug:string)=>renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug})}));
test("guide action batch preserves all20 disease, other6 guide,144 claims,170 source records and34 existing tools",async()=>{
 for(const a of Object.values(healthArticles)){assert.equal(digest(a),baseline.articleData[a.slug],a.slug);assert.equal(digest(renderToStaticMarkup(a.slug==="hypertension"?createElement(HypertensionPage):createElement(HealthArticlePage,{article:a}))),baseline.articleHtml[a.slug],a.slug);}
 for(const g of healthSupportGuides.filter(g=>Object.hasOwn(baseline.guideData, g.slug)&&!selected.includes(g.slug))){assert.equal(digest(g),baseline.guideData[g.slug],g.slug);assert.equal(digest(await render(g.slug)),baseline.guideHtml[g.slug],g.slug);}
 assert.equal(healthClaims.length,144);assert.equal(digest(healthClaims),baseline.claimRegistrySha256);assert.equal(healthSources.length,170);assert.deepEqual(healthSources,baseline.originalSources);assert.equal(digest(healthTools),baseline.toolsSha256);
 for(const t of healthTools)assert.equal(digest(renderToStaticMarkup(createElement(HealthToolPage,{tool:t}))),baseline.toolHtml[t.slug],t.slug);
});
test("results fragment teaches locations without diagnostic values and retains original interpretation/preparation limits",async()=>{
 const g=getHealthSupportGuide(selected[0])!,t=plain(await render(g.slug));assert.ok(g.title.includes("혈액·소변"));
 const fragment=g.sections.find(s=>s.id==="result-fragment")!;assert.equal(fragment.table?.rows.length,4);assert.doesNotMatch(JSON.stringify(fragment),/\d+(\.\d+)?\s*(mg|mmol|%)/);
 for(const term of ["실제 환자 결과","검사 항목 A","단위: 생략","시점·연락처 없음","검사 결과 읽기","검사 전 준비","결과상담","양성","위양성","위음성","임의로 굶거나 약을 끊지","범위를 벗어났다고 곧바로 질환이 확정되는 것도 아닙니다"])assert.ok(t.includes(term),term);
 assert.deepEqual(g.sources,original.guides[0].sources);
});
test("journal foregrounds fictional before/after without removing emergency, uncertainty, consent or medicine boundaries",async()=>{
 const g=getHealthSupportGuide(selected[1])!,t=plain(await render(g.slug));assert.deepEqual(g.sections[0],original.guides[1].sections[0]);assert.equal(g.sections[1].id,"journal-edit");assert.equal(g.sections[1].table?.rows.length,3);
 for(const term of ["가상 예시","실제 경험·환자 사례가 아니며","고치기 전","정확한 시작 시각은 기억나지","검증된 진단 척도","시각을 만들지","최소 기록 기간은 없습니다","본인이 말함","보호자 관찰","당사자가 원하는 도움","약을 더 먹거나 끊지","낮은 통증 점수"])assert.ok(t.includes(term),term);
 assert.deepEqual(g.sources,original.guides[1].sources);
});
test("appointment dialogue contains no invented medical answer and uses general five-field blank memo",async()=>{
 const g=getHealthSupportGuide(selected[2])!,t=plain(await render(g.slug));assert.deepEqual(g.sections.at(-1),original.guides[2].sections.at(-1));assert.equal(g.sections.find(s=>s.table?.caption.includes("다섯 칸"))?.table?.rows.length,5);
 for(const term of ["가상 예시","검사·치료 답변을 지어내지","실제 답은 진료기관에서 확인","그 개수까지만 해야 한다는 뜻은 아닙니다","2024년 11월","2024년 10월 5일","2023년 1월 12일","2026년 1월 12일","예정일이 지났다는 것만으로","2026년 10월 1일","화면 입력·저장·전송 기능은 없습니다"])assert.ok(t.includes(term),term);
 assert.deepEqual(g.sources,original.guides[2].sources);
});
test("printable memo is an empty general artifact, has no collection, and is linked by all three guides",()=>{
 const html=readFileSync("public/health/samples/appointment-action-blank.html","utf8");assert.equal((html.match(/<section /g)||[]).length,3);assert.equal((html.match(/<dd>&nbsp;<\/dd>/g)||[]).length,15);
 for(const term of ["onclick=\"window.print()\"","@media print","공식 표준 양식이 아닙니다","화면 입력·저장·전송 기능이 없는","면허 의료인의 검수를 받지 않았습니다"])assert.ok(html.includes(term),term);
 assert.doesNotMatch(html,/<form\b|<input\b|<textarea\b|fetch\(|XMLHttpRequest|localStorage|https?:\/\/|당뇨/i);
 for(const slug of selected)assert.ok(getHealthSupportGuide(slug)!.sections.some(s=>s.links?.some(l=>l.href==="/health/samples/appointment-action-blank.html")),slug);
});
test("selected guide visible dates, document names and Article metadata agree without internal status codes",async()=>{
 for(const slug of selected){const g=getHealthSupportGuide(slug)!,html=await render(slug),t=plain(html),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);assert.equal(g.faq?.length,0);assert.equal(g.updatedAt,"2026-10-01");assert.equal(g.sourceCheckedAt,"2026-10-01");assert.equal(ld.headline,g.title);assert.equal(ld.description,g.description);assert.equal(ld.dateModified,g.updatedAt);assert.ok(t.includes("면허 의료인 검수 미완료"));assert.ok(t.includes("원문 검토·표시일"));assert.doesNotMatch(t,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED/);
  for(const id of g.sections.flatMap(s=>s.sourceIds??[])){const source=g.sources.find(s=>s.id===id)!;assert.ok(source,id);assert.ok(html.includes('href="'+source.url.replace(/&/g,"&amp;")+'"'),id);}
 }
});
