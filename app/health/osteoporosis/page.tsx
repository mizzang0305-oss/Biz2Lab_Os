import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "골다공증, 증상이 없을 때도 질문을 준비해요", description: healthArticles.osteoporosis.description, path: "/health/osteoporosis", type: "article" });

export default function OsteoporosisPage() {
  return <HealthArticlePage article={healthArticles.osteoporosis} />;
}
