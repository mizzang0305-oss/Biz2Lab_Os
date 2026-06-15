import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const staticOutput = path.join(process.cwd(), "out");
const pagefindOutput = path.join(process.cwd(), "public", "pagefind");

if (!fs.existsSync(staticOutput)) {
  console.log("build-search SKIP: static export directory 'out' does not exist yet.");
  console.log("Run a static export or configure deployment indexing before enabling Pagefind in production.");
  process.exit(0);
}

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["pagefind", "--site", staticOutput, "--output-path", pagefindOutput],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);

