import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: healthArticles["allergic-rhinitis"].seoTitle!, description: healthArticles["allergic-rhinitis"].description, path: "/health/allergic-rhinitis", type: "article" });

export default function AllergicRhinitisPage() {
  return <HealthArticlePage article={healthArticles["allergic-rhinitis"]} />;
}
