import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "콘텐츠 수정 정책",
  description:
    "Biz2Lab의 출처 확인, 오류 제보, 수정일 표시, 오래된 정보 갱신과 AI 보조 활용 원칙을 안내합니다.",
  path: "/ko/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">콘텐츠 수정 정책</h1>
      <p className="mt-4 text-sm text-slate-500">시행일: 2026-07-23</p>
      <div className="mt-8 grid gap-8 leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">사실과 추정을 구분합니다</h2>
          <p className="mt-3">
            제품 기능, 가격, 법령과 정책은 공식 문서를 우선 확인합니다. 직접 확인하지 못한
            내용은 사실처럼 단정하지 않고 적용 전 재확인이 필요한 범위를 본문에 표시합니다.
            가상 예시와 샘플 수치는 실제 고객 성과나 운영 실적으로 표현하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">수정일은 의미 있는 변경에만 갱신합니다</h2>
          <p className="mt-3">
            절차, 계산식, 공식 출처, 다운로드 자료 또는 결론이 달라졌을 때 수정일을 갱신합니다.
            단순 오탈자 교정만으로 오래된 글을 새 글처럼 보이게 만들지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">AI는 보조 도구로만 사용합니다</h2>
          <p className="mt-3">
            AI는 초안 구조화와 누락 점검에 사용할 수 있지만 자동 공개하지 않습니다. 최종 문장,
            근거, 적용 범위와 공개 여부는 사람이 확인하며, 존재하지 않는 경험·통계·인터뷰를
            만들지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">오류 제보와 처리</h2>
          <p className="mt-3">
            오류가 있는 URL, 문제가 되는 문장과 확인 근거를{" "}
            <Link className="font-semibold text-teal-700 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            로 보내 주세요. 원문과 공식 자료를 대조한 뒤 수정하며, 중요한 결론이 바뀌면
            본문과 수정일에 반영합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
