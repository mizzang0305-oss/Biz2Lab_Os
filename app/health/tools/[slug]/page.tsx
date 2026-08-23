import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HealthToolPage } from "@/components/health/HealthToolPage";
import { getHealthTool, healthTools } from "@/lib/health-v3/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return healthTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getHealthTool(slug);
  return tool ? { title: { absolute: `${tool.title} | 오누림 Preview` }, description: tool.description } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getHealthTool(slug);
  if (!tool) notFound();
  return <HealthToolPage tool={tool} />;
}
