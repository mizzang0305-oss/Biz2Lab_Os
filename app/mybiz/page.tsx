import type { Metadata } from "next";

import { ServiceLanding } from "@/components/commercial/ServiceLanding";
import { createCommercialMetadata } from "@/lib/commercial-seo";

export const metadata: Metadata = createCommercialMetadata({
  title: "MyBiz Business Service OS 방향과 샘플 데모",
  description: "작업부터 다음 고객까지 지향하는 MyBiz의 제품 방향과 현재 공개된 저장 없는 샘플 매장 화면의 제공 범위를 확인하세요.",
  path: "/mybiz",
});

export default function MyBizPage() { return <ServiceLanding service="mybiz" />; }
