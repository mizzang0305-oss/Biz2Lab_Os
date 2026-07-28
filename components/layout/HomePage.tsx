import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { getFeaturedHomePosts } from "@/lib/posts";
import { publicProjects } from "@/lib/public-projects";
import { siteSettings } from "@/lib/site-settings";

export function HomePage() {
  const posts = getFeaturedHomePosts(10);
  const practicalLinks = [
    {
      title: "달성률 계산 / 매출 달성률",
      href: "/ko/sales-ops/sales-achievement-rate",
      description: "목표 대비 실적, 부족 금액, 남은 영업일을 계산하는 기준",
    },
    {
      title: "매일 확인해야 할 숫자",
      href: "/ko/small-business/daily-numbers-for-small-business",
      description: "매출, 주문, 입금, 예약, 미처리 업무를 하루 단위로 확인",
    },
    {
      title: "미수금 관리 체크리스트",
      href: "/ko/sales-ops/accounts-receivable-tracker",
      description: "청구일, 약속일, 경과일, 담당자 후속 조치를 한 표로 정리",
    },
    {
      title: "일일 매출 목표 쪼개기",
      href: "/ko/sales-ops/daily-sales-goal-breakdown",
      description: "월 목표를 오늘 상담, 제안, 입금 확인 행동량으로 나눔",
    },
    {
      title: "주문 채널 통합",
      href: "/ko/small-business/unify-order-channels",
      description: "전화, 메시지, 현장 주문을 누락 없이 확인하는 기준",
    },
  ];
  const lossNumberLinks = [
    {
      title: "달성률과 부족 금액",
      href: "/ko/sales-ops/sales-achievement-rate",
      description: "목표 대비 현재 위치와 남은 기간 하루 필요 실적을 계산합니다.",
    },
    {
      title: "매일 확인해야 할 숫자",
      href: "/ko/small-business/daily-numbers-for-small-business",
      description: "매출, 주문, 입금, 예약, 미처리 문의를 하루 단위로 보고 다음 행동으로 연결합니다.",
    },
    {
      title: "미수금과 입금 약속",
      href: "/ko/sales-ops/accounts-receivable-tracker",
      description: "청구일, 약속일, 경과일, 담당자 후속 조치를 분리합니다.",
    },
  ];
  const decisionGuideLinks = [
    {
      title: "자동화 우선순위 정하기",
      href: "/ko/automation/automation-priority-method",
      description: "반복 빈도, 소요 시간, 오류 비용, 표준화 가능성으로 첫 자동화 후보를 고릅니다.",
    },
    {
      title: "Google Sheets 자동화 기준",
      href: "/ko/automation/google-sheets-ai-automation",
      description: "원본 시트, 실행 조건, 승인자, 오류 기록이 준비됐는지 먼저 확인합니다.",
    },
    {
      title: "AI 업무 자동화 기준",
      href: "/ko/automation/ai-business-automation-guide",
      description: "초안, 검토, 승인, 기록을 분리할 수 있을 때만 자동화를 검토합니다.",
    },
  ];
  const pathLinks = [
    {
      title: "매출 목표를 쪼개야 할 때",
      href: "/ko/sales-ops/daily-sales-goal-breakdown",
      description: "월 목표가 막연하면 오늘 행동량부터 계산합니다.",
    },
    {
      title: "주문 채널이 흩어졌을 때",
      href: "/ko/small-business/unify-order-channels",
      description: "전화, 메시지, 현장 주문을 하나의 확인표로 묶습니다.",
    },
    {
      title: "도구 선택 전에 비교할 때",
      href: "/ko/resources",
      description: "계산식, 체크리스트, 판단 기준을 문제별로 먼저 봅니다.",
    },
  ];
  const fieldCases = [
    {
      title: "승인 전 외부 업로드를 막은 자동화",
      href: "/ko/automation/ai-business-automation-guide",
      description: "생성 결과와 외부 실행을 분리하고 차단 사유를 화면에 남긴 기록",
    },
    {
      title: "전화·메시지·포털 주문 원본 분리",
      href: "/ko/small-business/unify-order-channels",
      description: "주문 채널과 재고·한도 검증 상태를 한 값으로 덮지 않은 작업대",
    },
    {
      title: "피킹·검수·상차 상태 분리",
      href: "/ko/warehouse-logistics/separate-picking-inspection-loading-status",
      description: "검수 전 상차 완료를 차단하고 차이 확인을 별도 작업으로 남긴 WMS",
    },
    {
      title: "서로 다른 운영 숫자를 한 화면에서 보기",
      href: "/ko/small-business/daily-numbers-for-small-business",
      description: "주문·예약·웨이팅·고객 기록을 읽기 전용 데모로 분리한 운영 화면",
    },
    {
      title: "실행 결과와 실패 로그를 남기는 기준",
      href: "/ko/automation/automation-priority-method",
      description: "자동 실행보다 상태 기록과 수동 검토를 먼저 만든 이유",
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div className="min-w-0">
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl md:text-5xl">
              {siteSettings.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {siteSettings.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={siteSettings.hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-800 sm:w-auto"
              >
                {siteSettings.hero.primaryCta.label} <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href={siteSettings.hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-teal-700 hover:text-teal-700 sm:w-auto"
              >
                {siteSettings.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="min-w-0 rounded-md border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="grid gap-3">
              {siteSettings.hero.bullets.map((item) => (
                <div key={item} className="flex min-w-0 items-start gap-3 rounded-md bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span className="min-w-0 text-sm leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-teal-300">현장 문제 → 구현 화면 → 검증 경계</p>
            <h2 className="mt-2 text-2xl font-bold">로컬에서 다시 실행한 대표 구축 사례</h2>
            <p className="mt-3 leading-7 text-slate-300">
              고객정보와 운영 DB를 쓰지 않은 fixture·로컬 데모만 연결했습니다. 화면으로
              확인하지 못한 성과는 주장하지 않습니다.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fieldCases.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-700 bg-slate-900 p-5 transition hover:border-teal-400"
              >
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-normal text-slate-950">
              놓치면 손해 보는 실무 숫자
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              대표 구축 사례 다음에는 현장에서 같은 문제를 점검할 때 쓸 수 있는 계산 기준과
              체크리스트를 제공합니다.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lossNumberLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
              >
                <h3 className="font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl min-w-0">
            <h2 className="text-2xl font-bold tracking-normal text-slate-950">
              바로 쓰는 실무 자료
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Biz2Lab은 도구 이름을 나열하는 블로그가 아니라, 매일 놓치면 손해가 되는 숫자와 확인 기준을
              먼저 정리합니다.
            </p>
          </div>
          <Link href="/ko/resources" className="shrink-0 text-sm font-semibold text-teal-700">
            실무 자료실 보기
          </Link>
        </div>
        <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {practicalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
        <div className="max-w-2xl min-w-0">
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">
            자동화 도구 도입 전 판단 기준
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            자동화는 도구를 먼저 고르는 일이 아닙니다. 반복 빈도, 원본 데이터, 오류 비용,
            사람 승인 단계를 먼저 확인한 뒤 작은 업무부터 시작합니다.
          </p>
        </div>
        <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-3">
          {decisionGuideLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold">공개 코드에서 나온 운영 기준</h2>
              <p className="mt-3 leading-7 text-slate-300">
                자동화 통제, 매장 운영 SaaS와 승인 로그를 직접 구현하면서 확인한 범위와
                아직 검증하지 않은 결과를 함께 공개합니다.
              </p>
            </div>
            <Link href="/ko/projects" className="shrink-0 text-sm font-semibold text-teal-300 hover:underline">
              프로젝트 기록 전체 보기
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {publicProjects.map((project) => (
              <article key={project.repository} className="rounded-lg border border-slate-700 bg-slate-900 p-5">
                <p className="text-sm font-semibold text-teal-300">{project.repository}</p>
                <h3 className="mt-2 text-lg font-bold">{project.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>
                <Link
                  href={project.relatedArticle}
                  className="mt-4 inline-flex text-sm font-semibold text-teal-300 hover:underline"
                >
                  {project.relatedLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">최근 실무 글</h2>
              <p className="mt-3 leading-7 text-slate-600">
                각 글은 문제, 해결 방향, 체크리스트, 관련 글, 다음 단계로
                이어지도록 구성했습니다.
              </p>
            </div>
            <Link href="/ko/automation" className="shrink-0 text-sm font-semibold text-teal-700">
              글 묶음 보기
            </Link>
          </div>
          <div className="mt-8 grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
        <div className="max-w-2xl min-w-0">
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">추천 탐색 경로</h2>
          <p className="mt-3 leading-7 text-slate-600">
            지금 겪는 문제가 숫자, 주문, 도구 선택 중 어디에 가까운지에 따라 다음 글로 이동하세요.
          </p>
        </div>
        <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-3">
          {pathLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-teal-200 bg-teal-50 p-4 transition hover:border-teal-400 hover:bg-white"
            >
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
