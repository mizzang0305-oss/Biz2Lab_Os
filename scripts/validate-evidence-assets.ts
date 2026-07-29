import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { evidenceAssetPath } from "../lib/evidence-assets";
import {
  evidenceManifestSchema,
  type PublicEvidenceItem,
} from "../lib/evidence-schema";
import { getPublicPosts } from "../lib/posts";

async function main() {
  const root = process.cwd();
  const manifestPath = path.join(root, "data", "evidence-manifest.json");
  const raw = fs.readFileSync(manifestPath, "utf8");
  const manifest = evidenceManifestSchema.parse(JSON.parse(raw));
  const issues: string[] = [];

  if (/[A-Za-z]:\\|\/(?:Users|home)\//.test(raw)) {
    issues.push("public manifest contains an absolute local path");
  }

  for (const item of manifest) {
    if (item.status !== "candidate" && item.status !== "approved") continue;
    await validatePublicItem(root, item, issues);
  }

  for (const post of getPublicPosts()) {
    if (!post.frontmatter.evidenceRequired) continue;
    const evidence = manifest.filter((item) => item.postSlug === post.slug);
    const publicEvidence = evidence.filter(
      (item) => item.status === "candidate" || item.status === "approved",
    );
    const approvedEvidence = evidence.filter(
      (item) => item.status === "approved",
    );
    if (post.frontmatter.evidenceMode === "source-only") continue;
    if (publicEvidence.length === 0) {
      issues.push(`${post.slug}: Preview requires candidate or approved evidence`);
    }
    if (
      process.env.VERCEL_ENV === "production" &&
      approvedEvidence.length === 0
    ) {
      issues.push(`${post.slug}: Production requires approved evidence`);
    }
  }

  if (issues.length > 0) {
    console.error(issues.map((issue) => `- ${issue}`).join("\n"));
    process.exit(1);
  }

  console.log(`Evidence validation passed (${manifest.length} items).`);
}

async function validatePublicItem(
  root: string,
  item: PublicEvidenceItem,
  issues: string[],
) {
  const imagePath = evidenceAssetPath(root, item);
  if (!fs.existsSync(imagePath)) {
    issues.push(`${item.id}: ${item.status} source asset is missing`);
    return;
  }

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
  if (item.sourceDirty && item.status === "approved") {
    issues.push(`${item.id}: dirty source cannot be approved`);
  }
  if (
    item.status === "candidate" &&
    (!item.transformations || item.transformations.length === 0)
  ) {
    issues.push(`${item.id}: recaptured candidate transformations are missing`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
