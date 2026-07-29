import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { evidenceAssetPath } from "../lib/evidence-assets";
import {
  evidenceManifestSchema,
  type PublicEvidenceItem,
} from "../lib/evidence-schema";

const root = process.cwd();
const reviewRoot = path.resolve(root, "artifacts", "evidence", "review");
if (!reviewRoot.startsWith(`${path.resolve(root)}${path.sep}`)) {
  throw new Error("Unsafe evidence review output path.");
}
const manifest = evidenceManifestSchema.parse(
  JSON.parse(
    fs.readFileSync(path.join(root, "data", "evidence-manifest.json"), "utf8"),
  ),
);
const candidates = manifest.filter(
  (item): item is PublicEvidenceItem => item.status === "candidate",
);
const variants = [
  { directory: "original", width: undefined },
  { directory: "mobile-350", width: 350 },
  { directory: "mobile-390", width: 390 },
] as const;

async function main() {
  fs.rmSync(reviewRoot, { recursive: true, force: true });
  for (const variant of variants) {
    fs.mkdirSync(path.join(reviewRoot, variant.directory), { recursive: true });
  }

  for (const item of candidates) {
    const source = evidenceAssetPath(root, item);
    for (const variant of variants) {
      const output = path.join(
        reviewRoot,
        variant.directory,
        path.basename(item.image),
      );
      const image = sharp(source).rotate();
      if (variant.width) {
        image.resize({ width: variant.width, withoutEnlargement: false });
      }
      await image.webp({ quality: 90 }).toFile(output);
    }
  }

  console.log(
    `Evidence review renderings generated (${candidates.length} candidates × ${variants.length} variants).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
