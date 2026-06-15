import { Download } from "lucide-react";

export function TemplateCTA({ label }: { label?: string }) {
  if (!label) {
    return null;
  }

  return (
    <section className="rounded-md border border-slate-200 bg-slate-950 p-5 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-normal">{label}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            다운로드 시스템은 구글 애드센스 승인 이후 단계로 두고, 현재는 글 안에서
            점검 기준을 먼저 제공합니다.
          </p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber-400 text-slate-950">
          <Download className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
