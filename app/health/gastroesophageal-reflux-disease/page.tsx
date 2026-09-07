import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: healthArticles["gastroesophageal-reflux-disease"].seoTitle!, description: healthArticles["gastroesophageal-reflux-disease"].description, path: "/health/gastroesophageal-reflux-disease", type: "article" });

export default function GastroesophagealRefluxDiseasePage() {
  return <HealthArticlePage article={healthArticles["gastroesophageal-reflux-disease"]} />;
}
