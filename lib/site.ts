import { siteSettings } from "@/lib/site-settings";

export const officialSiteUrl = "https://www.biz2lab.com";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  return configuredUrl === officialSiteUrl ? configuredUrl : officialSiteUrl;
}

export const siteConfig = {
  name: siteSettings.siteName,
  koreanName: siteSettings.koreanName,
  url: resolveSiteUrl(),
  description: siteSettings.description,
  author: siteSettings.author,
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url.replace(/\/$/, "")}${normalizedPath}`;
}
