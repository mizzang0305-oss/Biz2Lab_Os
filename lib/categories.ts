import type { PublicCategorySlug } from "@/lib/schema";

export type Category = {
  slug: PublicCategorySlug;
  name: string;
  title: string;
  description: string;
  hubIntro: string;
  startGuide: string;
  pillarIdea: string;
};

export const categories: Record<PublicCategorySlug, Category> = {
  automation: {
    slug: "automation",
    name: "AI 업무 자동화",
    title: "AI 업무 자동화 허브",
    description:
      "반복 업무, 문서 정리, 데이터 흐름을 작게 자동화하는 실전 가이드입니다.",
    hubIntro:
      "처음부터 거대한 시스템을 만들기보다 매일 반복되는 업무를 기준으로 자동화 대상을 고르는 방법을 정리합니다.",
    startGuide:
      "자동화가 처음이라면 업무 목록화, 반복 빈도 확인, 실패 비용 점검 순서로 읽어보세요.",
    pillarIdea: "AI 업무 자동화 시작 가이드",
  },
  "sales-ops": {
    slug: "sales-ops",
    name: "영업·매출 관리",
    title: "영업·매출 관리 자동화 허브",
    description:
      "일일 매출, 미수금, 거래처 응대를 놓치지 않기 위한 운영 구조를 다룹니다.",
    hubIntro:
      "영업과 매출 관리는 숫자를 빨리 보는 것보다 같은 기준으로 계속 보는 구조가 먼저입니다.",
    startGuide:
      "매출 목표를 일일 행동으로 나누고, 미수금과 거래처 후속 조치를 같은 표에서 관리하는 흐름부터 시작하세요.",
    pillarIdea: "영업·매출 관리 자동화 가이드",
  },
  "small-business": {
    slug: "small-business",
    name: "소상공인 운영",
    title: "소상공인 운영 시스템 허브",
    description:
      "주문, 예약, 고객 기록, 매장 체크리스트를 단순하게 시스템화합니다.",
    hubIntro:
      "소상공인 운영 자동화는 복잡한 도구보다 매일 확인해야 할 숫자와 기록을 한곳으로 모으는 일에서 시작합니다.",
    startGuide:
      "주문 채널 통합, 매일 볼 숫자, 고객 기록 방식 순서로 운영의 빈틈을 줄여보세요.",
    pillarIdea: "소상공인 운영 자동화 가이드",
  },
  "contracts-payments": {
    slug: "contracts-payments",
    name: "전자계약·결제",
    title: "전자계약·결제 자동화 허브",
    description:
      "계약, 미서명, 결제 상태, 거래처 관리가 끊기지 않도록 연결합니다.",
    hubIntro:
      "전자계약과 결제는 도입 자체보다 상태 추적과 후속 조치가 빠지지 않는 구조가 중요합니다.",
    startGuide:
      "계약 생성, 서명 확인, 결제 요청, 미완료 후속 조치를 한 흐름으로 보는 글부터 읽어보세요.",
    pillarIdea: "전자계약·결제 자동화 가이드",
  },
};

export const categoryList = Object.values(categories);

export function getCategory(slug: string) {
  return categories[slug as PublicCategorySlug] ?? null;
}

