import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "개인정보처리방침",
  description: "Biz2Lab의 문의 정보, 뉴스레터 동의, 쿠키와 분석 도구에 대한 기본 개인정보 안내입니다.",
  path: "/ko/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="text-4xl font-bold tracking-normal text-slate-950">개인정보처리방침</h1>
      <div className="mt-8 grid gap-7 leading-8 text-slate-600">
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">수집 항목</h2>
          <p className="mt-3">
            문의 양식 제출 시 이름, 이메일, 문의 주제, 문의 내용을 수집할 수
            있습니다. 뉴스레터를 운영하는 경우 이메일과 수신 동의 기록을 별도로
            저장할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">이용 목적</h2>
          <p className="mt-3">
            수집 정보는 문의 확인, 답변, 요청한 자료 안내, 서비스 개선을 위한
            최소한의 운영 목적으로 사용합니다. 동의 없이 광고성 메일을 발송하지
            않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">쿠키와 분석</h2>
          <p className="mt-3">
            향후 구글 애널리틱스, 구글 서치 콘솔, 구글 애드센스 같은 도구를 사용할
            수 있습니다. 적용 시 각 도구의 정책과 사이트 고지를 함께 따릅니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">문의</h2>
          <p className="mt-3">
            개인정보 관련 문의는 contact 페이지를 통해 요청할 수 있습니다. 이
            문서는 일반 안내이며 법률 자문을 대체하지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
