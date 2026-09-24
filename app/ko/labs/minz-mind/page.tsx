import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MINZ MIND 사전 체험·파일럿 | Biz2Lab",
  description:
    "대화와 그림을 함께 사용하는 비의료 자기성찰 서비스 MINZ MIND. 현재 Human Review 전 단계로, 사전 체험과 파일럿 협력 문의를 받습니다.",
  alternates: {
    canonical: "https://www.biz2lab.com/ko/labs/minz-mind",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "MINZ MIND 사전 체험·파일럿 | Biz2Lab",
    description:
      "말로만 정리하기 어려운 생각을 대화와 그림으로 풀어내는 비의료 자기성찰 서비스. 현재 사전 체험·파일럿 문의를 받습니다.",
    url: "https://www.biz2lab.com/ko/labs/minz-mind",
    type: "website",
    siteName: "Biz2Lab",
  },
  twitter: {
    card: "summary",
    title: "MINZ MIND 사전 체험·파일럿 | Biz2Lab",
    description:
      "대화와 그림을 함께 사용하는 비의료 자기성찰 서비스. 사전 체험·파일럿 문의를 받습니다.",
  },
};

const features = [
  {
    title: "말을 정리하는 AI 마음정리 가이드",
    body: "내가 말한 사건·생각·감정·필요를 함부로 진단하지 않고 정리한 뒤, 다음 질문을 짧게 이어갑니다.",
  },
  {
    title: "그림을 잘 못 그려도 시작하는 Art V2",
    body: "빈 캔버스부터 막막하게 시작하지 않습니다. 선, 날씨, 빛, 오브젝트 같은 가이드형 활동으로 표현을 돕습니다.",
  },
  {
    title: "장면이 바뀌는 Living Scene",
    body: "대화와 그림의 흐름에 맞춰 안개, 숲, 빛, 하늘 같은 장면이 이어지되 사용자가 원하지 않는 해석을 강요하지 않습니다.",
  },
  {
    title: "기억은 자동이 아니라 승인 기반",
    body: "장기 기억은 사용자가 승인한 내용만 남기고, 보거나 수정하거나 멈추거나 삭제할 수 있게 설계합니다.",
  },
];

export default function MinzMindEarlyAccessPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-4xl">
        <p className="text-sm font-semibold tracking-wide text-teal-700">
          Biz2Lab Labs · Early Access
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
          말로만 정리하기 어려운 마음을,
          <br className="hidden sm:block" /> 대화와 그림으로 풀어내는 MINZ MIND
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          MINZ MIND는 AI와 짧게 대화하고, 직접 몇 번의 선과 오브젝트를 움직이며
          지금 내 생각을 돌아보는 비의료 자기성찰 서비스입니다. 상담·진단·치료를
          대신하는 제품이 아니라, 스스로 생각을 정리하는 경험에 초점을 둡니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/ko/contact"
            className="inline-flex rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            사전 체험·파일럿 문의
          </Link>
          <a
            href="#current-stage"
            className="inline-flex rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            현재 개발 단계 보기
          </a>
        </div>
      </header>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">{feature.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{feature.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-8">
        <p className="text-sm font-semibold text-teal-800">왜 만들었나</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          글만 쓰는 일기와 채팅만 하는 AI 사이에 다른 경험을 만들고 싶었습니다.
        </h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            머릿속이 복잡할 때 바로 긴 글을 쓰는 일은 생각보다 어렵습니다. 반대로 AI가
            너무 빨리 결론을 내리거나 의미를 대신 정해버리면 내 이야기가 아닌 것처럼
            느껴질 수 있습니다.
          </p>
          <p>
            MINZ MIND는 짧은 대화로 생각을 정리한 뒤, 몇 번의 선과 색, 상징 오브젝트로
            표현하고 다시 한 번 돌아보는 흐름을 만듭니다. 그림의 의미는 시스템이
            진단하지 않고 사용자가 직접 정합니다.
          </p>
        </div>
      </section>

      <section id="current-stage" className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-950">현재 판매·체험 단계</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            현재 MINZ MIND는 통합 Preview와 기술 검증을 마쳤고, 실제 사람의 Human
            Experience Review를 시작하기 직전 단계입니다. 아직 누구나 결제하고 바로
            사용하는 공개 상용 서비스로 출시한 상태는 아닙니다.
          </p>
          <p>
            그래서 지금 받는 문의는 <strong>사전 체험, 초기 파일럿, 협력 제안</strong>입니다.
            정식 요금은 확정 전이며, 파일럿은 대상·기간·운영 범위를 확인한 뒤 별도로
            안내합니다.
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-950">이런 분에게 맞습니다</h2>
        <ul className="mt-5 grid gap-3 leading-7 text-slate-700">
          <li>긴 일기보다 짧은 대화와 시각 표현으로 생각을 정리하고 싶은 분</li>
          <li>그림을 잘 그리지는 못하지만 색·선·장면으로 감정을 표현해보고 싶은 분</li>
          <li>AI가 답을 내려주기보다 내 말을 정리하고 질문해주는 방식을 원하는 분</li>
          <li>비의료 자기성찰·웰니스 경험을 함께 검토할 초기 파일럿 파트너</li>
        </ul>
      </section>

      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-950">명확한 경계</h2>
        <div className="mt-5 grid gap-4 leading-7 text-slate-700">
          <p>
            MINZ MIND는 의료 진단, 심리치료, 정신과 진료, 약물 판단을 제공하지 않습니다.
            그림을 보고 성격이나 질환을 판정하지도 않습니다.
          </p>
          <p>
            개인정보와 민감한 기록은 최소화하고, 장기 기억은 명시적인 승인 없이는
            저장하지 않는 방향으로 설계했습니다. 위기 상황은 상업 대화나 결제 흐름으로
            이어가지 않습니다.
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-2xl bg-slate-950 p-7 text-white sm:p-9">
        <p className="text-sm font-semibold text-teal-300">Early Access</p>
        <h2 className="mt-2 text-2xl font-bold">
          먼저 써보고 싶은 개인·파일럿 파트너의 문의를 받습니다.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">
          현재 단계와 맞지 않는 과장된 판매 문구 대신, 실제 사용 경험과 피드백을 기준으로
          다음 공개 범위를 결정합니다.
        </p>
        <Link
          href="/ko/contact"
          className="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          MINZ MIND 문의하기
        </Link>
      </section>

      <p className="mt-8 text-sm leading-6 text-slate-500">
        이 페이지는 ONURIM 건강정보 편집 콘텐츠와 별개의 Biz2Lab Labs 제품 안내입니다.
      </p>
    </main>
  );
}
