import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { PostFrontmatter } from "@/lib/schema";

export function NextStepBox({ nextStep }: { nextStep?: PostFrontmatter["nextStep"] }) {
  if (!nextStep) {
    return null;
  }

  return (
    <section className="rounded-md border border-teal-200 bg-white p-5">
      <h2 className="text-lg font-semibold tracking-normal text-slate-950">다음 단계</h2>
      <p className="mt-2 leading-7 text-slate-600">{nextStep.description}</p>
      <Link
        href={nextStep.href}
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
      >
        {nextStep.label} <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

