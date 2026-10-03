import type {MetadataRoute} from "next";
import {absoluteUrl} from "@/lib/site";
import {getPublishedPocketGuides} from "@/lib/pocket-money/guide";
import {pocketUpdatedAt} from "@/lib/pocket-money/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{url:absoluteUrl("/"),lastModified:new Date(pocketUpdatedAt),changeFrequency:"weekly",priority:1},
    ...getPublishedPocketGuides().map(guide=>({url:absoluteUrl(`/pocket-money/guides/${guide.slug}`),lastModified:new Date(guide.updatedAt),changeFrequency:"monthly" as const,priority:0.7}))];
}
