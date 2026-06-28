import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab 실무 자료실",
  description:
    "달성률 계산, 매출 목표 쪼개기, 미수금 관리, 주문 채널 통합, 자동화 도구 비교처럼 바로 확인할 수 있는 Biz2Lab 실무 자료를 모았습니다.",
  path: "/ko/resources",
});

const resourceSections = [
  {
    title: "매출과 현금 흐름",
    description: "목표 대비 현재 위치와 실제 입금 가능성을 함께 확인합니다.",
    links: [
      {
        label: "달성률 계산법",
        href: "/ko/sales-ops/sales-achievement-rate",
        detail: "현재 실적, 목표, 부족 금액, 남은 영업일을 같은 표로 보는 기준",
      },
      {
        label: "매출 목표 쪼개기",
        href: "/ko/sales-ops/daily-sales-goal-breakdown",
        detail: "월 목표를 오늘 필요한 상담, 제안, 입금 확인 행동으로 나누는 방법",
      },
      {
        label: "미수금 관리 체크리스트",
        href: "/ko/sales-ops/accounts-receivable-tracker",
        detail: "청구일, 약속일, 경과일, 담당자 후속 조치를 놓치지 않는 표준 항목",
      },
    ],
  },
  {
    title: "소상공인 운영 점검",
    description: "매일 확인할 숫자와 주문, 예약, 리뷰 흐름을 작게 정리합니다.",
    links: [
      {
        label: "소상공인 매일 숫자 점검표",
        href: "/ko/small-business/daily-numbers-for-small-business",
        detail: "매출, 주문, 입금, 예약, 미처리 문의를 하루 단위로 확인",
      },
      {
        label: "주문 채널 통합 체크리스트",
        href: "/ko/small-business/unify-order-channels",
        detail: "전화, 메시지, 현장 주문을 한 기준으로 확정하는 방법",
      },
      {
        label: "예약·주문·리뷰 관리",
        href: "/ko/small-business/reservation-order-review-management",
        detail: "고객 접점이 흩어질 때 누락과 재확인을 줄이는 운영 기준",
      },
    ],
  },
  {
    title: "자동화 도구 검토",
    description: "도구 추천보다 도입 전 비용, 권한, 운영 부담을 먼저 봅니다.",
    links: [
      {
        label: "무료 오픈소스 자동화 도구 시리즈",
        href: "/ko/automation/free-open-source-automation-tools-series",
        detail: "도구별 장단점보다 어떤 상황에서 검토할지 정리한 시리즈 허브",
      },
      {
        label: "Metabase 대시보드 자동화",
        href: "/ko/automation/metabase-dashboard-automation-for-small-business",
        detail: "소상공인 업무 대시보드 후보로 볼 때 필요한 데이터 연결 기준",
      },
      {
        label: "Superset / Redash BI 비교 흐름",
        href: "/ko/automation/apache-superset-bi-dashboard-automation",
        detail: "BI 도구를 고르기 전에 권한, SQL, 운영 부담을 먼저 나누는 기준",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Biz2Lab Resources</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          Biz2Lab 실무 자료실
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          이 페이지는 다운로드 자료가 아니라, 현재 공개된 글 안에서 바로 확인할 수 있는 계산식,
          체크리스트, 비교 기준을 모은 안내판입니다. 새 도구를 고르기 전에 오늘 확인할 숫자와
          사람이 검토해야 할 기준을 먼저 정리하는 데 초점을 둡니다.
        </p>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {resourceSections.map((section) => (
          <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
            <div className="mt-5 grid gap-3">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-300 hover:bg-white"
                >
                  <h3 className="font-bold text-slate-950">{link.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{link.detail}</p>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-teal-200 bg-teal-50 p-5 text-sm leading-6 text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">자료실 사용 기준</h2>
        <p className="mt-2">
          모든 자료는 공개된 기존 글로 연결됩니다. 조회수, 검색어, 순위 같은 성과 수치를 만들거나
          보여주지 않으며, 고객 정보나 결제 데이터가 필요한 자동화는 담당자 확인 전제로만 설명합니다.
        </p>
      </section>
    </main>
  );
}
