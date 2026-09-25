import type { Metadata } from "next";

import { CommercialAction } from "@/components/commercial/CommercialActions";
import { CommercialShell } from "@/components/commercial/CommercialShell";
import { commercialServices } from "@/lib/commercial";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "Biz2Lab 서비스 | 업무자동화·홈페이지 제작·MINZ MIND",
  description: "MyBiz 업무자동화, 홈페이지 제작, MINZ MIND의 실제 제공 범위와 준비 상태, 시연·문의 경로를 확인하세요.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <CommercialShell><div className="bg-[#f7faf9] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Biz2Lab Commercial Hub · Preview</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">사업의 다음 행동을 만드는 세 가지 서비스</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">방문자에게 보여줄 화면, 운영 흐름, 스스로를 돌아보는 경험을 각각 준비하고 있습니다. 현재 볼 수 있는 시연과 아직 제공하지 않는 기능을 서비스별로 구분했습니다.</p>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">이 안내는 오누림 건강교육 콘텐츠와 별도입니다. 서비스 도입이나 사전 체험은 각 랜딩의 상태를 확인한 뒤 문의해 주세요.</p>
      </section>
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-950">관심 있는 사업축을 선택하세요</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {Object.values(commercialServices).map((item) => (
              <article key={item.key} className="flex min-w-0 flex-col rounded-3xl border border-slate-200 bg-[#f7faf9] p-6">
                <span className="w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black text-teal-900">{item.status}</span>
                <h3 className="mt-5 text-2xl font-bold text-slate-950">{item.name}</h3>
                <p className="mt-4 leading-7 text-slate-700">{item.value}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600"><strong>대상:</strong> {item.audience}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600"><strong>현재:</strong> {item.available}</p>
                <CommercialAction href={item.href} service={item.key} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-teal-800">{item.demoUrl ? "상세 범위·Demo·문의 보기" : "상세 범위·문의 보기"} →</CommercialAction>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div></CommercialShell>
  );
}
