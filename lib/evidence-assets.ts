import path from "node:path";

import type { PublicEvidenceItem } from "@/lib/evidence-schema";

export function evidenceAssetDirectory(
  root: string,
  status: PublicEvidenceItem["status"],
) {
  return path.join(
    root,
    "evidence-assets",
    status === "candidate" ? "candidates" : "approved",
  );
}

export function evidenceAssetPath(root: string, item: PublicEvidenceItem) {
  return path.join(evidenceAssetDirectory(root, item.status), path.basename(item.image));
}

export function evidencePublicDirectory(root: string) {
  return path.join(root, "public", "images", "evidence");
}
