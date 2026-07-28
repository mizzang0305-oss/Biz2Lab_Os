import { discoverEvidenceSources, redactPath } from "./evidence-utils";

const publicSafe = discoverEvidenceSources().map((source) => ({
  projectKey: source.projectKey,
  repositoryName: source.repositoryName,
  found: source.found,
  sourceCommit: source.sourceCommit,
  sourceDirty: source.sourceDirty,
  reason: source.reason ? redactPath(source.reason) : undefined,
}));

console.log(JSON.stringify(publicSafe, null, 2));
