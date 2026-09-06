import type { MetadataRoute } from "next";

import { healthArticles, healthTools, trustPages } from "@/lib/health-v3/content";
import { healthSupportGuides } from "@/lib/health-v3/support-guides";
import { toolEditorial } from "@/lib/health-v3/tool-editorial";
import { homeUpdatedAt } from "@/lib/health-v3/entry-pages";
import { staticPublicRoutes } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Public route inventory is not the set of approved search index candidates.
  const staticEntries = staticPublicRoutes.filter(route => !route.startsWith("/health/trust/")).map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(route === "/" ? homeUpdatedAt : "2026-07-26"),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const guideEntries = Object.values(healthArticles).map((article) => ({
    url: absoluteUrl(`/health/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? "2026-08-26"),
    changeFrequency: "weekly",
    priority: 0.9,
  })) satisfies MetadataRoute.Sitemap;

  const supportEntries = healthSupportGuides.map((guide) => ({
    url: absoluteUrl(`/health/guides/${guide.slug}`),
    lastModified: new Date(guide.updatedAt ?? "2026-08-26"),
    changeFrequency: "monthly",
    priority: 0.75,
  })) satisfies MetadataRoute.Sitemap;

  const toolEntries = healthTools.filter(tool => toolEditorial[tool.slug]?.indexDecision !== "NOINDEX_FOLLOW").map((tool) => ({
    url: absoluteUrl(`/health/tools/${tool.slug}`),
    lastModified: new Date(toolEditorial[tool.slug]?.updatedAt ?? "2026-08-26"),
    changeFrequency: "monthly",
    priority: 0.65,
  })) satisfies MetadataRoute.Sitemap;

  const staticUrls = new Set(staticEntries.map((entry) => entry.url));
  const supplementalTrustEntries = trustPages
    .filter(page => page.indexDecision !== "NOINDEX_FOLLOW")
    .map((page) => ({
      url: absoluteUrl(`/health/trust/${page.slug}`),
      lastModified: page.updatedAt ?? "2026-08-26",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
    .filter((entry) => !staticUrls.has(entry.url));

  return [...staticEntries, ...guideEntries, ...supportEntries, ...toolEntries, ...supplementalTrustEntries];
}
