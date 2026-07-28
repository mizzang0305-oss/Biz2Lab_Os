import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import {
  getReviewableEvidence,
  isCandidateEvidenceVisible,
} from "@/lib/evidence";

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

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-900">
          Preview / explicit local review only
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Evidence 후보 사람 검수
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          이 화면은 승인 도구가 아닙니다. 이미지, 출처 commit, 주장 범위와
          가림 사유를 읽기 전용으로 비교합니다. 후보는 검수 전이며 Production
          공개를 뜻하지 않습니다.
        </p>
      </header>

      <div className="mt-8 grid gap-8">
        {evidence.map((item) => {
          const dryRunCommand = `npm run evidence:approve -- --id ${item.id} --reviewer <reviewer-id>`;
          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
            >
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                    {item.status}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {item.dataMode}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                    PII scan {item.piiScan}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-slate-950">
                  {item.id}
                </h2>
                <p className="mt-2 text-slate-600">{item.captionKo}</p>
              </div>

              <a
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-100 p-2 sm:p-4"
              >
                <Image
                  src={item.image}
                  alt={item.altKo}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 1080px, 100vw"
                  className="mx-auto h-auto w-full max-w-[1080px] object-contain"
                />
              </a>

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
                    label="크기"
                    value={`${item.width} × ${item.height}px`}
                  />
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
                    label="가림"
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
                    Dry-run only
                  </p>
                  <code className="mt-2 block overflow-x-auto whitespace-pre rounded-lg bg-black p-4 text-sm">
                    {dryRunCommand}
                  </code>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    기본 실행은 manifest와 이미지를 변경하지 않습니다. 출력의
                    `DRY_RUN_ONLY`와 diff를 확인한 뒤에도 자동 승인·git·push·배포는
                    수행되지 않습니다.
                  </p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </main>
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
