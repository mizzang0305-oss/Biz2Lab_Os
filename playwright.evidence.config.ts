import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/evidence-browser",
  timeout: 45_000,
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:4320",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 4320",
    url: "http://127.0.0.1:4320/ko",
    env: {
      ...process.env,
      VERCEL_ENV: "preview",
      EVIDENCE_REVIEW_MODE: "false",
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
  reporter: [["list"]],
});
