"use client";

import {
  Activity,
  AlertTriangle,
  Clock3,
  ListChecks,
  LockKeyhole,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

import type {
  AdminAutomationStatus,
  AdminLogEntry,
  AdminSchedulerActionResult,
} from "@/lib/admin/content-automation-service";

type ApiResult<T> = {
  ok: boolean;
  error?: string;
} & T;

const apiBase = "/api/admin/content-automation";

function ValueLine({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4 border-b border-slate-200 py-2 last:border-b-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="min-w-0 text-right text-sm font-semibold text-slate-950">{value ?? "not recorded"}</span>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const tone = value.includes("published") || value.includes("READY") || value.includes("enabled")
    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
    : value.includes("waiting") || value.includes("DISABLED") || value.includes("BLOCK")
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${tone}`}>
      {value}
    </span>
  );
}

function ActionButton({
  children,
  disabled,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary: "bg-teal-700 text-white hover:bg-teal-800 disabled:bg-slate-300",
    secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 disabled:text-slate-400",
    danger: "border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 disabled:text-slate-400",
  }[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </button>
  );
}

export function ContentAutomationConsole() {
  const [adminToken, setAdminToken] = useState("");
  const [status, setStatus] = useState<AdminAutomationStatus | null>(null);
  const [logs, setLogs] = useState<AdminLogEntry[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("node-red-local-business-automation-server");
  const [lastAction, setLastAction] = useState<AdminSchedulerActionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const authenticated = useMemo(() => adminToken.trim().length > 0, [adminToken]);

  async function request<T>(path: string, init?: RequestInit) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`${apiBase}${path}`, {
        ...init,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${adminToken}`,
          ...(init?.headers ?? {}),
        },
      });
      const payload = (await response.json()) as ApiResult<T>;
      if (!response.ok || payload.ok === false) {
        throw new Error(payload.error ?? `HTTP_${response.status}`);
      }
      return payload;
    } finally {
      setBusy(false);
    }
  }

  async function refresh() {
    try {
      const [statusPayload, logPayload] = await Promise.all([
        request<{ status: AdminAutomationStatus }>("/status"),
        request<{ logs: AdminLogEntry[] }>("/logs"),
      ]);
      setStatus(statusPayload.status);
      setLogs(logPayload.logs);
      setSelectedTopic(statusPayload.status.nextEligibleTopic?.slug ?? statusPayload.status.queue[0]?.slug ?? "");
      setLastAction(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "ADMIN_REQUEST_FAILED");
    }
  }

  async function runDryRun(forceCheck = false) {
    try {
      const payload = await request<{ action: AdminSchedulerActionResult }>("/dry-run", {
        method: "POST",
        body: JSON.stringify({ forceCheck }),
      });
      setLastAction(payload.action);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "DRY_RUN_FAILED");
    }
  }

  async function runTopic() {
    if (!window.confirm("Run selected topic in plan-only mode? This will not publish, commit, merge, or deploy.")) {
      return;
    }
    try {
      const payload = await request<{ action: AdminSchedulerActionResult }>("/run-topic", {
        method: "POST",
        body: JSON.stringify({ topic: selectedTopic }),
      });
      setLastAction(payload.action);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "RUN_TOPIC_FAILED");
    }
  }

  async function setPaused(paused: boolean) {
    const label = paused ? "pause" : "resume";
    if (!window.confirm(`Confirm ${label} automation? Config writes are disabled unless the server explicitly opts in.`)) {
      return;
    }
    try {
      const payload = await request<{ action: AdminSchedulerActionResult }>(paused ? "/pause" : "/resume", {
        method: "POST",
        body: "{}",
      });
      setLastAction(payload.action);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `${label.toUpperCase()}_FAILED`);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-800">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Admin-only, noindex, plan-first console
            </div>
            <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Content automation console
            </h1>
            <p className="mt-3 max-w-3xl text-base text-slate-600">
              Monitor the Biz2Lab open-source automation series scheduler and run safe dry-runs. Web actions do not merge,
              deploy, or publish without the local scheduler and Codex hero artifact gates.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:max-w-md">
            <label className="text-sm font-semibold text-slate-700" htmlFor="admin-token">
              Admin bearer token
            </label>
            <div className="flex gap-2">
              <input
                id="admin-token"
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                className="min-h-10 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                autoComplete="off"
              />
              <ActionButton disabled={!authenticated || busy} onClick={refresh}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Load
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          {error}
        </div>
      ) : null}

      {status ? (
        <>
          <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
                  <Activity className="h-5 w-5 text-teal-700" aria-hidden="true" />
                  Status
                </h2>
                <StatusBadge value={status.automationState} />
              </div>
              <ValueLine label="Cadence" value={`${status.currentCadenceMinutes} minutes`} />
              <ValueLine
                label="Active hours"
                value={`${status.activeHours.start}-${status.activeHours.end} ${status.activeHours.timezone}`}
              />
              <ValueLine label="Daily limit" value={status.dailyLimit} />
              <ValueLine label="Open PR limit" value={status.openPrLimit} />
              <ValueLine label="Last run" value={status.lastRunTime} />
              <ValueLine label="Last result" value={status.lastResult} />
              <ValueLine label="Next topic" value={status.nextEligibleTopic?.label ?? "none"} />
              <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Current gate</div>
                <StatusBadge value={status.currentGateResult} />
                <p className="mt-2 text-sm text-slate-600">{status.currentGateReason}</p>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-700" aria-hidden="true" />
                <h2 className="text-lg font-bold text-slate-950">Scheduler safety</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(status.safetyGates).map(([key, value]) => (
                  <div key={key} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{key}</div>
                    <div className="mt-1 text-sm font-bold text-slate-950">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
                <ListChecks className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Queue
              </h2>
              <span className="text-sm text-slate-500">PR existence is verified by the canonical scheduler dry-run.</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2">Topic</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Draft</th>
                    <th className="px-3 py-2">Hero artifact</th>
                    <th className="px-3 py-2">PR</th>
                    <th className="px-3 py-2">Production</th>
                    <th className="px-3 py-2">Next action</th>
                  </tr>
                </thead>
                <tbody>
                  {status.queue.map((item) => (
                    <tr key={item.slug} className="border-b border-slate-100 align-top last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-slate-950">{item.label}</td>
                      <td className="px-3 py-3"><StatusBadge value={item.status} /></td>
                      <td className="px-3 py-3">{item.draftExists ? "yes" : "no"}</td>
                      <td className="px-3 py-3">{item.heroArtifactExists ? "yes" : "no"}</td>
                      <td className="px-3 py-3">{String(item.prExists)}</td>
                      <td className="px-3 py-3">{item.productionPublished ? "yes" : "no"}</td>
                      <td className="px-3 py-3 text-slate-600">{item.nextAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-950">
                <Play className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Actions
              </h2>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="topic-select">
                Selected topic
              </label>
              <select
                id="topic-select"
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
                className="mb-4 min-h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              >
                {status.queue.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.label}
                  </option>
                ))}
              </select>
              <div className="grid gap-2 sm:grid-cols-2">
                <ActionButton disabled={busy} onClick={() => runDryRun(false)}>
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  Dry-run
                </ActionButton>
                <ActionButton disabled={busy} onClick={() => runDryRun(true)} variant="secondary">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Force-check dry-run
                </ActionButton>
                <ActionButton disabled={busy || !selectedTopic} onClick={runTopic} variant="danger">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                  Run selected topic
                </ActionButton>
                <ActionButton disabled={busy} onClick={() => setPaused(true)} variant="secondary">
                  <Pause className="h-4 w-4" aria-hidden="true" />
                  Pause automation
                </ActionButton>
                <ActionButton disabled={busy} onClick={() => setPaused(false)} variant="secondary">
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Resume automation
                </ActionButton>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                No merge button is available in v1. The web console does not run publication or deployment commands.
              </p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-slate-950">Last action</h2>
              {lastAction ? (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div className="mb-2"><StatusBadge value={lastAction.status} /></div>
                  {lastAction.message ? <p className="mb-3 text-slate-700">{lastAction.message}</p> : null}
                  {lastAction.result ? (
                    <pre className="max-h-72 overflow-auto rounded-md bg-slate-950 p-3 text-xs leading-6 text-slate-100">
                      {JSON.stringify(lastAction.result, null, 2)}
                    </pre>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-slate-600">Run a dry-run or plan-only action to see the scheduler result.</p>
              )}
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Logs</h2>
            {logs.length > 0 ? (
              <div className="grid gap-3">
                {logs.map((entry, index) => (
                  <div key={`${entry.timestamp ?? "log"}-${index}`} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold text-slate-950">{entry.result}</span>
                      <span className="text-slate-500">{entry.timestamp ?? "local log"}</span>
                    </div>
                    <div className="mt-1 text-slate-600">Topic: {entry.topic ?? "not recorded"}</div>
                    <div className="mt-1 text-slate-600">Gate: {entry.gateReason}</div>
                    <div className="mt-1 text-slate-600">Validation: {entry.validationSummary}</div>
                    {entry.prUrl ? <div className="mt-1 text-teal-800">{entry.prUrl}</div> : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No scheduler log entries are available on this runtime.</p>
            )}
          </section>
        </>
      ) : (
        <section className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          Enter the admin bearer token and load the console. The token is kept only in component memory for this page session.
        </section>
      )}
    </div>
  );
}
