import Link from "next/link";

import { categoryList } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { SearchBox } from "@/components/search/SearchBox";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/ko" className="flex items-center gap-2" aria-label="Biz2Lab 홈">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-700 text-sm font-bold text-white">
              B2
            </span>
            <span>
              <span className="block text-base font-semibold tracking-normal text-slate-950">
                {siteConfig.name}
              </span>
              <span className="block text-xs text-slate-500">{siteConfig.koreanName}</span>
            </span>
          </Link>
        </div>
        <nav
          aria-label="주요 카테고리"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-700"
        >
          {categoryList.map((category) => (
            <Link
              key={category.slug}
              href={`/ko/${category.slug}`}
              className="transition hover:text-teal-700"
            >
              {category.name}
            </Link>
          ))}
          <Link href="/ko/about" className="transition hover:text-teal-700">
            소개
          </Link>
          <Link href="/ko/contact" className="transition hover:text-teal-700">
            문의
          </Link>
        </nav>
        <SearchBox />
      </div>
    </header>
  );
}

