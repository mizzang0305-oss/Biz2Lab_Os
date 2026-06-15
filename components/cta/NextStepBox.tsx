import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { PostFrontmatter } from "@/lib/schema";

export function NextStepBox({ nextStep }: { nextStep?: PostFrontmatter["nextStep"] }) {
  if (!nextStep) {
    return null;
  }

  return (
    <section className="min-w-0 max-w-full rounded-md border border-teal-200 bg-white p-5">
      <h2 className="text-lg font-semibold tracking-normal text-slate-950">다음 단계</h2>
      <p className="mt-2 leading-7 text-slate-600">{nextStep.description}</p>
      <Link
        href={nextStep.href}
        className="mt-4 inline-flex max-w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-center text-sm font-semibold leading-6 text-white transition hover:bg-teal-800"
      >
        <span className="min-w-0">{nextStep.label}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </section>
  );
}
