import { Play } from "lucide-react";
import Link from "next/link";

import { siteSettings } from "@/lib/site-settings";

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b border-[#eee8e2] bg-[#fffdf9]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/ko" className="flex min-w-0 items-center gap-3" aria-label="Biz2Lab PLAY 홈">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ef5b3f] text-white shadow-sm">
            <Play className="h-4 w-4 fill-current" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-black tracking-[-0.02em] text-[#20162c]">
              Biz2Lab PLAY
            </span>
            <span className="block text-[11px] font-medium text-[#817687]">
              {siteSettings.brandSubtitle}
            </span>
          </span>
        </Link>
        <nav
          aria-label="주요 카테고리"
          className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1 text-sm font-bold text-[#5f5666]"
        >
          {siteSettings.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-[#ffe8df] hover:text-[#d6422d]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
