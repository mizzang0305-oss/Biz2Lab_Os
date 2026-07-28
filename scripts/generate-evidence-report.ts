import fs from "node:fs";
import path from "node:path";

import { evidenceCaptureDefinitions } from "../config/evidence-sources";
import { evidenceManifestSchema } from "../lib/evidence-schema";

const manifest = evidenceManifestSchema.parse(
  JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "evidence-manifest.json"), "utf8")),
);
const byId = new Map(manifest.map((item) => [item.id, item]));
const lines = [
  "# Biz2Lab evidence review packet — 2026-07-28",
  "",
  "> 자동 검사 통과는 공개 승인이 아닙니다. 모든 새 이미지는 사람이 확인하기 전까지 `candidate`입니다.",
  "",
  "| evidence ID | post | project | source commit | screenshot | data mode | masked | PII scan | claim supported | claim not supported | status | reviewer action |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|---|",
];

for (const definition of evidenceCaptureDefinitions) {
  const item = byId.get(definition.id);
  lines.push(
    item
      ? `| ${item.id} | ${item.postSlug} | ${item.projectLabelKo} | \`${item.sourceCommit}\` | \`${item.image}\` | ${item.dataMode} | ${item.redactions.join(", ") || "none"} | ${item.piiScan} | ${item.claimSupportedKo} | ${item.claimNotSupportedKo} | **${item.status}** | APPROVE / REJECT / RECAPTURE |`
      : `| ${definition.id} | ${definition.postSlug} | ${definition.projectLabelKo} | - | - | ${definition.dataMode} | ${definition.maskSelectors.join(", ") || "none"} | blocked | ${definition.claimSupportedKo} | ${definition.claimNotSupportedKo} | **blocked** | RECAPTURE |`,
  );
}

lines.push(
  "",
  "## 승인 명령",
  "",
  "```powershell",
  "npm run evidence:approve -- --id <evidence-id> --reviewer <reviewer-id>",
  "```",
  "",
  "승인 명령은 현재 이미지 SHA와 source commit, PII scan을 다시 확인하고 diff만 출력합니다. 이 패킷 생성 과정에서는 실행하지 않습니다.",
);

fs.mkdirSync(path.join(process.cwd(), "reports"), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), "reports", "biz2lab-evidence-review-packet-2026-07-28.md"),
  `${lines.join("\n")}\n`,
);
console.log("Evidence review packet generated.");
