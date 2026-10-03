import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function createCommercialMetadata(input: { title: string; description: string; path: string }): Metadata {
  const base = createMetadata({ ...input, noindex: true });
  const title = `${input.title} | Biz2Lab`;
  const image = absoluteUrl("/services/opengraph-image");
  return {
    ...base,
    title: { absolute: title },
    openGraph: { ...base.openGraph, title, siteName: "Biz2Lab", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description: input.description, images: [image] },
  };
}
