import { getPublicPosts, type Post } from "@/lib/posts";
import {
  seoKeywordMapBySlug,
  type KeywordSearchIntent,
  type SeoKeywordMapEntry,
} from "@/lib/seo-keyword-audit";

export const aiAnswerReadinessStatuses = [
  "AI 답변 준비 좋음",
  "FAQ 보강 필요",
  "결론 요약 보강 필요",
  "체크리스트 보강 필요",
  "비교 기준 보강 필요",
] as const;

export type AiAnswerReadinessStatus = (typeof aiAnswerReadinessStatuses)[number];

export type SeoAnswerReadinessArticleAudit = {
  slug: string;
  route: string;
  title: string;
  aiAnswerReadinessStatus: AiAnswerReadinessStatus;
  directAnswerInFirstLines: boolean;
  faqPresent: boolean;
  conclusionFirstPresent: boolean;
  checklistPresent: boolean;
  comparisonTablePresent: boolean;
  comparisonTableUseful: boolean;
  fitAvoidPresent: boolean;
  citationFriendlySummaryPresent: boolean;
  overclaimingFaq: boolean;
  recommendedAction: string;
};

export type SeoAnswerReadinessAudit = {
  articles: SeoAnswerReadinessArticleAudit[];
  summary: {
    totalArticles: number;
    readyArticles: number;
    needsFaq: number;
    needsConclusion: number;
    needsChecklist: number;
    needsComparison: number;
    overclaimingFaq: number;
  };
};

const faqOverclaimTerms = [
  "무조건 추천",
  "완전 무료",
  "상업 사용 보장",
  "100% 보장",
  "반드시 성공",
  "완벽한 대체",
];

const comparisonIntents = new Set<KeywordSearchIntent>(["comparison"]);

function normalizedBody(content: string) {
  return content.replace(/\r\n/g, "\n");
}

function markdownTablePresent(content: string) {
  return /\n\|[^\n]+\|\n\|[-:|\s]+\|/.test(normalizedBody(content));
}

function markdownFaqPresent(content: string) {
  return /^##\s+(FAQ|자주 묻는 질문)/m.test(content) || /^Q\.\s+/m.test(content);
}

function frontmatterFaqPresent(post: Post) {
  return Array.isArray(post.frontmatter.faq) && post.frontmatter.faq.length >= 3;
}

function faqText(post: Post) {
  const frontmatterFaq = post.frontmatter.faq ?? [];
  const bodyFaq = post.content.match(/^##\s+(FAQ|자주 묻는 질문)[\s\S]*?(?=^##\s+|\s*$)/m)?.[0] ?? "";
  return [
    ...frontmatterFaq.flatMap((item) => [item.question, item.answer]),
    bodyFaq,
  ].join(" ");
}

function firstAnswerLines(content: string) {
  return normalizedBody(content)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("|"))
    .slice(0, 3)
    .join(" ");
}

function hasDirectAnswerInFirstLines(post: Post) {
  const firstLines = firstAnswerLines(post.content);
  return (
    firstLines.length >= 50 &&
    /(입니다|합니다|해야 합니다|볼 수 있습니다|확인해야 합니다|적합합니다|필요합니다)/.test(firstLines)
  );
}

function hasConclusionFirst(post: Post) {
  return (
    hasDirectAnswerInFirstLines(post) ||
    Boolean(post.frontmatter.editorNote && post.frontmatter.editorNote.length >= 30) ||
    post.headings.some((heading) =>
      /(먼저 (?:내릴 )?결론|결론부터|지금 결론|핵심 판단|가장 먼저|먼저 정할|뜻하는|이유|신호|결말)/.test(
        heading.text,
      ),
    )
  );
}

function hasChecklist(post: Post) {
  // Entertainment guides do not need a literal checkbox block to be useful.
  // A reviewed article with five or more editorial sections already exposes a
  // scannable decision or interpretation framework without forcing filler.
  if (
    ["what-to-watch", "after-the-credits", "streaming-life"].includes(post.category) &&
    post.headings.filter((heading) => heading.level === 2).length >= 5
  ) {
    return post.headings.filter((heading) => heading.level === 2).length >= 5;
  }

  if (
    /^- \[[ xX]\]/m.test(post.content) ||
    /^\d+\.\s+/m.test(post.content) ||
    (markdownTablePresent(post.content) && /\/downloads\/[a-z0-9-]+\.csv/.test(post.content))
  ) {
    return true;
  }

  return post.headings.some((heading) =>
    /(체크리스트|확인 포인트|확인할 기준|확인 항목|고르는 법|고르기|선택 기준|정할 것|설정|순서|줄이는|목록)/.test(
      heading.text,
    ),
  );
}

function hasFitAvoid(post: Post) {
  return /쓰면 좋은 경우/.test(post.content) && /피해야 할 경우/.test(post.content);
}

function hasCitationFriendlySummary(post: Post) {
  return (
    hasDirectAnswerInFirstLines(post) ||
    Boolean(post.frontmatter.editorNote && post.frontmatter.editorNote.length >= 30)
  );
}

function comparisonUseful(entry: SeoKeywordMapEntry | undefined) {
  return entry ? comparisonIntents.has(entry.searchIntent) : false;
}

function faqHasOverclaim(post: Post) {
  const text = faqText(post);
  return faqOverclaimTerms.some((term) => text.includes(term));
}

function readinessStatus(article: {
  faqPresent: boolean;
  conclusionFirstPresent: boolean;
  citationFriendlySummaryPresent: boolean;
  checklistPresent: boolean;
  comparisonTablePresent: boolean;
  comparisonTableUseful: boolean;
  overclaimingFaq: boolean;
}): AiAnswerReadinessStatus {
  if (!article.faqPresent || article.overclaimingFaq) {
    return "FAQ 보강 필요";
  }
  if (!article.conclusionFirstPresent || !article.citationFriendlySummaryPresent) {
    return "결론 요약 보강 필요";
  }
  if (!article.checklistPresent) {
    return "체크리스트 보강 필요";
  }
  if (article.comparisonTableUseful && !article.comparisonTablePresent) {
    return "비교 기준 보강 필요";
  }
  return "AI 답변 준비 좋음";
}

function recommendedAction(status: AiAnswerReadinessStatus) {
  switch (status) {
    case "AI 답변 준비 좋음":
      return "현재 구조를 유지하고 실제 Search Console 질의가 쌓이면 문단 단위로 보강합니다.";
    case "FAQ 보강 필요":
      return "질문형 검색 의도에 맞춰 짧고 과장 없는 FAQ를 본문이나 frontmatter에 보강합니다.";
    case "결론 요약 보강 필요":
      return "상단에 먼저 결론 또는 결론부터 문단을 두고 2-4문장으로 핵심 판단을 정리합니다.";
    case "체크리스트 보강 필요":
      return "도입 전 확인할 기준을 체크리스트나 확인 포인트로 분리합니다.";
    case "비교 기준 보강 필요":
    default:
      return "비교·주의 검색 의도에는 표나 명확한 비교 기준을 추가합니다.";
  }
}

function auditPost(post: Post, entry: SeoKeywordMapEntry | undefined): SeoAnswerReadinessArticleAudit {
  const faqPresent = frontmatterFaqPresent(post) || markdownFaqPresent(post.content);
  const conclusionFirstPresent = hasConclusionFirst(post);
  const directAnswerInFirstLines = hasDirectAnswerInFirstLines(post);
  const comparisonTableUseful = comparisonUseful(entry);
  const comparisonTablePresent =
    markdownTablePresent(post.content) ||
    post.headings.some((heading) => /(비교|차이|기준|어디서 볼지|다시 보기)/.test(heading.text));
  const checklistPresent = hasChecklist(post);
  const fitAvoidPresent = hasFitAvoid(post);
  const citationFriendlySummaryPresent = hasCitationFriendlySummary(post);
  const overclaimingFaq = faqHasOverclaim(post);
  const status = readinessStatus({
    faqPresent,
    conclusionFirstPresent,
    citationFriendlySummaryPresent,
    checklistPresent,
    comparisonTablePresent,
    comparisonTableUseful,
    overclaimingFaq,
  });

  return {
    slug: post.slug,
    route: post.route,
    title: post.frontmatter.title,
    aiAnswerReadinessStatus: status,
    directAnswerInFirstLines,
    faqPresent,
    conclusionFirstPresent,
    checklistPresent,
    comparisonTablePresent,
    comparisonTableUseful,
    fitAvoidPresent,
    citationFriendlySummaryPresent,
    overclaimingFaq,
    recommendedAction: recommendedAction(status),
  };
}

export function auditSeoAnswerReadiness(rootDir = process.cwd()): SeoAnswerReadinessAudit {
  const keywordMap = seoKeywordMapBySlug(rootDir);
  const articles = getPublicPosts().map((post) => auditPost(post, keywordMap.get(post.slug)));

  return {
    articles,
    summary: {
      totalArticles: articles.length,
      readyArticles: articles.filter((article) => article.aiAnswerReadinessStatus === "AI 답변 준비 좋음").length,
      needsFaq: articles.filter((article) => article.aiAnswerReadinessStatus === "FAQ 보강 필요").length,
      needsConclusion: articles.filter((article) => article.aiAnswerReadinessStatus === "결론 요약 보강 필요").length,
      needsChecklist: articles.filter((article) => article.aiAnswerReadinessStatus === "체크리스트 보강 필요").length,
      needsComparison: articles.filter((article) => article.aiAnswerReadinessStatus === "비교 기준 보강 필요").length,
      overclaimingFaq: articles.filter((article) => article.overclaimingFaq).length,
    },
  };
}
