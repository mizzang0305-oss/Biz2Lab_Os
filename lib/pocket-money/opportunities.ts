export const opportunityCategories = ["전체", "앱테크", "설문", "재택부업", "혜택"] as const;
export type OpportunityCategory = (typeof opportunityCategories)[number];
export type Opportunity = {
  id: string; service: string; task: string; category: Exclude<OpportunityCategory, "전체">;
  rewardKind: "포인트" | "현금" | "추첨"; reward: string; payout: string;
  age: string; minimumAge: number | null; cost: string; deadline: string; duration: string;
  conditions: string; steps: string[]; startUrl: string;
  sources: {label: string; url: string}[]; checkedAt: string;
};

// Public official guidance checked 2026-10-03, not proof of an individual payout.
export const opportunities: readonly Opportunity[] = [
  {
    id: "panelnow-surveys", service: "패널나우", task: "내게 맞는 온라인 설문에 응답하기", category: "설문",
    rewardKind: "포인트", reward: "조사별 포인트 · 현금 교환 2,000P부터",
    payout: "본인 명의 계좌로 교환 신청. 지급 일정은 교환 화면에서 확인하세요.",
    age: "만 14세 이상", minimumAge: 14, cost: "교환 수수료 없음", deadline: "조사별 마감", duration: "조사별 확인",
    conditions: "기본조사 후 대상 설문이 와야 참여할 수 있어요. 건당 보상은 조사마다 달라요.",
    steps: ["공식 사이트에서 가입하고 기본조사를 작성하세요.", "내게 온 설문의 대상 조건·예상 시간·포인트를 확인하세요.", "설문에 응답한 뒤 적립 내역을 확인하고, 교환 조건이 되면 신청하세요."],
    startUrl: "https://www.panelnow.co.kr/survey",
    sources: [{label: "참여 안내", url: "https://www.panelnow.co.kr/"}, {label: "교환 조건", url: "https://www.panelnow.co.kr/exchange"}, {label: "연령·수수료 약관", url: "https://www.panelnow.co.kr/terms-of-use"}], checkedAt: "2026-10-03",
  },
  {
    id: "climate-declaration", service: "탄소중립포인트", task: "기후시민 선언하고 실천 참여하기", category: "혜택",
    rewardKind: "포인트", reward: "선언 1,000P + 실천 1회 추가 1,000P",
    payout: "공식 이벤트의 특별포인트 안내입니다. 가입만으로 지급되지 않으며 실제 적립은 내역에서 확인하세요.",
    age: "만 14세 이상", minimumAge: 14, cost: "회비 없음", deadline: "예산 소진 시 조기 종료", duration: "소요시간 미확인",
    conditions: "선언 완료가 첫 조건. 추가 포인트는 전자영수증 등 녹색생활실천 1회가 필요해요.",
    steps: ["공식 공지에서 이벤트가 계속 운영 중인지 확인하세요.", "가입·로그인 후 기후시민 선언을 완료하세요.", "추가 포인트를 받으려면 참여기업의 녹색생활실천을 1회 이상 진행하고 실적을 확인하세요."],
    startUrl: "https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do",
    sources: [{label: "기후시민 선언 이벤트 공지", url: "https://www.cpoint.or.kr/netzero/main.do"}, {label: "가입 연령·회비", url: "https://www.cpoint.or.kr/netzero/member/nv_memberRegistStep1.do"}], checkedAt: "2026-10-03",
  },
  {
    id: "crowdworks-labeling", service: "크라우드웍스", task: "이미지·음성 데이터 가공 작업 찾기", category: "재택부업",
    rewardKind: "포인트", reward: "작업별 포인트 · 출금 조건 확인",
    payout: "공식 사이트가 작업 포인트 출금을 안내합니다. 단가·검수·최소 출금액은 참여할 프로젝트에서 확인하세요.",
    age: "연령 조건 미확인", minimumAge: null, cost: "유료 교육 별도", deadline: "프로젝트별 마감", duration: "작업별 확인",
    conditions: "내 조건에 맞는 프로젝트가 있어야 참여할 수 있어요. 작업 물량과 수익은 보장되지 않아요.",
    steps: ["공식 사이트의 데이터 라벨링·모집공고에서 참여 가능한 일을 찾으세요.", "연령·자격·기기·교육비·단가·검수 조건을 확인한 뒤 참여를 결정하세요.", "작업 완료 후 내 작업과 포인트 내역에서 출금 조건을 확인하세요."],
    startUrl: "https://works.crowdworks.kr/",
    sources: [{label: "공식 작업·출금 안내", url: "https://works.crowdworks.kr/"}, {label: "운영사 안내", url: "https://www.crowdworks.ai/"}], checkedAt: "2026-10-03",
  },
  {
    id: "carbon-receipts", service: "탄소중립포인트", task: "참여 매장에서 전자영수증 받기", category: "앱테크",
    rewardKind: "포인트", reward: "기본 10원/건 · 기간별 이벤트 별도",
    payout: "실천 후 다음 달 말일부터 지급 안내. 단가와 지급은 실적·예산에 따라 바뀔 수 있어요.",
    age: "만 14세 이상", minimumAge: 14, cost: "매장 구매비 별도", deadline: "참여기업별 운영 확인", duration: "소요시간 미확인",
    conditions: "제도 가입과 참여기업별 연동·발급 조건이 필요해요. 모든 매장 영수증이 적립되는 것은 아니에요.",
    steps: ["제도 가입 후 공식 참여기업 목록에서 이용하는 매장을 찾으세요.", "그 기업의 매뉴얼에 따라 전자영수증 발급·연동을 설정하세요.", "필요한 구매 때 전자영수증을 받고 실적을 확인하세요. 2026년 8~12월 2배 이벤트는 예산에 따라 조기 종료·변경될 수 있어요."],
    startUrl: "https://www.cpoint.or.kr/netzero/site/cntnts/CNTNTS_003.do",
    sources: [{label: "단가·지급 안내", url: "https://www.cpoint.or.kr/netzero/site/cntnts/CNTNTS_002.do"}, {label: "참여방법", url: "https://www.cpoint.or.kr/netzero/site/cntnts/CNTNTS_003.do"}, {label: "기간별 이벤트 공지", url: "https://www.cpoint.or.kr/netzero/main.do"}, {label: "가입 연령", url: "https://www.cpoint.or.kr/netzero/member/nv_memberRegistStep1.do"}], checkedAt: "2026-10-03",
  },
];

export function filterOpportunities(category: OpportunityCategory, knownAgeOnly = false) {
  return opportunities.filter(item => (category === "전체" || item.category === category) && (!knownAgeOnly || item.minimumAge !== null));
}
