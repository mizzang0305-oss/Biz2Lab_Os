import { readFileSync } from "node:fs";
import path from "node:path";

import {
  medicalReviewClaims,
  medicalReviewPacketHash,
  medicalReviewPacketVersion,
} from "../lib/health-v3/medical-review";
import {
  deriveMedicalReviewWorkflowState,
  getReviewEntryError,
  isReviewerAssignmentComplete,
  medicalReviewDecisions,
} from "../lib/health-v3/medical-review-types";
import type {
  MedicalReviewEntry,
  MedicalReviewerAssignment,
} from "../lib/health-v3/medical-review-types";
import { parseMedicalReviewCsv } from "../lib/health-v3/review-csv";

const input = process.argv[2];
if (!input) {
  console.error("Usage: npm run validate:health-medical-review -- <review-results.csv>");
  process.exit(2);
}

const filePath = path.resolve(input);
const rows = parseMedicalReviewCsv(readFileSync(filePath, "utf8"));
const failures: string[] = [];
const expectedClaims = new Map(medicalReviewClaims.map((claim) => [claim.claimId, claim]));
const seenClaimIds = new Set<string>();

function fail(message: string) {
  failures.push(message);
}

if (rows.length !== medicalReviewClaims.length) {
  fail(`expected ${medicalReviewClaims.length} Claim rows, received ${rows.length}`);
}

for (const row of rows) {
  if (seenClaimIds.has(row.claim_id)) fail(`duplicate claim_id: ${row.claim_id}`);
  seenClaimIds.add(row.claim_id);

  const expected = expectedClaims.get(row.claim_id);
  if (!expected) {
    fail(`unknown claim_id: ${row.claim_id}`);
    continue;
  }
  if (row.packet_version !== medicalReviewPacketVersion) fail(`packet_version mismatch: ${row.claim_id}`);
  if (row.packet_hash !== medicalReviewPacketHash) fail(`packet_hash mismatch: ${row.claim_id}`);
  if (row.claim_version_hash !== expected.claimVersionHash) fail(`claim_version_hash mismatch: ${row.claim_id}`);
  if (row.article_slug !== expected.articleSlug) fail(`article_slug mismatch: ${row.claim_id}`);
  if (row.current_text !== expected.currentText) fail(`current_text mismatch: ${row.claim_id}`);
  if (row.risk_level !== expected.wordingRisk) fail(`risk_level mismatch: ${row.claim_id}`);
  if (row.review_question !== expected.reviewQuestion) fail(`review_question mismatch: ${row.claim_id}`);

  const expectedSourceIds = expected.sources.map((source) => source.id).join(" | ");
  const expectedSourceUrls = expected.sources.map((source) => source.url).join(" | ");
  if (row.source_ids !== expectedSourceIds) fail(`source_ids mismatch: ${row.claim_id}`);
  if (row.source_urls !== expectedSourceUrls) fail(`source_urls mismatch: ${row.claim_id}`);
}

for (const claim of medicalReviewClaims) {
  if (!seenClaimIds.has(claim.claimId)) fail(`missing claim_id: ${claim.claimId}`);
}

const reviewerFields = [
  "reviewer_real_name",
  "license_category",
  "license_jurisdiction",
  "license_verification_method",
  "reviewer_affiliation",
  "display_permission",
  "conflict_disclosure",
  "scope_attested",
  "source_review_attested",
] as const;

for (const field of reviewerFields) {
  const values = new Set(rows.map((row) => row[field]));
  if (values.size > 1) fail(`reviewer assignment must be identical on every row: ${field}`);
}

function csvBoolean(value: string, field: string) {
  if (value !== "true" && value !== "false") fail(`${field} must be true or false`);
  return value === "true";
}

const first = rows[0];
const assignment: MedicalReviewerAssignment = {
  realName: first?.reviewer_real_name ?? "",
  licenseCategory: first?.license_category ?? "",
  licenseJurisdiction: first?.license_jurisdiction ?? "",
  licenseVerificationMethod: first?.license_verification_method ?? "",
  affiliation: first?.reviewer_affiliation ?? "",
  displayPermission: csvBoolean(first?.display_permission ?? "", "display_permission"),
  conflictDisclosure: first?.conflict_disclosure ?? "",
  scopeAttested: csvBoolean(first?.scope_attested ?? "", "scope_attested"),
  sourceReviewAttested: csvBoolean(first?.source_review_attested ?? "", "source_review_attested"),
};

const allowedDecisions = new Set<string>(medicalReviewDecisions);
const entries: MedicalReviewEntry[] = rows.map((row) => {
  if (row.decision && !allowedDecisions.has(row.decision)) fail(`invalid decision: ${row.claim_id}/${row.decision}`);
  const entry: MedicalReviewEntry = {
    decision: allowedDecisions.has(row.decision) ? row.decision as MedicalReviewEntry["decision"] : "",
    proposedText: row.proposed_text,
    rationale: row.reviewer_rationale,
    specialistArea: row.specialist_area,
    reviewedAt: row.reviewed_at,
  };
  const entryError = getReviewEntryError(entry);
  if (entryError) fail(`${row.claim_id}: ${entryError}`);
  if (entry.decision && !entry.reviewedAt) fail(`${row.claim_id}: reviewed_at is required for a decision`);
  if (entry.reviewedAt && Number.isNaN(Date.parse(entry.reviewedAt))) fail(`${row.claim_id}: reviewed_at must be an ISO-compatible date`);
  return entry;
});

const reviewerAssigned = isReviewerAssignmentComplete(assignment);
const decisionCount = entries.filter((entry) => entry.decision).length;
if (decisionCount > 0 && !reviewerAssigned) fail("decisions exist without a complete reviewer assignment");

const workflowState = deriveMedicalReviewWorkflowState(reviewerAssigned, decisionCount, rows.length);
for (const row of rows) {
  if (row.workflow_state !== workflowState) fail(`workflow_state mismatch: ${row.claim_id}`);
}

const specialistRequiredCount = entries.filter((entry) => entry.decision === "SPECIALIST_REQUIRED").length;
const result = {
  file: filePath,
  packetVersion: medicalReviewPacketVersion,
  packetHash: medicalReviewPacketHash,
  claimRows: rows.length,
  reviewerAssigned,
  decisionCount,
  pendingCount: rows.length - decisionCount,
  specialistRequiredCount,
  derivedWorkflowState: workflowState,
  medicalReviewCompleted: false,
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length > 0) process.exitCode = 1;
