export const editorialIdentity = {
  authorName: "Biz2Lab PLAY 편집자",
  authorUrl: "/ko/about",
  operatorName: "mizzang0305-oss",
  operatorUrl: "https://github.com/mizzang0305-oss",
} as const;

export const editorialEvidenceTypes = [
  "editorial-selection",
  "scene-analysis",
  "official-help-review",
] as const;

export type EditorialEvidenceType = (typeof editorialEvidenceTypes)[number];

export type EditorialSource = {
  title: string;
  url: string;
  reviewedAt: string;
};

export type EditorialEvidence = {
  type: EditorialEvidenceType;
  summary: string;
  scope: string;
  sources: EditorialSource[];
};

const reviewedAt = "2026-07-17";

const evidence = {
  "tired-after-work-movie-guide": {
    type: "editorial-selection",
    summary:
      "퇴근 뒤 선택을 러닝타임 하나로 단순화하지 않고 초반 진입 속도, 감정 소모, 남은 시간과 중단 가능성으로 나눠 편집했습니다.",
    scope:
      "특정 작품의 만족도를 보장하는 순위표가 아니라, 독자가 현재 피로도에 맞는 후보를 직접 줄이는 관람 선택 가이드입니다.",
    sources: [],
  },
  "ninety-minute-movie-guide": {
    type: "editorial-selection",
    summary:
      "80~100분 범위를 현실적인 짧은 영화 후보로 두고 체감 속도, 사건 밀도와 함께 보는 사람의 집중 상태를 별도 기준으로 정리했습니다.",
    scope:
      "플랫폼별 정확한 러닝타임이나 제공 여부는 달라질 수 있으며, 본문은 작품 목록보다 선택 방법을 제공하는 편집 가이드입니다.",
    sources: [],
  },
  "family-movie-night-guide": {
    type: "editorial-selection",
    summary:
      "가족 관람의 실패 원인을 연령만으로 설명하지 않고 큰 소리, 상실, 자막 속도와 종료 시간처럼 실제로 불편을 만드는 조건으로 나눴습니다.",
    scope:
      "가정별 보호자 판단을 대신하지 않으며, 작품별 최신 연령등급과 내용 정보는 영상물등급위원회에서 다시 확인해야 합니다.",
    sources: [
      {
        title: "영상물등급위원회",
        url: "https://www.kmrb.or.kr/",
        reviewedAt,
      },
    ],
  },
  "horror-movie-intensity-guide": {
    type: "editorial-selection",
    summary:
      "공포 강도를 점프스케어, 잔혹함, 심리 불안과 결말의 여운으로 분리해 각자 피하고 싶은 자극을 먼저 찾도록 구성했습니다.",
    scope:
      "개인의 트라우마와 민감도를 진단하지 않으며, 실제 작품의 등급과 내용 정보는 관람 전에 공식 분류 정보를 확인해야 합니다.",
    sources: [],
  },
  "date-night-movie-guide": {
    type: "editorial-selection",
    summary:
      "데이트 영화를 로맨스 장르로 제한하지 않고 불편한 소재, 대화 가능성, 러닝타임과 이미 본 사람의 태도까지 관람 조건으로 정리했습니다.",
    scope:
      "관계 조언이나 특정 작품의 성공을 보장하지 않으며, 두 사람이 서로의 제외 기준을 말하기 위한 가벼운 선택 프레임입니다.",
    sources: [],
  },
  "theater-or-ott-choice": {
    type: "editorial-selection",
    summary:
      "영화관과 OTT를 화면 크기만으로 비교하지 않고 이동, 중단 가능성, 자막 조절, 총시간과 집중 환경의 차이로 나눠 점검했습니다.",
    scope:
      "가격과 공개 일정은 시점과 플랫폼에 따라 바뀌므로 구체적인 결제와 제공 여부는 각 사업자의 최신 공식 안내를 확인해야 합니다.",
    sources: [],
  },
  "netflix-top-10-how-to-choose": {
    type: "official-help-review",
    summary:
      "Netflix의 앱 내 인기 행과 공식 주간 Top 10을 구분하고 순위를 개인 취향, 러닝타임과 완주 부담으로 다시 거르는 방법을 정리했습니다.",
    scope:
      "인기 순위의 산정 결과를 재현하거나 작품 품질을 단정하지 않으며, 최신 목록과 제공 방식은 Netflix 공식 화면을 기준으로 합니다.",
    sources: [
      {
        title: "Netflix Top 10 South Korea",
        url: "https://www.netflix.com/tudum/top10/south-korea",
        reviewedAt,
      },
    ],
  },
  "rewatch-or-new-movie": {
    type: "editorial-selection",
    summary:
      "다시 보기와 새 작품의 선택을 취향 우열이 아니라 안정이 필요한 날과 발견이 필요한 날의 에너지 차이로 나눠 편집했습니다.",
    scope:
      "반복 시청이나 새 작품 회피를 심리 상태로 진단하지 않으며, 오늘 한 편을 시작하기 위한 개인용 선택 질문만 제공합니다.",
    sources: [],
  },
  "parasite-ending-interpretation": {
    type: "scene-analysis",
    summary:
      "마지막 상상, 반지하로 돌아오는 화면, 반복되는 계단과 냄새를 서로 연결해 기우의 계획과 계급 이동의 거리를 한 관점으로 읽었습니다.",
    scope:
      "감독의 유일한 정답을 주장하지 않고 영화에 나타난 장면을 근거로 가능한 해석을 제시하며, 결말 전체의 스포일러를 포함합니다.",
    sources: [
      {
        title: "Korean Film Biz Zone: PARASITE",
        url: "https://www.koreanfilm.or.kr/eng/films/index/filmsView.jsp?category=ALL&mode=INDEX_FILMS_LIST&movieCd=20183782&pageIndex=1&pageRowSize=10&searchKeyword=Parasite",
        reviewedAt,
      },
    ],
  },
  "truman-show-ending-interpretation": {
    type: "scene-analysis",
    summary:
      "트루먼의 바다 공포, 세트의 벽, 제작자의 목소리와 마지막 시청자 장면을 선택권과 감시의 문제로 연결해 읽었습니다.",
    scope:
      "영화 장면에 근거한 편집 해석이며 제작진의 확정 해설을 대신하지 않고, 바다 탈출과 마지막 장면의 스포일러를 포함합니다.",
    sources: [],
  },
  "inside-out-emotion-interpretation": {
    type: "scene-analysis",
    summary:
      "슬픔이 빙봉 곁에 머무는 장면, 복합 색의 기억과 라일리의 귀가를 연결해 슬픔이 도움과 관계를 여는 기능으로 변하는 과정을 읽었습니다.",
    scope:
      "심리 치료나 감정 진단을 제공하지 않는 영화 해석이며, 작품의 감정 묘사를 실제 정신건강 지침으로 일반화하지 않습니다.",
    sources: [
      {
        title: "Pixar: Inside Out",
        url: "https://www.pixar.com/inside-out",
        reviewedAt,
      },
    ],
  },
  "inside-out-2-emotions-interpretation": {
    type: "scene-analysis",
    summary:
      "불안이 미래 대비에서 현재 통제로 바뀌는 과정, 새 감정들의 보호 기능, 믿음 체계와 불안 발작 장면을 연결해 사춘기의 복합적인 정체성을 읽었습니다.",
    scope:
      "정신건강 진단이나 치료 조언이 아닌 영화 장면 해석입니다. 공식 보도 이미지와 시놉시스를 작품 정보의 근거로 사용하고, 이미지에는 권리자와 편집 용도 출처를 함께 표시합니다.",
    sources: [
      {
        title: "Disney UK Press: Inside Out 2 Press Kit",
        url: "https://press.disney.co.uk/press-kit/inside-out-2",
        reviewedAt,
      },
      {
        title: "Disney UK Press: Inside Out 2 Images",
        url: "https://press.disney.co.uk/gallery/inside-out-2",
        reviewedAt,
      },
      {
        title: "Disney UK Press: Inside Out 2 Logo and Key Art",
        url: "https://press.disney.co.uk/gallery/inside-out-2-logo-and-key-art",
        reviewedAt,
      },
    ],
  },
  "lalaland-ending-interpretation": {
    type: "scene-analysis",
    summary:
      "재즈 클럽의 이름, 마지막 상상 몽타주와 두 사람의 짧은 미소를 연결해 선택하지 않은 삶과 현재를 동시에 인정하는 결말로 읽었습니다.",
    scope:
      "두 사람의 관계를 성공과 실패 중 하나로 단정하지 않는 편집 해석이며, 마지막 몽타주와 현재 가족에 관한 스포일러를 포함합니다.",
    sources: [
      {
        title: "Lionsgate: La La Land",
        url: "https://www.lionsgate.com/movies/la-la-land",
        reviewedAt,
      },
    ],
  },
  "her-ai-relationship-interpretation": {
    type: "scene-analysis",
    summary:
      "시어도어의 편지 대필, 사만다의 신체 부재, 다중 관계와 옥상 장면을 연결해 기술보다 외로움과 투사의 문제를 중심으로 읽었습니다.",
    scope:
      "현재 AI 제품의 의식이나 감정을 주장하지 않는 영화 해석이며, 사만다의 성장과 이별을 포함한 결말 전체의 스포일러가 있습니다.",
    sources: [],
  },
  "devil-wears-prada-ending-interpretation": {
    type: "scene-analysis",
    summary:
      "파란색 스웨터 설명, 파리 출장, 미란다의 비교와 마지막 휴대전화 장면을 연결해 앤디가 야망의 경계를 다시 정하는 과정으로 읽었습니다.",
    scope:
      "패션 산업이나 특정 직장 문화를 일반화하지 않는 작품 해석이며, 앤디의 퇴사와 마지막 장면에 관한 스포일러를 포함합니다.",
    sources: [
      {
        title: "20th Century Studios: The Devil Wears Prada",
        url: "https://www.20thcenturystudios.com/movies/the-devil-wears-prada",
        reviewedAt,
      },
    ],
  },
  "the-intern-work-and-age-interpretation": {
    type: "scene-analysis",
    summary:
      "벤의 관찰, 작은 정리, 운전과 기다리는 태도를 연결해 경험 많은 해결사보다 상대의 결정권을 남기는 동료로 인물을 읽었습니다.",
    scope:
      "세대·성별·직장 문제의 현실적 해결책을 제공하지 않는 영화 해석이며, 줄스의 일과 가정 갈등을 일부 언급합니다.",
    sources: [],
  },
  "netflix-viewing-history-delete": {
    type: "official-help-review",
    summary:
      "시청 활동에서 제목을 숨기는 절차와 계속 시청 행에서만 제거하는 기능을 구분하고 추천과 기기 반영에 미치는 차이를 확인했습니다.",
    scope:
      "Netflix 화면과 메뉴는 기기·지역·업데이트에 따라 달라질 수 있으므로 실제 변경 전 공식 계정 페이지와 최신 도움말을 확인해야 합니다.",
    sources: [
      {
        title: "Netflix: How to hide titles from viewing history",
        url: "https://help.netflix.com/en/node/22205",
        reviewedAt,
      },
      {
        title: "Netflix: Remove titles from Continue Watching",
        url: "https://help.netflix.com/en/node/115312/",
        reviewedAt,
      },
    ],
  },
  "netflix-profile-reset-recommendations": {
    type: "official-help-review",
    summary:
      "Netflix의 추천 신호 공식 설명을 바탕으로 프로필 분리, 잘못 섞인 시청 활동 숨기기, 평가와 실제 시청 순서로 정리했습니다.",
    scope:
      "추천 결과를 초기 상태로 완전히 복원하거나 특정 작품 노출을 보장하지 않으며, 계정 화면은 최신 Netflix 안내를 따라야 합니다.",
    sources: [
      {
        title: "Netflix: How the recommendations system works",
        url: "https://help.netflix.com/en/node/100639",
        reviewedAt,
      },
    ],
  },
  "netflix-subtitle-settings": {
    type: "official-help-review",
    summary:
      "기기별 음성·자막 메뉴 진입, 언어 선택, 표시 모양과 선호 저장이 다르게 동작하는 경우를 Netflix 공식 절차와 대조했습니다.",
    scope:
      "모든 작품과 기기에서 같은 언어·SDH·표시 설정을 제공한다고 보장하지 않으며, 실제 선택지는 작품과 지역에 따라 달라집니다.",
    sources: [
      {
        title: "Netflix: Use subtitles, captions, or choose audio language",
        url: "https://help.netflix.com/en/node/372",
        reviewedAt,
      },
    ],
  },
  "ott-subscription-rotation": {
    type: "editorial-selection",
    summary:
      "구독 가격표보다 최근 시청 횟수, 다음 달 꼭 볼 작품, 가족 사용과 결제 전 판단 날짜를 기준으로 한 서비스씩 순환하는 방법을 구성했습니다.",
    scope:
      "재무 조언이나 특정 서비스 해지를 권하지 않으며, 가격·혜택·해지·재가입 조건은 각 OTT 사업자의 최신 약관을 확인해야 합니다.",
    sources: [],
  },
  "family-profile-age-rating": {
    type: "official-help-review",
    summary:
      "Netflix의 키즈 프로필, 프로필별 연령등급, 제목 차단과 PIN 잠금이 각각 다른 문제를 해결한다는 점을 공식 도움말과 대조했습니다.",
    scope:
      "보호자의 판단을 대신하지 않으며, 작품별 한국 연령등급과 내용 정보는 영상물등급위원회 등 공식 분류에서 다시 확인해야 합니다.",
    sources: [
      {
        title: "Netflix: Set profile maturity ratings or block titles",
        url: "https://help.netflix.com/en/node/114276",
        reviewedAt,
      },
      {
        title: "영상물등급위원회",
        url: "https://www.kmrb.or.kr/",
        reviewedAt,
      },
    ],
  },
  "watchlist-without-spoilers": {
    type: "editorial-selection",
    summary:
      "찜 목록을 장르와 상황별 다섯 칸으로 제한하고 줄거리 대신 저장 이유, 러닝타임, 등급과 확인 날짜만 남기도록 구성했습니다.",
    scope:
      "OTT 제공 여부와 작품 평점을 보장하지 않는 개인용 정리 방법이며, 실제 시청 전 플랫폼과 공식 등급 정보를 다시 확인해야 합니다.",
    sources: [],
  },
} as const satisfies Record<string, EditorialEvidence>;

export function getEditorialEvidence(slug: string): EditorialEvidence {
  const item = evidence[slug as keyof typeof evidence];

  if (!item) {
    throw new Error(`${slug}: published article is missing editorial evidence`);
  }

  return item;
}

export function getEditorialEvidenceEntries(): [string, EditorialEvidence][] {
  return Object.entries(evidence);
}
