import type { Metadata } from "next";
import Link from "next/link";

import { editorialIdentity } from "@/lib/editorial-evidence";
import { absoluteUrl } from "@/lib/site";
import { createMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개",
  description:
    "Biz2Lab의 20개 핵심 실무 글 운영 원칙, AI 활용 범위, 샘플 데이터 표시, 검토 보류 기준과 수정 정책을 소개합니다.",
  path: "/ko/about",
});

export default function AboutPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: editorialIdentity.operatorName,
      url: editorialIdentity.operatorUrl,
      worksFor: {
        "@type": "Organization",
        name: "Biz2Lab",
        url: absoluteUrl("/ko"),
      },
      knowsAbout: [
        "AI 업무 자동화",
        "SaaS 개발",
        "영업·매출 운영",
        "소상공인 운영 시스템",
      ],
    },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(profileJsonLd) }}
      />
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
          <li>공개 기준 또는 현재 전문 주제와 맞지 않는 도구 비교·계약·결제·엔터테인먼트 글 55개는 검토 보류 상태로 공개하지 않습니다.</li>
        </ul>
        <Link
          href="/ko/resources"
          className="mt-5 inline-flex rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          20개 실무 자료 보기
        </Link>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">누가 운영하고 검토하나요?</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            모든 글의 표시 작성·검토 주체는 {editorialIdentity.authorName}입니다. 저장소와 수정
            이력을 관리하는 공개 운영 책임 계정은{" "}
            <a
              className="font-semibold text-teal-700 underline-offset-4 hover:underline"
              href={editorialIdentity.operatorUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {editorialIdentity.operatorName}
            </a>
            입니다. 확인할 수 없는 경력이나 자격,
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
        <h2 className="text-2xl font-bold text-slate-950">왜 이 콘텐츠를 만드나요?</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            Biz2Lab의 목적은 검색 유입을 위해 여러 주제를 넓게 생산하는 것이 아니라, 소상공인과
            작은 팀이 숫자·주문·고객·반복 업무를 직접 정리할 수 있는 한국어 실행 자료를 제공하는 것입니다.
          </p>
          <p>
            그래서 공개 글마다 독자가 바로 복사해 점검할 수 있는 CSV, 계산식 또는 절차를 연결합니다.
            현재 자료는 무료이며 이메일 입력이나 회원가입 없이 내려받을 수 있습니다.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">어떻게 작성하고 검토하나요?</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            AI 도구는 초안 구조화, 누락 항목 탐색, 문장 정리에 활용할 수 있습니다. 그러나 AI가 만든
            문장을 검토 없이 공개하지 않으며, 최종 공개 여부와 표현은 Biz2Lab 편집 기준으로 결정합니다.
          </p>
          <ol className="grid list-decimal gap-3 pl-5">
            <li>독자가 해결하려는 문제와 적용하지 말아야 할 범위를 먼저 정합니다.</li>
            <li>외부 제품·정책을 언급하면 공식 문서를 우선 확인하고 출처 확인일을 기록합니다.</li>
            <li>자체 절차는 계산식, 가상 사례와 다운로드 CSV가 서로 일치하는지 대조합니다.</li>
            <li>개인정보, 법률, 세무, 금융처럼 위험이 큰 판단을 일반적인 팁으로 단정하지 않습니다.</li>
            <li>독창성 검토: 중복 문단과 반복 구조가 없는지 검사하고 깨진 링크, 누락 이미지와 공개 경로를 확인합니다.</li>
            <li>보장된 수익, 가짜 조회수, 확인하지 않은 고객 성과와 제품 경험을 만들지 않습니다.</li>
            <li>운영자가 최종 공개 여부를 승인한 뒤에만 공개 상태로 전환합니다.</li>
          </ol>
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
            현재 공개한 핵심 글 20개는 Git 저장소 기록상 2026년 6월 15일 처음 공개되었습니다.
            같은 게시일을 숨기거나 서로 다른 날짜로 꾸미지 않으며, 이후 실제 내용 검토가 있었던 날을
            수정일로 표시합니다.
          </p>
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

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-950">광고·협찬과 편집 독립성</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            현재 공개 글에는 유료 협찬 원고, 제휴 링크, 판매 수수료를 받는 순위표가 없습니다.
            Google AdSense 연결 코드가 포함되어 있지만 승인 여부나 향후 광고 수익이 글의 결론,
            추천 순서 또는 검토 보류 기준을 바꾸지 않습니다.
          </p>
          <p>
            향후 협찬이나 제휴 관계가 생기면 해당 글에서 이해관계를 명확히 표시합니다. 표시할 수 없는
            대가성 콘텐츠는 공개하지 않습니다.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="text-teal-700 hover:underline" href="/ko/editorial-policy">
            콘텐츠 수정 정책
          </Link>
          <Link className="text-teal-700 hover:underline" href="/ko/advertising">
            광고·제휴 안내
          </Link>
          <Link className="text-teal-700 hover:underline" href="/ko/disclaimer">
            면책조항
          </Link>
        </div>
      </section>
    </main>
  );
}
