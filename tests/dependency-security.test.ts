import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

type PackageRecord = {
  version?: string;
};

type Lockfile = {
  packages: Record<string, PackageRecord>;
};

type PackageManifest = {
  overrides?: {
    next?: {
      postcss?: string;
      sharp?: string;
    };
  };
};

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")) as T;
}

function versionParts(version: string): number[] {
  return version.split(".").map((part) => Number.parseInt(part, 10));
}

function assertVersionAtLeast(actual: string | undefined, minimum: string, packagePath: string) {
  assert.ok(actual, `${packagePath} must exist in package-lock.json`);

  const actualParts = versionParts(actual);
  const minimumParts = versionParts(minimum);
  for (let index = 0; index < Math.max(actualParts.length, minimumParts.length); index += 1) {
    const actualPart = actualParts[index] ?? 0;
    const minimumPart = minimumParts[index] ?? 0;
    if (actualPart > minimumPart) {
      return;
    }
    if (actualPart < minimumPart) {
      assert.fail(`${packagePath}@${actual} must be at least ${minimum}`);
    }
  }
}

test("dependency overrides keep Next.js private build and image packages on patched releases", () => {
  const manifest = readJson<PackageManifest>("package.json");
  const lockfile = readJson<Lockfile>("package-lock.json");

  assert.equal(manifest.overrides?.next?.postcss, "8.5.22");
  assert.equal(manifest.overrides?.next?.sharp, "0.35.3");
  assertVersionAtLeast(lockfile.packages["node_modules/next/node_modules/postcss"]?.version, "8.5.12", "next/postcss");
  assertVersionAtLeast(lockfile.packages["node_modules/next/node_modules/sharp"]?.version, "0.35.0", "next/sharp");
});

test("lockfile keeps YAML and glob parsers above their patched minimums", () => {
  const lockfile = readJson<Lockfile>("package-lock.json");

  assertVersionAtLeast(lockfile.packages["node_modules/gray-matter/node_modules/js-yaml"]?.version, "3.15.0", "gray-matter/js-yaml");
  assertVersionAtLeast(lockfile.packages["node_modules/js-yaml"]?.version, "4.3.0", "js-yaml");
  assertVersionAtLeast(lockfile.packages["node_modules/brace-expansion"]?.version, "1.1.16", "brace-expansion@1");
  assertVersionAtLeast(
    lockfile.packages["node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion"]?.version,
    "5.0.7",
    "typescript-estree/brace-expansion",
  );
});
