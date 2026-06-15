import Link from "next/link";

import { categoryList } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            소상공인, 영업팀, 1인 사업자가 반복 업무와 운영 지표를 정리할 수
            있도록 실전형 AI 자동화 글을 제공합니다.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">카테고리</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            {categoryList.map((category) => (
              <Link key={category.slug} href={`/ko/${category.slug}`} className="hover:text-white">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">정책</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/ko/about" className="hover:text-white">
              소개
            </Link>
            <Link href="/ko/contact" className="hover:text-white">
              문의
            </Link>
            <Link href="/ko/privacy" className="hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/ko/terms" className="hover:text-white">
              이용약관
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-5 py-4 text-center text-xs text-slate-500">
        © 2026 Biz2Lab. 한국어 최소 공개 버전입니다.
      </div>
    </footer>
  );
}
