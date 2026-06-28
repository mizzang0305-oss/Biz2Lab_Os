import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개",
  description:
    "Biz2Lab의 현장형 업무 자동화 콘텐츠 방향, 편집 기준, 과장 없는 실무 검토 원칙을 소개합니다.",
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
          Biz2Lab은 도구 소개보다 어떤 상황에서 시간을 줄이고, 손실을 줄이고,
          사람이 확인해야 할 기준을 남길 수 있는지에 집중합니다. 그래서 글마다
          계산식, 체크리스트, 표, 관련 글, 도입 전 주의점을 함께 제공하려고
          합니다.
        </p>
      </div>

      <section className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">운영자 / 편집 기준</h2>
        <div className="mt-5 grid gap-4 text-base leading-7 text-slate-700">
          <p>
            Biz2Lab은 소상공인, 영업팀, 1인 사업자가 실제 업무에서 확인할 수 있는
            기준을 우선합니다. 특정 도구를 무조건 추천하거나 수익을 보장하지
            않으며, 자동화 도입 전 비용, 권한, 데이터 보관, 사람 승인 단계를 함께
            검토합니다.
          </p>
          <ul className="grid gap-3">
            <li>콘텐츠 검토 기준: 문제 정의, 입력값, 확인 담당자, 다음 행동이 분명한지 확인합니다.</li>
            <li>과장 금지: 완전 무료, 상업 사용 보장, 즉시 수익 같은 표현을 사용하지 않습니다.</li>
            <li>리스크 확인: 고객 정보, 결제, 계약, 금액이 포함된 자동화는 사람 검토를 전제로 설명합니다.</li>
            <li>
              문의 경로: 공개 글에서 설명하기 어려운 적용 범위는{" "}
              <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/contact">
                문의 페이지
              </Link>
              로 연결합니다.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
