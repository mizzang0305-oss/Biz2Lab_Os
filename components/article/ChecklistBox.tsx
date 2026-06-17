export function ChecklistBox({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="min-w-0 max-w-full rounded-md border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="text-base font-semibold text-slate-950">현장 체크리스트</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex min-w-0 gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
