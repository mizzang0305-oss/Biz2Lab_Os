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
