import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HealthArticlePage } from "@/components/health/HealthArticle";
import { healthArticles } from "@/lib/health-v3/content";
import { expansionGuideSummaries } from "@/lib/health-v3/public-expansion";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return expansionGuideSummaries.map((guide) => ({ missing: [guide.slug] }));
}

export async function generateMetadata({ params }: { params: Promise<{ missing: string[] }> }): Promise<Metadata> {
  const { missing } = await params;
  if (missing.length !== 1) return {};
  const article = healthArticles[missing[0] as keyof typeof healthArticles];
  return article
    ? createMetadata({ title: article.title, description: article.description, path: `/health/${article.slug}`, type: "article" })
    : {};
}

export default async function MissingHealthRoute({ params }: { params: Promise<{ missing: string[] }> }) {
  const { missing } = await params;
  if (missing.length !== 1) notFound();
  const article = healthArticles[missing[0] as keyof typeof healthArticles];
  if (!article || !expansionGuideSummaries.some((guide) => guide.slug === article.slug)) notFound();
  return <HealthArticlePage article={article} />;
}
