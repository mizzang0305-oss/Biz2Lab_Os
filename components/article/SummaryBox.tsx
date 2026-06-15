export function SummaryBox({ summary }: { summary: string }) {
  return (
    <section className="min-w-0 max-w-full rounded-md border border-teal-200 bg-teal-50 p-5">
      <h2 className="text-base font-semibold text-teal-950">핵심 요약</h2>
      <p className="mt-2 leading-7 text-teal-950">{summary}</p>
    </section>
  );
}
