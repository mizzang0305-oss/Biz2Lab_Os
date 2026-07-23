import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "광고·제휴 안내",
  description:
    "Biz2Lab의 Google AdSense, 제휴 링크, 협찬 콘텐츠 표시와 편집 독립성 원칙을 안내합니다.",
  path: "/ko/advertising",
});

export default function AdvertisingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-14">
      <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">광고·제휴 안내</h1>
      <p className="mt-4 text-sm text-slate-500">시행일: 2026-07-23</p>
      <div className="mt-8 grid gap-8 leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">현재 운영 상태</h2>
          <p className="mt-3">
            사이트에는 Google AdSense 연결 코드가 포함되어 있습니다. 광고 승인과 실제 게재
            여부는 Google의 검토와 운영 설정에 따라 달라질 수 있으며, 광고 클릭을 유도하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">제휴·협찬 표시</h2>
          <p className="mt-3">
            현재 공개 글에는 판매 수수료를 받는 제휴 링크와 유료 협찬 원고가 없습니다.
            향후 경제적 이해관계가 생기면 해당 글의 첫 부분에서 관계와 보상 방식을 명확히 표시합니다.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-950">편집 독립성</h2>
          <p className="mt-3">
            광고주나 제휴사는 글의 결론, 비교 기준, 공개 여부를 결정하지 않습니다. 대가성 관계를
            밝힐 수 없거나 독자에게 오해를 줄 수 있는 콘텐츠는 공개하지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
