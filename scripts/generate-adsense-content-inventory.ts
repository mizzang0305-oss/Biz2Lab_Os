import fs from "node:fs";
import path from "node:path";

import { getAllPosts } from "@/lib/posts";

const outputPath = path.join(
  process.cwd(),
  "reports",
  "adsense-content-inventory-2026-07-23.md",
);

const prioritySlugs = new Set([
  "ai-business-automation-guide",
  "automation-priority-method",
  "accounts-receivable-tracker",
  "daily-numbers-for-small-business",
  "unify-order-channels",
]);

const posts = getAllPosts();
const clusterCounts = new Map<string, number>();

for (const post of posts) {
  clusterCounts.set(
    post.frontmatter.cluster,
    (clusterCounts.get(post.frontmatter.cluster) ?? 0) + 1,
  );
}

function isPublic(post: (typeof posts)[number]) {
  return (
    post.frontmatter.status === "published" &&
    !post.frontmatter.draft &&
    !post.frontmatter.noindex
  );
}

function contentDecision(post: (typeof posts)[number]) {
  if (isPublic(post)) return "유지";
  if (
    ["what-to-watch", "after-the-credits", "streaming-life"].includes(
      post.category,
    )
  ) {
    return "비공개/noindex";
  }
  if (post.category === "contracts-payments") return "보강";
  if (
    post.category === "automation" &&
    post.frontmatter.type !== "pillar"
  ) {
    return "통합 후보";
  }
  return "보강";
}

function riskLevel(post: (typeof posts)[number], chars: number) {
  if (chars < 1_200) return "높음";
  if (post.category === "contracts-payments") return "높음";
  if (!isPublic(post)) return "중간";
  return "낮음";
}

function searchIntent(post: (typeof posts)[number]) {
  switch (post.frontmatter.type) {
    case "how-to":
      return "실행 방법";
    case "checklist":
      return "도입 전 점검";
    case "case-study":
      return "사례·의사결정";
    case "pillar":
      return "주제 전체 이해";
    default:
      return "비교·문제 해결";
  }
}

function uniqueValue(post: (typeof posts)[number]) {
  const hasDownload = /\]\(\/downloads\/[^)]+\.csv\)/.test(post.content);
  const hasTable = /^\|.+\|$/m.test(post.content);
  const values = [
    hasDownload ? "CSV 자료" : null,
    hasTable ? "자체 표·체크리스트" : null,
  ].filter(Boolean);

  return values.length > 0 ? values.join(", ") : "운영자 검토 필요";
}

function escapeCell(value: string | number | boolean) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

const rows = posts
  .map((post) => {
    const plainText = post.content
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/[#>*_`[\]()!-]/g, " ")
      .replace(/\s+/g, "");
    const chars = plainText.length;
    const externalSources = Array.from(
      post.content.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g),
    ).length;
    const peerCount = clusterCounts.get(post.frontmatter.cluster) ?? 1;
    const decision = contentDecision(post);

    return {
      title: post.frontmatter.title,
      url: post.frontmatter.canonical,
      category: post.categoryName,
      publishedAt: post.frontmatter.publishedAt,
      updatedAt: post.frontmatter.updatedAt,
      chars,
      intent: searchIntent(post),
      uniqueValue: uniqueValue(post),
      image: post.frontmatter.heroImage ? "자체 로컬 이미지" : "없음",
      sources: externalSources > 0 ? `${externalSources}개` : "없음/불필요",
      similar: peerCount > 1 ? `동일 클러스터 ${peerCount}개` : "없음",
      thin: chars < 1_200 ? "예" : "아니오",
      risk: riskLevel(post, chars),
      decision,
      priority: prioritySlugs.has(post.slug)
        ? "P0"
        : decision === "유지"
          ? "P1"
          : decision === "보강"
            ? "P2"
            : "P3",
    };
  })
  .sort((a, b) => {
    const priority = a.priority.localeCompare(b.priority);
    return priority || a.category.localeCompare(b.category, "ko");
  });

const decisionCounts = rows.reduce<Record<string, number>>((counts, row) => {
  counts[row.decision] = (counts[row.decision] ?? 0) + 1;
  return counts;
}, {});

const lines = [
  "# Biz2Lab AdSense 콘텐츠 전수 인벤토리",
  "",
  "- 감사일: 2026-07-23",
  `- 전체 Markdown 글: ${rows.length}개`,
  `- 공개 유지: ${decisionCounts["유지"] ?? 0}개`,
  `- 보강: ${decisionCounts["보강"] ?? 0}개`,
  `- 통합 후보: ${decisionCounts["통합 후보"] ?? 0}개`,
  `- 비공개/noindex: ${decisionCounts["비공개/noindex"] ?? 0}개`,
  "- 삭제: 0개 (빈 문서·중복 URL로 확정된 항목 없음)",
  "",
  "분량은 공백·Markdown 기호를 제거한 로컬 본문 문자 수입니다. 검색 의도와 위험도는 실제 검색량이나 AdSense 판정이 아니라 저장소 구조·본문·공개 상태를 기준으로 한 내부 감사 분류입니다.",
  "",
  "| 제목 | URL | 카테고리 | 작성일 | 수정일 | 본문 분량 | 검색 의도 | 독창적 가치 | 자체 이미지 | 출처 | 유사 글 | 얇은 콘텐츠 | 승인 위험 | 처리 | 우선순위 |",
  "| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map((row) =>
    [
      row.title,
      row.url,
      row.category,
      row.publishedAt,
      row.updatedAt,
      row.chars,
      row.intent,
      row.uniqueValue,
      row.image,
      row.sources,
      row.similar,
      row.thin,
      row.risk,
      row.decision,
      row.priority,
    ]
      .map(escapeCell)
      .join(" | ")
      .replace(/^/, "| ")
      .replace(/$/, " |"),
  ),
  "",
];

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

console.log(
  `audit:adsense-inventory PASS (${rows.length} posts -> ${path.relative(process.cwd(), outputPath)})`,
);
