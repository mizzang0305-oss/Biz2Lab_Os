import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { evidenceManifestSchema } from "@/lib/evidence-schema";
import { getEvidenceForPost } from "@/lib/evidence";
import { getPublicPosts } from "@/lib/posts";

const manifest = evidenceManifestSchema.parse(
  JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "data", "evidence-manifest.json"),
      "utf8",
    ),
  ),
);

test("candidate evidence is visible in preview and hidden in production", () => {
  for (const item of manifest.filter((entry) => entry.status === "candidate")) {
    assert.ok(getEvidenceForPost(item.postSlug, "preview").some((entry) => entry.id === item.id));
    assert.equal(
      getEvidenceForPost(item.postSlug, "production").some((entry) => entry.id === item.id),
      false,
    );
  }
});

test("every evidence-backed case study has a source or reviewable evidence", () => {
  const caseStudies = getPublicPosts().filter(
    (post) => post.frontmatter.type === "case-study",
  );
  for (const post of caseStudies) {
    const evidence = getEvidenceForPost(post.slug, "preview");
    if (evidence.length === 0) continue;
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

test("candidate images are unique to one article and identify fixture data", () => {
  const owners = new Map<string, string>();
  for (const item of manifest) {
    assert.match(item.captionKo, /(로컬 데모|fixture|가상 데이터)/);
    assert.equal(owners.has(item.image), false, `${item.image} is reused`);
    owners.set(item.image, item.postSlug);
  }
});

test("image prompt audit exempts only evidence screenshots registered in the manifest", () => {
  const auditSource = fs.readFileSync(
    path.join(process.cwd(), "scripts", "audit-image-prompt-packages.ts"),
    "utf8",
  );

  assert.match(auditSource, /isManifestEvidenceScreenshot/);
  assert.match(auditSource, /evidenceImagePaths\.has\(changedPath\)/);
  assert.match(
    auditSource,
    /public\\\/images\\\/posts\\\/\[a-z0-9\].+-evidence-/,
  );
});
