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
          "/ko/",
          "/health/review/",
          ...forbiddenPublicRoutePrefixes.map((prefix) => `${prefix}/`),
        ],
      },
    ],
    ...(knowledgeIsPublished() ? {sitemap: knowledgeUrl("/sitemap.xml")} : {}),
  };
}

