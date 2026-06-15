import Link from "next/link";

import type { Post } from "@/lib/posts";

export function TableOfContents({ headings }: { headings: Post["headings"] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="min-w-0 max-w-full rounded-md border border-slate-200 bg-white p-5">
      <h2 className="text-base font-semibold text-slate-950">목차</h2>
      <ol className="mt-3 grid gap-2 text-sm text-slate-600">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "min-w-0 pl-4" : "min-w-0"}>
            <Link href={`#${heading.id}`} className="break-words hover:text-teal-700">
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
