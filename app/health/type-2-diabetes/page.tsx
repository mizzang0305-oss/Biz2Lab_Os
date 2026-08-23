import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";

export const metadata: Metadata = {
  title: { absolute: "제2형 당뇨병, 한 번의 숫자보다 흐름 보기 | 오누림 Preview" },
  description: healthArticles["type-2-diabetes"].description,
};

export default function Type2DiabetesPage() {
  return <HealthArticlePage article={healthArticles["type-2-diabetes"]} />;
}
