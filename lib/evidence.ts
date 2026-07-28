import manifestJson from "@/data/evidence-manifest.json";
import {
  evidenceManifestSchema,
  type EvidenceItem,
} from "@/lib/evidence-schema";

const manifest = evidenceManifestSchema.parse(manifestJson);

export function getEvidenceForPost(
  postSlug: string,
  vercelEnvironment = process.env.VERCEL_ENV,
): EvidenceItem[] {
  const production = vercelEnvironment === "production";

  return manifest.filter(
    (item) =>
      item.postSlug === postSlug &&
      (item.status === "approved" ||
        (!production && item.status === "candidate")),
  );
}

export function hasReviewableEvidence(
  postSlug: string,
  vercelEnvironment = process.env.VERCEL_ENV,
) {
  return getEvidenceForPost(postSlug, vercelEnvironment).length > 0;
}
