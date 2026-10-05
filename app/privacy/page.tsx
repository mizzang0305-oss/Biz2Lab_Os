import type { Metadata } from "next";
import { knowledgeOrigin } from "@/lib/essays/seo";

const title = "개인정보처리방침 및 광고 안내";
const description = "Biz2Lab 지식 에세이와 MINZ 공개 데모의 분석·광고 상태, 브라우저 저장과 입력, 호스팅 접속 정보를 안내합니다.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Biz2Lab` },
  description,
  alternates: { canonical: `${knowledgeOrigin()}/privacy` },
  openGraph: { title, description, url: `${knowledgeOrigin()}/privacy`, type: "website", siteName: "Biz2Lab", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800 sm:px-6">
      <h1 className="text-3xl font-bold leading-snug text-slate-950">{title}</h1>
      <p className="mt-4 text-sm text-slate-600">업데이트: <time dateTime="2026-10-05">2026-10-05</time></p>
      <aside className="mt-6 rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm leading-7" aria-label="현재 분석·광고 상태">
        <p>현재 지식 에세이와 MINZ 공개 데모는 Google Analytics와 AdSense 스크립트를 불러오지 않습니다. 지식 에세이에는 회원가입, 댓글 접수와 문의 입력 양식이 없습니다. MINZ의 데모 입력과 브라우저 저장은 아래 별도 안내를 확인하세요. 외부 사이트로 이동하면 해당 사이트의 개인정보·쿠키 정책이 적용됩니다.</p>
      </aside>
      <div className="mt-8 space-y-8 text-base leading-8">
        <section aria-labelledby="privacy-scope">
          <h2 id="privacy-scope" className="text-2xl font-bold text-slate-950">현재 사이트의 정보 처리</h2>
          <p className="mt-3">이 안내는 Biz2Lab의 지식 에세이와 MINZ 공개 목록·쇼케이스·갤러리·개발 페이지에 적용됩니다. 지식 에세이에는 회원가입, 뉴스레터 신청, 문의 입력 양식이 없습니다. 원자료·영상의 열람은 연결된 외부 사이트에서 진행합니다.</p>
          <p className="mt-3">페이지에 접속하면 방문 URL, 접속 시각, IP 주소, 브라우저·기기 정보 등이 사이트 제공에 필요한 호스팅 서비스에서 처리될 수 있습니다. 외부 사이트의 처리 항목과 보관 방식은 해당 서비스의 정책과 설정에 따릅니다.</p>
        </section>
        <section aria-labelledby="privacy-minz">
          <h2 id="privacy-minz" className="text-2xl font-bold text-slate-950">MINZ 데모 입력과 브라우저 저장</h2>
          <p className="mt-3">MINZ 공개 쇼케이스의 로그인·가입·비밀번호 화면은 입력 형식과 화면 전환을 보여 주는 데모입니다. 입력은 화면 상태에서 처리되며 서버로 전송하거나 계정을 만들지 않습니다. 실제 이메일이나 비밀번호 대신 예시 값을 사용하세요.</p>
          <p className="mt-3">MINZ 개발 페이지는 프로젝트 초안을 이 브라우저의 localStorage에 자동 저장합니다. 저장 키는 <code>minz-design-project-v5</code>이며, 다음 방문에서 초안을 다시 불러옵니다. 브라우저 설정에서 이 사이트의 저장 데이터를 지울 수 있습니다. 프로젝트 입력·미리보기·파일 생성은 브라우저에서 처리되며, 페이지와 공개 자료를 불러오는 접속 정보는 위 호스팅 안내에 해당합니다.</p>
          <p className="mt-3">MINZ의 문의 링크는 외부 GitHub Issue 작성 화면으로 이동합니다. 데모 폼이 문의를 대신 전송하지 않습니다. 외부 채널에 직접 작성하는 내용에는 해당 서비스의 공개 범위와 개인정보 정책이 적용됩니다.</p>
        </section>
        <section aria-labelledby="privacy-analytics">
          <h2 id="privacy-analytics" className="text-2xl font-bold text-slate-950">Google Analytics</h2>
          <p className="mt-3">현재 이 사이트는 Google Analytics 코드를 불러오지 않으며, 해당 스크립트를 통한 방문 측정을 수행하지 않습니다.</p>
          <p className="mt-3">Google의 정보 이용 방식과 이용자 선택은 <a className="font-semibold text-teal-800 underline underline-offset-4" href="https://policies.google.com/technologies/partner-sites?hl=ko" target="_blank" rel="noopener noreferrer">Google 파트너 사이트 개인정보 안내 (새 창)</a>에서 확인할 수 있습니다.</p>
        </section>
        <section aria-labelledby="privacy-advertising">
          <h2 id="privacy-advertising" className="text-2xl font-bold text-slate-950">Google AdSense와 광고 쿠키</h2>
          <p className="mt-3">현재 이 사이트는 Google AdSense 광고 스크립트를 실행하지 않습니다. AdSense 광고 승인이나 심사 제출을 완료했다고 표시하지 않습니다.</p>
          <p className="mt-3">Google 광고를 사용하는 외부 사이트에서는 Google과 제3자 광고 공급업체가 쿠키를 사용해 이전 방문 기록을 바탕으로 광고를 제공할 수 있습니다. 외부 사이트로 이동할 때에는 그 사이트의 광고·쿠키 안내를 확인하세요.</p>
        </section>
        <section aria-labelledby="privacy-choices">
          <h2 id="privacy-choices" className="text-2xl font-bold text-slate-950">쿠키와 개인 맞춤 광고 선택</h2>
          <p className="mt-3">브라우저 설정에서 쿠키를 삭제하거나 차단할 수 있습니다. 쿠키 차단만으로 모든 외부 서비스의 정보 처리가 중단되는 것은 아닙니다. 개인 맞춤 광고는 <a className="font-semibold text-teal-800 underline underline-offset-4" href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google 광고 설정 (새 창)</a>에서 관리하거나 거부할 수 있습니다.</p>
          <p className="mt-3">Analytics 이용을 제한하는 방법은 <a className="font-semibold text-teal-800 underline underline-offset-4" href="https://tools.google.com/dlpage/gaoptout?hl=ko" target="_blank" rel="noopener noreferrer">Google Analytics 차단 브라우저 부가 기능 안내 (새 창)</a>를 확인하세요. 지원되는 브라우저와 기능 범위는 Google 안내에 따릅니다.</p>
        </section>
        <section aria-labelledby="privacy-external">
          <h2 id="privacy-external" className="text-2xl font-bold text-slate-950">외부 서비스와 링크</h2>
          <p className="mt-3">원자료·영상 링크를 누르면 외부 사이트로 이동합니다. 외부 사이트에서의 정보 처리는 해당 서비스의 정책과 설정에 따르며, 이용 전 해당 사이트의 개인정보 및 광고 안내를 확인하세요.</p>
        </section>
      </div>
    </article>
  );
}
