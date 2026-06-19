import { loadImageBriefs } from "@/lib/image-generation/image-brief-loader";
import { assertLocalhostEndpoint } from "@/lib/image-generation/image-output";
import {
  getLocalImageProvider,
  normalizeProviderId,
  readProviderConfigFromEnv,
  resolveConfiguredProvider,
} from "@/lib/image-generation/providers";
import type { LocalImageProviderId, RealLocalImageProviderId } from "@/lib/image-generation/types";

const realProviders = new Set<RealLocalImageProviderId>(["comfyui-local", "sd-webui-local"]);

function providerFromArgs() {
  const providerArg = process.argv.find((arg) => arg.startsWith("--provider="));
  return providerArg ? providerArg.split("=")[1] : null;
}

function valueForArg(name: string) {
  const inline = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (inline) {
    return inline.slice(inline.indexOf("=") + 1);
  }

  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const argProvider = normalizeProviderId(providerFromArgs());
  const configuredProvider = resolveConfiguredProvider();
  const providerId = argProvider ?? configuredProvider;
  const briefPath = valueForArg("brief");

  if (!providerId) {
    console.log("No real local image provider configured. Use manual-drop or deterministic fallback.");
    process.exit(0);
  }

  if (realProviders.has(providerId as RealLocalImageProviderId) && !configuredProvider) {
    console.error("Refusing real provider generation because LOCAL_IMAGE_PROVIDER is not set.");
    process.exit(1);
  }

  const provider = getLocalImageProvider(providerId as LocalImageProviderId);
  const providerConfig = readProviderConfigFromEnv();
  if (provider.isRealImageProvider && providerId !== "manual-drop" && providerConfig.endpoint) {
    assertLocalhostEndpoint(providerConfig.endpoint);
  }

  const briefs = loadImageBriefs(briefPath);
  const result = await provider.generate({
    briefs,
    providerConfig,
    dryRun: !process.argv.includes("--no-dry-run"),
  });

  console.log("image-skill:generate");
  console.log(`provider=${result.provider}`);
  console.log(`briefSource=${briefPath ?? "image-briefs/biz2lab-article-image-briefs.json"}`);
  console.log(`generated=${result.generated.length}`);
  console.log(`skipped=${result.skipped.length}`);
  console.log(`failed=${result.failed.length}`);
  console.log(result.message);

  if (result.failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
