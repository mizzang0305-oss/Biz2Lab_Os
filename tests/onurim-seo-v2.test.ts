import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { healthArticles, healthTools, trustPages } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";
import { getToolSafetyNotice, getToolSources, toolEditorial } from "../lib/health-v3/tool-editorial";
import { createMetadata } from "../lib/seo";
import sitemap from "../app/sitemap";

test("individually excluded utilities remain self-canonical noindex follow without altering legacy defaults", () => {
  const input = { title: "경고 카드", description: "인쇄용 안내", path: "/health/tools/blood-pressure-warning", noindex: true };
  assert.deepEqual(createMetadata(input).robots, { index: false, follow: false });
  const metadata = createMetadata({ ...input, follow: true });
  assert.deepEqual(metadata.robots, { index: false, follow: true });
  assert.equal(metadata.alternates?.canonical, "https://www.biz2lab.com/health/tools/blood-pressure-warning");
  const included = new Set(sitemap().map(entry => entry.url));
  for (const tool of healthTools) {
    assert.equal(included.has(`https://www.biz2lab.com/health/tools/${tool.slug}`), toolEditorial[tool.slug]?.indexDecision !== "NOINDEX_FOLLOW", tool.slug);
  }
  const warning = healthTools.find(t => t.slug === "blood-pressure-warning")!;
  assert.equal(warning.items, undefined);
  assert.equal(toolEditorial[warning.slug].indexDecision, "NOINDEX_FOLLOW");
  assert.match(toolEditorial[warning.slug].limitation, /심해질 때까지 기다리는 기준이 아니/);
});

test("diabetes terms stays a non-diagnostic reference without a fabricated fillable form", () => {
  const tool = healthTools.find(t => t.slug === "diabetes-test-terms")!;
  assert.equal(tool.kind, "guide");
  assert.equal(tool.fields, undefined);
  const copy = toolEditorial[tool.slug];
  assert.equal(copy.indexDecision, "NOINDEX_FOLLOW");
  assert.match(copy.limitation, /금식이나 약 중단을 새로 시작하지/);
  assert.match(copy.limitation, /같은 날 다른 검사/);
  assert.deepEqual(copy.sourceIds, ["SRC-NIDDK-TESTS", "SRC-NIDDK-A1C"]);
  assert.match(readFileSync("components/health/HealthToolPage.tsx", "utf8"), /입력·체크·저장 기능이 없는 인쇄용 참고 자료/);
});

test("tool sources resolve to documents and print safety remains visible", () => {
  for (const tool of healthTools) {
    const sources = getToolSources(tool);
    assert.ok(sources.length > 0, tool.slug);
    assert.ok(sources.every(s => /^https:\/\//.test(s.url)), tool.slug);
  }
  const renderer = readFileSync("components/health/HealthToolPage.tsx", "utf8");
  assert.match(renderer, /tool\.fields\.map/);
  assert.match(renderer, /href=\{source.url\}/);
  assert.match(renderer, /빈칸은 인쇄한 뒤 손으로/);
  assert.doesNotMatch(renderer, /<form|<textarea|type="text"/);
  const print = readFileSync("app/health/onurim.module.css", "utf8").split("@media print")[1];
  assert.match(print, /onurim-tool-footer\) \{ display: block !important/);
  assert.match(print, /attr\(href\)/);
  assert.match(print, /onurim-tool-footer p\) \{ margin: 0.25rem 0; font-size: 9pt/);
  const qa = readFileSync("scripts/qa-onurim-tool.ts", "utf8");
  assert.match(qa, /Checkbox keyboard reset failed/);
  assert.match(qa, /state.checkedItems !== 0/);
});

test("glucose log records real time and original units without prescribing a monitoring schedule", () => {
  const tool = healthTools.find(t => t.slug === "glucose-observation-log")!;
  assert.equal(tool.rows, 12);
  assert.equal(tool.columns?.length, 7);
  assert.match(tool.columns![0], /실제 측정시각/);
  assert.match(tool.columns![1], /표시값·단위/);
  const copy = toolEditorial[tool.slug];
  assert.match(copy.purpose, /12번.*권고가 아닙니다/);
  assert.match(copy.steps.join(" "), /기존 기기 안내·개인 대처 계획/);
  assert.match(copy.sheetNotice!, /119/);
  assert.match(copy.sheetNotice!, /억지로 먹이지/);
  assert.ok(copy.sourceIds.includes("SRC-NIDDK-MANAGING"));
  assert.doesNotMatch(JSON.stringify(tool), /mg\/dL|식후 2시간/);
});

test("reflux timing log inherits urgent help before instructions and does not prescribe a food experiment", () => {
  const tool = healthTools.find(t => t.slug === "gerd-symptom-timing-log")!;
  assert.equal(tool.rows, 12);
  assert.equal(tool.columns?.length, 7);
  assert.match(tool.columns![0], /증상 시작 시각/);
  const copy = toolEditorial[tool.slug];
  assert.equal(getToolSafetyNotice(tool), healthArticles[tool.articleSlug].sections[0]);
  assert.match(copy.steps.join(" "), /일부러 증상을 유발하지/);
  assert.match(copy.purpose, /12일을 채운 뒤.*뜻이 아닙니다/);
  assert.match(copy.sheetNotice!, /커피 찌꺼기.*바로 의료 도움/);
  assert.ok(getToolSources(tool).some(source => source.id === "SRC-NHLBI-HEART-ATTACK-SYMPTOMS"));
});

test("rhinitis questions connect existing products to individual instructions without blanket medicine withdrawal", () => {
  const tool = healthTools.find(t => t.slug === "allergy-appointment-questions")!;
  assert.equal(tool.fields?.length, 2);
  assert.equal(tool.items?.length, 4);
  const copy = toolEditorial[tool.slug];
  assert.match(copy.purpose, /성인이/);
  assert.match(copy.steps.join(" "), /모든 검사·약에 같은 중단 규칙을 적용하지/);
  assert.match(copy.steps.join(" "), /임의로 약을 끊지/);
  assert.match(copy.sheetNotice!, /즉시 119/);
  assert.ok(copy.sourceIds.includes("SRC-MEDLINEPLUS-ALLERGY-SKIN-TEST"));
  assert.doesNotMatch(JSON.stringify(copy), /[35]일|\d+\s*mg|검수 완료/);
});

test("rhinitis environment checklist is a noindex observation aid, not an exposure experiment or score", () => {
  const tool = healthTools.find(t => t.slug === "allergy-environment-check")!;
  assert.equal(tool.items?.length, 4);
  assert.equal(tool.fields?.length, 1);
  const copy = toolEditorial[tool.slug];
  assert.equal(copy.indexDecision, "NOINDEX_FOLLOW");
  assert.match(copy.steps.join(" "), /일부러 다시 노출되지/);
  assert.match(copy.limitation, /환경이나 가족을 평가하지/);
  assert.match(copy.limitation, /영향을 주거나 기존 치료/);
  assert.match(copy.sheetNotice!, /즉시 119/);
  assert.ok(copy.links.some(link => link.href.endsWith("/allergy-trigger-observation")));
});

test("rhinitis observation logs separate facts from suspected causes without intentional re-exposure", () => {
  const tool = healthTools.find(t => t.slug === "allergy-trigger-observation")!;
  assert.equal(tool.rows, 12);
  assert.equal(tool.columns?.length, 7);
  assert.match(tool.columns![0], /시작 시각/);
  assert.ok(tool.columns!.includes("이미 사용한 약·스프레이"));
  const copy = toolEditorial[tool.slug];
  assert.match(copy.purpose, /12일 관찰.*뜻이 아닙니다/);
  assert.match(copy.steps.join(" "), /일부러 다시 노출되지/);
  assert.match(copy.limitation, /천식.*신속히 연락/);
  assert.match(copy.limitation, /수면·일상에 영향을 주거나, 기존 치료/);
  assert.match(copy.sheetNotice!, /즉시 119/);
  assert.match(readFileSync("components/health/HealthToolPage.tsx", "utf8"), /화면 입력·체크·저장·제출 기능은 없습니다/);
});

test("each edited utility has distinct grounded metadata and existing contextual destinations", () => {
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s => `/health/${s}`),
    ...healthSupportGuides.map(g => `/health/guides/${g.slug}`), ...healthTools.map(t => `/health/tools/${t.slug}`), ...trustPages.map(t => `/health/trust/${t.slug}`)]);
  const copies = Object.entries(toolEditorial);
  assert.equal(new Set(copies.map(([, c]) => c.title)).size, copies.length);
  assert.equal(new Set(copies.map(([, c]) => c.description)).size, copies.length);
  for (const [slug, copy] of copies) {
    assert.ok(healthTools.some(t => t.slug === slug));
    assert.ok(copy.purpose && copy.steps.length && copy.example && copy.limitation && copy.sourceIds.length);
    assert.equal(new Set(copy.sourceIds).size, copy.sourceIds.length);
    assert.ok(copy.links.every(link => routes.has(link.href)), slug);
    assert.match(copy.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("blood pressure print rows preserve individual measurement values without prescribing seven days", () => {
  const tool = healthTools.find(t => t.slug === "blood-pressure-log")!;
  assert.equal(tool.rows, 14);
  assert.ok(tool.columns?.includes("회차"));
  assert.ok(tool.columns?.includes("수축기(mmHg)"));
  assert.ok(tool.columns?.includes("이완기(mmHg)"));
  assert.doesNotMatch(JSON.stringify(tool), /쉬기 전\/후/);
  const copy = toolEditorial[tool.slug];
  assert.match(copy.purpose, /7일 측정.*처방하는 기준이 아닙니다/);
  assert.match(copy.steps.join(" "), /1차·2차.*서로 다른 줄/);
  assert.match(copy.limitation, /기다리지 말고 119/);
  assert.ok(copy.links.every(l => l.href.startsWith("/health/")));
  assert.match(copy.limitation, /재측정 후에도.*며칠 동안 기록을 모으느라 기다리지/);
});

test("restored neurological and self-harm fields cannot appear without their existing sourced urgent notices", () => {
  for (const slug of ["migraine-visit-card", "depression-visit-card", "stroke-visit-card", "acute-myocardial-infarction-visit-card", "blood-pressure-warning"]) {
    const tool = healthTools.find(t => t.slug === slug)!;
    const notice = getToolSafetyNotice(tool)!;
    assert.ok(notice);
    assert.equal(notice, healthArticles[tool.articleSlug].sections.find(s => s.tone === "warning"));
    assert.match(JSON.stringify(notice), /119/);
    if (slug === "depression-visit-card") assert.match(JSON.stringify(notice), /109/);
    const sources = getToolSources(tool).map(s => s.id);
    assert.ok(notice.sourceIds?.every(id => sources.includes(id)));
  }
  assert.match(readFileSync("app/sitemap.ts", "utf8"), /toolEditorial\[tool.slug\]\?\.updatedAt/);
});

test("blood pressure preparation separates before-measurement checks from after-measurement facts", () => {
  const tool = healthTools.find(t => t.slug === "blood-pressure-prep")!;
  assert.equal(tool.items, undefined);
  assert.deepEqual(tool.itemGroups?.map(group => group.items.length), [5, 2]);
  assert.match(tool.itemGroups![0].title, /측정 전/);
  assert.match(tool.itemGroups![1].title, /측정 후/);
  assert.match(tool.itemGroups![0].items.join(" "), /최소 5분/);
  assert.match(toolEditorial[tool.slug].purpose, /보장하지/);
  assert.match(toolEditorial[tool.slug].steps.join(" "), /미리 모두 체크하지/);
});

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

test("danger signals puts independent emergency signs before paperwork and separates 109", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="danger-signals")!;
  assert.equal(guide.sections[0].id, "urgent-action");
  assert.equal(guide.sections[0].paragraphs?.length, 1);
  assert.match(guide.sections[0].paragraphs![0], /하나라도.*즉시 119/);
  assert.match(JSON.stringify(guide.sections[0].bullets), /감각.*어지럼/);
  assert.match(JSON.stringify(guide.sections[0].bullets), /깨우기 어려움.*쓰러졌는지와 무관/);
  assert.match(readFileSync("app/health/onurim.module.css", "utf8"), /onurim-support-page \.onurim-trust-sections \.onurim-tone-warning/);
  assert.match(JSON.stringify(guide), /심한 통증만 기다리지/);
  assert.match(JSON.stringify(guide), /109 상담은 당장 필요한 응급 구조를 대신하지/);
  assert.match(JSON.stringify(guide), /돕는 사람도 자신의 안전/);
  assert.match(JSON.stringify(guide), /신속히 의료기관에 연락해 평가/);
  assert.equal(guide.faq?.length, 5);
  assert.ok(guide.faqTitle && !guide.faqTitle.includes("검사표"));
  assert.equal(guide.sources.length, 7);
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const item of [...guide.sections, ...guide.faq!]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.match(table.caption, /사전 작성표가 아닙니다/);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
  assert.doesNotMatch(JSON.stringify(guide), /2분|300mg|988|999|7119|의료 검수 완료/);
});

test("home blood pressure guide separates measurement conditions from diagnosis and emergency waiting", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="measuring-blood-pressure")!;
  assert.equal(guide.sections.length, 6);
  assert.equal(guide.faq?.length, 5);
  assert.equal(guide.sections[0].id, "urgent-action");
  assert.match(JSON.stringify(guide.sections[0]), /다시 재며 기다리지 말고 즉시 119/);
  assert.match(JSON.stringify(guide.sections[0]), /한쪽 얼굴·팔·다리의 힘이나 감각이 달라지거나, 갑작스러운 말·시야 이상/);
  assert.match(JSON.stringify(guide), /30분.*최소 5분/);
  assert.match(JSON.stringify(guide), /1분 간격으로 두 번/);
  assert.match(JSON.stringify(guide), /두 결과를 모두 기록/);
  assert.match(JSON.stringify(guide), /모두에게 같은 일수나 복약 전후 순서를 일괄 적용하지/);
  assert.doesNotMatch(JSON.stringify(guide), /180\/120|140\/90|135\/85|130\/80/);
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 4);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  assert.match(guide.sources.find(s=>s.id==="SUP-CDC-BP")!.sourceDate, /2026-09-04.*Reviewed2024-12-13/);
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
});

test("lab results guide distinguishes reference ranges and result labels from diagnosis", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="reading-health-results")!;
  assert.equal(guide.sections.length, 5);
  assert.equal(guide.faq?.length, 5);
  assert.equal(guide.sources.length, 4);
  assert.match(JSON.stringify(guide), /혈액·소변 같은 검사실 검사/);
  assert.match(JSON.stringify(guide), /범위 안이라고 질환이 전혀 없다는 보장은 없고/);
  assert.match(JSON.stringify(guide), /모든 양성·음성에 재검이 반드시 필요한 것은 아닙니다/);
  assert.match(JSON.stringify(guide), /위양성.*위음성/);
  assert.match(JSON.stringify(guide), /의료진의 지시 없이 약을 중단하지/);
  assert.doesNotMatch(JSON.stringify(guide), /서버에 보내지|6\.5|5\.7|8시간 금식|의료 검수 완료/);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 4);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
});

test("family medication support keeps consent and individual medicine instructions ahead of convenience", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="family-medication-support")!;
  assert.equal(guide.sections.length, 5);
  assert.equal(guide.faq?.length, 5);
  assert.match(JSON.stringify(guide.sections[0]), /허락 없이.*약을 숨기거나 억지로 먹이지/);
  assert.match(JSON.stringify(guide), /지시 없이 쪼개거나 갈거나 씹지/);
  assert.match(JSON.stringify(guide), /임의로 두 배/);
  assert.match(JSON.stringify(guide), /모든 약이 같은 약통에 옮겨 담기 적합한 것은 아닙니다/);
  assert.match(JSON.stringify(guide), /확인하지 않은 복용을 완료로 표시하지/);
  assert.match(JSON.stringify(guide), /즉시 119.*약 목록을 완성하거나/);
  assert.match(JSON.stringify(guide), /안약·바르는 약/);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 4);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
  assert.doesNotMatch(JSON.stringify(guide), /무료.*배달|우편.*약|1일 2회|500mg|의료 검수 완료/);
});

test("symptom journal is a communication example rather than a diagnostic or waiting rule", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="symptom-journal")!;
  assert.equal(guide.sections[0].id, "urgent-action");
  assert.match(JSON.stringify(guide.sections[0]), /즉시 119.*사진을 찍느라 기다리지/);
  assert.match(JSON.stringify(guide), /검증된 진단 척도나 필수 제출 양식이 아닙니다/);
  assert.match(JSON.stringify(guide), /정확한 시각 모름/);
  assert.match(JSON.stringify(guide), /보이지 않는다는 이유로 불편을 지우지/);
  assert.match(JSON.stringify(guide), /가상의 표현 예시/);
  assert.match(JSON.stringify(guide), /진료 전에 채워야 할 최소 일수를 정하지/);
  assert.match(JSON.stringify(guide), /약을 추가하거나 중단하지/);
  assert.equal(guide.faq?.length, 5);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 4);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  assert.match(guide.sources.find(s=>s.id==="SUP-NHLBI-SLEEP-DIARY")!.sourceDate, /2019-01/);
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
});

test("disease and support contextual links resolve to existing public ONURIM routes", () => {
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`),
    ...healthSupportGuides.map(g=>`/health/guides/${g.slug}`),
    ...healthTools.map(t=>`/health/tools/${t.slug}`), ...trustPages.map(t=>`/health/trust/${t.slug}`)]);
  for (const guide of [...healthSupportGuides, ...Object.values(healthArticles)]) {
    for (const section of guide.sections) {
      for (const link of section.links ?? []) assert.ok(routes.has(link.href), `${guide.slug}: ${link.href}`);
    }
  }
});

test("appointment questions prioritize concerns without capping disclosure or promising medical outcomes", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="appointment-questions")!;
  assert.equal(guide.sections.length, 6);
  assert.equal(guide.faq?.length, 5);
  assert.match(JSON.stringify(guide), /질문의 상한이 아닙니다/);
  assert.match(JSON.stringify(guide), /좋은 결과가 보장되는 것은 아닙니다/);
  assert.match(JSON.stringify(guide), /연락이 없으니 정상/);
  assert.match(JSON.stringify(guide), /모든 기관이 같은 서비스를 제공한다고 보장하지/);
  assert.match(JSON.stringify(guide), /기억이 나지 않는다는 이유로 임의로 약을 끊거나/);
  assert.match(JSON.stringify(guide), /즉시 119.*예약일·문의 답변을 기다리는/);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 4);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  assert.match(guide.sources.find(s=>s.id==="SUP-NHS-DOCTOR-QUESTIONS")!.sourceDate, /^2023-01-12/);
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
});

test("medication list distinguishes package strength from instructions and current from past records", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="medication-list")!;
  assert.equal(guide.sections.length, 6);
  assert.equal(guide.faq?.length, 5);
  assert.match(JSON.stringify(guide), /함량만 보고 한 번의 사용량을 계산하거나 정하지/);
  assert.match(JSON.stringify(guide), /임의 단위 환산하지/);
  assert.match(JSON.stringify(guide), /안약·바르는 약/);
  assert.match(JSON.stringify(guide), /의료진 안내로 중단한 과거 기록을 구분/);
  assert.match(JSON.stringify(guide), /복용했는지 기억나지 않는 부분은 완료로 채우지/);
  assert.match(JSON.stringify(guide), /즉시 119.*목록을 완성한 뒤 신고하지/);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 5);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
  assert.doesNotMatch(JSON.stringify(guide), /500mg|1일 2회|서버에 보내지|약 식별 완료/);
});

test("parent health organizer separates consent, source documents, current lists and verification dates", () => {
  const guide = healthSupportGuides.find(g=>g.slug==="older-parent-health-organizer")!;
  assert.equal(guide.sections.length, 6);
  assert.equal(guide.faq?.length, 6);
  assert.match(JSON.stringify(guide), /치료를 대신 결정할 권한을 뜻하지/);
  assert.match(JSON.stringify(guide), /현재 사용하는 전체 약 목록을 유지/);
  assert.match(JSON.stringify(guide), /모름.*확인 필요/);
  assert.match(JSON.stringify(guide), /기관이 인증한 표준 서식이 아닙니다/);
  assert.match(JSON.stringify(guide), /의료진이 상태를 다시 평가한 날짜가 아닙니다/);
  assert.match(JSON.stringify(guide), /원본 문서를 대신하지/);
  assert.match(JSON.stringify(guide), /즉시 119.*모두 찾거나/);
  const table = guide.sections.find(s=>s.table)!.table!;
  assert.equal(table.rows.length, 4);
  assert.ok(table.rows.every(row=>row.length===table.columns.length));
  const ids = new Set(guide.sources.map(s=>s.id));
  for (const unit of [...guide.sections, ...guide.faq!]) {
    assert.ok(unit.sourceIds?.length);
    for (const id of unit.sourceIds ?? []) assert.ok(ids.has(id), id);
  }
  assert.match(guide.sources.find(s=>s.id==="SUP-PARENT-RECORDS")!.sourceDate, /^2019-10-17/);
  assert.equal(guide.updatedAt, "2026-09-06");
  assert.ok(guide.sources.every(s=>s.retrievedAt===guide.sourceCheckedAt));
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
  assert.match(JSON.stringify(article), /원인이 불확실하거나, 증상이 악화되거나, 수면·일상에 영향을 주거나, 기존 치료/);
});

test("GERD questions connect actual records to individual testing and follow-up without compulsory procedures", () => {
  const tool = healthTools.find(t=>t.slug==="gerd-appointment-prep")!;
  const copy = toolEditorial[tool.slug];
  assert.equal(copy.indexDecision, "INDEX_UTILITY");
  assert.equal(tool.fields?.length, 2);
  assert.equal(tool.items?.length, 4);
  assert.equal(getToolSources(tool).length, 6);
  assert.equal(getToolSafetyNotice(tool), healthArticles[tool.articleSlug].sections[0]);
  assert.match(copy.description, /성인/);
  assert.match(copy.limitation, /모두 받아야 한다는 카드가 아닙니다/);
  assert.match(copy.steps.join(" "), /해당 기관의 식사·약 준비 지침/);
  assert.match(copy.sheetNotice!, /즉시 119/);
  assert.doesNotMatch(JSON.stringify(copy), /\d+시간 금식|\d+일 중단/);
  assert.match(tool.title, /^위식도역류/);
});

test("GERD daily check remains noindex supporting observation and never defers urgent symptoms to appointment questions", () => {
  const tool = healthTools.find(t=>t.slug==="gerd-everyday-patterns")!;
  const editorial = toolEditorial[tool.slug];
  assert.equal(editorial.indexDecision, "NOINDEX_FOLLOW");
  assert.equal(editorial.inheritParentWarning, true);
  assert.equal(tool.fields?.length, 1);
  assert.equal(tool.items?.length, 4);
  assert.equal(editorial.steps.length, 2);
  assert.equal(getToolSources(tool).length, 6);
  assert.match(editorial.sheetNotice!, /즉시 119/);
  assert.match(editorial.limitation, /삼키기 어렵거나 아프거나, 구토가 계속되거나, 이유 없이 체중/);
  assert.doesNotMatch(JSON.stringify(tool), /흉통이나 삼킴 변화를 진료 질문/);
  assert.match(JSON.stringify(editorial), /일부러 반복하지/);
});

test("GERD separates terms and timing without waiting for severe cardiac pain", () => {
  const article = healthArticles["gastroesophageal-reflux-disease"];
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.sections[0].tone, "warning");
  assert.match(JSON.stringify(article.sections[0]), /가볍거나 오르내릴/);
  assert.match(JSON.stringify(article), /삼키기 어렵거나 아프거나, 구토가 계속되거나, 이유 없이 체중/);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.doesNotMatch(article.eyebrow, /Preview|비공개/);
  assert.match(JSON.stringify(article), /식도 점막/);
  assert.match(readFileSync("app/health/onurim.module.css", "utf8"), /onurim-article-hero > \*\) \{ min-width: 0; \}/);
});

test("OA family checklist is a noindex consent aid and not a pain or caregiver score", () => {
  const tool = healthTools.find(t=>t.slug==="oa-family-support")!;
  const copy = toolEditorial[tool.slug];
  assert.equal(copy.indexDecision, "NOINDEX_FOLLOW");
  assert.equal(tool.fields?.length, 1);
  assert.equal(tool.items?.length, 4);
  assert.equal(copy.steps.length, 2);
  assert.equal(getToolSources(tool).length, 3);
  assert.ok(getToolSafetyNotice(tool));
  assert.match(copy.purpose, /오누림의 편집 원칙/);
  assert.match(copy.limitation, /통증의 진실성·가족의 성실성·회복 정도를 평가하지/);
  assert.match(tool.items!.join(" "), /동의한 범위/);
  assert.match(copy.sheetNotice!, /119/);
});

test("OA visit questions connect personal activity priorities to choices without requiring procedures", () => {
  const tool = healthTools.find(t=>t.slug==="oa-visit-questions")!;
  const copy = toolEditorial[tool.slug];
  assert.equal(tool.fields?.length, 2);
  assert.equal(tool.items?.length, 4);
  assert.equal(copy.indexDecision, "INDEX_UTILITY");
  assert.equal(getToolSources(tool).length, 3);
  assert.ok(getToolSafetyNotice(tool));
  assert.match(copy.steps.join(" "), /다른 중요한 증상을 생략하지/);
  assert.match(copy.limitation, /모든 사람에게 MRI·주사·수술이 필요하다는 목록이 아닙니다/);
  assert.match(copy.sheetNotice!, /모든 증상이 모일 때까지 기다리지/);
  assert.match(tool.items!.join(" "), /기대 효과와 부담/);
});

test("joint activity log records actual pain and function without a provocation test or mandatory activity quota", () => {
  const tool = healthTools.find(t=>t.slug==="oa-daily-activity-log")!;
  const copy = toolEditorial[tool.slug];
  assert.equal(tool.rows, 12);
  assert.equal(tool.columns?.length, 7);
  assert.match(tool.columns![1], /관절·좌우/);
  assert.match(tool.columns![4], /피부 변화/);
  assert.equal(getToolSources(tool).length, 4);
  assert.equal(getToolSafetyNotice(tool), healthArticles.osteoarthritis.sections.find(s=>s.tone==="warning"));
  assert.match(copy.steps.join(" "), /아픈 동작을 일부러 반복하거나/);
  assert.match(copy.purpose, /12일 관찰이나 운동 횟수의 기준이 아닙니다/);
  assert.match(copy.sheetNotice!, /모든 증상이 모일 때까지 기다리지/);
  assert.doesNotMatch(JSON.stringify(copy), /\d+걸음|\d+점 이상|\d+분 운동/);
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
  assert.match(JSON.stringify(urgent), /열이 날 때까지 기다리는 기준이 아니며/);
  assert.match(urgent.paragraphs![0], /갑자기 심하게 아프거나, 새로 붓거나, 관절 주변 피부색/);
  assert.match(urgent.title, /관절통이나 새 부종/);
  assert.match(article.summary[2], /아프거나 새로 붓는/);
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

test("kidney stones distinguish urinary locations, test roles and passage confirmation without forced hydration", () => {
  const article = healthArticles["kidney-stones"];
  assert.equal(article.archetype, "SIMPLE_ANALOGY");
  assert.equal(article.sections.length, 6);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sections[0].tone, "warning");
  assert.ok(article.sections[0].paragraphs);
  assert.match(article.sections[0].paragraphs[0], /즉시 119에 연락합니다/);
  assert.match(article.sections[0].paragraphs[1], /모두 나타날 때까지 기다리지 않습니다/);
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  const text = JSON.stringify(article);
  assert.match(text, /배출 여부 및 콩팥 기능/);
  assert.match(text, /수분 제한을 안내받았다면 임의로 늘리지/);
  assert.match(text, /칼슘 식품을 모두 끊는 것은 적절하지 않습니다/);
  assert.match(text, /서로 다른 구간입니다/);
  assert.doesNotMatch(text, /\d+\s*(mm|리터|mg|주 뒤)|물.*반드시.*배출/);
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("migraine separates a variable symptom history from new emergencies and medication schedules", () => {
  const article = healthArticles.migraine;
  assert.equal(article.archetype, "BODY_SIGNAL");
  assert.equal(article.sections.length, 7);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sections[0].tone, "warning");
  assert.ok(article.sections[0].paragraphs);
  assert.match(article.sections[0].paragraphs[0], /즉시 119에 연락합니다/);
  assert.match(article.sections[0].paragraphs[2], /발열 또는 목의 뻣뻣함/);
  assert.match(article.sections[0].paragraphs[2], /두 증상이 모두 생길 때까지 기다리지 않습니다/);
  assert.match(article.sections[0].paragraphs[2], /바로 평가받을 수 없으면 응급의료기관으로 가거나 119에 연락/);
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  assert.ok(!article.sourceIds.includes("SRC-NINDS-MIGRAINE"));
  const text = JSON.stringify(article);
  assert.match(text, /모두 있어야 하는 조건이 아닙니다/);
  assert.match(text, /예방약의 계획된 사용과 급성 증상 때문에 추가로 사용한 약을 구분/);
  assert.match(text, /일반적인 지속 시간을/);
  assert.match(text, /직접 운전하지 말고/);
  assert.doesNotMatch(text, /\d+\s*(시간|분|일|mg)|혈관 확장으로만|예방약은 모두 매일/);
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("gout separates serum urate, acute joint assessment and individual long-term goals", () => {
  const article = healthArticles.gout;
  assert.equal(article.archetype, "MYTH_FIRST");
  assert.equal(article.sections.length, 7);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  const text = JSON.stringify(article);
  assert.match(text, /열이 날 때까지 기다리라는 뜻이 아닙니다/);
  assert.match(text, /다른 사람의 약을 사용하지 마세요/);
  assert.match(text, /검사를 위해 약을 스스로 끊지 않습니다/);
  assert.match(text, /식품의 공통 목록이나 약 용량을 정하지 않습니다/);
  assert.doesNotMatch(text, /\d+\s*(mg\/dL|리터|mg|주 뒤)|콜히친.*복용하면.*진단/);
  const urgent = article.sections.find(s=>s.tone==="warning")!;
  assert.ok(urgent.sourceIds?.includes("SRC-NHS-SEPTIC-ARTHRITIS"));
  assert.ok(urgent.paragraphs);
  assert.match(urgent.paragraphs[0], /즉시 119에 연락합니다/);
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
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

test("myocardial infarction avoids pain or duration thresholds and separates troponin injury from a single-result diagnosis", () => {
  const article = healthArticles["acute-myocardial-infarction"];
  assert.equal(article.archetype, "QUESTION_FIRST");
  assert.match(article.title, /119/);
  assert.match(article.description, /확신이 없어도 즉시 119/);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sourceIds.length, 8);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections[0];
  assert.equal(urgent.tone, "warning");
  assert.equal(urgent.paragraphs?.length, 1);
  assert.match(urgent.paragraphs![0], /확신이 없어도 즉시 119/);
  const text = JSON.stringify(article);
  assert.match(text, /통증 강도만으로 배제하지/);
  assert.match(text, /심근경색과 심정지는 같은 말이 아닙니다/);
  assert.match(text, /트로포닌은 심장근육 세포에 있는 단백질/);
  assert.match(text, /다른 원인으로 심장근육이 손상된 경우에도/);
  assert.match(text, /처음 검사에서 높지 않았더라도/);
  assert.match(text, /아스피린이 모든 상황에서 금지라는 뜻도/);
  assert.doesNotMatch(text, /\d+(\.\d+)?\s*(mg|시간 이내|분 이상|ng\/L)|911|999|GTN|ST 분절/);
  assert.ok(article.visuals?.["acute-myocardial-infarction-concept"].caption.includes("완전 폐색이 모든"));
  assert.ok(article.visuals?.["acute-myocardial-infarction-action"].caption.includes("모르면 모른다고"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("stroke treats each sudden sign as urgent and separates last-known-well from discovery after calling", () => {
  const article = healthArticles.stroke;
  assert.equal(article.archetype, "BODY_SIGNAL");
  assert.match(article.title, /즉시 119/);
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 2);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sourceIds.length, 8);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections[0];
  assert.equal(urgent.tone, "warning");
  assert.match(urgent.paragraphs![0], /하나라도 갑자기 나타나면 즉시 119/);
  assert.equal(urgent.paragraphs?.length, 1);
  assert.equal(urgent.bullets?.length, 5);
  assert.match(urgent.bullets![3], /걷기 어렵거나, 어지럽거나, 균형 또는/);
  assert.match(article.summary[0], /어지럼/);
  assert.match(article.faq[0].answer, /어지럼/);
  assert.match(article.sections[1].title, /FAST/);
  assert.match(JSON.stringify(article), /호전되었어도 즉시 119/);
  assert.match(JSON.stringify(article), /깬 시각이 실제 발병 시각이라고 단정하지/);
  assert.match(JSON.stringify(article), /평소와 같았던 때와 처음 증상을 발견한 때/);
  assert.match(JSON.stringify(article), /서로 달라야 한다고 억지로 채우지/);
  assert.match(JSON.stringify(article), /음식이나 마실 것을 주지/);
  assert.match(JSON.stringify(article), /평소 처방약을 장기적으로 끊으라는 뜻이 아닙니다/);
  assert.doesNotMatch(JSON.stringify(article), /\d+(\.\d+)?\s*시간 이내|\d+\s*mg|911|\d+점 이상/);
  assert.ok(article.visuals?.["stroke-concept"].caption.includes("하나라도 갑자기"));
  assert.ok(article.visuals?.["stroke-concept"].caption.includes("컵은 배경 소품"));
  assert.ok(article.visuals?.["stroke-action"].caption.includes("같을 수도 다를 수도"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("anxiety distinguishes experiences and medication roles without diagnostic waiting or reassurance about new chest pain", () => {
  const article = healthArticles["anxiety-disorder"];
  assert.equal(article.archetype, "MYTH_FIRST");
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sourceIds.length, 11);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections[0];
  assert.equal(urgent.tone, "warning");
  assert.match(urgent.paragraphs![0], /즉시 119/);
  assert.match(urgent.paragraphs![0], /모두 나타나야 하는 것은 아닙니다/);
  assert.match(urgent.paragraphs![1], /지금의 심장·호흡 문제를 배제하지/);
  assert.match(urgent.paragraphs![2], /의료진에게 신속히 연락해 평가/);
  assert.match(JSON.stringify(article), /한 번 또는 가끔 발작/);
  assert.match(JSON.stringify(article), /6개월이라는 말은 모든 불안장애의 공통 기준도/);
  assert.match(JSON.stringify(article), /모두 필요할 때만 먹는다고 일반화하지/);
  assert.match(JSON.stringify(article), /신체 증상을 유발하는 훈련을 시키는 것은 아닙니다/);
  assert.doesNotMatch(JSON.stringify(article), /\d+점 이상|\d+\s*mg|988|911|\d+회 호흡|모든 항불안제는 즉시/);
  assert.ok(article.visuals?.["anxiety-disorder-concept"].caption.includes("서로 겹칠"));
  assert.ok(article.visuals?.["anxiety-disorder-action"].caption.includes("회피 권유가 아닙니다"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("depression supports family listening without diagnostic thresholds or delayed emergency help", () => {
  const article = healthArticles.depression;
  assert.equal(article.archetype, "FAMILY_SITUATION");
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sourceIds.length, 8);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections[0];
  assert.equal(urgent.tone, "warning");
  assert.match(urgent.paragraphs![0], /즉시 119/);
  assert.match(urgent.paragraphs![0], /109 상담 연결이나 예약 진료를 기다리느라/);
  assert.match(JSON.stringify(article), /2주가 될 때까지 버텨야/);
  assert.match(JSON.stringify(article), /비밀 보장을 약속하지/);
  assert.match(JSON.stringify(article), /혼자 제압하려 하지 말고/);
  assert.match(JSON.stringify(article), /자살 생각이 생기거나 심해지면 즉시/);
  assert.doesNotMatch(JSON.stringify(article), /\d+점 이상|\d+\s*mg|988|911|무조건 완치|가장 안전한 약/);
  assert.ok(article.visuals?.["depression-concept"].caption.includes("늘거나 줄 수"));
  assert.ok(article.visuals?.["depression-action"].caption.includes("실제 환자나 의료인이 아니며"));
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`), ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(s=>`/health/tools/${s.slug}`)]);
  for (const link of article.sections.flatMap(s=>s.links ?? [])) assert.ok(routes.has(link.href), link.href);
});

test("UTI separates infection locations, test roles and urgent changes without self-prescribed antibiotics", () => {
  const article = healthArticles["urinary-tract-infection"];
  assert.equal(article.archetype, "QUESTION_FIRST");
  assert.equal(article.faq.length, 6);
  assert.equal(article.sections.filter(s=>s.table).length, 1);
  assert.equal(article.updatedAt, "2026-09-06");
  assert.equal(article.sourceIds.length, 10);
  assert.ok(article.sections.every(s=>s.imageId!==undefined));
  for (const item of [...article.sections, ...article.faq]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds ?? []) assert.ok(article.sourceIds.includes(id), id);
  }
  const urgent = article.sections[0];
  assert.equal(urgent.tone, "warning");
  assert.match(urgent.paragraphs![0], /즉시 119/);
  assert.match(urgent.paragraphs![1], /모두 나타나야 하는 조건이 아니며/);
  assert.match(JSON.stringify(article), /배뇨 불편은 없을 수도/);
  assert.match(JSON.stringify(article), /세균이 보인다는 사실만으로 모두 항생제/);
  assert.match(JSON.stringify(article), /남은 항생제나 다른 사람/);
  assert.ok(article.sections.some(s=>s.sourceIds?.includes("SRC-CDC-ANTIBIOTIC-USE")));
  assert.ok(article.sections.find(s=>s.table)?.sourceIds?.includes("SRC-MEDLINEPLUS-URINE-CULTURE"));
  assert.doesNotMatch(JSON.stringify(article), /72시간|48시간|\d+일간|\d+\s*(mg|리터|L\/일)/);
  assert.ok(article.visuals?.["urinary-tract-infection-concept"].caption.includes("서로 배타적인"));
  assert.ok(article.visuals?.["urinary-tract-infection-action"].caption.includes("음성 판정이 아니며"));
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
