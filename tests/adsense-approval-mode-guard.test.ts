import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { googleSetup } from "@/lib/google-setup";

function read(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
}

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
}

test("AdSense approval mode documents client-loader-only behavior without explicit ad slots", () => {
  const approvalMode = (
    googleSetup as typeof googleSetup & {
      adsenseApprovalMode?: {
        name: string;
        clientLoaderAllowed: boolean;
        manualAdSlotsAllowed: boolean;
        runtimeNoablateAllowedWhen: string;
      };
    }
  ).adsenseApprovalMode;
  const layoutSource = read("app/layout.tsx");

  assert.deepEqual(approvalMode, {
    name: "pre-approval-client-loader-only",
    clientLoaderAllowed: true,
    manualAdSlotsAllowed: false,
    runtimeNoablateAllowedWhen:
      "hidden, unfilled, no ad slot attribute, and no measurable layout footprint",
  });
  assert.match(layoutSource, /data-approval-mode=\{googleSetup\.adsenseApprovalMode\.name\}/);
  assert.match(layoutSource, /biz2lab-adsense-client/);
  assert.doesNotMatch(layoutSource, /<ins[^>]+adsbygoogle/i);
});

test("approval-mode source guard blocks explicit ad inventory markup and legacy ad globals", () => {
  const sourceFiles = ["app", "components", "lib", "content", "public", "data"]
    .flatMap((sourceRoot) => walkFiles(path.join(process.cwd(), sourceRoot)))
    .filter((filePath) => /\.(?:tsx?|jsx?|md|mdx|json|html|txt)$/.test(filePath));
  const offenders: string[] = [];

  for (const filePath of sourceFiles) {
    const relativePath = path.relative(process.cwd(), filePath).replaceAll(path.sep, "/");
    const source = fs.readFileSync(filePath, "utf8");

    if (/<ins[^>]+adsbygoogle/i.test(source)) {
      offenders.push(`${relativePath}: manual adsbygoogle ins markup`);
    }
    if (/data-ad-slot\s*=/i.test(source)) {
      offenders.push(`${relativePath}: data-ad-slot markup`);
    }
    if (/google_ad_client|google_ad_slot|enable_page_level_ads/i.test(source)) {
      offenders.push(`${relativePath}: legacy Google ad global`);
    }
  }

  assert.deepEqual(offenders, []);
});

test("final runtime guard report records approval-mode live evidence and re-review recommendation", () => {
  const report = read("reports/adsense-approval-mode-runtime-guard.md");

  assert.match(report, /# Biz2Lab AdSense Approval Mode Runtime Guard/);
  assert.match(report, /runtime element: `ins\.adsbygoogle-noablate` observed/);
  assert.match(report, /data-ad-slot: NONE/);
  assert.match(report, /display: none/);
  assert.match(report, /measurable layout footprint: NONE/);
  assert.match(report, /mobile overflow: PASS/);
  assert.match(report, /desktop overflow: PASS/);
  assert.match(report, /manual ad slot markup: NONE/);
  assert.match(report, /recommendation: `READY_FOR_ADSENSE_REVIEW_WITH_APPROVAL_MODE_GUARD`/);
});
