import Link from "next/link";

import { siteSettings } from "@/lib/site-settings";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#3c3147] bg-[#20162c] text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="text-lg font-black text-white">Biz2Lab PLAY</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
            {siteSettings.footer.description}
          </p>
        </div>
        {siteSettings.footer.sections.map((section) => (
          <div key={section.title} className="min-w-0">
            <p className="text-sm font-bold text-[#ffab91]">{section.title}</p>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-white/55">
              {section.links.map((link) => (
                <Link key={link.href} href={link.href} className="break-words hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#3c3147] px-5 py-4 text-center text-xs text-white/35">
        {siteSettings.footer.copyright}
      </div>
    </footer>
  );
}
