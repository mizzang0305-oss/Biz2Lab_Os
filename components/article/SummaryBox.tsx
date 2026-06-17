export function SummaryBox({ summary }: { summary: string }) {
  return (
    <section className="min-w-0 max-w-full rounded-md border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <h2 className="text-base font-semibold text-slate-950">핵심 요약</h2>
      <p className="mt-2 leading-7 text-slate-700">{summary}</p>
    </section>
  );
}
