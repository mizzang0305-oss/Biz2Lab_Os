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
        problem: "목표 대비 현재 실적, 부족 금액, 남은 영업일이 흩어져 있는 문제를 정리합니다.",
        loss: "늦게 보면 부족분을 메울 시간이 사라지고 예정 입금을 실적으로 오해할 수 있습니다.",
        next: "월 목표를 하루 행동량으로 나누려면 매출 목표 쪼개기 글로 이어서 봅니다.",
      },
      {
        label: "매출 목표 쪼개기",
        href: "/ko/sales-ops/daily-sales-goal-breakdown",
        problem: "월 목표를 상담, 제안, 입금 확인처럼 오늘 할 일로 바꾸는 기준을 제공합니다.",
        loss: "목표만 보고 행동량을 쪼개지 않으면 월말에야 부족 원인을 알게 됩니다.",
        next: "부족 금액이 입금 지연 때문인지 보려면 미수금 관리 체크리스트로 이어갑니다.",
      },
      {
        label: "미수금 관리 체크리스트",
        href: "/ko/sales-ops/accounts-receivable-tracker",
        problem: "청구일, 약속일, 경과일, 담당자 후속 조치를 한 표로 확인합니다.",
        loss: "미수금이 매출 달성률에 섞이면 실제 현금 흐름과 다음 조치가 늦어집니다.",
        next: "일일 숫자 점검표에서 입금, 주문, 예약을 함께 확인합니다.",
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
        problem: "매출, 주문, 입금, 예약, 미처리 문의를 하루 단위로 확인합니다.",
        loss: "숫자를 월말에만 보면 조정 가능한 시간과 고객 응대 기회를 놓칩니다.",
        next: "주문이 여러 채널에 흩어져 있다면 주문 채널 통합 체크리스트를 봅니다.",
      },
      {
        label: "주문 채널 통합 체크리스트",
        href: "/ko/small-business/unify-order-channels",
        problem: "전화, 메시지, 현장 주문을 하나의 확인 기준으로 묶습니다.",
        loss: "채널마다 따로 확인하면 누락 주문, 중복 응대, 재고 착오가 생길 수 있습니다.",
        next: "예약, 주문, 리뷰까지 이어지는 고객 접점은 예약·주문·리뷰 관리 글로 이어갑니다.",
      },
      {
        label: "예약·주문·리뷰 관리",
        href: "/ko/small-business/reservation-order-review-management",
        problem: "고객 접점에서 생기는 누락, 지연, 리뷰 대응 기준을 정리합니다.",
        loss: "응대 지연을 개인 기억에 맡기면 반복 고객과 리뷰 관리 기회를 잃습니다.",
        next: "혼자 운영하는 구조라면 1인 사업자 시스템화 기준을 함께 확인합니다.",
      },
    ],
  },
  {
    title: "자동화·대시보드 도구 검토",
    description: "도구 추천보다 도입 전 비용, 권한, 운영 부담을 먼저 봅니다.",
    links: [
      {
        label: "무료 오픈소스 자동화 도구 시리즈",
        href: "/ko/automation/free-open-source-automation-tools-series",
        problem: "도구별 장단점보다 어떤 상황에서 검토할지 기준을 먼저 보여줍니다.",
        loss: "무료라는 이유로 도입하면 설정, 권한, 백업, 유지보수 비용이 뒤늦게 커집니다.",
        next: "실제 대시보드 후보는 Metabase, Superset, Redash 글에서 비교합니다.",
      },
      {
        label: "Metabase 대시보드 자동화",
        href: "/ko/automation/metabase-dashboard-automation-for-small-business",
        problem: "매출, 미수금, 주문, 검색 지표를 한 화면에 모을 수 있는지 판단합니다.",
        loss: "질문과 데이터 원본을 정하지 않으면 대시보드가 보기 좋은 표에 그칩니다.",
        next: "권한과 BI 운영 범위가 더 복잡하면 Superset 분석으로 이어갑니다.",
      },
      {
        label: "Superset BI 대시보드 자동화",
        href: "/ko/automation/apache-superset-bi-dashboard-automation",
        problem: "BI 도구 도입 전에 SQL, 권한, 운영 책임, 대시보드 소유자를 점검합니다.",
        loss: "운영 기준 없이 BI 도구만 붙이면 지표 해석과 권한 문제가 반복됩니다.",
        next: "SQL 중심의 가벼운 리포팅 후보는 Redash 분석도 함께 확인합니다.",
      },
      {
        label: "Redash 오픈소스 대시보드 자동화",
        href: "/ko/automation/redash-open-source-dashboard-automation",
        problem: "SQL 기반 리포트와 알림을 작은 팀이 유지할 수 있는지 검토합니다.",
        loss: "쿼리 소유자와 검토 주기가 없으면 오래된 숫자가 의사결정에 남습니다.",
        next: "도구보다 먼저 매일 볼 숫자를 정하려면 소상공인 매일 숫자 점검표로 돌아갑니다.",
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
          이 페이지는 다운로드 자료가 아니라, 현재 공개 글 안에서 바로 확인할 수 있는 계산식, 체크리스트,
          비교 기준을 모은 안내입니다. 도구를 고르기 전에 오늘 확인할 숫자와 사람의 검토 기준을 먼저 정리하는
          데 초점을 둡니다.
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
                  <dl className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                    <div>
                      <dt className="font-semibold text-slate-900">해결하는 문제</dt>
                      <dd>{link.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">무시하면 생기는 손실</dt>
                      <dd>{link.loss}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">다음에 읽을 글</dt>
                      <dd>{link.next}</dd>
                    </div>
                  </dl>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-teal-200 bg-teal-50 p-5 text-sm leading-6 text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">자료의 사용 기준</h2>
        <p className="mt-2">
          모든 자료는 공개된 기존 글로 연결됩니다. 조회수, 검색어, 순위 같은 성과 수치를 만들거나 보여주지
          않으며, 고객 정보나 결제 데이터가 필요한 자동화는 담당자 확인 전제로만 설명합니다.
        </p>
      </section>
    </main>
  );
}
