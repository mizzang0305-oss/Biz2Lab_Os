"use client";

import { useMemo, useState } from "react";

import type {
  MedicalReviewClaimPacket,
  MedicalReviewDecision,
  MedicalReviewEntry,
  MedicalReviewerAssignment,
} from "@/lib/health-v3/medical-review-types";
import {
  deriveMedicalReviewWorkflowState,
  getReviewEntryError,
  isReviewerAssignmentComplete,
  medicalReviewDecisions,
} from "@/lib/health-v3/medical-review-types";
import {
  createMedicalReviewCsvRowsFromClaims,
  serializeMedicalReviewCsv,
} from "@/lib/health-v3/review-csv";

type MedicalReviewWorkspaceProps = {
  claims: MedicalReviewClaimPacket[];
};

const emptyAssignment: MedicalReviewerAssignment = {
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

function emptyEntry(): MedicalReviewEntry {
  return { decision: "", proposedText: "", rationale: "", specialistArea: "", reviewedAt: "" };
}

const decisionLabels: Record<MedicalReviewDecision, string> = {
  APPROVE: "APPROVE · 현재 문장 승인",
  REVISE: "REVISE · 수정 필요",
  REMOVE: "REMOVE · 삭제 필요",
  SPECIALIST_REQUIRED: "SPECIALIST_REQUIRED · 전문과 검토 필요",
};

export function MedicalReviewWorkspace({ claims }: MedicalReviewWorkspaceProps) {
  const [assignment, setAssignment] = useState(emptyAssignment);
  const [entries, setEntries] = useState<Record<string, MedicalReviewEntry>>({});
  const [articleFilter, setArticleFilter] = useState("ALL");
  const [decisionFilter, setDecisionFilter] = useState("ALL");
  const [exportError, setExportError] = useState("");

  const reviewerAssigned = isReviewerAssignmentComplete(assignment);
  const decisionCount = Object.values(entries).filter((entry) => entry.decision).length;
  const workflowState = deriveMedicalReviewWorkflowState(reviewerAssigned, decisionCount, claims.length);
  const entryErrors = Object.entries(entries)
    .map(([claimId, entry]) => ({ claimId, message: getReviewEntryError(entry) }))
    .filter((item) => item.message);

  const articleOptions = useMemo(
    () => Array.from(new Map(claims.map((claim) => [claim.articleSlug, claim.articleTitle])).entries()),
    [claims],
  );
  const visibleClaims = claims.filter((claim) => {
    const entry = entries[claim.claimId] ?? emptyEntry();
    return (articleFilter === "ALL" || claim.articleSlug === articleFilter) &&
      (decisionFilter === "ALL" || (decisionFilter === "PENDING" ? !entry.decision : entry.decision === decisionFilter));
  });

  function updateAssignment<K extends keyof MedicalReviewerAssignment>(key: K, value: MedicalReviewerAssignment[K]) {
    setAssignment((current) => ({ ...current, [key]: value }));
    setExportError("");
  }

  function updateEntry(claimId: string, patch: Partial<MedicalReviewEntry>) {
    setEntries((current) => {
      const previous = current[claimId] ?? emptyEntry();
      const next = { ...previous, ...patch };
      if (patch.decision !== undefined) {
        next.reviewedAt = patch.decision ? previous.reviewedAt || new Date().toISOString() : "";
      }
      return { ...current, [claimId]: next };
    });
    setExportError("");
  }

  function downloadReviewCsv() {
    if (!reviewerAssigned) {
      setExportError("실제 검토자 정보와 두 확인 항목을 먼저 완료해야 합니다.");
      return;
    }
    if (entryErrors.length > 0) {
      setExportError(`추가 입력이 필요한 판정이 ${entryErrors.length}건 있습니다.`);
      return;
    }

    const csv = serializeMedicalReviewCsv(
      createMedicalReviewCsvRowsFromClaims(claims, assignment, entries, workflowState),
    );
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `onurim-medical-review-${workflowState.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article className="onurim-review-workspace" data-workflow-state={workflowState}>
      <header className="onurim-review-header">
        <p className="onurim-eyebrow">오누림 의료 검토판 · 보호된 Preview</p>
        <h1>47개 고위험 Claim 의료 검토</h1>
        <p>현재 문장과 공식 출처를 대조해 각 Claim을 APPROVE, REVISE, REMOVE 또는 SPECIALIST_REQUIRED로 판정합니다.</p>
        <div className="onurim-review-state" aria-live="polite">
          <span>현재 세션 상태</span>
          <strong>{workflowState}</strong>
          <small>저장소 공식 상태는 실제 reviewer evidence를 회수하기 전까지 ONURIM_MEDICAL_REVIEW_PACKAGE_READY입니다.</small>
        </div>
      </header>

      <section className="onurim-review-boundary" aria-labelledby="review-boundary-title">
        <h2 id="review-boundary-title">검토 경계</h2>
        <ul>
          <li>이 화면은 진료·진단 시스템이 아니며 환자정보를 입력하지 않습니다.</li>
          <li>면허번호 원문은 입력하지 말고, 확인한 방법과 관할만 기록합니다.</li>
          <li>입력은 서버에 저장되지 않습니다. 작업 중 CSV를 내려받아 보호된 경로로 전달해야 합니다.</li>
          <li>첫 판정 입력 시 세션은 ONURIM_MEDICAL_REVIEW_IN_PROGRESS가 되지만 검수 완료를 뜻하지 않습니다.</li>
        </ul>
      </section>

      <section className="onurim-review-assignment" aria-labelledby="reviewer-assignment-title">
        <div className="onurim-review-section-heading">
          <div><p className="onurim-mini-label">STEP 1</p><h2 id="reviewer-assignment-title">실제 검토자 지정</h2></div>
          <span className={reviewerAssigned ? "is-complete" : "is-pending"}>{reviewerAssigned ? "REVIEWER_ASSIGNED" : "LICENSED_REVIEWER_SOURCING"}</span>
        </div>
        <div className="onurim-review-form-grid">
          <label>실명<input value={assignment.realName} onChange={(event) => updateAssignment("realName", event.target.value)} autoComplete="name" /></label>
          <label>면허 종류<input value={assignment.licenseCategory} onChange={(event) => updateAssignment("licenseCategory", event.target.value)} placeholder="예: 의사" /></label>
          <label>면허 관할<input value={assignment.licenseJurisdiction} onChange={(event) => updateAssignment("licenseJurisdiction", event.target.value)} placeholder="예: 대한민국" /></label>
          <label>면허 확인 방법<input value={assignment.licenseVerificationMethod} onChange={(event) => updateAssignment("licenseVerificationMethod", event.target.value)} placeholder="번호가 아닌 확인 경로·일자" /></label>
          <label>소속(선택)<input value={assignment.affiliation} onChange={(event) => updateAssignment("affiliation", event.target.value)} /></label>
          <label>이해관계 공개<input value={assignment.conflictDisclosure} onChange={(event) => updateAssignment("conflictDisclosure", event.target.value)} placeholder="없음 또는 관련 관계" /></label>
        </div>
        <div className="onurim-review-attestations">
          <label><input type="checkbox" checked={assignment.scopeAttested} onChange={(event) => updateAssignment("scopeAttested", event.target.checked)} /> 지정 범위를 검토할 수 있는 실제 면허와 역량이 있음을 확인합니다.</label>
          <label><input type="checkbox" checked={assignment.sourceReviewAttested} onChange={(event) => updateAssignment("sourceReviewAttested", event.target.checked)} /> 각 판정 전에 연결된 공식 출처 원문을 직접 확인하겠습니다.</label>
          <label><input type="checkbox" checked={assignment.displayPermission} onChange={(event) => updateAssignment("displayPermission", event.target.checked)} /> 별도 Owner 승인 후 이름·소속 공개에 동의합니다(선택).</label>
        </div>
      </section>

      <section className="onurim-review-claims" aria-labelledby="claim-review-title">
        <div className="onurim-review-section-heading">
          <div><p className="onurim-mini-label">STEP 2</p><h2 id="claim-review-title">Claim별 판정</h2></div>
          <div className="onurim-review-progress"><strong>{decisionCount} / {claims.length}</strong><span>판정 입력</span></div>
        </div>
        <div className="onurim-review-filters">
          <label>질환<select value={articleFilter} onChange={(event) => setArticleFilter(event.target.value)}><option value="ALL">전체 질환</option>{articleOptions.map(([slug, title]) => <option key={slug} value={slug}>{title}</option>)}</select></label>
          <label>판정<select value={decisionFilter} onChange={(event) => setDecisionFilter(event.target.value)}><option value="ALL">전체 판정</option><option value="PENDING">PENDING</option>{medicalReviewDecisions.map((decision) => <option key={decision} value={decision}>{decision}</option>)}</select></label>
          <span>{visibleClaims.length}건 표시</span>
        </div>

        <div className="onurim-review-claim-list">
          {visibleClaims.map((claim) => {
            const entry = entries[claim.claimId] ?? emptyEntry();
            const error = getReviewEntryError(entry);
            return (
              <section key={claim.claimId} className="onurim-review-claim" data-claim-id={claim.claimId}>
                <div className="onurim-review-claim-meta">
                  <span>{claim.articleTitle}</span><code>{claim.claimId}</code><strong data-risk={claim.wordingRisk}>{claim.wordingRisk}</strong><span>{claim.claimType}</span>
                </div>
                <h3>현재 문장</h3>
                <blockquote>{claim.currentText}</blockquote>
                <div className="onurim-review-question"><strong>검토 질문</strong><p>{claim.reviewQuestion}</p></div>
                <details className="onurim-review-sources">
                  <summary>공식 출처 {claim.sources.length}개 확인</summary>
                  <ul>{claim.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} · {source.title}</a><span>{source.id} · 자료일 {source.sourceDate} · 확인일 {source.retrievedAt}</span></li>)}</ul>
                </details>
                <div className="onurim-review-entry">
                  <label>판정<select value={entry.decision} disabled={!reviewerAssigned} onChange={(event) => updateEntry(claim.claimId, { decision: event.target.value as MedicalReviewEntry["decision"] })}><option value="">PENDING</option>{medicalReviewDecisions.map((decision) => <option key={decision} value={decision}>{decisionLabels[decision]}</option>)}</select></label>
                  {entry.decision === "REVISE" ? <label className="is-wide">제안 수정 문장<textarea value={entry.proposedText} onChange={(event) => updateEntry(claim.claimId, { proposedText: event.target.value })} /></label> : null}
                  {entry.decision === "SPECIALIST_REQUIRED" ? <label>필요 전문 분야<input value={entry.specialistArea} onChange={(event) => updateEntry(claim.claimId, { specialistArea: event.target.value })} /></label> : null}
                  {entry.decision && entry.decision !== "APPROVE" ? <label className="is-wide">검토 근거<textarea value={entry.rationale} onChange={(event) => updateEntry(claim.claimId, { rationale: event.target.value })} /></label> : null}
                  {error ? <p className="onurim-review-error" role="alert">{error}</p> : null}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="onurim-review-export" aria-labelledby="review-export-title">
        <div><p className="onurim-mini-label">STEP 3</p><h2 id="review-export-title">검토 기록 내보내기</h2><p>부분 검토 중에도 CSV를 내려받을 수 있습니다. PENDING Claim은 그대로 남아 다음 검토자가 범위를 확인할 수 있습니다.</p></div>
        <div className="onurim-review-export-actions">
          <a href="/health/review/medical/packet.csv">빈 47-Claim CSV 패킷</a>
          <button type="button" onClick={downloadReviewCsv}>현재 검토 CSV 저장</button>
        </div>
        {exportError ? <p className="onurim-review-error" role="alert">{exportError}</p> : null}
      </section>
    </article>
  );
}
