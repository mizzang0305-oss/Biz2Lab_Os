import type { MetadataRoute } from "next";

import { getSitemapPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPublicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-06-15"),
    changeFrequency: route === "/" || route === "/ko" ? "daily" : "weekly",
    priority: route === "/" || route === "/ko" ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const postEntries = getSitemapPosts().map((post) => ({
    url: absoluteUrl(post.route),
    lastModified: new Date(post.frontmatter.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticEntries, ...postEntries];
}

