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
  assert(Object.keys(healthArticles).length === 2, "exactly two pilot articles must exist");
  assert(healthTools.length === 8, "exactly eight pilot action tools must exist");
  assert(trustPages.length === 9, "all nine trust pages must exist");
  assert(!("stroke" in healthArticles), "stroke page must not be implemented");
  assert(!("myocardial-infarction" in healthArticles), "myocardial infarction page must not be implemented");

  const healthLayout = readFileSync(path.join(root, "app/health/layout.tsx"), "utf8");
  const sitemap = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert(healthLayout.includes('process.env.VERCEL_ENV === "production"'), "health routes need a Production environment guard");
  assert(healthLayout.includes("index: false") && healthLayout.includes("follow: false"), "health metadata must be noindex and nofollow");
  assert(!sitemap.includes('"/health'), "health routes must be excluded from the sitemap");
  results.pilotArticles = Object.keys(healthArticles).length;
  results.actionTools = healthTools.length;
  results.trustPages = trustPages.length;
  results.productionGuard = true;
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
    assert(article.sourceIds.length >= 5, `${article.slug} needs at least five official sources`);
  }

  for (const tool of healthTools) {
    assert(tool.claimIds.length > 0, `tool has no claim mapping: ${tool.slug}`);
    for (const id of tool.claimIds) assert(claimIds.has(id), `tool references unknown claim: ${tool.slug}/${id}`);
  }
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
  assert(manifest.length === 8, "exactly eight final visual assets are required");
  for (const asset of manifest) {
    const filePath = path.join(root, asset.file);
    assert(existsSync(filePath), `image file missing: ${asset.file}`);
    assert(asset.claimIds.length > 0, `image claim mapping missing: ${asset.id}`);
    assert(Boolean(asset.altText), `image alt text missing: ${asset.id}`);
    for (const state of ["ORIGINAL_EDUCATIONAL_ART", "MEDICAL_CLAIM_VERIFIED", "ALT_TEXT_PRESENT", "PRIVACY_SAFE"]) {
      assert(asset.state.includes(state), `image ${asset.id} missing state ${state}`);
    }
    if (existsSync(filePath)) {
      const actualHash = createHash("sha256").update(readFileSync(filePath)).digest("hex");
      assert(actualHash === asset.sha256, `image hash mismatch: ${asset.id}`);
    }
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
  assert(healthArticles.hypertension.sections[0].title !== healthArticles["type-2-diabetes"].sections[0].title ||
    healthArticles.hypertension.sections[1].title !== healthArticles["type-2-diabetes"].sections[1].title,
  "pilot section sequences are suspiciously identical");
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
