import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";

export const metadata: Metadata = {
  title: { absolute: "골다공증, 증상이 없을 때도 질문을 준비해요 | 오누림 Preview" },
  description: healthArticles.osteoporosis.description,
};

export default function OsteoporosisPage() {
  return <HealthArticlePage article={healthArticles.osteoporosis} />;
}
