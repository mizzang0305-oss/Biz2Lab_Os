import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AccountsReceivableEvidencePanel, CashConversionEvidencePanel } from "@/components/evidence/OperationalEvidencePanels";
import accountsReceivableFixture from "@/data/evidence-fixtures/accounts-receivable.json";
import cashConversionFixture from "@/data/evidence-fixtures/cash-conversion.json";
import {
  buildAccountsReceivableCsv,
  buildCashConversionCsv,
  calculateAccountsReceivableEvidence,
  calculateCashConversionEvidence,
} from "@/lib/operational-evidence";

test("accounts receivable fixture calculates overdue days and keeps disputes out of automatic ranking", () => {
  const first = calculateAccountsReceivableEvidence(accountsReceivableFixture);
  const second = calculateAccountsReceivableEvidence(accountsReceivableFixture);

  assert.deepEqual(first, second);
  assert.deepEqual(first.map((item) => ({
    id: item.account_id,
    overdue: item.overdue_days,
    bucket: item.aging_bucket,
    score: item.priority_score,
    band: item.priority_band,
    rank: item.priority_rank,
  })), [
    { id: "AR-A", overdue: 11, bucket: "8~14일", score: 30, band: "중간", rank: 1 },
    { id: "AR-B", overdue: 16, bucket: "15~30일", score: null, band: "사람 분쟁 검토", rank: null },
    { id: "AR-C", overdue: -4, bucket: "약속일 전", score: 5, band: "관찰", rank: 2 },
  ]);
  assert.match(first[1].recommended_next_step, /사람이 대조/);
});

test("cash conversion fixture identifies the exact stalled stage without treating revenue as cash", () => {
  const results = calculateCashConversionEvidence(cashConversionFixture);

  assert.deepEqual(results.map((item) => ({
    id: item.transaction_id,
    outstanding: item.outstanding_amount,
    gap: item.revenue_cash_gap,
    status: item.current_status,
    stage: item.stalled_stage,
  })), [
    { id: "TX-A", outstanding: 0, gap: 0, status: "입금 완료", stage: "완료" },
    { id: "TX-B", outstanding: 550000, gap: 550000, status: "부분 입금", stage: "입금" },
    { id: "TX-C", outstanding: 0, gap: 640000, status: "청구 대기", stage: "청구" },
  ]);
});

test("download CSV files are exact outputs of the reviewed fixtures", () => {
  assert.equal(
    fs.readFileSync(path.join(process.cwd(), "public", "downloads", "accounts-receivable-aging.csv"), "utf8"),
    buildAccountsReceivableCsv(accountsReceivableFixture),
  );
  assert.equal(
    fs.readFileSync(path.join(process.cwd(), "public", "downloads", "cash-conversion-bridge.csv"), "utf8"),
    buildCashConversionCsv(cashConversionFixture),
  );
});

test("operational evidence contains only explicit synthetic labels and no contact or secret patterns", () => {
  const serialized = JSON.stringify({ accountsReceivableFixture, cashConversionFixture });

  assert.match(serialized, /재현용 익명 예시 데이터/);
  assert.doesNotMatch(serialized, /\b01[016789]-?\d{3,4}-?\d{4}\b/);
  assert.doesNotMatch(serialized, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(serialized, /(?:api[_-]?key|access[_-]?token|secret)/i);
});

test("operational evidence panels disclose fixture scope in rendered HTML", () => {
  const receivables = renderToStaticMarkup(createElement(AccountsReceivableEvidencePanel));
  const cash = renderToStaticMarkup(createElement(CashConversionEvidencePanel));

  for (const html of [receivables, cash]) {
    assert.match(html, /재현용 익명 예시 데이터/);
    assert.match(html, /실제/);
    assert.doesNotMatch(html, /input|textarea|button/);
  }
  assert.match(receivables, /자동 연락 없음/);
  assert.match(cash, /세무상 매출 인식/);
});
