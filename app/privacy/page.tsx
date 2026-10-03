import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

const title = "개인정보처리방침 및 광고 안내";
const description = "Biz2Lab의 현재 사이트에서 사용하는 Google Analytics, AdSense, 쿠키와 외부 링크를 안내합니다.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Biz2Lab` },
  description,
  alternates: { canonical: absoluteUrl("/privacy") },
  openGraph: { title, description, url: absoluteUrl("/privacy"), type: "website", siteName: "Biz2Lab", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800 sm:px-6">
      <h1 className="text-3xl font-bold leading-snug text-slate-950">{title}</h1>
      <p className="mt-4 text-sm text-slate-600">업데이트: <time dateTime="2026-10-03">2026-10-03</time></p>
      <div className="mt-8 space-y-8 text-base leading-8">
        <section aria-labelledby="privacy-scope">
          <h2 id="privacy-scope" className="text-2xl font-bold text-slate-950">현재 사이트의 정보 처리</h2>
          <p className="mt-3">이 안내는 즐거운 용돈벌이와 생활용품 페이지에 적용됩니다. 이 공개 페이지에는 회원가입, 뉴스레터 신청, 문의 입력 양식이 없습니다. 용돈벌이 서비스의 가입·신청과 상품 구매는 연결된 외부 사이트에서 진행합니다.</p>
          <p className="mt-3">페이지에 접속하면 방문 URL, 접속 시각, IP 주소, 브라우저·기기 정보 등이 사이트 제공에 필요한 호스팅 서비스 또는 아래 분석·광고 서비스에서 처리될 수 있습니다. 외부 서비스의 처리 항목과 보관 방식은 해당 서비스의 설정과 정책에 따릅니다.</p>
        </section>
        <section aria-labelledby="privacy-analytics">
          <h2 id="privacy-analytics" className="text-2xl font-bold text-slate-950">Google Analytics</h2>
          <p className="mt-3">운영 사이트는 방문 흐름과 콘텐츠 이용을 파악하기 위해 Google Analytics 코드를 불러옵니다. Google은 쿠키와 유사한 기술을 통해 페이지 조회, 브라우저·기기 정보 등 이용 정보를 처리할 수 있습니다.</p>
          <p className="mt-3">Google의 정보 이용 방식과 이용자 선택은 <a className="font-semibold text-teal-800 underline underline-offset-4" href="https://policies.google.com/technologies/partner-sites?hl=ko" target="_blank" rel="noopener noreferrer">Google 파트너 사이트 개인정보 안내 (새 창)</a>에서 확인할 수 있습니다.</p>
        </section>
        <section aria-labelledby="privacy-advertising">
          <h2 id="privacy-advertising" className="text-2xl font-bold text-slate-950">Google AdSense와 광고 쿠키</h2>
          <p className="mt-3">운영 사이트에는 Google AdSense 클라이언트 코드가 포함되어 있습니다. 코드가 포함된 사실이 광고 승인이나 광고의 실제 표시를 뜻하지는 않습니다.</p>
          <p className="mt-3">Google과 제3자 광고 공급업체는 쿠키를 사용해 이 사이트 또는 다른 사이트의 이전 방문 기록을 바탕으로 광고를 제공할 수 있습니다. Google 광고 쿠키는 Google과 파트너가 이러한 방문 기록에 따른 개인 맞춤 광고를 제공하는 데 사용될 수 있습니다.</p>
        </section>
        <section aria-labelledby="privacy-choices">
          <h2 id="privacy-choices" className="text-2xl font-bold text-slate-950">쿠키와 개인 맞춤 광고 선택</h2>
          <p className="mt-3">브라우저 설정에서 쿠키를 삭제하거나 차단할 수 있습니다. 쿠키 차단만으로 모든 외부 서비스의 정보 처리가 중단되는 것은 아닙니다. 개인 맞춤 광고는 <a className="font-semibold text-teal-800 underline underline-offset-4" href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google 광고 설정 (새 창)</a>에서 관리하거나 거부할 수 있습니다.</p>
          <p className="mt-3">Analytics 이용을 제한하는 방법은 <a className="font-semibold text-teal-800 underline underline-offset-4" href="https://tools.google.com/dlpage/gaoptout?hl=ko" target="_blank" rel="noopener noreferrer">Google Analytics 차단 브라우저 부가 기능 안내 (새 창)</a>를 확인하세요. 지원되는 브라우저와 기능 범위는 Google 안내에 따릅니다.</p>
        </section>
        <section aria-labelledby="privacy-external">
          <h2 id="privacy-external" className="text-2xl font-bold text-slate-950">외부 서비스와 제휴 링크</h2>
          <p className="mt-3">공식 서비스·자료와 상품 링크를 누르면 외부 사이트로 이동합니다. 외부 사이트의 가입 정보, 신청 정보, 구매·결제 정보는 해당 서비스에서 처리하며, 이용 전 해당 사이트의 개인정보 및 광고 안내를 확인하세요.</p>
          <p className="mt-3">생활용품의 쿠팡 파트너스 제휴 링크는 해당 글에서 표시합니다. 그 링크를 통한 구매에 따라 일정액의 수수료를 제공받을 수 있으며, 해당 글의 제휴 고지와 판매 페이지의 조건을 함께 확인하세요.</p>
        </section>
      </div>
    </article>
  );
}
