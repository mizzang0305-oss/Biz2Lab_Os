import type { CategorySlug, PublicCategorySlug } from "@/lib/schema";

export type Category = {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  hubIntro: string;
  startGuide: string;
  pillarIdea: string;
};

export const categories: Record<Exclude<CategorySlug, "pillar">, Category> = {
  "what-to-watch": {
    slug: "what-to-watch",
    name: "오늘 뭐 볼까",
    title: "지금 기분에 맞는 영화 고르기",
    description:
      "시간, 기분, 함께 보는 사람을 기준으로 오늘 볼 영화를 빠르게 고를 수 있는 관람 가이드입니다.",
    hubIntro:
      "좋은 영화 목록보다 더 필요한 건 지금의 나에게 맞는 한 편입니다. 남은 시간, 피로도, 스포일러 민감도와 동행을 먼저 확인하고 선택지를 좁힙니다.",
    startGuide:
      "오늘 쓸 수 있는 시간과 원하는 감정부터 고르세요. 제목을 많이 모으기보다 지금 끝까지 볼 수 있는 한 편을 찾는 것이 목표입니다.",
    pillarIdea: "오늘 밤 한 편을 고르는 기준",
  },
  "after-the-credits": {
    slug: "after-the-credits",
    name: "엔딩 뒤의 이야기",
    title: "보고 나서 더 재미있는 영화 해석",
    description:
      "결말, 인물의 선택, 반복되는 이미지와 대사를 따라가며 영화가 남긴 질문을 다시 읽습니다.",
    hubIntro:
      "줄거리를 다시 말하는 대신 영화가 왜 그 장면을 마지막에 남겼는지 살핍니다. 하나의 정답을 강요하지 않고, 장면과 선택을 근거로 가능한 해석을 나눕니다.",
    startGuide:
      "아직 영화를 보지 않았다면 각 글의 스포일러 표시를 먼저 확인하세요. 본 뒤라면 가장 마음에 걸린 장면부터 읽어도 좋습니다.",
    pillarIdea: "결말을 다시 보는 첫 번째 질문",
  },
  "streaming-life": {
    slug: "streaming-life",
    name: "OTT 생활",
    title: "구독은 가볍게, 감상은 편하게",
    description:
      "Netflix와 OTT의 시청 기록, 프로필, 자막, 구독 관리처럼 실제로 자주 막히는 문제를 해결합니다.",
    hubIntro:
      "볼 것은 많은데 추천은 엉키고 구독료는 늘어납니다. 계정 설정과 시청 습관을 한 번 정리해 작품을 찾는 시간을 줄입니다.",
    startGuide:
      "추천이 마음에 들지 않는다면 새 계정을 만들기 전에 시청 기록, 평가, 프로필 분리부터 확인하세요.",
    pillarIdea: "OTT 홈 화면을 다시 내 취향으로",
  },
  automation: {
    slug: "automation",
    name: "AI 업무 자동화",
    title: "AI 업무 자동화 허브",
    description:
      "반복 업무, 문서 정리, 데이터 흐름을 작게 자동화하는 실전 가이드입니다.",
    hubIntro:
      "처음부터 거대한 시스템을 만들기보다 매일 반복되는 업무, 원본 데이터, 사람의 검토 지점을 기준으로 자동화 대상을 고르는 방법을 정리합니다.",
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
      "영업과 매출 관리는 숫자를 빨리 보는 것보다 목표, 상담, 견적, 입금 상태를 같은 기준으로 계속 보는 구조가 먼저입니다.",
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
      "소상공인 운영 자동화는 복잡한 도구보다 매일 확인해야 할 숫자, 주문 상태, 고객 요청 기록을 한곳으로 모으는 일에서 시작합니다.",
    startGuide:
      "주문 채널 통합, 매일 볼 숫자, 고객 기록 방식 순서로 운영의 빈틈을 줄여보세요.",
    pillarIdea: "소상공인 운영 자동화 가이드",
  },
  "contracts-payments": {
    slug: "contracts-payments",
    name: "전자계약·결제",
    title: "전자계약·결제 자동화 허브",
    description:
      "계약서 미작성, 서명, 결제 상태, 거래처 관리가 끊기지 않도록 연결합니다.",
    hubIntro:
      "전자계약과 결제는 도입 자체보다 계약서 작성 상태, 서명 여부, 결제 확인, 후속 조치가 빠지지 않는 구조가 중요합니다.",
    startGuide:
      "계약서 작성, 서명 확인, 결제 요청, 미완료 후속 조치를 한 흐름으로 보는 글부터 읽어보세요.",
    pillarIdea: "전자계약·결제 자동화 가이드",
  },
};

export const categoryList = (
  ["what-to-watch", "after-the-credits", "streaming-life"] as PublicCategorySlug[]
).map((slug) => categories[slug]);

export function getCategory(slug: string) {
  return categories[slug as keyof typeof categories] ?? null;
}
