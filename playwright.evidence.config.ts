import { defineConfig } from "@playwright/test";

const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL?.replace(/\/$/, "");

export default defineConfig({
  testDir: "./tests/evidence-browser",
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {
    baseURL: externalBaseURL ?? "http://127.0.0.1:4320",
    trace: "retain-on-failure",
  },
  webServer: externalBaseURL ? undefined : {
    command:
      "tsx scripts/start-evidence-preview-server.ts --hostname 127.0.0.1 --port 4320",
    url: "http://127.0.0.1:4320/ko",
    env: {
      ...process.env,
      NODE_ENV: "production",
      VERCEL_ENV: "preview",
      EVIDENCE_REVIEW_MODE: "false",
    },
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
    gracefulShutdown: {
      signal: "SIGINT",
      timeout: 5_000,
    },
  },
  reporter: [["list"]],
});
