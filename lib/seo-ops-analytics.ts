export type SeoOpsAnalyticsProviderId =
  | "search-console"
  | "ga4"
  | "vercel-analytics"
  | "umami"
  | "referrer-logs";

export type SeoOpsAnalyticsProviderStatus = "disconnected" | "needs-env" | "ready";

export type SeoOpsAnalyticsProvider = {
  id: SeoOpsAnalyticsProviderId;
  label: string;
  status: SeoOpsAnalyticsProviderStatus;
  statusLabel: string;
  configuredEnv: string[];
  missingEnv: string[];
  requiredEnv: string[];
  emptyState: string;
};

type ProviderDefinition = {
  id: SeoOpsAnalyticsProviderId;
  label: string;
  requiredEnv: string[];
  emptyState: string;
};

const providerDefinitions: ProviderDefinition[] = [
  {
    id: "search-console",
    label: "Google Search Console",
    requiredEnv: ["BIZ2LAB_SEARCH_CONSOLE_SITE_URL"],
    emptyState: "Search Console 연결 전 표시",
  },
  {
    id: "ga4",
    label: "GA4",
    requiredEnv: ["BIZ2LAB_GA4_PROPERTY_ID"],
    emptyState: "Analytics 연결 전 표시",
  },
  {
    id: "vercel-analytics",
    label: "Vercel Analytics",
    requiredEnv: ["BIZ2LAB_VERCEL_ANALYTICS_PROJECT_ID"],
    emptyState: "Analytics 연결 전 표시",
  },
  {
    id: "umami",
    label: "Umami",
    requiredEnv: ["BIZ2LAB_UMAMI_URL", "BIZ2LAB_UMAMI_WEBSITE_ID"],
    emptyState: "Analytics 연결 전 표시",
  },
  {
    id: "referrer-logs",
    label: "Referrer logs",
    requiredEnv: ["BIZ2LAB_REFERRER_LOG_SOURCE"],
    emptyState: "유입 사이트 데이터 미연결",
  },
];

function statusLabel(status: SeoOpsAnalyticsProviderStatus) {
  switch (status) {
    case "ready":
      return "연결 준비됨";
    case "needs-env":
      return "환경변수 필요";
    case "disconnected":
    default:
      return "미연결";
  }
}

function providerStatus(configuredEnv: string[], requiredEnv: string[]): SeoOpsAnalyticsProviderStatus {
  if (configuredEnv.length === 0) {
    return "disconnected";
  }

  return configuredEnv.length === requiredEnv.length ? "ready" : "needs-env";
}

export function getSeoOpsAnalyticsConnectors(env: Record<string, string | undefined> = process.env) {
  const providers: SeoOpsAnalyticsProvider[] = providerDefinitions.map((provider) => {
    const configuredEnv = provider.requiredEnv.filter((name) => Boolean(env[name]?.trim()));
    const missingEnv = provider.requiredEnv.filter((name) => !env[name]?.trim());
    const status = providerStatus(configuredEnv, provider.requiredEnv);

    return {
      ...provider,
      status,
      statusLabel: statusLabel(status),
      configuredEnv,
      missingEnv,
    };
  });
  const readyProviders = providers.filter((provider) => provider.status === "ready");

  return {
    providers,
    readyProviders,
    readyProviderCount: readyProviders.length,
    anyProviderReady: readyProviders.length > 0,
    realDataConnected: false as const,
    summaryLabel: readyProviders.length > 0 ? "연결 준비됨" : "미연결",
  };
}
