import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { request } from "@playwright/test";

import { evidenceManifestSchema } from "../lib/evidence-schema";
import { stageEvidenceAssets } from "./stage-evidence-assets";

const root = process.cwd();
const buildDirectory = path.join(root, ".next");
const resolvedBuildDirectory = path.resolve(buildDirectory);
if (
  resolvedBuildDirectory !== path.join(path.resolve(root), ".next") ||
  !resolvedBuildDirectory.startsWith(`${path.resolve(root)}${path.sep}`)
) {
  throw new Error(`Unsafe build directory: ${resolvedBuildDirectory}`);
}

fs.rmSync(resolvedBuildDirectory, { recursive: true, force: true });

const productionEnvironment: NodeJS.ProcessEnv = {
  ...process.env,
  VERCEL_ENV: "production",
  NODE_ENV: "production" as const,
  EVIDENCE_REVIEW_MODE: "true",
};
stageEvidenceAssets({
  runtime: {
    vercelEnvironment: "production",
    nodeEnvironment: "production",
    reviewMode: "true",
  },
});
const nextBinary = path.join(root, "node_modules", "next", "dist", "bin", "next");
const build = spawnSync(process.execPath, [nextBinary, "build"], {
  cwd: root,
  env: productionEnvironment,
  encoding: "utf8",
  stdio: "inherit",
});
if (build.status !== 0) {
  throw new Error(`Production build failed with exit code ${build.status}`);
}

const manifest = evidenceManifestSchema.parse(
  JSON.parse(
    fs.readFileSync(path.join(root, "data", "evidence-manifest.json"), "utf8"),
  ),
);
const candidates = manifest.filter((item) => item.status === "candidate");
const approved = manifest.filter((item) => item.status === "approved");
if (approved.length === 0) {
  throw new Error("Production evidence QA requires approved evidence.");
}
const expectedApprovedIds = [
  "commerce-run-audit-log",
  "wms-order-source-workbench",
  "wms-order-hold-validation",
  "wms-picking-inspection-loading",
  "wms-loading-block-before-inspection",
  "commerce-upload-approval-gate",
  "mybiz-readonly-operations-dashboard",
];
if (
  JSON.stringify(approved.map((item) => item.id).sort()) !==
  JSON.stringify(expectedApprovedIds.sort())
) {
  throw new Error("Production controls must be the seven approved evidence items.");
}
if (candidates.length !== 0) {
  throw new Error("Final Production evidence QA expects zero remaining candidates.");
}
const runtimeManifest = evidenceManifestSchema.parse(
  JSON.parse(
    fs.readFileSync(
      path.join(root, "data", "evidence-runtime-manifest.json"),
      "utf8",
    ),
  ),
);
if (
  runtimeManifest.some((item) => item.status !== "approved") ||
  runtimeManifest.length !== approved.length
) {
  throw new Error("Production runtime manifest must contain approved evidence only.");
}

for (const candidate of candidates) {
  const sha = Buffer.from(candidate.sha256);
  const hit = findBufferInDirectory(resolvedBuildDirectory, sha);
  if (hit) {
    throw new Error(`${candidate.id}: candidate SHA found in ${hit}`);
  }
}

const port = 4321;
const baseURL = `http://127.0.0.1:${port}`;

async function verifyProductionHttp() {
  let server: ChildProcess | undefined;
  try {
    const runningServer = spawn(
      process.execPath,
      [nextBinary, "start", "--hostname", "127.0.0.1", "--port", String(port)],
      {
        cwd: root,
        env: productionEnvironment,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    server = runningServer;
    const serverOutput: string[] = [];
    runningServer.stdout?.on("data", (chunk) =>
      serverOutput.push(String(chunk)),
    );
    runningServer.stderr?.on("data", (chunk) =>
      serverOutput.push(String(chunk)),
    );
    await waitForServer(`${baseURL}/ko`, runningServer, serverOutput);

    const client = await request.newContext({ baseURL });
    try {
      for (const candidate of candidates) {
        const response = await client.get(candidate.image);
        if (response.status() !== 404) {
          throw new Error(
            `${candidate.id}: expected Production 404, received ${response.status()}`,
          );
        }
      }
      for (const item of approved) {
        const response = await client.get(item.image);
        if (response.status() !== 200) {
          throw new Error(
            `${item.id}: expected Production 200, received ${response.status()}`,
          );
        }
      }
      const removedFixture = await client.get(
        "/images/evidence/production-approved-test-fixture.webp",
      );
      if (removedFixture.status() !== 404) {
        throw new Error(
          `Removed Production test fixture expected 404, received ${removedFixture.status()}`,
        );
      }
      const reviewPage = await client.get("/ko/ops/evidence-review");
      if (reviewPage.status() !== 404) {
        throw new Error(
          `Production review page expected 404, received ${reviewPage.status()}`,
        );
      }
      for (const route of [
        "/ko/automation/ai-business-automation-guide",
        "/ko/small-business/unify-order-channels",
        "/ko/warehouse-logistics/separate-picking-inspection-loading-status",
        "/ko/small-business/daily-numbers-for-small-business",
      ]) {
        const response = await client.get(route);
        const html = await response.text();
        if (/공개 전 검토 중|CANDIDATE · HUMAN REVIEW/.test(html)) {
          throw new Error(`${route}: candidate label found in Production HTML`);
        }
      }
    } finally {
      await client.dispose();
    }
  } finally {
    server?.kill();
  }

  console.log(
    `Production evidence approval PASS (${approved.length} approved URLs 200; ${candidates.length} candidates; removed fixture 404; review page 404; candidate labels 0).`,
  );
}

verifyProductionHttp().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

function findBufferInDirectory(directory: string, needle: Buffer): string | null {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const nested = findBufferInDirectory(target, needle);
      if (nested) return nested;
      continue;
    }
    if (entry.isFile() && fs.readFileSync(target).includes(needle)) {
      return path.relative(root, target).replaceAll("\\", "/");
    }
  }
  return null;
}

async function waitForServer(
  url: string,
  processHandle: ChildProcess,
  output: string[],
) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (processHandle.exitCode !== null) {
      throw new Error(
        `Production server exited early (${processHandle.exitCode}).\n${output.join("")}`,
      );
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}.\n${output.join("")}`);
}
