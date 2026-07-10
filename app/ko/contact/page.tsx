import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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
        공개 글의 오류 제보, 출처 수정 요청, 업무 자동화 콘텐츠에 대한 질문을 받습니다.
        현재 문의는 Biz2Lab 공개 GitHub 저장소의 Issue 채널에서 처리합니다.
      </p>

      <section className="mt-10 border-y border-slate-200 py-8">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">문의 전에 확인해 주세요</h2>
        <ul className="mt-5 grid gap-3 leading-7 text-slate-700">
          <li>문제가 있는 글의 URL과 수정이 필요한 문장을 함께 적어 주세요.</li>
          <li>도구 기능이나 라이선스 제보에는 확인한 공식 문서 링크를 포함해 주세요.</li>
          <li>공개 채널이므로 고객명, 전화번호, 계약 원문, 결제정보, API 키와 같은 민감 정보는 올리지 마세요.</li>
        </ul>
        <a
          href="https://github.com/mizzang0305-oss/Biz2Lab_Os/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex max-w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          GitHub에서 문의 작성
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">개인정보 관련 요청</h2>
        <p className="mt-4 leading-7 text-slate-600">
          공개 콘텐츠에 포함된 본인 정보의 열람·정정·삭제 제보는 Issue에 대상 URL만 적어 주세요.
          본인 확인처럼 비공개 정보가 필요한 요청은{" "}
          <a
            className="font-semibold text-teal-700 underline-offset-4 hover:underline"
            href="https://github.com/mizzang0305-oss"
            target="_blank"
            rel="noopener noreferrer"
          >
            운영자 GitHub 프로필의 공개 연락처
          </a>
          를 이용해야 합니다. 요청 전에{" "}
          <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/privacy">
            개인정보처리방침
          </Link>
          을 확인하고, 공개 Issue 본문에는 본인 확인 자료나 민감 정보를 첨부하지 마세요.
        </p>
      </section>
    </div>
  );
}
