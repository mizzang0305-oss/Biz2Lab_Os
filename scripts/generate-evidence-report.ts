import fs from "node:fs";
import path from "node:path";

import { evidenceCaptureDefinitions } from "../config/evidence-sources";
import { evidenceManifestSchema } from "../lib/evidence-schema";

const manifest = evidenceManifestSchema.parse(
  JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "evidence-manifest.json"), "utf8")),
);
const byId = new Map(manifest.map((item) => [item.id, item]));
const lines = [
  "# Biz2Lab evidence review packet — 2026-07-29",
  "",
  "> 자동 검사 통과는 공개 승인이 아닙니다. 모든 새 이미지는 사람이 확인하기 전까지 `candidate`입니다.",
  "> GitHub 공개 PR branch와 commit은 비공개 저장소가 아닙니다. 후보 바이너리를 `public/` 밖에 두는 조치는 URL 직접 노출을 막지만 저장소 읽기 권한 자체를 제한하지 않습니다.",
  "",
  "| evidence ID | post | project | source commit | screenshot | data mode | masked | PII scan | claim supported | claim not supported | status | reviewer action |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|---|",
];

for (const definition of evidenceCaptureDefinitions) {
  const item = byId.get(definition.id);
  const publicItem =
    item?.status === "candidate" || item?.status === "approved" ? item : undefined;
  lines.push(
    publicItem
      ? `| ${publicItem.id} | ${publicItem.postSlug} | ${publicItem.projectLabelKo} | \`${publicItem.sourceCommit}\` | \`${publicItem.image}\` | ${publicItem.dataMode} | ${publicItem.redactions.join(", ") || "none"} | ${publicItem.piiScan} | ${publicItem.claimSupportedKo} | ${publicItem.claimNotSupportedKo} | **${publicItem.status}** | APPROVE / REJECT / RECAPTURE |`
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
  "기본 명령은 현재 이미지 SHA와 source commit, PII scan을 다시 확인하고 diff 및 `DRY_RUN_ONLY`만 출력합니다. 실제 로컬 반영은 사람이 검토한 뒤 같은 명령 끝에 `--apply`를 명시해야 하며 git, push, deploy는 수행하지 않습니다.",
  "",
  "## 이번 단계에서 차단한 프로젝트",
  "",
  "- CN_FOOD_Contract: 전자계약·결제 화면은 안전한 전용 fixture와 개인정보 비포함 캡처 경계가 없어 manifest에 추가하지 않았습니다.",
  "- CN_ExeFlow: 실제 지시사항 데이터와 분리된 공개 전용 fixture가 없어 manifest에 추가하지 않았습니다.",
);

fs.mkdirSync(path.join(process.cwd(), "reports"), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), "reports", "biz2lab-evidence-review-packet-2026-07-29.md"),
  `${lines.join("\n")}\n`,
);
console.log("Evidence review packet generated.");
