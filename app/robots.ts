import type { MetadataRoute } from "next";

import { forbiddenPublicRoutePrefixes } from "@/lib/locales";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          ...forbiddenPublicRoutePrefixes.map((prefix) => `${prefix}/`),
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

