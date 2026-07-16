import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

export const staticPublicRoutes = [
  "/ko",
  "/ko/automation",
  "/ko/sales-ops",
  "/ko/small-business",
  "/ko/about",
  "/ko/resources",
  "/ko/contact",
  "/ko/privacy",
  "/ko/terms",
] as const;

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  noindex = false,
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
    robots: noindex ? { index: false, follow: false } : undefined,
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
    publishingPrinciples: absoluteUrl("/ko/about"),
    sameAs: ["https://github.com/mizzang0305-oss"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/ko"),
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
