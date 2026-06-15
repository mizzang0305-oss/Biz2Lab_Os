import { detectLocalImageProviders } from "@/lib/image-generation/local-provider-detect";

async function main() {
  const detection = await detectLocalImageProviders();
  const realAvailable = detection.statuses.filter((status) => status.available && status.provider.endsWith("-local"));

  console.log("image-skill:detect");
  console.log(`configuredProvider=${detection.configuredProvider ?? "none"}`);
  for (const status of detection.statuses) {
    console.log(
      [
        `provider=${status.provider}`,
        `configured=${status.configured}`,
        `available=${status.available}`,
        status.endpoint ? `endpoint=${status.endpoint}` : null,
        status.apiShape ? `apiShape=${status.apiShape}` : null,
        `reason=${status.reason}`,
      ]
        .filter(Boolean)
        .join(" | "),
    );
  }

  if (realAvailable.length === 0) {
    console.log("PARTIAL_READY: skill bridge can plan and validate, but no real local image provider is reachable.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
