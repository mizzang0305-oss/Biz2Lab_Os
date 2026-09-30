import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/minz-lineup");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const read = (name) => readFile(path.join(root, name));
const json = async (name) => JSON.parse((await read(name)).toString("utf8"));
const expectedDownloads = {
  "minz-biz2lab-reference-v1.0.0.zip": [34989, "2bea457705c03930ffdd29e19a33c5f4ebda70888c160925d05c8698bcbc8b33"],
  "minz-public-showcase-taste-v2-static.zip": [363863, "c8fc08aaa9624589a85b264e98e17e48c25eec2a3d7193deed62d6774fa2aadb"],
};

const release = await json("release-manifest.json");
assert.equal(release.productStatusIsNotExecutionPermission, true);
assert.equal(release.controlPlaneR13Runtime, "NOT_VERIFIED");
assert.equal(release.downloads.length, 2);
for (const [name, [bytes, sha256]] of Object.entries(expectedDownloads)) {
  const file = await read(`downloads/${name}`);
  assert.equal(file.length, bytes);
  assert.equal(digest(file), sha256);
  const item = release.downloads.find((download) => download.name === name);
  assert.deepEqual(item, { name, path: `/minz-lineup/downloads/${name}`, sha256, bytes });
}
assert.equal(release.nonExecutingSamples.length, 4);
for (const sample of release.nonExecutingSamples) {
  assert.match(sample.name, /^[a-z][a-z0-9.-]+\.json$/);
  assert.equal(sample.path, `/minz-lineup/samples/${sample.name}`);
  const bytes = await read(`samples/${sample.name}`);
  assert.equal(bytes.length, sample.bytes);
  assert.equal(digest(bytes), sample.sha256);
  JSON.parse(bytes.toString("utf8"));
}
const engineering = await json("samples/engineering-validation.json");
assert.equal(engineering.sourceCommit, "cc81759e65337a66967ba321ec8d9e56df88901f");
assert.deepEqual(engineering.existingTests, { passed: 45, failed: 0, skipped: 0 });
assert.equal(engineering.basis, "ACTUAL_LOCAL_WINDOWS_SYNTHETIC_TESTS_NOT_PRODUCTION");
assert.equal(engineering.sampleExecutable, false);
assert.equal(engineering.snapshotPurpose, "COMPARISON_ONLY");
assert.equal(engineering.taskContractExecution, "NOT_PRESENT_IN_PINNED_NAMESPACE_NOT_TESTED");
assert.equal(engineering.diff.readOnlyBytesAndMtimesPreserved, true);
const controlPlane = await json("samples/control-plane.example.json");
assert.equal(controlPlane.r13SourceRuntimeProvenance, "NOT_VERIFIED");
assert.equal(controlPlane.workerStart, false);
assert.equal(controlPlane.queueConsumption, false);
assert.equal(controlPlane.sampleExecutable, false);

const html = (await read("index.html")).toString("utf8");
assert.match(html, /lang="ko"/);
assert.match(html, /charset="utf-8"/);
assert.match(html, /<link rel="canonical" href="https:\/\/www\.biz2lab\.com\/minz-lineup">/);
assert.match(html, /<meta name="description" content="[^"<>]{40,}"/);
assert.match(html, /<meta property="og:site_name" content="Biz2Lab">/);
assert.match(html, /prefers-reduced-motion:reduce/);
assert.match(html, /R13 source\/runtime provenance는 아직 검증되지 않았습니다/);
assert.match(html, /TaskContract→ProofReceipt 실행/);
assert.match(html, /https:\/\/github\.com\/mizzang0305-oss\/Biz2Lab_Os\/issues\/new/);
assert.doesNotMatch(html, /<form\b|\/api\/commercial|\/ko\/|studio\.vercel|onclick=|실행 시작/);
for (const match of html.matchAll(/href="(\/minz-lineup\/[^"#?]+)"/g)) {
  if (match[1] === "/minz-lineup/showcase") continue;
  const relative = match[1].slice("/minz-lineup/".length);
  assert.ok((await stat(path.join(root, relative))).isFile(), `Missing public link ${match[1]}`);
}

const artifact = await json("showcase-artifact-manifest.json");
assert.equal(artifact.basePath, "/minz-lineup/showcase");
for (const item of artifact.files) {
  const target = path.resolve(root, "showcase", item.path);
  assert.ok(target.startsWith(`${path.join(root, "showcase")}${path.sep}`), "Unsafe artifact path");
  const bytes = await readFile(target);
  assert.equal(bytes.length, item.bytes);
  assert.equal(digest(bytes), item.sha256);
}
for (const filename of ["showcase/index.html", "showcase/gallery/index.html"]) {
  const page = (await read(filename)).toString("utf8");
  assert.doesNotMatch(page, /(?:src|href)="\/_next\//);
  assert.match(page, /\/minz-lineup\/showcase\/_next\/static\//);
  assert.match(page, /noindex/);
  assert.doesNotMatch(page, /href="\/(?:gallery|lineup)\/?"/);
  if (filename === "showcase/index.html") {
    assert.match(page, /https:\/\/github\.com\/mizzang0305-oss\/Biz2Lab_Os\/issues\/new/);
  }
}
console.log(JSON.stringify({ result: "PASS", downloads: 2, samples: 4, staticShowcaseFiles: artifact.files.length, originalPackageHashesPreserved: true }));
