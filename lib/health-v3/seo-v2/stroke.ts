import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const strokeSources: HealthSource[] = [
  { id: "SRC-KDCA-STROKE-PUBLIC", organization: "질병관리청 국가건강정보포털", title: "뇌졸중", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5495", sourceDate: "2026-04-29 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-STROKE-119", organization: "질병관리청", title: "뇌졸중 조기증상 의심되면 즉시 119", url: "https://www.kdca.go.kr/kdca/2855/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa2RjYSUyRjQ3JTJGMjE4NzQ4JTJGYXJ0Y2xWaWV3LmRvJTNG", sourceDate: "2025-12-16 (작성·최종수정)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-TIA", organization: "질병관리청 국가건강정보포털", title: "일과성 허혈 발작", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=2607", sourceDate: "2026-07-30 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-STROKE-DIAGNOSIS", organization: "NIH/NHLBI", title: "Stroke Diagnosis", url: "https://www.nhlbi.nih.gov/health/stroke/diagnosis", sourceDate: "2023-05-26 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-STROKE-TREATMENT", organization: "NIH/NHLBI", title: "Stroke Treatment", url: "https://www.nhlbi.nih.gov/health/stroke/treatment", sourceDate: "2023-05-26 (Last updated; 개인별 치료시간 기준으로 사용하지 않음)", retrievedAt: checkedAt },
  { id: "SRC-STROKE-FOUNDATION-WAITING", organization: "Stroke Foundation Australia", title: "What to do while you wait for an ambulance", url: "https://strokefoundation.org.au/About-Stroke/Learn/signs-of-stroke/What-to-do-while-you-wait-for-an-ambulance", sourceDate: "페이지 작성·수정일 미표시 (copyright와 구분)", retrievedAt: checkedAt },
  { id: "SRC-WISCONSIN-STROKE-TIMES", organization: "Wisconsin Department of Health Services", title: "The Importance of an Accurate Last Known Well and Symptom Onset Time", url: "https://www.dhs.wisconsin.gov/publications/p02469.pdf", sourceDate: "2023-12 (문서 P-02469 판본; 두 시각 정의만 사용)", retrievedAt: checkedAt },
];

export const strokeArticle: HealthArticle = {
  slug: "stroke", seoTitle: "뇌졸중 증상: 갑작스러운 신호 하나라도 119, 전달할 두 시각",
  title: "뇌졸중 신호가 갑자기 나타나면 즉시 119",
  eyebrow: "뇌·마음 · 신호 하나에도 신고 먼저",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "한쪽 힘·감각, 말·시야·균형 변화, 어지럼이나 심한 두통이 갑자기 나타나면 즉시 119에 연락합니다. 잠깐 호전돼도 기다리지 않는 이유와 신고 후 전달할 두 시각, 음식·약을 주지 않을 원칙을 설명합니다.",
  outcome: "갑작스러운 위험 신호에 병명을 확정하려 기다리지 않고 119를 요청하며, 마지막 평소 상태와 증상 발견 시각을 아는 범위에서 구분해 전합니다.",
  archetype: "BODY_SIGNAL",
  summary: [
    "갑작스러운 한쪽 힘·감각 저하, 말·이해의 어려움, 시야·균형 변화, 어지럼, 원인을 알 수 없는 심한 두통 중 하나라도 있으면 즉시 119에 연락합니다. 여러 신호가 모일 때까지 기다리지 않습니다.",
    "신호가 사라졌어도 안전해졌다는 뜻은 아닙니다. 일과성 허혈 발작일 수도 있으므로 스스로 구분하거나 다음 외래 날짜를 기다리지 않습니다.",
    "먼저 신고한 뒤 ‘마지막으로 평소와 같았던 때’와 ‘증상을 처음 발견한 때’를 따로 전합니다. 모르는 시각을 추측하거나 기록을 완성하느라 신고를 늦추지 않습니다.",
  ],
  sections: [
    { title: "여러 증상이 함께 나타나야 하는 것은 아닙니다", paragraphs: [
      "아래 변화 중 하나라도 갑자기 나타나면 즉시 119에 연락하세요. 뇌졸중인지 확신이 없거나 증상이 잠깐 좋아져도 기다리지 않습니다. 본인이 직접 운전하거나 가족이 올 때까지 기다리지 말고 구급 도움을 요청합니다.",
    ], bullets: [
      "한쪽 얼굴·팔·다리의 힘이 갑자기 빠지거나 감각이 둔해짐",
      "말이 갑자기 어눌해지거나 다른 사람의 말을 이해하기 어려움",
      "한쪽 또는 양쪽 눈이 갑자기 잘 보이지 않거나 시야가 달라짐",
      "갑자기 걷기 어렵거나, 어지럽거나, 균형 또는 몸의 조절을 잃음",
      "뚜렷한 원인을 알 수 없는 심한 두통이 갑자기 생김",
    ], tone: "warning", claimIds: ["STR-P3-002", "STR-P3-005"], sourceIds: ["SRC-KDCA-STROKE-PUBLIC", "SRC-KDCA-STROKE-119", "SRC-CDC-STROKE-SIGNS"], imageId: "stroke-concept",
      links: [{ href: "/health/guides/danger-signals", label: "119 도움을 먼저 요청할 다른 위험 신호" }] },
    { title: "FAST는 신호를 기억하는 법이지 진단법이 아닙니다", paragraphs: [
      "얼굴·팔·말을 떠올리는 FAST는 신호를 기억하는 방법이지, 세 가지를 모두 통과해야 신고하는 검사가 아닙니다. 시야나 균형 변화, 어지럼, 갑작스러운 심한 두통도 놓치지 마세요. 말을 시키거나 걷게 하는 시험을 끝내느라 연락을 늦출 필요가 없습니다. 기존에 불편이 있었다면 평소와 달라진 점을 그대로 전합니다.",
      "뇌졸중은 뇌혈관 문제로 뇌 일부가 손상되면서 갑작스러운 신경학적 변화가 생기는 질환입니다. 혈관이 막혀 혈액 공급이 부족해지는 허혈성 뇌졸중과, 혈관이 터져 출혈이 생기는 출혈성 뇌졸중이 있습니다. 뇌경색과 뇌출혈이라는 말을 각각의 설명에서 듣게 됩니다.",
      "두 종류는 필요한 치료가 다를 수 있지만 집에서 증상만 보고 구분하지 않습니다. 뇌졸중은 모두 혈전 때문이라고 생각해 약을 먼저 먹이는 행동도 피합니다. 어떤 혈관·뇌 부위가 영향을 받았는지, 출혈이 있는지는 의료진의 진찰과 검사로 확인합니다.",
    ], claimIds: ["STR-P3-001", "STR-P3-002", "STR-P3-003", "STR-P3-004", "STR-P3-005"], sourceIds: ["SRC-KDCA-STROKE-PUBLIC", "SRC-CDC-STROKE-SIGNS", "SRC-NHLBI-STROKE-DIAGNOSIS", "SRC-NHLBI-STROKE-TREATMENT", "SRC-STROKE-FOUNDATION-WAITING"], imageId: null },
    { title: "‘지금은 괜찮다’는 말만으로 끝내지 마세요", paragraphs: [
      "일과성 허혈 발작(TIA)은 뇌에 가는 혈액 공급이 일시적으로 줄면서 뇌졸중과 비슷한 신호가 생겼다가 사라지는 상태입니다. 이후 뇌졸중 위험을 알리는 중요한 경고일 수 있습니다. ‘짧게 끝났으니 가벼운 일’이라고 판단하지 않습니다.",
      "증상이 사라진 모습만으로 TIA인지 뇌졸중인지, 다른 원인인지를 스스로 구분할 수는 없습니다. 갑작스러운 위 신호가 있었다면 호전되었어도 즉시 119에 연락하고, 어떤 변화가 있었고 언제 좋아졌는지 알립니다. 다시 나타나는지 관찰하거나 다음 날까지 쉬어 보는 선택을 하지 않습니다.",
      "119나 의료진에게는 지금 보이는 모습뿐 아니라 처음 있었던 변화도 전달하세요. ‘아까 말이 잘 나오지 않았지만 지금은 대답한다’처럼 관찰한 사실을 말하면 됩니다. 이것은 전달 방식을 보여주는 가상 편집 예시이지 실제 환자의 기록이나 안전 판정 사례가 아닙니다.",
    ], claimIds: ["STR-P3-003", "STR-P3-004", "STR-P3-005"], sourceIds: ["SRC-KDCA-TIA", "SRC-CDC-STROKE-SIGNS", "SRC-NHLBI-STROKE-DIAGNOSIS"], imageId: null },
    { title: "119 신고 후, 서로 다른 두 시각을 전하세요", paragraphs: [
      "먼저 119에 연락한 뒤 질문에 따라 아는 내용을 전합니다. ‘증상이 시작된 시각’이라는 질문이 어렵다면 마지막으로 평소와 같았던 때와 처음 증상을 발견한 때를 나눠 설명하세요. 평소 상태란 이전부터 있던 장애·불편이 전혀 없다는 뜻이 아니라, 이번에 생긴 변화가 없었던 자신의 평소 모습입니다.",
      "잠에서 깨며 증상을 발견했다면 깬 시각이 실제 발병 시각이라고 단정하지 않습니다. 잠들기 전 언제 평소와 같았는지, 깨어서 언제 이상을 알았는지를 아는 범위에서 말합니다. 시작을 직접 목격했다면 두 시각이 같을 수도 있으므로 서로 달라야 한다고 억지로 채우지 않습니다.",
      "날짜를 넘긴 일이라면 날짜도 함께 전합니다. 정확하지 않으면 ‘대략’ 또는 ‘모름’이라고 말하고, 연락이 닿지 않는 사람을 찾거나 기억을 맞추느라 신고를 미루지 않습니다. 아래 빈칸은 응급 연락에 필요한 사실을 이해하는 예시이며 작성·제출해야 도움을 받는 양식이 아닙니다.",
    ], table: { caption: "두 시각은 다른 질문입니다 — 119 신고 후 아는 범위에서 전달", columns: ["구분", "무엇을 말하나요?"], rows: [
      ["마지막으로 평소 상태였던 때", "이번 변화 없이 평소와 같았음을 마지막으로 확인한 날짜·시각"],
      ["증상을 처음 발견한 때", "본인이나 다른 사람이 처음 이상을 알아챈 날짜·시각; 실제 시작 시각과 다를 수 있음"],
    ] }, claimIds: ["STR-P3-003", "STR-P3-004"], sourceIds: ["SRC-WISCONSIN-STROKE-TIMES", "SRC-STROKE-FOUNDATION-WAITING", "SRC-CDC-STROKE-SIGNS"], imageId: "stroke-action",
      links: [{ href: "/health/tools/stroke-visit-card", label: "신고 후 전달 내용과 후속 질문을 확인할 뇌졸중 카드" }] },
    { title: "기다리는 동안 음식·물·약을 주어 해결하려 하지 않습니다", paragraphs: [
      "뇌졸중이 의심되어 구급 도움을 기다리는 동안 음식이나 마실 것을 주지 않습니다. 아스피린을 포함한 약도 임의로 먹이지 말고 119와 의료진의 지시를 따르세요. 출혈성 뇌졸중이라면 아스피린이 출혈을 더 심하게 할 수 있어, 모든 뇌졸중에 같은 약을 먼저 쓰는 방식은 안전하지 않습니다.",
      "평소 혈압약을 더 먹이거나 물을 삼킬 수 있는지 시험하며 해결하려 하지 않습니다. 이것은 의심되는 급한 상황에서의 주의이며, 평소 처방약을 장기적으로 끊으라는 뜻이 아닙니다. 현재 복용 약과 알고 있는 병력은 질문받으면 전하되 약 봉투를 찾느라 신고나 구급 대응을 늦추지 않습니다.",
      "의식이나 호흡이 달라지면 즉시 119에 알리고 전화 안내를 따릅니다. 구급대가 올 때까지 어떤 자세·행동이 필요한지는 상황에 맞는 안내를 받으세요. 이 글은 맥박 확인이나 심폐소생술의 세부 동작을 혼자 판단하게 하는 매뉴얼이 아닙니다.",
    ], claimIds: ["STR-P3-004", "STR-P3-005"], sourceIds: ["SRC-STROKE-FOUNDATION-WAITING", "SRC-KDCA-STROKE-PUBLIC", "SRC-NHLBI-STROKE-TREATMENT"], imageId: null,
      links: [{ href: "/health/guides/medication-list", label: "평소에 준비해 두는 복용약 목록" }] },
    { title: "응급실 검사는 종류·원인·치료 방법을 확인합니다", paragraphs: [
      "의료진은 전달받은 시각과 증상, 이전 병력, 진찰과 검사를 함께 봅니다. 뇌졸중의 종류와 영향을 받은 부위, 출혈 여부, 비슷한 증상을 만드는 다른 원인을 살핍니다. 말·시야·힘·감각·균형을 확인하는 진찰과 영상검사는 서로 다른 정보를 보탭니다.",
      "CT는 빠르게 뇌의 출혈이나 손상 등을 확인하는 데 쓰이고, MRI는 뇌 조직의 변화를 더 살피는 데 쓰일 수 있습니다. 혈액검사와 심전도 등으로 혈당·혈액 응고나 관련 심장 문제를 확인하기도 합니다. 모두가 같은 검사를 같은 순서로 받는 것은 아니며 검사 하나만으로 가족이 결론을 내릴 수 없습니다.",
      "치료는 막힘·출혈 여부, 시각 정보와 영상, 다른 건강 상황에 따라 의료진이 정합니다. 시간이 얼마나 지났는지 모른다거나 이미 늦은 것 같다는 이유로 도움을 포기하지 마세요. 이 글은 특정 치료를 받을 수 있는 시간표나 자가 약물 선택 기준을 제공하지 않습니다.",
      "급한 평가와 치료 뒤에는 어떤 종류였는지, 다시 나타나면 즉시 신고할 변화, 약과 추적 진료·재활 계획을 확인합니다. 혈압 등 평소 관리도 의료진과 이어갈 문제이지 급한 신호를 집에서 낮은 위험으로 분류하는 근거는 아닙니다.",
    ], table: { caption: "검사 설명을 들을 때 구분할 역할 — 개인별 검사 순서가 아닙니다", columns: ["확인 영역", "도움이 되는 정보"], rows: [
      ["진찰·시각·병력", "어떤 변화가 언제 관찰됐는지, 평소 상태와 어떻게 다른지"],
      ["뇌 영상검사", "출혈 여부와 뇌 조직·혈관의 변화 등"],
      ["혈액검사·심전도 등", "비슷한 증상의 다른 원인과 치료 판단에 필요한 건강 정보"],
    ] }, claimIds: ["STR-P3-003", "STR-P3-004"], sourceIds: ["SRC-NHLBI-STROKE-DIAGNOSIS", "SRC-NHLBI-STROKE-TREATMENT", "SRC-KDCA-STROKE-PUBLIC", "SRC-KDCA-TIA"], imageId: null,
      links: [{ href: "/health/guides/appointment-questions", label: "치료 뒤 다음 행동을 확인하는 진료 질문" }, { href: "/health/hypertension", label: "응급 대응과 구분해 이어가는 평소 혈압 관리" }] },
  ],
  faq: [
    { question: "얼굴·팔·말이 모두 이상해야 119를 부르나요?", answer: "아닙니다. 한쪽 힘·감각 저하, 말·이해·시야·균형 변화, 어지럼, 원인을 알 수 없는 심한 두통 중 하나라도 갑자기 나타나면 즉시 119에 연락합니다. 모두 나타나거나 자가 확인을 끝낼 때까지 기다리지 않습니다.", claimIds: ["STR-P3-002", "STR-P3-005"], sourceIds: ["SRC-KDCA-STROKE-PUBLIC", "SRC-KDCA-STROKE-119", "SRC-CDC-STROKE-SIGNS"] },
    { question: "잠깐 말이 어눌했다가 좋아졌는데 쉬어도 되나요?", answer: "증상이 사라졌어도 즉시 119에 연락합니다. 일과성 허혈 발작 같은 경고일 수 있으며, 좋아진 모습만으로 원인이나 안전을 집에서 판단할 수 없습니다. 처음 변화와 호전된 시각도 전합니다.", claimIds: ["STR-P3-004", "STR-P3-005"], sourceIds: ["SRC-KDCA-TIA", "SRC-CDC-STROKE-SIGNS"] },
    { question: "자다가 깨어 발견했다면 깬 때가 시작 시각인가요?", answer: "그렇게 단정하지 않습니다. 마지막으로 평소와 같았음을 확인한 때와 증상을 처음 발견한 때를 나눠 전하세요. 모르는 시각은 모른다고 말하고, 시간을 알아내느라 119 신고를 늦추지 않습니다.", claimIds: ["STR-P3-003", "STR-P3-004"], sourceIds: ["SRC-WISCONSIN-STROKE-TIMES", "SRC-STROKE-FOUNDATION-WAITING", "SRC-CDC-STROKE-SIGNS"] },
    { question: "아스피린이나 혈압약을 먼저 먹이면 도움이 되나요?", answer: "뇌졸중 의심 상황에서는 약을 임의로 먹이거나 평소 혈압약을 더 주지 말고 119·의료진의 지시를 따릅니다. 출혈성 뇌졸중도 있어 아스피린을 모두에게 먼저 주면 안 됩니다. 음식·물도 주지 않으며, 평소 처방을 장기 중단하라는 뜻은 아닙니다.", claimIds: ["STR-P3-004"], sourceIds: ["SRC-STROKE-FOUNDATION-WAITING", "SRC-NHLBI-STROKE-TREATMENT"] },
    { question: "시간이 많이 지났거나 시작을 모르면 치료를 못 받나요?", answer: "스스로 치료 가능 여부를 정해 도움을 포기하지 않습니다. 즉시 119에 연락하고 아는 시각·증상을 전하세요. 의료진이 영상과 건강 상황까지 함께 보고 치료를 판단합니다. 특정 시간을 모든 사람의 치료 마감선으로 정하지 않습니다.", claimIds: ["STR-P3-003", "STR-P3-005"], sourceIds: ["SRC-NHLBI-STROKE-TREATMENT", "SRC-NHLBI-STROKE-DIAGNOSIS", "SRC-CDC-STROKE-SIGNS"] },
    { question: "뇌 CT와 MRI를 모두 받아야 하나요?", answer: "항상 같은 검사 묶음이 필요한 것은 아닙니다. 의료진은 출혈·조직 변화와 증상·병력을 함께 살피며 필요한 검사를 정합니다. CT나 MRI 한 장을 가족이 직접 해석해 뇌졸중을 배제하거나 종류를 확정하지 않습니다.", claimIds: ["STR-P3-003"], sourceIds: ["SRC-NHLBI-STROKE-DIAGNOSIS", "SRC-KDCA-STROKE-PUBLIC"] },
  ],
  sourceIds: [...strokeSources.map(s=>s.id), "SRC-CDC-STROKE-SIGNS"],
  imageIds: ["stroke-hero", "stroke-concept", "stroke-action"],
  visuals: {
    "stroke-hero": { src: "/images/onurim/stroke/hero.webp", alt: "메모판과 도움 연결을 상징하는 초록·노랑 장식 표지 삽화", caption: "표지 도형은 뇌 검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "stroke-concept": { src: "/images/onurim/stroke/concept-v2.webp", alt: "한쪽 힘·감각, 말·이해, 시야, 균형, 심한 두통의 변화를 각각 다른 가상 인물로 표현한 다섯 장면", caption: "AI 생성 교육 삽화입니다. 이 변화 중 하나라도 갑자기 나타나면 즉시 119에 연락합니다. 다섯 가지가 모두 필요한 조건·발생 순서·자가 검사법은 아닙니다. 신체 부위·시야 모양은 예시이며 표정·자세로 진단하지 않습니다. 컵은 배경 소품으로, 물·음식을 주거나 쉬며 기다리라는 뜻이 아닙니다.", width: 1536, height: 1024 },
    "stroke-action": { src: "/images/onurim/stroke/action-v2.webp", alt: "119 전화와 마지막 평소 상태·증상을 발견한 때의 빈 날짜와 시각 칸 두 개", caption: "119 신고 후 아는 사실을 전하기 위한 AI 생성 예시입니다. 두 시각은 같을 수도 다를 수도 있고, 모르는 내용은 모른다고 말합니다. 빈 시계에는 지정 시각·치료 마감선이 없으며 기록을 완성해야 도움을 받는 양식이 아닙니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["stroke-visit-card"],
};
