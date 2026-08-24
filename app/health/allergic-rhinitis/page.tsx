import type { Metadata } from "next";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";

export const metadata: Metadata = {
  title: { absolute: "알레르기 비염, 원인을 단정하기보다 흐름을 살펴요 | 오누림 Preview" },
  description: healthArticles["allergic-rhinitis"].description,
};

export default function AllergicRhinitisPage() {
  return <HealthArticlePage article={healthArticles["allergic-rhinitis"]} />;
}
