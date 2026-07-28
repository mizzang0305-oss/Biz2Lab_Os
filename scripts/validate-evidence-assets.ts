import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { evidenceManifestSchema } from "../lib/evidence-schema";

async function main() {
const root = process.cwd();
const manifestPath = path.join(root, "data", "evidence-manifest.json");
const raw = fs.readFileSync(manifestPath, "utf8");
const manifest = evidenceManifestSchema.parse(JSON.parse(raw));
const issues: string[] = [];
const imageOwners = new Map<string, string>();

if (/[A-Za-z]:\\|\/(?:Users|home)\//.test(raw)) {
  issues.push("public manifest contains an absolute local path");
}

for (const item of manifest) {
  const imagePath = path.join(root, "public", item.image.replace(/^\//, ""));
  if (!fs.existsSync(imagePath)) {
    issues.push(`${item.id}: image is missing`);
    continue;
  }
  const owner = imageOwners.get(item.image);
  if (owner && owner !== item.postSlug) {
    issues.push(`${item.id}: image is reused by ${owner} and ${item.postSlug}`);
  }
  imageOwners.set(item.image, item.postSlug);

  const metadata = await sharp(imagePath).metadata();
  if (
    metadata.format !== "webp" ||
    metadata.width !== item.width ||
    metadata.height !== item.height
  ) {
    issues.push(`${item.id}: WebP metadata mismatch`);
  }
  const sha256 = createHash("sha256")
    .update(fs.readFileSync(imagePath))
    .digest("hex");
  if (sha256 !== item.sha256) {
    issues.push(`${item.id}: SHA-256 mismatch`);
  }
  if (item.piiScan !== "pass") {
    issues.push(`${item.id}: PII scan did not pass`);
  }
  if (item.sourceDirty && item.status === "approved") {
    issues.push(`${item.id}: dirty source cannot be approved`);
  }
  if (!/(로컬 데모|fixture|가상 데이터)/.test(item.captionKo)) {
    issues.push(`${item.id}: caption must identify demo or fixture data`);
  }
}

if (issues.length > 0) {
  console.error(issues.map((issue) => `- ${issue}`).join("\n"));
  process.exit(1);
}

console.log(`Evidence validation passed (${manifest.length} items).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
