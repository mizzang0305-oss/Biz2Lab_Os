import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개",
  description:
    "Biz2Lab의 20개 핵심 실무 글 운영 원칙, AI 활용 범위, 샘플 데이터 표시, 검토 보류 기준과 수정 정책을 소개합니다.",
  path: "/ko/about",
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <header>
        <p className="text-sm font-semibold text-teal-700">작게 공개하고 깊게 검토합니다</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          Biz2Lab 소개
        </h1>
        <div className="mt-6 grid gap-5 text-lg leading-8 text-slate-600">
          <p>
            Biz2Lab은 소상공인, 영업팀, 1인 사업자가 매일 확인해야 하는 매출, 미수금,
            주문, 고객 기록과 업무 자동화 기준을 정리하는 한국어 실무 콘텐츠 사이트입니다.
          </p>
          <p>
            현재는 품질을 직접 확인한 20개 핵심 글만 공개합니다. 글 수를 늘리는 것보다
            독자가 따라 할 수 있는 절차, 계산 과정, 예시 표와 실제 CSV 자료를 갖추는 것을 우선합니다.
          </p>
        </div>
      </header>

      <section className="mt-10 rounded-xl border border-teal-200 bg-teal-50 p-6">
        <h2 className="text-2xl font-bold text-slate-950">공개 콘텐츠 기준</h2>
        <ul className="mt-5 grid gap-3 leading-7 text-slate-700">
          <li>공개 글 20개는 자동화 7개, 영업·매출 7개, 소상공인 운영 6개로 구성합니다.</li>
          <li>모든 공개 글에는 구체적인 절차 또는 표, FAQ 3개 이상, 실제 CSV 다운로드가 있습니다.</li>
          <li>샘플 수치와 가상 사례는 실제 성과나 고객 사례로 오해하지 않도록 본문에서 표시합니다.</li>
          <li>공개 기준을 충족하지 못한 도구 비교와 계약·결제 글 33개는 검토 보류 상태로 공개하지 않습니다.</li>
        </ul>
        <Link
          href="/ko/resources"
          className="mt-5 inline-flex rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          20개 실무 자료 보기
        </Link>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">작성·검토 주체</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            모든 글의 작성·검토 주체는 Biz2Lab 편집팀입니다. 확인할 수 없는 경력이나 자격,
            사용하지 않은 제품 경험, 존재하지 않는 고객 성과를 작성자 소개로 사용하지 않습니다.
          </p>
          <p>
            공개 글의 오류나 적용 범위에 대한 의견은{" "}
            <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            에서 받습니다. 수정할 내용은 원문과 근거를 다시 확인한 뒤 반영합니다.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">AI 활용과 편집 원칙</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            AI 도구는 초안 구조화, 누락 항목 탐색, 문장 정리에 활용할 수 있습니다. 그러나 AI가 만든
            문장을 검토 없이 공개하지 않으며, 최종 공개 여부와 표현은 Biz2Lab 편집 기준으로 결정합니다.
          </p>
          <ul className="grid gap-3">
            <li>독자 문제 우선: 검색어 반복보다 해결할 문제와 다음 행동을 먼저 설명합니다.</li>
            <li>근거 확인: 바뀔 수 있는 제품 기능은 공식 문서를 우선 확인하고 확인일을 구분합니다.</li>
            <li>독창성 검토: 여러 글에서 같은 문단과 같은 소제목 구조가 반복되지 않는지 검사합니다.</li>
            <li>과장 금지: 보장된 수익, 즉시 효과, 확인하지 않은 순위와 이용 실적을 만들지 않습니다.</li>
            <li>사람 승인: 금액, 개인정보, 고객 안내, 외부 발송은 자동 실행보다 담당자 확인을 우선합니다.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">샘플 데이터와 개인정보</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            글과 CSV에 들어 있는 이름, 금액, 날짜, 달성률은 설명을 위한 가상 예시입니다.
            실제 고객 정보나 내부 매출 자료가 아니며, 다운로드 파일에도 개인식별정보를 넣지 않습니다.
          </p>
          <p>
            자료를 사용할 때는 원본을 복사하고 접근 권한을 제한하세요. 개인정보 수집과 보관에 관한
            기본 원칙은{" "}
            <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/privacy">
              개인정보처리방침
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">수정일과 검토 보류 원칙</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            단순 오탈자 수정만으로 최신 글처럼 보이게 날짜를 바꾸지 않습니다. 절차, 계산식, 출처,
            다운로드 자료처럼 독자에게 의미 있는 내용이 달라졌을 때 수정일을 갱신합니다.
          </p>
          <p>
            법률, 세무, 금융, 계약, 결제처럼 정확성 위험이 큰 글은 일반적인 설명만으로 공개하지 않습니다.
            공식 근거와 전문가 검토 범위가 충분하지 않으면 비공개 상태를 유지합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
