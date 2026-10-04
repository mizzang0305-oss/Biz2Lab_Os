import { notFound } from "next/navigation";
import { getSeriesEssay } from "@/lib/essays/series";
import { knowledgeMetadata } from "@/lib/essays/seo";
import { SeriesEssay } from "@/components/essays/SeriesEssay";
import { EssayStructuredData } from "@/components/essays/EssayStructuredData";
type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  const essay = getSeriesEssay((await params).slug);
  if (!essay) notFound();
  return knowledgeMetadata(essay.title, essay.description, essay.path);
}
export default async function Page({ params }: Props) {
  const essay = getSeriesEssay((await params).slug);
  if (!essay || essay.slug === "antikythera") notFound();
  return <><EssayStructuredData path={essay.path} article={essay} /><SeriesEssay essay={essay} /></>;
}
