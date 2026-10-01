import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {createElement} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import test from "node:test";
import {HealthArticlePage} from "../components/health/HealthArticle";
import {healthArticles,healthClaims,healthSources,healthTools} from "../lib/health-v3/content";
import {healthSupportGuides,getHealthSupportGuide} from "../lib/health-v3/support-guides";
import GuidePage,{generateMetadata} from "../app/health/guides/[slug]/page";
import HypertensionPage from "../app/health/hypertension/page";
import {metadata as oaMetadata} from "../app/health/osteoarthritis/page";
import {metadata as opMetadata} from "../app/health/osteoporosis/page";

const baseline=JSON.parse(readFileSync("tests/fixtures/health-individual-reader-baseline.json","utf8"));
const original=JSON.parse(readFileSync("tests/fixtures/health-individual-reader-original.json","utf8"));
const digest=(value:unknown)=>createHash("sha256").update(typeof value==="string"?value:JSON.stringify(value)).digest("hex");
const strip=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"");
const render=(slug:keyof typeof healthArticles)=>renderToStaticMarkup(createElement(HealthArticlePage,{article:healthArticles[slug]}));

test("earlier scoped revisions preserve unchanged bodies, original claims, sources and every tool",async()=>{
 for(const a of Object.values(healthArticles).filter(a=>!["osteoarthritis","osteoporosis","asthma", "stroke", "acute-myocardial-infarction", "dyslipidemia", "obesity", "migraine", "metabolic-dysfunction-associated-steatotic-liver-disease", "irritable-bowel-syndrome", "sleep-apnea", "gout", "urinary-tract-infection"].includes(a.slug))){assert.equal(digest(a),baseline.articleData[a.slug],a.slug);const html=a.slug==="hypertension"?renderToStaticMarkup(createElement(HypertensionPage)):render(a.slug);assert.equal(digest(html),baseline.articleHtml[a.slug],a.slug);}
 for(const g of healthSupportGuides.filter(g=>g.slug!=="measuring-blood-pressure"&&g.slug!=="understanding-hba1c")){assert.equal(digest(g),baseline.guideData[g.slug],g.slug);assert.equal(digest(renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:g.slug})}))),baseline.guideHtml[g.slug],g.slug);}
 assert.equal(digest(healthClaims),baseline.claimRegistrySha256);assert.equal(healthClaims.length,144);
 assert.deepEqual(healthSources,baseline.originalSources);assert.equal(digest(healthTools),baseline.toolsSha256);
});

test("blood-pressure guide completes a single session with two fictional original readings",async()=>{
 const guide=getHealthSupportGuide("measuring-blood-pressure")!,html=renderToStaticMarkup(await GuidePage({params:Promise.resolve({slug:guide.slug})})),text=strip(html);
 assert.equal(guide.faq?.length,0);assert.equal(guide.updatedAt,"2026-10-01");
 for(const term of ["가상 작성 예시","실제 환자의 기록도","정상 판정이나 개인 목표값도 아닙니다","1분 간격","두 결과 모두","146/89","141/87","07:00","07:01","mmHg","화면 입력 저장 없음","정기 진료를 대신하지"])assert.ok(text.includes(term),term);
 const sample=guide.sections.find(s=>s.table?.caption.includes("가상 작성"))!;assert.equal(sample.table?.rows.length,2);
 assert.ok(html.includes('href="/health/tools/blood-pressure-log"'));assert.ok(html.includes('href="/health/hypertension"'));assert.ok(html.includes('href="https://www.heart.org/-/media/Files/Health-Topics/High-Blood-Pressure/How_to_Measure_Your_Blood_Pressure_Letter_Size.pdf"'));
 assert.doesNotMatch(text,/SUP-|SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|제가 재보니|제 가족/);
 assert.equal((await generateMetadata({params:Promise.resolve({slug:guide.slug})})).description,guide.description);
});

test("blood-pressure symptoms and repeated very high readings lead to different immediate actions",()=>{
 const g=getHealthSupportGuide("measuring-blood-pressure")!,urgent=g.sections[0],high=g.sections.find(s=>s.id==="very-high-without-symptoms")!;
 const emergency=urgent.paragraphs!.join(" "),repeat=high.paragraphs!.join(" ");
 for(const term of ["심한 통증이 될 때까지 기다리지","즉시 119","직접 운전하지","수치가 낮아"])assert.ok(emergency.includes(term),term);
 for(const term of ["증상이 없더라도","며칠 더 모으거나 정기진료까지 기다리지","즉시 의료진","비임신 성인","임신·소아","개별 의료진"])assert.ok(repeat.includes(term),term);
 assert.doesNotMatch(emergency+repeat,/180|120|새 목표|약을 늘리세요/);
 assert.ok(high.sourceIds?.includes("SUP-AHA-BP-URGENT"));assert.ok(high.links?.some(l=>l.href==="/health/hypertension#urgent-action"));
});

test("osteoarthritis translates a fictional activity and reaction rather than prescribing an exercise quota",()=>{
 const a=healthArticles.osteoarthritis,text=strip(render(a.slug));
 for(const term of ["가상 장면","실제 작성자·가족·환자의 경험","계단","미확인","다음날","가상 기록","권장 운동량·시간이나 허용 통증 기준이 아닙니다","7분","병뚜껑","원하는 범위"])assert.ok(text.includes(term),term);
 assert.deepEqual(a.sections.find(s=>s.tone==="warning"),original.articles[0].sections.find((s:{tone?:string})=>s.tone==="warning"));
 assert.deepEqual(a.toolSlugs,["oa-daily-activity-log"]);assert.equal(a.faq.length,0);assert.equal(oaMetadata.description,a.description);
 assert.doesNotMatch(text,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim|근거 출처 \d|\d+\s*만\s*보|통증 \d점/);
});

test("osteoporosis compares test purposes and source conditions without inferring a diagnosis or treatment effect",()=>{
 const a=healthArticles.osteoporosis,text=strip(render(a.slug));
 assert.ok(a.sections[0].table?.rows[0][0].includes("혈액검사"));assert.ok(a.sections[0].table?.rows[1][0].includes("DXA"));
 for(const term of ["정상 혈중 칼슘만으로","가상 결과지","개인 숫자를 해석하는 예가 아닙니다","날짜·기관·측정부위","교차 보정되지 않은","작은 수치 차이가 곧 치료 효과나 악화를 뜻하지","장비명 미확인","화면 입력 저장 기능도 없습니다","더 읽기"])assert.ok(text.includes(term),term);
 assert.deepEqual(a.sections.find(s=>s.tone==="warning"),original.articles[1].sections.find((s:{tone?:string})=>s.tone==="warning"));
 assert.equal(opMetadata.description,a.description);assert.equal(a.faq.length,0);assert.ok(!a.sourceIds.includes("SRC-NIAMS-BONE-HEALTH"));
 assert.ok(text.includes("용어 카드와 집안 점검표는 다른 일을"));assert.doesNotMatch(text,/SRC-|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED|기존 claim|근거 출처 \d|T점수.*-2\.5/);
});

test("source anchors and structured metadata remain complete and non-medical-review status stays honest",async()=>{
 for(const slug of ["osteoarthritis","osteoporosis"] as const){const a=healthArticles[slug],html=render(slug),ld=JSON.parse([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)][0][1]);assert.equal(ld.headline,a.title);assert.equal(ld.dateModified,"2026-10-01");assert.equal(a.sourceCheckedAt,"2026-10-01");assert.ok(strip(html).includes("면허 의료인의 검수를 받지 않았습니다"));for(const id of a.sections.flatMap(s=>s.sourceIds??[])){assert.ok(a.sourceIds.includes(id),id);assert.ok(html.includes('id="source-'+id+'"'),id);}}
 const g=getHealthSupportGuide("measuring-blood-pressure")!;for(const id of g.sections.flatMap(s=>s.sourceIds??[]))assert.ok(g.sources.some(s=>s.id===id),id);
});
