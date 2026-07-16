import Link from "next/link";

import {
  editorialIdentity,
  type EditorialEvidence,
} from "@/lib/editorial-evidence";

const evidenceTypeLabels = {
  "editorial-selection": "상황별 편집 기준",
  "scene-analysis": "장면과 인물 선택 분석",
  "official-help-review": "공식 도움말 재확인",
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
      className="min-w-0 max-w-full rounded-[1.25rem] border border-violet-200 bg-violet-50/70 p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="editorial-evidence-title" className="text-base font-black text-[#20162c]">
          이 글의 기준
        </h2>
        <span className="rounded-full border border-violet-200 bg-white px-2.5 py-1 text-xs font-bold text-violet-800">
          {evidenceTypeLabels[evidence.type]}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm leading-6 text-[#514858]">
        <div>
          <dt className="font-black text-[#20162c]">작성·검토</dt>
          <dd>
            <Link
              className="font-bold text-violet-700 underline-offset-4 hover:underline"
              href={editorialIdentity.authorUrl}
            >
              {editorialIdentity.authorName}
            </Link>
            {" · "}
            공개 운영 책임 계정{" "}
            <a
              className="font-bold text-violet-700 underline-offset-4 hover:underline"
              href={editorialIdentity.operatorUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {editorialIdentity.operatorName}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-black text-[#20162c]">어떻게 골랐나</dt>
          <dd>{evidence.summary}</dd>
        </div>
        <div>
          <dt className="font-black text-[#20162c]">어디까지 믿어야 하나</dt>
          <dd>{evidence.scope}</dd>
        </div>
        <div>
          <dt className="font-black text-[#20162c]">AI 사용 공개</dt>
          <dd>
            AI는 검색어 정리와 초안 구조화에 활용할 수 있습니다. 작품 선택, 해석의 강도,
            공식 도움말과의 대조, 최종 문장과 공개 여부는 운영자가 다시 확인합니다.
          </dd>
        </div>
      </dl>

      {evidence.sources.length > 0 ? (
        <div className="mt-4 border-t border-violet-200 pt-4">
          <h3 className="text-sm font-black text-[#20162c]">확인한 출처</h3>
          <ul className="mt-2 grid gap-2 text-sm leading-6">
            {evidence.sources.map((source) => (
              <li key={source.url}>
                <a
                  className="font-bold text-violet-700 underline-offset-4 hover:underline"
                  href={source.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.title}
                </a>
                <span className="text-[#817687]"> · 확인 {source.reviewedAt}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 border-t border-violet-200 pt-4 text-sm leading-6 text-[#675f72]">
          이 글은 가격·순위·의학적 사실을 주장하지 않습니다. 작품 안에서 확인되는 장면과
          인물의 선택을 바탕으로 하나의 편집 관점을 제시합니다.
        </p>
      )}

      <p className="mt-4 text-xs leading-5 text-[#817687]">
        최종 내용 검토일 {updatedAt}. 오류 제보와 수정일 원칙은{" "}
        <Link
          className="font-bold text-violet-700 underline-offset-4 hover:underline"
          href="/ko/about"
        >
          소개·편집 원칙
        </Link>
        에서 확인할 수 있습니다.
      </p>
    </section>
  );
}
