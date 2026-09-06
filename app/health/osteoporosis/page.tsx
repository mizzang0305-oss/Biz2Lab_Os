import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: healthArticles.osteoporosis.seoTitle ?? healthArticles.osteoporosis.title, description: healthArticles.osteoporosis.description, path: "/health/osteoporosis", type: "article" });

export default function OsteoporosisPage() {
  return <HealthArticlePage article={healthArticles.osteoporosis} />;
}
