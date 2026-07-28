import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { evidenceAssetPath, evidencePublicDirectory } from "../lib/evidence-assets";
import {
  evidenceManifestSchema,
  type PublicEvidenceItem,
} from "../lib/evidence-schema";
import { isCandidateEvidenceVisible } from "../lib/evidence-visibility";

export type StageEvidenceOptions = {
  root?: string;
  manifestPath?: string;
  destination?: string;
  runtimeManifestPath?: string;
  runtime?: {
    vercelEnvironment?: string;
    nodeEnvironment?: string;
    reviewMode?: string;
  };
};

export function stageEvidenceAssets(options: StageEvidenceOptions = {}) {
  const root = options.root ?? process.cwd();
  const manifestPath =
    options.manifestPath ?? path.join(root, "data", "evidence-manifest.json");
  const destination = options.destination ?? evidencePublicDirectory(root);
  const runtimeManifestPath =
    options.runtimeManifestPath ??
    path.join(root, "data", "evidence-runtime-manifest.json");
  const manifest = evidenceManifestSchema.parse(
    JSON.parse(fs.readFileSync(manifestPath, "utf8")),
  );
  const showCandidates = isCandidateEvidenceVisible(options.runtime);
  const selected = manifest.filter(
    (item): item is PublicEvidenceItem =>
      item.status === "approved" ||
      (showCandidates && item.status === "candidate"),
  );

  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });
  fs.mkdirSync(path.dirname(runtimeManifestPath), { recursive: true });

  for (const item of selected) {
    const source = evidenceAssetPath(root, item);
    if (!fs.existsSync(source)) {
      throw new Error(`${item.id}: source asset is missing`);
    }
    const bytes = fs.readFileSync(source);
    const digest = createHash("sha256").update(bytes).digest("hex");
    if (digest !== item.sha256) {
      throw new Error(`${item.id}: source asset SHA-256 mismatch`);
    }
    fs.copyFileSync(source, path.join(destination, path.basename(item.image)));
  }
  fs.writeFileSync(
    runtimeManifestPath,
    `${JSON.stringify(selected, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Evidence staging passed (${selected.length} assets; candidates ${
      showCandidates ? "enabled" : "disabled"
    }).`,
  );
  return selected.map((item) => item.id);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  stageEvidenceAssets({
    runtime: {
      vercelEnvironment: process.env.VERCEL_ENV,
      nodeEnvironment:
        process.env.NODE_ENV ??
        (process.env.npm_lifecycle_event === "predev" ? "development" : undefined),
      reviewMode: process.env.EVIDENCE_REVIEW_MODE,
    },
  });
}
