import fs from "node:fs";
import path from "node:path";

import {
  evidenceManifestSchema,
  type PublicEvidenceItem,
} from "@/lib/evidence-schema";
import {
  isCandidateEvidenceVisible,
  type EvidenceRuntime,
} from "@/lib/evidence-visibility";

const runtimeManifestPath = path.join(
  process.cwd(),
  "data",
  "evidence-runtime-manifest.json",
);
const manifest = fs.existsSync(runtimeManifestPath)
  ? evidenceManifestSchema.parse(
      JSON.parse(fs.readFileSync(runtimeManifestPath, "utf8")),
    )
  : [];

export { isCandidateEvidenceVisible };
export type { EvidenceRuntime };

export function getEvidenceForPost(
  postSlug: string,
  runtime: EvidenceRuntime | string = {},
): PublicEvidenceItem[] {
  const showCandidates = isCandidateEvidenceVisible(
    typeof runtime === "string" ? { vercelEnvironment: runtime } : runtime,
  );

  return manifest.filter(
    (item): item is PublicEvidenceItem =>
      item.postSlug === postSlug &&
      (item.status === "approved" ||
        (showCandidates && item.status === "candidate")),
  );
}

export function getReviewableEvidence(
  runtime: EvidenceRuntime | string = {},
): PublicEvidenceItem[] {
  const showCandidates = isCandidateEvidenceVisible(
    typeof runtime === "string" ? { vercelEnvironment: runtime } : runtime,
  );
  return manifest.filter(
    (item): item is PublicEvidenceItem =>
      item.status === "approved" ||
      (showCandidates && item.status === "candidate"),
  );
}

export function hasReviewableEvidence(
  postSlug: string,
  runtime: EvidenceRuntime | string = {},
) {
  return getEvidenceForPost(postSlug, runtime).length > 0;
}
