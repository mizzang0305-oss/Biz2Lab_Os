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

type CandidateEvidenceItem = Extract<
  PublicEvidenceItem,
  { status: "candidate" }
>;
type ApprovedEvidenceItem = Extract<
  PublicEvidenceItem,
  { status: "approved" }
>;

const root = process.cwd();
const manifestPath = path.join(root, "data", "evidence-manifest.json");
const manifest = evidenceManifestSchema.parse(
  JSON.parse(fs.readFileSync(manifestPath, "utf8")),
);
const candidates = manifest.filter(
  (item): item is CandidateEvidenceItem => item.status === "candidate",
);
const approved = manifest.filter(
  (item): item is ApprovedEvidenceItem => item.status === "approved",
);
const approvedControlIds = [
  "commerce-run-audit-log",
  "wms-order-source-workbench",
  "wms-order-hold-validation",
  "wms-picking-inspection-loading",
  "wms-loading-block-before-inspection",
  "commerce-upload-approval-gate",
  "mybiz-readonly-operations-dashboard",
] as const;
const finalRecaptureIds = [
  "commerce-upload-approval-gate",
  "mybiz-readonly-operations-dashboard",
] as const;
const removedFixtureImage = "production-approved-test-fixture.webp";

test("candidate evidence visibility remains fail-closed", () => {
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
  assert.equal(candidates.length, 0);
});

test("evidence schema enforces status invariants and unique ids/images", () => {
  const approvedSample = approved[0];
  assert.ok(approvedSample);
  const {
    approvedBy: removedApprovedBy,
    approvedAt: removedApprovedAt,
    ...candidateFields
  } = approvedSample;
  void removedApprovedBy;
  void removedApprovedAt;
  const sample = { ...candidateFields, status: "candidate" as const };
  assert.equal(evidenceItemSchema.safeParse(sample).success, true);

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

test("stage script uses all seven approved evidence items as Production controls", () => {
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
    const previewRuntime = JSON.parse(
      fs.readFileSync(runtimeManifestPath, "utf8"),
    ) as PublicEvidenceItem[];
    assert.deepEqual(
      previewRuntime.map((item) => item.id).sort(),
      approved.map((item) => item.id).sort(),
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("final recaptures are approved and retain mobile-useful evidence metadata", () => {
  assert.equal(candidates.length, 0);
  assert.deepEqual(
    approved.map((item) => item.id).sort(),
    [...approvedControlIds].sort(),
  );
  for (const id of finalRecaptureIds) {
    const item = approved.find((entry) => entry.id === id);
    assert.ok(item, `${id} is not approved`);
    assert.ok(item.approvedBy);
    assert.ok(item.approvedAt);
    assert.ok(item.transformations?.length, `${id} transformations missing`);
    assert.ok(
      (390 * item.height) / item.width >= 220,
      `${id} is shorter than 220 CSS px at 390px`,
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

test("approval command refuses already approved evidence without mutation", () => {
  const item = approved.find(
    (entry) => entry.id === "commerce-upload-approval-gate",
  );
  assert.ok(item);
  const assetPath = path.join(
    root,
    "evidence-assets",
    "approved",
    path.basename(item.image),
  );
  const manifestBefore = fs.readFileSync(manifestPath);
  const assetBefore = fs.readFileSync(assetPath);
  let rejected = false;
  try {
    execFileSync(
      process.execPath,
      [
        path.join(root, "node_modules", "tsx", "dist", "cli.mjs"),
        path.join(root, "scripts", "approve-evidence.ts"),
        "--id",
        item.id,
        "--reviewer",
        "duplicate-approval-test",
      ],
      { cwd: root, encoding: "utf8", stdio: "pipe" },
    );
  } catch {
    rejected = true;
  }
  assert.equal(rejected, true);
  assert.deepEqual(fs.readFileSync(manifestPath), manifestBefore);
  assert.deepEqual(fs.readFileSync(assetPath), assetBefore);
});

test("every explicit evidence-backed public post has approved evidence", () => {
  const posts = getPublicPosts().filter(
    (post) => post.frontmatter.evidenceRequired,
  );
  assert.ok(posts.length > 0);
  for (const post of posts) {
    const evidence = getEvidenceForPost(post.slug, {
      vercelEnvironment: "production",
      nodeEnvironment: "production",
    });
    if (post.frontmatter.evidenceMode === "source-only") continue;
    assert.ok(evidence.length > 0, `${post.slug} has no approved evidence`);
    assert.ok(
      evidence.every(
        (item) =>
          item.status === "approved" &&
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
