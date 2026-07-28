import { EvidenceFigure } from "@/components/article/EvidenceFigure";
import type { EvidenceItem } from "@/lib/evidence-schema";

export function EvidenceGallery({ evidence }: { evidence: EvidenceItem[] }) {
  if (evidence.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="evidence-gallery-title" className="grid gap-5">
      <div>
        <p className="text-sm font-bold text-teal-700">화면 증거</p>
        <h2 id="evidence-gallery-title" className="mt-1 text-2xl font-bold text-slate-950">
          로컬에서 다시 확인한 구현 화면
        </h2>
        <p className="mt-2 leading-7 text-slate-600">
          고객정보와 운영 DB를 사용하지 않은 fixture·로컬 데모입니다. 화면이 입증하는
          범위와 입증하지 못하는 성과를 함께 표시합니다.
        </p>
      </div>
      {evidence.map((item) => (
        <EvidenceFigure key={item.id} evidence={item} />
      ))}
    </section>
  );
}
