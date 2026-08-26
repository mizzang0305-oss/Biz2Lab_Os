import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "고혈압, 숫자에 놀라기 전에 기록부터", description: healthArticles.hypertension.description, path: "/health/hypertension", type: "article" });

export default function HypertensionPage() {
  return <HealthArticlePage article={healthArticles.hypertension} />;
}
