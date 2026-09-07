import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { healthArticles, healthClaims } from "../lib/health-v3/content";

type ManifestAsset = {
  id: string;
  file: string;
  dimensions: string;
  sha256: string;
  claimIds: string[];
  altText: string;
  caption: string;
  state: string[];
  licensedMedicalReviewCompleted?: boolean;
};

type ImageRecord = {
  id: string;
  file: string;
  exists: boolean;
  format: string;
  width: number;
  height: number;
  declared_width: number;
  declared_height: number;
  file_size_bytes: number;
  alt_text: string;
  caption: string;
  article_slug: string;
  article_relevance: string;
  exact_duplicate_count: number;
  nearest_visual_distance: number;
  duplicate_risk: string;
  loading_strategy: string;
  medical_accuracy: string;
  privacy: string;
  claim_ids: string;
  audit_result: string;
};

const root = process.cwd();
const manifestPath = path.join(root, "docs/health-v3/onurim/visual-assets.json");
const outputPath = path.join(root, "docs/health-v3/onurim/seo-v3/12-image-audit.csv");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as ManifestAsset[];
const articleSlugs = new Set(Object.keys(healthArticles));
const claimIds = new Set(healthClaims.map((claim) => claim.id));

function csv(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function hamming(left: string, right: string) {
  let distance = 0;
  for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
    if (left[index] !== right[index]) distance += 1;
  }
  return distance + Math.abs(left.length - right.length);
}

async function averageHash(filePath: string) {
  const { data } = await sharp(filePath).resize(8, 8, { fit: "fill" }).grayscale().raw().toBuffer({ resolveWithObject: true });
  const average = data.reduce((sum, value) => sum + value, 0) / data.length;
  return Array.from(data, (value) => value >= average ? "1" : "0").join("");
}

async function main() {
const inspected = await Promise.all(manifest.map(async (asset) => {
  const filePath = path.join(root, asset.file);
  const metadata = await sharp(filePath).metadata();
  const [declaredWidth, declaredHeight] = asset.dimensions.split("x").map(Number);
  const slug = asset.file.match(/public\/images\/onurim\/([^/]+)\//)?.[1] ?? "UNKNOWN";
  const actualHash = createHash("sha256").update(readFileSync(filePath)).digest("hex");
  return {
    asset,
    slug,
    filePath,
    actualHash,
    declaredWidth,
    declaredHeight,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    format: metadata.format ?? "UNKNOWN",
    fileSize: statSync(filePath).size,
    averageHash: await averageHash(filePath),
  };
}));

const records: ImageRecord[] = inspected.map((item) => {
  const exactDuplicateCount = inspected.filter((candidate) => candidate.actualHash === item.actualHash).length - 1;
  const nearestVisualDistance = Math.min(...inspected.filter((candidate) => candidate.asset.id !== item.asset.id)
    .map((candidate) => hamming(candidate.averageHash, item.averageHash)));
  const unknownClaims = item.asset.claimIds.filter((id) => !claimIds.has(id));
  const stateReady = item.asset.state.includes("ALT_TEXT_PRESENT")
    && item.asset.state.includes("PRIVACY_SAFE")
    && item.asset.state.includes("ORIGINAL_EDUCATIONAL_ART")
    && (item.asset.state.includes("MEDICAL_CLAIM_VERIFIED") || item.asset.state.includes("SOURCE_CONCEPT_CHECKED"));
  const valid = item.actualHash === item.asset.sha256
    && item.format === "webp"
    && item.width === item.declaredWidth
    && item.height === item.declaredHeight
    && Boolean(item.asset.altText.trim())
    && Boolean(item.asset.caption.trim())
    && articleSlugs.has(item.slug)
    && unknownClaims.length === 0
    && exactDuplicateCount === 0
    && stateReady
    && item.asset.licensedMedicalReviewCompleted !== true;
  return {
    id: item.asset.id,
    file: item.asset.file,
    exists: true,
    format: item.format,
    width: item.width,
    height: item.height,
    declared_width: item.declaredWidth,
    declared_height: item.declaredHeight,
    file_size_bytes: item.fileSize,
    alt_text: item.asset.altText,
    caption: item.asset.caption,
    article_slug: item.slug,
    article_relevance: articleSlugs.has(item.slug) && item.asset.claimIds.length > 0 ? "ARTICLE_PATH_AND_CLAIM_MAPPED" : "REVIEW_REQUIRED",
    exact_duplicate_count: exactDuplicateCount,
    nearest_visual_distance: nearestVisualDistance,
    duplicate_risk: exactDuplicateCount > 0 ? "EXACT_DUPLICATE" : nearestVisualDistance <= 6 ? "VISUAL_SIMILARITY_REVIEW" : "LOW",
    loading_strategy: item.asset.file.endsWith("/hero.webp") ? "NEXT_IMAGE_PRELOAD_HERO" : "NEXT_IMAGE_DEFAULT_LAZY_BODY",
    medical_accuracy: item.asset.state.includes("SOURCE_CONCEPT_CHECKED")
      ? "SOURCE_CONCEPT_CHECKED;LICENSED_REVIEW_COMPLETED=NO"
      : "CLAIM_MAPPING_PRESENT;LICENSED_REVIEW_COMPLETED=NO",
    privacy: item.asset.state.includes("PRIVACY_SAFE") ? "PRIVACY_SAFE" : "REVIEW_REQUIRED",
    claim_ids: item.asset.claimIds.join("|"),
    audit_result: valid ? "PASS" : "FAIL",
  };
});

const headers = Object.keys(records[0]) as Array<keyof ImageRecord>;
const output = [headers.map(csv).join(","), ...records.map((record) => headers.map((header) => csv(record[header])).join(","))].join("\n") + "\n";
mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, output, "utf8");

const failures = records.filter((record) => record.audit_result === "FAIL");
console.log(JSON.stringify({
  assets: records.length,
  failures: failures.map((record) => record.id),
  exactDuplicates: records.filter((record) => record.exact_duplicate_count > 0).length,
  visualSimilarityReview: records.filter((record) => record.duplicate_risk === "VISUAL_SIMILARITY_REVIEW").length,
  totalBytes: records.reduce((sum, record) => sum + record.file_size_bytes, 0),
  output: path.relative(root, outputPath),
  limitations: "Static asset audit. Medical source/Claim mapping is verified; licensed medical review remains incomplete.",
}, null, 2));
if (failures.length > 0) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
