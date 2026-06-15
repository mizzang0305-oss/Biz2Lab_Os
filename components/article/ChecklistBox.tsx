export function ChecklistBox({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-md border border-amber-200 bg-amber-50 p-5">
      <h2 className="text-base font-semibold text-amber-950">현장 체크리스트</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-950">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

