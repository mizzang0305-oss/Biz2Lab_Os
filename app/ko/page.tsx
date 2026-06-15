import type { Metadata } from "next";

import { HomePage } from "@/components/layout/HomePage";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab",
  description: "현장형 AI 업무 자동화와 사업 운영 시스템을 정리하는 한국어 중심 콘텐츠 허브입니다.",
  path: "/ko",
});

export default function KoreanHomePage() {
  return <HomePage />;
}
