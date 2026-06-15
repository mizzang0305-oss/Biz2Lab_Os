import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Category } from "@/lib/categories";

export function CategoryHubCard({ category }: { category: Category }) {
  return (
    <article className="min-w-0 max-w-full rounded-md border border-slate-200 bg-white p-5 transition hover:border-teal-300 hover:shadow-sm">
      <h3 className="text-lg font-semibold tracking-normal text-slate-950">{category.name}</h3>
      <p className="mt-2 min-h-18 text-sm leading-6 text-slate-600">{category.description}</p>
      <Link
        href={`/ko/${category.slug}`}
        className="mt-4 inline-flex max-w-full items-center gap-2 text-sm font-semibold leading-6 text-teal-700"
      >
        허브 보기 <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </article>
  );
}
