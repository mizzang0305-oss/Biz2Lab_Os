import { siteSettings } from "@/lib/site-settings";

export const siteConfig = {
  name: siteSettings.siteName,
  koreanName: siteSettings.koreanName,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://biz2lab.com",
  description: siteSettings.description,
  author: siteSettings.author,
  email: siteSettings.contactEmail,
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url.replace(/\/$/, "")}${normalizedPath}`;
}
