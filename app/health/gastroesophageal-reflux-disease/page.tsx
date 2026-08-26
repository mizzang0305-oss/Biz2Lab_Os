import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "위식도역류질환, 음식 하나보다 시간과 변화를 기록해요", description: healthArticles["gastroesophageal-reflux-disease"].description, path: "/health/gastroesophageal-reflux-disease", type: "article" });

export default function GastroesophagealRefluxDiseasePage() {
  return <HealthArticlePage article={healthArticles["gastroesophageal-reflux-disease"]} />;
}
