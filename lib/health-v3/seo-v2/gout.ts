import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const niams = "https://www.niams.nih.gov/health-topics/gout";
export const goutSources: HealthSource[] = [
  { id: "SRC-NIAMS-GOUT", organization: "NIH/NIAMS", title: "Gout", url: niams, sourceDate: "2023-12 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIAMS-GOUT-DIAGNOSIS", organization: "NIH/NIAMS", title: "Gout: Diagnosis, Treatment, and Steps to Take", url: `${niams}/diagnosis-treatment-and-steps-to-take`, sourceDate: "2023-12 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-GOUT", organization: "NIH/MedlinePlus", title: "Gout", url: "https://medlineplus.gov/gout.html", sourceDate: "2024-02-26 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-URIC-ACID", organization: "NIH/MedlinePlus", title: "Uric Acid Test", url: "https://medlineplus.gov/lab-tests/uric-acid-test/", sourceDate: "2026-07-15 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-GOUT", organization: "질병관리청 국가건강정보포털", title: "통풍", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6732", sourceDate: "2026-05-18 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHS-GOUT", organization: "NHS", title: "Gout", url: "https://www.nhs.uk/conditions/gout/", sourceDate: "2023-08-24 (페이지 검토일; 다음 검토 예정일과 구분)", retrievedAt: checkedAt },
  { id: "SRC-ACR-GOUT", organization: "American College of Rheumatology", title: "Gout", url: "https://rheumatology.org/patients/gout", sourceDate: "2025-02 (Updated)", retrievedAt: checkedAt },
];

// Preserve original claim and licensed-review records. New source mapping is
// an editorial cross-check, not a diagnosis or licensed clinical approval.
export const goutArticle: HealthArticle = {
  slug: "gout", seoTitle: "통풍: 요산 수치만으로 진단할 수 없는 이유와 진료 준비",
  title: "통풍이 걱정될 때, 요산 수치와 관절 통증을 나눠 보기",
  eyebrow: "뼈·관절 · 음식 하나보다 함께 볼 정보",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "요산 수치와 통풍 진단의 차이, 갑작스러운 관절 변화에 필요한 진료, 급성 통증 완화와 장기 예방의 목적을 구분하고 상담 질문을 준비합니다.",
  outcome: "음식이나 요산 수치 하나로 원인을 확정하지 않고, 급한 관절 변화에 도움을 받으며 통증과 예방의 질문을 따로 준비할 수 있습니다.",
  archetype: "MYTH_FIRST",
  summary: [
    "통풍은 요산염 결정과 관련된 염증성 관절염입니다. ‘잘못 먹은 벌’처럼 한 가지 식습관으로 설명할 수 없습니다.",
    "혈액 요산이 높다는 사실과 통풍이라는 진단은 같지 않습니다. 관절 증상·검사·다른 원인을 함께 평가합니다.",
    "한 관절의 갑작스러운 심한 통증이나 부종은 다음 예약까지 기다리지 말고 신속히 진료받으세요. 열이 나야만 진료받는 기준이 아닙니다.",
  ],
  sections: [
    { title: "‘어제 먹은 음식 때문’이라고만 생각하기 쉽습니다", paragraphs: [
      "갑자기 관절이 아프면 전날의 고기나 술부터 떠올릴 수 있습니다. 하지만 통풍을 음식 하나의 결과나 의지의 문제로 단정하면, 몸에서 요산을 만들고 내보내는 과정과 다른 질환·복용 약을 놓치기 쉽습니다.",
      "요산은 퓨린이라는 물질이 분해될 때 생깁니다. 퓨린은 음식에만 있는 것이 아니라 우리 몸의 세포에도 있습니다. 요산이 많이 만들어지거나 충분히 배출되지 않는 데에는 여러 요인이 관여하므로 가족력과 신장 상태 등도 상담 정보가 됩니다.",
      "식사와 음주를 살펴볼 가치는 있지만 비난이 먼저일 필요는 없습니다. ‘무엇을 잘못 먹었나?’에만 머무르기보다 ‘어느 관절이 언제부터 달라졌고, 어떤 약과 질환이 있는가?’를 함께 정리해 보세요. 이 질문 전환은 진료 준비를 위한 편집 예시입니다.",
    ], claimIds: ["GOUT-P3-001", "GOUT-P3-004"], sourceIds: ["SRC-NIAMS-GOUT", "SRC-KDCA-GOUT", "SRC-ACR-GOUT"], imageId: null },
    { title: "혈액 속 요산과 관절의 염증은 같은 정보가 아닙니다", paragraphs: [
      "통풍에서는 요산염 결정이 관절 안이나 주변에 쌓여 염증 반응을 일으킬 수 있습니다. 갑자기 통증·붓기·열감이 심해지는 시기를 통풍 발작이라고 부르지만, 아픈 관절을 보기만 해서 그 원인이 결정인지 확정할 수는 없습니다.",
      "혈액검사는 혈액 속 요산에 관한 정보를 줍니다. 수치가 높아도 통풍 증상이 없는 사람이 있고, 수치가 높지 않게 나왔다고 관절 증상의 원인 평가를 끝내는 것도 아닙니다. 검사표의 한 칸이 병력·진찰·필요한 추가 검사를 대신하지 않습니다.",
      "아래 그림의 관절 속 결정과 옆의 혈액 검체는 서로 다른 정보를 뜻합니다. 두 그림을 순서대로 진행하는 단계나 ‘검사 수치가 높으면 반드시 관절에 이런 일이 생긴다’는 설명으로 읽지 마세요. 개인의 진단 기준이나 요산 목표치는 이 그림에 없습니다.",
    ], claimIds: ["GOUT-P3-001", "GOUT-P3-003", "GOUT-P3-004"], sourceIds: ["SRC-KDCA-GOUT", "SRC-MEDLINEPLUS-URIC-ACID", "SRC-ACR-GOUT"], imageId: "gout-concept",
      links: [{ href: "/health/guides/reading-health-results", label: "검사 수치와 진단을 구분해 읽기" }] },
    { title: "즉시 119가 필요한 변화와 급한 관절 진료를 구분하세요", paragraphs: [
      "심하게 숨쉬기 어렵거나 갑자기 의식이 흐려지는 위급한 변화가 있으면 즉시 119에 연락합니다. 관절 증상 기록이나 기존 약의 효과를 기다리지 마세요.",
      "한 관절이 갑자기 심하게 아프거나, 붓거나, 주변 피부 색이 달라지면 당일 신속히 진료받으세요. 붓고 뜨거운 관절에 발열·오한·몸이 많이 아픈 느낌이 동반되면 감염 같은 원인도 빠르게 확인해야 합니다. 모든 변화가 함께 생기거나 열이 날 때까지 기다리라는 뜻이 아닙니다.",
      "이전에 통풍 진단을 받았거나 증상이 지난번과 비슷해도 새로운 통증을 혼자 확정하지 않습니다. 통풍 발작과 관절 감염은 겉모습이 비슷할 수 있으며, 혈액 요산 수치만으로 감염을 배제할 수 없습니다. 기록을 완성하거나 식사를 바꿔 본 뒤 진료를 결정하지 마세요.",
    ], claimIds: ["GOUT-P3-002", "GOUT-P3-005"], sourceIds: ["SRC-NHS-SEPTIC-ARTHRITIS", "SRC-NHS-GOUT", "SRC-NHS-BREATHLESSNESS", "SRC-MEDLINEPLUS-URIC-ACID"], tone: "warning", imageId: null,
      links: [{ href: "/health/guides/danger-signals", label: "기록보다 도움 요청이 먼저인 위험 신호" }] },
    { title: "진료에서는 관절의 변화와 검사 목적을 함께 봅니다", paragraphs: [
      "엄지발가락이 잘 알려져 있지만 통풍은 발목·무릎 등 다른 관절에도 생길 수 있습니다. 아픈 위치만으로 통풍과 다른 관절 질환을 구별하지 않습니다. 처음인지 반복인지, 갑자기 시작했는지, 일상에 어떤 영향을 주었는지 설명하는 것이 중요합니다.",
      "의료진은 병력과 관절 상태를 확인하고 필요한 검사를 선택합니다. 혈액 요산 검사, 관절액에서 결정 등을 확인하는 검사, 초음파 같은 영상검사는 모두 같은 질문에 답하는 검사가 아닙니다. 모든 사람이 모든 검사를 반드시 받아야 한다는 목록은 아닙니다.",
      "검사를 권유받으면 ‘이번 검사는 무엇을 확인하려는 건가요?’, ‘결과가 불분명하면 다음에는 어떻게 하나요?’라고 물어보세요. 관절액 검사가 필요한 이유도 상담할 수 있습니다. 집에서 관절을 눌러 보거나 특정 약에 반응하는지 시험해 진단하지 않습니다.",
    ], claimIds: ["GOUT-P3-002", "GOUT-P3-003"], sourceIds: ["SRC-NIAMS-GOUT-DIAGNOSIS", "SRC-KDCA-GOUT", "SRC-MEDLINEPLUS-GOUT"], imageId: null,
      links: [{ href: "/health/osteoarthritis", label: "골관절염도 통증 위치만으로 판단하지 않기" }] },
    { title: "통증을 가라앉히는 치료와 앞으로의 예방은 목적이 다릅니다", paragraphs: [
      "현재 발작의 통증·염증을 줄이는 치료와, 앞으로의 발작이나 결정 축적을 줄이기 위한 요산 관리에는 서로 다른 목적이 있습니다. 통증이 잦아들었다고 장기 관리가 끝난 것으로 판단하거나, 수치가 높다는 이유만으로 약을 혼자 시작하지 않습니다.",
      "발작 사이에는 별다른 증상이 없는 시기도 있을 수 있습니다. 그 시기가 개인별 추적 계획이나 이미 처방된 약을 임의로 끝내도 된다는 뜻은 아닙니다. 예방 치료의 필요성·선택과 검사 계획은 반복 양상, 다른 질환과 복용 약 등을 고려해 정합니다.",
      "새로 약을 받았다면 어느 목적의 약인지, 어떻게 사용하도록 처방되었는지, 불편한 반응이 생기면 어디에 연락할지 확인합니다. 통증이 남았다는 이유로 약을 겹쳐 먹거나, 효과를 확인하려고 다른 사람의 약을 사용하지 마세요. 약을 혼자 줄이거나 중단하지 말고 변경은 진료팀과 상의합니다.",
    ], claimIds: ["GOUT-P3-004"], sourceIds: ["SRC-NIAMS-GOUT-DIAGNOSIS", "SRC-NHS-GOUT", "SRC-ACR-GOUT"], imageId: null,
      links: [{ href: "/health/guides/medication-list", label: "처방약·일반약·보충제를 함께 알리는 약 목록" }] },
    { title: "‘이번 통증’과 ‘다음 관리’의 질문을 나눠 가져가세요", paragraphs: [
      "진료 중에는 통증 이야기만 하다가 이후 계획을 묻지 못할 수 있습니다. 아래는 빠뜨린 질문을 찾는 편집용 메모 구조입니다. 급한 관절 변화가 있을 때 진료를 늦추며 작성하는 과제가 아니며, 이미 의료진에게 받은 지침을 대신하지 않습니다.",
    ], table: { caption: "두 목적을 나눈 통풍 진료 질문", columns: ["이번 관절 변화에 관해", "이후 관리에 관해"], rows: [
      ["어느 관절이 언제부터, 어떻게 달라졌는지 알리기", "반복된 발작과 증상 사이 기간을 함께 알리기"],
      ["통풍 외 다른 원인과 검사 목적은 무엇인가요?", "제게 장기 요산 관리가 필요한지 어떻게 판단하나요?"],
      ["현재 처방의 목적과 사용 지침은 무엇인가요?", "다음 검사·진료 시점과 그 전에 연락할 변화는 무엇인가요?"],
      ["급한 변화가 다시 생기면 어디로 연락하나요?", "다른 질환·약·식사 상황을 고려해 무엇부터 조정할까요?"],
    ] }, claimIds: ["GOUT-P3-003", "GOUT-P3-004"], sourceIds: ["SRC-NIAMS-GOUT-DIAGNOSIS", "SRC-ACR-GOUT"], imageId: "gout-action",
      links: [{ href: "/health/tools/gout-visit-card", label: "통풍 관찰·진료 질문 카드" }, { href: "/health/guides/appointment-questions", label: "진료 마지막에 다음 행동을 확인하는 질문" }] },
    { title: "생활 관리는 음식 금지표 하나로 끝나지 않습니다", paragraphs: [
      "식사·음주·체중과 활동을 함께 살피는 생활 관리는 치료 계획의 일부입니다. 특정 음식 한 번과 통증이 겹쳤다는 이유만으로 원인을 확정하거나, 음식만 바꾸면 필요한 치료를 대신할 수 있다고 보지 않습니다. 실천할 변화는 기존 식사와 다른 건강 문제를 함께 고려해 정합니다.",
      "검사 준비도 개인 안내를 확인하세요. 요산 검사에 영향을 줄 수 있는 약이나 식사 조건을 알리고, 검사를 위해 약을 스스로 끊지 않습니다. 이뇨제 등 복용 약이 관련될 수 있다는 설명은 해당 약을 혼자 중단하라는 지시가 아닙니다.",
      "물을 무조건 많이 마시거나 특정 보충제·과일·음료를 치료제로 삼는 방식 대신, 수분 제한 여부와 식사에서 조정할 점을 진료팀에 물어보세요. 여기서는 하루 수분량, 요산 목표 수치, 금지 식품의 공통 목록이나 약 용량을 정하지 않습니다.",
    ], claimIds: ["GOUT-P3-004"], sourceIds: ["SRC-NIAMS-GOUT-DIAGNOSIS", "SRC-MEDLINEPLUS-URIC-ACID", "SRC-KDCA-GOUT"], imageId: null,
      links: [{ href: "/health/obesity", label: "비난보다 건강·생활 변화를 함께 상담하기" }] },
  ],
  faq: [
    { question: "요산 수치가 높으면 모두 통풍인가요?", answer: "그렇지 않습니다. 혈액 요산이 높아도 통풍 증상이 없는 사람이 있습니다. 관절 증상·병력·진찰과 필요한 검사를 함께 보므로 수치 하나로 진단하거나 약을 시작하지 않습니다.", claimIds: ["GOUT-P3-003", "GOUT-P3-004"], sourceIds: ["SRC-MEDLINEPLUS-URIC-ACID", "SRC-ACR-GOUT"] },
    { question: "검사에서 요산이 높지 않았으니 관절 통증은 통풍이 아닌가요?", answer: "한 번의 수치만으로 원인 평가를 끝내지 않습니다. 증상과 검사 시점 등을 의료진이 함께 살피고 필요한 다음 평가를 정합니다. 갑자기 심하게 아프거나 붓는 관절은 수치와 별개로 신속히 진료받으세요.", claimIds: ["GOUT-P3-003", "GOUT-P3-005"], sourceIds: ["SRC-KDCA-GOUT", "SRC-NHS-SEPTIC-ARTHRITIS"] },
    { question: "엄지발가락이 아니라 무릎이 아파도 통풍일 수 있나요?", answer: "다른 관절에도 생길 수 있지만 위치만으로 확정하지 않습니다. 갑작스러운 심한 통증·부종은 감염 등 다른 원인 확인도 필요하므로 평소 관절염으로 넘기지 말고 진료받습니다.", claimIds: ["GOUT-P3-002", "GOUT-P3-005"], sourceIds: ["SRC-NIAMS-GOUT", "SRC-NHS-SEPTIC-ARTHRITIS"] },
    { question: "통증이 사라지면 처방약을 끊어도 되나요?", answer: "약마다 목적이 다릅니다. 급성 증상 완화와 장기 요산 관리를 구분해 처방받은 사용 지침을 확인하세요. 발작이 없는 시기를 임의 중단의 기준으로 삼지 않고 변경은 진료팀과 상의합니다.", claimIds: ["GOUT-P3-004"], sourceIds: ["SRC-NIAMS-GOUT-DIAGNOSIS", "SRC-NHS-GOUT"] },
    { question: "음식을 조심하면 약이나 추적 진료를 대신할 수 있나요?", answer: "생활 관리는 중요하지만 필요한 치료·추적 계획을 대신한다고 단정하지 않습니다. 다른 질환·복용 약·반복 양상을 함께 보고, 자신의 식사에서 실천할 변화를 상담합니다. 특정 음식이나 보충제를 치료제로 제시하지 않습니다.", claimIds: ["GOUT-P3-004"], sourceIds: ["SRC-NIAMS-GOUT-DIAGNOSIS", "SRC-ACR-GOUT"] },
    { question: "갑자기 붓고 아픈데 열이 없으면 다음 예약까지 기다려도 되나요?", answer: "열이 없어도 한 관절이 갑자기 심하게 아프거나 붓거나 피부 색이 달라지면 당일 신속히 진료받으세요. 발열·오한까지 모두 있어야 진료받는 기준이 아닙니다. 지난번 통풍과 비슷하다는 이유로 감염 등 다른 원인을 배제하지 않습니다.", claimIds: ["GOUT-P3-005"], sourceIds: ["SRC-NHS-SEPTIC-ARTHRITIS", "SRC-NHS-GOUT"] },
  ],
  sourceIds: [...goutSources.map(s=>s.id), "SRC-NHS-SEPTIC-ARTHRITIS", "SRC-NHS-BREATHLESSNESS"],
  imageIds: ["gout-hero", "gout-concept", "gout-action"],
  visuals: {
    "gout-hero": { src: "/images/onurim/gout/hero.webp", alt: "진료 메모와 상담 준비를 상징하는 자주색 장식 표지 삽화", caption: "표지의 선과 십자 모양은 요산 검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "gout-concept": { src: "/images/onurim/gout/concept-v2.webp", alt: "관절 공간의 작은 요산염 결정 기호와 별도 원 안의 혈액 검체를 나란히 보여 주는 비교 개념도", caption: "왼쪽은 관절 안과 주변의 요산염 결정을 단순화한 개념도, 오른쪽은 혈액 요산검사의 상징입니다. 혈액검사로 관절 결정을 직접 관찰하는 것은 아닙니다. 실제 모양·크기·수치나 개인 진단·필수 진행 단계·치료 전후를 보여 주지 않습니다.", width: 1536, height: 1024 },
    "gout-action": { src: "/images/onurim/gout/action-v2.webp", alt: "이번 통증과 다음 관리라는 두 제목 아래 관절과 빈 달력 기호를 놓은 진료 질문용 노트 삽화", caption: "현재 통증 대응과 장기 관리에 관해 물어볼 질문을 나누는 빈 메모입니다. 치료 순서·방문 간격·약의 시작 또는 중단 시점을 정하지 않습니다. 급한 변화가 있을 때는 메모보다 진료가 먼저입니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["gout-visit-card"],
};
