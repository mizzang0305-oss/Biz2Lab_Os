import fs from "node:fs";
import path from "node:path";

import { getAllPosts, getPublicPosts } from "../lib/posts";

type Decision = {
  slug: string;
  route: string;
  action:
    | "KEEP_EVIDENCE_CASE"
    | "DEEP_REWRITE"
    | "CONSOLIDATE_AND_REDIRECT"
    | "MOVE_TO_DRAFT";
  destination?: string;
  finalRisk: "LOW" | "REMOVED_FROM_PUBLIC";
  reason: string;
};

const root = process.cwd();
const decisions = JSON.parse(
  fs.readFileSync(
    path.join(root, "data", "evidence-content-decisions.json"),
    "utf8",
  ),
) as Decision[];
const allPosts = new Map(getAllPosts().map((post) => [post.slug, post]));
const publicSlugs = new Set(getPublicPosts().map((post) => post.slug));
const issues: string[] = [];

if (decisions.length !== 21) {
  issues.push(`original URL decision inventory must contain 21 rows, found ${decisions.length}`);
}
if (new Set(decisions.map((item) => item.slug)).size !== decisions.length) {
  issues.push("decision inventory contains duplicate slugs");
}

for (const decision of decisions) {
  const post = allPosts.get(decision.slug);
  if (!post) {
    issues.push(`${decision.slug}: source article is missing`);
    continue;
  }
  if (post.route !== decision.route) {
    issues.push(`${decision.slug}: route mismatch`);
  }
  if (
    decision.action === "KEEP_EVIDENCE_CASE" ||
    decision.action === "DEEP_REWRITE"
  ) {
    if (!publicSlugs.has(decision.slug) || decision.finalRisk !== "LOW") {
      issues.push(`${decision.slug}: retained article must be public with LOW final risk`);
    }
  } else if (
    !post.frontmatter.draft ||
    post.frontmatter.status !== "draft" ||
    !post.frontmatter.noindex ||
    publicSlugs.has(decision.slug)
  ) {
    issues.push(`${decision.slug}: removed article must be draft/noindex and absent from public inventory`);
  }
}

const redirect = decisions.find(
  (item) => item.action === "CONSOLIDATE_AND_REDIRECT",
);
const nextConfig = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
if (
  !redirect?.destination ||
  !nextConfig.includes(`source: "${redirect.route}"`) ||
  !nextConfig.includes(`destination: "${redirect.destination}"`) ||
  !nextConfig.includes("permanent: true")
) {
  issues.push("consolidated URL is missing its permanent Next.js redirect");
}

if (issues.length > 0) {
  console.error(issues.map((issue) => `- ${issue}`).join("\n"));
  process.exit(1);
}

const unresolvedHighRisk = decisions.filter(
  (item) => item.finalRisk !== "LOW" && item.finalRisk !== "REMOVED_FROM_PUBLIC",
);
const lines = [
  "# Biz2Lab evidence content inventory — 2026-07-29",
  "",
  "> PR #123 Phase 2의 원본 21개 공개 URL 판정입니다. `MOVE_TO_DRAFT`는 noindex만 추가한 것이 아니라 공개 인벤토리·sitemap·RSS·자료실에서 제외합니다.",
  "",
  "| slug | original route | decision | destination | final risk | reason |",
  "|---|---|---|---|---|---|",
  ...decisions.map(
    (item) =>
      `| ${item.slug} | ${item.route} | **${item.action}** | ${item.destination ?? "-"} | ${item.finalRisk} | ${item.reason.replace(/\|/g, "\\|")} |`,
  ),
  "",
  "## 결과",
  "",
  `- 원본 URL 판정: ${decisions.length}개`,
  `- 공개 유지: ${decisions.filter((item) => item.finalRisk === "LOW").length}개`,
  `- draft 이동: ${decisions.filter((item) => item.action === "MOVE_TO_DRAFT").length}개`,
  `- 통합·영구 redirect: ${decisions.filter((item) => item.action === "CONSOLIDATE_AND_REDIRECT").length}개`,
  `- 미해결 HIGH risk: ${unresolvedHighRisk.length}개`,
  "- 전자계약(CN_FOOD_Contract)과 지시사항(CN_ExeFlow)은 공개 안전 fixture가 없어 이번 증거 manifest에 추가하지 않음",
];

fs.mkdirSync(path.join(root, "reports"), { recursive: true });
fs.writeFileSync(
  path.join(root, "reports", "biz2lab-evidence-content-inventory-2026-07-29.md"),
  `${lines.join("\n")}\n`,
);
console.log(
  `Evidence content inventory generated (${decisions.length} original URLs, ${unresolvedHighRisk.length} unresolved HIGH risk).`,
);
