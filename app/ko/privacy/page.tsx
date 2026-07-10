import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "개인정보처리방침",
  description: "Biz2Lab의 문의 정보, Google Analytics, AdSense 연결 코드, 광고 쿠키와 이용자 선택권을 안내합니다.",
  path: "/ko/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">개인정보처리방침</h1>
      <p className="mt-4 text-sm text-slate-500">시행일: 2026-07-10</p>
      <div className="mt-8 grid gap-7 leading-8 text-slate-600">
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">처리하는 정보</h2>
          <p className="mt-3">
            현재 공개 문의는 GitHub Issues를 이용합니다. 이 채널을 이용하면 GitHub 계정 정보와
            이용자가 공개한 문의 내용이 GitHub 정책에 따라 처리될 수 있습니다. 사이트 접속 과정에서는
            브라우저 종류, 기기 정보, 접속 시각, 페이지 주소, 참조 URL, IP 주소에서 파생된 지역 정보와
            같은 기술 정보가 서버 또는 분석 서비스에 기록될 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">이용 목적</h2>
          <p className="mt-3">
            처리 정보는 문의 확인과 답변, 오류 대응, 사이트 보안, 콘텐츠 이용 흐름 개선을 위해 사용합니다.
            별도 동의 없이 광고성 이메일을 발송하거나 문의 내용을 판매하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">Google Analytics</h2>
          <p className="mt-3">
            Biz2Lab은 실제 방문 흐름과 페이지 오류를 파악하기 위해 Google Analytics를 사용합니다.
            Google은 쿠키 또는 유사 기술을 통해 페이지 조회, 기기·브라우저 정보와 같은 이용 정보를
            처리할 수 있습니다. 수집 범위와 보관 방식은 Biz2Lab의 Analytics 설정과 Google 정책을 따릅니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">Google AdSense와 광고 쿠키</h2>
          <p className="mt-3">
            사이트 연결과 광고 게재 가능 여부 확인을 위해 Google AdSense 클라이언트 코드가 포함되어 있습니다.
            Google 또는 다른 제3자 광고 사업자는 광고가 활성화된 페이지에서 쿠키, 웹 비콘, IP 주소 또는
            기타 식별자를 사용해 광고를 제공하고 성과를 측정할 수 있습니다. Google의 광고 쿠키는 이용자가
            이 사이트나 다른 사이트를 방문한 기록을 바탕으로 광고를 제공하는 데 사용될 수 있습니다.
          </p>
          <p className="mt-3">
            이용자는{" "}
            <a className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="https://adssettings.google.com/" rel="noopener noreferrer" target="_blank">
              Google 광고 설정
            </a>
            에서 맞춤 광고를 관리할 수 있습니다. Google이 파트너 사이트의 정보를 처리하는 방식은{" "}
            <a className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="https://policies.google.com/technologies/partner-sites?hl=ko" rel="noopener noreferrer" target="_blank">
              Google 파트너 사이트 데이터 안내
            </a>
            에서 확인할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">쿠키 선택과 차단</h2>
          <p className="mt-3">
            브라우저 설정에서 쿠키를 삭제하거나 차단할 수 있습니다. 쿠키를 차단하면 일부 분석 또는 외부 서비스가
            예상대로 작동하지 않을 수 있습니다. 맞춤 광고 선택은 위 Google 광고 설정에서 별도로 관리합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">외부 처리와 보관</h2>
          <p className="mt-3">
            분석과 광고 연결에는 Google의 인프라가 사용되고, 공개 문의에는 GitHub의 인프라가 사용됩니다.
            각 사업자는 자체 정책과 운영 설정에 따라 정보를 처리하며, 처리 지역과 보관 기간은 서비스 설정에 따라
            달라질 수 있습니다. Biz2Lab은 목적 달성에 필요한 기간만 정보를 유지하고, 삭제 요청이나 법적 의무가
            있으면 해당 기준에 따라 처리합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">이용자 요청과 문의</h2>
          <p className="mt-3">
            공개 콘텐츠에 포함된 본인 정보의 열람, 정정 또는 삭제 요청은{" "}
            <Link className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="/ko/contact">
              문의 페이지
            </Link>
            의 안내를 이용해 주세요. 공개 문의 채널에는 주민등록번호, 결제정보, 계약 원문과 같은 민감 정보를 올리면 안 됩니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">방침 변경</h2>
          <p className="mt-3">
            사용하는 서비스나 처리 범위가 달라지면 이 문서의 시행일과 내용을 갱신합니다.
            작성 기준은{" "}
            <a className="font-semibold text-teal-700 underline-offset-4 hover:underline" href="https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS217&mCode=&nttId=12018" rel="noopener noreferrer" target="_blank">
              개인정보보호위원회 처리방침 작성지침 안내
            </a>
            를 함께 참고합니다. 이 문서는 사이트 운영에 관한 일반 안내이며 개별 사안의 법률 자문을 대체하지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
