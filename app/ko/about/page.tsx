import type { Metadata } from "next";
import Link from "next/link";

import { editorialIdentity } from "@/lib/editorial-evidence";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "사이트 소개와 편집 원칙",
  description:
    "Biz2Lab이 다루는 자동화·영업 운영 문제, 운영자의 프로젝트 경험, 검증 범위와 콘텐츠 수정 원칙을 소개합니다.",
  path: "/ko/about",
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <header>
        <p className="text-sm font-semibold text-teal-700">현장에서 만든 기준을 공개합니다</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          Biz2Lab 소개
        </h1>
        <div className="mt-6 grid gap-5 text-lg leading-8 text-slate-600">
          <p>
            Biz2Lab은 주문, 매출, 미수금, 고객 기록과 반복 업무를 시스템으로 옮길 때
            필요한 판단 기준을 한국어로 정리하는 실무 콘텐츠 사이트입니다.
          </p>
          <p>
            도구 기능을 나열하기보다 어떤 데이터를 원본으로 둘지, 사람이 어디에서
            승인할지, 실패했을 때 무엇으로 되돌릴지를 먼저 설명합니다.
          </p>
        </div>
      </header>

      <section className="mt-10 rounded-xl border border-teal-200 bg-teal-50 p-6">
        <h2 className="text-2xl font-bold text-slate-950">직접 다루는 문제</h2>
        <ul className="mt-5 grid gap-3 leading-7 text-slate-700">
          <li>AI 초안과 외부 실행 사이에 사람 승인 단계를 두는 업무 자동화</li>
          <li>주문·설문·문의·고객 후속 조치를 한 운영 흐름으로 묶는 소상공인 SaaS</li>
          <li>지시·증빙·승인·반려와 실패 상태를 남기는 조직 실행 시스템</li>
          <li>결제·알림·업로드처럼 실제 사용자에게 영향을 주는 기능의 안전 경계</li>
        </ul>
        <Link
          href="/ko/projects"
          className="mt-5 inline-flex rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          공개 프로젝트와 검증 범위 보기
        </Link>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">누가 작성하고 검토하나요?</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            글의 작성·검토 주체는{" "}
            <Link
              className="font-semibold text-teal-700 underline-offset-4 hover:underline"
              href={editorialIdentity.authorUrl}
            >
              {editorialIdentity.authorName}
            </Link>
            입니다. 공개 코드는{" "}
            <a
              className="font-semibold text-teal-700 underline-offset-4 hover:underline"
              href={editorialIdentity.operatorUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {editorialIdentity.operatorName}
            </a>
            에서 확인할 수 있습니다.
          </p>
          <p>
            고객사 이름, 개인정보와 내부 매출은 공개하지 않습니다. 대신 공개 저장소에서
            확인할 수 있는 구현 구조, 합성 데이터로 재현한 절차와 확인하지 않은 결과를
            구분해 적습니다.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">글을 만드는 기준</h2>
        <ul className="mt-5 grid gap-3 leading-7 text-slate-700">
          <li>독자가 해결하려는 문제와 적용하지 말아야 할 범위를 먼저 정합니다.</li>
          <li>직접 구현한 내용은 공개 코드 또는 재현 가능한 절차를 근거로 연결합니다.</li>
          <li>외부 제품·정책을 언급하면 공식 문서를 우선 확인하고 확인일을 남깁니다.</li>
          <li>가상 수치와 샘플 CSV는 실제 고객 성과나 매출로 표현하지 않습니다.</li>
          <li>AI 도구는 구조화와 누락 점검에 사용할 수 있지만 최종 문장과 공개 여부는 운영자가 검토합니다.</li>
          <li>금액·계약·개인정보·외부 발송은 자동 실행보다 사람 승인과 복구 경로를 우선합니다.</li>
        </ul>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">수정과 한계 공개</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            단순 오탈자 수정만으로 최신 글처럼 보이게 날짜를 바꾸지 않습니다. 절차,
            계산식, 출처, 다운로드 자료처럼 독자에게 의미 있는 내용이 달라졌을 때
            수정일을 갱신합니다.
          </p>
          <p>
            법률, 세무, 금융, 계약과 결제 관련 글은 일반 정보이며 전문가 판단을
            대신하지 않습니다. 실제 운영 결과를 측정하지 않은 글에는 예상 절감률이나
            수익 수치를 넣지 않습니다.
          </p>
          <p>
            오류 제보는{" "}
            <Link className="font-semibold text-teal-700 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            에서 받으며, 수정 기준은{" "}
            <Link className="font-semibold text-teal-700 hover:underline" href="/ko/editorial-policy">
              콘텐츠 수정 정책
            </Link>
            에 공개합니다.
          </p>
        </div>
      </section>

      <nav className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-8" aria-label="관련 정책">
        <Link className="font-semibold text-teal-700 hover:underline" href="/ko/author/biz2lab">
          운영자 소개
        </Link>
        <Link className="font-semibold text-teal-700 hover:underline" href="/ko/advertising">
          광고·제휴 안내
        </Link>
        <Link className="font-semibold text-teal-700 hover:underline" href="/ko/disclaimer">
          면책조항
        </Link>
        <Link className="font-semibold text-teal-700 hover:underline" href="/ko/privacy">
          개인정보처리방침
        </Link>
      </nav>
    </main>
  );
}
