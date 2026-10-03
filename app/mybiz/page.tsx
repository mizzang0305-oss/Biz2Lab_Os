import type { Metadata } from "next";

import { ServiceLanding } from "@/components/commercial/ServiceLanding";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "MyBiz 업무자동화 시연과 도입 범위",
  description: "MyBiz의 작업 기록·고객 확인 시연을 보고 실제 도입 가능한 범위와 아직 제공하지 않는 기능을 확인하세요.",
  path: "/mybiz",
});

export default function MyBizPage() { return <ServiceLanding service="mybiz" />; }
