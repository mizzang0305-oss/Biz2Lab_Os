import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: healthArticles.osteoarthritis.seoTitle ?? healthArticles.osteoarthritis.title, description: healthArticles.osteoarthritis.description, path: "/health/osteoarthritis", type: "article" });

export default function OsteoarthritisPage() {
  return <HealthArticlePage article={healthArticles.osteoarthritis} />;
}
