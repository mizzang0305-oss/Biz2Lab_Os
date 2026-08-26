import { healthClaims, healthSources } from "./content";

export type PublicReleaseAdjudication = {
  claimId: string;
  articleSlug: string;
  riskClass: "P0_EMERGENCY" | "P1_CLINICAL";
  decision: "KEEP_AS_SAFE_GENERAL_EDUCATION" | "SIMPLIFY" | "REMOVE";
  publicWording: string;
  sourceIds: string[];
  sourceUrls: string[];
  lastVerified: string;
  rationale: string;
  licensedMedicalReviewCompleted: false;
};

function inferRiskClass(type: string): PublicReleaseAdjudication["riskClass"] {
  return type === "EMERGENCY_SIGN" ? "P0_EMERGENCY" : "P1_CLINICAL";
}

export const publicReleaseAdjudications: PublicReleaseAdjudication[] = healthClaims
  .filter((claim) => claim.clinicalReviewRequired || claim.riskClass === "P0_EMERGENCY" || claim.riskClass === "P1_CLINICAL")
  .map((claim) => {
    const riskClass = claim.riskClass === "P0_EMERGENCY" || claim.riskClass === "P1_CLINICAL"
      ? claim.riskClass
      : inferRiskClass(claim.type);
    const decision = claim.publicReleaseDecision
      ?? (claim.wordingRisk === "HIGH" ? "SIMPLIFY" : "KEEP_AS_SAFE_GENERAL_EDUCATION");
    const sources = claim.sourceIds.map((sourceId) => {
      const source = healthSources.find((item) => item.id === sourceId);
      if (!source) throw new Error(`Unknown public release source: ${claim.id}/${sourceId}`);
      return source;
    });

    return {
      claimId: claim.id,
      articleSlug: claim.articleSlug,
      riskClass,
      decision,
      publicWording: claim.text,
      sourceIds: claim.sourceIds,
      sourceUrls: sources.map((source) => source.url),
      lastVerified: claim.lastVerified ?? "2026-08-26",
      rationale: claim.publicDecisionRationale
        ?? (decision === "SIMPLIFY"
          ? "현재 공개 문장을 일반 교육·자가판단 금지·도움 요청 경계로 제한하고 치료 선택·용량·진단 확정을 배제함"
          : "공식 출처의 일반 건강교육 범위이며 개인 진단·치료 결정을 포함하지 않음"),
      licensedMedicalReviewCompleted: false as const,
    };
  });

export const unresolvedPublicHighRiskClaims = publicReleaseAdjudications.filter((item) =>
  !item.decision || item.decision === "REMOVE",
);

export const publicMedicalSafetyState = {
  totalAdjudicated: publicReleaseAdjudications.length,
  unresolvedPublicHighRiskClaims: unresolvedPublicHighRiskClaims.length,
  licensedReviewerAssigned: false,
  licensedMedicalReviewCompleted: false,
  realHumanReaderTestPerformed: false,
} as const;
