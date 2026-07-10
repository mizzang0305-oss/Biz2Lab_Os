import { auditContentOriginality } from "@/lib/content-originality";

const result = auditContentOriginality();

if (result.issues.length > 0) {
  console.error(JSON.stringify(result, null, 2));
  throw new Error(`content originality audit failed with ${result.issues.length} issue(s)`);
}

console.log(
  `audit:content-originality PASS (${result.postCount} posts, max similarity ${result.maxPairSimilarity}, ${result.repeatedLongParagraphGroups} repeated long paragraphs)`,
);
