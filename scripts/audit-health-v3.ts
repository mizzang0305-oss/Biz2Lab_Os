import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  healthArticles,
  healthClaims,
  healthSources,
  healthTools,
  trustPages,
} from "../lib/health-v3/content";
import { publicMedicalSafetyState, publicReleaseAdjudications } from "../lib/health-v3/public-safety";
import { healthSupportGuides } from "../lib/health-v3/support-guides";
import {
  createMedicalReviewCsvRows,
  currentMedicalReviewState,
  medicalReviewClaims,
  medicalReviewPacketHash,
  medicalReviewPacketVersion,
} from "../lib/health-v3/medical-review";
import {
  parseMedicalReviewCsv,
  serializeMedicalReviewCsv,
} from "../lib/health-v3/review-csv";

type Mode = "all" | "content" | "claims" | "safety" | "sources" | "images" | "genericness" | "medical-review";

const root = process.cwd();
const modeFlag = process.argv.indexOf("--mode");
const mode = (modeFlag >= 0 ? process.argv[modeFlag + 1] : "all") as Mode;
const failures: string[] = [];
const results: Record<string, string | number | boolean> = {};

function assert(condition: unknown, message: string) {
  if (!condition) failures.push(message);
}

function textValues(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(textValues);
  if (value && typeof value === "object") return Object.values(value).flatMap(textValues);
  return [];
}

function auditContent() {
  const expectedArticles = [
    "hypertension", "type-2-diabetes", "dyslipidemia", "obesity",
    "metabolic-dysfunction-associated-steatotic-liver-disease", "gastroesophageal-reflux-disease",
    "irritable-bowel-syndrome", "allergic-rhinitis", "asthma", "sleep-apnea",
    "osteoarthritis", "osteoporosis", "gout", "migraine", "kidney-stones",
    "urinary-tract-infection", "depression", "anxiety-disorder", "stroke",
    "acute-myocardial-infarction",
  ];
  assert(Object.keys(healthArticles).length === 20, "exactly twenty substantive disease guides must exist");
  for (const slug of expectedArticles) assert(slug in healthArticles, `required guide missing: ${slug}`);
  assert(healthTools.length >= 34, "all disease guides need at least one useful action tool");
  assert(healthSupportGuides.length >= 8 && healthSupportGuides.length <= 12, "support guide portfolio must contain 8-12 substantial guides");
  assert(trustPages.length >= 12, "public trust system must include author, sources, corrections, advertising, privacy and terms");

  const healthLayout = readFileSync(path.join(root, "app/health/layout.tsx"), "utf8");
  const reviewLayout = readFileSync(path.join(root, "app/health/review/layout.tsx"), "utf8");
  const sitemap = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert(!healthLayout.includes('process.env.VERCEL_ENV === "production"'), "public health routes must not retain a Production guard");
  assert(!healthLayout.includes("index: false"), "public health metadata must be indexable");
  assert(reviewLayout.includes('process.env.VERCEL_ENV === "production"'), "internal medical review routes must remain Production-blocked");
  assert(reviewLayout.includes("index: false"), "internal medical review routes must remain noindex");
  assert(sitemap.includes("healthArticles") && sitemap.includes("healthSupportGuides"), "health routes must drive the public sitemap");
  assert(!sitemap.includes("getSitemapPosts"), "legacy B2B posts must be retired from the sitemap");
  const syntheticEvidenceDir = path.join(root, "docs/health-v3/synthetic-reader-test");
  for (const name of ["README.md", "persona-contract.md", "round1-results.csv", "round1-findings.md", "minimal-remediation.csv", "round2-results.csv", "round2-comparison.md", "synthetic-validation-decision.md"]) {
    const evidencePath = path.join(syntheticEvidenceDir, name);
    assert(existsSync(evidencePath), `synthetic evidence missing: ${name}`);
    if (existsSync(evidencePath)) assert(readFileSync(evidencePath, "utf8").startsWith("# SYNTHETIC TEST — NOT REAL HUMAN FEEDBACK"), `synthetic label missing: ${name}`);
  }
  const round2Path = path.join(syntheticEvidenceDir, "round2-results.csv");
  if (existsSync(round2Path)) {
    const records = readFileSync(round2Path, "utf8").trim().split(/\r?\n/).slice(2);
    assert(records.length === 10, "round 2 must have ten synthetic persona records");
    assert(records.every((line) => line.startsWith("SYNTHETIC_PERSONA_SIMULATION,2,")), "round 2 taxonomy must be SYNTHETIC_PERSONA_SIMULATION");
  }
  const batch2Registry = path.join(root, "docs/health-v3/onurim/batch2-claim-registry.csv");
  assert(existsSync(batch2Registry), "Batch 2 claim registry missing");
  if (existsSync(batch2Registry)) assert(readFileSync(batch2Registry, "utf8").trim().split(/\r?\n/).length === 49, "Batch 2 claim registry must contain forty-eight records");
  results.guides = Object.keys(healthArticles).length;
  results.actionTools = healthTools.length;
  results.supportGuides = healthSupportGuides.length;
  results.trustPages = trustPages.length;
  results.publicProductionGuardRemoved = true;
  results.internalReviewProductionGuard = true;
  results.syntheticEvidence = "PASS";
}

function auditClaims() {
  const claimIds = new Set<string>();
  const sourceIds = new Set(healthSources.map((source) => source.id));
  for (const claim of healthClaims) {
    assert(!claimIds.has(claim.id), `duplicate claim id: ${claim.id}`);
    claimIds.add(claim.id);
    assert(claim.sourceIds.length > 0, `claim has no source: ${claim.id}`);
    for (const sourceId of claim.sourceIds) assert(sourceIds.has(sourceId), `unknown source ${sourceId} on ${claim.id}`);
    if (claim.clinicalReviewRequired || claim.riskClass === "P0_EMERGENCY" || claim.riskClass === "P1_CLINICAL")
      assert(publicReleaseAdjudications.some((item) => item.claimId === claim.id), `public safety adjudication missing: ${claim.id}`);
  }

  for (const article of Object.values(healthArticles)) {
    const usedIds = [
      ...article.sections.flatMap((section) => section.claimIds),
      ...article.faq.flatMap((item) => item.claimIds),
    ];
    for (const id of usedIds) assert(claimIds.has(id), `article references unknown claim: ${id}`);
    assert(article.sections.some((section) => section.tone === "warning"), `${article.slug} needs an emergency section`);
    assert(article.sourceIds.length >= 3, `${article.slug} needs at least three official sources`);
    assert(article.imageIds.length >= 3, `${article.slug} needs hero, explainer and action visuals`);
    assert(healthTools.filter((tool) => tool.articleSlug === article.slug).length >= 1, `${article.slug} needs at least one action tool`);
  }

  for (const tool of healthTools) {
    assert(tool.claimIds.length > 0, `tool has no claim mapping: ${tool.slug}`);
    for (const id of tool.claimIds) assert(claimIds.has(id), `tool references unknown claim: ${tool.slug}/${id}`);
  }
  assert(healthClaims.length >= 140, "twenty-guide Claim registry is unexpectedly small");
  results.claims = healthClaims.length;
  results.highRiskClaims = healthClaims.filter((claim) => claim.clinicalReviewRequired).length;
  results.publicSafetyAdjudications = publicReleaseAdjudications.length;
  results.unresolvedPublicHighRiskClaims = publicMedicalSafetyState.unresolvedPublicHighRiskClaims;
  results.unresolvedSourceMappings = failures.filter((failure) => failure.includes("source")).length;
}

function auditSafety() {
  const content = textValues({ healthArticles, healthTools, trustPages }).join("\n");
  const criticalPatterns = [
    /복용량을 .*늘리/i,
    /복용량을 .*줄이/i,
    /약을 .*끊으세요/i,
    /당신은 .*당뇨/i,
    /당신은 .*고혈압/i,
    /완치.*보장/i,
    /기적의/i,
    /영양제.*치료/i,
  ];
  for (const pattern of criticalPatterns) assert(!pattern.test(content), `unsafe wording matched: ${pattern}`);

  for (const article of Object.values(healthArticles)) {
    const articleText = textValues(article).join(" ");
    const hasP0Claim = publicReleaseAdjudications.some((item) => item.articleSlug === article.slug && item.riskClass === "P0_EMERGENCY");
    if (hasP0Claim) assert(articleText.includes("119"), `${article.slug} P0 guidance must include emergency action`);
    assert(articleText.includes("스스로") || articleText.includes("혼자"), `${article.slug} must state a self-care limit`);
  }
  assert(
    content.includes("의료인 검수 미완료")
      || content.includes("의료인 검수는 미완료")
      || content.includes("의료인 검수는 완료되지")
      || content.includes("MEDICAL_REVIEW_COMPLETED = NO"),
    "medical review must not be implied",
  );
  assert(publicMedicalSafetyState.unresolvedPublicHighRiskClaims === 0, "unresolved public high-risk Claim remains");
  assert(publicMedicalSafetyState.licensedMedicalReviewCompleted === false, "licensed medical review must not be fabricated");
  for (const item of publicReleaseAdjudications.filter((entry) => entry.claimId.includes("-P3-") && entry.riskClass === "P0_EMERGENCY")) {
    assert(item.sourceIds.length >= 2, `new public P0 Claim needs two authoritative sources: ${item.claimId}`);
  }
  results.medicalSafety = failures.length === 0 ? "PASS" : "BLOCKED_MEDICAL_SAFETY_FINDING";
}

function auditSources() {
  const ids = new Set<string>();
  for (const source of healthSources) {
    assert(!ids.has(source.id), `duplicate source id: ${source.id}`);
    ids.add(source.id);
    assert(source.url.startsWith("https://"), `source must use https: ${source.id}`);
    assert(Boolean(source.retrievedAt), `source retrieval date missing: ${source.id}`);
  }
  assert(healthSources.some((source) => source.organization.includes("질병관리청")), "Korean Tier 1 source missing");
  assert(healthSources.some((source) => source.organization.includes("NIDDK")), "international Tier 1 source missing");
  assert(healthSources.some((source) => source.organization.includes("NIAMS")), "musculoskeletal Tier 1 source missing");
  assert(healthSources.some((source) => source.organization.includes("MedlinePlus")), "allergy Tier 1 source missing");
  results.sources = healthSources.length;
}

function auditImages() {
  const manifestPath = path.join(root, "docs/health-v3/onurim/visual-assets.json");
  assert(existsSync(manifestPath), "visual asset manifest missing");
  if (!existsSync(manifestPath)) return;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Array<{
    id: string;
    file: string;
    sha256: string;
    claimIds: string[];
    altText: string;
    state: string[];
  }>;
  assert(manifest.length >= 60, "public portfolio requires at least sixty final visual assets");
  const claimIds = new Set(healthClaims.map((claim) => claim.id));
  for (const asset of manifest) {
    const filePath = path.join(root, asset.file);
    assert(existsSync(filePath), `image file missing: ${asset.file}`);
    assert(asset.claimIds.length > 0, `image claim mapping missing: ${asset.id}`);
    for (const claimId of asset.claimIds) assert(claimIds.has(claimId), `image claim mapping is unknown: ${asset.id}/${claimId}`);
    assert(Boolean(asset.altText), `image alt text missing: ${asset.id}`);
    for (const state of ["ORIGINAL_EDUCATIONAL_ART", "ALT_TEXT_PRESENT", "PRIVACY_SAFE"])
      assert(asset.state.includes(state), `image ${asset.id} missing state ${state}`);
    assert(asset.state.includes("MEDICAL_CLAIM_VERIFIED") || asset.state.includes("SOURCE_CONCEPT_CHECKED"), `image ${asset.id} missing source-concept state`);
    if (existsSync(filePath)) {
      const actualHash = createHash("sha256").update(readFileSync(filePath)).digest("hex");
      assert(actualHash === asset.sha256, `image hash mismatch: ${asset.id}`);
    }
  }
  for (const article of Object.values(healthArticles)) {
    const visualCount = manifest.filter((asset) => asset.file.includes(`/onurim/${article.slug}/`)).length;
    assert(visualCount >= 3, `${article.slug} needs three mapped visual assets`);
  }
  results.visualAssets = manifest.length;
}

function auditGenericness() {
  const articleTexts = Object.values(healthArticles).map((article) => textValues(article).join(" "));
  const combined = articleTexts.join(" ");
  const bannedOpenings = ["오늘은", "건강은 무엇보다 중요", "결론적으로"];
  for (const phrase of bannedOpenings) assert(!combined.includes(phrase), `generic phrase found: ${phrase}`);

  const importantCount = (combined.match(/중요합니다/g) ?? []).length;
  const helpfulCount = (combined.match(/도움이 됩니다/g) ?? []).length;
  assert(importantCount <= 5, `excessive 중요합니다: ${importantCount}`);
  assert(helpfulCount <= 5, `excessive 도움이 됩니다: ${helpfulCount}`);
  const titleSequences = new Set(Object.values(healthArticles).map((article) => article.sections.map((section) => section.title).join(" | ")));
  assert(titleSequences.size === Object.keys(healthArticles).length, "article section sequences are suspiciously identical");
  results.aiGenericness = failures.length === 0 ? "AI_GENERICNESS_LOW" : "AI_GENERICNESS_HIGH";
  results.importantPhraseCount = importantCount;
  results.helpfulPhraseCount = helpfulCount;
}

function auditMedicalReview() {
  const highRiskClaims = healthClaims.filter((claim) => claim.clinicalReviewRequired);
  const packetClaimIds = new Set(medicalReviewClaims.map((claim) => claim.claimId));
  assert(medicalReviewClaims.length === 47, "medical review packet must contain exactly 47 Claims");
  assert(highRiskClaims.length === 47, "canonical content must contain exactly 47 clinical-review-required Claims");
  assert(packetClaimIds.size === 47, "medical review packet Claim IDs must be unique");
  for (const claim of highRiskClaims) assert(packetClaimIds.has(claim.id), `high-risk Claim missing from packet: ${claim.id}`);

  assert(/^ONURIM-MEDICAL-REVIEW-\d{4}-\d{2}-\d{2}-v\d+$/.test(medicalReviewPacketVersion), "medical review packet version is invalid");
  assert(/^[a-f0-9]{64}$/.test(medicalReviewPacketHash), "medical review packet hash must be SHA-256");
  assert(new Set(medicalReviewClaims.map((claim) => claim.claimVersionHash)).size === 47, "Claim version hashes must be unique");
  for (const claim of medicalReviewClaims) {
    assert(/^[a-f0-9]{64}$/.test(claim.claimVersionHash), `Claim version hash is invalid: ${claim.claimId}`);
    assert(claim.packetHash === medicalReviewPacketHash, `packet hash mismatch: ${claim.claimId}`);
    assert(claim.sources.length > 0, `medical review Claim has no official source: ${claim.claimId}`);
    assert(Boolean(claim.reviewQuestion), `medical review question missing: ${claim.claimId}`);
    for (const source of claim.sources) assert(source.url.startsWith("https://"), `medical review source must use https: ${claim.claimId}/${source.id}`);
  }

  const csv = serializeMedicalReviewCsv(createMedicalReviewCsvRows());
  const csvRows = parseMedicalReviewCsv(csv);
  assert(csvRows.length === 47, "blank medical review CSV must contain exactly 47 rows");
  assert(csvRows.every((row) => row.decision === ""), "blank medical review CSV must not fabricate decisions");
  assert(csvRows.every((row) => row.reviewer_real_name === ""), "blank medical review CSV must not fabricate a reviewer");
  assert(csvRows.every((row) => row.workflow_state === "ONURIM_MEDICAL_REVIEW_PACKAGE_READY"), "blank medical review CSV must preserve package-ready state");

  assert(currentMedicalReviewState.packageStatus === "ONURIM_MEDICAL_REVIEW_PACKAGE_READY", "repository medical review status must be package ready");
  assert(currentMedicalReviewState.reviewerAssignmentStatus === "LICENSED_REVIEWER_SOURCING", "reviewer sourcing status must remain explicit");
  assert(currentMedicalReviewState.reviewerAssigned === false, "repository must not fabricate reviewer assignment");
  assert(currentMedicalReviewState.medicalReviewInProgress === false, "repository must not fabricate medical review progress");
  assert(currentMedicalReviewState.medicalReviewCompleted === false, "repository must not fabricate medical review completion");
  assert(currentMedicalReviewState.realHumanReaderTestPerformed === false, "repository must not fabricate real reader testing");

  const pagePath = path.join(root, "app/health/review/medical/page.tsx");
  const routePath = path.join(root, "app/health/review/medical/packet.csv/route.ts");
  const componentPath = path.join(root, "components/health/MedicalReviewWorkspace.tsx");
  const packageReadmePath = path.join(root, "docs/health-v3/medical-review-package/README.md");
  const contentStatusPath = path.join(root, "docs/health-v3/onurim/content-status.md");
  for (const filePath of [pagePath, routePath, componentPath, packageReadmePath, contentStatusPath]) {
    assert(existsSync(filePath), `medical review artifact missing: ${path.relative(root, filePath)}`);
  }
  if (existsSync(routePath)) {
    const route = readFileSync(routePath, "utf8");
    assert(route.includes('process.env.VERCEL_ENV === "production"'), "medical review CSV route needs its own Production guard");
    assert(route.includes('"X-Robots-Tag"'), "medical review CSV route must send noindex headers");
  }
  if (existsSync(componentPath)) {
    const component = readFileSync(componentPath, "utf8");
    for (const decision of ["APPROVE", "REVISE", "REMOVE", "SPECIALIST_REQUIRED"]) {
      assert(component.includes(decision), `medical review UI missing decision: ${decision}`);
    }
    assert(component.includes("입력은 서버에 저장되지 않습니다"), "medical review UI must disclose non-persistence");
    assert(component.includes("환자정보를 입력하지 않습니다"), "medical review UI must prohibit patient data");
  }
  if (existsSync(contentStatusPath)) {
    const contentStatus = readFileSync(contentStatusPath, "utf8");
    assert(contentStatus.includes("ONURIM_MEDICAL_REVIEW_PACKAGE_READY"), "content status must preserve the medical-review package gate");
    assert(!contentStatus.includes("ONURIM_READER_TEST_REQUIRED"), "reader testing must not precede the medical review gate");
  }

  const trustText = textValues(trustPages).join("\n");
  const publicTruthStatements = [
    ["package ready", "기존 47개 고위험 문장의 현재 표현·공식 출처·위험등급·검토 질문을 묶은 패킷이 준비되어 있습니다."],
    ["reviewer not assigned", "현재 면허 의료인 검토자는 미배정"],
    ["review not in progress", "의료 검수는 시작되지 않았"],
    ["medical review not completed", "의료 검수는 미완료"],
    ["real reader test not performed", "실제 일반 독자 테스트도 아직 실시하지 않았습니다."],
  ] as const;
  for (const [state, statement] of publicTruthStatements) {
    assert(trustText.includes(statement), `medical review trust truth statement missing: ${state}`);
  }

  results.medicalReviewPackage = "ONURIM_MEDICAL_REVIEW_PACKAGE_READY";
  results.medicalReviewPacketClaims = medicalReviewClaims.length;
  results.medicalReviewPacketHash = medicalReviewPacketHash;
  results.reviewerAssigned = false;
  results.medicalReviewInProgress = false;
  results.medicalReviewCompleted = false;
  results.realHumanReaderTest = "NOT_PERFORMED";
}

const modes: Record<Exclude<Mode, "all">, () => void> = {
  content: auditContent,
  claims: auditClaims,
  safety: auditSafety,
  sources: auditSources,
  images: auditImages,
  genericness: auditGenericness,
  "medical-review": auditMedicalReview,
};

if (mode === "all") Object.values(modes).forEach((audit) => audit());
else if (mode in modes) modes[mode as Exclude<Mode, "all">]();
else failures.push(`unknown mode: ${mode}`);

console.log(JSON.stringify({ mode, results, failures }, null, 2));
if (failures.length > 0) process.exitCode = 1;
