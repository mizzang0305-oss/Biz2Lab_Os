import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

export const staticPublicRoutes: readonly string[] = [
  "/",
  "/health",
  "/health/trust/about",
  "/health/trust/author",
  "/health/trust/editorial-policy",
  "/health/trust/sources-policy",
  "/health/trust/medical-review-policy",
  "/health/trust/corrections-policy",
  "/health/trust/ai-disclosure",
  "/health/trust/advertising",
  "/health/trust/disclaimer",
  "/health/trust/privacy",
  "/health/trust/terms",
  "/health/trust/contact",
] as const;

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  follow?: boolean;
  type?: "website" | "article";
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  noindex = false,
  follow = false,
  type = "website",
  image = "/opengraph-image",
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const pageTitle =
    title === siteConfig.name ? { absolute: siteConfig.name } : title;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex ? { index: false, follow } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "ko_KR",
      type,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function jsonLd(payload: unknown) {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.koreanName,
    url: siteConfig.url,
    description: siteConfig.description,
    publishingPrinciples: absoluteUrl("/health/trust/editorial-policy"),
    sameAs: ["https://github.com/mizzang0305-oss"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "ko-KR",
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
