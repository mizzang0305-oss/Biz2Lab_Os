import Link from "next/link";

import type { Post } from "@/lib/posts";

export function TableOfContents({ headings }: { headings: Post["headings"] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-md border border-slate-200 bg-white p-5">
      <h2 className="text-base font-semibold text-slate-950">목차</h2>
      <ol className="mt-3 grid gap-2 text-sm text-slate-600">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
            <Link href={`#${heading.id}`} className="hover:text-teal-700">
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}

