import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import {
  evidenceAssetDirectory,
  evidenceAssetPath,
} from "../lib/evidence-assets";
import { evidenceManifestSchema } from "../lib/evidence-schema";

const id = readArgument("--id");
const reviewer = readArgument("--reviewer");
const apply = process.argv.includes("--apply");
if (!id || !reviewer) {
  throw new Error(
    "Use --id <evidence-id> --reviewer <reviewer-id> [--apply].",
  );
}

const root = process.cwd();
const manifestPath = path.join(root, "data", "evidence-manifest.json");
const originalBytes = fs.readFileSync(manifestPath);
const manifest = evidenceManifestSchema.parse(
  JSON.parse(originalBytes.toString("utf8")),
);
const index = manifest.findIndex((candidate) => candidate.id === id);
const item = manifest[index];
if (!item) throw new Error(`Unknown evidence id: ${id}`);
if (item.status !== "candidate") {
  throw new Error(
    `Only candidate evidence can be approved (current: ${item.status}).`,
  );
}
if (item.sourceDirty || item.piiScan !== "pass") {
  throw new Error("Evidence safety gate failed.");
}

const candidatePath = evidenceAssetPath(root, item);
const currentSha = createHash("sha256")
  .update(fs.readFileSync(candidatePath))
  .digest("hex");
if (currentSha !== item.sha256) {
  throw new Error("Image SHA-256 no longer matches the manifest.");
}

const approved = {
  ...item,
  status: "approved" as const,
  approvedBy: reviewer,
  approvedAt: new Date().toISOString(),
};
const nextManifest = [...manifest];
nextManifest[index] = approved;
evidenceManifestSchema.parse(nextManifest);

console.log("--- candidate");
console.log(JSON.stringify(item, null, 2));
console.log("+++ approved");
console.log(JSON.stringify(approved, null, 2));

if (!apply) {
  console.log("DRY_RUN_ONLY");
  process.exit(0);
}

const approvedDirectory = evidenceAssetDirectory(root, "approved");
const approvedPath = path.join(approvedDirectory, path.basename(item.image));
fs.mkdirSync(approvedDirectory, { recursive: true });
if (fs.existsSync(approvedPath)) {
  throw new Error("Approved asset destination already exists.");
}

fs.copyFileSync(candidatePath, approvedPath);
try {
  fs.writeFileSync(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  fs.rmSync(candidatePath);
} catch (error) {
  fs.rmSync(approvedPath, { force: true });
  fs.writeFileSync(manifestPath, originalBytes);
  throw error;
}
console.log("APPLIED_LOCALLY_NO_GIT_NO_PUSH_NO_DEPLOY");

function readArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}
