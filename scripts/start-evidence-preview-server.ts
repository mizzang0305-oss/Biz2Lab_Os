import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { evidenceManifestSchema } from "../lib/evidence-schema";

const expectedApprovedIds = [
  "commerce-run-audit-log",
  "wms-order-source-workbench",
  "wms-order-hold-validation",
  "wms-picking-inspection-loading",
  "wms-loading-block-before-inspection",
  "commerce-upload-approval-gate",
  "mybiz-readonly-operations-dashboard",
] as const;

export function validateEvidencePreviewRuntime(root = process.cwd()) {
  const buildIdPath = path.join(root, ".next", "BUILD_ID");
  if (!fs.existsSync(buildIdPath)) {
    throw new Error(
      "Evidence Preview server requires a reviewed .next/BUILD_ID. Run the Production evidence build first.",
    );
  }
  const buildId = fs.readFileSync(buildIdPath, "utf8").trim();
  if (!buildId) {
    throw new Error("Evidence Preview server requires a non-empty .next/BUILD_ID.");
  }

  const runtimeManifestPath = path.join(
    root,
    "data",
    "evidence-runtime-manifest.json",
  );
  if (!fs.existsSync(runtimeManifestPath)) {
    throw new Error(
      "Evidence Preview server requires data/evidence-runtime-manifest.json from the reviewed build.",
    );
  }
  const runtimeManifest = evidenceManifestSchema.parse(
    JSON.parse(fs.readFileSync(runtimeManifestPath, "utf8")),
  );
  const approvedIds = runtimeManifest
    .filter((item) => item.status === "approved")
    .map((item) => item.id)
    .sort();
  const candidateCount = runtimeManifest.filter(
    (item) => item.status === "candidate",
  ).length;
  if (
    candidateCount !== 0 ||
    JSON.stringify(approvedIds) !==
      JSON.stringify([...expectedApprovedIds].sort())
  ) {
    throw new Error(
      "Evidence Preview server requires exactly seven reviewed approved items and zero candidates.",
    );
  }

  return { buildId, approvedCount: approvedIds.length, candidateCount };
}

export function parseEvidencePreviewServerArguments(args: string[]) {
  let hostname = "127.0.0.1";
  let port = "4320";
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--hostname" && args[index + 1]) {
      hostname = args[index + 1];
      index += 1;
    } else if (args[index] === "--port" && args[index + 1]) {
      port = args[index + 1];
      index += 1;
    } else {
      throw new Error(`Unknown evidence Preview server argument: ${args[index]}`);
    }
  }
  if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65_535) {
    throw new Error(`Invalid evidence Preview server port: ${port}`);
  }
  return { hostname, port };
}

function startEvidencePreviewServer() {
  const root = process.cwd();
  const runtime = validateEvidencePreviewRuntime(root);
  const { hostname, port } = parseEvidencePreviewServerArguments(
    process.argv.slice(2),
  );
  const nextBinary = path.join(
    root,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );
  if (!fs.existsSync(nextBinary)) {
    throw new Error("Next.js binary is missing. Run npm ci before browser QA.");
  }

  console.log(
    `Starting reviewed evidence Preview build ${runtime.buildId} (${runtime.approvedCount} approved; ${runtime.candidateCount} candidates).`,
  );
  const child = spawn(
    process.execPath,
    [nextBinary, "start", "--hostname", hostname, "--port", port],
    {
      cwd: root,
      env: process.env,
      stdio: "inherit",
    },
  );
  let forwardedShutdown = false;
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  const handlers = new Map<NodeJS.Signals, () => void>();
  for (const signal of signals) {
    const handler = () => {
      forwardedShutdown = true;
      if (child.exitCode === null && child.signalCode === null) {
        try {
          child.kill(signal);
        } catch {
          child.kill();
        }
      }
    };
    handlers.set(signal, handler);
    process.once(signal, handler);
  }

  child.once("error", (error) => {
    console.error(`Evidence Preview server failed to start: ${error.message}`);
    process.exitCode = 1;
  });
  child.once("exit", (code, signal) => {
    for (const [registeredSignal, handler] of handlers) {
      process.removeListener(registeredSignal, handler);
    }
    if (signal && !forwardedShutdown) {
      console.error(`Evidence Preview server exited from signal ${signal}.`);
    }
    process.exitCode = code ?? (forwardedShutdown ? 0 : 1);
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(import.meta.filename)
) {
  startEvidencePreviewServer();
}
