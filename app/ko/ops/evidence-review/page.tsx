import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { OperationalEvidenceSection } from "@/components/evidence/OperationalEvidencePanels";
import {
  getReviewableEvidence,
  isCandidateEvidenceVisible,
} from "@/lib/evidence";
import type { PublicEvidenceItem } from "@/lib/evidence-schema";

export const metadata: Metadata = {
  title: "Evidence candidate review",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EvidenceReviewPage() {
  await connection();
  if (!isCandidateEvidenceVisible()) {
    notFound();
  }

  const evidence = getReviewableEvidence();
  const approved = evidence.filter((item) => item.status === "approved");
  const candidates = evidence.filter((item) => item.status === "candidate");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-900">
          Preview / explicit local review only
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          증거 후보 독립 검수
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          승인된 자산은 읽기 전용 기준 자료입니다. 재캡처 후보는 390px
          렌더링, source commit, fixture 모드와 변환 내역을 사람이 다시
          확인해야 하며 이 페이지에는 승인·배포 동작이 없습니다.
        </p>
      </header>

      <OperationalEvidenceSection />

      <EvidenceSection
        heading="승인된 증거 · 읽기 전용"
        description="바이트와 승인 메타데이터를 변경하지 않는 Production 200 기준 자료입니다."
        items={approved}
        tone="approved"
      />
      <EvidenceSection
        heading="재캡처 후보 · 사람 검수 필요"
        description="아래 390px 미리보기는 자동 판정이 아닙니다. 각 후보를 APPROVE / REJECT / RECAPTURE 중 하나로 독립 검수해야 합니다."
        items={candidates}
        tone="candidate"
      />
    </main>
  );
}

function EvidenceSection({
  heading,
  description,
  items,
  tone,
}: {
  heading: string;
  description: string;
  items: PublicEvidenceItem[];
  tone: "approved" | "candidate";
}) {
  return (
    <section className="mt-10" aria-labelledby={`${tone}-evidence-heading`}>
      <div
        className={`rounded-2xl border p-5 ${
          tone === "approved"
            ? "border-emerald-300 bg-emerald-50"
            : "border-amber-300 bg-amber-50"
        }`}
      >
        <h2
          id={`${tone}-evidence-heading`}
          className="text-2xl font-bold text-slate-950"
        >
          {heading}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
      </div>

      <div className="mt-6 grid gap-8">
        {items.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function EvidenceCard({ item }: { item: PublicEvidenceItem }) {
  const dryRunCommand = `npm run evidence:approve -- --id ${item.id} --reviewer pending-independent-review`;
  const transformations = item.transformations ?? [];

  return (
    <article
      data-evidence-status={item.status}
      data-evidence-id={item.id}
      className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              item.status === "approved"
                ? "bg-emerald-100 text-emerald-900"
                : "bg-amber-100 text-amber-900"
            }`}
          >
            {item.status === "approved"
              ? "APPROVED · READ ONLY"
              : "CANDIDATE · HUMAN REVIEW"}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {item.dataMode}
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
            PII scan {item.piiScan}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-slate-950">{item.id}</h3>
        <p className="mt-2 text-slate-600">{item.captionKo}</p>
      </div>

      <div className="bg-slate-100 p-4 sm:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">
          390px rendering preview
        </p>
        <a
          href={item.image}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto block w-full max-w-[390px] rounded-xl bg-white p-1 shadow-sm"
        >
          <Image
            src={item.image}
            alt={item.altKo}
            width={item.width}
            height={item.height}
            sizes="390px"
            className="h-auto w-full object-contain"
          />
        </a>
      </div>

      <div className="grid gap-6 p-5 text-sm leading-6 sm:grid-cols-2 sm:p-6">
        <dl className="grid content-start gap-3">
          <ReviewField label="게시 글" value={item.postSlug} />
          <ReviewField
            label="출처"
            value={`${item.repositoryName} · ${item.sourceRoute}`}
          />
          <ReviewField label="source commit" value={item.sourceCommit} mono />
          <ReviewField label="SHA-256" value={item.sha256} mono />
          <ReviewField
            label="원본 자산 크기"
            value={`${item.width} × ${item.height}px`}
          />
          <ReviewField label="데이터 모드" value={item.dataMode} />
        </dl>
        <dl className="grid content-start gap-3">
          <ReviewField
            label="확인 가능한 범위"
            value={item.claimSupportedKo}
          />
          <ReviewField
            label="확인할 수 없는 범위"
            value={item.claimNotSupportedKo}
          />
          <ReviewField
            label="캡처 변환"
            value={
              transformations.length > 0
                ? transformations.join(" · ")
                : "승인 당시 기록된 변환 없음"
            }
          />
          <ReviewField
            label="가림 / redaction"
            value={
              item.redactions.length > 0
                ? `${item.redactions.join(", ")} · ${item.redactionReason}`
                : "없음"
            }
          />
        </dl>
      </div>

      {item.status === "candidate" ? (
        <div className="border-t border-slate-200 bg-slate-950 p-5 text-slate-100 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Exact dry-run approval command
          </p>
          <code className="mt-2 block overflow-x-auto whitespace-pre rounded-lg bg-black p-4 text-sm">
            {dryRunCommand}
          </code>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            기본 실행은 manifest와 이미지 바이트를 변경하지 않고
            `DRY_RUN_ONLY`를 출력합니다. 이 화면에서는 명령을 실행하거나
            후보를 승인하지 않습니다.
          </p>
        </div>
      ) : null}
    </article>
  );
}

function ReviewField({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="font-bold text-slate-950">{label}</dt>
      <dd
        className={`mt-1 break-words text-slate-600 ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
