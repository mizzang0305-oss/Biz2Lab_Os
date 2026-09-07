import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HealthToolPage } from "@/components/health/HealthToolPage";
import { getHealthTool, healthTools } from "@/lib/health-v3/content";
import { toolEditorial } from "@/lib/health-v3/tool-editorial";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return healthTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getHealthTool(slug);
  const editorial = toolEditorial[slug];
  return tool ? createMetadata({ title: editorial?.title ?? tool.title, description: editorial?.description ?? tool.description, path: `/health/tools/${slug}`, noindex: editorial?.indexDecision === "NOINDEX_FOLLOW", follow: true }) : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getHealthTool(slug);
  if (!tool) notFound();
  return <HealthToolPage tool={tool} />;
}
