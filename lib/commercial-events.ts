"use client";

import type { CommercialService } from "@/lib/commercial";
import { safeAttributionValue } from "@/lib/commercial-sensitive";

export type CommercialEvent =
  | "service_view"
  | "demo_view"
  | "cta_click"
  | "inquiry_start"
  | "inquiry_submit"
  | "email_lead_submit";

type Gtag = (command: "event", name: CommercialEvent, params: Record<string, string>) => void;
const attributionKey = "biz2lab:commercial-utm";

export function commercialAttribution() {
  const params = new URLSearchParams(window.location.search);
  let utmSource = safeAttributionValue(params.get("utm_source"));
  let utmMedium = safeAttributionValue(params.get("utm_medium"));
  let utmCampaign = safeAttributionValue(params.get("utm_campaign"));
  let referrerSource = "";
  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin !== window.location.origin) referrerSource = referrer.hostname.slice(0, 100);
    } catch { /* Malformed referrers do not block navigation or forms. */ }
  }
  try {
    if (utmSource || utmMedium || utmCampaign) {
      window.sessionStorage.setItem(attributionKey, JSON.stringify({ utmSource, utmMedium, utmCampaign, at: Date.now() }));
    } else if (!referrerSource) {
      const stored = JSON.parse(window.sessionStorage.getItem(attributionKey) || "null");
      if (stored && Date.now() - stored.at < 30 * 60 * 1000) {
        utmSource = safeAttributionValue(String(stored.utmSource || ""));
        utmMedium = safeAttributionValue(String(stored.utmMedium || ""));
        utmCampaign = safeAttributionValue(String(stored.utmCampaign || ""));
      }
    }
  } catch { /* Storage may be unavailable; forms still work without UTM persistence. */ }
  return {
    source: utmSource || referrerSource || "direct",
    landing_url: window.location.pathname,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  };
}

export function trackCommercialEvent(name: CommercialEvent, service: CommercialService) {
  const attribution = commercialAttribution();
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, {
    service,
    landing_url: attribution.landing_url,
    source: attribution.source,
    campaign: attribution.utm_campaign,
  });
}
