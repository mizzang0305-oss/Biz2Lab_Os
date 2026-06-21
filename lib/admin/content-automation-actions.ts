import type { AdminSchedulerActionResult } from "@/lib/admin/content-automation-service";

export async function runAdminSchedulerDryRun(options: {
  topic?: string;
  forceCheck?: boolean;
  cadenceMinutes?: number;
} = {}): Promise<AdminSchedulerActionResult> {
  const logs: string[] = [];
  try {
    const { runContentSeriesScheduler } = await import("@/scripts/content-series-scheduler-runner");
    const result = await runContentSeriesScheduler(
      {
        dryRun: true,
        forceCheck: options.forceCheck,
        cadenceMinutes: options.cadenceMinutes,
        topic: options.topic,
        useLatestCodexArtifact: true,
      },
      {
        log: (message) => logs.push(message),
      },
    );
    return {
      ok: true,
      status: result.status,
      result,
      logs,
    };
  } catch (error) {
    const maybeCode = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    return {
      ok: false,
      status: maybeCode || "SCHEDULER_DRY_RUN_FAILED",
      message: error instanceof Error ? error.message : "Scheduler dry-run failed",
      logs,
    };
  }
}

export async function runSelectedTopicPlanOnly(topic: string): Promise<AdminSchedulerActionResult> {
  const dryRun = await runAdminSchedulerDryRun({ topic, forceCheck: true });
  return {
    ok: true,
    status: "WEB_PUBLICATION_DISABLED",
    message:
      "The web admin console is plan-only for publication. It never publishes, commits, creates PRs, merges, or deploys. Use the local Windows Task Scheduler or CLI after dry-run gates pass.",
    result: dryRun.result,
    logs: dryRun.logs,
  };
}
