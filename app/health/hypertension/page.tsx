import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: healthArticles.hypertension.seoTitle ?? healthArticles.hypertension.title, description: healthArticles.hypertension.description, path: "/health/hypertension", type: "article" });

export default function HypertensionPage() {
  return <HealthArticlePage article={healthArticles.hypertension} />;
}
