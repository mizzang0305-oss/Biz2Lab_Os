import fs from "node:fs";
import path from "node:path";

import { evidenceCaptureDefinitions } from "../config/evidence-sources";
import { getPublicPosts } from "../lib/posts";

const flagshipBySlug = new Map(
  evidenceCaptureDefinitions.map((item) => [item.postSlug, item]),
);
const rows = getPublicPosts().map((post) => {
  const flagship = flagshipBySlug.get(post.slug);
  const hasFaq = (post.frontmatter.faq?.length ?? 0) > 0;
  const hasDownload = /\]\(\/downloads\//.test(post.content);
  const genericToolArticle =
    post.frontmatter.type !== "case-study" &&
    /도구|오픈소스|가이드|자동화/.test(post.frontmatter.title);
  return {
    slug: post.slug,
    title: post.frontmatter.title,
    route: post.route,
    currentType: post.frontmatter.type,
    actualExperience: flagship ? "YES — 실행 화면·commit 연결" : "PARTIAL — 글별 검증 메모",
    sourceProject: flagship?.projectLabelKo ?? "직접 연결된 화면 없음",
    screenshotPossible: flagship ? "YES — candidate 확보" : "미확인",
    uniqueValue: flagship
      ? flagship.claimSupportedKo
      : "현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음",
    templateRisk:
      hasFaq && hasDownload
        ? "HIGH — FAQ·다운로드 반복"
        : hasFaq
          ? "MEDIUM — FAQ 반복"
          : "LOW",
    recommendedAction: flagship
      ? "KEEP"
      : genericToolArticle
        ? "NOINDEX_CANDIDATE"
        : "DEEP_REWRITE",
    reason: flagship
      ? "안전한 local demo/fixture와 exact source commit을 자동 캡처함"
      : genericToolArticle
        ? "일반 도구 설명보다 현장 구축 사례와의 직접 연결을 먼저 보강해야 함"
        : "URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보",
  };
});

const lines = [
  "# Biz2Lab evidence content inventory — 2026-07-28",
  "",
  "> 이 보고서는 URL 삭제나 noindex 적용을 실행하지 않습니다. 5개 대표 사례만 이번 PR에서 깊게 재작성했고 나머지는 제안 상태입니다.",
  "",
  "| slug | title | route | currentType | actualExperience | sourceProject | screenshotPossible | uniqueValue | templateRisk | recommendedAction | reason |",
  "|---|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map(
    (row) =>
      `| ${row.slug} | ${escape(row.title)} | ${row.route} | ${row.currentType} | ${row.actualExperience} | ${row.sourceProject} | ${row.screenshotPossible} | ${escape(row.uniqueValue)} | ${row.templateRisk} | **${row.recommendedAction}** | ${escape(row.reason)} |`,
  ),
  "",
  "## 이번 적용 범위",
  "",
  `- 공개 글 인벤토리: ${rows.length}개`,
  `- 화면·commit 연결 대표 사례: ${rows.filter((row) => row.recommendedAction === "KEEP").length}개`,
  `- 제안만 기록한 글: ${rows.filter((row) => row.recommendedAction !== "KEEP").length}개`,
  "- 대량 삭제·archive·noindex 변경: 0개",
];

fs.mkdirSync(path.join(process.cwd(), "reports"), { recursive: true });
fs.writeFileSync(
  path.join(
    process.cwd(),
    "reports",
    "biz2lab-evidence-content-inventory-2026-07-28.md",
  ),
  `${lines.join("\n")}\n`,
);
console.log(`Evidence content inventory generated (${rows.length} public posts).`);

function escape(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
