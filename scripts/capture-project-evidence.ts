import { createHash } from "node:crypto";
import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { chromium, type Browser, type Page } from "@playwright/test";
import sharp from "sharp";

import {
  evidenceCaptureDefinitions,
  type EvidenceCaptureDefinition,
} from "../config/evidence-sources";
import {
  evidenceManifestSchema,
  type EvidenceItem,
} from "../lib/evidence-schema";
import {
  assertLocalUrl,
  discoverEvidenceSources,
  redactPath,
} from "./evidence-utils";

const root = process.cwd();
const manifestPath = path.join(root, "data", "evidence-manifest.json");
const rawDirectory = path.join(root, "artifacts", "evidence", "raw");
const reportDirectory = path.join(root, "artifacts", "evidence", "reports");
const publicImageDirectory = path.join(root, "public", "images", "posts");

type CaptureResult = {
  id: string;
  status: "candidate" | "blocked";
  reason?: string;
  sourceCommit?: string;
};

async function main() {
  const requestedId = readArgument("--id");
  const captureAll = process.argv.includes("--all");
  if (!captureAll && !requestedId) {
    throw new Error("Use --all or --id <evidence-id>.");
  }

  const definitions = requestedId
    ? evidenceCaptureDefinitions.filter((item) => item.id === requestedId)
    : evidenceCaptureDefinitions;
  if (definitions.length === 0) {
    throw new Error(`Unknown evidence id: ${requestedId}`);
  }

  fs.mkdirSync(rawDirectory, { recursive: true });
  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.mkdirSync(publicImageDirectory, { recursive: true });

  const discovered = new Map(
    discoverEvidenceSources().map((source) => [source.projectKey, source]),
  );
  const manifest = evidenceManifestSchema.parse(
    JSON.parse(fs.readFileSync(manifestPath, "utf8")),
  );
  const results: CaptureResult[] = [];
  const serverByProject = new Map<string, ChildProcess>();
  let browser: Browser | undefined;

  try {
    browser = await chromium.launch({ headless: true });
    for (const definition of definitions) {
      const source = discovered.get(definition.projectKey);
      if (!source?.found || !source.repositoryPath || !source.sourceCommit) {
        results.push({
          id: definition.id,
          status: "blocked",
          reason: source?.reason ?? "repository not found",
        });
        continue;
      }
      if (source.sourceDirty) {
        results.push({
          id: definition.id,
          status: "blocked",
          reason: "selected source worktree is dirty",
          sourceCommit: source.sourceCommit,
        });
        continue;
      }

      if (!serverByProject.has(definition.projectKey)) {
        const server = startServer(definition, source.repositoryPath);
        serverByProject.set(definition.projectKey, server);
        await waitForHealth(definition);
      }

      try {
        const evidence = await captureOne(
          browser,
          definition,
          source.sourceCommit,
        );
        const index = manifest.findIndex((item) => item.id === evidence.id);
        if (index >= 0) {
          if (manifest[index].status === "approved") {
            throw new Error(
              `Refusing to overwrite approved evidence ${evidence.id}; retire it first.`,
            );
          }
          manifest[index] = evidence;
        } else {
          manifest.push(evidence);
        }
        results.push({
          id: definition.id,
          status: "candidate",
          sourceCommit: source.sourceCommit,
        });
      } catch (error) {
        removeCaptureFiles(definition);
        results.push({
          id: definition.id,
          status: "blocked",
          reason: redactPath(
            error instanceof Error ? error.message : String(error),
          ),
          sourceCommit: source.sourceCommit,
        });
      }
    }
  } finally {
    await browser?.close();
    for (const server of serverByProject.values()) {
      stopServer(server);
    }
  }

  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify(evidenceManifestSchema.parse(manifest), null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(reportDirectory, "capture-results.json"),
    `${JSON.stringify(results, null, 2)}\n`,
  );
  console.log(JSON.stringify(results, null, 2));

  if (results.some((item) => item.status === "blocked")) {
    process.exitCode = 2;
  }
}

function startServer(
  definition: EvidenceCaptureDefinition,
  repositoryPath: string,
) {
  const command = process.platform === "win32" ? definition.startCommand : definition.startCommand.replace(/\bnpm\b/g, "npm");
  const child = spawn(command, {
    cwd: repositoryPath,
    env: {
      ...process.env,
      ...definition.env,
      BROWSER: "none",
      CI: "1",
    },
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  child.stdout?.on("data", () => undefined);
  child.stderr?.on("data", () => undefined);
  return child;
}

async function waitForHealth(definition: EvidenceCaptureDefinition) {
  const url = `http://127.0.0.1:${definition.port}${definition.healthPath}`;
  assertLocalUrl(url);
  const deadline = Date.now() + 90_000;
  let lastError = "server not ready";
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) {
        return;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Health check timed out: ${redactPath(lastError)}`);
}

async function captureOne(
  browser: Browser,
  definition: EvidenceCaptureDefinition,
  sourceCommit: string,
): Promise<EvidenceItem> {
  const context = await browser.newContext({
    viewport: definition.viewport,
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const page = await context.newPage();
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  try {
    const url = `http://127.0.0.1:${definition.port}${definition.route}`;
    assertLocalUrl(url);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.locator(definition.readySelector).waitFor({
      state: "visible",
      timeout: 45_000,
    });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);

    for (const selector of definition.hideSelectors) {
      await page.locator(selector).evaluateAll((elements) => {
        for (const element of elements) {
          (element as HTMLElement).style.display = "none";
        }
      });
    }

    const target = page.locator(definition.captureSelector);
    if ((await target.count()) !== 1) {
      throw new Error(
        `captureSelector must resolve exactly once: ${definition.captureSelector}`,
      );
    }
    await target.waitFor({ state: "visible" });

    const scanText = await collectScanText(page, definition);
    const findings = scanForSensitiveText(scanText);
    if (findings.length > 0) {
      throw new Error(`PII scan failed: ${findings.join(", ")}`);
    }

    const sequence = evidenceCaptureDefinitions
      .filter((item) => item.postSlug === definition.postSlug)
      .findIndex((item) => item.id === definition.id) + 1;
    const baseName = `${definition.postSlug}-evidence-${String(sequence).padStart(2, "0")}`;
    const rawPath = path.join(rawDirectory, `${baseName}.png`);
    const outputPath = path.join(publicImageDirectory, `${baseName}.webp`);
    const masks = definition.maskSelectors.map((selector) => page.locator(selector));

    await target.screenshot({
      path: rawPath,
      animations: "disabled",
      caret: "hide",
      mask: masks,
      maskColor: "#64748b",
    });

    await sharp(rawPath)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    if (
      metadata.format !== "webp" ||
      !metadata.width ||
      !metadata.height ||
      metadata.width < 640 ||
      metadata.height < 160
    ) {
      throw new Error("Evidence image is too small or not WebP.");
    }

    const sha256 = createHash("sha256")
      .update(fs.readFileSync(outputPath))
      .digest("hex");
    const highSignalErrors = consoleErrors.filter(
      (message) =>
        !/favicon|react devtools|download the react devtools/i.test(message),
    );
    if (highSignalErrors.length > 0) {
      throw new Error(`Browser console error: ${highSignalErrors[0]}`);
    }

    return {
      id: definition.id,
      postSlug: definition.postSlug,
      projectKey: definition.projectKey,
      projectLabelKo: definition.projectLabelKo,
      repositoryName: definition.repositoryName,
      sourceCommit,
      sourceDirty: false,
      sourceRoute: definition.route,
      image: `/images/posts/${baseName}.webp`,
      width: metadata.width,
      height: metadata.height,
      altKo: definition.altKo,
      captionKo: definition.captionKo,
      capturedAt: "2026-07-28",
      dataMode: definition.dataMode,
      redactions: definition.maskSelectors.map((selector) =>
        selector.replace(/[^a-zA-Z0-9가-힣_-]+/g, " ").trim(),
      ),
      piiScan: "pass",
      status: "candidate",
      sha256,
      claimSupportedKo: definition.claimSupportedKo,
      claimNotSupportedKo: definition.claimNotSupportedKo,
    };
  } finally {
    await context.close();
  }
}

async function collectScanText(
  page: Page,
  definition: EvidenceCaptureDefinition,
) {
  const captureSelector = JSON.stringify(definition.captureSelector);
  const excludedSelectors = JSON.stringify([
    ...definition.maskSelectors,
    ...definition.hideSelectors,
  ]);
  return (await page.evaluate(`(() => {
    const excluded = ["script", "style", "noscript", ...${excludedSelectors}];
    const collect = (element) => {
      if (!element) return "";
      const clone = element.cloneNode(true);
      for (const selector of excluded) {
        clone.querySelectorAll(selector).forEach((node) => node.remove());
      }
      return (clone.textContent || "").replace(/\\s+/g, " ").trim();
    };
    return collect(document.body) + "\\n" + collect(document.querySelector(${captureSelector}));
  })()`)) as string;
}

function scanForSensitiveText(text: string) {
  const patterns: Array<[string, RegExp]> = [
    ["Korean mobile number", /\b01[016789][-\s]?\d{3,4}[-\s]?\d{4}\b/],
    ["email", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
    ["resident number", /\b\d{6}[-\s]?[1-4]\d{6}\b/],
    ["business number", /\b\d{3}[-\s]?\d{2}[-\s]?\d{5}\b/],
    ["Windows absolute path", /[A-Za-z]:\\[^\s]+/],
    ["Unix home path", /\/(?:Users|home)\/[^\s]+/],
    [
      "credential-like value",
      /\b(?:secret|token|api[-_]?key|authorization|account)\s*[:=]\s*[A-Za-z0-9_./+-]{16,}/i,
    ],
    [
      "account-number-like value",
      /(?:계좌|account)[^\n]{0,20}\b\d{8,16}\b/i,
    ],
  ];
  return patterns.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
}

function removeCaptureFiles(definition: EvidenceCaptureDefinition) {
  const sequence = evidenceCaptureDefinitions
    .filter((item) => item.postSlug === definition.postSlug)
    .findIndex((item) => item.id === definition.id) + 1;
  const baseName = `${definition.postSlug}-evidence-${String(sequence).padStart(2, "0")}`;
  for (const filePath of [
    path.join(rawDirectory, `${baseName}.png`),
    path.join(publicImageDirectory, `${baseName}.webp`),
  ]) {
    if (!fs.existsSync(filePath)) continue;
    try {
      fs.rmSync(filePath);
    } catch (error) {
      console.warn(
        `Could not remove failed capture artifact: ${redactPath(
          error instanceof Error ? error.message : String(error),
        )}`,
      );
    }
  }
}

function readArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function stopServer(server: ChildProcess) {
  if (!server.pid) return;
  if (process.platform === "win32") {
    try {
      execFileSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], {
        stdio: "ignore",
      });
      return;
    } catch {
      server.kill();
      return;
    }
  }
  server.kill("SIGTERM");
}

main().catch((error) => {
  console.error(redactPath(error instanceof Error ? error.stack ?? error.message : String(error)));
  process.exitCode = 1;
});
