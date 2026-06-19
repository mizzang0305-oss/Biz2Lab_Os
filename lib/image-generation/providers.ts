import { comfyUiProvider } from "@/lib/image-generation/comfyui-provider";
import { deterministicFallbackProvider } from "@/lib/image-generation/deterministic-fallback-provider";
import { manualDropProvider } from "@/lib/image-generation/manual-drop-provider";
import { sdWebUiProvider } from "@/lib/image-generation/sd-webui-provider";
import type {
  LocalImageProvider,
  LocalImageProviderConfig,
  LocalImageProviderId,
} from "@/lib/image-generation/types";

const providers: Record<LocalImageProviderId, LocalImageProvider> = {
  "manual-drop": manualDropProvider,
  "deterministic-fallback": deterministicFallbackProvider,
  "comfyui-local": comfyUiProvider,
  "sd-webui-local": sdWebUiProvider,
};

const envProviderMap: Record<string, LocalImageProviderId> = {
  "manual-drop": "manual-drop",
  "deterministic-fallback": "deterministic-fallback",
  comfyui: "comfyui-local",
  "comfyui-local": "comfyui-local",
  "sd-webui": "sd-webui-local",
  "sd-webui-local": "sd-webui-local",
};

export function listLocalImageProviders() {
  return Object.values(providers);
}

export function getLocalImageProvider(id: LocalImageProviderId) {
  return providers[id];
}

export function normalizeProviderId(value?: string | null) {
  if (!value) {
    return null;
  }

  return envProviderMap[value] ?? null;
}

export function readProviderConfigFromEnv(env: Record<string, string | undefined> = process.env): LocalImageProviderConfig {
  const provider = normalizeProviderId(env.LOCAL_IMAGE_PROVIDER);
  const defaultEndpoint =
    provider === "comfyui-local"
      ? "http://127.0.0.1:8188"
      : provider === "sd-webui-local"
        ? "http://127.0.0.1:7860"
        : undefined;

  return {
    provider: env.LOCAL_IMAGE_PROVIDER,
    endpoint: env.LOCAL_IMAGE_ENDPOINT ?? defaultEndpoint,
    workflowPath: env.LOCAL_IMAGE_WORKFLOW_PATH,
    dryRun: env.LOCAL_IMAGE_DRY_RUN !== "false",
  };
}

export function resolveConfiguredProvider(env = process.env) {
  return normalizeProviderId(env.LOCAL_IMAGE_PROVIDER);
}
