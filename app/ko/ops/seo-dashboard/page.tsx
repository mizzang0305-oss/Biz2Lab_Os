import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  CircleDashed,
  FileSearch,
  ListChecks,
  RadioTower,
  ShieldCheck,
} from "lucide-react";

import {
  SEO_OPS_DASHBOARD_ROUTE,
  getSeoOpsDashboard,
  type SeoOpsDashboard,
  type SeoOpsArticleRow,
  type SeoOpsCheckStatus,
} from "@/lib/seo-ops-dashboard";
import { isOpsDashboardAuthenticated, isOpsDashboardKeyConfigured } from "@/lib/ops-dashboard-auth";
import { createMetadata } from "@/lib/seo";
import { unlockOpsDashboard } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab SEO 운영 대시보드",
  description:
    "Biz2Lab 게시 글, SEO 상태, 분석 데이터 연결 상태, 콘텐츠 시리즈 진행 상황을 로컬 데이터 기준으로 확인하는 운영 대시보드입니다.",
  path: SEO_OPS_DASHBOARD_ROUTE,
  noindex: true,
});

const statusTone = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-800",
  missing: "border-amber-200 bg-amber-50 text-amber-800",
  unknown: "border-slate-200 bg-slate-50 text-slate-700",
} satisfies Record<SeoOpsCheckStatus, string>;

function StatusPill({
  status,
  children,
}: {
  status: SeoOpsCheckStatus | "connected" | "not-connected";
  children: React.ReactNode;
}) {
  const tone =
    status === "connected"
      ? statusTone.ok
      : status === "not-connected"
        ? statusTone.unknown
        : statusTone[status];

  return (
    <span className={`inline-flex max-w-full items-center break-all rounded-md border px-2 py-1 text-left text-xs font-semibold ${tone}`}>
      {children}
    </span>
  );
}

function checkStatusLabel(status: SeoOpsCheckStatus) {
  switch (status) {
    case "ok":
      return "정상";
    case "missing":
      return "누락";
    case "unknown":
    default:
      return "확인 필요";
  }
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="rounded-lg border border-slate-200 bg-white p-2 text-teal-700">{icon}</div>
      <div>
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        {description ? <p className="mt-1 max-w-3xl text-sm text-slate-600">{description}</p> : null}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 break-words text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{detail}</p>
    </article>
  );
}

function EmptyAnalyticsPanel({
  title,
  emptyState,
  metrics,
  providerStatus,
}: {
  title: string;
  emptyState: string;
  metrics: string[];
  providerStatus: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <CircleDashed className="mt-0.5 h-5 w-5 text-slate-500" aria-hidden="true" />
        <div>
          <h3 className="font-bold text-slate-950">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{emptyState}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <StatusPill status={providerStatus === "연결 준비됨" ? "connected" : "not-connected"}>
          {providerStatus}
        </StatusPill>
        {metrics.map((metric) => (
          <StatusPill key={metric} status="unknown">
            {metric}
          </StatusPill>
        ))}
      </div>
    </section>
  );
}

export function OpsDashboardUnlockScreen({ keyConfigured }: { keyConfigured: boolean }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-teal-700">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950">SEO 운영 대시보드 잠금</h1>
            <p className="mt-2 text-sm text-slate-600">
              이 화면은 운영자 전용입니다. 비밀번호를 입력하면 읽기 전용 대시보드를 볼 수 있습니다.
            </p>
          </div>
        </div>

        {!keyConfigured ? (
          <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
            운영 대시보드 비밀번호가 아직 설정되지 않았습니다.
          </p>
        ) : null}

        <form action={unlockOpsDashboard} className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            비밀번호
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100"
              disabled={!keyConfigured}
              name="opsDashboardKey"
              type="password"
              autoComplete="current-password"
            />
          </label>
          <button
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!keyConfigured}
            type="submit"
          >
            대시보드 열기
          </button>
        </form>
      </section>
    </main>
  );
}

function stageTone(stage: SeoOpsArticleRow["optimizationStage"]) {
  if (stage === "실적 데이터 대기") {
    return "border-sky-200 bg-sky-50 text-sky-800";
  }
  if (stage === "기본 SEO 완료") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  return "border-amber-200 bg-amber-50 text-amber-800";
}

function keywordStatusTone(status: SeoOpsArticleRow["keywordCoverageStatus"] | SeoOpsArticleRow["indexReadinessStatus"]) {
  if (status === "GOOD") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (status === "NEEDS_INDEX_CHECK") {
    return "border-rose-200 bg-rose-50 text-rose-800";
  }
  return "border-amber-200 bg-amber-50 text-amber-800";
}

function keywordStatusLabel(status: SeoOpsArticleRow["keywordCoverageStatus"] | SeoOpsArticleRow["indexReadinessStatus"]) {
  switch (status) {
    case "GOOD":
      return "양호";
    case "NEEDS_META_REWRITE":
      return "meta 보강";
    case "NEEDS_INTERNAL_LINKS":
      return "링크 보강";
    case "NEEDS_ALT_TEXT":
      return "alt 보강";
    case "NEEDS_INDEX_CHECK":
      return "색인 점검";
    case "NEEDS_KEYWORD_ALIGNMENT":
    default:
      return "키워드 정렬";
  }
}

function KeywordStatusPill({
  status,
  children,
}: {
  status: SeoOpsArticleRow["keywordCoverageStatus"] | SeoOpsArticleRow["indexReadinessStatus"];
  children: React.ReactNode;
}) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${keywordStatusTone(status)}`}>
      {children}
    </span>
  );
}

function answerStatusTone(status: SeoOpsArticleRow["aiAnswerReadinessStatus"]) {
  if (status === "AI 답변 준비 좋음") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (status === "비교 기준 보강 필요") {
    return "border-sky-200 bg-sky-50 text-sky-800";
  }
  return "border-amber-200 bg-amber-50 text-amber-800";
}

function AnswerStatusPill({
  status,
}: {
  status: SeoOpsArticleRow["aiAnswerReadinessStatus"];
}) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${answerStatusTone(status)}`}>
      {status}
    </span>
  );
}

function adsenseStatusTone(status: SeoOpsArticleRow["adsenseReadinessStatus"]) {
  if (status === "AdSense-ready core") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (status === "Ready after recrawl" || status === "Review before AdSense") {
    return "border-rose-200 bg-rose-50 text-rose-800";
  }
  return "border-amber-200 bg-amber-50 text-amber-800";
}

function AdSenseStatusPill({ status }: { status: SeoOpsArticleRow["adsenseReadinessStatus"] }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${adsenseStatusTone(status)}`}>
      {status}
    </span>
  );
}

function ArticleMobileCard({ row }: { row: SeoOpsArticleRow }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Link href={row.route} className="font-bold text-slate-950 hover:text-teal-700">
        {row.title}
      </Link>
      <p className="mt-1 break-words text-xs text-slate-500">{row.route}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">카테고리</dt>
          <dd className="font-semibold text-slate-900">{row.category}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Primary keyword</dt>
          <dd className="font-semibold text-slate-900">{row.primaryKeyword}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Cluster</dt>
          <dd className="font-semibold text-slate-900">{row.keywordCluster}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Intent</dt>
          <dd className="font-semibold text-slate-900">{row.searchIntent}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Hook</dt>
          <dd className="font-semibold text-slate-900">{row.hookStatus}</dd>
        </div>
        <div>
          <dt className="text-slate-500">AI answer</dt>
          <dd>
            <AnswerStatusPill status={row.aiAnswerReadinessStatus} />
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">AdSense readiness</dt>
          <dd>
            <AdSenseStatusPill status={row.adsenseReadinessStatus} />
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">대표 이미지</dt>
          <dd>
            <StatusPill status={row.heroImageStatus}>{checkStatusLabel(row.heroImageStatus)}</StatusPill>
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">조회수</dt>
          <dd className="font-semibold text-slate-900">미연결</dd>
        </div>
        <div>
          <dt className="text-slate-500">검색어</dt>
          <dd className="font-semibold text-slate-900">미연결</dd>
        </div>
        <div>
          <dt className="text-slate-500">유입</dt>
          <dd className="font-semibold text-slate-900">미연결</dd>
        </div>
        <div>
          <dt className="text-slate-500">내부 링크</dt>
          <dd className="font-semibold text-slate-900">
            {row.internalLinkCount}개 · 깨짐 {row.brokenLinkCount}개
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <AnswerStatusPill status={row.aiAnswerReadinessStatus} />
          <AdSenseStatusPill status={row.adsenseReadinessStatus} />
          <KeywordStatusPill status={row.keywordCoverageStatus}>
            keyword {keywordStatusLabel(row.keywordCoverageStatus)}
          </KeywordStatusPill>
          <KeywordStatusPill status={row.indexReadinessStatus}>
            index {keywordStatusLabel(row.indexReadinessStatus)}
          </KeywordStatusPill>
        </div>
        <span className={`inline-flex w-fit rounded-md border px-2 py-1 text-xs font-semibold ${stageTone(row.optimizationStage)}`}>
          {row.optimizationStage}
        </span>
        <p className="text-sm text-slate-600">
          FAQ {row.faqPresent ? "있음" : "보강 필요"} · 먼저 결론 {row.conclusionFirstPresent ? "있음" : "보강 필요"} · 체크리스트{" "}
          {row.checklistPresent ? "있음" : "보강 필요"}
        </p>
        <p className="text-sm text-slate-600">
          Content value {row.contentValueStatus} ·
          Original value {row.originalValueStatus} · Practical template {row.practicalTemplateStatus} · Repeated-template risk{" "}
          {row.repeatedTemplateRisk} · {row.internalLinkStatus}
        </p>
        <p className="text-sm text-slate-600">
          {row.navigationDiscoveryStatus} · {row.policyRiskStatus}
        </p>
        <p className="text-sm text-slate-700">{row.recommendedAction}</p>
        <p className="text-sm text-slate-600">{row.lossAvoidanceAngle}</p>
        <p className="text-sm text-slate-700">{row.reviewerFacingIssue}</p>
      </div>
    </article>
  );
}

function ArticleTable({ rows }: { rows: SeoOpsArticleRow[] }) {
  return (
    <div>
      <div className="grid gap-3 xl:hidden">
        {rows.map((row) => (
          <ArticleMobileCard key={row.slug} row={row} />
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-600">
            <tr>
              <th className="w-[20%] px-4 py-3">글 제목</th>
              <th className="w-[15%] px-4 py-3">Primary keyword</th>
              <th className="w-[11%] px-4 py-3">Cluster / intent</th>
              <th className="w-[14%] px-4 py-3">Hook / AI / AdSense</th>
              <th className="w-[11%] px-4 py-3">기술 SEO</th>
              <th className="w-[9%] px-4 py-3">Analytics</th>
              <th className="w-[10%] px-4 py-3">Keyword / index</th>
              <th className="w-[10%] px-4 py-3">다음 액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.slug} className="align-top">
                <td className="px-4 py-4">
                  <Link href={row.route} className="font-semibold text-slate-950 hover:text-teal-700">
                    {row.title}
                  </Link>
                  <p className="mt-1 break-words text-xs text-slate-500">{row.route}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.publishedAt}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-950">{row.primaryKeyword}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.category}</p>
                </td>
                <td className="px-4 py-4 text-slate-700">
                  <p className="font-semibold">{row.keywordCluster}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.searchIntent}</p>
                </td>
                <td className="px-4 py-4 text-slate-700">
                  <p className="font-semibold text-slate-950">{row.hookStatus}</p>
                  <div className="mt-2">
                    <AnswerStatusPill status={row.aiAnswerReadinessStatus} />
                  </div>
                  <div className="mt-2">
                    <AdSenseStatusPill status={row.adsenseReadinessStatus} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{row.lossAvoidanceAngle}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <StatusPill status={row.heroImageStatus}>이미지 {checkStatusLabel(row.heroImageStatus)}</StatusPill>
                    <StatusPill status={row.canonicalStatus}>canonical {checkStatusLabel(row.canonicalStatus)}</StatusPill>
                    <StatusPill status={row.metaDescriptionStatus}>meta {checkStatusLabel(row.metaDescriptionStatus)}</StatusPill>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-700">미연결</p>
                  <p className="mt-1 text-xs text-slate-500">검색어 데이터 미연결</p>
                  <p className="mt-1 text-xs text-slate-500">조회수 데이터 미연결</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <KeywordStatusPill status={row.keywordCoverageStatus}>
                      keyword {keywordStatusLabel(row.keywordCoverageStatus)}
                    </KeywordStatusPill>
                    <KeywordStatusPill status={row.indexReadinessStatus}>
                      index {keywordStatusLabel(row.indexReadinessStatus)}
                    </KeywordStatusPill>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    내부 링크 {row.internalLinkCount} · 깨짐 {row.brokenLinkCount}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    FAQ {row.faqPresent ? "있음" : "보강 필요"} · 결론 {row.conclusionFirstPresent ? "있음" : "보강 필요"} · 체크리스트{" "}
                    {row.checklistPresent ? "있음" : "보강 필요"} · 비교표 {row.comparisonTablePresent ? "있음" : "필요 시 보강"}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Content value {row.contentValueStatus} ·
                    Original value {row.originalValueStatus} · Practical template {row.practicalTemplateStatus} · Repeated-template risk{" "}
                    {row.repeatedTemplateRisk} · {row.internalLinkStatus}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {row.navigationDiscoveryStatus} · {row.policyRiskStatus}
                  </p>
                  <span className={`mt-2 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${stageTone(row.optimizationStage)}`}>
                    {row.optimizationStage}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-700">
                  <p>{row.recommendedAction}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{row.reviewerFacingIssue}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsConnectorPanel({ dashboard }: { dashboard: SeoOpsDashboard }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <SectionHeader
        icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />}
        title="읽기 전용 분석 연결 상태"
        description="환경변수 준비 여부만 확인합니다. 이 대시보드는 빌드와 테스트 중 Search Console, GA4, Vercel Analytics, Umami, referrer 로그를 호출하지 않습니다."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.analytics.providers.map((provider) => (
          <article key={provider.id} className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-bold text-slate-950">{provider.label}</h3>
            <div className="mt-3">
              <StatusPill status={provider.status === "ready" ? "connected" : "not-connected"}>
                {provider.statusLabel}
              </StatusPill>
            </div>
            <p className="mt-3 text-sm text-slate-600">{provider.emptyState}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SearchRegistrationPanel({ dashboard }: { dashboard: SeoOpsDashboard }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <SectionHeader
        icon={<FileSearch className="h-5 w-5" aria-hidden="true" />}
        title="검색 등록 수동 확인"
        description={dashboard.searchRegistration.ownerActionCopy}
      />
      <div className="mb-4 grid gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 sm:grid-cols-3">
        <div>
          <p className="font-semibold">Overall status</p>
          <p className="mt-1 font-mono text-xs">{dashboard.searchRegistration.overallStatus}</p>
        </div>
        <div>
          <p className="font-semibold">Verification token</p>
          <p className="mt-1 font-mono text-xs">
            {dashboard.searchRegistration.verificationTokenProvided ? "PROVIDED" : "NOT_PROVIDED"}
          </p>
        </div>
        <div>
          <p className="font-semibold">Registration completed</p>
          <p className="mt-1 font-mono text-xs">{dashboard.searchRegistration.registrationCompleted}</p>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {dashboard.searchRegistration.providers.map((provider) => (
          <article key={provider.id} className="min-w-0 rounded-lg border border-slate-200 p-4">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="font-bold text-slate-950">{provider.label}</h3>
              <StatusPill status="unknown">{provider.status}</StatusPill>
            </div>
            <dl className="mt-3 grid gap-2 text-xs text-slate-600">
              <div>
                <dt className="font-semibold text-slate-500">Verification artifact</dt>
                <dd className="font-mono">{provider.verificationArtifactPresent ? "PRESENT" : "NOT_PRESENT"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Submitted by owner</dt>
                <dd className="font-mono">{provider.submittedByOwner === null ? "UNKNOWN" : String(provider.submittedByOwner)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Connected API</dt>
                <dd className="font-mono">{provider.connectedApiConfigured ? "CONFIGURED" : "NOT_CONFIGURED"}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-slate-700">{provider.requiredAction}</p>
            <p className="mt-3 text-xs leading-5 text-slate-500">{provider.evidenceSource}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 grid min-w-0 gap-2 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.searchRegistration.stateLegend.map((item) => (
          <div key={item.state} className="min-w-0">
            <p className="break-all font-mono font-bold text-slate-900">{item.label}</p>
            <p className="mt-1 leading-5">{item.meaning}</p>
          </div>
        ))}
      </div>
      <dl className="mt-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2 lg:grid-cols-6">
        <div>
          <dt className="font-semibold text-slate-500">Sitemap</dt>
          <dd className="mt-1 break-words font-mono text-xs text-slate-900">{dashboard.searchRegistration.indexFiles.sitemap}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Robots</dt>
          <dd className="mt-1 break-words font-mono text-xs text-slate-900">{dashboard.searchRegistration.indexFiles.robots}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">RSS</dt>
          <dd className="mt-1 break-words font-mono text-xs text-slate-900">{dashboard.searchRegistration.indexFiles.rss}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Canonical host</dt>
          <dd className="mt-1 break-words font-mono text-xs text-slate-900">
            {dashboard.searchRegistration.indexFiles.canonicalHost}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Naver registered site</dt>
          <dd className="mt-1 break-words font-mono text-xs text-slate-900">
            {dashboard.searchRegistration.indexFiles.naverRegisteredSite}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Published coverage</dt>
          <dd className="mt-1 font-bold text-slate-900">{dashboard.searchRegistration.indexFiles.publishedArticlesCovered} articles</dd>
        </div>
      </dl>
    </section>
  );
}

export function SeoOpsDashboardContent({ dashboard = getSeoOpsDashboard() }: { dashboard?: SeoOpsDashboard }) {
  return (
    <main className="bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">{dashboard.title}</h1>
              <p className="mt-3 max-w-3xl text-base text-slate-600">
                게시 글, sitemap, RSS, robots, canonical, 내부 링크, 이미지 alt, 콘텐츠 시리즈 상태를
                로컬 데이터 기준으로 점검합니다. 조회수와 검색어는 실제 분석 도구가 연결되기 전까지
                미연결 상태로 표시합니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status="unknown">noindex</StatusPill>
              <StatusPill status="unknown">nofollow</StatusPill>
              <StatusPill status={dashboard.sources.realAnalyticsConnected ? "connected" : "not-connected"}>
                분석 데이터 {dashboard.summary.analyticsConnection}
              </StatusPill>
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12">
          <SummaryCard label="공개 글" value={`${dashboard.summary.publishedArticles}`} detail="현재 published 글 기준" />
          <SummaryCard label="자동화 시리즈" value={`${dashboard.summary.automationSeriesArticles}`} detail="오픈소스 자동화 글" />
          <SummaryCard label="시리즈 진행" value={dashboard.summary.automationSeriesProgress} detail="완료 topic / 전체 대기열" />
          <SummaryCard label="Keyword map" value={`${dashboard.summary.keywordMappedArticles}`} detail="mapped published articles" />
          <SummaryCard label="Keyword strong" value={`${dashboard.summary.keywordStrongArticles}`} detail="keyword/index ready" />
          <SummaryCard label="Keyword weak" value={`${dashboard.summary.keywordWeakArticles}`} detail="needs structural review" />
          <SummaryCard label="Hook strong" value={`${dashboard.summary.hookStrongArticles}`} detail="loss-avoidance hook ready" />
          <SummaryCard label="Hook review" value={`${dashboard.summary.hookNeedsReviewArticles}`} detail="needs hook rewrite" />
          <SummaryCard label="AI answer ready" value={`${dashboard.summary.aiAnswerReadyArticles}`} detail="answer-source structure ready" />
          <SummaryCard label="FAQ needs" value={`${dashboard.summary.aiAnswerNeedsFaq}`} detail="FAQ or overclaim review" />
          <SummaryCard label="Conclusion needs" value={`${dashboard.summary.aiAnswerNeedsConclusion}`} detail="conclusion-first summary" />
          <SummaryCard label="Checklist needs" value={`${dashboard.summary.aiAnswerNeedsChecklist}`} detail="decision checklist" />
          <SummaryCard label="Comparison needs" value={`${dashboard.summary.aiAnswerNeedsComparison}`} detail="comparison criteria" />
          <SummaryCard label="AdSense ready" value={`${dashboard.summary.adsenseReadyArticles}`} detail="core value and practical signals" />
          <SummaryCard label="Template needs" value={`${dashboard.summary.adsenseNeedsTemplateArticles}`} detail="practical template gap" />
          <SummaryCard label="Link weak" value={`${dashboard.summary.adsenseInternalLinkWeakArticles}`} detail="in-body/internal link review" />
          <SummaryCard label="Generic risk" value={`${dashboard.summary.adsenseGenericReviewRiskArticles}`} detail="tool-summary review risk" />
          <SummaryCard label="Noindex candidates" value={`${dashboard.summary.noindexCandidateArticles}`} detail="approval content에서 제외할 후보" />
          <SummaryCard label="Policy risk" value={`${dashboard.summary.policyRiskArticles}`} detail="AdSense 전 재검토 필요" />
          <SummaryCard label="다음 topic" value="대기" detail={dashboard.summary.nextPublicationTopic} />
          <SummaryCard label="현재 gate" value={dashboard.summary.schedulerGate} detail={dashboard.scheduler.lastKnownIssue} />
          <SummaryCard label="Analytics" value={dashboard.summary.analyticsConnection} detail="가짜 수치 없음" />
        </section>

        <section>
          <SectionHeader
            icon={<FileSearch className="h-5 w-5" aria-hidden="true" />}
            title="글별 SEO 운영 테이블"
            description="조회수, 검색어, 유입은 실제 분석 데이터가 연결될 때까지 미연결로 표시합니다."
          />
          <ArticleTable rows={dashboard.articles} />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <EmptyAnalyticsPanel
            title={dashboard.analytics.searchConsole.title}
            emptyState={dashboard.analytics.searchConsole.emptyState}
            metrics={dashboard.analytics.searchConsole.metrics}
            providerStatus={dashboard.analytics.searchConsole.providerStatus}
          />
          <EmptyAnalyticsPanel
            title={dashboard.analytics.referrers.title}
            emptyState={dashboard.analytics.referrers.emptyState}
            metrics={dashboard.analytics.referrers.metrics}
            providerStatus={dashboard.analytics.referrers.providerStatus}
          />
          <EmptyAnalyticsPanel
            title={dashboard.analytics.sourceBreakdown.title}
            emptyState={dashboard.analytics.sourceBreakdown.emptyState}
            metrics={dashboard.analytics.sourceBreakdown.metrics}
            providerStatus={dashboard.analytics.sourceBreakdown.providerStatus}
          />
        </section>

        <AnalyticsConnectorPanel dashboard={dashboard} />

        <SearchRegistrationPanel dashboard={dashboard} />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />} title="SEO Health" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboard.seoHealth.map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-slate-950">{item.label}</h3>
                  {item.status === "ok" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader icon={<ListChecks className="h-5 w-5" aria-hidden="true" />} title="확장 실행 체크리스트" />
            <ol className="grid gap-3">
              {dashboard.expansionActions.map((action) => (
                <li key={action.priority} className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                      {action.priority}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-950">{action.label}</p>
                      {action.command ? (
                        <code className="mt-2 inline-block rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                          {action.command}
                        </code>
                      ) : null}
                    </div>
                  </div>
                  <StatusPill status="unknown">{action.status}</StatusPill>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader icon={<RadioTower className="h-5 w-5" aria-hidden="true" />} title="스케줄러 상태" />
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">현재 topic</dt>
                <dd className="mt-1 break-words font-bold text-slate-950">{dashboard.scheduler.currentTopic}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">다음 topic</dt>
                <dd className="mt-1 break-words text-slate-800">{dashboard.scheduler.nextTopic}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">완료 topic</dt>
                <dd className="mt-1 text-slate-800">{dashboard.scheduler.completedTopics.length}개 완료</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">현재 gate</dt>
                <dd className="mt-1 text-slate-800">{dashboard.scheduler.currentGate}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">다음 필요 artifact</dt>
                <dd className="mt-1 break-words font-mono text-xs text-slate-800">{dashboard.scheduler.nextRequiredArtifact}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">cadence</dt>
                <dd className="mt-1 text-slate-800">{dashboard.scheduler.cadence}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <BarChart3 className="mt-0.5 h-5 w-5 text-slate-500" aria-hidden="true" />
            <p>
              이 화면은 읽기 전용입니다. Search Console, GA4, Vercel Analytics, Umami, referrer 로그가
              연결되기 전까지 조회수·검색어·유입 수치는 표시하지 않습니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default async function SeoOpsDashboardPage() {
  const authenticated = await isOpsDashboardAuthenticated();

  if (!authenticated) {
    return <OpsDashboardUnlockScreen keyConfigured={isOpsDashboardKeyConfigured()} />;
  }

  return <SeoOpsDashboardContent />;
}
