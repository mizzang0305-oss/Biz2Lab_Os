import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  assertTopicCanPublish,
  buildImagePaths,
  ContentSeriesError,
  findCodexImageArtifact,
  readContentSeriesState,
  readContentSeriesTopics,
  resolveContentSeriesTopic,
  runContentSeriesOrchestrator,
  type ContentSeriesTopic,
} from "@/scripts/content-series-orchestrator";

export type ContentSeriesSchedule = {
  enabled: boolean;
  cadenceMinutes: number;
  minCadenceMinutes: number;
  maxArticlesPerDay: number;
  maxOpenPrs: number;
  requireCodexArtifact: boolean;
  autoMerge: boolean;
  manualDeploy: boolean;
  activeHours: {
    timezone: string;
    start: string;
    end: string;
  };
};

export type ContentSeriesRunState = {
  lastRunAt: string | null;
  lastAttemptAt: string | null;
  lastPublishedAt: string | null;
  todayPublishedCount: number;
  today: string | null;
  lastStatus: string | null;
  lastTopic: string | null;
};

export type OpenPullRequest = {
  number: number;
  title: string;
  headRefName: string;
};

type SchedulerOptions = {
  rootDir?: string;
  dryRun?: boolean;
  forceCheck?: boolean;
  cadenceMinutes?: number;
  topic?: string;
  useLatestCodexArtifact?: boolean;
  now?: Date;
};

type SchedulerDeps = {
  listOpenPullRequests?: (rootDir: string) => OpenPullRequest[];
  runPublication?: (options: SchedulerPublicationOptions) => Promise<{ prUrl?: string }> | { prUrl?: string };
  log?: (message: string) => void;
};

type SchedulerPublicationOptions = {
  rootDir: string;
  topicSlug: string;
  useLatestCodexArtifact: boolean;
};

export type SchedulerResult = {
  status: string;
  topic?: string;
  dryRun: boolean;
  message?: string;
  prUrl?: string;
};

const schedulePath = "data/content-series-schedule.json";
const runStatePath = "data/content-series-run-state.json";
const contentIndexPath = "content/ko/content-index.json";
const lockPath = ".tmp/content-series-scheduler.lock";

function absolutePath(rootDir: string, repoRelativePath: string) {
  return path.join(rootDir, ...repoRelativePath.split("/"));
}

function readJsonFile<T>(rootDir: string, repoRelativePath: string): T {
  return JSON.parse(fs.readFileSync(absolutePath(rootDir, repoRelativePath), "utf8")) as T;
}

function writeJsonFile(rootDir: string, repoRelativePath: string, value: unknown) {
  const filePath = absolutePath(rootDir, repoRelativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function readContentSeriesSchedule(rootDir = process.cwd()) {
  const schedule = readJsonFile<ContentSeriesSchedule>(rootDir, schedulePath);
  if (schedule.autoMerge || schedule.manualDeploy) {
    throw new ContentSeriesError("UNSAFE_SCHEDULER_CONFIG", "scheduler must not auto-merge or manually deploy");
  }
  if (!schedule.requireCodexArtifact) {
    throw new ContentSeriesError("UNSAFE_SCHEDULER_CONFIG", "scheduler must require a local Codex image artifact");
  }
  return schedule;
}

export function readContentSeriesRunState(rootDir = process.cwd()) {
  return readJsonFile<ContentSeriesRunState>(rootDir, runStatePath);
}

function parseClock(value: string) {
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) {
    throw new ContentSeriesError("INVALID_SCHEDULER_CONFIG", `Invalid HH:mm time: ${value}`);
  }
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) {
    throw new ContentSeriesError("INVALID_SCHEDULER_CONFIG", `Invalid HH:mm time: ${value}`);
  }
  return hour * 60 + minute;
}

function localDateParts(now: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "00";
  const hour = Number(part("hour")) % 24;
  const minute = Number(part("minute"));
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    minuteOfDay: hour * 60 + minute,
  };
}

function isInsideActiveHours(schedule: ContentSeriesSchedule, now: Date) {
  const current = localDateParts(now, schedule.activeHours.timezone).minuteOfDay;
  const start = parseClock(schedule.activeHours.start);
  const end = parseClock(schedule.activeHours.end);
  if (start <= end) {
    return current >= start && current <= end;
  }
  return current >= start || current <= end;
}

function normalizeDailyState(state: ContentSeriesRunState, today: string): ContentSeriesRunState {
  if (state.today === today) {
    return state;
  }
  return {
    ...state,
    today,
    todayPublishedCount: 0,
  };
}

function minutesSince(thenIso: string, now: Date) {
  return (now.getTime() - new Date(thenIso).getTime()) / 60_000;
}

function result(status: string, dryRun: boolean, topic?: ContentSeriesTopic, message?: string, prUrl?: string): SchedulerResult {
  return {
    status,
    dryRun,
    ...(topic ? { topic: topic.slug } : {}),
    ...(message ? { message } : {}),
    ...(prUrl ? { prUrl } : {}),
  };
}

function defaultListOpenPullRequests(rootDir: string) {
  const output = execFileSync(
    "gh",
    ["pr", "list", "--state", "open", "--base", "master", "--json", "number,title,headRefName", "--limit", "100"],
    { cwd: rootDir, encoding: "utf8" },
  );
  return JSON.parse(output) as OpenPullRequest[];
}

async function defaultRunPublication(options: SchedulerPublicationOptions): Promise<{ prUrl?: string }> {
  const publication = await runContentSeriesOrchestrator({
    rootDir: options.rootDir,
    topic: options.topicSlug,
    useLatestCodexArtifact: options.useLatestCodexArtifact,
  });
  return { prUrl: publication.prUrl };
}

function openPrMatchesTopic(pr: OpenPullRequest, topic: ContentSeriesTopic) {
  const haystack = `${pr.title} ${pr.headRefName}`.toLowerCase();
  return haystack.includes(topic.slug.toLowerCase()) || haystack.includes(topic.id.toLowerCase());
}

function contentIndexIncludesSlug(rootDir: string, topic: ContentSeriesTopic) {
  const filePath = absolutePath(rootDir, contentIndexPath);
  if (!fs.existsSync(filePath)) {
    return false;
  }
  const index = JSON.parse(fs.readFileSync(filePath, "utf8")) as { slug?: string }[];
  return index.some((entry) => entry.slug === topic.slug);
}

function articleExists(rootDir: string, topic: ContentSeriesTopic) {
  return fs.existsSync(absolutePath(rootDir, `content/ko/automation/${topic.slug}.md`));
}

function imageConflictExists(rootDir: string, topic: ContentSeriesTopic) {
  const paths = buildImagePaths(topic);
  return fs.existsSync(absolutePath(rootDir, paths.rawRepoPath)) || fs.existsSync(absolutePath(rootDir, paths.publicRepoPath));
}

function topicIsCompletedOrPublished(rootDir: string, completed: string[], topic: ContentSeriesTopic) {
  return completed.includes(topic.slug) || articleExists(rootDir, topic) || contentIndexIncludesSlug(rootDir, topic);
}

function contentSeriesQueueIsExhausted(rootDir: string, completed: string[], topics: ContentSeriesTopic[]) {
  return topics.every((topic) => topicIsCompletedOrPublished(rootDir, completed, topic));
}

function writeRunAttempt(rootDir: string, state: ContentSeriesRunState, now: Date, status: string, topic: ContentSeriesTopic) {
  writeJsonFile(rootDir, runStatePath, {
    ...state,
    lastRunAt: now.toISOString(),
    lastAttemptAt: now.toISOString(),
    lastStatus: status,
    lastTopic: topic.slug,
  });
}

function writePublicationSuccess(rootDir: string, state: ContentSeriesRunState, now: Date, topic: ContentSeriesTopic) {
  writeJsonFile(rootDir, runStatePath, {
    ...state,
    lastRunAt: now.toISOString(),
    lastAttemptAt: now.toISOString(),
    lastPublishedAt: now.toISOString(),
    todayPublishedCount: state.todayPublishedCount + 1,
    lastStatus: "PUBLICATION_PR_CREATED",
    lastTopic: topic.slug,
  });
}

function lockIsFresh(lockCreatedAt: string | undefined, now: Date, schedule: ContentSeriesSchedule) {
  if (!lockCreatedAt) {
    return true;
  }
  const staleAfterMinutes = Math.max(schedule.cadenceMinutes * 2, 360);
  return minutesSince(lockCreatedAt, now) < staleAfterMinutes;
}

function acquireLock(rootDir: string, now: Date, schedule: ContentSeriesSchedule, log: (message: string) => void) {
  const filePath = absolutePath(rootDir, lockPath);
  if (fs.existsSync(filePath)) {
    const payload = JSON.parse(fs.readFileSync(filePath, "utf8")) as { createdAt?: string };
    if (lockIsFresh(payload.createdAt, now, schedule)) {
      return false;
    }
    log(`Removing stale content series scheduler lock: ${filePath}`);
    fs.unlinkSync(filePath);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  writeJsonFile(rootDir, lockPath, {
    createdAt: now.toISOString(),
    pid: process.pid,
  });
  return true;
}

function releaseLock(rootDir: string) {
  const filePath = absolutePath(rootDir, lockPath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function publicationFailureStatus(error: unknown) {
  if (error instanceof ContentSeriesError) {
    return error.code === "WORKTREE_NOT_CLEAN" ? "BLOCKED_SCOPE_DRIFT" : error.code;
  }
  return "VALIDATION_FAILED";
}

export async function runContentSeriesScheduler(options: SchedulerOptions = {}, deps: SchedulerDeps = {}): Promise<SchedulerResult> {
  const rootDir = options.rootDir ?? process.cwd();
  const now = options.now ?? new Date();
  const dryRun = Boolean(options.dryRun);
  const schedule = readContentSeriesSchedule(rootDir);
  const effectiveCadence = options.cadenceMinutes ?? schedule.cadenceMinutes;
  const today = localDateParts(now, schedule.activeHours.timezone).date;
  const runState = normalizeDailyState(readContentSeriesRunState(rootDir), today);
  const log = deps.log ?? (() => undefined);
  const useLatestCodexArtifact = options.useLatestCodexArtifact ?? true;

  if (!schedule.enabled) {
    return result("SCHEDULER_DISABLED", dryRun);
  }
  if (effectiveCadence < schedule.minCadenceMinutes) {
    return result("CADENCE_BELOW_MINIMUM", dryRun, undefined, `cadence ${effectiveCadence} is below ${schedule.minCadenceMinutes}`);
  }
  if (!isInsideActiveHours(schedule, now)) {
    return result("OUTSIDE_ACTIVE_HOURS", dryRun);
  }
  if (!options.forceCheck && runState.lastRunAt && minutesSince(runState.lastRunAt, now) < effectiveCadence) {
    return result("CADENCE_NOT_DUE", dryRun);
  }
  if (runState.todayPublishedCount >= schedule.maxArticlesPerDay) {
    return result("DAILY_LIMIT_REACHED", dryRun);
  }

  let lockAcquired = false;
  try {
    if (!dryRun) {
      lockAcquired = acquireLock(rootDir, now, schedule, log);
      if (!lockAcquired) {
        return result("RUN_ALREADY_IN_PROGRESS", dryRun);
      }
    }

    const contentState = readContentSeriesState(rootDir);
    const topicFile = readContentSeriesTopics(rootDir);
    if (!options.topic && contentSeriesQueueIsExhausted(rootDir, contentState.completed, topicFile.topics)) {
      return result("CONTENT_SERIES_QUEUE_EXHAUSTED", dryRun);
    }

    const topic = resolveContentSeriesTopic(topicFile.topics, contentState, options.topic ?? contentState.next[0]);
    if (contentState.completed.includes(topic.slug)) {
      return result("TOPIC_ALREADY_COMPLETED", dryRun, topic);
    }
    const publicationBlockers = assertTopicCanPublish(contentState, topic, { planOnly: true });
    if (publicationBlockers.length > 0) {
      return result("TOPIC_ORDER_BLOCKED", dryRun, topic, publicationBlockers.join("; "));
    }
    const topicArticleExists = articleExists(rootDir, topic);
    if (topicArticleExists) {
      const evidence = [
        `content/ko/automation/${topic.slug}.md`,
        contentIndexIncludesSlug(rootDir, topic) ? contentIndexPath : undefined,
      ].filter(Boolean);
      return result(
        "STATE_ADVANCEMENT_REQUIRED",
        dryRun,
        topic,
        `${topic.slug} is already published (${evidence.join(", ")}) but is not completed in data/content-series-state.json`,
      );
    }
    if (contentIndexIncludesSlug(rootDir, topic)) {
      return result("CONTENT_INDEX_DUPLICATE", dryRun, topic);
    }
    if (imageConflictExists(rootDir, topic)) {
      return result("IMAGE_ASSET_CONFLICT", dryRun, topic);
    }

    const openPrs = (deps.listOpenPullRequests ?? defaultListOpenPullRequests)(rootDir);
    if (openPrs.some((pr) => openPrMatchesTopic(pr, topic))) {
      return result("EXISTING_TOPIC_PR", dryRun, topic);
    }
    if (openPrs.length >= schedule.maxOpenPrs) {
      return result("MAX_OPEN_PRS_REACHED", dryRun, topic);
    }

    try {
      findCodexImageArtifact(rootDir, topic, contentState, {
        useLatestCodexArtifact,
      });
    } catch (error) {
      const status =
        error instanceof ContentSeriesError && error.code === "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING"
          ? "WAITING_FOR_CODEX_IMAGE_ARTIFACT"
          : error instanceof ContentSeriesError
            ? error.code
            : "CODEX_IMAGE_ARTIFACT_CHECK_FAILED";
      if (!dryRun) {
        writeRunAttempt(rootDir, runState, now, status, topic);
      }
      return result(status, dryRun, topic, error instanceof Error ? error.message : undefined);
    }

    if (dryRun) {
      return result("DRY_RUN_READY", dryRun, topic);
    }

    let publication: { prUrl?: string };
    try {
      publication = await (deps.runPublication ?? defaultRunPublication)({
        rootDir,
        topicSlug: topic.slug,
        useLatestCodexArtifact,
      });
    } catch (error) {
      return result(publicationFailureStatus(error), dryRun, topic, error instanceof Error ? error.message : undefined);
    }
    const currentState = normalizeDailyState(readContentSeriesRunState(rootDir), today);
    writePublicationSuccess(rootDir, currentState, now, topic);
    return result("PUBLICATION_PR_CREATED", dryRun, topic, undefined, publication.prUrl);
  } finally {
    if (lockAcquired) {
      releaseLock(rootDir);
    }
  }
}

function parseArgs(argv: string[]): SchedulerOptions & { help?: boolean } {
  const options: SchedulerOptions & { help?: boolean } = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force-check") {
      options.forceCheck = true;
    } else if (arg === "--cadence") {
      const value = Number(argv[index + 1]);
      if (!Number.isFinite(value)) {
        throw new ContentSeriesError("INVALID_ARGS", "--cadence requires a number");
      }
      options.cadenceMinutes = value;
      index += 1;
    } else if (arg === "--topic") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new ContentSeriesError("INVALID_ARGS", "--topic requires a topic id or slug");
      }
      options.topic = value;
      index += 1;
    } else if (arg === "--use-latest-codex-artifact") {
      options.useLatestCodexArtifact = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new ContentSeriesError("INVALID_ARGS", `Unknown argument: ${arg}`);
    }
  }
  return options;
}

function printHelp() {
  console.log(`Usage:
  npm run content:series:scheduler -- --dry-run
  npm run content:series:scheduler -- --force-check
  npm run content:series:scheduler -- --cadence 180 --use-latest-codex-artifact
  npm run content:series:scheduler -- --topic node-red --use-latest-codex-artifact

Options:
  --dry-run       Check gates without writing state, publishing, committing, or creating a PR
  --force-check   Bypass cadence only; all safety, duplicate, and Codex artifact gates remain active
  --cadence <n>   Override cadence minutes for this run only
  --topic <key>   Topic id or slug from data/content-series-topics.json
  --use-latest-codex-artifact
                  Use the latest approved local Codex image artifact root; non-dry runs create a publication PR when all gates pass
`);
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }
    const result = await runContentSeriesScheduler(options);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    if (error instanceof ContentSeriesError) {
      console.error(`${error.code}: ${error.message}`);
      process.exit(1);
    }
    throw error;
  }
}

if (require.main === module) {
  void main();
}
