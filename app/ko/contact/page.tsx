import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "문의",
  description: "Biz2Lab 콘텐츠, 업무 자동화, 운영 시스템 정리에 대해 문의할 수 있습니다.",
  path: "/ko/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="text-4xl font-bold tracking-normal text-slate-950">문의하기</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        반복 업무, 매출 관리, 주문 흐름, 계약·결제 상태 정리에 대해 문의할 수
        있습니다. 로그인은 필요하지 않습니다.
      </p>
      <form action="/api/contact" method="post" className="mt-8 grid gap-5 rounded-md border border-slate-200 bg-white p-6">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-800">
            이름
          </label>
          <input id="name" name="name" required className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-800">
            이메일
          </label>
          <input id="email" name="email" type="email" required className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="topic" className="text-sm font-semibold text-slate-800">
            문의 주제
          </label>
          <input id="topic" name="topic" required className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-slate-800">
            문의 내용
          </label>
          <textarea id="message" name="message" required rows={7} className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
        </div>
        <p className="text-sm leading-6 text-slate-500">
          제출된 정보는 문의 확인과 답변 목적으로만 사용합니다. 뉴스레터 수신은
          별도 동의가 있을 때만 처리합니다.
        </p>
        <button type="submit" className="inline-flex w-fit items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800">
          문의 보내기
        </button>
      </form>
    </div>
  );
}

