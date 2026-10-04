import type { NextConfig } from "next";
const knowledgeContentTrace = ["./content/knowledge-essays/*.md", "./data/knowledge-publication.json", "./data/knowledge-series-plan.json", "./components/essays/AntikytheraEssay.tsx"];

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
      { pathname: "/images/essays/**", search: "" },
      {
        pathname: "/images/evidence/**",
        search: "",
      },
      {
        pathname: "/images/posts/**",
        search: "",
      },
      {
        pathname: "/images/editorial/**",
        search: "",
      },
      {
        pathname: "/images/onurim/**",
        search: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/ko/sales-ops/unify-order-channels-for-sales",
        destination: "/ko/small-business/unify-order-channels",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/": knowledgeContentTrace,
    "/essays/*": knowledgeContentTrace,
    "/essays/**/*": [...knowledgeContentTrace, "./assets/fonts/NotoSansKR-series-subset.woff", "./assets/fonts/series-font-provenance.json"],
    "/topics/*": knowledgeContentTrace,
    "/sitemap.xml": knowledgeContentTrace,
    "/rss.xml": knowledgeContentTrace,
  },
  async headers() {
    const published = process.env.VERCEL_ENV === "production" && process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED === "true";
    return [
      ...(published ? [] : [{ source: "/:path*", headers: [{key: "X-Robots-Tag", value: "noindex, nofollow"}] }]),
      {source:"/admin/:path*",headers:[{key:"Content-Security-Policy",value:"frame-ancestors 'none'"},{key:"X-Frame-Options",value:"DENY"},{key:"Cache-Control",value:"no-store"},{key:"X-Robots-Tag",value:"noindex, nofollow"}]},
      {source:"/review/:path*",headers:[{key:"Content-Security-Policy",value:"frame-ancestors 'none'"},{key:"X-Frame-Options",value:"DENY"},{key:"Cache-Control",value:"no-store"}]},
    ];
  },
};

export default nextConfig;
