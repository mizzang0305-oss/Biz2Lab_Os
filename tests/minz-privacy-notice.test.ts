import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { GET as lineup } from "../app/minz-lineup/route";
import { GET as showcase } from "../app/minz-lineup/showcase/route";
import { GET as gallery } from "../app/minz-lineup/showcase/gallery/route";
import { GET as editor } from "../app/minz-lineup/design-factory-v5/route";

for (const [file, get, hasBase] of [
  ["index.html", lineup, false],
  ["showcase/index.html", showcase, false],
  ["showcase/gallery/index.html", gallery, false],
  ["design-factory-v5/index.html", editor, true],
] as const) {
  test(`served ${file} links to MINZ guidance without changing the pinned artifact`, async () => {
    const original = await readFile(`public/minz-lineup/${file}`, "utf8");
    const response = await get();
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /href="\/privacy#privacy-minz"/);
    assert.equal((html.match(/data-minz-privacy-notice/g) ?? []).length, 1);
    const restored = html.replace(/<div role="contentinfo" aria-label="MINZ 개인정보 안내" data-minz-privacy-notice[^]*?<\/div>/, "");
    assert.equal(restored, hasBase ? original.replace("<head>", '<head><base href="/minz-lineup/design-factory-v5/">') : original);
  });
}
