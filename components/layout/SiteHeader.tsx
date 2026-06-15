import Link from "next/link";

import { SearchBox } from "@/components/search/SearchBox";
import { siteSettings } from "@/lib/site-settings";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-1">
          <Link
            href="/ko"
            className="flex min-w-0 items-center gap-2"
            aria-label="Biz2Lab 홈"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-700 text-sm font-bold text-white">
              B2
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold tracking-normal text-slate-950">
                {siteSettings.siteName}
              </span>
              <span className="block text-xs text-slate-500">{siteSettings.koreanName}</span>
            </span>
          </Link>
          <nav
            aria-label="주요 카테고리"
            className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium leading-6 text-slate-700 sm:justify-end lg:justify-start"
          >
            {siteSettings.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="max-w-full rounded-sm transition hover:text-teal-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="w-full min-w-0 lg:w-60 lg:shrink-0">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
