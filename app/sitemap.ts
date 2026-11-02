import type {MetadataRoute} from "next";
import {knowledgeUrl, knowledgeIsPublished} from "@/lib/essays/seo";
import {antikytheraEssay} from "@/lib/essays/antikythera";
import {essayThemes, getSeriesEssays} from "@/lib/essays/series";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!knowledgeIsPublished()) return [];
  const essays = getSeriesEssays();
  return [{url:knowledgeUrl("/"),changeFrequency:"daily",priority:1},
    ...essays.map(essay => {
      const date = essay.updatedAt ?? essay.publishedAt ?? (essay.slug === "antikythera" ? antikytheraEssay.updatedAt : undefined);
      return {url:knowledgeUrl(essay.path),...(date ? {lastModified:new Date(date)} : {}),changeFrequency:"monthly" as const,priority:0.7};
    }),
    ...essayThemes.filter(theme => essays.some(essay => essay.theme === theme.name)).map(theme => {
      const dates = essays.filter(essay => essay.theme === theme.name).map(essay => essay.updatedAt ?? essay.publishedAt).filter((date): date is string => Boolean(date));
      const date = ["2026-11-02", ...dates].sort().at(-1)!;
      return {url:knowledgeUrl(`/topics/${theme.slug}`),lastModified:new Date(date),changeFrequency:"weekly" as const,priority:0.5};
    }),
    {url:knowledgeUrl("/about"),changeFrequency:"monthly",priority:0.3},
    {url:knowledgeUrl("/contact"),changeFrequency:"monthly",priority:0.3},
    {url:knowledgeUrl("/privacy"),lastModified:new Date("2026-10-16"),changeFrequency:"monthly",priority:0.3}];
}
