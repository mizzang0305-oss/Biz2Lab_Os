import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "면책조항",
  description:
    "Biz2Lab의 기술·업무·계약·결제 관련 콘텐츠 적용 범위와 전문가 상담이 필요한 상황을 안내합니다.",
  path: "/ko/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">면책조항</h1>
      <p className="mt-4 text-sm text-slate-500">시행일: 2026-07-23</p>
      <div className="mt-8 grid gap-8 leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">일반 정보 제공 목적</h2>
          <p className="mt-3">
            Biz2Lab 콘텐츠는 업무 자동화와 운영 구조를 검토하기 위한 일반 정보입니다.
            특정 매출, 비용 절감, 시스템 성능 또는 사업 결과를 보장하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">전문가 상담을 대신하지 않습니다</h2>
          <p className="mt-3">
            계약, 개인정보, 세무, 회계, 금융, 보안과 법률 판단은 조직의 상황과 최신 규정에 따라
            달라집니다. 실제 적용 전 관련 전문가와 공식 기관의 최신 안내를 확인해야 합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">정보 변경 가능성</h2>
          <p className="mt-3">
            도구 기능, 가격, 라이선스와 정책은 게시 이후 바뀔 수 있습니다. 글의 수정일과 출처
            확인일을 참고하되 중요한 결정 전에는 원문을 다시 확인해 주세요.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">적용 책임</h2>
          <p className="mt-3">
            예제와 CSV는 검토용 출발점입니다. 실제 데이터로 바꾸기 전에 백업, 권한, 승인자와
            롤백 절차를 확인해야 합니다. 오류 제보는{" "}
            <Link className="font-semibold text-teal-700 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            를 이용해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
