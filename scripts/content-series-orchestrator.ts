import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import sharp from "sharp";

import type { ImageBrief } from "@/lib/image-generation/types";

type SeriesGates = {
  manualDeploy: boolean;
  autoMerge: boolean;
  dbWrite: boolean;
  externalBusinessApi: boolean;
  placeholderImages: boolean;
  requireRealHeroImage: boolean;
  requireProductionSmokeAfterMerge: boolean;
};

type ImagePolicy = {
  rawDirectory: string;
  publicDirectory: string;
  rawFilenamePattern: string;
  publicFilenamePattern: string;
  requireSlugInFilename: boolean;
  rejectPlaceholderTerms: string[];
  allowedArtifactExtensions: string[];
  artifactSearchRoots: string[];
};

export type ContentSeriesState = {
  series: string;
  title: string;
  currentTopic: string;
  completed: string[];
  next: string[];
  gates: SeriesGates;
  imagePolicy: ImagePolicy;
  validationPolicy: {
    requiredCommands: string[];
    allowValidationBypass: boolean;
    requireValidatePostsCountUpdateWhenPublishing: boolean;
  };
  mergePolicy: {
    branchPattern: string;
    commitMessagePattern: string;
    createPullRequest: boolean;
    targetBranch: string;
    autoMerge: boolean;
    manualDeploy: boolean;
    requireOwnerMerge: boolean;
  };
};

export type ContentSeriesTopic = {
  id: string;
  toolName: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: "automation";
  cluster: "open-source-automation-tools";
  type: "how-to" | "pillar" | "cluster" | "checklist" | "case-study";
  officialSources: {
    label: string;
    url: string;
    usage: string;
  }[];
  articleOutline: {
    heading: string;
    points: string[];
  }[];
  imageConcept: {
    visualFamily: string;
    altKo: string;
    captionKo: string;
    promptSummaryKo: string;
    mustInclude: string[];
    mustAvoid: string[];
  };
  internalLinks: {
    seriesHub: string;
    previous: string;
    required: string[];
  };
  safetyNotes: string[];
  licenseCautionNotes: string[];
};

type TopicFile = {
  series: string;
  topics: ContentSeriesTopic[];
};

type CliOptions = {
  rootDir?: string;
  topic?: string;
  planOnly?: boolean;
  noCommit?: boolean;
  noPr?: boolean;
  artifact?: string;
  artifactDir?: string;
  useLatestCodexArtifact?: boolean;
};

type ImagePaths = {
  rawRepoPath: string;
  publicRepoPath: string;
  requestRepoPath: string;
  promptRepoPath: string;
  generatedBriefRepoPath: string;
  articleRepoPath: string;
};

export type ContentSeriesPlan = {
  topic: ContentSeriesTopic;
  branchName: string;
  commitMessage: string;
  imagePaths: ImagePaths;
  internalLinkRoutes: string[];
  validationCommands: string[];
  publicationBlockers: string[];
};

export type ContentSeriesResult = {
  status: "PLAN" | "PASS";
  plan: ContentSeriesPlan;
  importedImage?: {
    source: string;
    target: string;
    width: number;
    height: number;
    format?: string;
  };
  publicImage?: {
    path: string;
    width?: number;
    height?: number;
    format?: string;
  };
  commit?: string;
  prUrl?: string;
};

export const CONTENT_SERIES_VALIDATION_COMMANDS = [
  "npm run image-skill:plan",
  "npm run image-skill:validate",
  "npm run optimize-images",
  "npm run validate:posts",
  "npm run validate:images",
  "npm test",
  "npm run lint",
  "npm run typecheck",
  "npm run build",
  "npm run check:links",
  "npm run validate:seo",
  "npm run audit:image-briefs",
  "npm run audit:image-prompts",
  "npm run audit:content-authority",
  "git diff --check",
] as const;

export class ContentSeriesError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "ContentSeriesError";
    this.code = code;
  }
}

function repoPath(...parts: string[]) {
  return parts.join("/").replaceAll("\\", "/");
}

export function resolveExecFileInvocation(
  program: string,
  args: string[],
  platform: NodeJS.Platform = process.platform,
) {
  if (platform === "win32" && path.extname(program) === "" && ["npm", "npx", "pnpm", "yarn"].includes(program)) {
    return {
      program: "cmd.exe",
      args: ["/d", "/s", "/c", program, ...args],
    };
  }
  return { program, args };
}

function absolutePath(rootDir: string, repoRelativePath: string) {
  return path.join(rootDir, ...repoRelativePath.split("/"));
}

function readJsonFile<T>(rootDir: string, repoRelativePath: string): T {
  return JSON.parse(fs.readFileSync(absolutePath(rootDir, repoRelativePath), "utf8")) as T;
}

function writeJsonFile(rootDir: string, repoRelativePath: string, value: unknown) {
  const targetPath = absolutePath(rootDir, repoRelativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeTextFile(rootDir: string, repoRelativePath: string, value: string) {
  const targetPath = absolutePath(rootDir, repoRelativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, value, "utf8");
}

function appendTextFile(rootDir: string, repoRelativePath: string, value: string) {
  const targetPath = absolutePath(rootDir, repoRelativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.appendFileSync(targetPath, value, "utf8");
}

function assertStringArray(label: string, value: unknown) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length === 0)) {
    throw new ContentSeriesError("INVALID_CONFIG", `${label} must be a non-empty string array`);
  }
}

export function readContentSeriesState(rootDir = process.cwd()) {
  const state = readJsonFile<ContentSeriesState>(rootDir, "data/content-series-state.json");
  if (!state.series || !state.currentTopic) {
    throw new ContentSeriesError("INVALID_CONFIG", "content-series-state requires series and currentTopic");
  }
  assertStringArray("completed", state.completed);
  assertStringArray("next", state.next);
  if (state.gates.manualDeploy || state.gates.autoMerge || state.gates.dbWrite || state.gates.externalBusinessApi) {
    throw new ContentSeriesError("UNSAFE_SERIES_GATES", "series gates must block deploy, auto-merge, DB writes, and external business APIs");
  }
  if (!state.gates.requireRealHeroImage || state.gates.placeholderImages) {
    throw new ContentSeriesError("UNSAFE_IMAGE_GATES", "series gates must require real hero images and reject placeholders");
  }
  return state;
}

export function readContentSeriesTopics(rootDir = process.cwd()) {
  const payload = readJsonFile<TopicFile>(rootDir, "data/content-series-topics.json");
  if (!Array.isArray(payload.topics) || payload.topics.length === 0) {
    throw new ContentSeriesError("INVALID_CONFIG", "content-series-topics requires a non-empty topics array");
  }
  for (const topic of payload.topics) {
    if (!topic.id || !topic.slug || !topic.title || !topic.description || !topic.toolName) {
      throw new ContentSeriesError("INVALID_CONFIG", `topic ${topic.id || topic.slug || "unknown"} is missing required fields`);
    }
    if (!topic.slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
      throw new ContentSeriesError("INVALID_CONFIG", `${topic.slug}: slug must be lowercase kebab-case`);
    }
    if (!topic.imageConcept.altKo || !topic.imageConcept.captionKo || !topic.imageConcept.promptSummaryKo) {
      throw new ContentSeriesError("INVALID_CONFIG", `${topic.slug}: image concept is incomplete`);
    }
    if (topic.officialSources.length < 1) {
      throw new ContentSeriesError("INVALID_CONFIG", `${topic.slug}: official sources are required`);
    }
  }
  return payload;
}

export function resolveContentSeriesTopic(
  topics: ContentSeriesTopic[],
  state: ContentSeriesState,
  topicKey?: string,
) {
  const requestedTopic = topicKey ?? state.currentTopic ?? state.next[0];
  const topic = topics.find((candidate) => candidate.id === requestedTopic || candidate.slug === requestedTopic);
  if (!topic) {
    throw new ContentSeriesError("TOPIC_NOT_FOUND", `Unknown content series topic: ${requestedTopic}`);
  }
  return topic;
}

export function assertTopicCanPublish(
  state: ContentSeriesState,
  topic: ContentSeriesTopic,
  options: { planOnly?: boolean } = {},
) {
  if (state.completed.includes(topic.slug)) {
    throw new ContentSeriesError("TOPIC_ALREADY_COMPLETED", `${topic.slug} is already listed as completed`);
  }

  if (!state.next.includes(topic.slug)) {
    throw new ContentSeriesError("TOPIC_NOT_IN_QUEUE", `${topic.slug} is not listed in the next-topic queue`);
  }

  const blockers: string[] = [];
  if (state.next[0] !== topic.slug) {
    blockers.push(`next queue starts with ${state.next[0]}`);
  }
  if (topic.internalLinks.previous && !state.completed.includes(topic.internalLinks.previous)) {
    blockers.push(`previous article is not public yet: ${topic.internalLinks.previous}`);
  }

  if (blockers.length > 0 && !options.planOnly) {
    throw new ContentSeriesError("TOPIC_ORDER_BLOCKED", blockers.join("; "));
  }

  return blockers;
}

export function buildImagePaths(topic: ContentSeriesTopic): ImagePaths {
  const id = `${topic.slug}-hero`;
  return {
    rawRepoPath: repoPath("assets/images/raw", `${id}.jpg`),
    publicRepoPath: repoPath("public/images/posts", `${id}.webp`),
    requestRepoPath: repoPath("image-requests/generated", `${id}.md`),
    promptRepoPath: repoPath("image-requests/generated", `${id}.prompt.md`),
    generatedBriefRepoPath: repoPath("image-briefs/generated", `${id}.json`),
    articleRepoPath: repoPath("content/ko/automation", `${topic.slug}.md`),
  };
}

export function buildInternalLinkRoutes(topic: ContentSeriesTopic) {
  const uniqueSlugs = Array.from(new Set([topic.internalLinks.seriesHub, topic.internalLinks.previous, ...topic.internalLinks.required]));
  return uniqueSlugs.filter(Boolean).map((slug) => `/ko/automation/${slug}`);
}

const seriesLinkLabels: Record<string, string> = {
  "free-open-source-automation-tools-series": "무료 오픈소스 자동화 도구 시리즈",
  "activepieces-ai-business-automation-n8n-alternative": "Activepieces 업무 자동화 분석",
  "opencut-free-open-source-video-editor-ai-content-automation": "OpenCut 콘텐츠 자동화 분석",
  "node-red-local-business-automation-server": "Node-RED 로컬 업무 자동화 분석",
  "huginn-monitoring-automation-agent": "Huginn 모니터링 자동화 에이전트 분석",
  "baserow-open-source-database-automation": "Baserow 데이터베이스 자동화 분석",
  "appsmith-internal-dashboard-automation": "Appsmith 내부 대시보드 자동화 분석",
  "windmill-developer-workflow-automation": "Windmill 개발자 워크플로 자동화 분석",
  "kestra-data-ai-workflow-orchestration": "Kestra 데이터·AI 워크플로 오케스트레이션 분석",
};

function labelForSeriesRoute(route: string, fallbackToolName: string) {
  const slug = route.replace("/ko/automation/", "");
  return seriesLinkLabels[slug] ?? `${fallbackToolName} 관련 자동화 글`;
}

export function buildContentSeriesPlan(
  state: ContentSeriesState,
  topic: ContentSeriesTopic,
  options: { planOnly?: boolean } = {},
): ContentSeriesPlan {
  const publicationBlockers = assertTopicCanPublish(state, topic, options);
  return {
    topic,
    branchName: state.mergePolicy.branchPattern.replace("<topic-slug>", topic.slug),
    commitMessage: state.mergePolicy.commitMessagePattern.replace("<tool-name>", topic.toolName),
    imagePaths: buildImagePaths(topic),
    internalLinkRoutes: buildInternalLinkRoutes(topic),
    validationCommands: [...CONTENT_SERIES_VALIDATION_COMMANDS],
    publicationBlockers,
  };
}

export function advanceContentSeriesStateAfterPublication(
  state: ContentSeriesState,
  topics: ContentSeriesTopic[],
  topic: ContentSeriesTopic,
): ContentSeriesState {
  const completed = state.completed.includes(topic.slug) ? [...state.completed] : [...state.completed, topic.slug];
  const completedSet = new Set(completed);
  const knownTopicSlugs = new Set(topics.map((candidate) => candidate.slug));
  const next = state.next.filter((slug) => slug !== topic.slug && !completedSet.has(slug) && knownTopicSlugs.has(slug));

  return {
    ...state,
    completed,
    currentTopic: next[0] ?? topic.slug,
    next,
  };
}

function markdownList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function yamlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`;
}

export function buildArticleMarkdown(topic: ContentSeriesTopic, publishedAt: string) {
  const relatedPosts = Array.from(
    new Set([
      topic.internalLinks.seriesHub,
      topic.internalLinks.previous,
      "activepieces-ai-business-automation-n8n-alternative",
      "opencut-free-open-source-video-editor-ai-content-automation",
    ].filter((slug) => slug && slug !== topic.slug)),
  ).slice(0, 4);

  const outlineSections = topic.articleOutline
    .map((section) => `## ${section.heading}\n\n${section.points.map((point) => `${point}`).join("\n\n")}`)
    .join("\n\n");
  const scenarioPoints = topic.articleOutline.flatMap((section) => section.points).slice(0, 3);
  const authoritySections = [
    `## 문제 정의\n\n${topic.toolName}을 검토하는 이유는 새 도구를 하나 더 늘리기 위해서가 아닙니다. 반복되는 내부 업무를 줄이고, 운영자가 확인해야 하는 데이터와 승인 흐름을 한 화면에서 다룰 수 있는지 판단하기 위해서입니다.`,
    `## 핵심 개념\n\n핵심은 ${topic.toolName} 자체보다 연결 구조입니다. 데이터 원천, 권한, 승인 화면, 자동화 로그, 예외 처리 기준이 분리되어 있어야 실제 운영에서 안전하게 테스트할 수 있습니다.`,
    `## 현장 시나리오\n\n${scenarioPoints.join("\n\n")}`,
    `## 실행 절차\n\n1. 공식 문서와 라이선스를 먼저 확인합니다.\n2. 샘플 데이터로 내부 화면 또는 자동화 흐름을 구성합니다.\n3. 권한, 로그, 백업, 장애 대응 기준을 검토합니다.\n4. 실제 고객 데이터 연결은 별도 승인 뒤에 진행합니다.`,
    `## 자동화 구조\n\n입력 데이터, 내부 검토 화면, 승인 액션, 결과 기록을 분리해 설계합니다. 이 구조를 지켜야 Activepieces, Node-RED, Baserow 같은 다른 도구와 연결해도 책임 범위가 흐려지지 않습니다.`,
    `## 리스크와 방지책\n\n가장 큰 리스크는 무료 오픈소스라는 이유로 운영 권한을 너무 빨리 넘기는 것입니다. 테스트 단계에서는 샘플 데이터, 제한 계정, 별도 로그, 백업 계획을 기준으로 검증해야 합니다.`,
    `## 도입 순서\n\n먼저 읽기 전용 대시보드나 내부 검토 화면으로 시작합니다. 이후 반복 작업 감소 효과가 확인되면 승인 버튼, 알림, 외부 시스템 연결처럼 위험도가 높은 기능을 단계적으로 붙이는 편이 안전합니다.`,
  ].join("\n\n");

  const officialSources = topic.officialSources
    .map((source) => `- [${source.label}](${source.url}) - ${source.usage}`)
    .join("\n");

  const safetyNotes = markdownList(topic.safetyNotes);
  const licenseNotes = markdownList(topic.licenseCautionNotes);
  const internalLinks = buildInternalLinkRoutes(topic)
    .map((route) => `- [${labelForSeriesRoute(route, topic.toolName)}](${route})`)
    .join("\n");

  return `---\ntitle: ${yamlString(topic.title)}\ndescription: ${yamlString(topic.description)}\nslug: ${topic.slug}\nlocale: ko\ncategory: automation\ncluster: open-source-automation-tools\ntype: ${topic.type}\nstatus: published\ndraft: false\nauthor: Biz2Lab\npublishedAt: '${publishedAt}'\nupdatedAt: '${publishedAt}'\ntags:\n${topic.tags.map((tag) => `  - ${tag}`).join("\n")}\nheroImage: /images/posts/${topic.slug}-hero.webp\nheroAlt: ${topic.imageConcept.altKo}\ncanonical: 'https://www.biz2lab.com/ko/automation/${topic.slug}'\nnoindex: false\nrelatedPosts:\n${relatedPosts.map((slug) => `  - ${slug}`).join("\n")}\ntemplateCta: 오픈소스 자동화 도구 검증 체크리스트\nnextStep:\n  label: 자동화 상담 문의\n  href: /ko/contact\n  description: 반복 업무와 콘텐츠 제작 흐름을 실제 운영 기준으로 점검합니다.\nfaq:\n  - question: ${topic.toolName}을 바로 실운영 핵심 도구로 써도 되나요?\n    answer: 바로 고정하기보다 로컬 테스트, 권한, 보안, 백업, 라이선스 확인을 거친 뒤 단계적으로 판단하는 편이 안전합니다.\n  - question: 무료 오픈소스라는 이유만으로 상업적 사용이 가능한가요?\n    answer: 아닙니다. 공식 저장소의 현재 라이선스와 hosted 또는 enterprise 약관을 별도로 확인해야 합니다.\n  - question: ${topic.toolName}을 자동화 파이프라인에 붙일 때 먼저 확인할 기준은 무엇인가요?\n    answer: 실제 운영 데이터 대신 샘플 데이터로 권한, 로그, 백업, 반복 작업 감소 효과를 먼저 확인해야 합니다.\n---\n\n# ${topic.title}\n\n${topic.description}\n\n이 글은 단순한 도구 추천이 아니라 Biz2Lab / MyBiz 관점에서 ${topic.toolName}을 실제 업무 자동화 파이프라인에 붙일 수 있는지 검토하는 분석 글입니다. 무료 여부보다 중요한 것은 라이선스, 운영 안정성, 데이터 보안, 반복 작업 감소 효과입니다.\n\n${authoritySections}\n\n${outlineSections}\n\n## 공식 출처 확인 포인트\n\n${officialSources}\n\n## Biz2Lab / MyBiz 적용 기준\n\n${topic.toolName}은 자동화 후보 도구입니다. 다만 고객 데이터, 결제, 외부 메시지, 운영 서버에 직접 연결하는 단계는 별도의 승인과 보안 검토가 필요합니다.\n\n### 안전 게이트\n\n${safetyNotes}\n\n### 라이선스 확인 메모\n\n${licenseNotes}\n\n## 무료 오픈소스 자동화 도구 시리즈\n\n${internalLinks}\n\n한 줄 결론은 명확합니다. ${topic.toolName}은 지금 당장 모든 운영을 맡길 완성형 핵심 도구라기보다, Biz2Lab / MyBiz 자동화 파이프라인에 붙일 수 있는지 검증할 후보 도구입니다.\n`;
}

function buildImageBrief(topic: ContentSeriesTopic): ImageBrief & {
  filename: string;
  rawPath: string;
  visualDifferentiationHint: string;
} {
  const paths = buildImagePaths(topic);
  const includeText = topic.imageConcept.mustInclude.join(", ");
  const avoidText = topic.imageConcept.mustAvoid.join(", ");
  return {
    id: `${topic.slug}-hero`,
    postSlug: topic.slug,
    category: "automation",
    usage: "hero",
    targetPath: paths.rawRepoPath,
    optimizedPath: paths.publicRepoPath,
    altKo: topic.imageConcept.altKo,
    captionKo: topic.imageConcept.captionKo,
    style: `${topic.imageConcept.visualFamily}, Korean business editorial raster hero, minimal text, no title inside image`,
    promptKo: topic.imageConcept.promptSummaryKo,
    providerPromptKo: `${topic.title} 대표 이미지. ${topic.imageConcept.promptSummaryKo} Include: ${includeText}. No official logos, no real customer data, no placeholder elements.`,
    negativePromptKo: `${avoidText}, official logo, third-party logo, real customer data, secrets, dense text, distorted text, watermark`,
    visualReferenceStyle: "Korean business automation editorial hero image, practical workflow map, polished SaaS operations visual, minimal text",
    composition: topic.imageConcept.promptSummaryKo,
    categoryStyle: `automation category visual, ${topic.imageConcept.visualFamily}`,
    expectedOutput: "Real raster source image saved as JPG and optimized to 1200px WebP hero image",
    textPolicy: "minimal Korean text only; avoid dense text blocks.",
    localOnly: true,
    visualDifferentiationHint: `${topic.slug}: ${topic.imageConcept.visualFamily}`,
    filename: `${topic.slug}-hero.jpg`,
    rawPath: paths.rawRepoPath,
  };
}

export function buildImageRequestMarkdown(topic: ContentSeriesTopic) {
  const brief = buildImageBrief(topic);
  return `# ${topic.title} hero image request\n\n- slug: ${topic.slug}\n- raw target: ${brief.targetPath}\n- public target: ${brief.optimizedPath}\n- alt: ${brief.altKo}\n\n## Concept\n\n${topic.imageConcept.promptSummaryKo}\n\n## Must Include\n\n${markdownList(topic.imageConcept.mustInclude)}\n\n## Must Avoid\n\n${markdownList(topic.imageConcept.mustAvoid)}\n\n## Safety\n\n${markdownList(topic.safetyNotes)}\n`;
}

export function buildImagePromptMarkdown(topic: ContentSeriesTopic) {
  const brief = buildImageBrief(topic);
  return `# ${topic.slug}-hero prompt package\n\n## Provider prompt\n\n${brief.providerPromptKo}\n\n## Negative prompt\n\n${brief.negativePromptKo}\n\n## Text policy\n\n${brief.textPolicy}\n\n## Output\n\n- Raw: ${brief.targetPath}\n- Optimized: ${brief.optimizedPath}\n`;
}

function writeImagePromptPackage(rootDir: string, topic: ContentSeriesTopic) {
  const paths = buildImagePaths(topic);
  const brief = buildImageBrief(topic);
  writeTextFile(rootDir, paths.requestRepoPath, buildImageRequestMarkdown(topic));
  writeTextFile(rootDir, paths.promptRepoPath, buildImagePromptMarkdown(topic));
  writeJsonFile(rootDir, paths.generatedBriefRepoPath, brief);
  return brief;
}

function collectFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectFiles(fullPath);
    }
    return entry.isFile() ? [fullPath] : [];
  });
}

type ArtifactSelectionOptions = {
  explicitArtifact?: string;
  artifactDir?: string;
  useLatestCodexArtifact?: boolean;
};

type ArtifactValidationOptions = {
  allowSingleImageDirectoryMatch?: boolean;
  requireAllowedDiscoveryLocation?: boolean;
  rootDir?: string;
};

type ArtifactMatch = {
  filePath: string;
  matchedBy: "filename" | "manifest" | "single-image-directory";
  mtimeMs: number;
};

const artifactManifestNames = [
  "manifest.json",
  "codex-image-manifest.json",
  "image-manifest.json",
] as const;

const localOnlyCommitPathPrefixes = [
  ".codex-remote-attachments/",
  ".codex/generated_images/",
  "artifacts/codex-images/",
  "data/content-series-run-state.json",
  "generated/",
  "output/",
  "tmp/",
] as const;

function normalizeAbsolutePath(filePath: string) {
  return path.resolve(filePath);
}

function resolveArtifactPath(rootDir: string, inputPath: string) {
  return path.isAbsolute(inputPath)
    ? normalizeAbsolutePath(inputPath)
    : normalizeAbsolutePath(absolutePath(rootDir, inputPath.replaceAll("\\", "/")));
}

function pathIsInside(candidatePath: string, rootPath: string) {
  const candidate = normalizeAbsolutePath(candidatePath);
  const root = normalizeAbsolutePath(rootPath);
  const relativePath = path.relative(root, candidate);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function uniquePaths(filePaths: string[]) {
  return Array.from(new Set(filePaths.map((filePath) => normalizeAbsolutePath(filePath))));
}

export function codexArtifactDiscoveryRoots(rootDir = process.cwd(), state?: ContentSeriesState) {
  void rootDir;
  void state;
  const configuredCodexGeneratedRoot = process.env.CODEX_GENERATED_IMAGE_ROOT ?? process.env.CODEX_GENERATED_IMAGES_DIR;
  const homeGeneratedImages = configuredCodexGeneratedRoot
    ? path.resolve(configuredCodexGeneratedRoot)
    : path.join(os.homedir(), ".codex", "generated_images");
  return uniquePaths([homeGeneratedImages]);
}

function isSupportedArtifactExtension(filePath: string, state: ContentSeriesState) {
  const ext = path.extname(filePath).toLowerCase();
  return state.imagePolicy.allowedArtifactExtensions
    .map((value) => value.toLowerCase())
    .includes(ext);
}

function isManifestFile(filePath: string) {
  return artifactManifestNames.includes(path.basename(filePath) as (typeof artifactManifestNames)[number]);
}

function looksLikeImagePath(value: string) {
  return /\.(jpe?g|png|webp)$/i.test(value);
}

function normalizeManifestSlug(value: string) {
  return value.endsWith("-hero") ? value.slice(0, -"-hero".length) : value;
}

function slugMatches(value: string | undefined, topic: ContentSeriesTopic) {
  if (!value) {
    return false;
  }
  return normalizeManifestSlug(value.trim()) === topic.slug;
}

function readJsonIfExists(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
  } catch {
    return null;
  }
}

function manifestRecords(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item));
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return [];
  }

  const record = payload as Record<string, unknown>;
  for (const key of ["images", "artifacts", "files", "items"]) {
    if (Array.isArray(record[key])) {
      return manifestRecords(record[key]);
    }
  }

  const records: Record<string, unknown>[] = [];
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string") {
      if (looksLikeImagePath(key)) {
        records.push({ file: key, slug: value });
      } else if (looksLikeImagePath(value)) {
        records.push({ file: value, slug: key });
      } else {
        records.push({ key, slug: value });
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      records.push({ key, ...(value as Record<string, unknown>) });
    }
  }
  return records;
}

function manifestFileValue(record: Record<string, unknown>) {
  for (const key of ["file", "filename", "path", "src", "artifact", "output"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return undefined;
}

function manifestSlugValue(record: Record<string, unknown>) {
  for (const key of ["slug", "postSlug", "topicSlug", "targetSlug"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  const key = record.key;
  if (typeof key === "string" && !looksLikeImagePath(key) && key.trim()) {
    return key;
  }
  const id = record.id;
  if (typeof id === "string" && id.trim()) {
    return normalizeManifestSlug(id);
  }
  return undefined;
}

function manifestSlugForArtifact(filePath: string) {
  const directory = path.dirname(filePath);
  const basename = path.basename(filePath);

  for (const manifestName of artifactManifestNames) {
    const payload = readJsonIfExists(path.join(directory, manifestName));
    if (!payload) {
      continue;
    }
    for (const record of manifestRecords(payload)) {
      const fileValue = manifestFileValue(record);
      if (!fileValue || path.basename(fileValue) !== basename) {
        continue;
      }
      const slug = manifestSlugValue(record);
      if (slug) {
        return normalizeManifestSlug(slug);
      }
    }
  }

  return null;
}

function artifactFilenameMatchesTopic(filePath: string, topic: ContentSeriesTopic) {
  return path.basename(filePath).toLowerCase().includes(topic.slug.toLowerCase());
}

function assertAllowedDiscoveryLocation(rootDir: string, state: ContentSeriesState, filePath: string) {
  const allowedRoots = codexArtifactDiscoveryRoots(rootDir, state);
  if (!allowedRoots.some((allowedRoot) => pathIsInside(filePath, allowedRoot))) {
    throw new ContentSeriesError(
      "CODEX_ARTIFACT_PROVENANCE_REJECTED",
      `${filePath}: artifact path is outside the approved local Codex generated image root (${allowedRoots.join(", ")})`,
    );
  }
}

function hasImageMagic(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 12) {
    return false;
  }
  const header = buffer.subarray(0, 12);
  return (
    (header[0] === 0xff && header[1] === 0xd8) ||
    header.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])) ||
    (header.subarray(0, 4).toString("ascii") === "RIFF" && header.subarray(8, 12).toString("ascii") === "WEBP")
  );
}

export function assertValidCodexImageArtifact(
  filePath: string,
  topic: ContentSeriesTopic,
  state: ContentSeriesState,
  options: ArtifactValidationOptions = {},
) {
  if (!fs.existsSync(filePath)) {
    throw new ContentSeriesError("CODEX_GENERATED_IMAGE_ARTIFACT_MISSING", `Image artifact does not exist: ${filePath}`);
  }

  if (options.requireAllowedDiscoveryLocation) {
    assertAllowedDiscoveryLocation(options.rootDir ?? process.cwd(), state, filePath);
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath).toLowerCase();
  const allowedExtensions = new Set(state.imagePolicy.allowedArtifactExtensions.map((value) => value.toLowerCase()));

  if (!allowedExtensions.has(ext)) {
    throw new ContentSeriesError("CODEX_ARTIFACT_UNSUPPORTED_FORMAT", `${filePath}: unsupported artifact extension ${ext}`);
  }

  if (stat.size < 4096) {
    throw new ContentSeriesError("CODEX_ARTIFACT_PLACEHOLDER_REJECTED", `${filePath}: artifact is too small to be a real hero image`);
  }

  for (const term of state.imagePolicy.rejectPlaceholderTerms) {
    if (basename.includes(term.toLowerCase())) {
      throw new ContentSeriesError("CODEX_ARTIFACT_PLACEHOLDER_REJECTED", `${filePath}: placeholder term rejected: ${term}`);
    }
  }

  if (!hasImageMagic(filePath)) {
    throw new ContentSeriesError("CODEX_ARTIFACT_UNSUPPORTED_FORMAT", `${filePath}: artifact is not a supported binary image`);
  }

  const manifestSlug = manifestSlugForArtifact(filePath);
  if (manifestSlug && !slugMatches(manifestSlug, topic)) {
    throw new ContentSeriesError(
      "CODEX_ARTIFACT_SLUG_MISMATCH",
      `${filePath}: manifest maps artifact to ${manifestSlug}, not ${topic.slug}`,
    );
  }

  if (
    state.imagePolicy.requireSlugInFilename &&
    !options.allowSingleImageDirectoryMatch &&
    !manifestSlug &&
    !artifactFilenameMatchesTopic(filePath, topic)
  ) {
    throw new ContentSeriesError("CODEX_ARTIFACT_SLUG_MISMATCH", `${filePath}: artifact filename or manifest must match ${topic.slug}`);
  }
}

function artifactMatchForFile(
  rootDir: string,
  topic: ContentSeriesTopic,
  state: ContentSeriesState,
  filePath: string,
  options: ArtifactValidationOptions = {},
): ArtifactMatch | null {
  const manifestSlug = manifestSlugForArtifact(filePath);
  const matchedBy = manifestSlug && slugMatches(manifestSlug, topic)
      ? "manifest"
      : artifactFilenameMatchesTopic(filePath, topic)
        ? "filename"
        : options.allowSingleImageDirectoryMatch
          ? "single-image-directory"
          : null;

  if (!matchedBy) {
    if (manifestSlug && !slugMatches(manifestSlug, topic)) {
      throw new ContentSeriesError(
        "CODEX_ARTIFACT_SLUG_MISMATCH",
        `${filePath}: manifest maps artifact to ${manifestSlug}, not ${topic.slug}`,
      );
    }
    return null;
  }

  if (options.requireAllowedDiscoveryLocation) {
    assertAllowedDiscoveryLocation(rootDir, state, filePath);
  }
  assertValidCodexImageArtifact(filePath, topic, state, {
    ...options,
    requireAllowedDiscoveryLocation: false,
  });
  return {
    filePath,
    matchedBy,
    mtimeMs: fs.statSync(filePath).mtimeMs,
  };
}

function collectArtifactDirectoryMatches(
  rootDir: string,
  topic: ContentSeriesTopic,
  state: ContentSeriesState,
  directoryPath: string,
) {
  const directory = resolveArtifactPath(rootDir, directoryPath);
  assertAllowedDiscoveryLocation(rootDir, state, directory);
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    throw new ContentSeriesError("CODEX_GENERATED_IMAGE_ARTIFACT_MISSING", `${directoryPath}: artifact directory does not exist`);
  }

  const files = collectFiles(directory).filter((filePath) => !isManifestFile(filePath));
  const imageFiles = files.filter((filePath) => isSupportedArtifactExtension(filePath, state));
  const unsupportedFiles = files.filter((filePath) => !isSupportedArtifactExtension(filePath, state));

  if (imageFiles.length === 0) {
    if (unsupportedFiles.length > 0) {
      throw new ContentSeriesError("CODEX_ARTIFACT_UNSUPPORTED_FORMAT", `${directoryPath}: no supported image files found`);
    }
    throw new ContentSeriesError("CODEX_GENERATED_IMAGE_ARTIFACT_MISSING", `${directoryPath}: no image artifacts found`);
  }

  if (imageFiles.length === 1) {
    const match = artifactMatchForFile(rootDir, topic, state, imageFiles[0], {
      allowSingleImageDirectoryMatch: true,
    });
    return match ? [match] : [];
  }

  const matches: ArtifactMatch[] = [];
  let firstSlugMismatch: ContentSeriesError | null = null;
  for (const imageFile of imageFiles) {
    try {
      const match = artifactMatchForFile(rootDir, topic, state, imageFile);
      if (match) {
        matches.push(match);
      }
    } catch (error) {
      if (error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_SLUG_MISMATCH") {
        firstSlugMismatch ??= error;
      } else if (error instanceof ContentSeriesError) {
        throw error;
      } else {
        throw error;
      }
    }
  }
  if (matches.length === 0 && firstSlugMismatch) {
    throw firstSlugMismatch;
  }
  return matches;
}

function findArtifactInDirectory(
  rootDir: string,
  topic: ContentSeriesTopic,
  state: ContentSeriesState,
  directoryPath: string,
) {
  const matches = collectArtifactDirectoryMatches(rootDir, topic, state, directoryPath);
  if (matches.length === 0) {
    throw new ContentSeriesError("CODEX_GENERATED_IMAGE_ARTIFACT_MISSING", `${directoryPath}: no artifact matched ${topic.slug}`);
  }
  if (matches.length > 1) {
    throw new ContentSeriesError(
      "CODEX_ARTIFACT_AUTO_DISCOVERY_AMBIGUOUS",
      `Multiple matching artifacts found for ${topic.slug}: ${matches.map((match) => match.filePath).join(", ")}`,
    );
  }
  return matches[0].filePath;
}

function findLatestCodexArtifact(rootDir: string, topic: ContentSeriesTopic, state: ContentSeriesState) {
  const roots = codexArtifactDiscoveryRoots(rootDir, state).filter((directory) => fs.existsSync(directory));
  const allFiles = roots.flatMap((directory) => collectFiles(directory)).filter((filePath) => !isManifestFile(filePath));
  const slugNamedUnsupported = allFiles.filter(
    (filePath) => artifactFilenameMatchesTopic(filePath, topic) && !isSupportedArtifactExtension(filePath, state),
  );
  if (slugNamedUnsupported.length > 0) {
    throw new ContentSeriesError(
      "CODEX_ARTIFACT_UNSUPPORTED_FORMAT",
      `${slugNamedUnsupported[0]}: unsupported artifact extension`,
    );
  }

  const matches: ArtifactMatch[] = [];
  for (const filePath of allFiles.filter((candidate) => isSupportedArtifactExtension(candidate, state))) {
    try {
      const match = artifactMatchForFile(rootDir, topic, state, filePath, {
        requireAllowedDiscoveryLocation: true,
      });
      if (match) {
        matches.push(match);
      }
    } catch (error) {
      if (
        error instanceof ContentSeriesError &&
        error.code === "CODEX_ARTIFACT_SLUG_MISMATCH" &&
        artifactFilenameMatchesTopic(filePath, topic)
      ) {
        throw error;
      }
      if (error instanceof ContentSeriesError && error.code !== "CODEX_ARTIFACT_SLUG_MISMATCH") {
        throw error;
      }
    }
  }

  if (matches.length === 0) {
    throw new ContentSeriesError(
      "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING",
      `No approved Codex image artifact found for ${topic.slug}. Searched: ${roots.join(", ") || "no existing discovery roots"}`,
    );
  }
  if (matches.length > 1) {
    throw new ContentSeriesError(
      "CODEX_ARTIFACT_AUTO_DISCOVERY_AMBIGUOUS",
      `Multiple matching artifacts found for ${topic.slug}: ${matches.map((match) => match.filePath).join(", ")}`,
    );
  }

  return matches[0].filePath;
}

function findConfiguredRootArtifact(rootDir: string, topic: ContentSeriesTopic, state: ContentSeriesState) {
  return findLatestCodexArtifact(rootDir, topic, state);
}

export function findCodexImageArtifact(
  rootDir: string,
  topic: ContentSeriesTopic,
  state: ContentSeriesState,
  selection: ArtifactSelectionOptions = {},
) {
  if (selection.explicitArtifact) {
    const artifactPath = resolveArtifactPath(rootDir, selection.explicitArtifact);
    assertValidCodexImageArtifact(artifactPath, topic, state, {
      requireAllowedDiscoveryLocation: true,
      rootDir,
    });
    return artifactPath;
  }

  if (selection.artifactDir) {
    return findArtifactInDirectory(rootDir, topic, state, selection.artifactDir);
  }

  if (selection.useLatestCodexArtifact) {
    return findLatestCodexArtifact(rootDir, topic, state);
  }

  return findConfiguredRootArtifact(rootDir, topic, state);
}

export async function importCodexImageArtifact(
  rootDir: string,
  topic: ContentSeriesTopic,
  artifactPath: string,
) {
  const paths = buildImagePaths(topic);
  const targetAbsolutePath = absolutePath(rootDir, paths.rawRepoPath);
  fs.mkdirSync(path.dirname(targetAbsolutePath), { recursive: true });
  await sharp(artifactPath)
    .rotate()
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(targetAbsolutePath);
  const image = sharp(targetAbsolutePath);
  let metadata: sharp.Metadata;
  try {
    metadata = await image.metadata();
  } finally {
    image.destroy();
  }
  return {
    source: artifactPath,
    target: paths.rawRepoPath,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    format: metadata.format,
  };
}

function upsertImageBrief(rootDir: string, brief: ImageBrief & { filename: string; rawPath: string }) {
  const briefFile = readJsonFile<{ version: number; project: string; language: string; policy: string; briefs: ImageBrief[] }>(
    rootDir,
    "image-briefs/biz2lab-article-image-briefs.json",
  );
  const nextBriefs = briefFile.briefs.filter((candidate) => candidate.id !== brief.id);
  nextBriefs.push(brief);
  writeJsonFile(rootDir, "image-briefs/biz2lab-article-image-briefs.json", {
    ...briefFile,
    briefs: nextBriefs,
  });
}

export function buildImageAssetEntry(
  topic: ContentSeriesTopic,
  dimensions: { width?: number; height?: number } = {},
) {
  const paths = buildImagePaths(topic);
  return {
    id: `${topic.slug}-hero`,
    project: "biz2lab",
    postSlug: topic.slug,
    usage: "hero",
    src: `/images/posts/${topic.slug}-hero.webp`,
    rawPath: paths.rawRepoPath,
    altKo: topic.imageConcept.altKo,
    captionKo: topic.imageConcept.captionKo,
    width: dimensions.width ?? 1200,
    height: dimensions.height ?? 675,
    format: "webp",
    licenseStatus: "codex-image-skill-generated",
    source: "Codex built-in image generation artifact",
    visualApprovalStatus: "codex-visual-sanity-pending",
    commerceAutoReusable: true,
    status: "active",
  };
}

function upsertImageAsset(rootDir: string, topic: ContentSeriesTopic, dimensions: { width?: number; height?: number }) {
  const assets = readJsonFile<ReturnType<typeof buildImageAssetEntry>[]>(rootDir, "data/image-assets.json");
  const entry = buildImageAssetEntry(topic, dimensions);
  writeJsonFile(rootDir, "data/image-assets.json", [...assets.filter((asset) => asset.id !== entry.id), entry]);
}

export function buildContentIndexEntry(topic: ContentSeriesTopic, updatedAt: string) {
  return {
    title: topic.title,
    slug: topic.slug,
    route: `/ko/automation/${topic.slug}`,
    category: topic.category,
    cluster: topic.cluster,
    type: topic.type,
    heroImage: `/images/posts/${topic.slug}-hero.webp`,
    heroAlt: topic.imageConcept.altKo,
    updatedAt,
    relatedPosts: Array.from(
      new Set([
        topic.internalLinks.seriesHub,
        topic.internalLinks.previous,
        "activepieces-ai-business-automation-n8n-alternative",
        "opencut-free-open-source-video-editor-ai-content-automation",
      ].filter((slug) => slug && slug !== topic.slug)),
    ).slice(0, 4),
  };
}

function buildArticleImageConceptEntry(topic: ContentSeriesTopic) {
  const labels = [...topic.imageConcept.mustInclude, "approval"].slice(0, 4);
  while (labels.length < 4) {
    labels.push("workflow");
  }
  return `  "${topic.slug}": {\n    slug: "${topic.slug}",\n    category: "automation",\n    visualFamily: "${topic.imageConcept.visualFamily}",\n    conceptKo: "${topic.imageConcept.promptSummaryKo.replaceAll('"', '\\"')}",\n    altKo: "${topic.imageConcept.altKo.replaceAll('"', '\\"')}",\n    captionKo: "${topic.imageConcept.captionKo.replaceAll('"', '\\"')}",\n    labels: [${labels.map((label) => `"${label.replaceAll('"', '\\"')}"`).join(", ")}],\n    palette: automationPalette,\n  },\n`;
}

export function insertArticleImageConceptEntry(current: string, topic: ContentSeriesTopic) {
  if (current.includes(`"${topic.slug}":`)) {
    return current;
  }
  const lineBreak = current.includes("\r\n") ? "\r\n" : "\n";
  const entry = buildArticleImageConceptEntry(topic).replaceAll("\n", lineBreak);
  const next = current.replace(
    /(\r?\n)(};)(\r?\n\r?\nexport const articleImageConceptEntries(?=[:\s=]))/,
    `${lineBreak}${entry}$2$3`,
  );
  if (next === current) {
    throw new ContentSeriesError("CONCEPT_UPDATE_FAILED", "Could not locate articleImageConcepts object terminator");
  }
  return next;
}

function upsertArticleImageConcept(rootDir: string, topic: ContentSeriesTopic) {
  const conceptPath = "lib/article-image-concepts.ts";
  const current = fs.readFileSync(absolutePath(rootDir, conceptPath), "utf8");
  const next = insertArticleImageConceptEntry(current, topic);
  if (next === current) {
    return;
  }
  fs.writeFileSync(absolutePath(rootDir, conceptPath), next, "utf8");
}

const automationSeriesSectionHeading = "## 무료 오픈소스 자동화 도구 시리즈";

function markdownHeadingLevel(line: string) {
  const match = line.match(/^(#{1,6})\s+/);
  return match ? match[1].length : undefined;
}

function markdownSectionEnd(lines: string[], startIndex: number) {
  const currentLevel = markdownHeadingLevel(lines[startIndex]) ?? 2;
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const level = markdownHeadingLevel(lines[index]);
    if (level !== undefined && level <= currentLevel) {
      return index;
    }
  }
  return lines.length;
}

function markdownLinkTarget(line: string) {
  return line.match(/\]\(([^)]+)\)/)?.[1];
}

export function insertSeriesLinkIntoSection(content: string, topic: ContentSeriesTopic) {
  const lineBreak = content.includes("\r\n") ? "\r\n" : "\n";
  const route = `/ko/automation/${topic.slug}`;
  const topicLink = `- [${topic.title}](${route})`;
  const lines = content.split(/\r?\n/);
  const sectionStartIndexes = lines
    .map((line, index) => (line.trim() === automationSeriesSectionHeading ? index : -1))
    .filter((index) => index >= 0);

  if (sectionStartIndexes.length === 0) {
    return `${content.trimEnd()}${lineBreak}${lineBreak}${automationSeriesSectionHeading}${lineBreak}${lineBreak}${topicLink}${lineBreak}`;
  }

  const firstSectionStart = sectionStartIndexes[0];
  const firstSectionEnd = markdownSectionEnd(lines, firstSectionStart);
  const linksByTarget = new Map<string, string>();
  const addLink = (line: string) => {
    const target = markdownLinkTarget(line);
    if (target && !linksByTarget.has(target)) {
      linksByTarget.set(target, line.trim());
    }
  };

  for (const line of lines.slice(firstSectionStart + 1, firstSectionEnd)) {
    if (line.trim().startsWith("- [")) {
      addLink(line);
    }
  }
  for (const duplicateStart of sectionStartIndexes.slice(1)) {
    const duplicateEnd = markdownSectionEnd(lines, duplicateStart);
    for (const line of lines.slice(duplicateStart + 1, duplicateEnd)) {
      if (line.trim().startsWith("- [")) {
        addLink(line);
      }
    }
  }
  if (!linksByTarget.has(route)) {
    linksByTarget.set(route, topicLink);
  }

  const firstSectionRemainder = lines
    .slice(firstSectionStart + 1, firstSectionEnd)
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("- ["));
  const replacementSection = [
    automationSeriesSectionHeading,
    "",
    ...Array.from(linksByTarget.values()),
    "",
    ...(firstSectionRemainder.length > 0 ? ["", ...firstSectionRemainder] : []),
  ];

  const nextLines: string[] = [];
  for (let index = 0; index < lines.length;) {
    if (index === firstSectionStart) {
      nextLines.push(...replacementSection);
      index = firstSectionEnd;
      continue;
    }
    if (sectionStartIndexes.slice(1).includes(index)) {
      index = markdownSectionEnd(lines, index);
      continue;
    }
    nextLines.push(lines[index]);
    index += 1;
  }

  return `${nextLines.join(lineBreak).trimEnd()}${lineBreak}`;
}

function appendSeriesLinkIfMissing(rootDir: string, repoRelativePath: string, topic: ContentSeriesTopic) {
  const absoluteFilePath = absolutePath(rootDir, repoRelativePath);
  if (!fs.existsSync(absoluteFilePath)) {
    return;
  }
  const content = fs.readFileSync(absoluteFilePath, "utf8");
  const next = insertSeriesLinkIntoSection(content, topic);
  if (next === content) {
    return;
  }
  fs.writeFileSync(absoluteFilePath, next, "utf8");
}

function updateInternalLinks(rootDir: string, topic: ContentSeriesTopic) {
  appendSeriesLinkIfMissing(rootDir, "content/ko/automation/free-open-source-automation-tools-series.md", topic);
  if (topic.internalLinks.previous) {
    appendSeriesLinkIfMissing(rootDir, `content/ko/automation/${topic.internalLinks.previous}.md`, topic);
  }
}

function appendQueueRow(rootDir: string, topic: ContentSeriesTopic) {
  const paths = buildImagePaths(topic);
  const row = `| 2 | ${topic.slug} | hero | ${paths.requestRepoPath} | ${paths.promptRepoPath} | ${paths.generatedBriefRepoPath} | ${paths.rawRepoPath} | ${paths.publicRepoPath} | yes | yes | yes | yes | yes | codex-pending-review | yes | no |\n`;
  const queuePath = "image-requests/generated/IMAGE_PRODUCTION_QUEUE.md";
  const queue = fs.readFileSync(absolutePath(rootDir, queuePath), "utf8");
  if (!queue.includes(`| ${topic.slug} | hero |`)) {
    appendTextFile(rootDir, queuePath, row);
  }

  const docsPath = "docs/image-engine/image-production-queue.md";
  const docs = fs.readFileSync(absolutePath(rootDir, docsPath), "utf8");
  if (!docs.includes(topic.slug)) {
    appendTextFile(
      rootDir,
      docsPath,
      `\nContent-series automation update: \`${topic.slug}\` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.\n`,
    );
  }
}

function runCommand(rootDir: string, command: string) {
  const [program, ...args] = command.split(" ");
  const invocation = resolveExecFileInvocation(program, args);
  execFileSync(invocation.program, invocation.args, { cwd: rootDir, stdio: "inherit", env: process.env });
}

function runValidationCommands(rootDir: string) {
  for (const command of CONTENT_SERIES_VALIDATION_COMMANDS) {
    runCommand(rootDir, command);
  }
}

function isProtectedCodexPath(filePath: string) {
  return filePath.startsWith(".codex-remote-attachments/") || filePath === ".codex/config.toml";
}

export function filterCommittablePaths(filePaths: string[]) {
  return filePaths.filter((filePath) => {
    const normalized = filePath.replaceAll("\\", "/");
    return (
      !isProtectedCodexPath(normalized) &&
      !localOnlyCommitPathPrefixes.some((prefix) => normalized.startsWith(prefix))
    );
  });
}

function listUnsafeWorkingTreeEntries(rootDir: string) {
  if (!fs.existsSync(path.join(rootDir, ".git"))) {
    return [];
  }
  return execFileSync("git", ["status", "--porcelain=v1"], { cwd: rootDir, encoding: "utf8" })
    .split(/\r?\n/)
    .map((line) => line.slice(3).trim())
    .filter(Boolean)
    .filter((filePath) => filterCommittablePaths([filePath]).length > 0);
}

function assertCleanWorktreeExceptProtected(rootDir: string) {
  const unsafeEntries = listUnsafeWorkingTreeEntries(rootDir);
  if (unsafeEntries.length > 0) {
    throw new ContentSeriesError(
      "WORKTREE_NOT_CLEAN",
      `Refusing to publish into a dirty worktree. Commit or stash these files first: ${unsafeEntries.join(", ")}`,
    );
  }
}

export function buildOptimizedHeroImageMetadata(
  topic: ContentSeriesTopic,
  importedImage: { width?: number; height?: number },
) {
  const rawWidth = importedImage.width ?? 0;
  const rawHeight = importedImage.height ?? 0;
  const width = rawWidth > 0 ? Math.min(1200, rawWidth) : 1200;
  const height = rawWidth > 0 && rawHeight > 0 ? Math.round((width * rawHeight) / rawWidth) : 675;
  return {
    path: buildImagePaths(topic).publicRepoPath,
    width,
    height,
    format: "webp",
  };
}

function assertPublicHeroImageExists(rootDir: string, repoRelativePath: string) {
  const absoluteFilePath = absolutePath(rootDir, repoRelativePath);
  if (!fs.existsSync(absoluteFilePath)) {
    throw new ContentSeriesError("PUBLIC_HERO_IMAGE_MISSING", `${repoRelativePath} was not created`);
  }
}

function commitAndMaybeCreatePr(rootDir: string, plan: ContentSeriesPlan, options: CliOptions) {
  if (options.noCommit) {
    return {};
  }

  const currentBranch = execFileSync("git", ["branch", "--show-current"], { cwd: rootDir, encoding: "utf8" }).trim();
  if (currentBranch !== plan.branchName) {
    execFileSync("git", ["checkout", "-B", plan.branchName], { cwd: rootDir, stdio: "inherit" });
  }
  const changedPaths = execFileSync("git", ["status", "--porcelain=v1"], { cwd: rootDir, encoding: "utf8" })
    .split(/\r?\n/)
    .map((line) => line.slice(3).trim())
    .filter(Boolean)
    .filter((filePath) => filterCommittablePaths([filePath]).length > 0);
  if (changedPaths.length === 0) {
    throw new ContentSeriesError("NO_CHANGES_TO_COMMIT", "No safe changed files found to commit");
  }
  execFileSync("git", ["add", "--", ...changedPaths], { cwd: rootDir, stdio: "inherit" });
  execFileSync("git", ["commit", "-m", plan.commitMessage], { cwd: rootDir, stdio: "inherit" });
  const commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: rootDir, encoding: "utf8" }).trim();
  execFileSync("git", ["push", "-u", "origin", plan.branchName], { cwd: rootDir, stdio: "inherit" });

  if (options.noPr) {
    return { commit };
  }

  const prBody = `## 0) Intent\nPublish the next Biz2Lab open-source automation series article with real hero image assets.\n\n## 1) Summary (Problem -> Solution -> Outcome)\n- Problem: The next series topic needs a real image-gated publication flow.\n- Solution: Generated the article, image packages, raw/public image assets, registries, and internal links through the content-series orchestrator.\n- Outcome: The article is ready for owner review. No deploy and no auto-merge were run.\n\n## 2) Changes\nChecklist:\n- [ ] Bug fix\n- [ ] Refactor / cleanup\n- [ ] Performance improvement\n- [ ] Security hardening\n- [x] DX / tooling\n- Added the ${plan.topic.toolName} automation analysis article and image assets.\n- Updated image/content registries and series links.\n\n## 3) Files Changed\n- ${plan.imagePaths.articleRepoPath} (new article)\n- ${plan.imagePaths.rawRepoPath} (real raw hero image)\n- ${plan.imagePaths.publicRepoPath} (optimized public hero WebP)\n- data/image-assets.json (image registry)\n- image brief/request files (image production metadata)\n\n## 4) Testing\n- Commands run: ${CONTENT_SERIES_VALIDATION_COMMANDS.join(", ")}\n- Verified real hero image import and public WebP generation.\n\n## 5) Risk Assessment\nRisk: Low to Medium. Content and image metadata only; no runtime business integration.\n- Potential breakpoints: article frontmatter, image path validation, internal links.\n- External dependencies: none called by this PR.\n- Data impact: none.\n\n## 6) Rollback Plan\n- Revert the commit to remove article, image assets, and registry updates.\n\n## 7) Deployment Notes\n- Required env vars: none\n- Required secrets: none\n- Migrations: none\n- Deploy steps: standard Git-triggered deployment only after owner merge.\n\n## 8) Follow-ups (Optional)\n- Run production smoke after merge.\n`;
  const prUrl = execFileSync(
    "gh",
    [
      "pr",
      "create",
      "--base",
      "master",
      "--head",
      plan.branchName,
      "--title",
      plan.commitMessage,
      "--body",
      prBody,
    ],
    { cwd: rootDir, encoding: "utf8" },
  ).trim();
  return { commit, prUrl };
}

export async function runContentSeriesOrchestrator(options: CliOptions = {}): Promise<ContentSeriesResult> {
  const rootDir = options.rootDir ?? process.cwd();
  const state = readContentSeriesState(rootDir);
  const topicFile = readContentSeriesTopics(rootDir);
  const topic = resolveContentSeriesTopic(topicFile.topics, state, options.topic);
  const plan = buildContentSeriesPlan(state, topic, { planOnly: options.planOnly });

  if (options.planOnly) {
    return { status: "PLAN", plan };
  }

  const artifactSelectors = [options.artifact, options.artifactDir, options.useLatestCodexArtifact].filter(Boolean);
  if (artifactSelectors.length > 1) {
    throw new ContentSeriesError("INVALID_ARGS", "Use only one artifact selector: --artifact, --artifact-dir, or --use-latest-codex-artifact");
  }

  const artifactPath = findCodexImageArtifact(rootDir, topic, state, {
    explicitArtifact: options.artifact,
    artifactDir: options.artifactDir,
    useLatestCodexArtifact: options.useLatestCodexArtifact,
  });
  if (!artifactPath) {
    throw new ContentSeriesError(
      "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING",
      `No approved Codex image artifact found for ${topic.slug}. Expected a real image under one of: ${state.imagePolicy.artifactSearchRoots.join(", ")}`,
    );
  }
  assertCleanWorktreeExceptProtected(rootDir);

  const importedImage = await importCodexImageArtifact(rootDir, topic, artifactPath);
  const publishedAt = new Date().toISOString().slice(0, 10);
  const brief = writeImagePromptPackage(rootDir, topic);
  upsertImageBrief(rootDir, brief);
  writeTextFile(rootDir, plan.imagePaths.articleRepoPath, buildArticleMarkdown(topic, publishedAt));
  upsertArticleImageConcept(rootDir, topic);
  updateInternalLinks(rootDir, topic);
  appendQueueRow(rootDir, topic);
  writeJsonFile(rootDir, "data/content-series-state.json", advanceContentSeriesStateAfterPublication(state, topicFile.topics, topic));
  runCommand(rootDir, "npm run optimize-images");
  assertPublicHeroImageExists(rootDir, plan.imagePaths.publicRepoPath);
  const publicImage = buildOptimizedHeroImageMetadata(topic, importedImage);
  upsertImageAsset(rootDir, topic, publicImage);
  runCommand(rootDir, "npm run generate-content-index");
  runValidationCommands(rootDir);
  const gitResult = commitAndMaybeCreatePr(rootDir, plan, options);
  return {
    status: "PASS",
    plan,
    importedImage,
    publicImage,
    ...gitResult,
  };
}

function parseArgs(argv: string[]): CliOptions & { help?: boolean } {
  const options: CliOptions & { help?: boolean } = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--topic") {
      options.topic = argv[index + 1];
      index += 1;
    } else if (arg === "--plan-only") {
      options.planOnly = true;
    } else if (arg === "--no-commit") {
      options.noCommit = true;
    } else if (arg === "--no-pr") {
      options.noPr = true;
    } else if (arg === "--artifact") {
      options.artifact = argv[index + 1];
      index += 1;
    } else if (arg === "--artifact-dir") {
      options.artifactDir = argv[index + 1];
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
  console.log(`Usage:\n  npm run content:series:auto -- --topic node-red --plan-only\n  npm run content:series:auto -- --topic node-red --no-commit --artifact "%USERPROFILE%\\.codex\\generated_images\\node-red-local-business-automation-server-hero.png"\n  npm run content:series:auto -- --topic node-red --no-commit --artifact-dir "%USERPROFILE%\\.codex\\generated_images\\node-red-review"\n  npm run content:series:auto -- --topic node-red --use-latest-codex-artifact\n\nOptions:\n  --topic <id-or-slug>        Topic id or slug from data/content-series-topics.json\n  --plan-only                 Print the plan without writing files\n  --no-commit                 Run publication without committing or creating a PR\n  --no-pr                     Commit and push, but do not create a PR\n  --artifact <path>           Explicit local Codex-generated image artifact under the approved Codex root\n  --artifact-dir <path>       Search one Codex-generated artifact directory under the approved Codex root\n  --use-latest-codex-artifact Search the approved local Codex generated image root for one matching image\n`);
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }
    const result = await runContentSeriesOrchestrator(options);
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
