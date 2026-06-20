import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import matter from "gray-matter";

import { isAdminConfigWriteEnabled } from "@/lib/admin/content-automation-auth";

type ContentSeriesSchedule = {
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

type ContentSeriesRunState = {
  lastRunAt: string | null;
  lastAttemptAt: string | null;
  lastPublishedAt: string | null;
  todayPublishedCount: number;
  today: string | null;
  lastStatus: string | null;
  lastTopic: string | null;
};

type ContentSeriesState = {
  completed: string[];
  next: string[];
  imagePolicy: {
    allowedArtifactExtensions: string[];
    rejectPlaceholderTerms: string[];
  };
};

type ContentSeriesTopic = {
  id: string;
  toolName: string;
  slug: string;
};

type SchedulerResult = {
  status: string;
  topic?: string;
  dryRun: boolean;
  message?: string;
  prUrl?: string;
};

export type AdminQueueItem = {
  id: string;
  label: string;
  slug: string;
  status: "published" | "queued" | "draft" | "waiting-artifact" | "backlog";
  draftExists: boolean;
  heroArtifactExists: boolean;
  rawImageExists: boolean;
  publicImageExists: boolean;
  prExists: boolean | "checked-by-scheduler";
  productionPublished: boolean;
  nextAction: string;
  gateResult: string;
};

export type AdminAutomationStatus = {
  executionMode: "plan-only-web-console";
  schedule: ContentSeriesSchedule;
  runState: ContentSeriesRunState;
  automationState: "enabled" | "paused";
  currentCadenceMinutes: number;
  activeHours: ContentSeriesSchedule["activeHours"];
  dailyLimit: number;
  openPrLimit: number;
  lastRunTime: string | null;
  lastResult: string | null;
  nextEligibleTopic: {
    slug: string;
    label: string;
  } | null;
  currentGateResult: string;
  currentGateReason: string;
  safetyGates: {
    codexArtifactRequired: boolean;
    openPrLimitPreserved: boolean;
    dailyLimitPreserved: boolean;
    activeHoursPreserved: boolean;
    duplicatePreventionPreserved: boolean;
    lockBehaviorPreserved: boolean;
    oneTopicPerRun: boolean;
    autoMergeEnabled: boolean;
    manualDeployEnabled: boolean;
  };
  queue: AdminQueueItem[];
  adminActions: {
    dryRun: "enabled";
    forceCheckDryRun: "enabled";
    runSelectedTopic: "plan-only";
    pauseAutomation: "config-write-disabled-by-default" | "enabled";
    resumeAutomation: "config-write-disabled-by-default" | "enabled";
    merge: "not-available";
    deploy: "not-available";
  };
};

export type AdminLogEntry = {
  timestamp: string | null;
  topic: string | null;
  result: string;
  gateReason: string;
  prUrl: string | null;
  validationSummary: string;
};

export type AdminSchedulerActionResult = {
  ok: boolean;
  status: string;
  message?: string;
  result?: SchedulerResult;
  logs?: string[];
};

const queueDefinitions = [
  {
    id: "opencut",
    label: "OpenCut",
    slug: "opencut-free-open-source-video-editor-ai-content-automation",
  },
  {
    id: "activepieces",
    label: "Activepieces",
    slug: "activepieces-ai-business-automation-n8n-alternative",
  },
  {
    id: "node-red",
    label: "Node-RED",
    slug: "node-red-local-business-automation-server",
  },
  {
    id: "huginn",
    label: "Huginn",
    slug: "huginn-monitoring-automation-agent",
  },
  {
    id: "baserow",
    label: "Baserow",
    slug: "baserow-open-source-database-automation",
  },
  {
    id: "appsmith",
    label: "Appsmith",
    slug: "appsmith-internal-dashboard-automation",
  },
  {
    id: "windmill",
    label: "Windmill",
    slug: "windmill-developer-workflow-automation",
  },
  {
    id: "kestra",
    label: "Kestra",
    slug: "kestra-data-ai-workflow-orchestration",
  },
  {
    id: "nocodb-n8n-caution",
    label: "NocoDB / n8n caution articles",
    slug: "nocodb-n8n-caution-articles",
  },
] as const;

function repoPath(rootDir: string, relativePath: string) {
  return path.join(rootDir, ...relativePath.split("/"));
}

function readJson<T>(rootDir: string, relativePath: string): T {
  return JSON.parse(fs.readFileSync(repoPath(rootDir, relativePath), "utf8")) as T;
}

function readContentSeriesSchedule(rootDir = process.cwd()) {
  const schedule = readJson<ContentSeriesSchedule>(rootDir, "data/content-series-schedule.json");
  if (schedule.autoMerge || schedule.manualDeploy || !schedule.requireCodexArtifact) {
    throw new Error("UNSAFE_SCHEDULER_CONFIG");
  }
  return schedule;
}

function readContentSeriesRunState(rootDir = process.cwd()) {
  return readJson<ContentSeriesRunState>(rootDir, "data/content-series-run-state.json");
}

function readContentSeriesState(rootDir = process.cwd()) {
  return readJson<ContentSeriesState>(rootDir, "data/content-series-state.json");
}

function readContentSeriesTopics(rootDir = process.cwd()) {
  return readJson<{ topics: ContentSeriesTopic[] }>(rootDir, "data/content-series-topics.json");
}

function fileExists(rootDir: string, relativePath: string) {
  return fs.existsSync(repoPath(rootDir, relativePath));
}

function readArticleState(rootDir: string, slug: string) {
  const articlePath = repoPath(rootDir, `content/ko/automation/${slug}.md`);
  if (!fs.existsSync(articlePath)) {
    return {
      exists: false,
      draft: false,
      published: false,
    };
  }

  const parsed = matter(fs.readFileSync(articlePath, "utf8"));
  return {
    exists: true,
    draft: parsed.data.draft === true || parsed.data.status !== "published" || parsed.data.noindex === true,
    published: parsed.data.status === "published" && parsed.data.draft === false && parsed.data.noindex === false,
  };
}

function topicBySlug(topics: ContentSeriesTopic[]) {
  return new Map(topics.flatMap((topic) => [[topic.slug, topic], [topic.id, topic]]));
}

function imagePathsForSlug(topic: ContentSeriesTopic | undefined, slug: string) {
  void topic;
  return {
    rawRepoPath: `assets/images/raw/${slug}-hero.jpg`,
    publicRepoPath: `public/images/posts/${slug}-hero.webp`,
  };
}

function pathIsInside(candidatePath: string, rootPath: string) {
  const candidate = path.resolve(candidatePath);
  const root = path.resolve(rootPath);
  const relativePath = path.relative(root, candidate);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function codexArtifactDiscoveryRoots() {
  const configuredRoot = process.env.CODEX_GENERATED_IMAGE_ROOT ?? process.env.CODEX_GENERATED_IMAGES_DIR;
  return [configuredRoot ? path.resolve(configuredRoot) : path.join(os.homedir(), ".codex", "generated_images")];
}

function hasImageMagic(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 12) return false;
  const header = buffer.subarray(0, 12);
  return (
    (header[0] === 0xff && header[1] === 0xd8) ||
    header.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])) ||
    (header.subarray(0, 4).toString("ascii") === "RIFF" && header.subarray(8, 12).toString("ascii") === "WEBP")
  );
}

function collectFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(fullPath);
      return entry.isFile() ? [fullPath] : [];
    });
}

function findStatusCodexArtifact(topic: ContentSeriesTopic, state: ContentSeriesState) {
  const roots = codexArtifactDiscoveryRoots().filter((directory) => fs.existsSync(directory));
  const allowedExtensions = new Set(state.imagePolicy.allowedArtifactExtensions.map((value) => value.toLowerCase()));

  for (const root of roots) {
    for (const filePath of collectFiles(root)) {
      if (!pathIsInside(filePath, root)) continue;
      const basename = path.basename(filePath).toLowerCase();
      const ext = path.extname(filePath).toLowerCase();
      if (!basename.includes(topic.slug.toLowerCase())) continue;
      if (!allowedExtensions.has(ext)) {
        return { exists: false, gateResult: "CODEX_ARTIFACT_UNSUPPORTED_FORMAT" };
      }
      if (state.imagePolicy.rejectPlaceholderTerms.some((term) => basename.includes(term.toLowerCase()))) {
        return { exists: false, gateResult: "CODEX_ARTIFACT_PLACEHOLDER_REJECTED" };
      }
      if (fs.statSync(filePath).size < 4096 || !hasImageMagic(filePath)) {
        return { exists: false, gateResult: "CODEX_ARTIFACT_PLACEHOLDER_REJECTED" };
      }
      return { exists: true, gateResult: "CODEX_IMAGE_ARTIFACT_READY" };
    }
  }

  return { exists: false, gateResult: "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING" };
}

function codexArtifactStatus(rootDir: string, topic: ContentSeriesTopic | undefined) {
  if (!topic) {
    return { exists: false, gateResult: "NOT_IN_SCHEDULER_TOPIC_FILE" };
  }

  return findStatusCodexArtifact(topic, readContentSeriesState(rootDir));
}

function nextActionFor(item: {
  status: AdminQueueItem["status"];
  topic?: ContentSeriesTopic;
  gateResult: string;
}) {
  if (item.status === "published") {
    return "Monitor production article and internal links";
  }
  if (!item.topic) {
    return "Backlog item requires a topic brief before scheduler can run";
  }
  if (item.gateResult !== "CODEX_IMAGE_ARTIFACT_READY") {
    return "Create or import a matching local Codex hero artifact";
  }
  return "Run scheduler dry-run; publication remains local scheduler controlled";
}

function buildQueue(rootDir: string, scheduleTopics: ContentSeriesTopic[]) {
  const state = readContentSeriesState(rootDir);
  const bySlug = topicBySlug(scheduleTopics);

  return queueDefinitions.map((definition): AdminQueueItem => {
    const topic = bySlug.get(definition.slug) ?? bySlug.get(definition.id);
    const article = readArticleState(rootDir, definition.slug);
    const paths = imagePathsForSlug(topic, definition.slug);
    const rawImageExists = fileExists(rootDir, paths.rawRepoPath);
    const publicImageExists = fileExists(rootDir, paths.publicRepoPath);
    const artifact = rawImageExists || publicImageExists
      ? { exists: true, gateResult: "PUBLIC_OR_RAW_HERO_EXISTS" }
      : codexArtifactStatus(rootDir, topic);
    const completed = state.completed.includes(definition.slug);
    const productionPublished = article.published && completed;
    const status: AdminQueueItem["status"] = productionPublished
      ? "published"
      : article.exists && article.draft
        ? "draft"
        : topic && !artifact.exists
          ? "waiting-artifact"
          : topic
            ? "queued"
            : "backlog";

    return {
      id: definition.id,
      label: definition.label,
      slug: definition.slug,
      status,
      draftExists: article.exists && article.draft,
      heroArtifactExists: artifact.exists,
      rawImageExists,
      publicImageExists,
      prExists: "checked-by-scheduler",
      productionPublished,
      nextAction: nextActionFor({ status, topic, gateResult: artifact.gateResult }),
      gateResult: artifact.gateResult,
    };
  });
}

function nextEligibleTopic(rootDir: string, topics: ContentSeriesTopic[]) {
  const state = readContentSeriesState(rootDir);
  const nextSlug = state.next.find((slug) => !state.completed.includes(slug));
  if (!nextSlug) return null;
  const topic = topics.find((candidate) => candidate.slug === nextSlug || candidate.id === nextSlug);
  if (!topic) return null;
  return {
    slug: topic.slug,
    label: topic.toolName,
  };
}

function currentGateForStatus(queue: AdminQueueItem[], schedule: ContentSeriesSchedule, nextTopic: { slug: string } | null) {
  if (!schedule.enabled) {
    return {
      result: "SCHEDULER_DISABLED",
      reason: "Automation is paused in data/content-series-schedule.json.",
    };
  }
  if (schedule.autoMerge || schedule.manualDeploy || !schedule.requireCodexArtifact) {
    return {
      result: "UNSAFE_SCHEDULER_CONFIG",
      reason: "Scheduler config must keep auto-merge/manual deploy off and require a Codex artifact.",
    };
  }
  if (!nextTopic) {
    return {
      result: "NO_ELIGIBLE_TOPIC",
      reason: "The queue has no eligible scheduler topic.",
    };
  }

  const queueItem = queue.find((item) => item.slug === nextTopic.slug);
  if (!queueItem) {
    return {
      result: "NEXT_TOPIC_NOT_IN_ADMIN_QUEUE",
      reason: "The next topic is missing from the admin queue panel.",
    };
  }
  if (!queueItem.heroArtifactExists) {
    return {
      result: queueItem.gateResult,
      reason: "Publication remains blocked until a matching local Codex hero artifact exists.",
    };
  }

  return {
    result: "DRY_RUN_REQUIRED_FOR_OPEN_PR_GATE",
    reason: "Use Dry-run to run the canonical scheduler gate, including open PR and duplicate checks.",
  };
}

export function getContentAutomationStatus(rootDir = process.cwd()): AdminAutomationStatus {
  const schedule = readContentSeriesSchedule(rootDir);
  const runState = readContentSeriesRunState(rootDir);
  const topics = readContentSeriesTopics(rootDir).topics;
  const queue = buildQueue(rootDir, topics);
  const nextTopic = nextEligibleTopic(rootDir, topics);
  const currentGate = currentGateForStatus(queue, schedule, nextTopic);

  return {
    executionMode: "plan-only-web-console",
    schedule,
    runState,
    automationState: schedule.enabled ? "enabled" : "paused",
    currentCadenceMinutes: schedule.cadenceMinutes,
    activeHours: schedule.activeHours,
    dailyLimit: schedule.maxArticlesPerDay,
    openPrLimit: schedule.maxOpenPrs,
    lastRunTime: runState.lastRunAt,
    lastResult: runState.lastStatus,
    nextEligibleTopic: nextTopic,
    currentGateResult: currentGate.result,
    currentGateReason: currentGate.reason,
    safetyGates: {
      codexArtifactRequired: schedule.requireCodexArtifact,
      openPrLimitPreserved: true,
      dailyLimitPreserved: true,
      activeHoursPreserved: true,
      duplicatePreventionPreserved: true,
      lockBehaviorPreserved: true,
      oneTopicPerRun: true,
      autoMergeEnabled: schedule.autoMerge,
      manualDeployEnabled: schedule.manualDeploy,
    },
    queue,
    adminActions: {
      dryRun: "enabled",
      forceCheckDryRun: "enabled",
      runSelectedTopic: "plan-only",
      pauseAutomation: isAdminConfigWriteEnabled() ? "enabled" : "config-write-disabled-by-default",
      resumeAutomation: isAdminConfigWriteEnabled() ? "enabled" : "config-write-disabled-by-default",
      merge: "not-available",
      deploy: "not-available",
    },
  };
}

export function getContentAutomationLogs(rootDir = process.cwd()): AdminLogEntry[] {
  const entries: AdminLogEntry[] = [];
  const runState = readContentSeriesRunState(rootDir);

  if (runState.lastAttemptAt || runState.lastRunAt) {
    entries.push({
      timestamp: runState.lastAttemptAt ?? runState.lastRunAt,
      topic: runState.lastTopic,
      result: runState.lastStatus ?? "NO_RESULT_RECORDED",
      gateReason: "Latest persisted scheduler run state",
      prUrl: null,
      validationSummary: "Stored in data/content-series-run-state.json",
    });
  }

  const logPath = repoPath(rootDir, ".tmp/content-series-scheduler.log");
  if (fs.existsSync(logPath)) {
    const lines = fs
      .readFileSync(logPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(-50);

    for (const line of lines.reverse()) {
      entries.push({
        timestamp: null,
        topic: null,
        result: line.slice(0, 160),
        gateReason: "Local scheduler log line",
        prUrl: line.match(/https:\/\/github\.com\/[^\s)]+/)?.[0] ?? null,
        validationSummary: "See .tmp/content-series-scheduler.log on the local scheduler host",
      });
    }
  }

  return entries.slice(0, 50);
}

export function setAutomationEnabled(rootDir: string, enabled: boolean): AdminSchedulerActionResult {
  if (!isAdminConfigWriteEnabled()) {
    return {
      ok: false,
      status: "WEB_CONFIG_WRITE_DISABLED",
      message:
        "Schedule writes are disabled by default. Set BIZ2LAB_ADMIN_CONFIG_WRITE_ENABLED=true only on an approved local admin runtime to change data/content-series-schedule.json.",
    };
  }

  const schedule = readContentSeriesSchedule(rootDir);
  const nextSchedule = { ...schedule, enabled };
  fs.writeFileSync(repoPath(rootDir, "data/content-series-schedule.json"), `${JSON.stringify(nextSchedule, null, 2)}\n`, "utf8");
  return {
    ok: true,
    status: enabled ? "AUTOMATION_RESUMED" : "AUTOMATION_PAUSED",
  };
}
