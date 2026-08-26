import type { Metadata } from "next";

import { MedicalReviewWorkspace } from "@/components/health/MedicalReviewWorkspace";
import { medicalReviewClaims } from "@/lib/health-v3/medical-review";

export const metadata: Metadata = {
  title: { absolute: "의료 검토판 | 오누림 Preview" },
  description: "47개 고위험 Claim을 실제 면허 의료인이 공식 출처와 대조해 검토하는 보호된 작업판",
};

export default function MedicalReviewPage() {
  return <MedicalReviewWorkspace claims={medicalReviewClaims} />;
}
