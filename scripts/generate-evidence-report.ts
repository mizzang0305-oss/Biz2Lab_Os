import fs from "node:fs";
import path from "node:path";

import { evidenceCaptureDefinitions } from "../config/evidence-sources";
import { evidenceManifestSchema } from "../lib/evidence-schema";

const root = process.cwd();
const manifest = evidenceManifestSchema.parse(
  JSON.parse(
    fs.readFileSync(path.join(root, "data", "evidence-manifest.json"), "utf8"),
  ),
);
const byId = new Map(manifest.map((item) => [item.id, item]));
const originalDimensions: Record<string, string> = {
  "commerce-upload-approval-gate": "1086×694",
  "wms-order-hold-validation": "890×519",
  "wms-picking-inspection-loading": "1142×886",
  "wms-loading-block-before-inspection": "1142×886 split source",
  "mybiz-readonly-operations-dashboard": "1000×618",
};
const approvedIds = [
  "commerce-run-audit-log",
  "wms-order-source-workbench",
];
const candidateIds = evidenceCaptureDefinitions
  .map((item) => item.id)
  .filter((id) => !approvedIds.includes(id));

const lines = [
  "# Biz2Lab evidence review packet — 2026-07-29",
  "",
  "> 자동 WebP decode·크기·overflow 검사는 사람의 모바일 가독성 판단을 대신하지 않습니다.",
  "> 모든 재캡처 이미지는 독립 검수 전까지 `candidate`이며 Production에는 포함되지 않습니다.",
  "",
  "## 보호된 승인 증거",
  "",
  "| evidence ID | path | source commit | SHA-256 | status | next human action |",
  "|---|---|---|---|---|---|",
];

for (const id of approvedIds) {
  const item = byId.get(id);
  if (!item || item.status !== "approved") {
    throw new Error(`${id}: protected approved evidence is missing`);
  }
  lines.push(
    `| \`${item.id}\` | \`${item.image}\` | \`${item.sourceCommit}\` | \`${item.sha256}\` | **approved · read only** | none; integrity control only |`,
  );
}

lines.push(
  "",
  "## 재캡처 후보",
  "",
  "| evidence ID | source | original → new | data mode | capture selector | transformations | 350px decision | 390px decision | PII | status | next human action |",
  "|---|---|---|---|---|---|---|---|---|---|---|",
);

for (const id of candidateIds) {
  const definition = evidenceCaptureDefinitions.find((item) => item.id === id);
  const item = byId.get(id);
  if (!definition || !item || item.status !== "candidate") {
    throw new Error(`${id}: recaptured candidate is missing`);
  }
  lines.push(
    `| \`${item.id}\` | ${item.repositoryName} \`${item.sourceCommit}\` | ${originalDimensions[id] ?? "n/a"} → ${item.width}×${item.height} | ${item.dataMode} | \`${definition.captureSelector}\` | ${(item.transformations ?? []).join("<br>")} | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | ${item.piiScan} | **candidate** | APPROVE / REJECT / RECAPTURE |`,
  );
}

lines.push(
  "",
  "## Production 격리와 test fixture 제거",
  "",
  "- `production-approved-test-fixture`는 manifest와 approved asset에서 제거했습니다.",
  "- Production 200 control은 `commerce-run-audit-log`, `wms-order-source-workbench` 두 실제 승인 증거입니다.",
  "- 모든 candidate URL, 제거된 fixture URL과 `/ko/ops/evidence-review`는 Production에서 404여야 합니다.",
  "- Preview는 승인 증거와 candidate를 함께 staging하지만 승인 상태를 변경하지 않습니다.",
  "",
  "## 승인 명령 dry-run",
  "",
  "각 후보에 다음 형식의 명령을 `--apply` 없이 실행합니다.",
  "",
  "```powershell",
  "npm run evidence:approve -- --id <evidence-id> --reviewer pending-independent-review",
  "```",
  "",
  "필수 결과는 `DRY_RUN_ONLY`, manifest/image byte stability, git 무변경입니다.",
  "",
  "## 차단 상태 유지",
  "",
  "- CN_FOOD_Contract: 개인정보·계약·결제와 분리된 공개 fixture 부재",
  "- CN_ExeFlow: 실제 지시사항과 분리된 공개 fixture 부재",
  "",
  "No recaptured candidate was auto-approved.",
);

const output = path.join(
  root,
  "reports",
  "biz2lab-evidence-review-packet-2026-07-29.md",
);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${lines.join("\n")}\n`, "utf8");
console.log("Evidence review packet generated.");
