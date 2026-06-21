import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개",
  description: "Biz2Lab의 정체성과 현장형 AI 업무 자동화 콘텐츠 방향을 소개합니다.",
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
          초기 공개 범위는 한국어 정보성 콘텐츠, 필수 안내 페이지, 사이트맵과
          RSS처럼 독자가 사이트를 이해하고 탐색하는 데 필요한 공개 요소로
          제한합니다. 이후 검증된 글과 실제 적용 사례를 중심으로 콘텐츠 범위를
          단계적으로 확장할 예정입니다.
        </p>
      </div>
    </div>
  );
}
