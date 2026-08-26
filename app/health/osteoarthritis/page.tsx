import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "골관절염, 아픈 정도보다 생활의 변화를 함께 적어요", description: healthArticles.osteoarthritis.description, path: "/health/osteoarthritis", type: "article" });

export default function OsteoarthritisPage() {
  return <HealthArticlePage article={healthArticles.osteoarthritis} />;
}
