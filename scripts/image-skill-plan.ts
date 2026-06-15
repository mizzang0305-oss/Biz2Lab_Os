import { loadImageBriefs } from "@/lib/image-generation/image-brief-loader";
import { summarizeBriefs } from "@/lib/image-generation/image-output";
import { detectLocalImageProviders } from "@/lib/image-generation/local-provider-detect";

async function main() {
  const briefs = loadImageBriefs();
  const summary = summarizeBriefs(briefs);
  const detection = await detectLocalImageProviders();

  console.log("image-skill:plan");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`configuredProvider=${detection.configuredProvider ?? "none"}`);
  console.log("No files were created. Use manual-drop or configure a localhost provider before real generation.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
