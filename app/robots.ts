import type { MetadataRoute } from "next";

import { forbiddenPublicRoutePrefixes } from "@/lib/locales";
import { knowledgeUrl, knowledgeIsPublished } from "@/lib/essays/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/review/",
          // Retired /ko/* pages must be crawlable so their HTTP 410 is observed.
          "/health/review/",
          ...forbiddenPublicRoutePrefixes.map((prefix) => `${prefix}/`),
        ],
      },
    ],
    ...(knowledgeIsPublished() ? {sitemap: knowledgeUrl("/sitemap.xml")} : {}),
  };
}

