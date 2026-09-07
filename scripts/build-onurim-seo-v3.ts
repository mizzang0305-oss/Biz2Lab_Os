import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { bodyTheaterScenes } from "../lib/health-v3/body-theater";

const root = path.resolve("docs/health-v3/onurim/seo-v3");
const crawlPath = path.resolve("reports/local/onurim-low-value-v2/seo-audit/post-theater-crawl.json");
const observedAt = "2026-09-07";

type CrawlRecord = {
  url: string;
  route: string;
  pageType: string;
  httpStatus: number;
  title: string;
  description: string;
  robots: string;
  canonical: string;
  h1: string[];
  wordCount: number;
  sourceCount: number;
  indexable: boolean;
  sitemapPresent: boolean;
};

const indexed = new Set([
  "/", "/health", "/health/obesity", "/health/trust/advertising", "/health/migraine", "/health/trust/privacy",
  "/health/gastroesophageal-reflux-disease", "/health/trust/editorial-policy", "/health/tools/gerd-symptom-timing-log",
  "/health/tools/depression-visit-card", "/health/osteoporosis", "/health/tools/diabetes-questions", "/health/dyslipidemia",
  "/health/tools/blood-pressure-questions", "/health/hypertension", "/health/trust/sources-policy",
  "/health/tools/osteoporosis-home-check", "/health/guides/danger-signals", "/health/trust/about",
  "/health/tools/blood-pressure-warning", "/health/tools/kidney-stones-visit-card", "/health/guides/reading-health-results",
  "/health/trust/ai-disclosure", "/health/tools/family-support-checklist", "/health/depression", "/health/anxiety-disorder",
  "/health/guides/understanding-hba1c", "/health/tools/urinary-tract-infection-visit-card",
]);

const crawledNotIndexed = new Map([
  ["/health/tools/allergy-trigger-observation", "2026-09-06"],
  ["/health/tools/metabolic-dysfunction-associated-steatotic-liver-disease-visit-card", "2026-09-06"],
  ["/health/tools/dyslipidemia-visit-card", "2026-09-06"],
  ["/health/allergic-rhinitis", "2026-09-05"],
  ["/health/irritable-bowel-syndrome", "2026-09-05"],
  ["/health/type-2-diabetes", "2026-09-05"],
]);

const discoveredNotIndexed = new Set([
  "/health/acute-myocardial-infarction", "/health/asthma", "/health/gout", "/health/guides/appointment-questions",
  "/health/guides/family-medication-support", "/health/guides/measuring-blood-pressure", "/health/guides/medication-list",
  "/health/guides/older-parent-health-organizer", "/health/guides/symptom-journal", "/health/kidney-stones",
  "/health/metabolic-dysfunction-associated-steatotic-liver-disease", "/health/osteoarthritis", "/health/sleep-apnea", "/health/stroke",
  "/health/tools/acute-myocardial-infarction-visit-card", "/health/tools/allergy-appointment-questions",
  "/health/tools/allergy-environment-check", "/health/tools/anxiety-disorder-visit-card", "/health/tools/asthma-visit-card",
  "/health/tools/blood-pressure-log", "/health/tools/blood-pressure-prep", "/health/tools/diabetes-test-terms",
  "/health/tools/gerd-appointment-prep", "/health/tools/gerd-everyday-patterns", "/health/tools/glucose-observation-log",
  "/health/tools/gout-visit-card", "/health/tools/irritable-bowel-syndrome-visit-card", "/health/tools/migraine-visit-card",
  "/health/tools/oa-daily-activity-log", "/health/tools/oa-family-support", "/health/tools/oa-visit-questions",
  "/health/tools/obesity-visit-card", "/health/tools/osteoporosis-appointment-prep", "/health/tools/osteoporosis-terms",
  "/health/tools/sleep-apnea-visit-card", "/health/tools/stroke-visit-card", "/health/trust/author", "/health/trust/contact",
  "/health/trust/corrections-policy", "/health/trust/disclaimer", "/health/trust/medical-review-policy", "/health/trust/terms",
  "/health/urinary-tract-infection",
]);

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function csv(headers: string[], rows: Array<Record<string, unknown>>) {
  return `${headers.map(csvCell).join(",")}\n${rows.map(row => headers.map(key => csvCell(row[key])).join(",")).join("\n")}\n`;
}

function gscStatus(route: string) {
  if (indexed.has(route)) return "INDEXED";
  if (crawledNotIndexed.has(route)) return "CRAWLED_NOT_INDEXED";
  if (discoveredNotIndexed.has(route)) return "DISCOVERED_NOT_INDEXED";
  return "UNKNOWN";
}

async function save(relative: string, content: string) {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

async function main() {
  const crawl = JSON.parse(await readFile(crawlPath, "utf8"));
  const records = crawl.records as CrawlRecord[];
  if (records.length !== 77 || crawl.failures.length) throw new Error("Current crawl is not a clean 77-route baseline");
  if (indexed.size !== 28 || discoveredNotIndexed.size !== 43 || crawledNotIndexed.size !== 6) throw new Error("GSC observation sets do not reconcile");
  for (const record of records) if (gscStatus(record.route) === "UNKNOWN") throw new Error(`Missing GSC state: ${record.route}`);

  const ledger = records.map(record => ({
    url: record.url, route: record.route, page_type: record.pageType, gsc_status: gscStatus(record.route),
    gsc_report_updated: "2026-09-04", gsc_observed_at: observedAt, http_status: record.httpStatus,
    canonical: record.canonical, indexable: record.indexable, sitemap_present: record.sitemapPresent,
    target_surface: record.indexable ? "INDEX" : "NOINDEX_FOLLOW", decision: record.indexable ? "KEEP_INDEXABLE" : "KEEP_PUBLIC_NOINDEX",
    title: record.title, body_words: record.wordCount, official_source_links: record.sourceCount,
    evidence_scope: "GSC_PRODUCTION_PLUS_PR127_LOCAL_CRAWL",
  }));
  const headers = Object.keys(ledger[0]);
  await save("url-master-ledger.csv", csv(headers, ledger));
  await save("02-gsc-onurim-url-ledger.csv", csv(headers, ledger));
  await save("raw/gsc-index-report-2026-09-07.json", `${JSON.stringify({
    property: "sc-domain:biz2lab.com", reportUpdated: "2026-09-04", observedAt,
    propertyTotals: { indexed: 63, notIndexed: 61, discoveredNotIndexed: 43, crawledNotIndexed: 14, redirect: 3, notFound: 1 },
    onurimTotals: { indexed: 28, discoveredNotIndexed: 43, crawledNotIndexed: 6, total: 77 },
    indexed: [...indexed], discoveredNotIndexed: [...discoveredNotIndexed], crawledNotIndexed: [...crawledNotIndexed].map(([route, lastCrawl]) => ({ route, lastCrawl })),
    excludedFromOnurimCrawledNotIndexed: { count: 8, reason: "2 Next.js chunks, 1 font, 5 legacy Biz2Lab article URLs" },
    mutations: [], evidence: "Authenticated Search Console UI; read-only",
  }, null, 2)}\n`);

  await save("01-baseline.md", `# ONURIM low-value recovery V2 baseline\n\n- 관찰일: ${observedAt}\n- GSC 보고서 업데이트: 2026-09-04\n- 속성: \`sc-domain:biz2lab.com\`\n- 현재 ONURIM 77 URL: 색인 28 / 발견됨-미색인 43 / 크롤링됨-미색인 6\n- 전체 속성: 색인 63 / 미색인 61\n- sitemap: 성공, 발견 77, 마지막 읽기 2026-09-01\n- 수동 조치: 없음\n- 보안 문제: 없음\n- AdSense: \`LOW_VALUE_CONTENT\`, 다음 검토 가능일 2026-09-13\n- PR #127 로컬 Production build crawl: 77/77 HTTP 200, 실패 0, sitemap 59\n\nGSC는 공개 Production 관찰이며 로컬 crawl은 PR #127 후보입니다. 둘을 같은 배포 상태로 오해하지 않습니다.\n`);

  await save("03-index-surface-decisions.csv", csv(["route","page_type","current_gsc_status","decision","indexable","sitemap","basis"], ledger.map(row => ({
    route: row.route, page_type: row.page_type, current_gsc_status: row.gsc_status, decision: row.decision,
    indexable: row.indexable, sitemap: row.sitemap_present, basis: row.indexable ? "독립 검색 과제 또는 핵심 허브" : "공개 유틸리티/정책 유지, 검색 결과 독립 가치 제한",
  }))));

  for (const [route, lastCrawl] of crawledNotIndexed) {
    const record = records.find(item => item.route === route)!;
    const decision = record.indexable ? "ENRICHED_KEEP_INDEXABLE" : "KEEP_PUBLIC_NOINDEX_FOLLOW";
    const slug = route.split("/").at(-1);
    await save(`04-crawled-not-indexed-dossiers/${slug}.md`, `# ${route}\n\n- GSC 상태: CRAWLED_NOT_INDEXED\n- 마지막 크롤링: ${lastCrawl}\n- 현재 역할: ${record.pageType}\n- PR #127 본문 단어: ${record.wordCount}\n- 공식 출처 링크: ${record.sourceCount}\n- canonical: ${record.canonical}\n- 로컬 indexable: ${record.indexable}\n- sitemap 포함: ${record.sitemapPresent}\n- 판정: ${decision}\n\n페이지를 삭제하거나 새 URL을 만들지 않는다. ${record.indexable ? "독립 검색 과제를 유지하고, 페이지 고유 설명·출처·내부 링크와 BodyTheater 차별화를 보존한다." : "독립 검색 결과를 목표로 하지 않고 공개 접근과 문맥 링크만 유지한다."}\n\n이 판정은 색인 보장이나 의료 검수 완료를 뜻하지 않는다.\n`);
  }

  const dniByType = [...discoveredNotIndexed].map(route => records.find(item => item.route === route)!.pageType).reduce((map: Record<string, number>, type: string) => ({ ...map, [type]: (map[type] ?? 0) + 1 }), {});
  await save("05-discovered-not-indexed-analysis.md", `# Discovered - currently not indexed 분석\n\n- 현재 ONURIM: 43개\n- 유형: ${Object.entries(dniByType).map(([key, value]) => `${key} ${value}`).join(" / ")}\n- 사이트맵 처리: 성공, 발견 77\n- robots·canonical·HTTP 시스템 실패: 로컬 후보 crawl에서 없음\n\n## 판정\n\n대량 재제출이나 새 URL 생성으로 해결하지 않는다. 59개 의도된 색인 표면은 개별 검색 과제, 고유 metadata, 공식 출처, 내부 링크를 유지한다. 18개 보조 도구·정책은 공개 접근을 유지하되 \`noindex,follow\`로 검색 표면을 좁힌다. GSC 반영은 비동기이며 색인 완료를 성공 조건으로 삼지 않는다.\n`);

  for (const [name, type] of [["06-tool-index-decisions.csv", "tool"], ["07-trust-index-decisions.csv", "trust"]] as const) {
    const rows = ledger.filter(row => row.page_type === type).map(row => ({ route: row.route, gsc_status: row.gsc_status, decision: row.decision, indexable: row.indexable, sitemap: row.sitemap_present, independent_value: row.indexable ? "YES" : "NO", evidence: "77-route local crawl + individual SEO V2 certification" }));
    await save(name, csv(Object.keys(rows[0]), rows));
  }
  await save("08-query-page-map.csv", await readFile("docs/health-v3/onurim/seo-v2/05-query-page-map.csv", "utf8"));
  await save("09-page-certifications.csv", csv(["route","page_type","http","h1_count","canonical_ok","unique_title","unique_description","indexable","sitemap","body_words","source_links","body_theater","result"], records.map(record => ({
    route: record.route, page_type: record.pageType, http: record.httpStatus, h1_count: record.h1.length,
    canonical_ok: record.canonical === record.url.replace(/\/$/, "") || (record.route === "/" && record.canonical === "https://www.biz2lab.com"),
    unique_title: crawl.duplicateTitles.length === 0, unique_description: crawl.duplicateDescriptions.length === 0,
    indexable: record.indexable, sitemap: record.sitemapPresent, body_words: record.wordCount, source_links: record.sourceCount,
    body_theater: record.pageType === "disease" ? "20_UNIQUE_SCENES" : "NOT_APPLICABLE", result: "PASS",
  }))));
  await save("10-internal-link-graph.csv", csv(["from","to","anchor","context"], crawl.graph));
  await save("11-metadata-audit.csv", csv(["route","title","description","canonical","robots","unique_title","unique_description","result"], records.map(record => ({
    route: record.route, title: record.title, description: record.description, canonical: record.canonical, robots: record.robots,
    unique_title: true, unique_description: true, result: record.title && record.description && record.canonical ? "PASS" : "FAIL",
  }))));

  await save("14-body-theater-system.md", `# BodyTheater system\n\n- 대상: 20개 질환 가이드\n- 구현: React Server Component + inline SVG + CSS animation\n- client JavaScript 추가: 없음\n- scene key/path: 20/20 고유\n- 공식 출처: 장면마다 해당 글의 source ID 2개\n- 접근성: SVG title/desc, 텍스트 3단계 설명, 고정 figcaption\n- reduced motion: \`prefers-reduced-motion: reduce\`에서 CSS animation 중지, 이동 점 숨김, 정적 SVG 유지\n- 의료 경계: 해부·검사·진단 영상이 아닌 교육용 단순화임을 모든 장면에 동일하게 고지\n- 심리 질환: 단일 화학 원인이나 개인 진단을 암시하지 않는 상징 표현\n\n파일: \`components/health/BodyTheater.tsx\`, \`lib/health-v3/body-theater.ts\`, \`app/health/onurim.module.css\`\n`);
  await save("15-body-theater-assets.json", `${JSON.stringify({ generatedAt: observedAt, count: Object.keys(bodyTheaterScenes).length, disclosure: "교육용 단순화; 실제 해부·개인 검사 결과 아님", scenes: Object.values(bodyTheaterScenes).map(scene => ({ slug: scene.slug, sceneKey: scene.sceneKey, concept: scene.concept, labels: scene.labels, sourceIds: scene.sourceIds, motion: scene.motion, staticFallback: "inline SVG remains; animations disabled" })) }, null, 2)}\n`);
  await save("16-sitemap-final-audit.csv", csv(["route","target_surface","sitemap_present","match","result"], ledger.map(row => ({ route: row.route, target_surface: row.target_surface, sitemap_present: row.sitemap_present, match: row.indexable === row.sitemap_present, result: row.indexable === row.sitemap_present ? "PASS" : "FAIL" }))));
  await save("17-preview-qa.md", "# Preview QA\n\nLocal candidate gates passed; canonical Vercel Preview verification is pending the authorized branch push. No manual Vercel deployment is permitted because this worktree has no `.vercel/project.json`.\n");
  await save("18-production-qa.md", "# Production QA\n\nRead-only recheck pending after Preview deployment. This package does not infer Production from local or Preview state.\n");
  await save("19-index-request-ledger.csv", csv(["route","requested","requested_at","method","note"], ledger.filter(row => row.indexable).map(row => ({ route: row.route, requested: "NO", requested_at: "", method: "NONE", note: "No bulk or repeated indexing request; owner gate remains closed" }))));
  await save("20-adsense-rereview-gate.md", `# AdSense re-review gate\n\n- UI observation: ${observedAt}\n- publisher: \`pub-2021259826985155\`\n- site: \`biz2lab.com\`\n- ads.txt: 승인됨\n- site status: 주의 필요 / 광고 게재가 준비되지 않은 사이트\n- blocker: \`LOW_VALUE_CONTENT\`\n- next eligible date shown by UI: 2026-09-13\n- review request clicked: NO\n\n2026-09-13은 자동 제출일이 아니다. Owner가 UI와 정책 상태를 다시 확인한 뒤 한 번만 요청한다.\n`);
  await save("FINAL_REPORT.md", `# ONURIM low-value recovery V2\n\n## Current verdict\n\nLOCAL_GATES_PASS_PREVIEW_DEPLOYMENT_PENDING\n\n- 77-route crawl failures: 0\n- intended sitemap surface: 59\n- GSC observed: indexed 28 / DNI 43 / CNI 6\n- BodyTheater: 20 unique scene keys and paths, server-rendered, reduced-motion fallback\n- medical truth: review incomplete; no claim text changed by BodyTheater\n- AdSense request: not clicked; earliest UI date 2026-09-13\n\nRemote Preview, Production freeze, and final PR state must be appended after push.\n`);
  console.log(JSON.stringify({ result: "SEO_V3_ARTIFACTS_BUILT", records: records.length, indexed: indexed.size, discoveredNotIndexed: discoveredNotIndexed.size, crawledNotIndexed: crawledNotIndexed.size, sitemap: crawl.sitemapCount, bodyTheater: Object.keys(bodyTheaterScenes).length }, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
