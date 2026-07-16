import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingExcludes: {
    "/api/admin/content-automation/*": [
      "./.git/**/*",
      "./.codex/**/*",
      "./.codex-remote-attachments/**/*",
      "./assets/**/*",
      "./docs/**/*",
      "./image-briefs/**/*",
      "./image-requests/**/*",
      "./public/**/*",
      "./reports/**/*",
      "./tests/**/*",
      "./AGENTS.md",
      "./CLAUDE.md",
      "./README.md",
      "./eslint.config.mjs",
      "./next.config.ts",
      "./package-lock.json",
      "./postcss.config.mjs",
      "./proxy.ts",
      "./tsconfig.json",
      "./tsconfig.tsbuildinfo",
    ],
  },
  images: {
    localPatterns: [
      {
        pathname: "/images/posts/**",
        search: "",
      },
      {
        pathname: "/images/editorial/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
