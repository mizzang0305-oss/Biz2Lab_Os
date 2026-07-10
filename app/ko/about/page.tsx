import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개",
  description:
    "Biz2Lab 편집팀의 현장형 업무 자동화 콘텐츠 목적, 제작 과정, 출처 확인과 수정 원칙을 소개합니다.",
  path: "/ko/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">Biz2Lab 소개</h1>
      <div className="mt-8 grid gap-6 text-lg leading-8 text-slate-600">
        <p>
          Biz2Lab은 소상공인, 영업팀, 1인 사업자를 위한 현장형 AI 업무 자동화
          콘텐츠 허브입니다. 반복 업무, 매출 관리, 주문 관리, 전자계약과 결제
          흐름을 작은 단위로 정리해 실제 운영에 적용할 수 있는 기준을 제공합니다.
        </p>
        <p>
          이 사이트는 과장된 성과를 약속하지 않습니다. 자동화는 도구를 많이 쓰는
          일이 아니라, 업무 상태를 더 잘 보이게 만들고 사람이 확인해야 할 일을
          놓치지 않게 만드는 운영 구조입니다.
        </p>
        <p>
          Biz2Lab은 단순 도구 소개보다 실제 업무에서 시간을 줄이고, 손실을 줄이고, 사람이 확인해야 할 기준을 정리하는 것을 우선합니다.
          그래서 글마다 계산식, 체크리스트, 표, 관련 글, 도입 전 주의점을 함께 제공합니다.
        </p>
      </div>

      <section className="mt-10 border-y border-slate-200 py-8">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">작성·검토 주체</h2>
        <div className="mt-5 grid gap-4 text-base leading-7 text-slate-700">
          <p>
            모든 글의 작성·검토 주체는 Biz2Lab 편집팀입니다. 특정 제품 판매자가 아니라
            소상공인과 작은 팀의 운영 문제를 기준으로 도구, 숫자, 업무 흐름을 비교합니다.
          </p>
          <p>
            적용 범위나 공개 글의 오류 제보는{" "}
            <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            에서 받습니다. 수정이 필요한 내용은 원문을 확인한 뒤 갱신일과 함께 반영합니다.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">콘텐츠 제작과 편집 기준</h2>
        <div className="mt-5 grid gap-4 text-base leading-7 text-slate-700">
          <p>
            초안 구조화와 비교 항목 정리에 AI 도구를 활용할 수 있습니다. 다만 AI가 만든
            문장을 그대로 공개하지 않고, 공개 전에는 공식 문서 링크, 과장 표현, 개인정보·결제·계약 위험,
            실제로 따라 할 수 있는 절차인지 여부를 편집 기준에 따라 확인합니다.
          </p>
          <ul className="grid gap-3">
            <li>독자 우선: 검색어보다 독자가 해결하려는 문제와 다음 행동을 먼저 설명합니다.</li>
            <li>출처 확인: 제품 기능, 라이선스, 법률·결제 관련 내용은 가능한 한 공식 문서를 우선 확인합니다.</li>
            <li>독창성 검토: 다른 글과 같은 문단을 반복하지 않고 주제별 판단 기준과 사례를 제공합니다.</li>
            <li>과장 금지: 완전 무료, 상업 사용 보장, 즉시 수익 같은 표현을 사용하지 않습니다.</li>
            <li>도구 도입 전 리스크 확인: 고객 정보, 결제, 계약, 금액이 포함된 자동화는 사람 검토를 전제로 설명합니다.</li>
            <li>
              개인정보 기준: 수집, 보관, 외부 전송이 필요한 흐름은{" "}
              <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/privacy">
                개인정보처리방침
              </Link>
              을 기준으로 확인합니다.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">수정과 최신성 원칙</h2>
        <div className="mt-5 grid gap-4 text-base leading-7 text-slate-700">
          <p>
            제품 가격, 라이선스, 지원 기능처럼 바뀔 수 있는 정보는 글의 작성일만으로 확정하지 않습니다.
            실제 도입 전 공식 문서를 다시 확인하도록 안내하고, 중요한 변경을 반영한 글은 수정일을 갱신합니다.
          </p>
          <p>
            법률, 세무, 금융, 개인정보 관련 글은 일반적인 운영 기준을 설명하는 정보성 콘텐츠이며
            개별 사안의 전문가 자문을 대신하지 않습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
