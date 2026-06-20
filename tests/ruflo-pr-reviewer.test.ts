import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  REQUIRED_REVIEW_SECTIONS,
  RUFLO_REVIEW_VALIDATION_COMMANDS,
  ReviewerError,
  buildSafeReportPath,
  parseReviewerArgs,
  runRufloPrReviewer,
} from "@/scripts/ruflo-pr-reviewer";

function tempReviewerRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-ruflo-reviewer-"));
  fs.mkdirSync(path.join(root, "content", "ko", "automation"), { recursive: true });
  fs.mkdirSync(path.join(root, ".codex-remote-attachments"), { recursive: true });
  fs.mkdirSync(path.join(root, ".codex"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "content", "ko", "automation", "sample.md"),
    "---\ntitle: Sample\n---\n# Sample\n",
    "utf8",
  );
  fs.writeFileSync(path.join(root, ".codex-remote-attachments", "keep.txt"), "keep", "utf8");
  fs.writeFileSync(path.join(root, ".codex", "config.toml"), "keep = true\n", "utf8");
  return root;
}

const samplePr = {
  number: 15,
  title: "Add sample content article",
  url: "https://github.com/example/repo/pull/15",
  state: "OPEN",
  isDraft: false,
  author: "codex",
  headRefName: "codex/sample-content",
  baseRefName: "master",
};

test("report file path is constrained to reports/ruflo-pr-review", () => {
  const root = tempReviewerRoot();

  assert.equal(
    buildSafeReportPath({ rootDir: root, prNumber: 15 }),
    path.join(root, "reports", "ruflo-pr-review", "pr-15.md"),
  );
});

test("PR number is required", () => {
  assert.throws(
    () => parseReviewerArgs(["--dry-run"]),
    (error) => error instanceof ReviewerError && error.code === "PR_REQUIRED",
  );
});

test("invalid PR number fails", () => {
  assert.throws(
    () => parseReviewerArgs(["--pr", "../15", "--dry-run"]),
    (error) => error instanceof ReviewerError && error.code === "INVALID_PR_NUMBER",
  );
});

test("report-only mode writes only the review report and does not modify content files", () => {
  const root = tempReviewerRoot();
  const contentPath = path.join(root, "content", "ko", "automation", "sample.md");
  const before = fs.readFileSync(contentPath, "utf8");

  const result = runRufloPrReviewer(
    { prNumber: 15, dryRun: true, rootDir: root },
    {
      getPullRequest: () => samplePr,
      getChangedFiles: () => ["content/ko/automation/sample.md"],
    },
  );

  assert.equal(result.reportPath, path.join(root, "reports", "ruflo-pr-review", "pr-15.md"));
  assert.equal(fs.existsSync(result.reportPath), true);
  assert.equal(fs.readFileSync(contentPath, "utf8"), before);
});

test("protected files are not touched", () => {
  const root = tempReviewerRoot();
  const attachmentPath = path.join(root, ".codex-remote-attachments", "keep.txt");
  const configPath = path.join(root, ".codex", "config.toml");
  const beforeAttachment = fs.readFileSync(attachmentPath, "utf8");
  const beforeConfig = fs.readFileSync(configPath, "utf8");

  runRufloPrReviewer(
    { prNumber: 15, dryRun: true, rootDir: root },
    {
      getPullRequest: () => samplePr,
      getChangedFiles: () => ["reports/example.md"],
    },
  );

  assert.equal(fs.readFileSync(attachmentPath, "utf8"), beforeAttachment);
  assert.equal(fs.readFileSync(configPath, "utf8"), beforeConfig);
});

test("unknown file scope requires owner review", () => {
  const root = tempReviewerRoot();
  const result = runRufloPrReviewer(
    { prNumber: 15, dryRun: true, rootDir: root },
    {
      getPullRequest: () => samplePr,
      getChangedFiles: () => ["unknown/new-surface.txt"],
    },
  );

  assert.equal(result.decision, "NEEDS_OWNER_REVIEW");
  assert.match(result.reportMarkdown, /unknown\/new-surface\.txt/);
});

test("RUFLO_NOT_CONFIGURED is reported without failing the script", () => {
  const root = tempReviewerRoot();
  const previousRufloBin = process.env.RUFLO_BIN;
  delete process.env.RUFLO_BIN;

  try {
    const result = runRufloPrReviewer(
      { prNumber: 15, dryRun: true, rootDir: root },
      {
        getPullRequest: () => samplePr,
        getChangedFiles: () => ["content/ko/automation/sample.md"],
      },
    );

    assert.equal(result.rufloStatus, "RUFLO_NOT_CONFIGURED");
    assert.match(result.reportMarkdown, /RUFLO_NOT_CONFIGURED/);
  } finally {
    if (previousRufloBin === undefined) {
      delete process.env.RUFLO_BIN;
    } else {
      process.env.RUFLO_BIN = previousRufloBin;
    }
  }
});

test("output contains required checklist sections and validation commands", () => {
  const root = tempReviewerRoot();
  const result = runRufloPrReviewer(
    { prNumber: 15, dryRun: true, rootDir: root },
    {
      getPullRequest: () => samplePr,
      getChangedFiles: () => ["content/ko/automation/sample.md"],
    },
  );

  for (const section of REQUIRED_REVIEW_SECTIONS) {
    assert.match(result.reportMarkdown, new RegExp(`## ${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  }

  for (const command of RUFLO_REVIEW_VALIDATION_COMMANDS) {
    assert.match(result.reportMarkdown, new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
