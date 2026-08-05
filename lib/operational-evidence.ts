import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const optionalIsoDateSchema = z.string().regex(isoDate).nullable();

const accountsReceivableRowSchema = z.object({
  account_id: z.string().regex(/^AR-[A-Z]$/),
  account_name: z.string().regex(/^거래처 [A-Z]$/),
  outstanding_amount: z.number().int().nonnegative(),
  promised_payment_date: z.string().regex(isoDate),
  last_payment_date: optionalIsoDateSchema,
  credit_limit: z.number().int().positive(),
  payment_status: z.enum(["unpaid", "partial", "paid"]),
  follow_up_status: z.enum(["scheduled", "needs_review", "dispute_review"]),
  dispute_status: z.enum(["none", "open"]),
});

export const accountsReceivableFixtureSchema = z.object({
  fixture_notice: z.string().includes("재현용 익명 예시 데이터"),
  as_of_date: z.string().regex(isoDate),
  accounts: z.array(accountsReceivableRowSchema).min(1),
});

const cashConversionRowSchema = z.object({
  transaction_id: z.string().regex(/^TX-[A-Z]$/),
  order_amount: z.number().int().nonnegative(),
  recognized_revenue_amount: z.number().int().nonnegative(),
  invoiced_amount: z.number().int().nonnegative(),
  paid_amount: z.number().int().nonnegative(),
  fulfillment_date: optionalIsoDateSchema,
  invoice_date: optionalIsoDateSchema,
  promised_payment_date: optionalIsoDateSchema,
  last_payment_date: optionalIsoDateSchema,
});

export const cashConversionFixtureSchema = z.object({
  fixture_notice: z.string().includes("재현용 익명 예시 데이터"),
  as_of_date: z.string().regex(isoDate),
  transactions: z.array(cashConversionRowSchema).min(1),
});

export type AccountsReceivableFixture = z.infer<typeof accountsReceivableFixtureSchema>;
export type CashConversionFixture = z.infer<typeof cashConversionFixtureSchema>;

export type AccountsReceivableResult = AccountsReceivableFixture["accounts"][number] & {
  overdue_days: number;
  aging_bucket: "약속일 전" | "1~7일" | "8~14일" | "15~30일" | "31일 이상";
  priority_score: number | null;
  priority_band: "관찰" | "중간" | "높음" | "사람 분쟁 검토" | "종료";
  priority_rank: number | null;
  recommended_next_step: string;
};

export type CashConversionResult = CashConversionFixture["transactions"][number] & {
  outstanding_amount: number;
  revenue_cash_gap: number;
  overdue_days: number | null;
  current_status: "입금 완료" | "부분 입금" | "약속일 경과" | "입금 대기" | "청구 대기" | "이행 대기";
  stalled_stage: "완료" | "입금" | "청구" | "이행";
  next_check: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function utcDate(value: string) {
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(timestamp)) throw new Error(`Invalid ISO date: ${value}`);
  return timestamp;
}

function elapsedDays(asOfDate: string, targetDate: string) {
  return Math.floor((utcDate(asOfDate) - utcDate(targetDate)) / DAY_MS);
}

function agingBucket(overdueDays: number): AccountsReceivableResult["aging_bucket"] {
  if (overdueDays <= 0) return "약속일 전";
  if (overdueDays <= 7) return "1~7일";
  if (overdueDays <= 14) return "8~14일";
  if (overdueDays <= 30) return "15~30일";
  return "31일 이상";
}

function overdueWeight(overdueDays: number) {
  if (overdueDays <= 0) return 0;
  if (overdueDays <= 7) return 10;
  if (overdueDays <= 14) return 20;
  if (overdueDays <= 30) return 30;
  return 40;
}

function exposureWeight(outstandingAmount: number, creditLimit: number) {
  const ratio = outstandingAmount / creditLimit;
  if (ratio >= 0.5) return 20;
  if (ratio >= 0.25) return 10;
  return outstandingAmount > 0 ? 5 : 0;
}

export function calculateAccountsReceivableEvidence(input: unknown): AccountsReceivableResult[] {
  const fixture = accountsReceivableFixtureSchema.parse(input);
  const computed = fixture.accounts.map((account) => {
    const overdueDays = elapsedDays(fixture.as_of_date, account.promised_payment_date);
    const isDisputed = account.dispute_status === "open" || account.follow_up_status === "dispute_review";
    const isClosed = account.outstanding_amount === 0 || account.payment_status === "paid";
    const score = isDisputed || isClosed
      ? null
      : overdueWeight(overdueDays) +
        exposureWeight(account.outstanding_amount, account.credit_limit) +
        (account.follow_up_status === "needs_review" ? 15 : 0);
    const priorityBand: AccountsReceivableResult["priority_band"] = isClosed
      ? "종료"
      : isDisputed
        ? "사람 분쟁 검토"
        : (score ?? 0) >= 45
          ? "높음"
          : (score ?? 0) >= 25
            ? "중간"
            : "관찰";
    const recommendedNextStep = isClosed
      ? "종료 기록 보관"
      : isDisputed
        ? "계약·납품·청구 원본을 사람이 대조"
        : overdueDays <= 0
          ? "약속일까지 모니터링"
          : account.follow_up_status === "needs_review"
            ? "원본 대조 후 담당자가 후속 일정 확정"
            : "다음 조치일과 입금 원본 확인";

    return {
      ...account,
      overdue_days: overdueDays,
      aging_bucket: agingBucket(overdueDays),
      priority_score: score,
      priority_band: priorityBand,
      priority_rank: null,
      recommended_next_step: recommendedNextStep,
    };
  });

  const rankedIds = computed
    .filter((item) => item.priority_score !== null)
    .sort((left, right) => (right.priority_score ?? 0) - (left.priority_score ?? 0) || left.account_id.localeCompare(right.account_id))
    .map((item) => item.account_id);

  return computed.map((item) => ({
    ...item,
    priority_rank: item.priority_score === null ? null : rankedIds.indexOf(item.account_id) + 1,
  }));
}

export function calculateCashConversionEvidence(input: unknown): CashConversionResult[] {
  const fixture = cashConversionFixtureSchema.parse(input);

  return fixture.transactions.map((transaction) => {
    const outstandingAmount = Math.max(transaction.invoiced_amount - transaction.paid_amount, 0);
    const revenueCashGap = Math.max(transaction.recognized_revenue_amount - transaction.paid_amount, 0);
    const isPaid = transaction.invoiced_amount > 0 && outstandingAmount === 0;
    const overdueDays = isPaid || !transaction.promised_payment_date
      ? null
      : elapsedDays(fixture.as_of_date, transaction.promised_payment_date);
    const currentStatus: CashConversionResult["current_status"] = !transaction.fulfillment_date
      ? "이행 대기"
      : !transaction.invoice_date
        ? "청구 대기"
        : isPaid
          ? "입금 완료"
          : transaction.paid_amount > 0
            ? "부분 입금"
            : (overdueDays ?? 0) > 0
              ? "약속일 경과"
              : "입금 대기";
    const stalledStage: CashConversionResult["stalled_stage"] = currentStatus === "이행 대기"
      ? "이행"
      : currentStatus === "청구 대기"
        ? "청구"
        : currentStatus === "입금 완료"
          ? "완료"
          : "입금";
    const nextCheck = stalledStage === "이행"
      ? "이행 일정과 담당자 확인"
      : stalledStage === "청구"
        ? "청구 발행 조건과 전달 여부 확인"
        : currentStatus === "입금 완료"
          ? "거래 연결 완료 기록 보관"
          : currentStatus === "부분 입금"
            ? "부분 입금 원본 대조 후 잔액 약속일 확인"
            : "약속일과 입금 원본 확인";

    return {
      ...transaction,
      outstanding_amount: outstandingAmount,
      revenue_cash_gap: revenueCashGap,
      overdue_days: overdueDays,
      current_status: currentStatus,
      stalled_stage: stalledStage,
      next_check: nextCheck,
    };
  });
}

function csvCell(value: string | number | null) {
  const text = value === null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function csvLine(values: Array<string | number | null>) {
  return values.map(csvCell).join(",");
}

export function buildAccountsReceivableCsv(input: unknown) {
  const fixture = accountsReceivableFixtureSchema.parse(input);
  const results = calculateAccountsReceivableEvidence(fixture);
  const header = [
    "account_id",
    "account_name",
    "outstanding_amount",
    "promised_payment_date",
    "last_payment_date",
    "overdue_days",
    "credit_limit",
    "payment_status",
    "follow_up_status",
    "dispute_status",
    "aging_bucket",
    "priority_score",
    "priority_band",
    "priority_rank",
    "recommended_next_step",
    "data_notice",
  ];
  return [
    csvLine(header),
    ...results.map((item) => csvLine([
      item.account_id,
      item.account_name,
      item.outstanding_amount,
      item.promised_payment_date,
      item.last_payment_date,
      item.overdue_days,
      item.credit_limit,
      item.payment_status,
      item.follow_up_status,
      item.dispute_status,
      item.aging_bucket,
      item.priority_score,
      item.priority_band,
      item.priority_rank,
      item.recommended_next_step,
      fixture.fixture_notice,
    ])),
  ].join("\n") + "\n";
}

export function buildCashConversionCsv(input: unknown) {
  const fixture = cashConversionFixtureSchema.parse(input);
  const results = calculateCashConversionEvidence(fixture);
  const header = [
    "transaction_id",
    "order_amount",
    "recognized_revenue_amount",
    "invoiced_amount",
    "paid_amount",
    "fulfillment_date",
    "invoice_date",
    "promised_payment_date",
    "last_payment_date",
    "outstanding_amount",
    "revenue_cash_gap",
    "overdue_days",
    "current_status",
    "stalled_stage",
    "next_check",
    "data_notice",
  ];
  return [
    csvLine(header),
    ...results.map((item) => csvLine([
      item.transaction_id,
      item.order_amount,
      item.recognized_revenue_amount,
      item.invoiced_amount,
      item.paid_amount,
      item.fulfillment_date,
      item.invoice_date,
      item.promised_payment_date,
      item.last_payment_date,
      item.outstanding_amount,
      item.revenue_cash_gap,
      item.overdue_days,
      item.current_status,
      item.stalled_stage,
      item.next_check,
      fixture.fixture_notice,
    ])),
  ].join("\n") + "\n";
}
