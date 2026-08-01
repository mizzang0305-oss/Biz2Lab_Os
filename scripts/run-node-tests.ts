import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const testsRoot = path.join(root, "tests");

function collectTestFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectTestFiles(absolute);
      return entry.isFile() && entry.name.endsWith(".test.ts")
        ? [absolute]
        : [];
    })
    .sort();
}

const testFiles = collectTestFiles(testsRoot);
if (testFiles.length === 0) {
  throw new Error("No Node test files were found under tests/.");
}

const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
const result = spawnSync(process.execPath, [tsxCli, "--test", ...testFiles], {
  cwd: root,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
