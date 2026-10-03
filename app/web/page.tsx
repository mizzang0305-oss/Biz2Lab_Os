import type { Metadata } from "next";

import { ServiceLanding } from "@/components/commercial/ServiceLanding";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "홈페이지 제작 서비스 준비 현황",
  description: "Biz2Lab 홈페이지 제작의 검토 방향과 현재 확인된 제공 범위, 공개 Demo와 판매 준비 상태를 확인하세요.",
  path: "/web",
});

export default function WebPage() { return <ServiceLanding service="web" />; }
