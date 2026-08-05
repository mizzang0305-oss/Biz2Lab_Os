import type { Metadata } from "next";

import { HomePage } from "@/components/layout/HomePage";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab",
  description:
    "식자재 유통과 B2B 영업 현장의 주문, 미수금, 재고, 피킹과 승인형 자동화를 직접 구현·검증한 범위로 설명합니다.",
  path: "/ko",
});

export default function KoreanHomePage() {
  return <HomePage />;
}
