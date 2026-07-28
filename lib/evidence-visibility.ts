export type EvidenceRuntime = {
  vercelEnvironment?: string;
  nodeEnvironment?: string;
  reviewMode?: string;
};

export function isCandidateEvidenceVisible({
  vercelEnvironment = process.env.VERCEL_ENV,
  nodeEnvironment = process.env.NODE_ENV,
  reviewMode = process.env.EVIDENCE_REVIEW_MODE,
}: EvidenceRuntime = {}): boolean {
  if (vercelEnvironment === "preview") {
    return true;
  }

  return (
    !vercelEnvironment &&
    nodeEnvironment === "development" &&
    reviewMode === "true"
  );
}
