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
  | "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED"
  | "NAVER_SITEMAP_RSS_OWNER_ACTION_REQUIRED";

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

function nextTopicAfterCurrent(state: ContentSeriesState) {
  const current = currentTopic(state);
  const index = state.next.indexOf(current);
  return index >= 0 ? (state.next[index + 1] ?? "다음 topic 없음") : (state.next[0] ?? "다음 topic 없음");
}

function gateSummary(state: ContentSeriesState, schedule: ContentSeriesSchedule) {
  const gates = [
    schedule.enabled ? "스케줄러 활성" : "스케줄러 일시 중지",
    schedule.requireCodexArtifact ? "Codex hero artifact 필요" : "artifact 게이트 확인 필요",
    schedule.autoMerge ? "자동 병합 설정 확인 필요" : "자동 병합 금지",
    schedule.manualDeploy ? "수동 배포 설정 확인 필요" : "수동 배포 금지",
    state.gates.requireRealHeroImage ? "실제 hero 이미지 필요" : "이미지 게이트 확인 필요",
  ];

  return gates.join(" · ");
}

function nextRequiredArtifact(topic: string) {
  return topic === "대기 중인 topic 없음" ? "필요한 artifact 없음" : `${topic}-hero`;
}

function lastKnownIssue(runState: ContentSeriesRunState, schedule: ContentSeriesSchedule) {
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
        state: "GOOGLE_SITEMAP_SUBMISSION_OWNER_ACTION_REQUIRED",
        label: "GOOGLE_SITEMAP_SUBMISSION_OWNER_ACTION_REQUIRED",
        meaning: "owner should submit sitemap.xml in Google Search Console and record URL inspection evidence.",
      },
      {
        state: "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
        label: "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
        meaning: "Naver HTML verification file is in the public root; owner still must click Verify in Naver Search Advisor.",
      },
      {
        state: "NAVER_SITEMAP_RSS_OWNER_ACTION_REQUIRED",
        label: "NAVER_SITEMAP_RSS_OWNER_ACTION_REQUIRED",
        meaning: "owner should submit sitemap.xml and rss.xml in Naver after verification succeeds.",
      },
    ],
    providers: [
      {
        id: "google-search-console",
        label: "Google Search Console",
        status: "GOOGLE_SITEMAP_SUBMISSION_OWNER_ACTION_REQUIRED",
        statusLabel: "GOOGLE_SITEMAP_SUBMISSION_OWNER_ACTION_REQUIRED",
        verificationArtifactPresent: false,
        submittedByOwner: null,
        connectedApiConfigured: false,
        requiredAction:
          "Open the biz2lab.com property in Google Search Console, submit https://www.biz2lab.com/sitemap.xml, and inspect the priority URLs.",
        evidenceSource:
          "Owner screenshot shows the biz2lab.com property is accessible; no connected Search Console API proof or sitemap submission proof is present in the repo.",
      },
      {
        id: "naver-search-advisor",
        label: "Naver Search Advisor",
        status: "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
        statusLabel: "NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED",
        verificationArtifactPresent: true,
        submittedByOwner: null,
        connectedApiConfigured: false,
        requiredAction:
          "After production deployment, click Verify in Naver Search Advisor, then submit https://www.biz2lab.com/sitemap.xml and https://www.biz2lab.com/rss.xml.",
        evidenceSource:
          "Owner-provided Naver HTML verification file is committed to the public root; Naver UI verification is still owner-action required.",
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
      latestPublishedTitle: posts[0]?.frontmatter.title ?? "게시된 글 없음",
      nextPublicationTopic: topic,
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
      nextRequiredArtifact: nextRequiredArtifact(topic),
      lastKnownIssue: lastKnownIssue(runState, schedule),
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
