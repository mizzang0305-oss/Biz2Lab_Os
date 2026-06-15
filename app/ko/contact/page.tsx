import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "문의",
  description: "Biz2Lab 콘텐츠, 업무 자동화, 운영 시스템 정리에 대해 문의할 수 있습니다.",
  path: "/ko/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">문의하기</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        반복 업무, 매출 관리, 주문 흐름, 계약·결제 상태 정리에 대해 문의할 수
        있습니다. 로그인은 필요하지 않습니다.
      </p>
      <ContactForm />
    </div>
  );
}
