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

type Mode = "all" | "content" | "claims" | "safety" | "sources" | "images" | "genericness";

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
  const expectedArticles = ["hypertension", "type-2-diabetes", "allergic-rhinitis", "gastroesophageal-reflux-disease", "osteoarthritis", "osteoporosis"];
  assert(Object.keys(healthArticles).length === 6, "exactly six substantive guides must exist");
  for (const slug of expectedArticles) assert(slug in healthArticles, `required guide missing: ${slug}`);
  assert(healthTools.length === 20, "exactly twenty action tools must exist");
  assert(trustPages.length === 9, "all nine trust pages must exist");
  assert(!("stroke" in healthArticles), "stroke page must not be implemented");
  assert(!("myocardial-infarction" in healthArticles), "myocardial infarction page must not be implemented");

  const healthLayout = readFileSync(path.join(root, "app/health/layout.tsx"), "utf8");
  const sitemap = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert(healthLayout.includes('process.env.VERCEL_ENV === "production"'), "health routes need a Production environment guard");
  assert(healthLayout.includes("await connection()"), "health Production guard must evaluate at request time");
  assert(healthLayout.includes("index: false") && healthLayout.includes("follow: false"), "health metadata must be noindex and nofollow");
  assert(!sitemap.includes('"/health'), "health routes must be excluded from the sitemap");
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
  results.trustPages = trustPages.length;
  results.productionGuard = true;
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
    if (["EMERGENCY_SIGN", "TEST", "TREATMENT_OVERVIEW", "SELF_CARE_LIMIT"].includes(claim.type)) {
      assert(claim.clinicalReviewRequired, `high-risk claim must require clinical review: ${claim.id}`);
    }
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
    assert(healthTools.filter((tool) => tool.articleSlug === article.slug).length >= 3, `${article.slug} needs at least three action tools`);
  }

  for (const tool of healthTools) {
    assert(tool.claimIds.length > 0, `tool has no claim mapping: ${tool.slug}`);
    for (const id of tool.claimIds) assert(claimIds.has(id), `tool references unknown claim: ${tool.slug}/${id}`);
  }
  assert(healthClaims.length === 74, "exactly seventy-four claim records must exist");
  results.claims = healthClaims.length;
  results.highRiskClaims = healthClaims.filter((claim) => claim.clinicalReviewRequired).length;
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
    assert(articleText.includes("119"), `${article.slug} must include emergency action`);
    assert(articleText.includes("스스로") || articleText.includes("혼자"), `${article.slug} must state a self-care limit`);
  }
  assert(content.includes("의료인 검수 미완료") || content.includes("의료인 검수는 완료되지"), "medical review must not be implied");
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
  assert(manifest.length === 20, "exactly twenty final visual assets are required");
  const claimIds = new Set(healthClaims.map((claim) => claim.id));
  for (const asset of manifest) {
    const filePath = path.join(root, asset.file);
    assert(existsSync(filePath), `image file missing: ${asset.file}`);
    assert(asset.claimIds.length > 0, `image claim mapping missing: ${asset.id}`);
    for (const claimId of asset.claimIds) assert(claimIds.has(claimId), `image claim mapping is unknown: ${asset.id}/${claimId}`);
    assert(Boolean(asset.altText), `image alt text missing: ${asset.id}`);
    for (const state of ["ORIGINAL_EDUCATIONAL_ART", "MEDICAL_CLAIM_VERIFIED", "ALT_TEXT_PRESENT", "PRIVACY_SAFE"]) {
      assert(asset.state.includes(state), `image ${asset.id} missing state ${state}`);
    }
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
  assert(importantCount <= 2, `excessive 중요합니다: ${importantCount}`);
  assert(helpfulCount <= 2, `excessive 도움이 됩니다: ${helpfulCount}`);
  const titleSequences = new Set(Object.values(healthArticles).map((article) => article.sections.map((section) => section.title).join(" | ")));
  assert(titleSequences.size === Object.keys(healthArticles).length, "article section sequences are suspiciously identical");
  results.aiGenericness = failures.length === 0 ? "AI_GENERICNESS_LOW" : "AI_GENERICNESS_HIGH";
  results.importantPhraseCount = importantCount;
  results.helpfulPhraseCount = helpfulCount;
}

const modes: Record<Exclude<Mode, "all">, () => void> = {
  content: auditContent,
  claims: auditClaims,
  safety: auditSafety,
  sources: auditSources,
  images: auditImages,
  genericness: auditGenericness,
};

if (mode === "all") Object.values(modes).forEach((audit) => audit());
else if (mode in modes) modes[mode as Exclude<Mode, "all">]();
else failures.push(`unknown mode: ${mode}`);

console.log(JSON.stringify({ mode, results, failures }, null, 2));
if (failures.length > 0) process.exitCode = 1;
