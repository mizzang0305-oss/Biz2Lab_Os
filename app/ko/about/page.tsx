import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개",
  description: "Biz2Lab의 정체성과 현장형 AI 업무 자동화 콘텐츠 방향을 소개합니다.",
  path: "/ko/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="text-4xl font-bold tracking-normal text-slate-950">Biz2Lab 소개</h1>
      <div className="mt-8 grid gap-6 text-lg leading-8 text-slate-600">
        <p>
          Biz2Lab은 소상공인, 영업팀, 1인 사업자를 위한 현장형 AI 업무 자동화
          콘텐츠 허브입니다. 반복 업무, 매출 관리, 주문 관리, 전자계약과 결제
          흐름을 작은 단위로 정리해 실제 운영에 적용할 수 있는 기준을 제공합니다.
        </p>
        <p>
          이 사이트는 과장된 성과를 약속하지 않습니다. 자동화는 도구를 많이 쓰는
          일이 아니라 업무 상태를 더 잘 보이게 만들고, 사람이 확인해야 할 일을
          놓치지 않게 만드는 운영 구조입니다.
        </p>
        <p>
          초기 공개 범위는 구글 애드센스 승인에 맞춘 한국어 정보성 콘텐츠로
          제한합니다. 승인 전에는 운영자가 검수한 글, 필수 안내 페이지, 사이트맵과
          RSS처럼 필요한 공개 요소만 유지합니다.
        </p>
      </div>
    </div>
  );
}
