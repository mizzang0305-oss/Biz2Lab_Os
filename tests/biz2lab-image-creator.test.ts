import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildImagePromptPackage } from "@/lib/image-generation/prompt-builder";
import { createImageRequestPackage } from "@/scripts/create-image-request";
import { runBiz2LabImageSkill } from "@/scripts/run-biz2lab-image-skill";

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-image-skill-"));
}

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return entry.isFile() ? [fullPath] : [];
    })
    .sort();
}

function runTsxScript(scriptPath: string, cwd: string) {
  return execFileSync(
    process.execPath,
    [
      path.join(process.cwd(), "node_modules", "tsx", "dist", "cli.mjs"),
      path.join(process.cwd(), scriptPath),
    ],
    { cwd, encoding: "utf8" },
  );
}

test("prompt builder creates a Korean-first safe prompt package", () => {
  const promptPackage = buildImagePromptPackage({
    slug: "ai-business-automation-guide",
    articleTitle: "AI 업무 자동화 가이드",
    category: "automation",
    usage: "hero",
    userDescription: "반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 대표 이미지",
    targetFeeling: "차분한 프리미엄 SaaS 에디토리얼",
    mustInclude: ["업무 흐름", "우선순위"],
    mustAvoid: ["로고", "사람 얼굴"],
  });

  assert.equal(promptPackage.filename, "ai-business-automation-guide-hero.png");
  assert.equal(promptPackage.rawPath, "assets/images/raw/ai-business-automation-guide-hero.png");
  assert.equal(promptPackage.optimizedPath, "public/images/posts/ai-business-automation-guide-1200.webp");
  assert.match(promptPackage.providerPromptKo, /반복 업무/);
  assert.match(promptPackage.providerPromptKo, /프리미엄/);
  assert.doesNotMatch(promptPackage.providerPromptKo, /Article workflow/i);
  assert.match(promptPackage.negativePromptKo, /Amazon/);
  assert.match(promptPackage.negativePromptKo, /로고/);
  assert.match(promptPackage.altKo, /자동화/);
  assert.match(promptPackage.captionKo, /업무/);
  assert.ok(promptPackage.categoryStyle.length > 20);
  assert.ok(promptPackage.visualDifferentiationHint.length > 20);
});

test("prompt builder rejects external URLs and product image requests", () => {
  assert.throws(
    () =>
      buildImagePromptPackage({
        slug: "ai-business-automation-guide",
        articleTitle: "AI 업무 자동화 가이드",
        category: "automation",
        usage: "hero",
        userDescription: "https://example.com 이미지를 참고한 대표 이미지",
      }),
    /external URL/i,
  );

  assert.throws(
    () =>
      buildImagePromptPackage({
        slug: "ai-business-automation-guide",
        articleTitle: "AI 업무 자동화 가이드",
        category: "automation",
        usage: "hero",
        userDescription: "Amazon product card처럼 보이는 이미지",
      }),
    /product|Amazon/i,
  );
});

test("request creation writes request and generated brief for a known slug without article mutation", () => {
  const tempDir = makeTempDir();
  const requestDir = path.join(tempDir, "image-requests", "generated");
  const briefDir = path.join(tempDir, "image-briefs", "generated");
  const articlePath = path.join(
    process.cwd(),
    "content",
    "ko",
    "automation",
    "ai-business-automation-guide.md",
  );
  const beforeArticle = fs.readFileSync(articlePath, "utf8");

  const result = createImageRequestPackage({
    rootDir: process.cwd(),
    slug: "ai-business-automation-guide",
    usage: "hero",
    description: "반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 대표 이미지",
    mode: "prompt-only",
    requestDir,
    briefDir,
  });

  assert.equal(fs.existsSync(result.requestPath), true);
  assert.equal(fs.existsSync(result.briefPath), true);
  assert.equal(fs.readFileSync(articlePath, "utf8"), beforeArticle);

  const requestMarkdown = fs.readFileSync(result.requestPath, "utf8");
  const briefJson = JSON.parse(fs.readFileSync(result.briefPath, "utf8")) as {
    providerPromptKo?: string;
    manifestEntry?: { rawPath?: string; src?: string };
  };

  assert.match(requestMarkdown, /Biz2Lab Image Request/);
  assert.match(requestMarkdown, /ai-business-automation-guide/);
  assert.match(briefJson.providerPromptKo ?? "", /반복 업무/);
  assert.equal(briefJson.manifestEntry?.rawPath, "assets/images/raw/ai-business-automation-guide-hero.png");
  assert.equal(briefJson.manifestEntry?.src, "/images/posts/ai-business-automation-guide-1200.webp");
});

test("skill runner prompt-only creates prompt package and generated brief without raw image output", () => {
  const tempDir = makeTempDir();
  const requestPath = path.join(tempDir, "ai-business-automation-guide-hero.md");
  const briefDir = path.join(tempDir, "image-briefs", "generated");
  fs.writeFileSync(
    requestPath,
    `# Biz2Lab Image Request

## Article
- slug: ai-business-automation-guide
- title: AI 업무 자동화 가이드
- category: automation
- usage: hero

## User Description
반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 대표 이미지

## Business Context
반복 업무 자동화 우선순위를 정리한다.

## Visual Direction
- mood: 차분한 프리미엄 SaaS 에디토리얼
- layout idea: 중앙 업무 흐름과 우측 우선순위 패널
- color: teal, navy, warm amber
- must include: 업무 흐름, 우선순위
- must avoid: 로고, 사람 얼굴

## Output Mode
- prompt-only
`,
    "utf8",
  );

  const result = runBiz2LabImageSkill({
    rootDir: process.cwd(),
    requestPath,
    mode: "prompt-only",
    briefDir,
    apply: false,
  });

  assert.equal(fs.existsSync(result.promptPath), true);
  assert.equal(fs.existsSync(result.briefPath), true);
  assert.equal(result.rawOutputPath, null);
  const promptMarkdown = fs.readFileSync(result.promptPath, "utf8");
  assert.match(promptMarkdown, /Negative Prompt/);
  assert.match(promptMarkdown, /Manual Creation Instructions/);
  assert.match(promptMarkdown, /Validation Commands/);
});

test("skill runner local-diagram-fallback mode stays local and writes only an SVG raw asset", () => {
  const tempDir = makeTempDir();
  const requestPath = path.join(tempDir, "ai-business-automation-guide-hero.md");
  const briefDir = path.join(tempDir, "image-briefs", "generated");
  const rawDir = path.join(tempDir, "assets", "images", "raw");
  fs.writeFileSync(
    requestPath,
    `# Biz2Lab Image Request

## Article
- slug: ai-business-automation-guide
- title: AI 업무 자동화 가이드
- category: automation
- usage: hero

## User Description
반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 간단한 로컬 다이어그램

## Output Mode
- local-diagram-fallback
`,
    "utf8",
  );

  const result = runBiz2LabImageSkill({
    rootDir: process.cwd(),
    requestPath,
    mode: "local-diagram-fallback",
    briefDir,
    rawDir,
    apply: false,
  });

  assert.ok(result.rawOutputPath?.startsWith(rawDir));
  assert.equal(path.extname(result.rawOutputPath ?? ""), ".svg");
  assert.match(fs.readFileSync(result.rawOutputPath ?? "", "utf8"), /<svg/);
  assert.equal(walkFiles(path.join(tempDir, "public")).length, 0);
});

test("skill runner apply updates hero frontmatter only when optimized local image exists", () => {
  const tempDir = makeTempDir();
  const articleDir = path.join(tempDir, "content", "ko", "automation");
  const publicImageDir = path.join(tempDir, "public", "images", "posts");
  const requestPath = path.join(tempDir, "demo-automation-hero.md");
  fs.mkdirSync(articleDir, { recursive: true });
  fs.mkdirSync(publicImageDir, { recursive: true });
  fs.writeFileSync(path.join(publicImageDir, "demo-automation-1200.webp"), "", "utf8");
  fs.writeFileSync(
    path.join(articleDir, "demo-automation.md"),
    `---
title: "기존 제목"
description: "기존 설명"
slug: "demo-automation"
locale: "ko"
category: "automation"
cluster: "automation-basics"
type: "how-to"
status: "published"
draft: false
author: "Biz2Lab"
publishedAt: "2026-06-15"
updatedAt: "2026-06-15"
tags:
  - "AI 업무 자동화"
heroImage: "/images/posts/old-image.webp"
heroAlt: "기존 이미지"
canonical: "https://www.biz2lab.com/ko/automation/demo-automation"
noindex: false
relatedPosts:
  - "other-post"
---

본문
`,
    "utf8",
  );
  fs.writeFileSync(
    requestPath,
    `# Biz2Lab Image Request

## Article
- slug: demo-automation
- title: AI 업무 자동화 가이드
- category: automation
- usage: hero

## User Description
반복 업무를 자동화 후보로 분류하는 대표 이미지

## Output Mode
- prompt-only
`,
    "utf8",
  );

  const result = runBiz2LabImageSkill({
    rootDir: tempDir,
    requestPath,
    briefDir: path.join(tempDir, "image-briefs", "generated"),
    apply: true,
  });

  const article = fs.readFileSync(path.join(articleDir, "demo-automation.md"), "utf8");
  assert.equal(result.articleMutated, true);
  assert.match(article, /heroImage:\s+["']?\/images\/posts\/demo-automation-1200\.webp["']?/);
  assert.match(article, /heroAlt:/);
  assert.doesNotMatch(article, /old-image/);
});

test("image creator feature does not add public app routes", () => {
  const appFiles = walkFiles(path.join(process.cwd(), "app")).map((filePath) =>
    path.relative(process.cwd(), filePath).replaceAll("\\", "/"),
  );
  const unexpectedAdminFiles = appFiles.filter(
    (filePath) =>
      filePath.includes("/admin/") &&
      !filePath.startsWith("app/admin/content-automation/") &&
      !filePath.startsWith("app/api/admin/content-automation/"),
  );

  assert.deepEqual(unexpectedAdminFiles, []);
  assert.equal(appFiles.some((filePath) => filePath.includes("/api/image")), false);
  assert.equal(appFiles.some((filePath) => filePath.includes("/ai/")), false);
  assert.equal(appFiles.some((filePath) => filePath.includes("/chat/")), false);
});

test("Codex image creator skill ships required templates, docs, and canonical output modes", () => {
  const requiredFiles = [
    ".codex/skills/biz2lab-image-creator/SKILL.md",
    "image-requests/README.md",
    "image-requests/_template.md",
    "image-requests/examples/ai-business-automation-guide-hero.md",
    "image-requests/examples/accounts-receivable-tracker-hero.md",
    "image-requests/examples/electronic-contract-system-basics-hero.md",
    "image-requests/examples/ai-business-automation-guide-hero.prompt.md",
    "docs/image-engine/codex-image-skill-workflow.md",
    "docs/image-engine/local-codex-image-skill.md",
    "docs/image-engine/deterministic-fallback-limitations.md",
    "docs/image-engine/premium-visual-guidelines.md",
    "docs/image-engine/image-production-queue.md",
    "docs/image-engine/manual-image-creation-handoff.md",
    "scripts/generate-image-prompt-packages.ts",
    "scripts/audit-image-prompt-packages.ts",
    "image-requests/generated/IMAGE_PRODUCTION_QUEUE.md",
  ];

  for (const filePath of requiredFiles) {
    assert.equal(fs.existsSync(path.join(process.cwd(), filePath)), true, `${filePath} must exist`);
  }

  const skill = fs.readFileSync(
    path.join(process.cwd(), ".codex", "skills", "biz2lab-image-creator", "SKILL.md"),
    "utf8",
  );
  const template = fs.readFileSync(path.join(process.cwd(), "image-requests", "_template.md"), "utf8");

  assert.match(skill, /prompt-only/);
  assert.match(skill, /manual-drop/);
  assert.match(skill, /local-diagram-fallback/);
  assert.doesNotMatch(skill, /`local-diagram`/);
  assert.match(template, /prompt-only \| manual-drop \| local-diagram-fallback/);
});

test("image brief audit allows a generated draft to reuse the same output for the same brief identity", () => {
  const tempDir = makeTempDir();
  const briefDir = path.join(tempDir, "image-briefs");
  const generatedDir = path.join(briefDir, "generated");
  fs.mkdirSync(generatedDir, { recursive: true });

  const brief = {
    id: "ai-business-automation-guide-hero",
    postSlug: "ai-business-automation-guide",
    category: "automation",
    usage: "hero",
    optimizedPath: "public/images/posts/ai-business-automation-guide-1200.webp",
    altKo: "AI 자동화 대시보드 흐름을 보여주는 대표 이미지",
    captionKo: "반복 업무를 AI 자동화 대시보드로 정리하는 이미지 브리프",
    providerPromptKo:
      "소상공인의 주문, 미수금, 전자계약, 고객문의, 매출 리포트를 하나의 안전한 AI 자동화 대시보드 흐름으로 정리하는 프리미엄 SaaS 에디토리얼 이미지. 실제 고객 데이터나 로고 없이 업무 효율과 데이터 흐름을 중심으로 보여준다.",
    negativePromptKo: "real logo, product package, Amazon, private data, fake screenshot",
    categoryStyle: "업무 자동화: 문서와 데이터가 AI 자동화 후보로 분류되는 SaaS editorial style",
    visualDifferentiationHint: "주문, 미수금, 계약, 고객문의, 매출 리포트를 서로 다른 운영 모듈로 배치한다.",
    visualStyle: "teal, navy, soft cyan, warm amber",
    composition: "중앙 대시보드와 주변 데이터 흐름을 조합한다.",
    manifestEntry: {
      src: "/images/posts/ai-business-automation-guide-1200.webp",
      rawPath: "assets/images/raw/ai-business-automation-guide-hero.png",
    },
  };

  fs.writeFileSync(
    path.join(briefDir, "biz2lab-article-image-briefs.json"),
    `${JSON.stringify({ briefs: [brief] }, null, 2)}\n`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(generatedDir, "ai-business-automation-guide-hero.json"),
    `${JSON.stringify({ ...brief, outputMode: "prompt-only" }, null, 2)}\n`,
    "utf8",
  );

  const output = runTsxScript("scripts/audit-image-brief-quality.ts", tempDir);

  assert.match(output, /audit:image-briefs PASS/);
});

test("prompt package audit passes generated packages for known slugs", () => {
  const tempDir = makeTempDir();
  const requestDir = path.join(tempDir, "image-requests", "generated");
  const briefDir = path.join(tempDir, "image-briefs", "generated");
  const articlePath = path.join(
    process.cwd(),
    "content",
    "ko",
    "sales-ops",
    "accounts-receivable-tracker.md",
  );
  const beforeArticle = fs.readFileSync(articlePath, "utf8");

  for (const [slug, usage, description] of [
    [
      "accounts-receivable-tracker",
      "hero",
      "미수금 상태, 약속일, 후속 조치 우선순위를 한눈에 비교하는 영업 운영 보드형 대표 이미지",
    ],
    [
      "google-sheets-ai-automation",
      "inline",
      "스프레드시트 입력값이 AI 정리 규칙을 거쳐 검토용 표로 바뀌는 설명형 프로세스 다이어그램",
    ],
  ] as const) {
    const request = createImageRequestPackage({
      rootDir: process.cwd(),
      slug,
      usage,
      description,
      mode: "prompt-only",
      requestDir,
      briefDir,
    });

    runBiz2LabImageSkill({
      rootDir: process.cwd(),
      requestPath: request.requestPath,
      mode: "prompt-only",
      briefDir,
      force: true,
      apply: false,
    });
  }

  const output = runTsxScript("scripts/audit-image-prompt-packages.ts", tempDir);

  assert.match(output, /audit:image-prompts PASS/);
  assert.equal(fs.readFileSync(articlePath, "utf8"), beforeArticle);
});

test("prompt package audit catches generic and unsafe generated prompts", () => {
  const tempDir = makeTempDir();
  const requestDir = path.join(tempDir, "image-requests", "generated");
  const briefDir = path.join(tempDir, "image-briefs", "generated");
  fs.mkdirSync(requestDir, { recursive: true });
  fs.mkdirSync(briefDir, { recursive: true });

  fs.writeFileSync(
    path.join(requestDir, "generic-hero.md"),
    `# Biz2Lab Image Request

## Article
- slug: generic
- title: Generic
- category: automation
- usage: hero

## User Description
Article workflow

## Output Mode
- prompt-only
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(requestDir, "generic-hero.prompt.md"),
    `# Biz2Lab Image Prompt Package

## Provider Prompt (Korean)
Article workflow dashboard with people and Amazon product cards.

## Negative Prompt

## Filename And Paths
- rawPath: https://example.com/raw.png
- optimizedPath: public/images/posts/generic-1200.webp

## Alt Text

## Caption

## Manual Creation Instructions
- image was generated and uploaded.
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(briefDir, "generic-hero.json"),
    `${JSON.stringify(
      {
        id: "generic-hero",
        postSlug: "generic",
        category: "automation",
        usage: "hero",
        outputMode: "prompt-only",
        rawOutput: "none",
        rawPath: "https://example.com/raw.png",
        optimizedPath: "public/images/posts/generic-1200.webp",
        altKo: "",
        captionKo: "",
        providerPromptKo: "Article workflow dashboard with people and Amazon product cards.",
        negativePromptKo: "",
        manifestEntry: {
          src: "/images/posts/generic-1200.webp",
          rawPath: "https://example.com/raw.png",
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  assert.throws(
    () => runTsxScript("scripts/audit-image-prompt-packages.ts", tempDir),
    /generic "Article workflow"|external URL|Amazon|negative prompt/i,
  );
});
