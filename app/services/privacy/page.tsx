import type { Metadata } from "next";
import Link from "next/link";

import { CommercialShell } from "@/components/commercial/CommercialShell";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "Biz2Lab 서비스 문의 개인정보 안내",
  description: "Biz2Lab 서비스 문의와 이메일 신청의 수집 항목, 이용 목적, 보관 기간과 삭제 요청 방법을 안내합니다.",
  path: "/services/privacy",
});

export default function CommercialPrivacyPage() {
  return (
    <CommercialShell><article className="mx-auto max-w-3xl px-4 py-14 text-slate-800 sm:px-6">
      <p className="text-sm font-bold text-teal-700">Biz2Lab Commercial Hub</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">서비스 문의 개인정보 안내</h1>
      <h2 className="mt-8 text-xl font-bold">수집 항목과 목적</h2>
      <p className="mt-3 leading-7">서비스 문의에는 이름, 이메일, 문의 내용, 선택 서비스, 유입 경로, 접속한 서비스 경로, 동의 시각을 사용합니다. 이메일 신청에는 이메일, 선택 서비스, 유입 경로, 접속한 서비스 경로, 동의 시각을 사용합니다. UTM 정보가 있으면 함께 저장합니다.</p>
      <p className="mt-3 leading-7">문의 정보는 선택한 서비스의 상담과 답변에, 이메일 신청 정보는 별도로 동의한 해당 서비스의 후속 안내에 사용합니다. 이메일 신청은 광고성 뉴스레터 동의가 아닙니다. 저장이 확인된 경우에만 접수 완료로 표시합니다.</p>
      <h2 className="mt-8 text-xl font-bold">보관과 운영</h2>
      <p className="mt-3 leading-7">계약 전 단순 문의와 이메일 신청 정보는 생성 시각부터 90일 보관한 뒤 삭제 대상으로 검토합니다. 계약 또는 법적 보존 의무가 별도로 확인된 경우에는 해당 사유를 우선 확인합니다. 초기에는 지정 운영자 1명이 개인 인증 계정으로 접근하고, 공유 계정이나 공개 조회 권한을 사용하지 않습니다.</p>
      <h2 className="mt-8 text-xl font-bold">삭제 요청</h2>
      <p className="mt-3 leading-7">본인이 제출한 문의 또는 이메일 신청 정보의 삭제를 요청하려면 <a href="mailto:mizzang0305@gmail.com" className="font-semibold text-teal-700 underline">mizzang0305@gmail.com</a>으로 비공개 이메일을 보내 주세요. 제출한 이메일 주소와 요청 종류를 알려주시면 확인 후 처리합니다. 신분증, 비밀번호, API 키 등 민감한 자료를 첫 메일에 첨부하지 마세요. 공개 GitHub Issues에는 삭제 요청이나 개인정보를 올리지 마세요.</p>
      <h2 className="mt-8 text-xl font-bold">입력 금지 정보</h2>
      <p className="mt-3 leading-7">건강정보, 결제정보, 고객 명단, 비밀번호, API 키, 토큰, private key 또는 credential 파일 내용을 제출하지 마세요. 명백한 비밀정보 패턴은 서버가 저장 전에 거부합니다.</p>
      <Link href="/services" className="mt-8 inline-flex min-h-11 items-center font-semibold text-teal-700 underline">서비스 목록으로 돌아가기</Link>
    </article></CommercialShell>
  );
}
