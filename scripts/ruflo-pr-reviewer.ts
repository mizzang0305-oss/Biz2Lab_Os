import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const RUFLO_REVIEW_VALIDATION_COMMANDS = [
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
  "npm run image-skill:plan",
  "npm run image-skill:validate",
  "git diff --check",
] as const;

export const REQUIRED_REVIEW_SECTIONS = [
  "PR Metadata",
  "Changed Files",
  "Content Scope",
  "SEO Metadata Checks",
  "Hero Raw Public Image Checks",
  "Alt Text Checks",
  "Internal Link Checks",
  "Content Authority Section Checks",
  "Validation Command Checklist",
  "Production Smoke Checklist",
  "License Source Caution",
  "Forbidden Public Wording",
  "Admin Private Route Exposure Risk",
  "Safety Confirmation",
] as const;

export type ReviewerDecision =
  | "PASS_REVIEW"
  | "NEEDS_OWNER_REVIEW"
  | "BLOCKED_SCOPE_DRIFT"
  | "BLOCKED_SECURITY_RISK"
  | "BLOCKED_VALIDATION_GAP";

export type RufloStatus =
  | "RUFLO_NOT_CONFIGURED"
  | "RUFLO_CONFIGURED_NOT_RUN"
  | "RUFLO_REPORT_ONLY_COMPLETE"
  | "RUFLO_REPORT_ONLY_FAILED";

type ReviewerErrorCode = "PR_REQUIRED" | "INVALID_PR_NUMBER" | "UNSAFE_REPORT_PATH";

export class ReviewerError extends Error {
  constructor(
    public readonly code: ReviewerErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "ReviewerError";
  }
}

type PullRequestMetadata = {
  number: number;
  title: string;
  url: string;
  state: string;
  isDraft: boolean;
  author: string;
  headRefName: string;
  baseRefName: string;
};

type ReviewerOptions = {
  prNumber: number;
  dryRun: boolean;
  runValidation?: boolean;
  useRuflo?: boolean;
  rootDir?: string;
};

type ValidationResult = {
  command: string;
  status: "NOT_RUN" | "PASS" | "FAIL";
  detail: string;
};

type ReviewerDeps = {
  getPullRequest?: (prNumber: number, rootDir: string) => PullRequestMetadata;
  getChangedFiles?: (prNumber: number, rootDir: string) => string[];
  runCommand?: (command: string, rootDir: string) => { ok: boolean; output: string };
  runRuflo?: (args: string[], rootDir: string) => { ok: boolean; output: string };
  env?: NodeJS.ProcessEnv;
  now?: () => Date;
};

export type ReviewerResult = {
  decision: ReviewerDecision;
  reportPath: string;
  reportMarkdown: string;
  rufloStatus: RufloStatus;
  changedFiles: string[];
  validationResults: ValidationResult[];
};

type FileClassification = {
  contentFiles: string[];
  imageAssetFiles: string[];
  imageBriefFiles: string[];
  docsReportFiles: string[];
  testFiles: string[];
  scriptFiles: string[];
  schedulerFiles: string[];
  adminFiles: string[];
  envFiles: string[];
  packageOrConfigFiles: string[];
  apiOrDbFiles: string[];
  unknownFiles: string[];
};

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/").replace(/^\.\/+/, "");
}

function repoPath(rootDir: string, repoRelativePath: string) {
  return path.join(rootDir, ...normalizeRepoPath(repoRelativePath).split("/"));
}

function isPositiveIntegerText(value: string | undefined) {
  return Boolean(value && /^[1-9]\d*$/.test(value));
}

function assertValidPrNumber(prNumber: number) {
  if (!Number.isInteger(prNumber) || prNumber <= 0) {
    throw new ReviewerError("INVALID_PR_NUMBER", "PR number must be a positive integer.");
  }
}

export function buildSafeReportPath({
  rootDir = process.cwd(),
  prNumber,
}: {
  rootDir?: string;
  prNumber: number;
}) {
  assertValidPrNumber(prNumber);

  const reportRoot = path.resolve(rootDir, "reports", "ruflo-pr-review");
  const reportPath = path.resolve(reportRoot, `pr-${prNumber}.md`);
  const relativePath = path.relative(reportRoot, reportPath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new ReviewerError("UNSAFE_REPORT_PATH", "Report path must stay under reports/ruflo-pr-review.");
  }
  return reportPath;
}

export function parseReviewerArgs(argv: string[]): ReviewerOptions & { help?: boolean } {
  const options: Partial<ReviewerOptions> & { help?: boolean } = {
    dryRun: false,
    runValidation: false,
    useRuflo: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--run-validation") {
      options.runValidation = true;
    } else if (arg === "--use-ruflo") {
      options.useRuflo = true;
    } else if (arg === "--pr") {
      const value = argv[index + 1];
      if (!isPositiveIntegerText(value)) {
        throw new ReviewerError("INVALID_PR_NUMBER", "--pr must be a positive integer.");
      }
      options.prNumber = Number(value);
      index += 1;
    } else if (arg.startsWith("--pr=")) {
      const value = arg.slice("--pr=".length);
      if (!isPositiveIntegerText(value)) {
        throw new ReviewerError("INVALID_PR_NUMBER", "--pr must be a positive integer.");
      }
      options.prNumber = Number(value);
    }
  }

  if (options.help) {
    return options as ReviewerOptions & { help: true };
  }

  if (options.prNumber === undefined) {
    throw new ReviewerError("PR_REQUIRED", "Pass a PR number with --pr <number>.");
  }

  return options as ReviewerOptions;
}

function defaultRunCommand(command: string, rootDir: string) {
  try {
    const shell = process.platform === "win32" ? "cmd.exe" : "sh";
    const args = process.platform === "win32" ? ["/c", command] : ["-lc", command];
    const output = execFileSync(shell, args, {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { ok: true, output };
  } catch (error) {
    const output = error instanceof Error ? error.message : String(error);
    return { ok: false, output };
  }
}

function ghJson<T>(rootDir: string, args: string[]): T {
  return JSON.parse(
    execFileSync("gh", args, {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
  ) as T;
}

function defaultGetPullRequest(prNumber: number, rootDir: string): PullRequestMetadata {
  try {
    const payload = ghJson<{
      number?: number;
      title?: string;
      url?: string;
      state?: string;
      isDraft?: boolean;
      author?: { login?: string };
      headRefName?: string;
      baseRefName?: string;
    }>(rootDir, [
      "pr",
      "view",
      String(prNumber),
      "--json",
      "number,title,url,state,isDraft,author,headRefName,baseRefName",
    ]);
    return {
      number: payload.number ?? prNumber,
      title: payload.title ?? "UNKNOWN_TITLE",
      url: payload.url ?? "",
      state: payload.state ?? "UNKNOWN",
      isDraft: Boolean(payload.isDraft),
      author: payload.author?.login ?? "UNKNOWN_AUTHOR",
      headRefName: payload.headRefName ?? "UNKNOWN_HEAD",
      baseRefName: payload.baseRefName ?? "UNKNOWN_BASE",
    };
  } catch {
    return {
      number: prNumber,
      title: "GH_PR_METADATA_UNAVAILABLE",
      url: "",
      state: "UNKNOWN",
      isDraft: false,
      author: "UNKNOWN_AUTHOR",
      headRefName: "UNKNOWN_HEAD",
      baseRefName: "UNKNOWN_BASE",
    };
  }
}

function defaultGetChangedFiles(prNumber: number, rootDir: string) {
  try {
    return execFileSync("gh", ["pr", "diff", String(prNumber), "--name-only"], {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .split(/\r?\n/)
      .map((line) => normalizeRepoPath(line.trim()))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function classifyFiles(changedFiles: string[]): FileClassification {
  const classification: FileClassification = {
    contentFiles: [],
    imageAssetFiles: [],
    imageBriefFiles: [],
    docsReportFiles: [],
    testFiles: [],
    scriptFiles: [],
    schedulerFiles: [],
    adminFiles: [],
    envFiles: [],
    packageOrConfigFiles: [],
    apiOrDbFiles: [],
    unknownFiles: [],
  };

  for (const filePath of changedFiles.map(normalizeRepoPath)) {
    if (/^(data\/content-series-|scripts\/content-series|scripts\/setup-content-series-task\.ps1)/i.test(filePath)) {
      classification.schedulerFiles.push(filePath);
    } else if (/^(app\/admin|app\/api\/admin|lib\/admin|proxy\.ts)/i.test(filePath)) {
      classification.adminFiles.push(filePath);
    } else if (/^\.env|^env\.|\.env$/i.test(filePath)) {
      classification.envFiles.push(filePath);
    } else if (/^(app\/api|supabase\/|lib\/supabase\.ts)/i.test(filePath)) {
      classification.apiOrDbFiles.push(filePath);
    } else if (/^content\/ko\/.+\.md$/i.test(filePath)) {
      classification.contentFiles.push(filePath);
    } else if (/^(assets\/images\/raw|public\/images\/posts)\//i.test(filePath)) {
      classification.imageAssetFiles.push(filePath);
    } else if (/^(image-briefs|image-requests)\//i.test(filePath)) {
      classification.imageBriefFiles.push(filePath);
    } else if (/^(docs|reports)\//i.test(filePath)) {
      classification.docsReportFiles.push(filePath);
    } else if (/^tests\//i.test(filePath)) {
      classification.testFiles.push(filePath);
    } else if (/^scripts\//i.test(filePath)) {
      classification.scriptFiles.push(filePath);
    } else if (/^(package(-lock)?\.json|next\.config\.ts|tsconfig\.json|eslint\.config\.mjs|postcss\.config\.mjs)$/i.test(filePath)) {
      classification.packageOrConfigFiles.push(filePath);
    } else {
      classification.unknownFiles.push(filePath);
    }
  }

  return classification;
}

function readFrontmatter(rootDir: string, filePath: string) {
  const absolutePath = repoPath(rootDir, filePath);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  const raw = fs.readFileSync(absolutePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { fields: new Map<string, string>(), content: raw };
  }

  const fields = new Map<string, string>();
  for (const line of match[1].split(/\r?\n/)) {
    const fieldMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (fieldMatch) {
      fields.set(fieldMatch[1], fieldMatch[2].trim().replace(/^['"]|['"]$/g, ""));
    }
  }

  return { fields, content: match[2] };
}

function formatList(items: string[]) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- none";
}

function formatCheck(label: string, passed: boolean, detail: string) {
  return `- ${passed ? "PASS" : "REVIEW"} ${label}: ${detail}`;
}

function seoChecks(rootDir: string, contentFiles: string[]) {
  if (contentFiles.length === 0) {
    return "- REVIEW no changed article markdown files to inspect.";
  }

  return contentFiles
    .flatMap((filePath) => {
      const parsed = readFrontmatter(rootDir, filePath);
      if (!parsed) {
        return [`- REVIEW ${filePath}: file is not present in the current checkout.`];
      }
      const fields = parsed.fields;
      return [
        formatCheck(`${filePath} title`, Boolean(fields.get("title")), "frontmatter title is required"),
        formatCheck(`${filePath} description`, Boolean(fields.get("description")), "frontmatter description is required"),
        formatCheck(`${filePath} slug`, /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.get("slug") ?? ""), "slug must be kebab-case"),
        formatCheck(
          `${filePath} canonical`,
          (fields.get("canonical") ?? "").startsWith("https://www.biz2lab.com/"),
          "canonical should use the www production domain",
        ),
        formatCheck(`${filePath} noindex`, fields.get("noindex") === "false", "published content should stay indexable"),
      ];
    })
    .join("\n");
}

function imageChecks(rootDir: string, classification: FileClassification) {
  const changedImages = [...classification.imageAssetFiles, ...classification.contentFiles];
  if (changedImages.length === 0) {
    return "- REVIEW no changed image assets or article image references to inspect.";
  }

  const checks: string[] = [];
  for (const filePath of classification.imageAssetFiles) {
    const basename = path.basename(filePath).toLowerCase();
    checks.push(formatCheck(`${filePath} local path`, !filePath.includes(".."), "image paths must stay repo-local"));
    checks.push(formatCheck(`${filePath} placeholder marker`, !/(placeholder|dummy|fake|sample|blank|empty)/i.test(basename), "placeholder terms are blocked"));
    if (filePath.startsWith("assets/images/raw/")) {
      checks.push(formatCheck(`${filePath} raw format`, /\.(jpe?g|png|webp)$/i.test(filePath), "raw image must be JPG, PNG, or WebP"));
    }
    if (filePath.startsWith("public/images/posts/")) {
      checks.push(formatCheck(`${filePath} public format`, /\.webp$/i.test(filePath), "public post images should be WebP"));
    }
  }

  for (const filePath of classification.contentFiles) {
    const parsed = readFrontmatter(rootDir, filePath);
    if (!parsed) continue;
    const slug = parsed.fields.get("slug") ?? "";
    const heroImage = parsed.fields.get("heroImage") ?? "";
    const heroAlt = parsed.fields.get("heroAlt") ?? "";
    checks.push(formatCheck(`${filePath} hero image`, heroImage.startsWith("/images/posts/"), "heroImage must be local under /images/posts/"));
    checks.push(formatCheck(`${filePath} hero slug`, Boolean(slug && heroImage.includes(slug)), "hero image filename should include the slug"));
    checks.push(formatCheck(`${filePath} hero alt`, heroAlt.trim().length > 0, "heroAlt is required"));
  }

  return checks.join("\n");
}

function contentChecks(rootDir: string, contentFiles: string[]) {
  if (contentFiles.length === 0) {
    return "- REVIEW no changed article markdown files to inspect.";
  }

  return contentFiles
    .flatMap((filePath) => {
      const parsed = readFrontmatter(rootDir, filePath);
      if (!parsed) {
        return [`- REVIEW ${filePath}: file is not present in the current checkout.`];
      }
      const headings = [...parsed.content.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);
      const internalLinks = [...parsed.content.matchAll(/\]\((\/ko\/[^)\s#]+)(?:#[^)]+)?\)/g)].map((match) => match[1]);
      return [
        formatCheck(`${filePath} section depth`, headings.length >= 4, "article should have multiple authority sections"),
        formatCheck(`${filePath} internal links`, internalLinks.length >= 1, "article should link to related Korean public routes"),
        formatCheck(`${filePath} practical guidance`, /risk|source|license|공식|출처|리스크|위험|판단/u.test(parsed.content), "article should include source/risk/judgment cues"),
      ];
    })
    .join("\n");
}

function validationResults(options: ReviewerOptions, deps: ReviewerDeps, rootDir: string): ValidationResult[] {
  if (!options.runValidation) {
    return RUFLO_REVIEW_VALIDATION_COMMANDS.map((command) => ({
      command,
      status: "NOT_RUN",
      detail: "Static dry-run only. Re-run with --run-validation to execute.",
    }));
  }

  const runCommand = deps.runCommand ?? defaultRunCommand;
  return RUFLO_REVIEW_VALIDATION_COMMANDS.map((command) => {
    const result = runCommand(command, rootDir);
    return {
      command,
      status: result.ok ? "PASS" : "FAIL",
      detail: result.ok ? "command completed" : result.output.slice(0, 240),
    };
  });
}

function resolveRufloStatus(options: ReviewerOptions, deps: ReviewerDeps, rootDir: string): RufloStatus {
  const env = deps.env ?? process.env;
  const rufloBin = env.RUFLO_BIN?.trim();
  if (!rufloBin) {
    return "RUFLO_NOT_CONFIGURED";
  }
  if (!options.useRuflo) {
    return "RUFLO_CONFIGURED_NOT_RUN";
  }

  const runRuflo =
    deps.runRuflo ??
    ((args: string[], cwd: string) => {
      try {
        const output = execFileSync(rufloBin, args, {
          cwd,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        });
        return { ok: true, output };
      } catch (error) {
        const output = error instanceof Error ? error.message : String(error);
        return { ok: false, output };
      }
    });

  const result = runRuflo(["review-pr", "--pr", String(options.prNumber), "--dry-run", "--report-only"], rootDir);
  return result.ok ? "RUFLO_REPORT_ONLY_COMPLETE" : "RUFLO_REPORT_ONLY_FAILED";
}

function decide(classification: FileClassification, validations: ValidationResult[]) {
  if (
    classification.adminFiles.length > 0 ||
    classification.envFiles.length > 0 ||
    classification.schedulerFiles.length > 0 ||
    classification.apiOrDbFiles.length > 0
  ) {
    return "BLOCKED_SECURITY_RISK" satisfies ReviewerDecision;
  }

  if (classification.packageOrConfigFiles.length > 0 || classification.scriptFiles.length > 0) {
    return "BLOCKED_SCOPE_DRIFT" satisfies ReviewerDecision;
  }

  if (classification.unknownFiles.length > 0 || classification.testFiles.length > 0) {
    return "NEEDS_OWNER_REVIEW" satisfies ReviewerDecision;
  }

  if (validations.some((result) => result.status !== "PASS")) {
    return "BLOCKED_VALIDATION_GAP" satisfies ReviewerDecision;
  }

  return "PASS_REVIEW" satisfies ReviewerDecision;
}

function buildReport(args: {
  pr: PullRequestMetadata;
  changedFiles: string[];
  classification: FileClassification;
  decision: ReviewerDecision;
  rufloStatus: RufloStatus;
  validations: ValidationResult[];
  rootDir: string;
  now: Date;
}) {
  const { pr, changedFiles, classification, decision, rufloStatus, validations, rootDir, now } = args;
  const validationMarkdown = validations
    .map((result) => `- ${result.status} \`${result.command}\` - ${result.detail}`)
    .join("\n");

  return `# Ruflo PR Reviewer Dry-run Report - PR #${pr.number}

Date: ${now.toISOString()}
Mode: report-only dry-run
Ruflo status: ${rufloStatus}
Final decision: ${decision}

## PR Metadata

- Number: ${pr.number}
- Title: ${pr.title}
- URL: ${pr.url || "unavailable"}
- State: ${pr.state}
- Draft: ${pr.isDraft ? "YES" : "NO"}
- Author: ${pr.author}
- Head: ${pr.headRefName}
- Base: ${pr.baseRefName}

## Changed Files

${formatList(changedFiles)}

## Content Scope

- Article content files: ${classification.contentFiles.length}
- Image asset files: ${classification.imageAssetFiles.length}
- Image brief/prompt files: ${classification.imageBriefFiles.length}
- Docs/report files: ${classification.docsReportFiles.length}
- Tests: ${classification.testFiles.length}
- Scripts: ${classification.scriptFiles.length}
- Scheduler files: ${classification.schedulerFiles.length}
- Admin files: ${classification.adminFiles.length}
- Env files: ${classification.envFiles.length}
- API/DB files: ${classification.apiOrDbFiles.length}
- Unknown files: ${classification.unknownFiles.length}

Unknown or owner-review files:

${formatList([...classification.unknownFiles, ...classification.testFiles])}

## SEO Metadata Checks

${seoChecks(rootDir, classification.contentFiles)}

Sitemap/RSS expectation: changed published article markdown must remain discoverable through existing Biz2Lab post loaders and validators.

## Hero Raw Public Image Checks

${imageChecks(rootDir, classification)}

## Alt Text Checks

- Article frontmatter \`heroAlt\` is checked for changed markdown when available locally.
- Inline image alt/caption coverage remains gated by \`npm run validate:images\` and \`npm run audit:content-authority\`.

## Internal Link Checks

${contentChecks(rootDir, classification.contentFiles)}

## Content Authority Section Checks

- Required review cues: practical use cases, risk notes, final judgment, official source caution.
- Final authority enforcement remains gated by \`npm run audit:content-authority\`.

## Validation Command Checklist

${validationMarkdown}

## Production Smoke Checklist

- GET-only route smoke after merge: allowed Korean/static routes, representative article routes, sitemap, robots, RSS.
- Forbidden routes must remain 404: /admin, /login, /en, /ja, /ai, /chat, /research, /crawler, /commerce, /affiliate, /products, /shop.
- Do not deploy manually from this reviewer.

## License Source Caution

- Check official sources for article claims.
- Do not assume external image, stock, ecommerce, Amazon, or product asset rights.
- Codex/local image provenance must remain explicit for hero/raw/public image changes.

## Forbidden Public Wording

- Review for affiliate, Amazon, lotto, product/shop/review, private-data, and unsafe public wording.
- Keep Biz2Lab as a Korean content site unless a separate owner-approved expansion exists.

## Admin Private Route Exposure Risk

${formatList([...classification.adminFiles, ...classification.envFiles, ...classification.schedulerFiles, ...classification.apiOrDbFiles])}

- Admin route exposure, env flag changes, DB/payment/message/API side effects, and scheduler changes block this dry-run review.
- Private pages must keep noindex/no-store/auth gates.

## Safety Confirmation

- Report-only: YES
- Ruflo optional: YES
- Ruflo install required: NO
- Repo write by Ruflo: NO
- Commit/push/merge/deploy by Ruflo: NO
- DB/payment/message/external business API calls: NO
- Protected untracked files are not read or modified by this harness.
`;
}

export function runRufloPrReviewer(options: ReviewerOptions, deps: ReviewerDeps = {}): ReviewerResult {
  assertValidPrNumber(options.prNumber);
  const rootDir = options.rootDir ?? process.cwd();
  const pr = (deps.getPullRequest ?? defaultGetPullRequest)(options.prNumber, rootDir);
  const changedFiles = (deps.getChangedFiles ?? defaultGetChangedFiles)(options.prNumber, rootDir).map(normalizeRepoPath);
  const classification = classifyFiles(changedFiles);
  const validations = validationResults(options, deps, rootDir);
  const rufloStatus = resolveRufloStatus(options, deps, rootDir);
  const decision = decide(classification, validations);
  const reportPath = buildSafeReportPath({ rootDir, prNumber: options.prNumber });
  const reportMarkdown = buildReport({
    pr,
    changedFiles,
    classification,
    decision,
    rufloStatus,
    validations,
    rootDir,
    now: deps.now?.() ?? new Date(),
  });

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, reportMarkdown, "utf8");

  return {
    decision,
    reportPath,
    reportMarkdown,
    rufloStatus,
    changedFiles,
    validationResults: validations,
  };
}

function printHelp() {
  console.log(`Usage:
  npm run ruflo:review-pr -- --pr 15 --dry-run
  npm run ruflo:review-pr -- --pr 15 --dry-run --run-validation

Options:
  --pr <number>       GitHub pull request number to inspect
  --dry-run           Preserve report-only mode marker
  --run-validation    Execute the full Biz2Lab validation checklist
  --use-ruflo         Call RUFLO_BIN in report-only mode when configured
`);
}

function main() {
  try {
    const options = parseReviewerArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }
    const result = runRufloPrReviewer(options);
    console.log(`Ruflo PR review report: ${path.relative(process.cwd(), result.reportPath).replaceAll("\\", "/")}`);
    console.log(`Ruflo status: ${result.rufloStatus}`);
    console.log(`Final decision: ${result.decision}`);
  } catch (error) {
    if (error instanceof ReviewerError) {
      console.error(`${error.code}: ${error.message}`);
      process.exit(1);
    }
    throw error;
  }
}

if (require.main === module) {
  main();
}
