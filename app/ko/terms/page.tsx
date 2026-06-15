import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "이용약관",
  description: "Biz2Lab 콘텐츠 이용 범위, 책임 제한, 결과 보장 없음에 대한 기본 안내입니다.",
  path: "/ko/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="text-4xl font-bold tracking-normal text-slate-950">이용약관</h1>
      <div className="mt-8 grid gap-7 leading-8 text-slate-600">
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">콘텐츠 성격</h2>
          <p className="mt-3">
            Biz2Lab의 글은 업무 자동화와 운영 시스템 정리를 위한 정보성 콘텐츠입니다.
            특정 도구, 매출, 비용 절감, 법률 또는 재무 결과를 보장하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">사용자 책임</h2>
          <p className="mt-3">
            콘텐츠를 실제 업무에 적용할 때는 각 사업자의 상황, 계약 조건, 법률,
            세무, 개인정보 처리 기준을 확인해야 합니다. 중요한 결정은 전문가 검토를
            권장합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">제한 사항</h2>
          <p className="mt-3">
            사이트 콘텐츠를 무단 복제하거나 오해를 부르는 방식으로 재배포할 수
            없습니다. 자동화 예시는 참고용이며 운영 책임은 사용자에게 있습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">문의</h2>
          <p className="mt-3">
            이용 관련 문의는 contact 페이지를 통해 보낼 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}

