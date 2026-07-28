import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  evidenceItemSchema,
  evidenceManifestSchema,
  type PublicEvidenceItem,
} from "@/lib/evidence-schema";
import {
  getEvidenceForPost,
  isCandidateEvidenceVisible,
} from "@/lib/evidence";
import { getPublicPosts } from "@/lib/posts";
import { stageEvidenceAssets } from "@/scripts/stage-evidence-assets";

const root = process.cwd();
const manifestPath = path.join(root, "data", "evidence-manifest.json");
const manifest = evidenceManifestSchema.parse(
  JSON.parse(fs.readFileSync(manifestPath, "utf8")),
);
const candidates = manifest.filter(
  (item): item is PublicEvidenceItem => item.status === "candidate",
);

test("candidate evidence visibility is fail-closed", () => {
  const cases = [
    [{ vercelEnvironment: "preview" }, true],
    [
      {
        vercelEnvironment: undefined,
        nodeEnvironment: "development",
        reviewMode: "true",
      },
      true,
    ],
    [{ vercelEnvironment: "production" }, false],
    [
      {
        vercelEnvironment: "production",
        nodeEnvironment: "production",
        reviewMode: "true",
      },
      false,
    ],
    [{ vercelEnvironment: "development" }, false],
    [{ vercelEnvironment: "test" }, false],
    [{ vercelEnvironment: "custom" }, false],
    [{ vercelEnvironment: undefined, nodeEnvironment: "test" }, false],
    [{ vercelEnvironment: undefined, nodeEnvironment: "production" }, false],
    [
      {
        vercelEnvironment: undefined,
        nodeEnvironment: "production",
        reviewMode: "true",
      },
      false,
    ],
    [
      {
        vercelEnvironment: undefined,
        nodeEnvironment: "development",
        reviewMode: "false",
      },
      false,
    ],
  ] as const;

  for (const [runtime, expected] of cases) {
    assert.equal(isCandidateEvidenceVisible(runtime), expected);
  }

  for (const item of candidates) {
    assert.ok(
      getEvidenceForPost(item.postSlug, {
        vercelEnvironment: "preview",
      }).some((entry) => entry.id === item.id),
    );
    assert.equal(
      getEvidenceForPost(item.postSlug, {
        vercelEnvironment: "production",
        nodeEnvironment: "production",
        reviewMode: "true",
      }).some((entry) => entry.id === item.id),
      false,
    );
  }
});

test("evidence schema enforces status invariants and unique ids/images", () => {
  const sample = candidates[0];
  assert.ok(sample);

  assert.equal(
    evidenceItemSchema.safeParse({
      ...sample,
      approvedBy: "unexpected",
    }).success,
    false,
  );
  assert.equal(
    evidenceItemSchema.safeParse({
      ...sample,
      status: "approved",
    }).success,
    false,
  );
  assert.equal(
    evidenceItemSchema.safeParse({
      ...sample,
      status: "blocked",
      blockedReason: "fixture unavailable",
    }).success,
    false,
  );
  assert.equal(
    evidenceItemSchema.safeParse({
      ...sample,
      status: "retired",
      retiredReason: "superseded",
      retiredAt: "2026-07-29",
    }).success,
    false,
  );
  assert.equal(evidenceManifestSchema.safeParse([sample, sample]).success, false);
  assert.equal(
    evidenceManifestSchema.safeParse([
      sample,
      { ...sample, id: `${sample.id}-copy` },
    ]).success,
    false,
  );
});

test("stage script copies preview candidates and production approved fixture only", () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-evidence-"));
  try {
    const sample = candidates[0];
    assert.ok(sample);
    const second = candidates[1];
    assert.ok(second);
    const candidateBytes = fs.readFileSync(
      path.join(root, "evidence-assets", "candidates", path.basename(sample.image)),
    );
    const approvedBytes = fs.readFileSync(
      path.join(root, "evidence-assets", "candidates", path.basename(second.image)),
    );
    const approved: PublicEvidenceItem = {
      ...second,
      status: "approved",
      approvedBy: "test-fixture",
      approvedAt: "2026-07-29T00:00:00.000Z",
    };
    fs.mkdirSync(path.join(tempRoot, "data"), { recursive: true });
    fs.mkdirSync(path.join(tempRoot, "evidence-assets", "candidates"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(tempRoot, "evidence-assets", "approved"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(tempRoot, "data", "evidence-manifest.json"),
      JSON.stringify([sample, approved]),
    );
    fs.writeFileSync(
      path.join(
        tempRoot,
        "evidence-assets",
        "candidates",
        path.basename(sample.image),
      ),
      candidateBytes,
    );
    fs.writeFileSync(
      path.join(
        tempRoot,
        "evidence-assets",
        "approved",
        path.basename(approved.image),
      ),
      approvedBytes,
    );

    const destination = path.join(tempRoot, "public", "images", "evidence");
    stageEvidenceAssets({
      root: tempRoot,
      destination,
      runtime: { vercelEnvironment: "production" },
    });
    assert.equal(
      fs.existsSync(path.join(destination, path.basename(sample.image))),
      false,
    );
    assert.equal(
      fs.existsSync(path.join(destination, path.basename(approved.image))),
      true,
    );
    const productionRuntime = JSON.parse(
      fs.readFileSync(
        path.join(tempRoot, "data", "evidence-runtime-manifest.json"),
        "utf8",
      ),
    ) as PublicEvidenceItem[];
    assert.deepEqual(
      productionRuntime.map((item) => item.id),
      [approved.id],
    );

    stageEvidenceAssets({
      root: tempRoot,
      destination,
      runtime: { vercelEnvironment: "preview" },
    });
    assert.equal(
      fs.existsSync(path.join(destination, path.basename(sample.image))),
      true,
    );
    assert.equal(
      fs.existsSync(path.join(destination, path.basename(approved.image))),
      true,
    );
    const previewRuntime = JSON.parse(
      fs.readFileSync(
        path.join(tempRoot, "data", "evidence-runtime-manifest.json"),
        "utf8",
      ),
    ) as PublicEvidenceItem[];
    assert.deepEqual(
      previewRuntime.map((item) => item.id),
      [sample.id, approved.id],
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("approval command defaults to a byte-stable dry run", () => {
  const item = candidates[0];
  assert.ok(item);
  const assetPath = path.join(
    root,
    "evidence-assets",
    "candidates",
    path.basename(item.image),
  );
  const manifestBefore = fs.readFileSync(manifestPath);
  const assetBefore = fs.readFileSync(assetPath);
  const output = execFileSync(
    process.execPath,
    [
      path.join(root, "node_modules", "tsx", "dist", "cli.mjs"),
      path.join(root, "scripts", "approve-evidence.ts"),
      "--id",
      item.id,
      "--reviewer",
      "dry-run-test",
    ],
    { cwd: root, encoding: "utf8" },
  );
  assert.match(output, /DRY_RUN_ONLY/);
  assert.deepEqual(fs.readFileSync(manifestPath), manifestBefore);
  assert.deepEqual(fs.readFileSync(assetPath), assetBefore);
});

test("every explicit evidence-backed public post has Preview evidence", () => {
  const posts = getPublicPosts().filter(
    (post) => post.frontmatter.evidenceRequired,
  );
  assert.ok(posts.length > 0);
  for (const post of posts) {
    const evidence = getEvidenceForPost(post.slug, {
      vercelEnvironment: "preview",
    });
    if (post.frontmatter.evidenceMode === "source-only") continue;
    assert.ok(evidence.length > 0, `${post.slug} has no Preview evidence`);
    assert.ok(
      evidence.every(
        (item) =>
          item.sourceCommit.length === 40 &&
          item.piiScan === "pass" &&
          item.sourceDirty === false,
      ),
      `${post.slug} has invalid evidence`,
    );
  }
});

test("public evidence metadata contains no absolute local path", () => {
  const serialized = JSON.stringify(manifest);
  assert.doesNotMatch(serialized, /[A-Za-z]:\\/);
  assert.doesNotMatch(serialized, /\/(?:Users|home)\//);
});

test("image prompt audit exempts only registered staged evidence screenshots", () => {
  const auditSource = fs.readFileSync(
    path.join(root, "scripts", "audit-image-prompt-packages.ts"),
    "utf8",
  );
  assert.match(auditSource, /isManifestEvidenceScreenshot/);
  assert.match(auditSource, /evidenceImagePaths\.has\(changedPath\)/);
});
