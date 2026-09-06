import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Offline, reproducible join of previously observed public/UI evidence.
// No browser calls, Google API, indexing request or deployment is performed.
const dir = path.resolve("docs/health-v3/onurim/seo-v2");
async function read<T>(name: string): Promise<T> { return JSON.parse(await readFile(path.join(dir, name), "utf8")) as T; }
function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) throw new Error("Refuse an empty evidence ledger");
  const keys = Object.keys(rows[0]);
  const cell = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  return [keys.map(cell).join(","), ...rows.map(r => keys.map(k => cell(r[k])).join(","))].join("\n") + "\n";
}
async function save(name: string, text: string) { await writeFile(path.join(dir, name), text); }
type Flat = Record<string, string | number | boolean> & { route: string; url: string; page_type: string };
type Inspection = {
  statusCodes: Record<string, string>; referringPageCodes: Record<string, string>;
  sharedObservedFields: Record<string, Record<string, string>>; sitemapUiOverrides: Record<string, string>;
  rows: [string, string, string, string][];
};
type PlanRow = [string, string, string, string, string, string];
type Pair = [string, string];
type PerformanceRow = [string, number, number, number | null, number | null];

async function run() {
  const crawl = await read<{ flat: Flat[]; graph: Record<string, string>[]; similarity: { a: string; b: string; first300WordJaccard: number; headingJaccard: number; faqJaccard: number }[] }>("raw/production-crawl.json");
  const inspection = await read<Inspection>("raw/gsc-url-inspections-2026-09-06.json");
  const aggregate = await read<{ origin: string; indexed: Pair[]; discoveredNotIndexed: string[]; crawledNotIndexed: Pair[]; redirect: Pair[]; notFound: Pair[] }>("raw/gsc-index-report-2026-09-06.json");
  const performance = await read<{ d7: { page: PerformanceRow[] }; d28: { page: PerformanceRow[] }; verifiedQueryPageJoin: { page: string; rows: PerformanceRow[] } }>("raw/gsc-performance-2026-09-06.json");
  const plan = await read<{ tools: PlanRow[]; trust: PlanRow[] }>("raw/index-surface-plan.json");
  const special = await read<{ rows: { route?: string; url?: string; status: number; contentType?: string }[] }>("raw/production-special-routes-2026-09-06.json");
  const origin = aggregate.origin;
  const current = new Map(crawl.flat.map(r => [r.url, r]));
  if (current.size !== 77 || inspection.rows.length !== 77 || new Set(inspection.rows.map(r => r[0])).size !== 77) throw new Error("77 unique URLs required");
  if (plan.tools.length !== 34 || plan.trust.length !== 12) throw new Error("Individual 34-tool / 12-trust plan required");
  const gsc = new Map(inspection.rows.map(([route, status, crawlLabel, ref]) => {
    const fields = inspection.sharedObservedFields[status];
    const url = new URL(route, origin).href;
    if (!current.has(url)) throw new Error(`Inspection outside current sitemap: ${route}`);
    return [url, { current_gsc_status: inspection.statusCodes[status], last_crawl: crawlLabel || "NOT_AVAILABLE",
      google_canonical: fields.googleCanonical === "검사된 URL" ? url : "NOT_AVAILABLE",
      user_canonical: fields.userCanonical === "SELF" ? url : "NOT_AVAILABLE", gsc_verdict: fields.verdict,
      gsc_crawl_allowed: fields.crawlAllowed, gsc_fetch: fields.fetch, gsc_index_allowed: fields.indexAllowed,
      gsc_sitemap: inspection.sitemapUiOverrides[route] ?? fields.sitemap,
      gsc_referring_page: inspection.referringPageCodes[ref] }];
  }));
  const history = [
    ...aggregate.indexed.map(([route, last_crawl]) => ({ route, last_crawl, status: "INDEXED" })),
    ...aggregate.discoveredNotIndexed.map(route => ({ route, last_crawl: "NOT_AVAILABLE", status: "DISCOVERED_NOT_INDEXED" })),
    ...aggregate.crawledNotIndexed.map(([route, last_crawl]) => ({ route, last_crawl, status: "CRAWLED_NOT_INDEXED" })),
    ...aggregate.redirect.map(([route, last_crawl]) => ({ route, last_crawl, status: "REDIRECT" })),
    ...aggregate.notFound.map(([route, last_crawl]) => ({ route, last_crawl, status: "NOT_FOUND" })),
  ].map(r => ({ url: new URL(r.route, origin).href, aggregate_status: r.status, aggregate_last_crawl: r.last_crawl,
    aggregate_report_updated_label: "26. 8. 28.", operational_set: current.has(new URL(r.route, origin).href) ? "CURRENT_ONURIM" : r.route.startsWith("/_next/") ? "RENDER_RESOURCE" : "LEGACY_OR_REDIRECT",
    fresh_inspection_status: gsc.get(new URL(r.route, origin).href)?.current_gsc_status ?? "NOT_INSPECTED", observed_date: "2026-09-06" }));
  if (history.length !== 124 || new Set(history.map(r => r.url)).size !== 124) throw new Error("Aggregate inventory must contain 124 unique rows");
  const decisions = new Map([...plan.tools.map(r => ["/health/tools/" + r[0], r] as const), ...plan.trust.map(r => ["/health/trust/" + r[0], r] as const)]);
  const pages7 = new Map(performance.d7.page.map(r => [r[0], r]));
  const pages28 = new Map(performance.d28.page.map(r => [r[0], r]));
  const surface = crawl.flat.map(r => {
    const d = decisions.get(r.route);
    if (!d && ["tool", "trust"].includes(r.page_type)) throw new Error(`Missing individual decision: ${r.route}`);
    const primary = ["home", "hub", "disease"].includes(r.page_type);
    return { url: r.url, route: r.route, page_type: r.page_type, decision: d?.[1] ?? (primary ? "INDEX_PRIMARY" : "INDEX_SUPPORT"),
      target_decision: d?.[2] ?? (primary ? "INDEX_PRIMARY" : "INDEX_SUPPORT"),
      independent_task: d?.[3] ?? (primary ? "질환별 이해·적절한 도움·진료 준비 또는 이를 찾는 주제 허브" : "진료·검사·가족 지원의 독립적인 실용 질문"),
      overlap: d?.[4] ?? "개별 dossier에서 검증", required_action: d?.[5] ?? "페이지별 순차 개선·출처 대조·12개 인증 기준 QA",
      decision_basis: "INTERNAL_HEURISTIC", production_applied: "NO", certification: "PENDING", current_gsc_status: gsc.get(r.url)!.current_gsc_status,
      unique_title_now: true, unique_description_now: r.page_type === "tool" && r.route.endsWith("-visit-card") ? false : true,
      official_source_links_now: r.source_count, body_words_now: r.word_count, content_inlinks_now: r.content_inlinks,
      standalone_usage_gap: r.page_type === "tool" ? "인쇄 순서·기록 예시·직접 출처 링크 보강 필요; 14개 fields 미노출" : "도구 질문 해당 없음" };
  });
  const ledger = crawl.flat.map(r => {
    const s = surface.find(x => x.url === r.url)!;
    const old = history.find(x => x.url === r.url);
    if (!old) throw new Error(`Aggregate join missing ${r.url}`);
    return { ...r, ...gsc.get(r.url), impressions_7d: pages7.get(r.route)?.[2] ?? 0,
      impressions_28d: pages28.get(r.route)?.[2] ?? 0, clicks_28d: pages28.get(r.route)?.[1] ?? 0,
      query_count: r.url === performance.verifiedQueryPageJoin.page ? performance.verifiedQueryPageJoin.rows.length : "NOT_JOINED",
      performance_note: "Complete UI page tables; absent row = 0 reported impressions, not proof of zero demand. Query count only when exact page filter inspected.",
      aggregate_gsc_status: old.aggregate_status, index_surface_decision: s.decision, target_index_surface_decision: s.target_decision,
      priority: gsc.get(r.url)?.current_gsc_status === "CRAWLED_NOT_INDEXED" && r.page_type === "disease" ? "P0" : pages28.has(r.route) ? "P1" : r.page_type === "disease" ? "P2" : r.page_type === "support" ? "P3" : r.page_type === "tool" ? "P4" : "P5",
      action_required: s.required_action, evidence_scope: "PRODUCTION_BASELINE_WITH_UNAPPLIED_PLAN", observed_date: "2026-09-06" };
  });
  await save("02-gsc-index-inventory.csv", csv(history));
  await save("03-url-master-ledger.csv", csv(ledger));
  await save("04-index-surface-decision.csv", csv(surface));
  await save("08-internal-link-graph.csv", csv(crawl.graph));
  await save("raw/discovered-59-individual-join.csv", csv(ledger.filter(r => r.aggregate_gsc_status === "DISCOVERED_NOT_INDEXED")));
  const gaps: Record<string, [string, string]> = {
    "hba1c 뜻": ["최근 수개월 혈당과 단회 혈당 구별", "기간 비교·검사표 읽는 순서"],
    "hba1c": ["HbA1c 결과를 진료 질문으로 연결", "결과만으로 진단·약 변경하지 않는 한계와 질문 카드"],
    "hba1c ngsp": ["NGSP·IFCC 표기와 단위 이해", "%와 mmol/mol 구분; 단위 변환 계산기 없이 원본 확인"],
  };
  await save("05-query-page-map.csv", csv(performance.verifiedQueryPageJoin.rows.map(([query, clicks, impressions, , position]) => ({
    query, intent: gaps[query][0], target_url: performance.verifiedQueryPageJoin.page, impressions, clicks, position,
    existing_match: "SAME_EXISTING_URL", content_gap: gaps[query][1], action: "HbA1c 먼저 순차 개선; 새 URL 없음", evidence: "EXACT_PAGE_FILTER_UI", period: "2026-08-26..2026-09-03" }))));
  await save("13-index-request-ledger.csv", csv(ledger.map(r => ({ url: r.url, date: "2026-09-06", requested: "NO",
    reason: "ADSENSE_REVIEW_IN_PROGRESS_PRODUCTION_FREEZE; no SEO V2 content deployed", content_change_sha: "NOT_DEPLOYED", gsc_state_before_request: r.current_gsc_status }))));
  await mkdir(path.join(dir, "page-dossiers"), { recursive: true });
  for (const [route, last] of aggregate.crawledNotIndexed) {
    const row = special.rows.find(r => r.route === route);
    if (!row) throw new Error(`Missing fresh public smoke for CNI ${route}`);
    const kind = route === "/health/dyslipidemia" ? "CURRENT_PRIMARY" : route.startsWith("/_next/") ? "RENDER_RESOURCE" : "LEGACY_REMOVED";
    const number = aggregate.crawledNotIndexed.findIndex(r => r[0] === route) + 1;
    const action = kind === "CURRENT_PRIMARY" ? "KEEP_WAITING / 정상 색인 확인. 최신 URL 검사에서는 INDEXED이며 사용자·Google 표준 URL 모두 자기 자신. 추가 색인 요청 없음. 예정된 독립 콘텐츠 개선은 색인 실패 수리로 포장하지 않음." : kind === "RENDER_RESOURCE" ? "KEEP_WAITING / HTML 검색 문서가 아닌 JS·폰트. HTTP 200과 올바른 MIME, robots 자원 접근 허용을 유지. 강제 noindex/robots 차단/색인 요청 없음." : "KEEP_WAITING / 기존 Production 정책으로 제거된 과거 글의 410. 현행 sitemap 77 및 내부링크 그래프에 없음. 무관한 건강 글로 redirect하거나 복원하지 않음.";
    await save(`page-dossiers/cni-${String(number).padStart(2, "0")}.md`, `# CNI ${number}: ${route}\n\n- 관측: 2026-09-06\n- 집계 보고서: CRAWLED_NOT_INDEXED / 과거 크롤링 ${last}\n- 분류: ${kind}\n- 현재 HTTP: ${row.status}; MIME: ${row.contentType ?? "text/plain;charset=UTF-8"}\n- 현행 ONURIM 문서 여부: ${kind === "CURRENT_PRIMARY" ? "YES" : "NO"}\n- 판정: ${action}\n\n근거: raw/gsc-index-report-2026-09-06.json, raw/production-special-routes-2026-09-06.json, raw/gsc-url-inspections-2026-09-06.json, raw/production-crawl.json. 이 문서는 과거 CNI 원인을 Google 내부 판단처럼 단정하지 않는다.\n`);
  }
  const counts = ledger.reduce<Record<string, number>>((a, r) => (a[r.current_gsc_status!] = (a[r.current_gsc_status!] ?? 0) + 1, a), {});
  const targetCounts = surface.reduce<Record<string, number>>((a, r) => (a[r.target_decision] = (a[r.target_decision] ?? 0) + 1, a), {});
  const max = (field: "first300WordJaccard" | "headingJaccard" | "faqJaccard") => [...crawl.similarity].sort((a,b)=>b[field]-a[field]).slice(0,5);
  await save("07-content-similarity.md", `# 콘텐츠 유사성: baseline\n\nINTERNAL_HEURISTIC. 공백 토큰 Jaccard는 한국어 의미 중복이나 Google 임계값을 판정하지 않는다. 본문 앞 300 토큰/제목 문자열/FAQ 문자열을 각기 비교한다. 공통 안전 고지와 내비게이션으로 값이 높아질 수 있다.\n\n190 쌍 기준. 개선 후 동일 감사로 비교 예정; 현재는 before만 존재한다.\n\n\`\`\`json\n${JSON.stringify({ first300: max("first300WordJaccard"), headings: max("headingJaccard"), faq: max("faqJaccard") },null,2)}\n\`\`\`\n\n14개 확장 질문 카드의 동일 description, 이미지 fallback 중복, 공통 section 순서/FAQ 리듬을 개별 dossier에서 추가로 정성 검토한다. 낮은 수치만으로 고유 가치 PASS를 부여하지 않는다.\n`);
  console.log(JSON.stringify({ current: ledger.length, aggregate: history.length, freshGscCounts: counts, targetCounts, toolDecisions: plan.tools.length, trustDecisions: plan.trust.length, discoveredHistorical: ledger.filter(r=>r.aggregate_gsc_status==="DISCOVERED_NOT_INDEXED").length },null,2));
}
run().catch(error => { console.error(error); process.exitCode = 1; });
