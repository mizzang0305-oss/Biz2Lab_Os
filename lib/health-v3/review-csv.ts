export const medicalReviewCsvHeaders = [
  "packet_version",
  "packet_hash",
  "claim_version_hash",
  "article_slug",
  "article_title",
  "claim_id",
  "claim_type",
  "section",
  "current_text",
  "source_ids",
  "source_organizations",
  "source_titles",
  "source_urls",
  "source_dates",
  "source_retrieved_at",
  "risk_level",
  "review_question",
  "decision",
  "proposed_text",
  "reviewer_rationale",
  "specialist_area",
  "reviewer_real_name",
  "license_category",
  "license_jurisdiction",
  "license_verification_method",
  "reviewer_affiliation",
  "display_permission",
  "conflict_disclosure",
  "scope_attested",
  "source_review_attested",
  "reviewed_at",
  "workflow_state",
] as const;

export type MedicalReviewCsvHeader = (typeof medicalReviewCsvHeaders)[number];
export type MedicalReviewCsvRow = Record<MedicalReviewCsvHeader, string>;

const blankAssignment: MedicalReviewerAssignment = {
  realName: "",
  licenseCategory: "",
  licenseJurisdiction: "",
  licenseVerificationMethod: "",
  affiliation: "",
  conflictDisclosure: "",
  displayPermission: false,
  scopeAttested: false,
  sourceReviewAttested: false,
};

const blankEntry: MedicalReviewEntry = {
  decision: "",
  proposedText: "",
  rationale: "",
  specialistArea: "",
  reviewedAt: "",
};

export function createMedicalReviewCsvRowsFromClaims(
  claims: MedicalReviewClaimPacket[],
  assignment: MedicalReviewerAssignment = blankAssignment,
  entries: Record<string, MedicalReviewEntry> = {},
  workflowState: MedicalReviewWorkflowState = "ONURIM_MEDICAL_REVIEW_PACKAGE_READY",
): MedicalReviewCsvRow[] {
  return claims.map((claim) => {
    const entry = entries[claim.claimId] ?? blankEntry;
    return {
      packet_version: claim.packetVersion,
      packet_hash: claim.packetHash,
      claim_version_hash: claim.claimVersionHash,
      article_slug: claim.articleSlug,
      article_title: claim.articleTitle,
      claim_id: claim.claimId,
      claim_type: claim.claimType,
      section: claim.section,
      current_text: claim.currentText,
      source_ids: claim.sources.map((source) => source.id).join(" | "),
      source_organizations: claim.sources.map((source) => source.organization).join(" | "),
      source_titles: claim.sources.map((source) => source.title).join(" | "),
      source_urls: claim.sources.map((source) => source.url).join(" | "),
      source_dates: claim.sources.map((source) => source.sourceDate).join(" | "),
      source_retrieved_at: claim.sources.map((source) => source.retrievedAt).join(" | "),
      risk_level: claim.wordingRisk,
      review_question: claim.reviewQuestion,
      decision: entry.decision,
      proposed_text: entry.proposedText,
      reviewer_rationale: entry.rationale,
      specialist_area: entry.specialistArea,
      reviewer_real_name: assignment.realName,
      license_category: assignment.licenseCategory,
      license_jurisdiction: assignment.licenseJurisdiction,
      license_verification_method: assignment.licenseVerificationMethod,
      reviewer_affiliation: assignment.affiliation,
      display_permission: String(assignment.displayPermission),
      conflict_disclosure: assignment.conflictDisclosure,
      scope_attested: String(assignment.scopeAttested),
      source_review_attested: String(assignment.sourceReviewAttested),
      reviewed_at: entry.reviewedAt,
      workflow_state: workflowState,
    };
  });
}

function escapeCsvCell(value: string) {
  return /[",\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

export function serializeMedicalReviewCsv(rows: MedicalReviewCsvRow[]) {
  return [
    medicalReviewCsvHeaders.join(","),
    ...rows.map((row) => medicalReviewCsvHeaders.map((header) => escapeCsvCell(row[header])).join(",")),
  ].join("\r\n");
}

export function parseMedicalReviewCsv(csv: string) {
  const source = csv.replace(/^\uFEFF/, "");
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"' && field.length === 0) quoted = true;
    else if (character === ",") {
      record.push(field);
      field = "";
    } else if (character === "\n") {
      record.push(field.replace(/\r$/, ""));
      records.push(record);
      record = [];
      field = "";
    } else field += character;
  }

  if (field.length > 0 || record.length > 0) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }

  const [headerRecord, ...dataRecords] = records;
  if (!headerRecord || headerRecord.join("|") !== medicalReviewCsvHeaders.join("|")) {
    throw new Error("Medical review CSV header contract mismatch.");
  }
  return dataRecords.map((values) =>
    Object.fromEntries(medicalReviewCsvHeaders.map((header, index) => [header, values[index] ?? ""])) as MedicalReviewCsvRow,
  );
}
import type {
  MedicalReviewClaimPacket,
  MedicalReviewEntry,
  MedicalReviewerAssignment,
  MedicalReviewWorkflowState,
} from "./medical-review-types";
