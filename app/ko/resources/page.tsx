import type { Metadata } from "next";

import { ViewingTools } from "@/components/tools/ViewingTools";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "영화·OTT 취향 도구",
  description:
    "오늘의 기분, 남은 시간, OTT 구독 비용을 브라우저에서 바로 계산해 볼 작품과 읽을 글을 좁혀보세요.",
  path: "/ko/resources",
});

export default function ResourcesPage() {
  return (
    <main className="bg-[#fffdf9]">
      <header className="border-b border-orange-100 bg-[#fff8ee]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-5 sm:py-18">
          <p className="text-sm font-bold text-[#ef5b3f]">저장하지 않고 바로 쓰는 작은 도구</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#20162c] sm:text-5xl">
            영화·OTT 취향 도구
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#675f72]">
            작품 수를 더 늘리기 전에 오늘 실제로 볼 수 있는 범위를 좁혀보세요. 입력값은 서버로
            전송하거나 저장하지 않고 현재 브라우저에서만 계산합니다.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-5 sm:py-16">
        <ViewingTools />
        <section className="mt-8 rounded-[1.25rem] border border-[#eee8e2] bg-white p-5 text-sm leading-7 text-[#675f72]">
          <h2 className="text-lg font-black text-[#20162c]">사용 전 확인</h2>
          <ul className="mt-3 grid gap-2">
            <li>추천 결과는 취향을 단정하는 평가가 아니라 다음 글을 빠르게 찾기 위한 출발점입니다.</li>
            <li>OTT 가격과 작품 제공 여부는 국가, 요금제, 시점에 따라 달라질 수 있습니다.</li>
            <li>가족 관람은 플랫폼 표시뿐 아니라 영상물등급위원회의 최신 등급과 내용 정보를 함께 확인하세요.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
