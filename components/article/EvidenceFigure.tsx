import Image from "next/image";

import type { PublicEvidenceItem } from "@/lib/evidence-schema";

export function EvidenceFigure({ evidence }: { evidence: PublicEvidenceItem }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <a
        className="block bg-slate-100"
        href={evidence.image}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${evidence.altKo} 원본 크기로 보기`}
      >
        <Image
          src={evidence.image}
          alt={evidence.altKo}
          width={evidence.width}
          height={evidence.height}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full object-contain"
        />
      </a>
      <figcaption className="grid gap-3 p-4 text-sm leading-6 text-slate-600 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
            {evidence.dataMode === "fixture" ? "fixture" : "로컬 데모"}
          </span>
          {evidence.status === "candidate" ? (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
              공개 전 검토 중
            </span>
          ) : null}
        </div>
        <p>{evidence.captionKo}</p>
        <dl className="grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-950">직접 구현 화면</dt>
            <dd>{evidence.projectLabelKo}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-950">캡처 기준</dt>
            <dd>
              {evidence.capturedAt} · commit {evidence.sourceCommit.slice(0, 7)}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-950">확인 가능한 범위</dt>
            <dd>{evidence.claimSupportedKo}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-950">확인할 수 없는 범위</dt>
            <dd>{evidence.claimNotSupportedKo}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  );
}
