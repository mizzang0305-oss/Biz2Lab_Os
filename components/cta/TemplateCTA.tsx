import { FileText } from "lucide-react";

import { siteSettings } from "@/lib/site-settings";

export function TemplateCTA({ label }: { label?: string }) {
  if (!label) {
    return null;
  }

  return (
    <section className="min-w-0 max-w-full rounded-md border border-slate-200 bg-slate-950 p-5 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-normal">{label}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {siteSettings.messages.templateCta}
          </p>
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-400 text-slate-950">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
