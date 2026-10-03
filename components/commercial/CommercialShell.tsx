import Link from "next/link";

import { CommercialAttributionCapture } from "@/components/commercial/CommercialActions";

export function CommercialShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="commercial-shell">
      <CommercialAttributionCapture />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/services" className="inline-flex min-h-11 items-center text-lg font-black tracking-tight text-slate-950">Biz2Lab <span className="ml-1 text-teal-700">Services</span></Link>
          <nav aria-label="Biz2Lab 서비스" className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-700">
            <Link href="/mybiz" className="inline-flex min-h-11 items-center hover:text-teal-700">MyBiz</Link>
            <Link href="/web" className="inline-flex min-h-11 items-center hover:text-teal-700">홈페이지 제작</Link>
            <Link href="/minz-mind" className="inline-flex min-h-11 items-center hover:text-teal-700">MINZ MIND</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-200">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 px-4 py-8 text-sm sm:px-6">
          <div><p className="font-bold text-white">Biz2Lab Services</p><p className="mt-2 max-w-xl text-slate-400">제공 범위와 준비 상태를 확인하고 다음 단계를 문의하세요. 오누림 건강정보와는 별도 안내입니다.</p></div>
          <div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/services/privacy" className="inline-flex min-h-11 items-center hover:text-white">문의 정보 안내</Link><Link href="/" className="inline-flex min-h-11 items-center hover:text-white">오누림 건강정보</Link></div>
        </div>
      </footer>
    </div>
  );
}
