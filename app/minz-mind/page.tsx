import type { Metadata } from "next";

import { ServiceLanding } from "@/components/commercial/ServiceLanding";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "MINZ MIND 사전 체험 준비 현황",
  description: "비의료 자기성찰 서비스 MINZ MIND의 Preview와 공개 체험 경계, 현재 Human Gate 상태를 확인하세요.",
  path: "/minz-mind",
});

export default function MinzMindPage() { return <ServiceLanding service="minz-mind" />; }
