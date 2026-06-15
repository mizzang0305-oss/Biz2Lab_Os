export const publicLocales = ["ko"] as const;
export const plannedLocales = ["en", "ja"] as const;

export type PublicLocale = (typeof publicLocales)[number];
export type PlannedLocale = (typeof plannedLocales)[number];

export const forbiddenPublicRoutePrefixes = [
  "/en",
  "/ja",
  "/amazon",
  "/reviews",
  "/tools",
  "/lotto",
  "/ai",
  "/chat",
  "/admin",
  "/login",
  "/research",
  "/crawler",
  "/commerce",
  "/affiliate",
] as const;

export function isPublicLocale(locale: string): locale is PublicLocale {
  return publicLocales.includes(locale as PublicLocale);
}

