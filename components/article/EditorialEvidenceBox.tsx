import Link from "next/link";

import {
  editorialIdentity,
  type EditorialEvidence,
} from "@/lib/editorial-evidence";

const evidenceTypeLabels = {
  "original-workflow": "자체 설계한 업무 절차",
  "calculation-review": "공개 계산식과 샘플 재검산",
  "official-document-review": "공식 문서와 실무 예시 대조",
} as const;

export function EditorialEvidenceBox({
  evidence,
  updatedAt,
}: {
  evidence: EditorialEvidence;
  updatedAt: string;
}) {
  return (
    <section
      aria-labelledby="editorial-evidence-title"
      className="min-w-0 max-w-full rounded-md border border-teal-200 bg-teal-50/70 p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="editorial-evidence-title" className="text-base font-semibold text-slate-950">
          이 글을 만든 방법
        </h2>
        <span className="rounded-full border border-teal-200 bg-white px-2.5 py-1 text-xs font-semibold text-teal-800">
          {evidenceTypeLabels[evidence.type]}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
        <div>
          <dt className="font-semibold text-slate-950">작성·검토</dt>
          <dd>
            <Link
              className="font-semibold text-teal-700 underline-offset-4 hover:underline"
              href={editorialIdentity.authorUrl}
            >
              {editorialIdentity.authorName}
            </Link>
            {" · "}
            공개 운영 책임 계정{" "}
            <a
              className="font-semibold text-teal-700 underline-offset-4 hover:underline"
              href={editorialIdentity.operatorUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {editorialIdentity.operatorName}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">검증 내용</dt>
          <dd>{evidence.summary}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">적용 범위</dt>
          <dd>{evidence.scope}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">AI 사용 공개</dt>
          <dd>
            AI는 구조화와 누락 점검을 도울 수 있지만, 공개 결정은 운영자가 내립니다.
            샘플 수치, 다운로드 파일, 링크와 과장 표현은 별도 검증 규칙으로 확인합니다.
          </dd>
        </div>
      </dl>

      {evidence.sources.length > 0 ? (
        <div className="mt-4 border-t border-teal-200 pt-4">
          <h3 className="text-sm font-semibold text-slate-950">확인한 공식 출처</h3>
          <ul className="mt-2 grid gap-2 text-sm leading-6">
            {evidence.sources.map((source) => (
              <li key={source.url}>
                <a
                  className="font-semibold text-teal-700 underline-offset-4 hover:underline"
                  href={source.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.title}
                </a>
                <span className="text-slate-500"> · 확인 {source.reviewedAt}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 border-t border-teal-200 pt-4 text-sm leading-6 text-slate-600">
          이 글은 외부 통계나 제품 성능을 인용하지 않고, 본문에 공개한 절차·계산식·가상
          샘플과 CSV를 근거로 작성했습니다.
        </p>
      )}

      <p className="mt-4 text-xs leading-5 text-slate-500">
        최종 내용 검토일 {updatedAt}. 오류 제보와 수정일 원칙은{" "}
        <Link
          className="font-semibold text-teal-700 underline-offset-4 hover:underline"
          href="/ko/about"
        >
          소개·편집 원칙
        </Link>
        에서 확인할 수 있습니다.
      </p>
    </section>
  );
}
