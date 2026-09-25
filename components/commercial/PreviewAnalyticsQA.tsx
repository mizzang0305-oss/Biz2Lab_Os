"use client";

import { useEffect } from "react";

const qaSessionKey = "biz2lab:preview-analytics-qa";
const commercialPath = /^\/(?:services(?:\/|$)|mybiz(?:\/|$)|web(?:\/|$)|minz-mind(?:\/|$))/;

export function PreviewAnalyticsQA({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    if (!commercialPath.test(window.location.pathname)) return;

    try {
      if (new URLSearchParams(window.location.search).get("commercial_qa") === "1") {
        window.sessionStorage.setItem(qaSessionKey, String(Date.now()));
      }
      const startedAt = Number(window.sessionStorage.getItem(qaSessionKey));
      if (!startedAt || Date.now() - startedAt > 30 * 60 * 1000) return;
    } catch {
      return;
    }

    const analyticsWindow = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    if (analyticsWindow.gtag) return;

    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push(args);
    };
    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", measurementId, {
      debug_mode: true,
      traffic_type: "preview_qa",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [measurementId]);

  return null;
}
