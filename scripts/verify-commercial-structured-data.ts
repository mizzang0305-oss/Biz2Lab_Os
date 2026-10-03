import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const appOutput = join(process.cwd(), ".next", "server", "app");
const onurimRoutes = ["index", "health"];
const commercialRoutes = ["services", "mybiz", "web", "minz-mind"];

for (const route of onurimRoutes) {
  const html = readFileSync(join(appOutput, `${route}.html`), "utf8");
  assert.match(html, /publishingPrinciples/, `${route} must retain ONURIM schema`);
  assert.match(html, /"@type":"Organization"/, `${route} must retain Organization schema`);
  assert.match(html, /"@type":"WebSite"/, `${route} must retain WebSite schema`);
}

for (const route of commercialRoutes) {
  const html = readFileSync(join(appOutput, `${route}.html`), "utf8");
  assert.doesNotMatch(html, /publishingPrinciples/, `${route} must not inherit ONURIM schema`);
  assert.doesNotMatch(html, /"@type":"Organization"/, `${route} must not inherit ONURIM Organization schema`);
  assert.doesNotMatch(html, /"@type":"WebSite"/, `${route} must not inherit ONURIM WebSite schema`);
}

console.log("Commercial structured-data route boundary: PASS (6 built routes)");
