import fs from "node:fs";
import path from "node:path";

import { z } from "zod";

import { getPublicPosts, type Post } from "@/lib/posts";
import {
  auditSeoAnswerReadiness,
  type AiAnswerReadinessStatus,
  type SeoAnswerReadinessArticleAudit,
} from "@/lib/seo-answer-readiness";
import { getSeoOpsAnalyticsConnectors, type SeoOpsAnalyticsProvider } from "@/lib/seo-ops-analytics";
import {
  auditSeoKeywords,
  type KeywordCoverageStatus,
  type KeywordHookStatus,
  type SeoKeywordArticleAudit,
} from "@/lib/seo-keyword-audit";
import { staticPublicRoutes } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const SEO_OPS_DASHBOARD_ROUTE = "/ko/ops/seo-dashboard";

export type SeoOpsCheckStatus = "ok" | "missing" | "unknown";
export type SeoOpsContentAuthorityStatus = "ok" | "needs-review";
export type SeoOpsTrafficStatus = "connected" | "not-connected";
export type SeoOpsAdSenseReadinessStatus =
  | "AdSense-ready core"
  | "Needs practical value"
  | "Needs original examples"
  | "Template risk"
  | "Needs navigation links"
  | "Review before AdSense"
  | "Ready after recrawl";
export type SeoOpsOptimizationStage =
  | "기본 SEO 완료"
  | "내부 링크 보강 필요"
  | "검색 품질 보강 필요"
  | "이미지/alt 점검 필요"
  | "실적 데이터 대기";

export type SeoOpsArticleRow = {
  title: string;
  slug: string;
  route: string;
  category: string;
  publishedAt: string;
  heroImageStatus: SeoOpsCheckStatus;
  canonicalStatus: SeoOpsCheckStatus;
  metaDescriptionStatus: SeoOpsCheckStatus;
  contentAuthorityStatus: SeoOpsContentAuthorityStatus;
  trafficStatus: SeoOpsTrafficStatus;
  pageviews?: number;
  searchClicks?: number;
  impressions?: number;
  topQueries?: string[];
  topReferrers?: string[];
  internalLinkCount: number;
  brokenLinkCount: number;
  primaryKeyword: string;
  keywordCluster: string;
  searchIntent: string;
  keywordCoverageStatus: KeywordCoverageStatus;
  indexReadinessStatus: KeywordCoverageStatus;
  hookStatus: KeywordHookStatus;
  lossAvoidanceAngle: string;
  aiAnswerReadinessStatus: AiAnswerReadinessStatus;
  faqPresent: boolean;
  conclusionFirstPresent: boolean;
  checklistPresent: boolean;
  comparisonTablePresent: boolean;
  citationFriendlySummaryPresent: boolean;
  adsenseReadinessStatus: SeoOpsAdSenseReadinessStatus;
  contentValueStatus: "Content value clear" | "Needs practical value";
  originalValueStatus: "Original value clear" | "Needs original value";
  practicalTemplateStatus: "Practical template present" | "Needs practical template";
  repeatedTemplateRisk: "Low" | "Medium";
  internalLinkStatus: "Internal links ready" | "Internal link weak";
  navigationDiscoveryStatus: "Navigation/discovery ready" | "Needs navigation links";
  policyRiskStatus: "Policy risk low" | "Review before AdSense";
  reviewerFacingIssue: string;
  optimizationStage: SeoOpsOptimizationStage;
  recommendedAction: string;
};

export type AnalyticsSection = {
  title: string;
  connected: boolean;
  emptyState: string;
  metrics: string[];
  providerStatus: string;
};

export type SearchRegistrationProvider = {
  id: "google-search-console" | "naver-search-advisor" | "bing-webmaster-tools";
  label: string;
  status: SearchRegistrationState;
  statusLabel: string;
  verificationArtifactPresent: boolean;
  submittedByOwner: boolean | null;
  connectedApiConfigured: boolean;
  requiredAction: string;
  evidenceSource: string;
};

export type SearchRegistrationState =
  | "READY_TO_REGISTER"
  | "OWNER_ACTION_REQUIRED"
  | "VERIFICATION_TOKEN_NOT_PROVIDED"
  | "SUBMITTED_BY_OWNER_UNKNOWN"
  | "CONNECTED_API_NOT_CONFIGURED"
  | "GOOGLE_PROPERTY_ACCESSIBLE_OWNER_SCREENSHOT"
  | "GOOGLE_SITEMAP_SUBMISSION_OWNER_ACTION_REQUIRED"
  | "GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED"
  | "GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED"
  | "GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT"
  | "GOOGLE_URL_INSPECTION_OWNER_UNKNOWN"
  | "GOOGLE_INDEXING_REQUEST_OWNER_UNKNOWN"
  | "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED"
  | "NAVER_SITEMAP_RSS_OWNER_ACTION_REQUIRED"
  | "NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED"
  | "NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED"
  | "NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED"
  | "NAVER_VERIFICATION_FILE_DEPLOYED"
  | "NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED";

export type SearchRegistrationSection = {
  overallStatus: "OWNER_ACTION_REQUIRED";
  verificationTokenProvided: boolean;
  registrationCompleted: "YES" | "NO" | "OWNER_UNKNOWN";
  note: string;
  ownerActionCopy: string;
  stateLegend: Array<{
    state: SearchRegistrationState;
    label: string;
    meaning: string;
  }>;
  providers: SearchRegistrationProvider[];
  indexFiles: {
    sitemap: string;
    robots: string;
    rss: string;
    canonicalHost: string;
    naverRegisteredSite: string;
    naverSubmissionHost: string;
    publishedArticlesCovered: number;
  };
};

export type SeoHealthItem = {
  label: string;
  status: SeoOpsCheckStatus;
  detail: string;
};

export type ExpansionAction = {
  priority: number;
  label: string;
  status: "대기" | "진행 가능" | "확인 필요";
  command?: string;
};

export type SeoOpsDashboard = {
  route: typeof SEO_OPS_DASHBOARD_ROUTE;
  title: string;
  summary: {
    publishedArticles: number;
    automationSeriesArticles: number;
    automationSeriesProgress: string;
    latestPublishedTitle: string;
    nextPublicationTopic: string;
    schedulerGate: string;
    seoChecks: string;
    analyticsConnection: string;
    keywordMappedArticles: number;
    keywordStrongArticles: number;
    keywordWeakArticles: number;
    hookStrongArticles: number;
    hookNeedsReviewArticles: number;
    aiAnswerReadyArticles: number;
    aiAnswerNeedsFaq: number;
    aiAnswerNeedsConclusion: number;
    aiAnswerNeedsChecklist: number;
    aiAnswerNeedsComparison: number;
    adsenseReadyArticles: number;
    adsenseNeedsTemplateArticles: number;
    adsenseInternalLinkWeakArticles: number;
    adsenseGenericReviewRiskArticles: number;
    noindexCandidateArticles: number;
    policyRiskArticles: number;
  };
  articles: SeoOpsArticleRow[];
  analytics: {
    searchConsole: AnalyticsSection;
    referrers: AnalyticsSection;
    sourceBreakdown: AnalyticsSection;
    providers: SeoOpsAnalyticsProvider[];
  };
  searchRegistration: SearchRegistrationSection;
  seoHealth: SeoHealthItem[];
  expansionActions: ExpansionAction[];
  scheduler: {
    seriesTitle: string;
    currentTopic: string;
    nextTopic: string;
    completedTopics: string[];
    currentGate: string;
    nextRequiredArtifact: string;
    lastKnownIssue: string;
    cadence: string;
  };
  sources: {
    realAnalyticsConnected: boolean;
    fakeTrafficNumbersUsed: false;
    emptyStatesShown: boolean;
    contentIndexUsed: boolean;
    schedulerStateUsed: boolean;
    imageManifestUsed: boolean;
    analyticsProvidersReady: boolean;
  };
};

const categoryLabels: Record<string, string> = {
  automation: "AI 업무 자동화",
  "sales-ops": "영업·매출 관리",
  "small-business": "소상공인 운영",
  "contracts-payments": "전자계약·결제",
};

const contentIndexRowSchema = z
  .object({
    slug: z.string(),
    route: z.string(),
    category: z.string(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  })
  .passthrough();

const contentSeriesStateSchema = z
  .object({
    currentTopic: z.string().nullable().catch(null),
    completed: z.array(z.string()).catch([]),
    next: z.array(z.string()).catch([]),
    gates: z.record(z.string(), z.boolean()).catch({}),
  })
  .passthrough();

const contentSeriesScheduleSchema = z
  .object({
    enabled: z.boolean().catch(false),
    cadenceMinutes: z.number().catch(0),
    maxArticlesPerDay: z.number().catch(0),
    maxOpenPrs: z.number().catch(0),
    requireCodexArtifact: z.boolean().catch(true),
    autoMerge: z.boolean().catch(false),
    manualDeploy: z.boolean().catch(false),
    activeHours: z
      .object({
        timezone: z.string().catch("Asia/Seoul"),
        start: z.string().catch("06:00"),
        end: z.string().catch("23:30"),
      })
      .catch({ timezone: "Asia/Seoul", start: "06:00", end: "23:30" }),
  })
  .passthrough();

const contentSeriesRunStateSchema = z
  .object({
    lastStatus: z.string().nullable().catch(null),
    lastTopic: z.string().nullable().catch(null),
  })
  .passthrough();

const imageAssetSchema = z
  .object({
    postSlug: z.string().optional(),
    usage: z.string().optional(),
    src: z.string().optional(),
    status: z.string().optional(),
  })
  .passthrough();

type ContentSeriesState = z.infer<typeof contentSeriesStateSchema>;
type ContentSeriesSchedule = z.infer<typeof contentSeriesScheduleSchema>;
type ContentSeriesRunState = z.infer<typeof contentSeriesRunStateSchema>;
type ImageAsset = z.infer<typeof imageAssetSchema>;

function readJson(filePath: string): unknown | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
}

function readContentIndex(rootDir: string) {
  const parsed = z
    .array(contentIndexRowSchema)
    .safeParse(readJson(path.join(rootDir, "content", "ko", "content-index.json")));

  return parsed.success ? parsed.data : [];
}

function readContentSeriesState(rootDir: string): ContentSeriesState {
  const parsed = contentSeriesStateSchema.safeParse(
    readJson(path.join(rootDir, "data", "content-series-state.json")),
  );

  return parsed.success ? parsed.data : { currentTopic: null, completed: [], next: [], gates: {} };
}

function readContentSeriesSchedule(rootDir: string): ContentSeriesSchedule {
  const parsed = contentSeriesScheduleSchema.safeParse(
    readJson(path.join(rootDir, "data", "content-series-schedule.json")),
  );

  return parsed.success
    ? parsed.data
    : {
        enabled: false,
        cadenceMinutes: 0,
        maxArticlesPerDay: 0,
        maxOpenPrs: 0,
        requireCodexArtifact: true,
        autoMerge: false,
        manualDeploy: false,
        activeHours: { timezone: "Asia/Seoul", start: "06:00", end: "23:30" },
      };
}

function readContentSeriesRunState(rootDir: string): ContentSeriesRunState {
  const parsed = contentSeriesRunStateSchema.safeParse(
    readJson(path.join(rootDir, "data", "content-series-run-state.json")),
  );

  return parsed.success ? parsed.data : { lastStatus: null, lastTopic: null };
}

function readImageAssets(rootDir: string) {
  const parsed = z
    .array(imageAssetSchema)
    .safeParse(readJson(path.join(rootDir, "data", "image-assets.json")));

  return parsed.success ? parsed.data : [];
}

function publicFileExists(rootDir: string, publicPath: string) {
  return fs.existsSync(path.join(rootDir, "public", publicPath.replace(/^\//, "")));
}

function heroImageStatus(rootDir: string, post: Post, imageAssets: ImageAsset[]) {
  if (!post.frontmatter.heroImage || !post.frontmatter.heroAlt) {
    return "missing" satisfies SeoOpsCheckStatus;
  }

  const manifestHasHero = imageAssets.some(
    (asset) =>
      asset.postSlug === post.slug &&
      asset.usage === "hero" &&
      asset.src === post.frontmatter.heroImage &&
      asset.status !== "inactive",
  );

  return manifestHasHero || publicFileExists(rootDir, post.frontmatter.heroImage)
    ? ("ok" satisfies SeoOpsCheckStatus)
    : ("missing" satisfies SeoOpsCheckStatus);
}

function canonicalStatus(post: Post) {
  return post.frontmatter.canonical === absoluteUrl(post.route)
    ? ("ok" satisfies SeoOpsCheckStatus)
    : ("missing" satisfies SeoOpsCheckStatus);
}

function metaDescriptionStatus(post: Post) {
  return post.frontmatter.description.trim().length > 0
    ? ("ok" satisfies SeoOpsCheckStatus)
    : ("missing" satisfies SeoOpsCheckStatus);
}

function contentAuthorityStatus(post: Post) {
  return post.internalLinks.length + post.frontmatter.relatedPosts.length >= 2
    ? ("ok" satisfies SeoOpsContentAuthorityStatus)
    : ("needs-review" satisfies SeoOpsContentAuthorityStatus);
}

function brokenInternalLinkCount(post: Post, availableRoutes: Set<string>) {
  return post.internalLinks.filter((link) => !availableRoutes.has(link)).length;
}

function optimizationStage(row: {
  heroImageStatus: SeoOpsCheckStatus;
  canonicalStatus: SeoOpsCheckStatus;
  metaDescriptionStatus: SeoOpsCheckStatus;
  contentAuthorityStatus: SeoOpsContentAuthorityStatus;
  brokenLinkCount: number;
  internalLinkCount: number;
  trafficStatus: SeoOpsTrafficStatus;
}): SeoOpsOptimizationStage {
  if (row.heroImageStatus !== "ok") {
    return "이미지/alt 점검 필요";
  }
  if (row.canonicalStatus !== "ok" || row.metaDescriptionStatus !== "ok") {
    return "검색 품질 보강 필요";
  }
  if (
    row.brokenLinkCount > 0 ||
    row.internalLinkCount === 0 ||
    row.contentAuthorityStatus !== "ok"
  ) {
    return "내부 링크 보강 필요";
  }
  if (row.trafficStatus === "not-connected") {
    return "실적 데이터 대기";
  }

  return "기본 SEO 완료";
}

function recommendedAction(stage: SeoOpsOptimizationStage) {
  switch (stage) {
    case "이미지/alt 점검 필요":
      return "대표 이미지와 alt 텍스트를 먼저 점검";
    case "검색 품질 보강 필요":
      return "meta description과 canonical 상태 확인";
    case "내부 링크 보강 필요":
      return "관련 글 링크와 깨진 링크를 보강";
    case "기본 SEO 완료":
      return "실제 노출·유입 데이터 연결 후 개선";
    case "실적 데이터 대기":
    default:
      return "Search Console 연결 후 검색어와 CTR 확인";
  }
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function adsenseReadinessSignals(post: Post, answerAudit?: SeoAnswerReadinessArticleAudit) {
  const content = post.content;
  const headings = post.headings.map((heading) => heading.text).join(" ");
  const hasPracticalTemplate =
    content.includes("| --- |") ||
    /^\d+\.\s+/m.test(content) ||
    /\/downloads\/[a-z0-9-]+\.csv/.test(content) ||
    includesAny(headings, [
      "체크리스트",
      "점검표",
      "계산",
      "표로 점검",
      "운영표에 남길 값",
      "Biz2Lab 판단 기준",
      "도입을 검토할 최소 조건",
      "도입 전 확인 항목",
      "검토와 실행 순서",
    ]) ||
    includesAny(content, ["달성률 =", "부족 금액 =", "남은 기간 하루 필요 실적 =", "도입 전 체크리스트"]);
  const hasOriginalValue =
    [...content].length >= 1600 &&
    includesAny(content, ["위험", "예시", "담당자", "승인", "원본", "확인"]);
  const internalLinkStatus =
    post.internalLinks.length > 0 || post.frontmatter.relatedPosts.length >= 3
      ? ("Internal links ready" as const)
      : ("Internal link weak" as const);
  const contentValueStatus =
    hasOriginalValue && hasPracticalTemplate
      ? ("Content value clear" as const)
      : ("Needs practical value" as const);
  const navigationDiscoveryStatus =
    internalLinkStatus === "Internal links ready"
      ? ("Navigation/discovery ready" as const)
      : ("Needs navigation links" as const);
  const policyRiskStatus =
    post.frontmatter.noindex || !hasOriginalValue || !hasPracticalTemplate || internalLinkStatus === "Internal link weak"
      ? ("Review before AdSense" as const)
      : ("Policy risk low" as const);
  const repeatedTemplateRisk =
    hasPracticalTemplate && hasOriginalValue && answerAudit?.citationFriendlySummaryPresent
      ? ("Low" as const)
      : ("Medium" as const);
  const reviewerFacingIssue =
    post.frontmatter.noindex
      ? "noindex 후보이므로 공개 색인 대상에서 제외할지 검토"
      : internalLinkStatus === "Internal link weak"
        ? "본문 내부 링크를 보강해 독자가 다음 실무 기준으로 이동하게 만들기"
        : !hasPracticalTemplate
          ? "계산식, 체크리스트, 표처럼 바로 적용할 자료를 보강"
          : repeatedTemplateRisk === "Medium"
            ? "도구 요약처럼 보이지 않도록 Biz2Lab 판단 기준과 사례를 보강"
            : "핵심 실무 가치와 연결 구조 유지";
  const adsenseReadinessStatus: SeoOpsAdSenseReadinessStatus = post.frontmatter.noindex
    ? "Ready after recrawl"
    : !hasOriginalValue
      ? "Needs original examples"
      : !hasPracticalTemplate
        ? "Needs practical value"
        : internalLinkStatus === "Internal link weak"
          ? "Needs navigation links"
          : repeatedTemplateRisk === "Medium"
            ? "Template risk"
            : "AdSense-ready core";

  return {
    adsenseReadinessStatus,
    contentValueStatus,
    originalValueStatus: hasOriginalValue
      ? ("Original value clear" as const)
      : ("Needs original value" as const),
    practicalTemplateStatus: hasPracticalTemplate
      ? ("Practical template present" as const)
      : ("Needs practical template" as const),
    repeatedTemplateRisk,
    internalLinkStatus,
    navigationDiscoveryStatus,
    policyRiskStatus,
    reviewerFacingIssue,
  };
}

function buildArticleRows({
  rootDir,
  posts,
  imageAssets,
  analyticsConnected,
  keywordAuditBySlug,
  answerAuditBySlug,
}: {
  rootDir: string;
  posts: Post[];
  imageAssets: ImageAsset[];
  analyticsConnected: boolean;
  keywordAuditBySlug: Map<string, SeoKeywordArticleAudit>;
  answerAuditBySlug: Map<string, SeoAnswerReadinessArticleAudit>;
}) {
  const availableRoutes = new Set<string>([
    ...staticPublicRoutes,
    "/rss.xml",
    ...posts.map((post) => post.route),
  ]);

  return posts.map((post) => {
    const keywordAudit = keywordAuditBySlug.get(post.slug);
    const answerAudit = answerAuditBySlug.get(post.slug);
    const adsenseSignals = adsenseReadinessSignals(post, answerAudit);
    const baseRow = {
      title: post.frontmatter.title,
      slug: post.slug,
      route: post.route,
      category: categoryLabels[post.category] ?? post.categoryName,
      publishedAt: post.frontmatter.publishedAt,
      heroImageStatus: heroImageStatus(rootDir, post, imageAssets),
      canonicalStatus: canonicalStatus(post),
      metaDescriptionStatus: metaDescriptionStatus(post),
      contentAuthorityStatus: contentAuthorityStatus(post),
      trafficStatus: analyticsConnected ? "connected" : "not-connected",
      internalLinkCount: post.internalLinks.length,
      brokenLinkCount: brokenInternalLinkCount(post, availableRoutes),
      primaryKeyword: keywordAudit?.primaryKeyword ?? "키워드 맵 미등록",
      keywordCluster: keywordAudit?.cluster ?? "미등록",
      searchIntent: keywordAudit?.searchIntent ?? "미등록",
      keywordCoverageStatus: keywordAudit?.keywordCoverageStatus ?? "NEEDS_KEYWORD_ALIGNMENT",
      indexReadinessStatus: keywordAudit?.indexReadinessStatus ?? "NEEDS_INDEX_CHECK",
      hookStatus: keywordAudit?.hookStatus ?? "needs-title-hook",
      lossAvoidanceAngle: keywordAudit?.lossAvoidanceAngle ?? "손실 회피 각도 미등록",
      aiAnswerReadinessStatus: answerAudit?.aiAnswerReadinessStatus ?? "결론 요약 보강 필요",
      faqPresent: answerAudit?.faqPresent ?? false,
      conclusionFirstPresent: answerAudit?.conclusionFirstPresent ?? false,
      checklistPresent: answerAudit?.checklistPresent ?? false,
      comparisonTablePresent: answerAudit?.comparisonTablePresent ?? false,
      citationFriendlySummaryPresent: answerAudit?.citationFriendlySummaryPresent ?? false,
      ...adsenseSignals,
    } satisfies Omit<SeoOpsArticleRow, "optimizationStage" | "recommendedAction">;
    const stage = optimizationStage(baseRow);

    return {
      ...baseRow,
      optimizationStage: stage,
      recommendedAction:
        keywordAudit &&
        (keywordAudit.keywordCoverageStatus !== "GOOD" || keywordAudit.indexReadinessStatus !== "GOOD")
          ? keywordAudit.recommendedAction
          : recommendedAction(stage),
    } satisfies SeoOpsArticleRow;
  });
}

function currentTopic(state: ContentSeriesState) {
  return state.currentTopic ?? state.next[0] ?? "대기 중인 topic 없음";
}

function isContentSeriesQueueExhausted(state: ContentSeriesState) {
  return state.next.length === 0 && state.completed.length > 0;
}

function nextTopicAfterCurrent(state: ContentSeriesState) {
  if (isContentSeriesQueueExhausted(state)) {
    return "CONTENT_SERIES_QUEUE_EXHAUSTED";
  }

  const current = currentTopic(state);
  const index = state.next.indexOf(current);
  return index >= 0 ? (state.next[index + 1] ?? "다음 topic 없음") : (state.next[0] ?? "다음 topic 없음");
}

function gateSummary(state: ContentSeriesState, schedule: ContentSeriesSchedule) {
  if (isContentSeriesQueueExhausted(state)) {
    return "CONTENT_SERIES_QUEUE_EXHAUSTED | current queue complete | run evergreen hardening/search verification or add approved topics";
  }

  const gates = [
    schedule.enabled ? "스케줄러 활성" : "스케줄러 일시 중지",
    schedule.requireCodexArtifact ? "Codex hero artifact 필요" : "artifact 게이트 확인 필요",
    schedule.autoMerge ? "자동 병합 설정 확인 필요" : "자동 병합 금지",
    schedule.manualDeploy ? "수동 배포 설정 확인 필요" : "수동 배포 금지",
    state.gates.requireRealHeroImage ? "실제 hero 이미지 필요" : "이미지 게이트 확인 필요",
  ];

  return gates.join(" · ");
}

function nextRequiredArtifact(state: ContentSeriesState, topic: string) {
  if (isContentSeriesQueueExhausted(state)) {
    return "NONE";
  }

  return topic === "대기 중인 topic 없음" ? "필요한 artifact 없음" : `${topic}-hero`;
}

function lastKnownIssue(
  state: ContentSeriesState,
  runState: ContentSeriesRunState,
  schedule: ContentSeriesSchedule,
) {
  if (isContentSeriesQueueExhausted(state)) {
    return "CONTENT_SERIES_QUEUE_EXHAUSTED";
  }

  if (runState.lastStatus) {
    return runState.lastTopic ? `${runState.lastTopic}: ${runState.lastStatus}` : runState.lastStatus;
  }

  return schedule.requireCodexArtifact ? "Codex hero artifact 대기" : "기록된 이슈 없음";
}

function providerById(providers: SeoOpsAnalyticsProvider[], id: SeoOpsAnalyticsProvider["id"]) {
  return providers.find((provider) => provider.id === id);
}

function buildAnalytics(providers: SeoOpsAnalyticsProvider[]) {
  const searchConsole = providerById(providers, "search-console");
  const ga4 = providerById(providers, "ga4");
  const vercelAnalytics = providerById(providers, "vercel-analytics");
  const umami = providerById(providers, "umami");
  const referrerLogs = providerById(providers, "referrer-logs");
  const analyticsReady = [ga4, vercelAnalytics, umami].some((provider) => provider?.status === "ready");

  return {
    searchConsole: {
      title: "검색어 분석",
      connected: false,
      emptyState:
        "Search Console 데이터가 아직 연결되지 않았습니다. 안전한 읽기 전용 연결이 준비될 때까지 검색어, 노출수, 클릭수, CTR, 평균 순위를 표시하지 않습니다.",
      metrics: ["검색어 데이터 미연결", searchConsole?.emptyState ?? "Search Console 연결 전 표시"],
      providerStatus: searchConsole?.statusLabel ?? "미연결",
    },
    referrers: {
      title: "유입 사이트 분석",
      connected: false,
      emptyState:
        "유입 사이트 데이터가 아직 연결되지 않았습니다. GA4, Vercel Analytics, Umami 또는 referrer 로그가 안전하게 연결된 뒤에만 표시합니다.",
      metrics: ["유입 사이트 데이터 미연결", referrerLogs?.emptyState ?? "유입 사이트 데이터 미연결"],
      providerStatus: referrerLogs?.statusLabel ?? "미연결",
    },
    sourceBreakdown: {
      title: "조회수·채널 분포",
      connected: false,
      emptyState:
        "조회수와 채널 데이터가 아직 연결되지 않았습니다. Analytics 연결 전에는 direct, organic, social, referral 수치를 표시하지 않습니다.",
      metrics: ["조회수 데이터 미연결", analyticsReady ? "Analytics 연결 준비됨" : "Analytics 연결 전 표시"],
      providerStatus: analyticsReady ? "연결 준비됨" : "미연결",
    },
    providers,
  } satisfies SeoOpsDashboard["analytics"];
}

function buildSearchRegistration(posts: Post[]): SearchRegistrationSection {
  return {
    overallStatus: "OWNER_ACTION_REQUIRED",
    verificationTokenProvided: true,
    registrationCompleted: "OWNER_UNKNOWN",
    note:
      "Search Console과 Naver Search Advisor 연결 상태는 실제 계정/API가 연결되기 전까지 수동 확인 항목으로 표시합니다.",
    ownerActionCopy:
      "Google Search Console\uACFC Naver Search Advisor \uB4F1\uB85D \uC0C1\uD0DC\uB294 \uC2E4\uC81C \uACC4\uC815\uC5D0\uC11C \uC18C\uC720\uAD8C \uD655\uC778 \uBC0F \uC81C\uCD9C\uC774 \uC644\uB8CC\uB418\uAE30 \uC804\uAE4C\uC9C0 OWNER_ACTION_REQUIRED\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
    stateLegend: [
      {
        state: "READY_TO_REGISTER",
        label: "READY_TO_REGISTER",
        meaning: "sitemap, RSS, robots, and canonical host checks are ready for owner-side registration.",
      },
      {
        state: "OWNER_ACTION_REQUIRED",
        label: "OWNER_ACTION_REQUIRED",
        meaning: "owner must finish verification and submission in the provider UI.",
      },
      {
        state: "VERIFICATION_TOKEN_NOT_PROVIDED",
        label: "VERIFICATION_TOKEN_NOT_PROVIDED",
        meaning: "no owner-provided public verification meta tag or HTML file is committed.",
      },
      {
        state: "SUBMITTED_BY_OWNER_UNKNOWN",
        label: "SUBMITTED_BY_OWNER_UNKNOWN",
        meaning: "registration may or may not have been submitted; repo evidence cannot prove it.",
      },
      {
        state: "CONNECTED_API_NOT_CONFIGURED",
        label: "CONNECTED_API_NOT_CONFIGURED",
        meaning: "Search Console/Naver API access is not configured, so live registration status is not fetched.",
      },
      {
        state: "GOOGLE_PROPERTY_ACCESSIBLE_OWNER_SCREENSHOT",
        label: "GOOGLE_PROPERTY_ACCESSIBLE_OWNER_SCREENSHOT",
        meaning: "owner screenshot shows the Google property is accessible, but repo cannot submit or verify sitemap state.",
      },
      {
        state: "GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
        label: "GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
        meaning: "owner screenshot shows https://www.biz2lab.com/sitemap.xml was submitted in Search Console.",
      },
      {
        state: "GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED",
        label: "GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED",
        meaning: "owner screenshot shows the submitted sitemap status is success.",
      },
      {
        state: "GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT",
        label: "GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT",
        meaning: "owner screenshot shows 40 discovered pages for the sitemap; this is not an index/crawl/traffic claim.",
      },
      {
        state: "GOOGLE_URL_INSPECTION_OWNER_UNKNOWN",
        label: "GOOGLE_URL_INSPECTION_OWNER_UNKNOWN",
        meaning: "URL inspection and indexing request states are still owner unknown.",
      },
      {
        state: "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
        label: "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
        meaning:
          "Naver HTML verification file is in the public root; registered site is http://www.biz2lab.com and owner still must click Verify in Naver Search Advisor.",
      },
      {
        state: "NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED",
        label: "NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED",
        meaning: "owner screenshot confirms the registered Naver site is http://www.biz2lab.com.",
      },
      {
        state: "NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
        label: "NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
        meaning: "owner screenshot shows http://www.biz2lab.com/rss.xml was submitted in Naver Search Advisor.",
      },
      {
        state: "NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
        label: "NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED",
        meaning:
          "owner screenshot shows sitemap.xml was submitted in Naver Search Advisor under the registered www host.",
      },
      {
        state: "NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED",
        label: "NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED",
        meaning:
          "owner screenshot shows the Naver site dashboard is accessible; crawl, index, and search exposure remain unclaimed.",
      },
    ],
    providers: [
      {
        id: "google-search-console",
        label: "Google Search Console",
        status: "GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED",
        statusLabel:
          "GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED / GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED / GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT / GOOGLE_URL_INSPECTION_OWNER_UNKNOWN",
        verificationArtifactPresent: false,
        submittedByOwner: true,
        connectedApiConfigured: false,
        requiredAction:
          "URL inspection and indexing requests remain owner unknown. Do not mark indexed, crawled, ranked, clicked, or AI-cited until owner evidence exists.",
        evidenceSource:
          "Owner screenshot shows biz2lab.com property, submitted sitemap https://www.biz2lab.com/sitemap.xml, success status, and 40 discovered pages. No connected Search Console API proof is used.",
      },
      {
        id: "naver-search-advisor",
        label: "Naver Search Advisor",
        status: "NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED",
        statusLabel:
          "NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED / NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED / NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED / NAVER_VERIFICATION_FILE_DEPLOYED / NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED",
        verificationArtifactPresent: true,
        submittedByOwner: true,
        connectedApiConfigured: false,
        requiredAction:
          "Keep Naver registered site as http://www.biz2lab.com and production canonical as https://www.biz2lab.com. HTTP to HTTPS redirect is expected. Do not mark Naver crawl, index, search exposure, traffic, clicks, or rankings until owner evidence exists.",
        evidenceSource:
          "Owner screenshots show the Naver site dashboard is accessible, RSS is submitted as http://www.biz2lab.com/rss.xml, and sitemap.xml is submitted. The Naver verification file is deployed and exact-body matched.",
      },
      {
        id: "bing-webmaster-tools",
        label: "Bing Webmaster Tools",
        status: "SUBMITTED_BY_OWNER_UNKNOWN",
        statusLabel: "SUBMITTED_BY_OWNER_UNKNOWN",
        verificationArtifactPresent: false,
        submittedByOwner: null,
        connectedApiConfigured: false,
        requiredAction:
          "Optional: submit the sitemap in Bing Webmaster Tools if the owner wants an additional AI/search discovery channel.",
        evidenceSource: "Optional channel; the repo has no connected account evidence.",
      },
    ],
    indexFiles: {
      sitemap: "https://www.biz2lab.com/sitemap.xml",
      robots: "https://www.biz2lab.com/robots.txt",
      rss: "https://www.biz2lab.com/rss.xml",
      canonicalHost: "https://www.biz2lab.com",
      naverRegisteredSite: "http://www.biz2lab.com",
      naverSubmissionHost: "http://www.biz2lab.com",
      publishedArticlesCovered: posts.length,
    },
  };
}

function coverageDetail(ok: number, total: number, label: string) {
  return `${ok}/${total} ${label}`;
}

function buildSeoHealth(posts: Post[], articles: SeoOpsArticleRow[]): SeoHealthItem[] {
  const total = articles.length;
  const canonicalOk = articles.filter((row) => row.canonicalStatus === "ok").length;
  const heroOk = articles.filter((row) => row.heroImageStatus === "ok").length;
  const metaOk = articles.filter((row) => row.metaDescriptionStatus === "ok").length;
  const brokenLinks = articles.reduce((sum, row) => sum + row.brokenLinkCount, 0);
  const altOk = posts.filter((post) => post.frontmatter.heroAlt.trim().length > 0).length;

  return [
    {
      label: "sitemap",
      status: "ok",
      detail: "공개 route와 noindex가 아닌 게시 글만 포함",
    },
    {
      label: "RSS",
      status: "ok",
      detail: "공개 게시 글만 RSS item으로 생성",
    },
    {
      label: "robots",
      status: "ok",
      detail: "API prefix는 차단하고, 이 대시보드는 page metadata로 noindex 처리",
    },
    {
      label: "canonical",
      status: canonicalOk === total ? "ok" : "missing",
      detail: coverageDetail(canonicalOk, total, "정상"),
    },
    {
      label: "OG/hero image",
      status: heroOk === total ? "ok" : "missing",
      detail: coverageDetail(heroOk, total, "정상"),
    },
    {
      label: "meta description",
      status: metaOk === total ? "ok" : "missing",
      detail: coverageDetail(metaOk, total, "정상"),
    },
    {
      label: "broken links",
      status: brokenLinks === 0 ? "ok" : "missing",
      detail: brokenLinks === 0 ? "깨진 내부 링크 없음" : `${brokenLinks}개 점검 필요`,
    },
    {
      label: "image alt",
      status: altOk === total ? "ok" : "missing",
      detail: coverageDetail(altOk, total, "정상"),
    },
  ];
}

function seoChecksLabel(seoHealth: SeoHealthItem[]) {
  const ok = seoHealth.filter((item) => item.status === "ok").length;
  return `${ok}/${seoHealth.length} 정상`;
}

function buildExpansionActions(): ExpansionAction[] {
  return [
    { priority: 1, label: "Search Console 연결", status: "대기" },
    { priority: 2, label: "GA4, Vercel Analytics 또는 Umami 연결", status: "대기" },
    { priority: 3, label: "상위 노출 후보 글 title/meta 개선", status: "대기" },
    { priority: 4, label: "주요 글 내부 링크 허브 강화", status: "진행 가능" },
    {
      priority: 5,
      label: "다음 topic hero artifact 준비",
      status: "확인 필요",
      command: "npm run image-skill:plan",
    },
    {
      priority: 6,
      label: "자동화 시리즈 스케줄러 dry-run 확인",
      status: "진행 가능",
      command: "npm run content:series:scheduler -- --dry-run",
    },
    { priority: 7, label: "실적 데이터 연결 후 리라이트 후보 지정", status: "대기" },
  ];
}

function latestCompletedSeriesPost(posts: Post[], state: ContentSeriesState) {
  if (!isContentSeriesQueueExhausted(state)) {
    return posts[0];
  }

  const postBySlug = new Map(posts.map((post) => [post.slug, post]));

  for (const slug of [...state.completed].reverse()) {
    const post = postBySlug.get(slug);
    if (post) {
      return post;
    }
  }

  return posts[0];
}

export function getSeoOpsDashboard(rootDir = process.cwd()): SeoOpsDashboard {
  const posts = getPublicPosts();
  const contentIndex = readContentIndex(rootDir);
  const seriesState = readContentSeriesState(rootDir);
  const schedule = readContentSeriesSchedule(rootDir);
  const runState = readContentSeriesRunState(rootDir);
  const imageAssets = readImageAssets(rootDir);
  const keywordAudit = auditSeoKeywords(rootDir);
  const keywordAuditBySlug = new Map(keywordAudit.articles.map((article) => [article.slug, article]));
  const answerAudit = auditSeoAnswerReadiness(rootDir);
  const answerAuditBySlug = new Map(answerAudit.articles.map((article) => [article.slug, article]));
  const analyticsConnectors = getSeoOpsAnalyticsConnectors();
  const analytics = buildAnalytics(analyticsConnectors.providers);
  const realAnalyticsConnected = analyticsConnectors.realDataConnected;
  const articles = buildArticleRows({
    rootDir,
    posts,
    imageAssets,
    analyticsConnected: realAnalyticsConnected,
    keywordAuditBySlug,
    answerAuditBySlug,
  });
  const seoHealth = buildSeoHealth(posts, articles);
  const topic = currentTopic(seriesState);
  const queueExhausted = isContentSeriesQueueExhausted(seriesState);
  const latestSeriesPost = latestCompletedSeriesPost(posts, seriesState);
  const completedCount = seriesState.completed.length;
  const totalSeriesTopics = new Set([...seriesState.completed, ...seriesState.next]).size;
  const automationSeriesArticles = posts.filter(
    (post) => post.frontmatter.cluster === "open-source-automation-tools",
  ).length;

  return {
    route: SEO_OPS_DASHBOARD_ROUTE,
    title: "Biz2Lab SEO 운영 대시보드",
    summary: {
      publishedArticles: posts.length,
      automationSeriesArticles,
      automationSeriesProgress: `${completedCount}/${totalSeriesTopics}`,
      latestPublishedTitle: latestSeriesPost?.frontmatter.title ?? posts[0]?.frontmatter.title ?? "게시된 글 없음",
      nextPublicationTopic: queueExhausted ? "CONTENT_SERIES_QUEUE_EXHAUSTED" : topic,
      schedulerGate: schedule.enabled ? "스케줄러 활성" : "스케줄러 일시 중지",
      seoChecks: seoChecksLabel(seoHealth),
      analyticsConnection: analyticsConnectors.summaryLabel,
      keywordMappedArticles: keywordAudit.summary.mappedArticles,
      keywordStrongArticles: keywordAudit.summary.strongArticles,
      keywordWeakArticles: keywordAudit.summary.weakArticles,
      hookStrongArticles: articles.filter((row) => row.hookStatus === "strong").length,
      hookNeedsReviewArticles: articles.filter((row) => row.hookStatus !== "strong").length,
      aiAnswerReadyArticles: answerAudit.summary.readyArticles,
      aiAnswerNeedsFaq: answerAudit.summary.needsFaq,
      aiAnswerNeedsConclusion: answerAudit.summary.needsConclusion,
      aiAnswerNeedsChecklist: answerAudit.summary.needsChecklist,
      aiAnswerNeedsComparison: answerAudit.summary.needsComparison,
      adsenseReadyArticles: articles.filter((row) => row.adsenseReadinessStatus === "AdSense-ready core").length,
      adsenseNeedsTemplateArticles: articles.filter((row) => row.adsenseReadinessStatus === "Needs practical value").length,
      adsenseInternalLinkWeakArticles: articles.filter((row) => row.adsenseReadinessStatus === "Needs navigation links").length,
      adsenseGenericReviewRiskArticles: articles.filter((row) => row.adsenseReadinessStatus === "Template risk").length,
      noindexCandidateArticles: articles.filter((row) => row.adsenseReadinessStatus === "Ready after recrawl").length,
      policyRiskArticles: articles.filter((row) => row.policyRiskStatus !== "Policy risk low").length,
    },
    articles,
    analytics,
    searchRegistration: buildSearchRegistration(posts),
    seoHealth,
    expansionActions: buildExpansionActions(),
    scheduler: {
      seriesTitle: "무료 오픈소스 자동화 도구 시리즈",
      currentTopic: topic,
      nextTopic: nextTopicAfterCurrent(seriesState),
      completedTopics: seriesState.completed,
      currentGate: gateSummary(seriesState, schedule),
      nextRequiredArtifact: nextRequiredArtifact(seriesState, topic),
      lastKnownIssue: lastKnownIssue(seriesState, runState, schedule),
      cadence: `${schedule.cadenceMinutes}분 · ${schedule.activeHours.timezone} ${schedule.activeHours.start}-${schedule.activeHours.end} · 하루 최대 ${schedule.maxArticlesPerDay}개 · 열린 PR 최대 ${schedule.maxOpenPrs}개`,
    },
    sources: {
      realAnalyticsConnected,
      fakeTrafficNumbersUsed: false,
      emptyStatesShown: !realAnalyticsConnected,
      contentIndexUsed: contentIndex.length > 0,
      schedulerStateUsed: seriesState.completed.length > 0 || seriesState.next.length > 0,
      imageManifestUsed: imageAssets.length > 0,
      analyticsProvidersReady: analyticsConnectors.anyProviderReady,
    },
  };
}
