export type ImageBriefUsage = "hero" | "inline" | "hub-summary";

export type ImageBriefCategory =
  | "automation"
  | "sales-ops"
  | "small-business"
  | "contracts-payments";

export type LocalImageProviderId =
  | "manual-drop"
  | "deterministic-fallback"
  | "comfyui-local"
  | "sd-webui-local";

export type RealLocalImageProviderId = "comfyui-local" | "sd-webui-local";

export type ImageBrief = {
  id: string;
  postSlug: string;
  category: ImageBriefCategory;
  usage: ImageBriefUsage;
  targetPath: string;
  optimizedPath: string;
  altKo: string;
  captionKo: string;
  style?: string;
  promptKo?: string;
  providerPromptKo?: string;
  negativePromptKo?: string;
  visualReferenceStyle?: string;
  composition?: string;
  categoryStyle?: string;
  expectedOutput?: string;
  textPolicy?: string;
  localOnly?: boolean;
};

export type ImageBriefFile = {
  version?: number;
  project?: string;
  language?: string;
  policy?: string;
  briefs: ImageBrief[];
};

export type LocalImageProviderConfig = {
  provider?: string;
  endpoint?: string;
  workflowPath?: string;
  dryRun?: boolean;
};

export type LocalImageProviderStatus = {
  provider: LocalImageProviderId;
  configured: boolean;
  available: boolean;
  endpoint?: string;
  reason: string;
  apiShape?: string;
};

export type ImageSkillPlanSummary = {
  totalBriefs: number;
  byUsage: Record<string, number>;
  byCategory: Record<string, number>;
  rawExisting: number;
  rawMissing: number;
};

export type ImageGenerationRequest = {
  briefs: ImageBrief[];
  providerConfig: LocalImageProviderConfig;
  dryRun: boolean;
};

export type ImageGenerationResult = {
  provider: LocalImageProviderId;
  generated: string[];
  skipped: string[];
  failed: string[];
  message: string;
};

export type LocalImageProvider = {
  id: LocalImageProviderId;
  label: string;
  isRealImageProvider: boolean;
  generate: (request: ImageGenerationRequest) => Promise<ImageGenerationResult>;
};
