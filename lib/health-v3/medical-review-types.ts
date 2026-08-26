export const medicalReviewDecisions = [
  "APPROVE",
  "REVISE",
  "REMOVE",
  "SPECIALIST_REQUIRED",
] as const;

export type MedicalReviewDecision = (typeof medicalReviewDecisions)[number];

export type MedicalReviewWorkflowState =
  | "ONURIM_MEDICAL_REVIEW_PACKAGE_READY"
  | "REVIEWER_ASSIGNED"
  | "ONURIM_MEDICAL_REVIEW_IN_PROGRESS"
  | "MEDICAL_REVIEW_DECISIONS_COMPLETE_PENDING_EDITORIAL_APPLICATION";

export type MedicalReviewSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  sourceDate: string;
  retrievedAt: string;
};

export type MedicalReviewClaimPacket = {
  packetVersion: string;
  packetHash: string;
  claimVersionHash: string;
  claimId: string;
  articleSlug: string;
  articleTitle: string;
  section: string;
  claimType: string;
  currentText: string;
  wordingRisk: "LOW" | "MEDIUM" | "HIGH";
  reviewQuestion: string;
  sources: MedicalReviewSource[];
};

export type MedicalReviewerAssignment = {
  realName: string;
  licenseCategory: string;
  licenseJurisdiction: string;
  licenseVerificationMethod: string;
  affiliation: string;
  conflictDisclosure: string;
  displayPermission: boolean;
  scopeAttested: boolean;
  sourceReviewAttested: boolean;
};

export type MedicalReviewEntry = {
  decision: "" | MedicalReviewDecision;
  proposedText: string;
  rationale: string;
  specialistArea: string;
  reviewedAt: string;
};

export function isReviewerAssignmentComplete(assignment: MedicalReviewerAssignment) {
  return Boolean(
    assignment.realName.trim() &&
      assignment.licenseCategory.trim() &&
      assignment.licenseJurisdiction.trim() &&
      assignment.licenseVerificationMethod.trim() &&
      assignment.conflictDisclosure.trim() &&
      assignment.scopeAttested &&
      assignment.sourceReviewAttested,
  );
}

export function getReviewEntryError(entry: MedicalReviewEntry) {
  if (!entry.decision) return null;
  if (entry.decision === "REVISE" && !entry.proposedText.trim()) return "REVISE에는 수정 문장이 필요합니다.";
  if (["REVISE", "REMOVE", "SPECIALIST_REQUIRED"].includes(entry.decision) && !entry.rationale.trim()) {
    return `${entry.decision}에는 검토 근거가 필요합니다.`;
  }
  if (entry.decision === "SPECIALIST_REQUIRED" && !entry.specialistArea.trim()) {
    return "SPECIALIST_REQUIRED에는 필요한 전문 분야가 필요합니다.";
  }
  return null;
}

export function deriveMedicalReviewWorkflowState(
  reviewerAssigned: boolean,
  decisionCount: number,
  totalClaims: number,
): MedicalReviewWorkflowState {
  if (!reviewerAssigned) return "ONURIM_MEDICAL_REVIEW_PACKAGE_READY";
  if (decisionCount === 0) return "REVIEWER_ASSIGNED";
  if (decisionCount < totalClaims) return "ONURIM_MEDICAL_REVIEW_IN_PROGRESS";
  return "MEDICAL_REVIEW_DECISIONS_COMPLETE_PENDING_EDITORIAL_APPLICATION";
}
