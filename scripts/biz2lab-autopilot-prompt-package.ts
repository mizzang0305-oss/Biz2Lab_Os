import fs from "node:fs";
import path from "node:path";

import {
  buildImagePaths,
  readContentSeriesState,
  readContentSeriesTopics,
  resolveContentSeriesTopic,
  writeImagePromptPackage,
  type ContentSeriesTopic,
} from "@/scripts/content-series-orchestrator";

type CliOptions = {
  topic?: string;
  force?: boolean;
};

function absolutePath(rootDir: string, repoRelativePath: string) {
  return path.join(rootDir, ...repoRelativePath.split("/"));
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--topic") {
      options.topic = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function assertPromptPackageCanWrite(rootDir: string, topic: ContentSeriesTopic, force?: boolean) {
  if (force) {
    return;
  }

  const paths = buildImagePaths(topic);
  const existing = [
    paths.requestRepoPath,
    paths.promptRepoPath,
    paths.generatedBriefRepoPath,
  ].filter((repoPath) => fs.existsSync(absolutePath(rootDir, repoPath)));

  if (existing.length > 0) {
    throw new Error(`Prompt package files already exist: ${existing.join(", ")}`);
  }
}

function main() {
  const rootDir = process.cwd();
  const options = parseArgs(process.argv.slice(2));
  const state = readContentSeriesState(rootDir);
  const topicFile = readContentSeriesTopics(rootDir);
  const topic = resolveContentSeriesTopic(topicFile.topics, state, options.topic);
  assertPromptPackageCanWrite(rootDir, topic, options.force);

  const paths = buildImagePaths(topic);
  writeImagePromptPackage(rootDir, topic);

  console.log(JSON.stringify({
    status: "PROMPT_PACKAGE_CREATED",
    topic: topic.slug,
    files: [
      paths.requestRepoPath,
      paths.promptRepoPath,
      paths.generatedBriefRepoPath,
    ],
  }, null, 2));
}

main();
