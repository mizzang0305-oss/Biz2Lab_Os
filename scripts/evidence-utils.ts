import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { evidenceCaptureDefinitions } from "../config/evidence-sources";

export type DiscoveredEvidenceSource = {
  projectKey: string;
  repositoryName: string;
  found: boolean;
  repositoryPath?: string;
  sourceCommit?: string;
  sourceDirty?: boolean;
  reason?: string;
};

function sourceRoots() {
  const configured = (process.env.BIZ2LAB_EVIDENCE_SOURCE_ROOTS ?? "")
    .split(path.delimiter)
    .map((item) => item.trim())
    .filter(Boolean);

  return [
    ...configured,
    path.join(os.homedir(), "MyProjects"),
    path.resolve(process.cwd(), ".."),
    path.resolve(process.cwd(), "..", ".."),
  ];
}

export function discoverEvidenceSources(): DiscoveredEvidenceSource[] {
  const projects = new Map(
    evidenceCaptureDefinitions.map((item) => [
      item.projectKey,
      {
        projectKey: item.projectKey,
        repositoryName: item.repositoryName,
        repoCandidates: item.repoCandidates,
      },
    ]),
  );

  return Array.from(projects.values()).map((project) => {
    for (const root of sourceRoots()) {
      for (const candidate of project.repoCandidates) {
        const repositoryPath = path.resolve(root, candidate);
        if (!fs.existsSync(path.join(repositoryPath, ".git"))) {
          continue;
        }

        try {
          const sourceCommit = git(repositoryPath, ["rev-parse", "HEAD"]);
          const sourceDirty = isRepositoryDirty(repositoryPath);
          return {
            projectKey: project.projectKey,
            repositoryName: project.repositoryName,
            found: true,
            repositoryPath,
            sourceCommit,
            sourceDirty,
          };
        } catch (error) {
          return {
            projectKey: project.projectKey,
            repositoryName: project.repositoryName,
            found: false,
            reason: error instanceof Error ? error.message : String(error),
          };
        }
      }
    }

    return {
      projectKey: project.projectKey,
      repositoryName: project.repositoryName,
      found: false,
      reason: "configured repository candidate not found",
    };
  });
}

export function git(repositoryPath: string, args: string[]) {
  return execFileSync("git", ["-C", repositoryPath, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function isRepositoryDirty(repositoryPath: string) {
  const porcelain = git(repositoryPath, ["status", "--porcelain"]);
  if (!porcelain) return false;
  if (porcelain.split(/\r?\n/).some((line) => line.startsWith("??"))) {
    return true;
  }

  const worktreeDiff = spawnSync(
    "git",
    ["-C", repositoryPath, "diff", "--quiet", "--"],
    { stdio: "ignore" },
  );
  const stagedDiff = spawnSync(
    "git",
    ["-C", repositoryPath, "diff", "--cached", "--quiet", "--"],
    { stdio: "ignore" },
  );
  return worktreeDiff.status !== 0 || stagedDiff.status !== 0;
}

export function assertLocalUrl(url: string) {
  const parsed = new URL(url);
  if (!["localhost", "127.0.0.1"].includes(parsed.hostname)) {
    throw new Error(`Evidence capture only permits localhost URLs: ${url}`);
  }
}

export function redactPath(input: string) {
  return input
    .replace(/[A-Za-z]:\\[^\s"'<>]+/g, "[local-path]")
    .replace(/\/(?:Users|home)\/[^\s"'<>]+/g, "[local-path]");
}
