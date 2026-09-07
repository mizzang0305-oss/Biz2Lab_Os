import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const anxietySources: HealthSource[] = [
  { id: "SRC-NIMH-ANXIETY", organization: "NIH/NIMH", title: "Anxiety Disorders", url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders", sourceDate: "2024-12 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIMH-GAD", organization: "NIH/NIMH", title: "Generalized Anxiety Disorder: What You Need to Know", url: "https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad", sourceDate: "2025 (Revised)", retrievedAt: checkedAt },
  { id: "SRC-MOHW-109-ANX", organization: "보건복지부", title: "자살예방 정책 추진", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "페이지 작성·수정일 미표시 (정책 시행일과 구분)", retrievedAt: checkedAt },
  { id: "SRC-SNUH-ANXIETY", organization: "서울대학교병원", title: "불안장애 [anxiety disorder]", url: "https://www.snuh.org/health/nMedInfo/nView.do?medid=AA000615", sourceDate: "페이지 작성·수정일 미표시", retrievedAt: checkedAt },
  { id: "SRC-NIMH-PANIC", organization: "NIH/NIMH", title: "Panic Disorder: What You Need to Know", url: "https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms", sourceDate: "2025 (Revised)", retrievedAt: checkedAt },
  { id: "SRC-NIMH-MENTAL-MEDICATIONS", organization: "NIH/NIMH", title: "Mental Health Medications", url: "https://www.nimh.nih.gov/health/topics/mental-health-medications", sourceDate: "2023-12 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NHS-CHEST-PAIN", organization: "NHS", title: "Chest pain", url: "https://www.nhs.uk/symptoms/chest-pain/", sourceDate: "2023-08-08 (Page last reviewed; 다음 검토 예정일과 구분)", retrievedAt: checkedAt },
];

export const anxietyArticle: HealthArticle = {
  slug: "anxiety-disorder", seoTitle: "불안장애: 걱정·공황의 차이와 진료에 전할 기록",
  title: "불안장애, 같은 불안으로 묶지 않고 살펴보기",
  eyebrow: "뇌·마음 · 불안의 이름보다 경험과 생활 영향",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "이어지는 걱정과 공황발작·공황장애를 구분하고, 불안 탓으로 넘기지 말아야 할 흉통·호흡 변화를 안내합니다. 진료 기록 네 가지와 약·가족 도움의 경계를 살펴봅니다.",
  outcome: "경험을 병명으로 단정하지 않고 상담에 전할 수 있으며, 불안과 닮은 몸의 위험 신호에는 기록보다 도움을 먼저 요청합니다.",
  archetype: "MYTH_FIRST",
  summary: [
    "불안장애는 한 가지 병이나 성격을 뜻하지 않습니다. 이어지는 걱정, 갑작스러운 두려움, 특정 상황의 불안 등 양상이 다르며 생활에 미치는 영향과 다른 원인을 함께 평가합니다.",
    "한 번의 공황발작이 곧 공황장애라는 뜻은 아닙니다. 과거 공황 경험이 있어도 새 흉통이나 심한 호흡곤란을 불안 때문이라고 확정하지 않습니다.",
    "불안으로 생활이 어려워지면 진단 기간이나 자가검사 점수를 채우기 전에 상담할 수 있습니다. 급한 위험이 없다면 언제·몸의 변화·피한 일·생활 영향을 아는 범위에서 전해 보세요.",
  ],
  sections: [
    { title: "‘전에 공황이었으니 이번에도 괜찮다’고 넘기지 마세요", paragraphs: [
      "갑자기 시작해 가라앉지 않는 가슴 통증·불편, 팔·목·턱·등 등으로 퍼지는 통증, 흉통에 식은땀·메스꺼움·어지러움·숨참이 동반되는 경우에는 즉시 119에 연락합니다. 이 조건들이 모두 나타나야 하는 것은 아닙니다. 불안약이나 휴식의 효과를 기다리며 응급 도움을 늦추지 않습니다.",
      "숨이 매우 차서 말을 내기 어렵거나 헐떡이는 경우, 입술·피부색이 창백하거나 푸르스름하게 변하는 경우, 갑자기 혼란스러워지는 경우도 즉시 119 도움을 요청합니다. 직접 운전하지 않습니다. 과거 공황 진단이나 비슷했던 기억이 지금의 심장·호흡 문제를 배제하지 않습니다.",
      "새로 숨쉬기 어렵거나 평소보다 숨이 더 차면 위의 119 기준에 해당하지 않더라도 의료진에게 신속히 연락해 평가를 받으세요. 흉통이 반복되거나 금방 사라져도 걱정된다면 의료진에게 원인을 확인합니다. 증상이 잠시 가라앉았다는 이유로 스스로 불안 때문이라고 결론 내리지 않습니다. 이 글로 신체 질환과 공황을 감별할 수는 없습니다.",
      "자신을 해칠 위험이 임박했거나 이미 다쳤거나 현재 안전을 지키기 어렵다면 즉시 119에 연락합니다. 자살 생각으로 힘들 때는 24시간 상담전화 109에도 지금 도움을 요청할 수 있지만, 상담 응답을 기다리느라 긴급구조를 늦추지 않습니다.",
    ], tone: "warning", claimIds: ["ANX-P3-004", "ANX-P3-005"], sourceIds: ["SRC-NHS-CHEST-PAIN", "SRC-NHS-BREATHLESSNESS", "SRC-NIMH-PANIC", "SRC-MOHW-109-SERVICE", "SRC-NIMH-SUICIDE-FAQ", "SRC-EASYLAW-EMERGENCY-NUMBERS"], imageId: null,
      links: [{ href: "/health/guides/danger-signals", label: "기록보다 도움 요청이 먼저인 위험 신호" }, { href: "/health/acute-myocardial-infarction", label: "불안으로 단정하지 말아야 할 심근경색 의심 증상" }] },
    { title: "불안을 느낀다는 말 안에도 서로 다른 경험이 있습니다", paragraphs: [
      "중요한 일을 앞두고 긴장하거나 상황 때문에 걱정하는 일은 누구에게나 있습니다. 불안장애는 이런 경험을 모두 병으로 이름 붙이는 것이 아닙니다. 불안·두려움이 쉽게 사라지지 않거나 지나치게 커지고, 일·공부·관계·이동 같은 생활을 방해하는지 살핍니다.",
      "불안장애는 여러 질환을 묶는 말입니다. 범불안장애에서는 일상의 여러 일에 대한 걱정이 넓게 이어지고 조절하기 어려울 수 있습니다. 다른 사람의 평가가 두렵거나 특정 대상·상황에서 불안이 두드러지는 경우 등도 있어 모두 범불안장애로 설명하지 않습니다.",
      "걱정만이 아니라 근육 긴장·잠의 어려움·집중 저하·몸의 두근거림 등을 경험할 수 있습니다. 그림과 아래 예시는 진료에서 경험을 표현하는 데 도움을 주려는 것으로, 모든 종류를 나열한 분류표나 서로 배타적인 진단 칸이 아닙니다. 한 사람에게 여러 경험이 함께 있을 수도 있습니다.",
    ], claimIds: ["ANX-P3-001", "ANX-P3-002", "ANX-P3-003"], sourceIds: ["SRC-SNUH-ANXIETY", "SRC-NIMH-ANXIETY", "SRC-NIMH-GAD", "SRC-NIMH-PANIC"], imageId: "anxiety-disorder-concept" },
    { title: "공황발작은 경험을, 공황장애는 평가가 필요한 질환을 가리킵니다", paragraphs: [
      "공황발작은 강한 두려움이나 불편이 갑자기 몰려오는 경험입니다. 심장이 빨리 뛰거나 떨림·숨참·가슴 불편 같은 몸의 변화가 함께 나타날 수 있습니다. 실제로 매우 두렵게 느껴지므로 ‘아무 일도 아닌데 유난’이라고 평가하지 않습니다.",
      "한 번 또는 가끔 발작을 경험했다고 바로 공황장애가 되는 것은 아닙니다. 의료진은 예상하지 못한 발작이 반복되는지, 다음 발작에 대한 걱정과 피하는 행동이 이어지는지, 생활이 얼마나 달라졌는지를 함께 확인합니다. 발작의 횟수나 온라인 체크 수만으로 확정하지 않습니다.",
      "‘공황발작 자체는 생명을 위협하지 않는다’는 설명은 지금의 흉통·숨참이 공황임을 보장하지 않습니다. 몸의 위험 신호가 있으면 위의 긴급 도움 안내를 먼저 따르고, 평가 뒤에는 자신에게 설명받은 대응 방법을 확인합니다.",
    ], table: { caption: "진료에 전할 말의 차이 — 병명을 고르는 진단표가 아닙니다", columns: ["말하는 경험", "함께 전할 내용"], rows: [
      ["여러 걱정이 계속 이어짐", "무엇이 걱정되고 조절하기 어려운지, 잠·집중·생활이 어떻게 달라졌는지"],
      ["갑자기 두려움이 몰려온 경험", "예상했는지, 그때 몸의 변화와 반복 여부, 이후 피한 일이 있는지"],
      ["특정 상황이 두려움", "어떤 상황인지, 피하게 된 활동과 생활의 불편은 무엇인지"],
    ] }, claimIds: ["ANX-P3-001", "ANX-P3-002", "ANX-P3-003", "ANX-P3-004"], sourceIds: ["SRC-NIMH-PANIC", "SRC-NIMH-GAD", "SRC-SNUH-ANXIETY", "SRC-NHS-CHEST-PAIN"], imageId: null },
    { title: "6개월을 기다리거나 자가검사 점수를 채울 필요는 없습니다", paragraphs: [
      "범불안장애의 진단 설명에는 걱정이 이어진 기간 같은 기준이 나옵니다. 6개월이라는 말은 모든 불안장애의 공통 기준도, 그때까지 진료를 미루라는 뜻도 아닙니다. 불안 때문에 잠·업무·관계·외출 등 일상이 어려워졌다면 기간이 짧아도 전문 도움을 요청하세요.",
      "의료진은 증상의 시작과 경과, 생활 영향, 신체 질환이나 약·물질의 영향을 함께 확인합니다. 필요에 따라 진찰과 검사를 정하므로 모든 사람이 MRI나 같은 검사 묶음을 받아야 하는 것은 아닙니다. 신체검사 결과가 정상이었다는 사실만으로 불안장애가 자동 확정되는 것도 아닙니다.",
      "우울감이나 술·다른 물질 사용이 함께 있다면 숨기지 말고 알립니다. 평가의 목적은 자신의 성격을 판정받는 것이 아니라 어떤 도움이 필요한지 찾는 것입니다. 자가 설문 점수는 진료 대화의 자료일 수 있어도 병명이나 안전을 스스로 확정하는 도구로 쓰지 않습니다.",
    ], claimIds: ["ANX-P3-003", "ANX-P3-004"], sourceIds: ["SRC-NIMH-GAD", "SRC-NIMH-PANIC", "SRC-SNUH-ANXIETY"], imageId: null,
      links: [{ href: "/health/depression", label: "함께 느끼는 우울감과 달라진 일상 이야기" }] },
    { title: "진료에서는 ‘언제·몸·피한 일·생활’을 자신의 말로 전하세요", paragraphs: [
      "급한 위험이 없는 상황에서, 기억나는 경험 한 가지부터 정리해 보세요. 네 칸을 전부 채우거나 정확한 수치를 만들 필요는 없습니다. 모르는 내용은 모른다고 전하고, 기록이 없다는 이유로 상담을 미루지 않습니다. 이 사이트에 개인 증상이나 병력을 제출할 필요도 없습니다.",
      "예를 들어 ‘회의를 앞두고 걱정이 이어졌다’, ‘그때 두근거림을 느꼈다’, ‘이후 회의를 피했다’, ‘잠들기가 어려워졌다’는 기록은 서로 다른 질문에 답합니다. 이것은 작성 방식을 설명하는 가상 편집 예시이며, 이 조합이 특정 질환이거나 회의가 원인이라는 뜻은 아닙니다.",
      "현재 약·보충제, 카페인·술 사용이나 최근 변화, 이전에 받은 진료 설명도 아는 범위에서 전할 수 있습니다. 약 이름과 실제 복용 방식은 처방전·약 봉투로 확인하면 설명에 도움이 됩니다. 맥박을 반복 확인하거나 일부러 두려운 상황을 만들어 기록하라는 안내가 아닙니다.",
    ], bullets: [
      "언제: 무엇을 하던 중이었고, 예상한 걱정이었는지 갑자기 느꼈는지",
      "몸: 그때 실제로 느낀 변화와 이전에 비슷한 경험이 있었는지",
      "피한 일: 불안 때문에 하지 못하거나 피하게 된 활동이 있는지",
      "생활: 수면·일·공부·관계에 어떤 불편이 생겼는지",
    ], claimIds: ["ANX-P3-002", "ANX-P3-003"], sourceIds: ["SRC-NIMH-GAD", "SRC-NIMH-PANIC", "SRC-SNUH-ANXIETY", "SRC-NIMH-MENTAL-MEDICATIONS"], imageId: "anxiety-disorder-action",
      links: [{ href: "/health/tools/anxiety-disorder-visit-card", label: "경험과 질문을 정리하는 불안장애 진료 카드" }, { href: "/health/guides/medication-list", label: "복용 방식까지 함께 확인할 약 목록" }] },
    { title: "불안에 쓰는 약이 모두 필요할 때만 먹는 약은 아닙니다", paragraphs: [
      "치료에는 인지행동치료 같은 전문 심리치료, 약물치료 또는 그 조합 등이 쓰입니다. 불안의 종류와 건강 상황·선호에 맞춰 상의합니다. 생각·감정·행동의 관계를 다루는 치료와 주변의 격려는 역할이 다르며, 가족이 직접 치료자가 될 필요는 없습니다.",
      "불안 치료에 쓰는 약은 효과가 나타나는 방식과 복용 일정이 서로 다릅니다. 모두 즉시 효과가 나거나 모두 필요할 때만 먹는다고 일반화하지 않습니다. ‘불안이 없으니 오늘부터 끊자’거나 ‘효과가 더디니 더 먹자’고 스스로 바꾸지 말고 처방 의료진에게 역할·사용법·불편할 때의 연락 방법을 확인하세요.",
      "다른 사람의 약을 먹거나 자신의 약을 나누지 않습니다. 처방약·보충제를 함께 알리고 약으로 더 불편해지거나 해가 걱정되면 바로 의료진에게 문의합니다. 자살 생각이 생기거나 심해지는 등 안전 우려에는 약효를 기다리지 말고 즉시 도움을 받습니다. 이 글은 약 이름별 선택·용량·중단법을 제시하지 않습니다.",
    ], claimIds: ["ANX-P3-004", "ANX-P3-005"], sourceIds: ["SRC-NIMH-MENTAL-MEDICATIONS", "SRC-NIMH-GAD", "SRC-NIMH-PANIC", "SRC-NIMH-SUICIDE-FAQ", "SRC-MOHW-109-SERVICE"], imageId: null,
      links: [{ href: "/health/guides/appointment-questions", label: "치료의 역할과 다음 연락을 확인할 진료 질문" }] },
    { title: "도움은 불안을 시험하는 일이 아닙니다", paragraphs: [
      "주변 사람은 ‘겁낼 일이 아니다’라고 논박하거나 피하는 상황에 갑자기 밀어 넣기보다, 무엇이 어렵고 어떤 도움이 필요한지 물어보세요. 노출치료라는 말을 들었더라도 가족이 강제로 두려운 상황을 만들거나 신체 증상을 유발하는 훈련을 시키는 것은 아닙니다. 전문 평가와 치료 계획 안에서 다룰 문제입니다.",
      "충분한 수면과 자신에게 맞는 활동, 카페인 사용을 돌아보는 일은 치료 과정의 생활 지원이 될 수 있습니다. 하지만 생활 습관만으로 모두 해결되거나 실천하지 못한 것이 의지 부족이라는 뜻은 아닙니다. 치료와 상담을 함께 이어가며 변화와 어려움을 알립니다.",
      "진료·상담 연결이나 이동을 도울 때도 당사자가 원하는 범위를 묻습니다. 급한 위험이 드러나면 일상적인 대화를 기다리지 말고 앞의 긴급 도움 안내를 따르세요. 109는 24시간 자살예방 상담 경로이며 모든 불안 증상을 진단하는 전화나 예외 없는 비밀보장의 약속이 아닙니다.",
    ], claimIds: ["ANX-P3-004", "ANX-P3-005"], sourceIds: ["SRC-SNUH-ANXIETY", "SRC-NIMH-GAD", "SRC-NIMH-PANIC", "SRC-MOHW-109-ANX", "SRC-MOHW-109-SERVICE"], imageId: null },
  ],
  faq: [
    { question: "불안장애는 모두 범불안장애인가요?", answer: "아닙니다. 불안장애는 여러 질환을 묶는 말입니다. 넓게 이어지는 걱정, 반복되는 갑작스러운 두려움, 특정 상황의 불안 등 경험이 다를 수 있어 생활 영향과 다른 원인을 함께 평가합니다.", claimIds: ["ANX-P3-001", "ANX-P3-003"], sourceIds: ["SRC-SNUH-ANXIETY", "SRC-NIMH-ANXIETY", "SRC-NIMH-GAD"] },
    { question: "한 번 공황발작을 겪으면 공황장애인가요?", answer: "한 번의 경험만으로 확정하지 않습니다. 예상하지 못한 발작의 반복, 이후의 걱정과 행동 변화, 생활 영향을 의료진이 살핍니다. 발작처럼 느꼈다는 말만으로 신체 질환이 배제되는 것도 아닙니다.", claimIds: ["ANX-P3-003", "ANX-P3-004"], sourceIds: ["SRC-NIMH-PANIC", "SRC-NHS-CHEST-PAIN"] },
    { question: "전에도 공황이었는데 흉통을 지켜봐도 되나요?", answer: "과거 진단으로 지금의 원인을 확정할 수 없습니다. 갑자기 시작해 가라앉지 않는 흉통·불편, 퍼지는 통증, 흉통과 식은땀·숨참 등에는 즉시 119에 연락합니다. 말을 내기 어려운 심한 호흡곤란도 기다리지 않습니다.", claimIds: ["ANX-P3-004", "ANX-P3-005"], sourceIds: ["SRC-NHS-CHEST-PAIN", "SRC-NHS-BREATHLESSNESS", "SRC-EASYLAW-EMERGENCY-NUMBERS"] },
    { question: "6개월이 지나야 상담받을 수 있나요?", answer: "아닙니다. 진단 기간은 도움을 기다릴 조건이 아닙니다. 불안 때문에 일상이 어려워지면 기간이나 자가검사 점수와 관계없이 상담할 수 있습니다. 지금의 급한 신체·안전 위험에는 즉시 도움을 요청합니다.", claimIds: ["ANX-P3-003", "ANX-P3-005"], sourceIds: ["SRC-NIMH-GAD", "SRC-NIMH-PANIC", "SRC-NHS-BREATHLESSNESS"] },
    { question: "불안에 쓰는 약은 불안할 때만 먹으면 되나요?", answer: "약마다 역할·일정·효과 시점이 다릅니다. 모두 필요할 때만 먹는 약으로 생각하지 말고 자신의 처방을 확인하세요. 임의로 중단·증량하거나 다른 사람의 약을 먹지 않습니다. 불편이나 악화는 의료진에게 알립니다.", claimIds: ["ANX-P3-004"], sourceIds: ["SRC-NIMH-MENTAL-MEDICATIONS", "SRC-NIMH-GAD"] },
    { question: "가족이 두려운 상황을 억지로 경험시키면 나아지나요?", answer: "그렇게 시험하거나 강요하지 않습니다. 노출치료는 전문적인 평가·치료 계획에서 다루며, 가족이 임의로 신체 증상을 유발하거나 두려운 상황에 밀어 넣으라는 뜻이 아닙니다. 무엇이 어렵고 어떤 도움을 원하는지 먼저 묻습니다.", claimIds: ["ANX-P3-004"], sourceIds: ["SRC-SNUH-ANXIETY", "SRC-NIMH-PANIC"] },
  ],
  sourceIds: [...anxietySources.map(s=>s.id), "SRC-NHS-BREATHLESSNESS", "SRC-MOHW-109-SERVICE", "SRC-NIMH-SUICIDE-FAQ", "SRC-EASYLAW-EMERGENCY-NUMBERS"],
  imageIds: ["anxiety-disorder-hero", "anxiety-disorder-concept", "anxiety-disorder-action"],
  visuals: {
    "anxiety-disorder-hero": { src: "/images/onurim/anxiety-disorder/hero.webp", alt: "메모와 도움 연결을 상징하는 파랑·갈색 장식 표지 삽화", caption: "표지 도형은 불안의 검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "anxiety-disorder-concept": { src: "/images/onurim/anxiety-disorder/concept-v2.webp", alt: "이어지는 걱정·갑작스러운 두려움·특정 상황의 불안을 서로 다른 일상 장면으로 표현한 삽화", caption: "서로 겹칠 수도 있는 불안 경험 일부를 표현한 AI 생성 가상 장면입니다. 세 장면이 모든 종류·서로 배타적인 진단·악화 단계는 아닙니다. 표정이나 몸의 느낌만으로 공황과 신체 질환을 구별하는 그림도 아닙니다.", width: 1536, height: 1024 },
    "anxiety-disorder-action": { src: "/images/onurim/anxiety-disorder/action-v2.webp", alt: "언제·몸·피한 일·생활이라는 제목 아래 비어 있는 기록 칸 네 개와 연필 삽화", caption: "진료에 전할 경험을 정리하는 AI 생성 기록 예시입니다. ‘피한 일’은 이미 피하게 된 상황의 기록이지 회피 권유가 아닙니다. 네 칸이 필수 진단 조건·점수표는 아니며 모르는 내용은 비워도 됩니다. 급한 위험에는 기록 완성보다 도움을 먼저 요청합니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["anxiety-disorder-visit-card"],
};
