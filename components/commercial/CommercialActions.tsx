"use client";

import { useEffect } from "react";

import type { CommercialService } from "@/lib/commercial";
import { commercialAttribution, trackCommercialEvent } from "@/lib/commercial-events";

export function CommercialAttributionCapture() {
  useEffect(() => { commercialAttribution(); }, []);
  return null;
}

export function ServiceView({ service }: { service: CommercialService }) {
  useEffect(() => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      if (typeof (window as Window & { gtag?: unknown }).gtag === "function") {
        trackCommercialEvent("service_view", service);
        window.clearInterval(timer);
      } else if (++attempts >= 20) {
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [service]);
  return null;
}

export function CommercialAction({
  href,
  service,
  demo = false,
  children,
  className,
}: {
  href: string;
  service: CommercialService;
  demo?: boolean;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={href.startsWith("https://") ? "_blank" : undefined}
      rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
      onClick={() => trackCommercialEvent(demo ? "demo_view" : "cta_click", service)}
    >
      {children}
    </a>
  );
}
