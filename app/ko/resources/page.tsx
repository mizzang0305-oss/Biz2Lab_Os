import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab 실무 자료실",
  description:
    "공개된 20개 핵심 가이드와 함께 사용할 수 있는 업무 자동화, 매출, 미수금, 주문, 고객 관리 CSV 실무 자료를 제공합니다.",
  path: "/ko/resources",
});

const resourceSections = [
  {
    title: "업무 자동화 준비와 통제",
    description:
      "자동화할 일을 고르고, 원본·검토·승인 단계를 분리하며, 반복 업무의 시간을 기록하는 자료입니다.",
    resources: [
      {
        title: "AI 업무 자동화 통제표",
        article: "/ko/automation/ai-business-automation-guide",
        download: "/downloads/ai-automation-control-sheet.csv",
        description: "입력 데이터, AI 처리 범위, 사람 승인자, 실패 시 조치를 한 줄로 정리합니다.",
      },
      {
        title: "자동화 우선순위 점수표",
        article: "/ko/automation/automation-priority-method",
        download: "/downloads/automation-priority-scorecard.csv",
        description: "반복 빈도, 소요 시간, 오류 비용, 표준화 가능성을 기준으로 후보를 비교합니다.",
      },
      {
        title: "문서 정리 검토 기록",
        article: "/ko/automation/chatgpt-document-cleanup",
        download: "/downloads/document-cleanup-review-log.csv",
        description: "원문 보존 여부와 AI 수정 항목, 검토 결과를 기록합니다.",
      },
      {
        title: "Google Sheets 승인 로그",
        article: "/ko/automation/google-sheets-ai-automation",
        download: "/downloads/sheets-automation-approval-log.csv",
        description: "시트 자동화 실행 전후의 담당자 승인과 오류 상태를 남깁니다.",
      },
      {
        title: "업무 지식 노트 색인",
        article: "/ko/automation/obsidian-business-knowledge-base",
        download: "/downloads/knowledge-note-index.csv",
        description: "업무 노트의 출처, 소유자, 갱신일, 연결 문서를 관리합니다.",
      },
      {
        title: "자동화 전 업무 목록",
        article: "/ko/automation/pre-automation-task-list",
        download: "/downloads/pre-automation-work-inventory.csv",
        description: "자동화에 들어가기 전 현재 절차와 예외, 담당자를 먼저 적습니다.",
      },
      {
        title: "반복 업무 시간 기록표",
        article: "/ko/automation/reduce-repetitive-work-with-ai",
        download: "/downloads/repetitive-work-time-log.csv",
        description: "반복 횟수와 건당 시간을 기록해 실제 절감 후보를 찾습니다.",
      },
    ],
  },
  {
    title: "매출·목표·미수금 관리",
    description:
      "매출과 입금을 구분하고, 목표 차이와 후속 조치를 매일 확인하기 위한 자료입니다.",
    resources: [
      {
        title: "미수금 경과일 관리표",
        article: "/ko/sales-ops/accounts-receivable-tracker",
        download: "/downloads/accounts-receivable-aging.csv",
        description: "청구일, 입금 약속일, 경과일, 다음 연락일을 분리합니다.",
      },
      {
        title: "일일 매출 목표 계획표",
        article: "/ko/sales-ops/daily-sales-goal-breakdown",
        download: "/downloads/daily-sales-goal-plan.csv",
        description: "월 목표를 상담, 제안, 주문, 입금 확인 같은 오늘의 행동으로 나눕니다.",
      },
      {
        title: "일일 매출 보고서",
        article: "/ko/sales-ops/daily-sales-report",
        download: "/downloads/daily-sales-report.csv",
        description: "매출, 주문, 취소, 입금, 미처리 항목을 하루 단위로 기록합니다.",
      },
      {
        title: "입금 후속 조치 기록",
        article: "/ko/sales-ops/payment-reminder-message",
        download: "/downloads/payment-follow-up-log.csv",
        description: "입금 요청 문구, 발송일, 응답, 다음 확인일을 남깁니다.",
      },
      {
        title: "매출 달성률 계산표",
        article: "/ko/sales-ops/sales-achievement-rate",
        download: "/downloads/sales-achievement-calculator.csv",
        description: "목표 대비 달성률, 부족 금액, 남은 기간의 하루 필요 실적을 계산합니다.",
      },
      {
        title: "매출·현금 전환 연결표",
        article: "/ko/sales-ops/sales-revenue-ar-structure",
        download: "/downloads/cash-conversion-bridge.csv",
        description: "매출 발생부터 청구, 입금, 미수금까지 현금 흐름을 연결합니다.",
      },
      {
        title: "B2B 주문 등록부",
        article: "/ko/sales-ops/unify-order-channels-for-sales",
        download: "/downloads/b2b-order-register.csv",
        description: "전화, 메일, 메시지 주문을 한 등록부에서 상태별로 관리합니다.",
      },
    ],
  },
  {
    title: "주문·고객·1인 사업 운영",
    description:
      "여러 채널의 주문과 고객 요청을 한곳에 모으고, 매일과 매주의 운영 상태를 확인하는 자료입니다.",
    resources: [
      {
        title: "AI 지식 원본 등록부",
        article: "/ko/small-business/ai-knowledge-store-for-small-business",
        download: "/downloads/ai-knowledge-source-register.csv",
        description: "AI가 참고할 업무 자료의 출처, 공개 범위, 갱신 책임자를 기록합니다.",
      },
      {
        title: "고객 후속 기억표",
        article: "/ko/small-business/customer-memory-system",
        download: "/downloads/customer-follow-up-memory.csv",
        description: "고객 요청, 선호, 이전 응대, 다음 조치를 최소 정보로 관리합니다.",
      },
      {
        title: "일일 사업 점검표",
        article: "/ko/small-business/daily-numbers-for-small-business",
        download: "/downloads/daily-business-scorecard.csv",
        description: "매출, 주문, 입금, 예약, 미처리 문의를 매일 같은 기준으로 봅니다.",
      },
      {
        title: "예약·주문·리뷰 보드",
        article: "/ko/small-business/reservation-order-review-management",
        download: "/downloads/reservation-order-review-board.csv",
        description: "예약, 주문, 리뷰 대응을 담당자와 다음 행동 중심으로 정리합니다.",
      },
      {
        title: "1인 사업 주간 통제표",
        article: "/ko/small-business/solo-business-systemization",
        download: "/downloads/solo-business-weekly-control.csv",
        description: "혼자 운영할 때 밀리기 쉬운 판매, 정산, 고객, 문서 업무를 주간 단위로 점검합니다.",
      },
      {
        title: "주문 채널 통합함",
        article: "/ko/small-business/unify-order-channels",
        download: "/downloads/order-channel-inbox.csv",
        description: "전화, 메시지, 매장 주문을 하나의 접수 번호와 상태로 통합합니다.",
      },
    ],
  },
] as const;

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-teal-700">20개 핵심 글 · 20개 CSV</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          Biz2Lab 실무 자료실
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          모든 자료는 공개 글의 설명과 예시를 직접 실행해 볼 수 있도록 만든 CSV입니다.
          빈칸 또는 예시 데이터로 제공되며, 실제 고객 정보나 결제 정보는 포함하지 않습니다.
          먼저 글에서 사용 기준을 확인한 뒤 내려받아 복사본으로 사용하세요.
        </p>
      </header>

      <section className="mt-10 grid gap-6">
        {resourceSections.map((section) => (
          <section key={section.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-950">{section.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{section.description}</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {section.resources.map((resource) => (
                <article key={resource.article} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={resource.article}
                      className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-teal-600 hover:text-teal-700"
                    >
                      사용 가이드 읽기
                    </Link>
                    <a
                      href={resource.download}
                      download
                      className="inline-flex items-center rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                      CSV 내려받기
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">자료 사용 전 확인</h2>
        <ul className="mt-3 grid gap-2">
          <li>샘플 수치와 예시는 기능 설명용이며 실제 성과를 의미하지 않습니다.</li>
          <li>개인정보, 결제정보, 계약 원문, 비밀번호, API 키는 CSV에 입력하지 마세요.</li>
          <li>금액·고객 안내·외부 발송이 포함된 자동화는 담당자가 최종 확인해야 합니다.</li>
        </ul>
      </section>
    </main>
  );
}
