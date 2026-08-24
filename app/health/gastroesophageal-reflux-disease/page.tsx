import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";

export const metadata: Metadata = {
  title: { absolute: "위식도역류질환, 음식 하나보다 시간과 변화를 기록해요 | 오누림 Preview" },
  description: healthArticles["gastroesophageal-reflux-disease"].description,
};

export default function GastroesophagealRefluxDiseasePage() {
  return <HealthArticlePage article={healthArticles["gastroesophageal-reflux-disease"]} />;
}
