import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";

export const metadata: Metadata = {
  title: { absolute: "고혈압, 숫자에 놀라기 전에 기록부터 | 오누림 Preview" },
  description: healthArticles.hypertension.description,
};

export default function HypertensionPage() {
  return <HealthArticlePage article={healthArticles.hypertension} />;
}
