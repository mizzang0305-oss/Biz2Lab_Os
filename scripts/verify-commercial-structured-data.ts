import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const output = join(process.cwd(), ".next", "server", "app");

for (const route of ["index", "health", "health/hypertension"]) {
  const html = readFileSync(join(output, `${route}.html`), "utf8");
  assert.match(html, /publishingPrinciples/, `${route}: ONURIM schema must remain`);
  assert.match(html, /"@type":"Organization"/, `${route}: Organization schema must remain`);
  assert.match(html, /"@type":"WebSite"/, `${route}: WebSite schema must remain`);
}

for (const route of ["services", "mybiz", "web", "minz-mind"]) {
  const html = readFileSync(join(output, `${route}.html`), "utf8");
  assert.doesNotMatch(html, /publishingPrinciples/, `${route}: ONURIM schema leaked`);
  assert.doesNotMatch(html, /"@type":"Organization"/, `${route}: ONURIM Organization schema leaked`);
  assert.doesNotMatch(html, /"@type":"WebSite"/, `${route}: ONURIM WebSite schema leaked`);
}

console.log("Commercial structured-data boundary: PASS (7 built routes)");
