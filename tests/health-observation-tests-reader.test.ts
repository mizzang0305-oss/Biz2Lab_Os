import assert from "node:assert/strict";import {createHash} from "node:crypto";import {readFileSync} from "node:fs";import {createElement} from "react";import {renderToStaticMarkup} from "react-dom/server";import test from "node:test";
import {HealthArticlePage} from "../components/health/HealthArticle";import {HealthToolPage} from "../components/health/HealthToolPage";
import {healthArticles,healthClaims,healthSources,healthTools} from "../lib/health-v3/content";import {healthSupportGuides} from "../lib/health-v3/support-guides";
import GuidePage from "../app/health/guides/[slug]/page";import HypertensionPage from "../app/health/hypertension/page";
const baseline=JSON.parse(readFileSync("tests/fixtures/health-observation-tests-baseline.json","utf8")),original=JSON.parse(readFileSync("tests/fixtures/health-observation-tests-original.json","utf8")),toolBaseline=JSON.parse(readFileSync("tests/fixtures/health-observation-tools-before-notice.json","utf8"));
const selected=["metabolic-dysfunction-associated-steatotic-liver-disease","irritable-bowel-syndrome","sleep-apnea"] as const;
const digest=(v:unknown)=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const render=(slug:typeof selected[number])=>renderToStaticMarkup(createElement(HealthArticlePage,{article:healthArticles[slug]}));
const plain=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"");
test("observation batch preserves other 26 articles, 9 guides, 144 claims, 170 source records and tool data",async()=>{
 for(const a of Object.values(healthArticles).filter(a=>![...selected, "gout", "urinary-tract-infection"].includes(a.slug))){assert.equal(digest(a),baseline.articleData[a.slug],a.slug);assert.equal(digest(renderToStaticMarkup(a.slug==="hypertension"?createElement(HypertensionPage):createElement(HealthArticlePage,{article:a}))),baseline.articleHtml[a.slug],a.slug);}
 for(const g of healthSupportGuides.filter(g=>!["reading-health-results","symptom-journal","appointment-questions"].includes(g.slug)&&g.slug!=="understanding-hba1c")){assert.equal(digest(g),baseline.guideData[g.slug],g.slug);assert.equal(digest(renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})}))),baseline.guideHtml[g.slug],g.slug);}
 assert.equal(digest(healthClaims),baseline.claimRegistrySha256);assert.equal(healthClaims.length,144);assert.deepEqual(healthSources,baseline.originalSources);assert.equal(healthSources.length,170);assert.equal(digest(healthTools),baseline.toolsSha256);
});
test("warning sections stay first; IBS and apnea warnings remain intact",()=>{
 for(const [i,slug] of selected.entries()){const a=healthArticles[slug];assert.equal(a.sections[0].tone,"warning");if(i>0)assert.deepEqual(a.sections[0],original.articles[i].sections.find((s:{tone?:string})=>s.tone==="warning"));}
});
test("MASLD uses fictional result wording, precise PDF location and separated bleeding responses",()=>{
 const a=healthArticles[selected[0]],t=plain(render(selected[0]));
 for(const term of ["가상 결과표 두 장","실제 환자의 결과","참고범위 안이어도","섬유화 정도를 확정하지","인쇄 496쪽/PDF 5쪽","결과지를 분실","고쳐 쓰지 말고 원문 그대로","빠르거나 얕은 호흡","창백한 피부와 식은땀","토혈이 멈췄고 다른 증상이 없어도 당일","계속 토하고 있다면 멈추기를 기다리지","직접 운전"])assert.ok(t.includes(term),term);
 assert.ok(a.sections[1].links?.some(l=>l.href.endsWith('MASLD.pdf#page=5')));
 assert.equal(a.sections[2].table?.columns.length,3);assert.doesNotMatch(t,/\d+\s*(U\/L|kPa|mg|kg|%)/i);
 const tool=healthTools.find(t=>t.articleSlug===a.slug)!;const html=renderToStaticMarkup(createElement(HealthToolPage,{tool}));
 for(const term of ["빠르거나 얕은 호흡","복통·검은 변 중 하나라도","토혈이 멈추고 다른 증상이 없어도 당일","계속 토한다면 멈추기를 기다리지"])assert.ok(plain(html).includes(term),term);
 const subsequent=JSON.parse(readFileSync("tests/fixtures/health-results-questions-original.json","utf8"));for(const other of healthTools.filter(t=>t.slug!==tool.slug&&t.articleSlug!=="gout")){let rendered=renderToStaticMarkup(createElement(HealthToolPage,{tool:other}));const prior=subsequent.articles.find((a:{slug:string})=>a.slug===other.articleSlug);if(prior)rendered=rendered.replaceAll(healthArticles[other.articleSlug].title,prior.title);assert.equal(digest(rendered),toolBaseline.toolHtml[other.slug],other.slug);}
});
test("IBS fictional observation and speculation do not identify food cause or prescribe restrictions",()=>{
 const a=healthArticles[selected[1]],t=plain(render(selected[1]));assert.equal(a.sections[1].table?.rows.length,2);
 for(const term of ["가상 하루 기록","실제 환자·지인의 경험","변을 본 뒤에는 더 아팠다","아직 확인되지 않은 추측","원인으로 확정하지","덜 아팠다·더 아팠다·비슷했다·잘 모르겠다","왜 시도하나요","무엇으로 효과를 보나요","어떻게 다시 넣나요","공식 근거를 다시 대조","개인의 진단·식단·약 처방을 추가하지"])assert.ok(t.includes(term),term);
 assert.doesNotMatch(t,/\d+\s*(주간|주\s*제한|g\s*늘|그램|mg)/i);
});
test("apnea uses optional fictional observations and one exact PAP stop/contact notice",()=>{
 const a=healthArticles[selected[2]],t=plain(render(selected[2]));assert.equal(a.sections[1].table?.rows.length,2);
 for(const term of ["선택적인 가상 메모 두 줄","실제 배우자·친구·환자 사례","밤 관찰 없음","진료를 미루거나","두 사람이 있어야 하는 기록이 아닙니다","2017 AASM 성인 진단 권고 3","PDF 첫 페이지","일반 앱의 결과가 아니라","재개 시점과 압력·장치 조정","압력을 혼자 바꾸지"])assert.ok(t.includes(term),term);
 assert.equal(t.split("양압기 사용을 중단하고 의료진에게 연락합니다").length-1,1);
 assert.ok(a.sections.some(s=>s.links?.some(l=>l.href.endsWith('diagnostic-testing-osa.pdf#page=1'))));assert.doesNotMatch(t,/\d+\s*(cmH|mmHg|%\s*(이하|미만|이상))/i);
});
test("three reader displays preserve honest status, direct sources and aligned Article metadata",()=>{
 for(const slug of selected){const a=healthArticles[slug],html=render(slug),t=plain(html),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);assert.equal(a.faq.length,0);assert.equal(a.sourceCheckedAt,"2026-10-01");assert.equal(ld.headline,a.title);assert.equal(ld.description,a.description);assert.equal(ld.dateModified,a.updatedAt);assert.ok(t.includes("면허 의료인의 검수를 받지 않았습니다"));assert.doesNotMatch(t,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim/);for(const id of a.sections.flatMap(s=>s.sourceIds??[])){const src=healthSources.find(s=>s.id===id)!;assert.ok(a.sourceIds.includes(id),id);assert.ok(html.includes('href="'+src.url.replace(/&/g,"&amp;")+'"'),id);}}
});
