import { assertLocalhostEndpoint } from "@/lib/image-generation/image-output";
import { readProviderConfigFromEnv, resolveConfiguredProvider } from "@/lib/image-generation/providers";
import type { LocalImageProviderStatus } from "@/lib/image-generation/types";

const defaultEndpointChecks = [
  {
    provider: "comfyui-local" as const,
    endpoint: "http://127.0.0.1:8188",
    healthPath: "/system_stats",
    apiShape: "ComfyUI /system_stats localhost service probe",
  },
  {
    provider: "sd-webui-local" as const,
    endpoint: "http://127.0.0.1:7860",
    healthPath: "/sdapi/v1/options",
    apiShape: "Stable Diffusion WebUI /sdapi/v1/options localhost service probe",
  },
];

async function isReachable(endpoint: string, healthPath: string) {
  try {
    const response = await fetch(`${endpoint}${healthPath}`, { signal: AbortSignal.timeout(1500) });
    return response.ok || response.status < 500;
  } catch {
    return false;
  }
}

export async function detectLocalImageProviders(env = process.env) {
  const configuredProvider = resolveConfiguredProvider(env);
  const providerConfig = readProviderConfigFromEnv(env);
  const statuses: LocalImageProviderStatus[] = [
    {
      provider: "manual-drop",
      configured: configuredProvider === "manual-drop",
      available: true,
      reason: "Manual drop workflow is always available because it only reads local raw files.",
    },
    {
      provider: "deterministic-fallback",
      configured: configuredProvider === "deterministic-fallback",
      available: true,
      reason: "Deterministic SVG/Sharp fallback exists but is not real image model generation.",
    },
  ];

  for (const check of defaultEndpointChecks) {
    let endpoint = check.endpoint;
    let endpointAllowed = true;

    if (configuredProvider === check.provider && providerConfig.endpoint) {
      try {
        endpoint = assertLocalhostEndpoint(providerConfig.endpoint);
      } catch {
        endpointAllowed = false;
      }
    }

    const reachable = endpointAllowed ? await isReachable(endpoint, check.healthPath) : false;
    statuses.push({
      provider: check.provider,
      configured: configuredProvider === check.provider,
      available: reachable,
      endpoint,
      apiShape: check.apiShape,
      reason: endpointAllowed
        ? reachable
          ? "Local endpoint responded."
          : "Local endpoint is not reachable. Codex did not start or install any provider."
        : "Configured endpoint is not allowed. Only 127.0.0.1 or localhost are permitted.",
    });
  }

  return {
    configuredProvider,
    statuses,
  };
}
