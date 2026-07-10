import assert from "node:assert/strict";
import test from "node:test";

import { auditContentOriginality } from "@/lib/content-originality";

test("published content avoids scaled template and grammar risk", () => {
  const audit = auditContentOriginality();

  assert.ok(audit.postCount > 0);
  assert.equal(audit.repeatedLongParagraphGroups, 0);
  assert.equal(audit.overusedHeadingGroups, 0);
  assert.equal(audit.particleErrorCount, 0);
  assert.equal(audit.emptySectionCount, 0);
  assert.ok(audit.maxPairSimilarity <= 0.4);
  assert.deepEqual(audit.issues, []);
});
