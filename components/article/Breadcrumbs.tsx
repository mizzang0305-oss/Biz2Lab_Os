import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-full text-sm leading-6 text-slate-500">
      <ol className="flex min-w-0 flex-wrap items-center gap-2">
        <li className="shrink-0">
          <Link href="/ko" className="hover:text-teal-700">
            홈
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex min-w-0 items-center gap-2">
            <span aria-hidden="true" className="shrink-0">
              /
            </span>
            <Link href={item.href} className="min-w-0 break-words hover:text-teal-700">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
