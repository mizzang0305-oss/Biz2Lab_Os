"use client";

import dynamic from "next/dynamic";
import type { ExperimentSlug } from "@/lib/essays/experiments";

// Keep the calculation implementation in its own chunk, with SSR defaults intact.
const ReadingExperiment = dynamic(() => import("./ReadingExperiment").then(module => module.ReadingExperiment));

export function ReadingExperimentOnDemand({ slug }: { slug: ExperimentSlug }) {
  return <ReadingExperiment slug={slug} />;
}
