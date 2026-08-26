import { createHash } from "node:crypto";

import { healthArticles, healthClaims, healthSources } from "./content";
import type { HealthClaim } from "./content";
import type {
  MedicalReviewClaimPacket,
  MedicalReviewEntry,
  MedicalReviewerAssignment,
  MedicalReviewWorkflowState,
} from "./medical-review-types";
import { createMedicalReviewCsvRowsFromClaims } from "./review-csv";

export const medicalReviewPacketVersion = "ONURIM-MEDICAL-REVIEW-2026-08-25-v1";

export const currentMedicalReviewState = {
  packageStatus: "ONURIM_MEDICAL_REVIEW_PACKAGE_READY" as const,
  reviewerAssignmentStatus: "LICENSED_REVIEWER_SOURCING" as const,
  reviewerAssigned: false,
  medicalReviewInProgress: false,
  medicalReviewCompleted: false,
  realHumanReaderTestPerformed: false,
};

const reviewQuestions: Record<HealthClaim["type"], string> = {
  DEFINITION: "정의가 공식 출처와 일치하고, 진단을 확정하거나 지나치게 단순화하는 표현이 없는가?",
  SYMPTOM: "증상 설명이 흔한 증상과 위험 신호를 적절히 구분하며 다른 원인을 배제하는 듯한 오해를 만들지 않는가?",
  EMERGENCY_SIGN: "응급 신호와 119·응급의료기관 안내가 정확하며 필요한 도움을 지연시키거나 과도한 공포를 만들지 않는가?",
  RISK_FACTOR: "위험 요인을 원인이나 개인의 확정적 예후처럼 표현하지 않았으며 중요한 예외가 누락되지 않았는가?",
  TEST: "검사 목적과 한계가 정확하며 수치만으로 독자가 진단·치료를 결정하게 만들지 않는가?",
  TREATMENT_OVERVIEW: "치료 개요가 현재 표준 진료와 부합하며 자가치료·약물 변경을 유도하지 않는가?",
  PREVENTION: "예방·생활관리 설명이 근거 수준에 맞고 효과를 보장하거나 치료를 대체하는 듯한 표현이 없는가?",
  SELF_CARE_LIMIT: "독자가 스스로 할 수 있는 범위와 의료진·응급 도움을 받아야 하는 경계가 임상적으로 안전하고 명확한가?",
  CAREGIVER_ACTION: "가족·보호자 행동이 안전하며 전문 진료나 응급 도움을 지연시키지 않는가?",
  MEASUREMENT_GUIDANCE: "측정 방법과 재측정·진료·응급 도움의 경계가 정확하고 숫자만으로 판단하게 만들지 않는가?",
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

const highRiskClaims = healthClaims.filter((claim) => claim.clinicalReviewRequired);
const claimHashes = highRiskClaims.map((claim) =>
  sha256(JSON.stringify({
    id: claim.id,
    articleSlug: claim.articleSlug,
    section: claim.section,
    text: claim.text,
    type: claim.type,
    sourceIds: [...claim.sourceIds].sort(),
    wordingRisk: claim.wordingRisk,
  })),
);

export const medicalReviewPacketHash = sha256(claimHashes.join("\n"));

export const medicalReviewClaims: MedicalReviewClaimPacket[] = highRiskClaims.map((claim, index) => ({
  packetVersion: medicalReviewPacketVersion,
  packetHash: medicalReviewPacketHash,
  claimVersionHash: claimHashes[index],
  claimId: claim.id,
  articleSlug: claim.articleSlug,
  articleTitle: healthArticles[claim.articleSlug].title,
  section: claim.section,
  claimType: claim.type,
  currentText: claim.text,
  wordingRisk: claim.wordingRisk,
  reviewQuestion: reviewQuestions[claim.type],
  sources: claim.sourceIds.map((sourceId) => {
    const source = healthSources.find((item) => item.id === sourceId);
    if (!source) throw new Error(`Unknown medical review source: ${claim.id}/${sourceId}`);
    return { ...source };
  }),
}));

export function createMedicalReviewCsvRows(
  assignment?: MedicalReviewerAssignment,
  entries: Record<string, MedicalReviewEntry> = {},
  workflowState: MedicalReviewWorkflowState = "ONURIM_MEDICAL_REVIEW_PACKAGE_READY",
) {
  return createMedicalReviewCsvRowsFromClaims(
    medicalReviewClaims,
    assignment,
    entries,
    workflowState,
  );
}
