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
const approved = manifest.filter(
  (item): item is PublicEvidenceItem => item.status === "approved",
);
const approvedControlIds = [
  "wms-order-source-workbench",
  "commerce-run-audit-log",
] as const;
const removedFixtureImage = "production-approved-test-fixture.webp";

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

test("stage script uses the two real approved items as Production controls", () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-evidence-"));
  try {
    const destination = path.join(tempRoot, "public", "images", "evidence");
    const runtimeManifestPath = path.join(
      tempRoot,
      "data",
      "evidence-runtime-manifest.json",
    );
    stageEvidenceAssets({
      root,
      destination,
      runtimeManifestPath,
      runtime: { vercelEnvironment: "production" },
    });
    for (const candidate of candidates) {
      assert.equal(
        fs.existsSync(path.join(destination, path.basename(candidate.image))),
        false,
      );
    }
    for (const item of approved) {
      assert.equal(
        fs.existsSync(path.join(destination, path.basename(item.image))),
        true,
      );
    }
    assert.equal(
      fs.existsSync(path.join(destination, removedFixtureImage)),
      false,
    );
    const productionRuntime = JSON.parse(
      fs.readFileSync(runtimeManifestPath, "utf8"),
    ) as PublicEvidenceItem[];
    assert.deepEqual(
      productionRuntime.map((item) => item.id).sort(),
      [...approvedControlIds].sort(),
    );

    stageEvidenceAssets({
      root,
      destination,
      runtimeManifestPath,
      runtime: { vercelEnvironment: "preview" },
    });
    for (const item of [...approved, ...candidates]) {
      assert.equal(
        fs.existsSync(path.join(destination, path.basename(item.image))),
        true,
      );
    }
    const previewRuntime = JSON.parse(
      fs.readFileSync(runtimeManifestPath, "utf8"),
    ) as PublicEvidenceItem[];
    assert.deepEqual(
      previewRuntime.map((item) => item.id).sort(),
      [...approved, ...candidates].map((item) => item.id).sort(),
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("recaptured candidates record transformations and mobile-useful height", () => {
  for (const item of candidates) {
    assert.ok(item.transformations?.length, `${item.id} transformations missing`);
    assert.ok(
      (390 * item.height) / item.width >= 220,
      `${item.id} is shorter than 220 CSS px at 390px`,
    );
  }
  assert.equal(
    manifest.some((item) => item.id === "production-approved-test-fixture"),
    false,
  );
  assert.equal(
    fs.existsSync(
      path.join(root, "evidence-assets", "approved", removedFixtureImage),
    ),
    false,
  );
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
