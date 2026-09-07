import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const kidneyStonesSources: HealthSource[] = [
  { id: "SRC-NIDDK-STONE-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/symptoms-causes", sourceDate: "2017-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-STONE-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/diagnosis", sourceDate: "2017-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-STONE-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/treatment", sourceDate: "2017-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-STONE-DIET", organization: "NIH/NIDDK", title: "Eating, Diet, & Nutrition for Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/eating-diet-nutrition", sourceDate: "2017-05 (Last Reviewed; 참고문헌 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-KIDNEY-STONES", organization: "질병관리청 국가건강정보포털", title: "신장결석", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5433", sourceDate: "2026-05-11 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-EAU-UROLITHIASIS", organization: "European Association of Urology", title: "EAU Guidelines on Urolithiasis — Guidelines", url: "https://uroweb.org/guidelines/urolithiasis/chapter/guidelines", sourceDate: "페이지 자체 작성·수정일 미표시 (전문가 지침; 확인일과 구분)", retrievedAt: checkedAt },
  { id: "SRC-NHS-KIDNEY-STONES", organization: "NHS", title: "Kidney stones — Overview", url: "https://www.nhs.uk/conditions/kidney-stones/", sourceDate: "2022-11-30 (페이지 검토일; 영상 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-NHS-SEPSIS", organization: "NHS", title: "Sepsis", url: "https://www.nhs.uk/conditions/sepsis/", sourceDate: "2026-05-14 (페이지 검토일)", retrievedAt: checkedAt },
];

export const kidneyStonesArticle: HealthArticle = {
  slug: "kidney-stones", seoTitle: "신장결석: 옆구리 통증·소변 변화와 검사 후 질문",
  title: "신장결석, 소변길과 검사 결과를 함께 보기",
  eyebrow: "신장·비뇨기 · 위치·막힘·배출 확인",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "콩팥·요관·방광·요도의 차이와 결석 검사에서 확인하는 정보를 정리합니다. 급한 통증·발열·소변 변화, 통증이 줄어든 뒤의 확인과 개인별 예방 질문도 설명합니다.",
  outcome: "소변길의 이름을 이해하고 결석 위치·막힘·배출 여부를 진료에서 확인하며, 물이나 음식만으로 급한 증상을 해결하려 하지 않을 수 있습니다.",
  archetype: "SIMPLE_ANALOGY",
  summary: [
    "결석은 소변 속 물질이 결정으로 모여 단단해진 것입니다. 어디에 있는지, 소변 흐름을 막는지, 감염이 있는지가 함께 중요합니다.",
    "심한 통증, 발열·오한, 소변이 나오지 않거나 매우 적은 변화는 기다리지 말고 즉시 의료 도움을 받을 신호입니다. 모두 겹쳐야 하는 조건이 아닙니다.",
    "통증이 줄었다고 배출이 확인된 것은 아닙니다. 물의 양이나 식사 제한도 결석 성분과 다른 건강 상태에 맞춰 확인합니다.",
  ],
  sections: [
    { title: "통증·열·소변 변화가 급하면 기록보다 평가가 먼저입니다", paragraphs: [
      "갑자기 혼돈이 생기거나 말이 어눌해지는 경우, 숨이 매우 빨라지거나 숨쉬기 어려운 경우에는 즉시 119에 연락합니다. 감염과 관련된 심각한 변화일 수도 있으며, 결석 때문이라고 스스로 확정하지 않습니다. 직접 운전하지 말고 119 안내를 따르세요.",
      "심한 옆구리·복부 통증, 발열 또는 오한, 소변이 나오지 않거나 매우 적어지는 변화, 반복되는 구토가 있으면 즉시 의료 도움을 받습니다. 각각 평가가 필요한 신호이며, 열과 통증과 소변 감소가 모두 나타날 때까지 기다리지 않습니다. 바로 진료받기 어렵다면 응급의료기관에 도움을 요청하세요.",
      "눈에 보이는 혈뇨나 새 배뇨 통증도 결석으로 단정하지 말고 신속히 진료받습니다. 결석이 소변길을 막으면서 감염이 생기거나 소변이 나오지 않는 상황은 응급 치료가 필요할 수 있습니다. 물을 마시며 배출을 기다리거나 약의 반응을 보느라 평가를 늦추지 마세요.",
    ], tone: "warning", claimIds: ["KST-P3-005"], sourceIds: ["SRC-NHS-SEPSIS", "SRC-NIDDK-STONE-SYMPTOMS", "SRC-NIDDK-STONE-TREATMENT", "SRC-NHS-KIDNEY-STONES", "SRC-EAU-UROLITHIASIS"], imageId: null,
      links: [{ href: "/health/urinary-tract-infection", label: "방광과 콩팥 쪽 감염을 구분해 질문하기" }, { href: "/health/guides/danger-signals", label: "갑작스러운 호흡·의식 변화와 도움 요청" }] },
    { title: "콩팥에서 몸 밖까지, 소변이 지나는 길을 따라가 보세요", paragraphs: [
      "소변길을 지도로 보면 결석의 위치를 설명하기 쉬워집니다. 콩팥은 혈액에서 노폐물 등을 걸러 소변을 만듭니다. 콩팥 안에서 모인 소변은 요관을 통해 방광에 저장되고, 요도를 거쳐 몸 밖으로 나갑니다. 요관과 요도는 이름은 비슷하지만 서로 다른 구간입니다.",
      "소변 속 물질이 결정으로 모여 단단한 덩어리가 된 것이 결석입니다. 콩팥 안에 있으면 신장결석, 요관에 있으면 요관결석이라고 부릅니다. 요로결석은 소변길에 있는 결석을 넓게 가리키는 말입니다. 모든 결석이 같은 성분이거나 그림처럼 여러 곳에 동시에 있다는 뜻은 아닙니다.",
      "콩팥에 있어도 아무 증상 없이 검사에서 발견될 수 있고, 이동하거나 흐름을 막으면 옆구리·등·아랫배·사타구니 쪽 통증 등이 나타날 수 있습니다. 통증 위치만 보고 어느 구간에 있는지 확정하거나 손으로 두드려 자가검사하지 않습니다.",
    ], claimIds: ["KST-P3-001", "KST-P3-002"], sourceIds: ["SRC-KDCA-KIDNEY-STONES", "SRC-NHS-KIDNEY-STONES", "SRC-NIDDK-STONE-SYMPTOMS"], imageId: "kidney-stones-concept" },
    { title: "검사는 ‘돌이 있나요?’에서 끝나지 않습니다", paragraphs: [
      "의료진은 증상·과거 결석·가족력·다른 질환과 복용 약을 묻고 진찰합니다. 소변·혈액·영상검사는 서로 다른 정보를 보탭니다. 필요한 검사와 순서는 증상, 임신 가능성, 콩팥 상태 등 개인 상황에 맞춰 결정합니다.",
      "결과 설명을 들을 때는 결석의 위치·크기뿐 아니라 소변길이 막혔는지, 감염이나 콩팥 기능 문제가 있는지 함께 질문하세요. 사진의 점이나 검사 숫자 하나를 인터넷 예시와 비교해 치료법을 고르는 것은 어렵습니다.",
    ], table: { caption: "결석 평가에서 검사마다 더해 주는 정보", columns: ["검사·자료", "의료진과 확인할 내용"], rows: [
      ["소변검사", "피가 섞였는지, 감염이나 결석 형성과 관련된 단서가 있는지"],
      ["혈액검사", "콩팥 기능이나 결석 형성·염증과 관련된 정보가 있는지"],
      ["영상검사", "결석의 위치·크기와 소변길 막힘 등 주변 상태가 어떤지"],
      ["배출되거나 제거된 결석의 분석", "어떤 성분인지, 이후 예방 계획에 무엇을 반영할지"],
    ] }, claimIds: ["KST-P3-003"], sourceIds: ["SRC-NIDDK-STONE-DIAGNOSIS", "SRC-KDCA-KIDNEY-STONES", "SRC-EAU-UROLITHIASIS", "SRC-NIDDK-STONE-TREATMENT"], imageId: null,
      links: [{ href: "/health/guides/reading-health-results", label: "검사 결과와 다음 확인 계획을 함께 읽기" }] },
    { title: "통증이 가라앉은 것과 배출 확인은 다릅니다", paragraphs: [
      "통증은 강해졌다 약해지거나 잠시 없어질 수 있습니다. 덜 아프다는 사실만으로 결석이 빠졌거나 콩팥 기능이 회복됐다고 판단하지 않습니다. 의료진과 배출 여부 및 콩팥 기능을 어떻게 확인할지 정하고, 안내받은 추적 평가를 유지합니다.",
      "자연 배출을 기다리는 계획도 의료진이 위치·크기·막힘·감염·통증·콩팥 기능을 평가한 뒤 세웁니다. 여기서는 특정 크기 이하이면 집에서 기다려도 된다는 선을 정하지 않습니다. 새 위험 신호나 통증 악화가 있으면 예정된 확인일까지 기다리지 않습니다.",
      "결석을 작게 부수거나 제거하는 치료가 필요한 경우도 있습니다. 치료 선택은 크기만으로 정하지 않으며, 모든 사람이 같은 시술을 받는 것은 아닙니다. 배출된 결석을 모으라는 안내를 받았다면 병원이 설명한 방법을 따르고, 그것을 찾느라 급한 진료를 미루지 마세요.",
    ], claimIds: ["KST-P3-003", "KST-P3-004", "KST-P3-005"], sourceIds: ["SRC-EAU-UROLITHIASIS", "SRC-NIDDK-STONE-SYMPTOMS", "SRC-NIDDK-STONE-TREATMENT", "SRC-KDCA-KIDNEY-STONES"], imageId: null },
    { title: "물과 식사, 같은 처방을 모두에게 적용하지 않습니다", paragraphs: [
      "수분은 결석 예방에서 중요하지만, 지금의 막힘이나 감염을 물로 해결하려는 것과는 다릅니다. 필요한 수분량은 날씨·활동·건강 상태에 따라 달라집니다. 이미 수분 제한을 안내받았다면 임의로 늘리지 말고 자신의 범위를 확인하세요. 소변이 나오지 않거나 구토가 계속되면 억지로 마시며 버티지 말고 의료 도움을 받습니다.",
      "칼슘이라는 이름이 들어간 결석이라고 칼슘 식품을 모두 끊는 것은 적절하지 않습니다. 음식 속 적정량의 칼슘은 장에서 다른 물질과 결합해 일부 결석 예방에 도움이 될 수 있습니다. 그렇다고 모든 사람에게 칼슘 섭취를 무조건 늘리거나 보충제를 시작하라는 뜻도 아닙니다.",
      "염분·동물성 단백질·수산 등 식사에서 조정할 내용은 결석 종류에 따라 다릅니다. 먼저 ‘제 결석 성분을 알 수 있나요?’를 묻고, 현재 식사와 보충제를 알려 개인별 계획을 상담합니다. 금지 음식 목록 하나를 모든 결석에 적용하거나 주스·보충제를 치료제로 사용하지 않습니다.",
    ], claimIds: ["KST-P3-004"], sourceIds: ["SRC-NIDDK-STONE-TREATMENT", "SRC-NIDDK-STONE-DIET", "SRC-KDCA-KIDNEY-STONES"], imageId: null,
      links: [{ href: "/health/guides/medication-list", label: "보충제까지 빠뜨리지 않는 사용 약 목록" }] },
    { title: "검사 후 돌아오기 전, 네 가지 질문을 챙기세요", paragraphs: [
      "아래는 진료 설명을 자신의 다음 행동과 연결하기 위한 질문 예시입니다. 이미 받은 설명은 아는 대로 적고, 모르는 부분은 빈칸으로 남겨 물어봅니다. 검사 결과를 스스로 판독하거나 새 치료 일정을 정하는 양식은 아닙니다.",
      "추적 날짜와 연락처는 병원의 실제 안내로 채웁니다. 처방약을 받았다면 목적·사용법·불편이 생겼을 때 연락할 방법도 확인하세요. 다른 사람의 약을 빌려 쓰거나 스스로 약을 늘리거나 중단하지 않습니다.",
    ], bullets: [
      "위치와 크기: 결석이 어느 구간에 있고, 그 정보가 제 치료 계획에 어떤 의미인가요?",
      "막힘과 감염: 소변 흐름·감염·콩팥 기능 중 지금 확인하거나 치료할 문제가 있나요?",
      "배출 확인: 통증이 줄어도 무엇을 언제 다시 확인해야 하며, 어떤 변화에 먼저 연락하나요?",
      "성분과 예방: 결석 분석이 가능한가요? 수분·식사·약 중 제게 필요한 조정은 무엇인가요?",
    ], claimIds: ["KST-P3-003", "KST-P3-004"], sourceIds: ["SRC-NIDDK-STONE-DIAGNOSIS", "SRC-NIDDK-STONE-TREATMENT", "SRC-NIDDK-STONE-DIET", "SRC-EAU-UROLITHIASIS"], imageId: "kidney-stones-action",
      links: [{ href: "/health/tools/kidney-stones-visit-card", label: "신장결석 관찰·진료 질문 카드" }, { href: "/health/guides/appointment-questions", label: "들은 답변과 다음 행동을 확인하는 진료 질문" }] },
  ],
  faq: [
    { question: "신장결석과 요관결석은 무엇이 다른가요?", answer: "결석이 있는 위치를 구분하는 이름입니다. 콩팥 안의 결석과 콩팥에서 방광으로 이어지는 요관의 결석을 구분합니다. 통증 위치만으로 이를 확정하지 않고 검사 결과로 확인합니다.", claimIds: ["KST-P3-001", "KST-P3-003"], sourceIds: ["SRC-KDCA-KIDNEY-STONES", "SRC-NHS-KIDNEY-STONES"] },
    { question: "통증이 없어졌으면 결석이 빠진 건가요?", answer: "그 사실만으로 배출을 확인할 수 없습니다. 의료진과 결석 배출 여부 및 콩팥 기능 회복을 어떻게 확인할지 정하고, 안내받은 추적 평가를 유지합니다.", claimIds: ["KST-P3-004"], sourceIds: ["SRC-EAU-UROLITHIASIS", "SRC-NIDDK-STONE-SYMPTOMS"] },
    { question: "물을 한꺼번에 많이 마셔서 밀어내도 되나요?", answer: "물을 강제로 마시며 막힘·감염 가능성이 있는 증상을 견디지 않습니다. 수분은 개인 건강 상태와 기존 제한에 맞춰 상담합니다. 소변이 나오지 않거나 구토가 계속되면 즉시 의료 도움을 받으세요.", claimIds: ["KST-P3-004", "KST-P3-005"], sourceIds: ["SRC-NIDDK-STONE-TREATMENT", "SRC-NIDDK-STONE-SYMPTOMS", "SRC-EAU-UROLITHIASIS"] },
    { question: "칼슘이 들어 있는 음식은 모두 끊어야 하나요?", answer: "아닙니다. 음식 속 적정량의 칼슘은 일부 결석 예방에 도움이 될 수 있습니다. 결석 종류와 평소 식사를 확인해 조정하며, 일괄 제한이나 보충제 자가 시작을 하지 않습니다.", claimIds: ["KST-P3-004"], sourceIds: ["SRC-NIDDK-STONE-DIET", "SRC-KDCA-KIDNEY-STONES"] },
    { question: "열과 통증이 함께 있어야 급한가요?", answer: "둘 다 있어야 하는 조건이 아닙니다. 심한 통증, 발열·오한, 소변이 나오지 않거나 매우 적은 변화, 반복 구토는 각각 즉시 평가받을 신호입니다. 혼돈·어눌한 말이나 매우 빠르거나 어려운 호흡이 생기면 즉시 119에 연락하세요.", claimIds: ["KST-P3-005"], sourceIds: ["SRC-NIDDK-STONE-SYMPTOMS", "SRC-NHS-KIDNEY-STONES", "SRC-NHS-SEPSIS"] },
    { question: "검사에서 결석이 보이면 모두 제거해야 하나요?", answer: "위치·크기뿐 아니라 막힘·감염·통증·콩팥 기능을 함께 보고 계획을 정합니다. 관찰을 택해도 재평가 방법을 확인해야 하며, 특정 크기나 통증이 없는 것만으로 혼자 치료 필요성을 판단하지 않습니다.", claimIds: ["KST-P3-003", "KST-P3-004"], sourceIds: ["SRC-EAU-UROLITHIASIS", "SRC-NIDDK-STONE-TREATMENT"] },
  ],
  sourceIds: kidneyStonesSources.map(s=>s.id), imageIds: ["kidney-stones-hero", "kidney-stones-concept", "kidney-stones-action"],
  visuals: {
    "kidney-stones-hero": { src: "/images/onurim/kidney-stones/hero.webp", alt: "진료 메모와 상담 준비를 상징하는 파랑·주황 장식 표지 삽화", caption: "표지의 선과 십자 모양은 콩팥 검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "kidney-stones-concept": { src: "/images/onurim/kidney-stones/concept-v2.webp", alt: "두 콩팥에서 각각의 요관이 방광으로 이어지고 요도가 아래로 나오는 구조와 결석 위치 예시를 보여주는 삽화", caption: "소변길과 서로 다른 결석 위치 예시를 단순화한 AI 생성 삽화입니다. 원 안은 표시한 요관 결석의 부분 확대이며 추가 결석이 아닙니다. 실제 기관 비율·결석 크기나 개수·막힌 정도를 판정하거나 같은 돌의 이동 단계·자연 배출을 보장하는 그림이 아닙니다.", width: 1536, height: 1024 },
    "kidney-stones-action": { src: "/images/onurim/kidney-stones/action-v2.webp", alt: "위치와 크기, 막힘과 감염, 배출 확인, 성분과 예방을 묻는 빈 검사 후 질문 양식 삽화", caption: "진료 설명을 확인하기 위한 빈 양식의 AI 생성 삽화입니다. 실제 검사 결과나 치료 순서·일정표가 아니며, 급한 변화가 있으면 작성보다 의료 도움 요청이 먼저입니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["kidney-stones-visit-card"],
};
