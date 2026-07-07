import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab 실무 자료실",
  description:
    "매출·달성률 계산, 미수금·입금 관리, 주문·리뷰·채널 관리, 자동화 도구 판단 기준, 대시보드·BI 도구 비교를 바로 확인할 수 있는 Biz2Lab 실무 자료실입니다.",
  path: "/ko/resources",
});

const resourceSections = [
  {
    title: "매출·달성률 계산",
    description: "목표, 현재 실적, 남은 영업일을 오늘 행동으로 바꾸는 계산 기준입니다.",
    links: [
      {
        kind: "formula",
        label: "달성률 계산법",
        href: "/ko/sales-ops/sales-achievement-rate",
        value: "달성률, 부족 금액, 남은 기간 하루 필요 실적을 한 번에 계산합니다.",
        loss: "무시하면 월말에야 목표 부족분을 알게 되고 조정 가능한 영업일을 잃습니다.",
        next: "월 목표를 오늘 행동량으로 쪼개려면 일일 매출 목표 글로 이어갑니다.",
      },
      {
        kind: "template",
        label: "일일 매출 목표 쪼개기",
        href: "/ko/sales-ops/daily-sales-goal-breakdown",
        value: "상담, 제안, 입금 확인처럼 오늘 해야 할 행동 단위로 목표를 나눕니다.",
        loss: "무시하면 목표는 남아 있지만 오늘 무엇을 바꿔야 하는지 늦게 결정합니다.",
        next: "현금 흐름까지 보려면 미수금 관리 체크리스트를 함께 봅니다.",
      },
      {
        kind: "checklist",
        label: "소상공인 매일 숫자 점검표",
        href: "/ko/small-business/daily-numbers-for-small-business",
        value: "매출, 주문, 입금, 예약, 미처리 문의를 하루 단위로 점검합니다.",
        loss: "무시하면 작은 누락이 월말 매출 차이와 고객 응대 지연으로 커집니다.",
        next: "주문 누락이 보이면 주문 채널 통합 체크리스트로 이동합니다.",
      },
    ],
  },
  {
    title: "미수금·입금 관리",
    description: "매출과 실제 입금을 분리해 현금 흐름 착시를 줄입니다.",
    links: [
      {
        kind: "checklist",
        label: "미수금 관리 체크리스트",
        href: "/ko/sales-ops/accounts-receivable-tracker",
        value: "청구일, 약속일, 경과일, 담당자 후속 조치를 한 표로 봅니다.",
        loss: "무시하면 매출 달성률은 좋아 보여도 실제 입금과 후속 조치가 밀립니다.",
        next: "입금 요청 문구가 필요하면 거래처 입금 확인 메시지 기준을 봅니다.",
      },
      {
        kind: "template",
        label: "거래처 입금 확인 메시지",
        href: "/ko/sales-ops/payment-reminder-message",
        value: "독촉처럼 보이지 않게 금액, 기한, 담당자 확인을 분리합니다.",
        loss: "무시하면 입금 확인이 감정적인 메시지로 흐르거나 기록 없이 반복됩니다.",
        next: "매출·미수금 구조를 함께 보려면 매출 미수금 구조 글로 이어갑니다.",
      },
    ],
  },
  {
    title: "주문·리뷰·채널 관리",
    description: "전화, 메시지, 현장 주문과 리뷰 응대를 하나의 확인 흐름으로 묶습니다.",
    links: [
      {
        kind: "checklist",
        label: "예약·주문·리뷰 관리",
        href: "/ko/small-business/reservation-order-review-management",
        value: "예약, 주문, 리뷰 대응에서 누락되기 쉬운 접점을 점검합니다.",
        loss: "무시하면 응대 지연, 리뷰 악화, 재방문 기회 손실이 반복됩니다.",
        next: "주문이 흩어져 있다면 주문 채널 통합 체크리스트를 봅니다.",
      },
      {
        kind: "template",
        label: "주문 채널 통합 체크리스트",
        href: "/ko/small-business/unify-order-channels",
        value: "전화, 메시지, 현장 주문을 하나의 확인표로 묶습니다.",
        loss: "무시하면 주문 누락, 중복 응대, 재고 착오가 생깁니다.",
        next: "영업 거래처 주문 흐름은 거래처 주문 관리 글로 이어갑니다.",
      },
    ],
  },
  {
    title: "자동화 도구 판단 기준",
    description: "자동화 도구 검토는 무료 여부보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 단계를 먼저 봅니다.",
    links: [
      {
        kind: "decision guide",
        label: "무료 오픈소스 자동화 도구 시리즈",
        href: "/ko/automation/free-open-source-automation-tools-series",
        value: "Activepieces, Node-RED, Huginn, Appsmith 같은 후보를 업무 기준으로 비교합니다.",
        loss: "무시하면 무료 도구를 붙인 뒤 권한, 백업, 유지보수 비용을 뒤늦게 발견합니다.",
        next: "SaaS 앱 연결은 Activepieces, 로컬 이벤트 처리는 Node-RED 글을 이어서 봅니다.",
      },
      {
        kind: "decision guide",
        label: "Activepieces 판단 기준",
        href: "/ko/automation/activepieces-ai-business-automation-n8n-alternative",
        value: "SaaS 업무 앱 연결과 승인 전 자동화 후보를 검토합니다.",
        loss: "무시하면 credential, 유료 기능, 외부 발송 리스크가 자동화 뒤에 남습니다.",
        next: "로컬 서버와 장비 이벤트가 필요하면 Node-RED 기준을 확인합니다.",
      },
      {
        kind: "decision guide",
        label: "Node-RED 로컬 자동화 기준",
        href: "/ko/automation/node-red-local-business-automation-server",
        value: "로컬 파일, webhook, 장비 이벤트를 내부 자동화로 연결할 수 있는지 봅니다.",
        loss: "무시하면 흐름이 많아질수록 권한과 장애 복구 담당자가 불분명해집니다.",
        next: "AI 초안과 문서 흐름은 AI 업무 자동화 기준 글로 이어갑니다.",
      },
      {
        kind: "checklist",
        label: "AI 업무 자동화 기준",
        href: "/ko/automation/ai-business-automation-guide",
        value: "초안, 검토, 승인, 기록을 분리할 수 있는 업무만 먼저 자동화합니다.",
        loss: "무시하면 AI 결과가 외부 발송이나 고객 응대에 검토 없이 섞입니다.",
        next: "자동화 우선순위를 정하려면 업무 자동화 우선순위 글을 봅니다.",
      },
    ],
  },
  {
    title: "대시보드·BI 도구 비교",
    description: "대시보드 도구를 붙이기 전에 질문, 데이터 원본, 소유자, 검토 주기를 정합니다.",
    links: [
      {
        kind: "decision guide",
        label: "Metabase 대시보드 자동화",
        href: "/ko/automation/metabase-dashboard-automation-for-small-business",
        value: "작은 팀이 매출, 미수금, 주문 지표를 질문 단위로 볼 수 있는지 판단합니다.",
        loss: "무시하면 보기 좋은 차트만 만들고 실제 의사결정 기준은 남지 않습니다.",
        next: "권한과 BI 운영 범위가 커지면 Superset 분석으로 이어갑니다.",
      },
      {
        kind: "decision guide",
        label: "Superset BI 대시보드 자동화",
        href: "/ko/automation/apache-superset-bi-dashboard-automation",
        value: "SQL, 권한, 대시보드 소유자, 운영 책임을 함께 검토합니다.",
        loss: "무시하면 지표 해석과 권한 문제가 반복되고 대시보드가 방치됩니다.",
        next: "SQL 중심의 가벼운 리포팅 후보는 Redash 분석을 봅니다.",
      },
      {
        kind: "decision guide",
        label: "Redash 오픈소스 대시보드 자동화",
        href: "/ko/automation/redash-open-source-dashboard-automation",
        value: "SQL 기반 리포트와 알림을 작은 팀이 유지할 수 있는지 검토합니다.",
        loss: "무시하면 오래된 쿼리와 출처 불명 숫자가 의사결정에 남습니다.",
        next: "먼저 볼 숫자를 정하려면 소상공인 매일 숫자 점검표로 돌아갑니다.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          Biz2Lab 실무 자료실
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          이 페이지는 단순 링크 목록이 아니라, 현재 공개 글 안에서 바로 확인할 수 있는 계산식,
          체크리스트, 판단 기준, 템플릿형 자료를 문제별로 묶은 안내입니다. 도구를 고르기 전에
          오늘 확인할 숫자와 사람이 검토해야 할 기준을 먼저 정리합니다.
        </p>
      </header>

      <section className="mt-10 grid gap-5">
        {resourceSections.map((section) => (
          <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-2 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-300 hover:bg-white"
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-teal-700">{link.kind}</span>
                    <h3 className="mt-2 font-bold text-slate-950">{link.label}</h3>
                    <dl className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                      <div>
                        <dt className="font-semibold text-slate-900">해결하는 문제</dt>
                        <dd>{link.value}</dd>
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
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-teal-200 bg-teal-50 p-5 text-sm leading-6 text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">자료의 사용 기준</h2>
        <p className="mt-2">
          모든 자료는 공개된 기존 글로 연결됩니다. 조회수, 검색어, 순위 같은 성과 수치를 만들거나 보여주지
          않으며, 고객 정보·결제·계약 데이터가 필요한 자동화는 담당자 확인 전제로만 설명합니다.
        </p>
      </section>
    </main>
  );
}
