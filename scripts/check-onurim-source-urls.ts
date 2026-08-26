import { healthSources } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";

type SourceCheck = {
  url: string;
  status: number | "FETCH_ERROR";
  result: "OK" | "RESTRICTED" | "BROKEN";
  detail?: string;
};

const restrictedStatuses = new Set([401, 403, 405, 429]);
const urls = [
  ...new Set([
    ...healthSources.map((source) => source.url),
    ...healthSupportGuides.flatMap((guide) => guide.sources.map((source) => source.url)),
  ]),
].sort();

async function checkUrl(url: string): Promise<SourceCheck> {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: {
        "User-Agent": "ONURIM-Source-Link-Audit/1.0 (+https://www.biz2lab.com/health/trust/sources-policy)",
      },
    });
    const result =
      response.status >= 200 && response.status < 400
        ? "OK"
        : restrictedStatuses.has(response.status)
          ? "RESTRICTED"
          : "BROKEN";
    await response.body?.cancel();
    return { url, status: response.status, result };
  } catch (error) {
    return {
      url,
      status: "FETCH_ERROR",
      result: "BROKEN",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const concurrency = 10;
  const checks: SourceCheck[] = [];
  for (let index = 0; index < urls.length; index += concurrency) {
    checks.push(...(await Promise.all(urls.slice(index, index + concurrency).map(checkUrl))));
  }

  const summary = {
    checkedAt: new Date().toISOString(),
    total: checks.length,
    ok: checks.filter((check) => check.result === "OK").length,
    restricted: checks.filter((check) => check.result === "RESTRICTED").length,
    broken: checks.filter((check) => check.result === "BROKEN").length,
    nonOk: checks.filter((check) => check.result !== "OK"),
  };

  console.log(JSON.stringify(summary, null, 2));
  if (summary.broken > 0) process.exitCode = 1;
}

void main();
