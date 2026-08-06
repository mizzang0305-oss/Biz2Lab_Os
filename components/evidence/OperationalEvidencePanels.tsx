import accountsReceivableFixture from "@/data/evidence-fixtures/accounts-receivable.json";
import cashConversionFixture from "@/data/evidence-fixtures/cash-conversion.json";
import {
  calculateAccountsReceivableEvidence,
  calculateCashConversionEvidence,
} from "@/lib/operational-evidence";

function won(value: number) {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

function EvidenceNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-teal-300 bg-teal-50 px-4 py-3 text-sm font-semibold leading-6 text-teal-950">
      {children}
    </div>
  );
}

export function AccountsReceivableEvidencePanel() {
  const results = calculateAccountsReceivableEvidence(accountsReceivableFixture);

  return (
    <article
      data-operational-evidence="accounts-receivable"
      className="mx-auto w-full max-w-[390px] overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm"
    >
      <header className="border-b border-slate-200 bg-slate-950 p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-teal-300">Deterministic fixture</p>
        <h3 className="mt-2 text-2xl font-bold">미수금 회수 검토표</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">기준일 2026-08-06 · 자동 연락 없음</p>
      </header>
      <div className="grid gap-4 p-4">
        <EvidenceNotice>재현용 익명 예시 데이터 · 실제 거래처와 실운영 성과 아님</EvidenceNotice>
        {results.map((item) => (
          <section key={item.account_id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500">{item.account_id}</p>
                <h4 className="mt-1 text-lg font-bold text-slate-950">{item.account_name}</h4>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
                {item.priority_band}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-slate-500">미수잔액</dt><dd className="mt-1 font-bold text-slate-950">{won(item.outstanding_amount)}</dd></div>
              <div><dt className="text-slate-500">약속일 경과</dt><dd className="mt-1 font-bold text-slate-950">{item.overdue_days > 0 ? `${item.overdue_days}일` : `${Math.abs(item.overdue_days)}일 전`}</dd></div>
              <div><dt className="text-slate-500">aging</dt><dd className="mt-1 font-bold text-slate-950">{item.aging_bucket}</dd></div>
              <div><dt className="text-slate-500">검토 순위</dt><dd className="mt-1 font-bold text-slate-950">{item.priority_rank ?? "별도 분리"}</dd></div>
            </dl>
            <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">{item.recommended_next_step}</p>
          </section>
        ))}
        <p className="text-xs leading-5 text-slate-500">점수는 약속일 경과와 한도 대비 잔액만 재현합니다. 분쟁 판단·법적 조치·실제 회수 가능성은 계산하지 않습니다.</p>
      </div>
    </article>
  );
}

export function CashConversionEvidencePanel() {
  const results = calculateCashConversionEvidence(cashConversionFixture);

  return (
    <article
      data-operational-evidence="cash-conversion"
      className="mx-auto w-full max-w-[390px] overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm"
    >
      <header className="border-b border-slate-200 bg-slate-950 p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-teal-300">Deterministic fixture</p>
        <h3 className="mt-2 text-2xl font-bold">주문→현금 전환 연결표</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">주문·매출·청구·입금을 덮어쓰지 않고 분리</p>
      </header>
      <div className="grid gap-4 p-4">
        <EvidenceNotice>재현용 익명 예시 데이터 · 실제 주문·회계 처리·성과 아님</EvidenceNotice>
        {results.map((item) => (
          <section key={item.transaction_id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-950">{item.transaction_id}</h4>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">{item.current_status}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md bg-slate-50 p-2"><p className="text-slate-500">매출</p><p className="mt-1 font-bold text-slate-950">{won(item.recognized_revenue_amount)}</p></div>
              <div className="rounded-md bg-slate-50 p-2"><p className="text-slate-500">입금</p><p className="mt-1 font-bold text-slate-950">{won(item.paid_amount)}</p></div>
              <div className="rounded-md bg-slate-50 p-2"><p className="text-slate-500">차이</p><p className="mt-1 font-bold text-slate-950">{won(item.revenue_cash_gap)}</p></div>
            </div>
            <p className="mt-4 text-sm font-bold text-teal-800">정체 단계: {item.stalled_stage}</p>
            <p className="mt-2 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">{item.next_check}</p>
          </section>
        ))}
        <p className="text-xs leading-5 text-slate-500">운영 단계 연결만 검증합니다. 세무상 매출 인식, 부가세, 실제 채권 회수 결과는 검증하지 않습니다.</p>
      </div>
    </article>
  );
}

export function OperationalEvidenceSection() {
  return (
    <section className="mt-10" aria-labelledby="operational-evidence-heading">
      <div className="rounded-2xl border border-sky-300 bg-sky-50 p-5">
        <h2 id="operational-evidence-heading" className="text-2xl font-bold text-slate-950">재현 가능한 익명 운영 증거</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">저장소의 순수 계산 함수와 고정 fixture를 같은 입력으로 렌더링합니다. 외부 API·운영 DB·실제 고객 데이터는 사용하지 않습니다.</p>
      </div>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
        <AccountsReceivableEvidencePanel />
        <CashConversionEvidencePanel />
      </div>
    </section>
  );
}
