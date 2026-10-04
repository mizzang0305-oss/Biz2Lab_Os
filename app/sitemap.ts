import type {MetadataRoute} from "next";
import {knowledgeUrl, knowledgeIsPublished} from "@/lib/essays/seo";
import {antikytheraEssay} from "@/lib/essays/antikythera";
import {essayThemes, getSeriesEssays} from "@/lib/essays/series";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!knowledgeIsPublished()) return [];
  const essays = getSeriesEssays();
  return [{url:knowledgeUrl("/"),changeFrequency:"weekly",priority:1},
    ...essays.map(essay => ({url:knowledgeUrl(essay.path),...(essay.slug === "antikythera" ? {lastModified:new Date(antikytheraEssay.updatedAt)} : {}),changeFrequency:"monthly" as const,priority:0.7})),
    ...essayThemes.filter(theme => essays.some(essay => essay.theme === theme.name)).map(theme => ({url:knowledgeUrl(`/topics/${theme.slug}`),changeFrequency:"monthly" as const,priority:0.5})),
    {url:knowledgeUrl("/about"),changeFrequency:"monthly",priority:0.3},
    {url:knowledgeUrl("/contact"),changeFrequency:"monthly",priority:0.3},
    {url:knowledgeUrl("/privacy"),lastModified:new Date("2026-10-04"),changeFrequency:"monthly",priority:0.3}];
}
