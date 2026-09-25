import Link from "next/link";

import { CommercialAction, ServiceView } from "@/components/commercial/CommercialActions";
import { CommercialForms } from "@/components/commercial/CommercialForms";
import { CommercialShell } from "@/components/commercial/CommercialShell";
import { commercialServices, type CommercialService } from "@/lib/commercial";

const button = "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-teal-800 sm:w-auto";

export function ServiceLanding({ service }: { service: CommercialService }) {
  const item = commercialServices[service];
  return (
    <CommercialShell>
    <div className="bg-[#f7faf9] text-slate-900">
      <ServiceView service={service} />
      <div className="border-b border-teal-100 bg-white px-4 py-3 text-center text-xs font-semibold text-slate-600">
        Biz2Lab 서비스 안내 · <Link href="/services" className="inline-flex min-h-11 items-center text-teal-700 underline">3개 사업축 보기</Link> · 오누림 건강정보와 별도 운영 범위
      </div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:py-24">
        <div className="min-w-0">
          <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black tracking-wide text-teal-900">{item.status} · 제공 범위 확인 중</span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">{item.name}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">{item.value}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CommercialAction href="#inquiry" service={service} className={button}>제공 범위 문의</CommercialAction>
            {item.demoUrl ? <CommercialAction href={item.demoUrl} service={service} demo className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 transition hover:border-teal-700 sm:w-auto">{item.demoLabel} ↗</CommercialAction> : null}
          </div>
        </div>
        <aside className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">Current scope</p>
          <h2 className="mt-3 text-2xl font-bold">지금 확인할 수 있는 것</h2>
          <p className="mt-4 leading-7 text-slate-700">{item.available}</p>
          <p className="mt-5 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">{item.boundary}</p>
        </aside>
      </section>
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-6"><p className="text-sm font-bold text-teal-700">대상 고객</p><h2 className="mt-3 text-2xl font-bold">누구를 위한 서비스인가</h2><p className="mt-3 leading-7 text-slate-700">{item.audience}</p></div>
          <div className="rounded-2xl bg-slate-50 p-6"><p className="text-sm font-bold text-teal-700">해결할 문제</p><h2 className="mt-3 text-2xl font-bold">어떤 불편을 줄이는가</h2><p className="mt-3 leading-7 text-slate-700">{item.problem}</p></div>
        </div>
      </section>
      <section id="demo" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">Demo & availability</p>
        <h2 className="mt-3 text-3xl font-bold">실제로 볼 수 있는 화면과 현재 단계</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">{item.available}</p>
        {item.demoUrl ? <CommercialAction href={item.demoUrl} service={service} demo className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl border border-teal-700 bg-white px-5 py-3 text-sm font-bold text-teal-900">{item.demoLabel} ↗</CommercialAction> : <p className="mt-6 inline-flex rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">공개 Demo 준비 중 · 가짜 화면을 시연으로 표시하지 않습니다.</p>}
      </section>
      <CommercialForms service={service} />
    </div>
    </CommercialShell>
  );
}
