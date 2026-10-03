import type { Metadata } from "next";
import Link from "next/link";

import { CommercialShell } from "@/components/commercial/CommercialShell";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "Biz2Lab 서비스 문의 정보 안내",
  description: "Biz2Lab 서비스 문의와 이메일 신청에 필요한 정보, 처리 목적, 현재 접수 준비 상태를 안내합니다.",
  path: "/services/privacy",
});

export default function CommercialPrivacyPage() {
  return (
    <CommercialShell><article className="mx-auto max-w-3xl px-4 py-14 text-slate-800 sm:px-6">
      <p className="text-sm font-bold text-teal-700">Commercial Hub · Preview</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">서비스 문의 정보 안내</h1>
      <p className="mt-5 leading-7">문의 폼은 이름·이메일·문의 내용·선택 서비스·유입 경로를, 이메일 신청은 이메일·선택 서비스·유입 경로를 제출합니다. UTM 정보가 있으면 유입 분석을 위해 함께 전송합니다.</p>
      <h2 className="mt-8 text-xl font-bold">사용 목적과 현재 상태</h2>
      <p className="mt-3 leading-7">정보는 선택 서비스의 문의 답변 또는 별도로 동의한 후속 안내에만 사용하도록 설계했습니다. 건강정보·결제정보·고객 명단과 비밀번호·API key·token·private key·credential file을 받지 않습니다. 현재 저장·운영자 조회·보관 및 삭제 절차의 Production 검증이 끝나지 않아 접수 기능은 기본 비활성입니다. 저장 확인에 실패하면 접수 완료로 표시하지 않습니다.</p>
      <h2 className="mt-8 text-xl font-bold">공개 전 확인할 운영 정보</h2>
      <p className="mt-3 leading-7">실제 수집을 켜기 전 운영자, 저장 위치, 보관 기간, 삭제 요청 경로, 스팸 대응과 접근 권한을 확정하고 이 안내를 갱신해야 합니다. 현재 이 페이지는 운영 정책 확정본이 아닙니다.</p>
      <Link href="/services" className="mt-8 inline-flex min-h-11 items-center font-semibold text-teal-700 underline">서비스 목록으로 돌아가기</Link>
    </article></CommercialShell>
  );
}
