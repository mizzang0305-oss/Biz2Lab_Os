import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: healthArticles["type-2-diabetes"].seoTitle ?? healthArticles["type-2-diabetes"].title, description: healthArticles["type-2-diabetes"].description, path: "/health/type-2-diabetes", type: "article" });

export default function Type2DiabetesPage() {
  return <HealthArticlePage article={healthArticles["type-2-diabetes"]} />;
}
