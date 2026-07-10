import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "이용약관",
  description: "Biz2Lab 콘텐츠의 정보성 성격, 이용 범위, 출처 확인, 외부 링크와 책임 제한을 안내합니다.",
  path: "/ko/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">이용약관</h1>
      <p className="mt-4 text-sm text-slate-500">시행일: 2026-07-10</p>
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
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">정보의 최신성</h2>
          <p className="mt-3">
            도구 기능, 가격, 라이선스, 법률과 정책은 변경될 수 있습니다. 글의 게시일과 수정일을 함께 표시하지만,
            실제 도입이나 계약 전에는 해당 서비스의 공식 문서와 관계 기관의 최신 안내를 다시 확인해야 합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">저작권과 허용 범위</h2>
          <p className="mt-3">
            사이트 콘텐츠를 무단 복제하거나 오해를 부르는 방식으로 재배포할 수
            없습니다. 짧은 인용은 출처와 원문 링크를 표시하고 관련 법령이 허용하는 범위에서만 사용할 수 있습니다.
            자동화 예시와 체크리스트를 자신의 업무 검토에 참고하는 것은 가능하지만, 원문 전체를 재판매하거나
            제3자의 공식 안내처럼 표시할 수 없습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">외부 링크</h2>
          <p className="mt-3">
            공식 문서 확인을 위해 외부 사이트로 연결할 수 있습니다. 외부 사이트의 내용, 보안, 개인정보 처리,
            서비스 지속 여부는 해당 운영자의 책임이며 Biz2Lab이 이를 보증하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">책임 제한</h2>
          <p className="mt-3">
            Biz2Lab은 확인 가능한 근거와 실무 기준을 제공하기 위해 노력하지만 모든 상황에 대한 완전성이나
            특정 결과를 보장하지 않습니다. 사용자는 중요한 금액, 계약, 개인정보, 세무·법률 판단을 원본 자료와
            전문가 검토를 통해 확인해야 합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">문의</h2>
          <p className="mt-3">
            이용 관련 문의와 오류 제보는{" "}
            <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            를 통해 보낼 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
