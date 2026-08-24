import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";

export const metadata: Metadata = {
  title: { absolute: "골관절염, 아픈 정도보다 생활의 변화를 함께 적어요 | 오누림 Preview" },
  description: healthArticles.osteoarthritis.description,
};

export default function OsteoarthritisPage() {
  return <HealthArticlePage article={healthArticles.osteoarthritis} />;
}
