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
  type PublicEvidenceItem,
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
const candidateImageDirectory = path.join(root, "evidence-assets", "candidates");

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
  fs.mkdirSync(candidateImageDirectory, { recursive: true });

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
): Promise<PublicEvidenceItem> {
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
    await page.locator(
      definition.initialReadySelector ?? definition.readySelector,
    ).waitFor({
      state: "visible",
      timeout: 45_000,
    });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);

    if (definition.captureStyle) {
      await page.addStyleTag({ content: definition.captureStyle });
    }
    for (const selector of definition.clickSelectors ?? []) {
      const locator = page.locator(selector);
      if ((await locator.count()) !== 1) {
        throw new Error(`click selector must resolve exactly once: ${selector}`);
      }
      await locator.click();
    }
    await page.locator(definition.readySelector).waitFor({
      state: "visible",
      timeout: 45_000,
    });
    if (definition.settleTimeMs) {
      await page.waitForTimeout(definition.settleTimeMs);
    }
    for (const input of definition.inputValues ?? []) {
      const locator = page.locator(input.selector);
      if ((await locator.count()) !== 1) {
        throw new Error(`input selector must resolve exactly once: ${input.selector}`);
      }
      await locator.fill(input.value);
    }
    for (const replacement of definition.textReplacements ?? []) {
      const locator = page.locator(replacement.selector);
      if ((await locator.count()) !== 1) {
        throw new Error(
          `text replacement selector must resolve exactly once: ${replacement.selector}`,
        );
      }
      await locator.evaluate(
        (element, value) => {
          element.textContent = value;
        },
        replacement.value,
      );
    }
    if (definition.textSubstitutions?.length) {
      await page.locator("body").evaluate((body, substitutions) => {
        const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          let text = node.textContent ?? "";
          for (const substitution of substitutions) {
            text = text.split(substitution.from).join(substitution.to);
          }
          node.textContent = text;
          node = walker.nextNode();
        }
      }, definition.textSubstitutions);
    }

    for (const selector of definition.hideSelectors) {
      await page.locator(selector).evaluateAll((elements) => {
        for (const element of elements) {
          element.remove();
        }
      });
    }
    if (definition.focusedListItem) {
      const list = page.locator(definition.focusedListItem.listSelector);
      if ((await list.count()) !== 1) {
        throw new Error(
          `focused list selector must resolve exactly once: ${definition.focusedListItem.listSelector}`,
        );
      }
      const items = list.locator(":scope > li");
      if ((await items.count()) < 1) {
        throw new Error("focused list selector has no direct list items");
      }
      await items.evaluateAll((elements, includesText) => {
        for (const element of elements) {
          if (!(element.textContent ?? "").includes(includesText)) {
            element.remove();
          }
        }
      }, definition.focusedListItem.includesText);
      if ((await list.locator(":scope > li").count()) !== 1) {
        throw new Error(
          `focused list must retain exactly one item containing: ${definition.focusedListItem.includesText}`,
        );
      }
    }

    const target = page.locator(definition.captureSelector);
    if ((await target.count()) !== 1) {
      throw new Error(
        `captureSelector must resolve exactly once: ${definition.captureSelector}`,
      );
    }
    await target.waitFor({ state: "visible" });
    if (definition.disclosureLabel) {
      await target.evaluate((element, label) => {
        const banner = document.createElement("aside");
        banner.dataset.evidenceDisclosure = "true";
        banner.textContent = label;
        Object.assign(banner.style, {
          border: "2px solid #0f766e",
          borderRadius: "12px",
          background: "#ecfdf5",
          color: "#134e4a",
          fontSize: "15px",
          fontWeight: "800",
          lineHeight: "1.5",
          marginBottom: "14px",
          padding: "10px 12px",
        });
        element.prepend(banner);
      }, definition.disclosureLabel);
    }

    const visibleCaptureText = (await target.evaluate((element) => {
      const visibleText: string[] = [];
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const parent = node.parentElement;
        if (parent) {
          const style = window.getComputedStyle(parent);
          if (
            parent.getClientRects().length > 0 &&
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            style.opacity !== "0"
          ) {
            visibleText.push(node.textContent ?? "");
          }
        }
        node = walker.nextNode();
      }
      return visibleText.join(" ");
    }))
      .replace(/\s+/g, " ")
      .trim();
    const missingVisibleText = (definition.requiredVisibleText ?? []).filter(
      (value) => !visibleCaptureText.includes(value),
    );
    if (missingVisibleText.length > 0) {
      throw new Error(
        `Capture target is missing required visible text: ${missingVisibleText.join(", ")}`,
      );
    }
    const forbiddenVisibleText = (definition.forbiddenVisibleText ?? []).filter(
      (value) => visibleCaptureText.includes(value),
    );
    if (forbiddenVisibleText.length > 0) {
      throw new Error(
        `Capture target contains forbidden visible text: ${forbiddenVisibleText.join(", ")}`,
      );
    }

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
    const outputPath = path.join(candidateImageDirectory, `${baseName}.webp`);
    const masks = definition.maskSelectors.map((selector) => page.locator(selector));

    if (definition.captureBounds) {
      const [targetBox, startBox, endBox] = await Promise.all([
        target.boundingBox(),
        page.locator(definition.captureBounds.startSelector).boundingBox(),
        page.locator(definition.captureBounds.endSelector).boundingBox(),
      ]);
      if (!targetBox || !startBox || !endBox) {
        throw new Error("capture bounds could not be measured");
      }
      const y = startBox.y;
      const bottom = endBox.y + endBox.height;
      await page.screenshot({
        path: rawPath,
        animations: "disabled",
        caret: "hide",
        mask: masks,
        maskColor: "#64748b",
        clip: {
          x: targetBox.x,
          y,
          width: targetBox.width,
          height: bottom - y,
        },
      });
    } else {
      await target.screenshot({
        path: rawPath,
        animations: "disabled",
        caret: "hide",
        mask: masks,
        maskColor: "#64748b",
      });
    }

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
      metadata.width < 360 ||
      metadata.height < 160
    ) {
      throw new Error("Evidence image is too small or not WebP.");
    }
    const renderedHeightAt390 = (390 * metadata.height) / metadata.width;
    if (
      definition.minRenderedHeightAt390 &&
      renderedHeightAt390 < definition.minRenderedHeightAt390
    ) {
      throw new Error(
        `Evidence image renders at ${renderedHeightAt390.toFixed(1)}px high at 390px, below ${definition.minRenderedHeightAt390}px.`,
      );
    }
    const aspectRatio = metadata.width / metadata.height;
    if (
      definition.aspectRatio &&
      (aspectRatio < definition.aspectRatio.min ||
        aspectRatio > definition.aspectRatio.max)
    ) {
      throw new Error(
        `Evidence image aspect ratio ${aspectRatio.toFixed(2)} is outside ${definition.aspectRatio.min}-${definition.aspectRatio.max}.`,
      );
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
      image: `/images/evidence/${baseName}.webp`,
      width: metadata.width,
      height: metadata.height,
      altKo: definition.altKo,
      captionKo: definition.captionKo,
      capturedAt: new Date().toISOString().slice(0, 10),
      dataMode: definition.dataMode,
      transformations: definition.transformations,
      redactions: definition.maskSelectors.map((selector) =>
        selector.replace(/[^a-zA-Z0-9가-힣_-]+/g, " ").trim(),
      ),
      ...(definition.maskSelectors.length > 0
        ? {
            redactionReason:
              "캡처 대상의 운영 식별값이 공개 후보 이미지에 포함되지 않도록 마스킹",
          }
        : {}),
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
  return (await page.evaluate(`(() => {
    const excluded = ["script", "style", "noscript"];
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
    [
      "Korean landline number",
      /\b0(?:2|3[1-3]|4[1-4]|5[1-5]|6[1-4])[-\s]?\d{3,4}[-\s]?\d{4}\b/,
    ],
    ["email", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
    ["resident number", /\b\d{6}[-\s]?[1-4]\d{6}\b/],
    ["business number", /\b\d{3}[-\s]?\d{2}[-\s]?\d{5}\b/],
    ["Windows absolute path", /[A-Za-z]:\\[^\s]+/],
    ["Unix home path", /\/(?:Users|home)\/[^\s]+/],
    [
      "private repository URL",
      /https?:\/\/(?:www\.)?(?:github\.com|gitlab\.com|bitbucket\.org)\/[^\s]+/i,
    ],
    [
      "real-looking address",
      /\b(?:서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)[가-힣]{0,8}(?:시|도|구|군)\s+[가-힣0-9-]+/,
    ],
    [
      "known real-looking fixture name",
      /서울 단골 커피|서울푸드|Golden Coffee|김하린|박지훈|이서연/i,
    ],
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
    path.join(candidateImageDirectory, `${baseName}.webp`),
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
