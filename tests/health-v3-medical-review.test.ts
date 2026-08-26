import assert from "node:assert/strict";
import test from "node:test";

import {
  createMedicalReviewCsvRows,
  currentMedicalReviewState,
  medicalReviewClaims,
  medicalReviewPacketHash,
} from "../lib/health-v3/medical-review";
import {
  deriveMedicalReviewWorkflowState,
  getReviewEntryError,
  isReviewerAssignmentComplete,
} from "../lib/health-v3/medical-review-types";
import type {
  MedicalReviewEntry,
  MedicalReviewerAssignment,
} from "../lib/health-v3/medical-review-types";
import {
  parseMedicalReviewCsv,
  serializeMedicalReviewCsv,
} from "../lib/health-v3/review-csv";

const testOnlyReviewer: MedicalReviewerAssignment = {
  realName: "TEST_REVIEWER_NOT_REAL",
  licenseCategory: "TEST_ONLY",
  licenseJurisdiction: "TEST_ONLY",
  licenseVerificationMethod: "TEST_FIXTURE_ONLY",
  affiliation: "",
  conflictDisclosure: "TEST_ONLY_NONE",
  displayPermission: false,
  scopeAttested: true,
  sourceReviewAttested: true,
};

test("medical review packet freezes exactly 47 high-risk Claims", () => {
  assert.equal(medicalReviewClaims.length, 47);
  assert.match(medicalReviewPacketHash, /^[a-f0-9]{64}$/);
  assert.equal(new Set(medicalReviewClaims.map((claim) => claim.claimId)).size, 47);
  assert.equal(new Set(medicalReviewClaims.map((claim) => claim.claimVersionHash)).size, 47);
  assert.ok(medicalReviewClaims.every((claim) => claim.sources.length > 0));
  assert.ok(medicalReviewClaims.every((claim) => claim.sources.every((source) => source.url.startsWith("https://"))));
  assert.deepEqual(currentMedicalReviewState, {
    packageStatus: "ONURIM_MEDICAL_REVIEW_PACKAGE_READY",
    reviewerAssignmentStatus: "LICENSED_REVIEWER_SOURCING",
    reviewerAssigned: false,
    medicalReviewInProgress: false,
    medicalReviewCompleted: false,
    realHumanReaderTestPerformed: false,
  });
});

test("CSV round-trip preserves quotes, commas and newlines", () => {
  const rows = createMedicalReviewCsvRows();
  rows[0].reviewer_rationale = "쉼표, 따옴표 \"확인\"과\n줄바꿈";
  const parsed = parseMedicalReviewCsv(serializeMedicalReviewCsv(rows));
  assert.equal(parsed.length, 47);
  assert.equal(parsed[0].reviewer_rationale, rows[0].reviewer_rationale);
  assert.equal(parsed[0].current_text, rows[0].current_text);
});

test("workflow needs a real assignment record and then one decision", () => {
  assert.equal(isReviewerAssignmentComplete(testOnlyReviewer), true);
  assert.equal(deriveMedicalReviewWorkflowState(false, 0, 47), "ONURIM_MEDICAL_REVIEW_PACKAGE_READY");
  assert.equal(deriveMedicalReviewWorkflowState(true, 0, 47), "REVIEWER_ASSIGNED");
  assert.equal(deriveMedicalReviewWorkflowState(true, 1, 47), "ONURIM_MEDICAL_REVIEW_IN_PROGRESS");
  assert.equal(
    deriveMedicalReviewWorkflowState(true, 47, 47),
    "MEDICAL_REVIEW_DECISIONS_COMPLETE_PENDING_EDITORIAL_APPLICATION",
  );
});

test("non-approval decisions enforce the required clinical record", () => {
  const revise: MedicalReviewEntry = {
    decision: "REVISE",
    proposedText: "",
    rationale: "",
    specialistArea: "",
    reviewedAt: "2026-08-25T00:00:00.000Z",
  };
  assert.equal(getReviewEntryError(revise), "REVISE에는 수정 문장이 필요합니다.");
  revise.proposedText = "TEST_ONLY_REVISED_TEXT";
  assert.equal(getReviewEntryError(revise), "REVISE에는 검토 근거가 필요합니다.");
  revise.rationale = "TEST_ONLY_RATIONALE";
  assert.equal(getReviewEntryError(revise), null);

  const specialist: MedicalReviewEntry = {
    decision: "SPECIALIST_REQUIRED",
    proposedText: "",
    rationale: "TEST_ONLY_RATIONALE",
    specialistArea: "",
    reviewedAt: "2026-08-25T00:00:00.000Z",
  };
  assert.equal(getReviewEntryError(specialist), "SPECIALIST_REQUIRED에는 필요한 전문 분야가 필요합니다.");
});
