import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const depressionSources: HealthSource[] = [
  { id: "SRC-NIMH-DEPRESSION", organization: "NIH/NIMH", title: "Depression", url: "https://www.nimh.nih.gov/health/publications/depression", sourceDate: "2024 (Revised)", retrievedAt: checkedAt },
  { id: "SRC-WHO-DEPRESSION", organization: "WHO", title: "Depressive disorder (depression)", url: "https://www.who.int/news-room/fact-sheets/detail/depression", sourceDate: "2025-08-29 (페이지 표시일)", retrievedAt: checkedAt },
  { id: "SRC-MOHW-109", organization: "보건복지부", title: "자살예방 정책 추진", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "페이지 작성·수정일 미표시 (본문 정책 시행일과 구분)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-DEPRESSIVE-MOOD", organization: "질병관리청 국가건강정보포털", title: "우울감", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6788", sourceDate: "2026-05-20 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-MOHW-109-SERVICE", organization: "보건복지부 보건복지상담센터", title: "자살예방상담전화 — 109 안내와 자주하는 질문", url: "https://www.129.go.kr/109", sourceDate: "안내 본문 작성·수정일 미표시 (채용공고 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-NIMH-SUICIDE-HELP-STEPS", organization: "NIH/NIMH", title: "5 Action Steps to Help Someone Having Thoughts of Suicide", url: "https://www.nimh.nih.gov/health/publications/5-action-steps-to-help-someone-having-thoughts-of-suicide", sourceDate: "2024 (Revised)", retrievedAt: checkedAt },
  { id: "SRC-NIMH-SUICIDE-FAQ", organization: "NIH/NIMH", title: "Frequently Asked Questions About Suicide", url: "https://www.nimh.nih.gov/health/publications/suicide-faq", sourceDate: "2023 (Revised)", retrievedAt: checkedAt },
  { id: "SRC-EASYLAW-EMERGENCY-NUMBERS", organization: "찾기쉬운 생활법령정보", title: "긴급구조활동 — 긴급구조 관련 특수번호 전화서비스", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=3&cciNo=3&cnpClsNo=1&csmSeq=1465&popMenu=ov", sourceDate: "2026-08-15 (본문 정보 작성 기준일)", retrievedAt: checkedAt },
];

export const depressionArticle: HealthArticle = {
  slug: "depression", seoTitle: "우울증: 가족이 듣고 도울 말, 진료와 위기 도움의 구분",
  title: "우울증이 걱정되는 가족에게, 어떤 말부터 건넬까요?",
  eyebrow: "뇌·마음 · 판단보다 경청과 도움 연결",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "우울증을 의지 부족으로 보지 않고 기분·흥미·잠·식사·일상 변화를 살핍니다. 가족 대화 예시, 진료에 전할 내용, 109 상담과 119 긴급 도움의 차이를 설명합니다.",
  outcome: "우울한 사람을 평가하거나 혼자 치료하려 하지 않고, 현재 안전과 일상 변화를 살펴 전문 도움에 연결할 수 있습니다.",
  archetype: "FAMILY_SITUATION",
  summary: [
    "우울증은 마음가짐이나 의지의 약함으로 판단할 문제가 아닙니다. 우울한 기분 또는 흥미 저하와 함께 잠·식사·집중·일상생활이 달라질 수 있으며, 모든 사람의 모습이 같지 않습니다.",
    "자신을 해칠 위험이 임박했거나 이미 다쳤거나 지금 안전을 지키기 어렵다면 즉시 119에 연락합니다. 자살 생각으로 힘들 때는 24시간 상담전화 109에도 지금 도움을 요청할 수 있습니다.",
    "진단 기준에 나오는 기간이나 온라인 점수를 채울 때까지 도움을 미루지 않습니다. 가족은 들어 주고 진료 연결을 도울 수 있지만, 진단·치료 결정을 대신하지 않습니다.",
  ],
  sections: [
    { title: "가족이 죽고 싶다고 말하면, 지금의 안전부터 살피세요", paragraphs: [
      "자신을 해칠 위험이 임박했거나 이미 다쳤거나 지금 안전을 지키기 어렵다면 즉시 119에 연락합니다. 폭력 등으로 경찰의 보호가 필요한 상황에는 112에 요청하세요. 109 상담 연결이나 예약 진료를 기다리느라 긴급 도움을 늦추지 않습니다.",
      "자살 생각을 말하면 대수롭지 않게 넘기지 않고 즉시 도움을 연결합니다. 당사자를 혼자 두지 말고 신뢰할 수 있는 사람과 전문 도움을 함께 요청하세요. 주변 사람의 안전도 확보하며, 위험한 물건을 빼앗으려 몸싸움을 하거나 혼자 제압하려 하지 말고 긴급기관의 안내를 따릅니다.",
      "‘죽고 싶은 생각이 드나요?’처럼 직접 물을 수 있습니다. 묻는 것 자체가 자살 생각을 만들어 낸다는 근거는 없으며, 판단하지 않고 듣는 대화를 시작할 수 있습니다. ‘아무에게도 말하지 않겠다’고 약속하기보다 안전을 위해 함께 도움받을 사람을 찾습니다.",
      "당장 구조가 필요한 상황이 아니더라도 자살 생각이나 감당하기 어려운 괴로움이 있다면 24시간 자살예방상담전화 109에 지금 연락하고 전문 진료를 연결하세요. 이 글이나 가족의 판단만으로 위험이 없다고 확정하지 않습니다.",
    ], tone: "warning", claimIds: ["DEP-P3-005"], sourceIds: ["SRC-NIMH-SUICIDE-FAQ", "SRC-NIMH-SUICIDE-HELP-STEPS", "SRC-MOHW-109-SERVICE", "SRC-EASYLAW-EMERGENCY-NUMBERS", "SRC-WHO-DEPRESSION"], imageId: null,
      links: [{ href: "/health/guides/danger-signals", label: "도움 요청을 미루지 않아야 하는 위험 신호" }] },
    { title: "이유를 따지기 전에, 지금 어떤 점이 힘든지 들어 보세요", paragraphs: [
      "‘힘내면 되잖아’보다 ‘요즘 무엇이 가장 힘든지 듣고 싶어’로 시작해 보세요. 아래 문장은 경청과 도움 연결 원칙을 일상말로 옮긴 편집 예시이지, 효과가 검증된 상담 대본이나 임상 사례가 아닙니다.",
      "말을 바로 꺼내기 어려워하면 답을 재촉하거나 감정을 논박하지 않습니다. 진료 예약·이동·집안일 중 어떤 도움이 필요한지 구체적으로 물어볼 수 있습니다. 가족이 안전하지 않거나 편하지 않다면 친구 등 다른 신뢰할 수 있는 사람이나 전문가에게 연결합니다.",
      "‘왜 이것도 못 하느냐’며 의지를 시험하거나 가족의 노력만으로 해결하려 하지 않습니다. 대화와 생활 지원은 치료를 돕는 역할입니다. 자살 생각이나 안전 우려가 드러나면 평소의 대화 속도를 기다리는 대신 위의 긴급 도움 안내를 따릅니다.",
    ], table: { caption: "판단 대신 건넬 수 있는 대화 예시 — 상담 대본·실제 사례 아님", columns: ["피할 반응", "대신 물어볼 말"], rows: [
      ["네가 마음먹기에 달렸어", "지금 가장 버거운 일이 무엇인지 듣고 싶어"],
      ["다른 사람도 다 힘들어", "내가 다 알 수는 없지만 네 이야기를 듣고 싶어"],
      ["당장 밖에 나가면 괜찮아져", "예약이나 이동을 함께 준비하는 게 도움이 될까?"],
    ] }, claimIds: ["DEP-P3-004"], sourceIds: ["SRC-NIMH-DEPRESSION", "SRC-NIMH-SUICIDE-HELP-STEPS", "SRC-NIMH-SUICIDE-FAQ"], imageId: "depression-action" },
    { title: "슬픈 표정만이 아니라, 달라진 일상을 살핍니다", paragraphs: [
      "우울증은 잠깐 기분이 가라앉는 것과 다릅니다. 우울한 기분이나 이전에 즐기던 일에 대한 흥미·즐거움 저하가 이어지며 생각과 몸, 일상 기능에 영향을 줄 수 있습니다. 사회적·심리적·생물학적 요인이 복합적으로 작용하므로 원인 하나나 개인의 성격 탓으로 정하지 않습니다.",
      "잠을 못 자거나 너무 많이 자는 변화, 식욕 감소나 증가, 피로, 집중·결정의 어려움이 나타날 수 있습니다. 어떤 사람은 슬픔보다 짜증·공허함·몸의 불편을 더 두드러지게 느낍니다. 겉으로 웃거나 일부 일을 한다는 사실만으로 힘듦이 없다고 판단하지 않습니다.",
      "관찰은 진단표를 채우는 일이 아닙니다. ‘전보다 잠드는 일이 어렵다’, ‘즐기던 취미를 시작하기 힘들다’처럼 당사자가 느낀 변화와 생활의 영향을 아는 범위에서 전합니다. 아래 그림의 네 영역이 모두 있어야 한다거나 특정 조합이면 우울증이라는 뜻은 아닙니다.",
    ], bullets: [
      "잠·식사: 평소와 무엇이 달라졌고 생활에 어떤 불편이 생겼나요?",
      "흥미·기운: 전에는 하던 일 중 시작하거나 이어가기 힘든 것은 무엇인가요?",
      "집중·생활: 일·공부·집안일·사람을 만나는 데 어떤 영향이 있나요?",
    ], claimIds: ["DEP-P3-001", "DEP-P3-002"], sourceIds: ["SRC-WHO-DEPRESSION", "SRC-NIMH-DEPRESSION", "SRC-KDCA-DEPRESSIVE-MOOD"], imageId: "depression-concept",
      links: [{ href: "/health/guides/symptom-journal", label: "평소와 달라진 일상을 아는 범위에서 적는 일지" }] },
    { title: "2주나 설문 점수는 도움을 기다릴 기준이 아닙니다", paragraphs: [
      "진단 설명에는 증상이 이어진 기간과 일상 영향 등의 기준이 나옵니다. 하지만 2주가 될 때까지 버텨야 하거나 설문 점수가 높아져야 진료받을 수 있다는 뜻은 아닙니다. 괴로움이 지속되거나 생활이 어려우면 기간이 짧고 증상이 몇 가지뿐이어도 의료진에게 상담하세요. 자살 생각이나 급한 안전 문제는 기간과 무관하게 즉시 도움을 받습니다.",
      "자가 설문은 증상을 살펴보는 자료일 수 있지만 점수만으로 진단을 확정하지 않습니다. 의료진은 시작 시점·반복·생활 영향과 다른 건강 문제, 사용 약 등을 함께 확인합니다. 신체 질환이나 약물 영향이 비슷한 증상을 만들 수 있어 필요한 진찰·검사를 정합니다.",
      "진료에서는 기분·흥미·잠·식사·기운 변화뿐 아니라 과거에도 비슷했는지, 사용 중인 약·보충제·술, 임신·출산 관련 상황 등을 알립니다. 잠이 적어도 유난히 기운이 넘치거나 평소와 크게 다른 활동을 했던 시기가 있다면 그것도 말하세요. 경험을 숨기거나 스스로 특정 질환으로 이름 붙일 필요는 없습니다.",
    ], claimIds: ["DEP-P3-003", "DEP-P3-004"], sourceIds: ["SRC-NIMH-DEPRESSION", "SRC-WHO-DEPRESSION", "SRC-KDCA-DEPRESSIVE-MOOD"], imageId: null,
      links: [{ href: "/health/anxiety-disorder", label: "함께 느끼는 걱정·불안도 구분해 전하기" }, { href: "/health/tools/depression-visit-card", label: "우울감과 생활 영향을 전할 진료 질문 카드" }] },
    { title: "치료는 개인에게 맞춰 정하고, 변화는 다시 알립니다", paragraphs: [
      "우울증에는 효과가 있는 치료가 있습니다. 전문적인 심리치료, 약물치료 또는 그 조합 등을 상태·선호·건강 상황에 맞춰 상의합니다. 가족과 이야기하는 것과 훈련받은 전문가의 심리치료는 같은 의미가 아닙니다. 어떤 치료가 자신에게 맞는지 설명을 듣고 질문할 수 있습니다.",
      "약의 효과와 부작용은 개인마다 다를 수 있습니다. 좋아졌다고 혼자 끊거나 변화가 더디다고 스스로 늘리지 말고 처방 의료진과 상의합니다. 새로 시작하거나 용량이 바뀐 뒤 기분·행동·수면이 어떻게 달라지는지 살피고, 자살 생각이 생기거나 심해지면 즉시 도움을 요청하세요. 약효를 기다려야 한다는 이유로 악화를 견디지 않습니다.",
      "진료에서 ‘어떤 변화를 언제 알려야 하나요?’, ‘불편이나 위기가 생기면 누구에게 연락하나요?’를 확인합니다. 이 페이지는 모든 사람의 약 효과 시점·복용 기간·중단법을 정하지 않습니다. 보충제나 자연 제품도 처방약과 영향을 주고받을 수 있어 사용 전 의료진에게 알립니다.",
    ], claimIds: ["DEP-P3-003", "DEP-P3-004", "DEP-P3-005"], sourceIds: ["SRC-NIMH-DEPRESSION", "SRC-WHO-DEPRESSION", "SRC-KDCA-DEPRESSIVE-MOOD", "SRC-NIMH-SUICIDE-FAQ"], imageId: null,
      links: [{ href: "/health/guides/medication-list", label: "보충제와 처방 변경도 함께 알릴 사용 약 목록" }] },
    { title: "하루를 돕는 일은 작게, 지원은 계속 이어갑니다", paragraphs: [
      "가능한 범위에서 식사와 수면의 리듬을 유지하고, 믿을 수 있는 사람과 연결되는 일은 치료 과정의 생활 지원이 될 수 있습니다. 예전에 즐겼던 일이나 가벼운 활동도 부담을 줄여 시도할 수 있지만, 이를 해내지 못했다고 실패로 여기거나 치료를 대신하는 숙제로 만들지 않습니다.",
      "가족은 당사자가 원하는 범위에서 일정·이동·식사 준비 등을 도울 수 있습니다. 한번 이야기를 들은 것으로 끝내기보다 이후에도 연락하며 필요한 도움을 묻습니다. 주변 사람에게 모든 책임을 맡기지 않고 의료진·상담기관과 역할을 나누세요.",
      "자살 생각이 있거나 위기를 겪었다면 전문 도움을 받을 때 신뢰할 사람과 연락 방법, 다시 위험해질 때 취할 행동을 함께 정할 수 있습니다. 가족의 약속이나 온라인 기록만으로 안전을 보장하는 계획은 아니며, 긴급할 때는 다시 즉시 구조를 요청합니다.",
    ], claimIds: ["DEP-P3-004", "DEP-P3-005"], sourceIds: ["SRC-WHO-DEPRESSION", "SRC-NIMH-DEPRESSION", "SRC-NIMH-SUICIDE-HELP-STEPS", "SRC-NIMH-SUICIDE-FAQ"], imageId: null,
      links: [{ href: "/health/guides/appointment-questions", label: "다음 진료와 연락 방법을 확인하는 질문" }] },
    { title: "109 상담과 119 긴급구조는 역할이 다릅니다", paragraphs: [
      "한국의 자살예방상담전화 109는 24시간 운영 안내가 확인된 상담 경로입니다. 자살 생각이나 극심한 괴로움을 혼자 견디지 않도록 이야기하고 도움 연결을 받을 수 있습니다. 상담 안내가 있다는 사실은 언제나 즉시 연결된다는 보장이나 의료 진단·치료의 대체를 뜻하지 않습니다.",
      "상담 내용은 기본적으로 비밀이 보장되지만, 위급한 경우에는 다른 기관에 도움을 요청할 수 있다고 공식 안내에 적혀 있습니다. 예외가 없는 비밀 보장을 약속하지 않습니다. 개인정보나 진단 이야기를 이 사이트에 제출할 필요는 없습니다.",
      "이미 다쳤거나 자신을 해칠 위험이 임박했거나 현재 안전을 지키기 어렵다면 109의 응답을 기다리지 말고 119에 연락합니다. 경찰의 보호가 필요한 위험에는 112를 이용합니다. 이 안내는 공식 웹페이지 대조이며 실제 상담 연결·응급 출동을 시험한 결과는 아닙니다.",
    ], claimIds: ["DEP-P3-005"], sourceIds: ["SRC-MOHW-109-SERVICE", "SRC-MOHW-109", "SRC-NIMH-SUICIDE-FAQ", "SRC-EASYLAW-EMERGENCY-NUMBERS"], imageId: null },
  ],
  faq: [
    { question: "2주가 안 됐으면 진료받기에는 이른가요?", answer: "기간을 채울 필요는 없습니다. 괴로움이나 생활의 어려움이 있으면 의료진에게 상담할 수 있습니다. 자살 생각이나 급한 안전 문제는 기간과 무관하게 즉시 도움을 요청합니다.", claimIds: ["DEP-P3-003", "DEP-P3-005"], sourceIds: ["SRC-NIMH-DEPRESSION", "SRC-NIMH-SUICIDE-FAQ"] },
    { question: "온라인 우울증 검사 점수가 높으면 확진인가요?", answer: "아닙니다. 설문은 증상을 살펴보는 자료이며 진단 자체가 아닙니다. 의료진은 기간·생활 영향·다른 질환과 약물 가능성 등을 함께 평가합니다. 점수가 낮다는 이유로 고통이나 위험 신호를 무시하지 않습니다.", claimIds: ["DEP-P3-003", "DEP-P3-004"], sourceIds: ["SRC-KDCA-DEPRESSIVE-MOOD", "SRC-NIMH-DEPRESSION"] },
    { question: "가족에게 힘내라고 계속 말하면 도움이 되나요?", answer: "의지를 평가하거나 감정을 논박하기보다 어떤 점이 힘든지 듣고, 필요한 진료 연결과 생활 도움을 물어보세요. 가족의 지지가 전문 치료를 대신하지는 않습니다.", claimIds: ["DEP-P3-004"], sourceIds: ["SRC-NIMH-DEPRESSION", "SRC-NIMH-SUICIDE-HELP-STEPS"] },
    { question: "자살 생각을 직접 물으면 더 위험해지지 않나요?", answer: "직접 묻는 것이 자살 생각을 일으키거나 늘린다는 근거는 없습니다. 판단하지 않고 물어 도움을 연결할 수 있습니다. 위험이 드러나면 혼자 해결하거나 비밀을 약속하지 말고 즉시 전문 도움을 요청하세요.", claimIds: ["DEP-P3-005"], sourceIds: ["SRC-NIMH-SUICIDE-HELP-STEPS", "SRC-NIMH-SUICIDE-FAQ"] },
    { question: "기분이 나아지면 약을 혼자 끊어도 되나요?", answer: "약을 시작하거나 중단·변경하기 전 처방 의료진과 상의합니다. 효과가 더디거나 부작용이 있어도 혼자 용량을 조정하지 않습니다. 자살 생각이나 안전 문제가 생기면 약효를 기다리며 견디지 말고 즉시 도움을 받습니다.", claimIds: ["DEP-P3-004", "DEP-P3-005"], sourceIds: ["SRC-NIMH-DEPRESSION", "SRC-NIMH-SUICIDE-FAQ"] },
    { question: "109에 먼저 연락해야 119의 도움을 받을 수 있나요?", answer: "그런 순서는 아닙니다. 이미 다쳤거나 임박한 위험으로 안전을 지키기 어렵다면 즉시 119에 연락합니다. 109는 24시간 자살예방 상담 경로이며 긴급구조를 기다리게 하는 선행 절차가 아닙니다.", claimIds: ["DEP-P3-005"], sourceIds: ["SRC-MOHW-109-SERVICE", "SRC-EASYLAW-EMERGENCY-NUMBERS", "SRC-NIMH-SUICIDE-FAQ"] },
  ],
  sourceIds: depressionSources.map(s=>s.id), imageIds: ["depression-hero", "depression-concept", "depression-action"],
  visuals: {
    "depression-hero": { src: "/images/onurim/depression/hero.webp", alt: "메모와 도움 연결을 상징하는 초록·갈색 장식 표지 삽화", caption: "표지의 도형은 심리검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "depression-concept": { src: "/images/onurim/depression/concept-v2.webp", alt: "잠·식사·흥미·집중을 각각 침구·그릇·스케치북·펼친 책으로 표현한 삽화", caption: "진료에서 이야기할 생활 영역 일부의 AI 생성 상징 삽화입니다. 잠과 식욕은 늘거나 줄 수 있고, 네 영역 모두가 필요한 진단 기준·점수표가 아닙니다. 음식·독서·휴식의 치료 효과나 회복을 보장하지 않습니다.", width: 1536, height: 1024 },
    "depression-action": { src: "/images/onurim/depression/action-v2.webp", alt: "서로 같은 눈높이의 의자에 앉아 한 사람이 말하고 다른 사람이 듣는 두 성인의 대화 삽화", caption: "경청과 도움 연결을 설명하는 AI 생성 장면입니다. 실제 환자나 의료인이 아니며, 가족 대화만으로 치료되거나 위기를 해결한다는 뜻이 아닙니다. 급한 위험에는 대화보다 긴급 도움 연결을 우선합니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["depression-visit-card"],
};
