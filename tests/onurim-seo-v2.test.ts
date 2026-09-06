import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { healthArticles, healthTools, trustPages } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";

test("SEO audit refuses colliding output paths before HTTP or file writes", () => {
  const run = spawnSync(process.execPath, ["--import", "tsx", "scripts/audit-onurim-seo.ts", "--out", "invalid-output"], { encoding: "utf8" });
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /--out must end in \.json/);
});

test("SEO baseline joins exactly the 77 current routes without losing unknown URL verdicts", () => {
  const raw = JSON.parse(readFileSync("docs/health-v3/onurim/seo-v2/raw/gsc-url-inspections-2026-09-06.json", "utf8"));
  const expected = ["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`), ...trustPages.map(s=>`/health/trust/${s.slug}`)].sort();
  const rows = raw.rows as string[][];
  assert.deepEqual(rows.map(r=>r[0]).sort(), expected);
  assert.equal(rows.filter(r=>r[1]==="I").length, 38);
  assert.equal(rows.filter(r=>r[1]==="D").length, 34);
  assert.equal(rows.filter(r=>r[1]==="U").length, 5);
  assert.match(raw.sharedObservedFields.U.verdict, /아직 알려지지 않은/);
});

test("HbA1c has its own intent, accessible comparison data and resolvable source references", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="understanding-hba1c")!;
  assert.match(guide.seoTitle!, /NGSP·IFCC/);
  assert.notEqual(guide.seoTitle, guide.title);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 3);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  assert.ok(table.rows.some(row=>row.includes("mmol/mol")));
  assert.ok(table.rows.some(row=>row.includes("mg/dL 또는 mmol/L")));
  assert.equal(guide.faq?.length, 5);
  const sourceIds = new Set(guide.sources.map(s=>s.id));
  for (const item of [...guide.sections, ...guide.faq!]) {
    for (const id of item.sourceIds ?? []) assert.ok(sourceIds.has(id), id);
  }
  assert.equal(guide.publishedAt, "2026-08-26");
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.equal(guide.sourceCheckedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
  assert.doesNotMatch(JSON.stringify(guide), /6\.5|5\.7|reviewedBy|의료 검수 완료/);
});

test("new support schema does not fabricate a physician or FAQ rich result", () => {
  const source = readFileSync("app/health/guides/[slug]/page.tsx", "utf8");
  assert.doesNotMatch(source, /"Physician"|"MedicalOrganization"|reviewedBy|FAQPage/);
  assert.match(source, /datePublished: guide\.publishedAt/);
  assert.match(source, /dateModified: guide\.updatedAt/);
  assert.match(source, /면허 의료인 검수 미완료/);
  assert.match(readFileSync("components/health/HealthComparisonTable.tsx", "utf8"), /role="table"/);
});

test("hypertension preserves review provenance and maps new comparison content to actual sources", () => {
  const article = healthArticles.hypertension;
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.publishedAt, "2026-08-26");
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.ok(article.sections.every(s=>s.imageId !== undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.match(JSON.stringify(article), /백의 고혈압/);
  assert.match(JSON.stringify(article), /가면 고혈압/);
  assert.doesNotMatch(article.eyebrow, /비공개|파일럿|Preview/);
  assert.match(JSON.stringify(article), /재측정하며 기다리지 말고 119/);
});

test("legacy health Preview styling no longer hides public global navigation", () => {
  const css = readFileSync("app/globals.css", "utf8");
  assert.doesNotMatch(css, /body:has\(\.onurim-app\)\s*>\s*(header|footer)/);
});

test("type 2 diabetes separates laboratory roles, low glucose and emergency help without overriding a prescribed plan", () => {
  const article = healthArticles["type-2-diabetes"];
  assert.equal(article.faq.length, 6);
  assert.ok(article.sections[0].table);
  assert.equal(article.updatedAt, "2026-09-06");
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.match(JSON.stringify(urgent), /어느 하나라도/);
  assert.match(JSON.stringify(urgent), /안전하게 삼킬 수 없는/);
  assert.ok(urgent.sourceIds!.includes("SRC-NHS-LOW-GLUCOSE"));
  assert.match(JSON.stringify(article), /미리 정해 준 조절 계획/);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
});

test("rhinitis separates allergy causes, test interpretation and spray roles", () => {
  const article = healthArticles["allergic-rhinitis"];
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.doesNotMatch(article.eyebrow, /Preview|비공개/);
  assert.match(JSON.stringify(article), /양성인 물질이 모두/);
  assert.match(JSON.stringify(article), /끓인 뒤 식힌 물/);
  assert.match(article.seoTitle!, /감기 차이/);
});

test("GERD separates terms and timing without waiting for severe cardiac pain", () => {
  const article = healthArticles["gastroesophageal-reflux-disease"];
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.sections[0].tone, "warning");
  assert.match(JSON.stringify(article.sections[0]), /가볍거나 오르내릴/);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.doesNotMatch(article.eyebrow, /Preview|비공개/);
  assert.match(JSON.stringify(article), /식도 점막/);
  assert.match(readFileSync("app/health/onurim.module.css", "utf8"), /onurim-article-hero > \*\) \{ min-width: 0; \}/);
});

test("osteoarthritis starts with function and separates acute joint changes from usual activity planning", () => {
  const article = healthArticles.osteoarthritis;
  assert.equal(article.faq.length, 6);
  assert.ok(article.sections[0].table?.rows.some(row=>row[0]==="손가락·엄지"));
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.ok(urgent.sourceIds!.includes("SRC-NHS-SEPTIC-ARTHRITIS"));
  assert.match(JSON.stringify(urgent), /당일 신속히/);
  assert.match(JSON.stringify(urgent), /열이 날 때까지 기다리는 기준이 아닙니다/);
  assert.doesNotMatch(article.eyebrow, /Preview|비공개/);
});

test("article source count badges count distinct sources instead of claim IDs", () => {
  const component = readFileSync("components/health/HealthArticle.tsx", "utf8");
  assert.match(component, /new Set\(sourceIds \?\? healthClaims/);
  assert.match(component, /sourceIds=\{section\.sourceIds\}/);
  assert.match(component, /sourceIds=\{item\.sourceIds\}/);
  assert.doesNotMatch(component, /출처 연결 \{ids\.length\}/);
});

test("osteoporosis distinguishes test roles and escalates a fall even without impaired consciousness", () => {
  const article = healthArticles.osteoporosis;
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.ok(urgent.sourceIds!.includes("SRC-NHS-HIP-FRACTURE"));
  assert.match(JSON.stringify(urgent), /의식이 흐려질 때까지 기다리지/);
  assert.match(JSON.stringify(urgent), /직접 운전하지/);
  assert.match(JSON.stringify(article), /혈중 칼슘/);
  assert.match(JSON.stringify(article), /50세 미만 남성/);
  assert.doesNotMatch(JSON.stringify(article), /-2\.5|-2\.0|FRAX/);
});

test("SEO citation counts include declared professional-society sources without a quality inference", () => {
  const audit = readFileSync("scripts/audit-onurim-seo.ts", "utf8");
  assert.match(audit, /\.onurim-source-list a\[href\]/);
  assert.match(audit, /dom\.sourceUrls\.length \? dom\.sourceUrls/);
  assert.match(audit, /DECLARED_SOURCE_BLOCK_NOT_QUALITY_VERDICT/);
});

test("sleep apnea separates family observations and medical testing without device prescriptions", () => {
  const article = healthArticles["sleep-apnea"];
  assert.equal(article.archetype, "FAMILY_SITUATION");
  assert.equal(article.sections.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.faq.length, 6);
  assert.equal(article.updatedAt, "2026-09-06");
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  const text = JSON.stringify(article);
  assert.match(text, /음성·불확정/);
  assert.match(text, /이 성인 검사 안내를 아이에게 그대로 적용하지 않습니다/);
  assert.match(text, /일정한 공기 압력/);
  assert.match(text, /정상 호흡이 없는 경우에는 119 안내에 따라 심폐소생술/);
  assert.match(text, /간헐적으로 불규칙하게 헐떡이는 것은 정상 호흡으로 보지 않습니다/);
  assert.match(text, /수면다원검사가 권고되므로/);
  assert.match(text, /복부 불편·팽만이 생기면 양압기 사용을 중단하고 의료진에게 연락합니다/);
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.ok(urgent.paragraphs);
  assert.match(urgent.paragraphs[0], /^깨워도 반응이 없거나/);
  assert.ok(urgent.sourceIds?.includes("SRC-SJA-RECOVERY"));
  assert.doesNotMatch(text, /AHI\s*[>=]|\d+\s*(cmH2O|회\/시간|초 이상)|양압기 압력을 \d/);
  assert.ok(article.visuals?.["osa-concept"].caption.includes("아래쪽 후두와 기관은 생략"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("asthma explains airway narrowing and reads an existing plan without creating inhaler dosing rules", () => {
  const article = healthArticles.asthma;
  assert.equal(article.archetype, "SIMPLE_ANALOGY");
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const text = JSON.stringify(article);
  assert.match(text, /한 흡입기가/);
  assert.match(text, /새 계획을 만드는 표가 아닙니다/);
  assert.match(text, /처방된 약으로 증상이 완화되지 않거나/);
  assert.match(text, /색 변화까지 나타나야 하는 조건이 아닙니다/);
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.ok(urgent.paragraphs);
  assert.match(urgent.paragraphs[0], /매우 어렵거나, 헐떡이거나, 말을 내기 힘들면/);
  assert.match(urgent.paragraphs[1], /창백해지거나 파랗게 또는 회색빛/);
  assert.equal(urgent.bullets, undefined);
  assert.match(text, /안정된 때/);
  assert.doesNotMatch(text, /\d+\s*(puff|회씩|번씩|분마다|mg)|SABA|MART|AIR/);
  assert.ok(article.visuals?.["ast-action"].caption.includes("검수자 사진이 아닌"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("IBS records either direction of pain change and does not normalize new bleeding or lifelong food restrictions", () => {
  const article = healthArticles["irritable-bowel-syndrome"];
  assert.equal(article.archetype, "BODY_SIGNAL");
  assert.equal(article.sections.length, 6);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const text = JSON.stringify(article);
  assert.match(text, /덜 아팠다 \/ 더 아팠다 \/ 비슷했다/);
  assert.match(text, /음식을 다시 넣는 과정/);
  assert.match(text, /모두에게 대장내시경이 필수라는 뜻도/);
  assert.match(text, /갑자기 시작된 복통 또는 심한 복통/);
  assert.match(text, /체중 감소 중 하나라도/);
  assert.match(text, /마음먹기에 달렸다/);
  assert.doesNotMatch(text, /몇 개 이상이면|일주일에 \d|\d+개월|\d+\s*(g|mg|그램)/);
  assert.ok(article.visuals?.["ibs-concept"].caption.includes("실제 신경"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("MASLD separates enzyme, fat and fibrosis questions without self-diagnosis or unsupervised withdrawal", () => {
  const article = healthArticles["metabolic-dysfunction-associated-steatotic-liver-disease"];
  assert.equal(article.archetype, "QUESTION_FIRST");
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const text = JSON.stringify(article);
  assert.match(text, /일반 초음파와 역할이 다릅니다/);
  assert.match(text, /모두가 정밀검사를 받아야/);
  assert.match(text, /먼저 의료 도움을/);
  assert.match(text, /토한 뒤 멈췄고 다른 증상이 없어도/);
  assert.doesNotMatch(text, /승인된 약이 없|\d+\s*(kg|㎏|kcal|%|U\/L|g\/일)/);
  assert.ok(article.visuals?.["masld-concept"].src.endsWith("concept-v2.webp"));
  assert.ok(article.visuals?.["masld-action"].caption.includes("AI 생성"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("obesity uses consent-first family support and separates body measures from sudden fluid-related change", () => {
  const article = healthArticles.obesity;
  assert.equal(article.archetype, "FAMILY_SITUATION");
  assert.match(article.sections[0].title, /가족/);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.ok(urgent.sourceIds!.includes("SRC-MEDLINEPLUS-LEG-SWELLING"));
  assert.match(JSON.stringify(urgent), /수분이 몸에 쌓이는/);
  assert.match(JSON.stringify(urgent), /즉시 119/);
  assert.match(JSON.stringify(article), /혼자 중단하거나/);
  assert.doesNotMatch(JSON.stringify(article), /\d+\s*(kg|㎏|kcal|%|분 운동|시간 수면)/);
  assert.ok(article.visuals?.["obs-concept"].src.endsWith("concept-v2.webp"));
  assert.ok(article.visuals?.["obs-action"].src.endsWith("action-v2.webp"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("dyslipidemia distinguishes lipid roles and preparation without a universal fasting or treatment target", () => {
  const article = healthArticles.dyslipidemia;
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.match(JSON.stringify(article), /모든 비금식 검사를 무효/);
  assert.match(JSON.stringify(article), /아주 심해질 때까지 기다리지/);
  assert.doesNotMatch(JSON.stringify(article), /\d+\s*(mg\/dL|시간 금식)/);
  assert.ok(article.visuals?.["dlp-concept"].src.endsWith("concept-v2.webp"));
  assert.ok(article.visuals?.["dlp-action"].src.endsWith("action-v2.webp"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});
