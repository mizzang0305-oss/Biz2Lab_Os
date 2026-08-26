import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "제2형 당뇨병, 한 번의 숫자보다 흐름 보기", description: healthArticles["type-2-diabetes"].description, path: "/health/type-2-diabetes", type: "article" });

export default function Type2DiabetesPage() {
  return <HealthArticlePage article={healthArticles["type-2-diabetes"]} />;
}
