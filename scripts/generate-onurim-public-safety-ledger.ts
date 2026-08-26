import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { publicReleaseAdjudications } from "../lib/health-v3/public-safety";

function csv(value: string | boolean) {
  const text = String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

async function main() {
  const destination = path.join(process.cwd(), "docs/health-v3/onurim/public-release-safety-adjudication.csv");
  const header = [
    "claim_id", "guide_slug", "risk_class", "decision", "public_wording", "source_ids",
    "source_urls", "last_verified", "rationale", "licensed_medical_review_completed",
  ];
  const rows = publicReleaseAdjudications.map((item) => [
    item.claimId,
    item.articleSlug,
    item.riskClass,
    item.decision,
    item.publicWording,
    item.sourceIds.join("|"),
    item.sourceUrls.join("|"),
    item.lastVerified,
    item.rationale,
    item.licensedMedicalReviewCompleted,
  ].map(csv).join(","));
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, `${header.join(",")}\n${rows.join("\n")}\n`, "utf8");
  console.log(`ONURIM_PUBLIC_SAFETY_LEDGER_ROWS=${rows.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
