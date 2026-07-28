import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { evidenceManifestSchema } from "../lib/evidence-schema";

const id = readArgument("--id");
const reviewer = readArgument("--reviewer");
if (!id || !reviewer) {
  throw new Error("Use --id <evidence-id> --reviewer <reviewer-id>.");
}

const manifestPath = path.join(process.cwd(), "data", "evidence-manifest.json");
const manifest = evidenceManifestSchema.parse(
  JSON.parse(fs.readFileSync(manifestPath, "utf8")),
);
const item = manifest.find((candidate) => candidate.id === id);
if (!item) throw new Error(`Unknown evidence id: ${id}`);
if (item.status !== "candidate") {
  throw new Error(`Only candidate evidence can be approved (current: ${item.status}).`);
}
if (item.sourceDirty || item.piiScan !== "pass") {
  throw new Error("Evidence safety gate failed.");
}

const imagePath = path.join(process.cwd(), "public", item.image.replace(/^\//, ""));
const currentSha = createHash("sha256")
  .update(fs.readFileSync(imagePath))
  .digest("hex");
if (currentSha !== item.sha256) {
  throw new Error("Image SHA-256 no longer matches the manifest.");
}

const before = JSON.stringify(item, null, 2);
item.status = "approved";
item.approvedBy = reviewer;
item.approvedAt = new Date().toISOString();
const after = JSON.stringify(item, null, 2);

console.log("--- candidate");
console.log(before);
console.log("+++ approved");
console.log(after);
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

function readArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}
