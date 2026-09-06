import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const nhlbi = "https://www.nhlbi.nih.gov/health/asthma/";
export const asthmaSources: HealthSource[] = [
  { id: "SRC-NHLBI-ASTHMA-SYMPTOMS", organization: "NIH/NHLBI", title: "Asthma Symptoms", url: `${nhlbi}symptoms`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-DIAGNOSIS", organization: "NIH/NHLBI", title: "Asthma Diagnosis", url: `${nhlbi}diagnosis`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-ATTACK", organization: "NIH/NHLBI", title: "Asthma Attack", url: `${nhlbi}attacks`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-PLAN", organization: "NIH/NHLBI", title: "Asthma Treatment and Action Plan", url: `${nhlbi}treatment-action-plan`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-MANAGING", organization: "NIH/NHLBI", title: "Managing Asthma", url: `${nhlbi}living-with`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-KDCA-ASTHMA", organization: "질병관리청 국가건강정보포털", title: "천식", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6784", sourceDate: "2026-05-06 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHS-ASTHMA", organization: "NHS", title: "Asthma", url: "https://www.nhs.uk/conditions/asthma/", sourceDate: "2025-04-07 (페이지 검토; 동영상 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-NHS-BREATHLESSNESS", organization: "NHS", title: "Shortness of breath", url: "https://www.nhs.uk/symptoms/shortness-of-breath/", sourceDate: "2024-01-30", retrievedAt: checkedAt },
];

// Explain how to read an existing clinical plan, never generate a prescription.
// Original claim records and their licensed-review status remain unchanged.
export const asthmaArticle: HealthArticle = {
  slug: "asthma", seoTitle: "천식: 기도가 좁아지는 이유와 내 행동계획 읽는 법",
  title: "천식, 기도의 변화와 내 행동계획을 함께 이해하기",
  eyebrow: "호흡기·알레르기 · 공기가 지나는 길부터",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "천식에서 기도가 좁아지는 과정을 쉽게 이해하고, 개인 행동계획의 약 이름·사용 지침·도움 요청 시점을 확인합니다. 증상 기록과 심한 호흡곤란의 응급 신호를 구분합니다.",
  outcome: "기도의 변화를 이해하고 내 처방에서 확인할 질문을 찾으며, 심한 호흡곤란에는 계획서를 찾느라 도움을 늦추지 않을 수 있습니다.",
  archetype: "SIMPLE_ANALOGY",
  summary: [
    "천식은 공기가 오가는 기도에 염증과 좁아짐이 반복될 수 있는 만성 질환입니다.",
    "흡입기의 색보다 약 이름·나에게 정해진 역할과 사용법을 확인합니다.",
    "숨쉬기가 매우 어렵거나 말을 내기 힘들 때는 계획서·기록·약효를 기다리지 말고 119에 도움을 요청합니다.",
  ],
  sections: [
    { title: "공기가 오가는 통로가 좁아진다고 생각해 보세요", paragraphs: [
      "기도는 폐로 공기가 드나드는 길입니다. 천식에서는 이 길이 자극에 민감해지고 염증이 생겨, 공기가 지나갈 공간이 좁아질 수 있습니다. 단순히 폐 자체가 작아진다는 뜻은 아닙니다.",
    ], bullets: [
      "안쪽 벽이 붓는 변화: 기도 안의 빈 공간이 줄어들 수 있습니다.",
      "주변 근육이 조이는 변화: 통로를 둘러싼 근육의 수축이 좁아짐에 관여합니다.",
      "점액이 늘어나는 변화: 통로 안의 점액도 공기 흐름에 영향을 줄 수 있습니다.",
    ], claimIds: ["AST-P3-001"], sourceIds: ["SRC-KDCA-ASTHMA", "SRC-NHLBI-ASTHMA-ATTACK"], imageId: "ast-concept" },
    { title: "기침·쌕쌕거림은 ‘언제 달라지는지’도 중요합니다", paragraphs: [
      "천식에서는 기침, 숨을 쉴 때 나는 휘파람 같은 쌕쌕 소리, 숨참, 가슴 답답함이 나타날 수 있습니다. 같은 날에도 오르내리거나 밤·이른 아침, 감기, 운동, 찬 공기 등과 관련해 달라질 수 있습니다. 모든 사람에게 같은 유발 요인이 있는 것은 아닙니다.",
      "이런 증상은 다른 문제에서도 나타날 수 있습니다. 소리가 난다는 이유로 천식을 확정하거나, 지금 쌕쌕거리지 않는다는 이유로 심한 호흡곤란을 안전하다고 판단하지 않습니다. 진료에서는 증상 흐름과 병력에 더해 필요한 검사를 살핍니다.",
      "폐활량검사 등 폐기능검사는 내쉬는 공기의 양과 속도 등을 확인합니다. 어떤 검사가 필요한지와 준비 방법은 진료팀의 안내를 받습니다. 집에서 숨을 오래 참거나 빨대로 숨 쉬는 체험으로 진단하지 않습니다. 검사 준비를 위해 약을 임의로 중단하지도 않습니다.",
    ], claimIds: ["AST-P3-002", "AST-P3-003"], sourceIds: ["SRC-NHLBI-ASTHMA-SYMPTOMS", "SRC-NHLBI-ASTHMA-DIAGNOSIS", "SRC-NHS-BREATHLESSNESS"], imageId: null, links: [{ href: "/health/allergic-rhinitis", label: "함께 상담할 코 알레르기의 유발 상황" }] },
    { title: "증상이 없는 날도 내 처방을 기준으로 삼으세요", paragraphs: [
      "천식 증상이 잠잠한 때에도 기도의 염증이나 예민함이 남아 있을 수 있습니다. 오늘 편하게 숨 쉰다는 이유만으로 치료가 끝났다고 판단하지 않습니다. 반대로 모든 사람이 항상 같은 약을 같은 방식으로 써야 하는 것도 아닙니다.",
      "안정된 날의 사용법도 개인 처방과 행동계획에서 확인합니다. 약을 혼자 줄이거나 중단하지 말고 변경은 진료팀과 상의하세요. 일상 활동이 어렵거나 밤에 자주 깨는 등 변화가 있으면 다음 정기 방문까지 참기보다 계획을 확인하고 진료팀에 알립니다.",
    ], claimIds: ["AST-P3-001", "AST-P3-004"], sourceIds: ["SRC-KDCA-ASTHMA", "SRC-NHLBI-ASTHMA-PLAN", "SRC-NHLBI-ASTHMA-SYMPTOMS"], imageId: null },
    { title: "흡입기는 색이 아니라 약 이름과 역할로 확인합니다", paragraphs: [
      "흡입기는 약을 들이마시는 기기이며 종류마다 사용하는 방법이 다를 수 있습니다. 같은 색이나 비슷한 모양만 보고 약의 목적과 사용법이 같다고 판단하지 않습니다. 자신의 기기와 약 이름을 의료진·약사에게 보여 주고 확인합니다.",
      "처방에 따라 한 흡입기가 증상 예방과 완화 등 둘 이상의 역할을 맡을 수도 있습니다. 인터넷 그림처럼 반드시 두 색의 기기가 있어야 한다거나, 다른 사람의 사용 횟수가 나에게도 맞는 것은 아닙니다. 이 페이지는 약이나 기기를 골라 주는 처방표가 아닙니다.",
      "기기를 제대로 쓰는지 궁금하면 진료 때 실제 사용하는 모습을 보여 주고 확인받으세요. 방법이 헷갈린다는 이유로 추가로 사용하거나 약을 바꾸지 말고, 내 기기에 맞는 설명을 요청합니다.",
    ], claimIds: ["AST-P3-004"], sourceIds: ["SRC-NHS-ASTHMA", "SRC-NHLBI-ASTHMA-PLAN"], imageId: null, links: [{ href: "/health/guides/medication-list", label: "흡입기까지 포함해 약 이름과 지침 정리하기" }] },
    { title: "내 행동계획에서 다섯 항목을 찾아보세요", paragraphs: [
      "천식 행동계획은 의료진과 함께 정하는 개인 치료·대응 계획입니다. 아래 표는 이미 받은 계획을 읽거나 진료에서 질문할 때 쓰는 길잡이입니다. 빈칸에 인터넷 약 이름이나 숫자를 넣어 새 계획을 만드는 표가 아닙니다.",
    ], table: { caption: "개인 행동계획을 읽는 질문 — 치료계획을 대신 만들지 않습니다", columns: ["찾아볼 항목", "확인할 질문"], rows: [
      ["약 이름과 역할", "이 약은 제 처방에서 어떤 역할을 맡나요?"],
      ["평소 사용 지침", "증상이 없는 날을 포함해 어떤 지침을 따라야 하나요?"],
      ["증상이 변했을 때", "어떤 변화를 알아차리면 계획의 어느 부분을 확인하나요?"],
      ["도움 요청 기준·연락처", "진료팀에 연락할 때와 즉시 119를 요청할 때는 언제인가요?"],
      ["기기 사용법·계획 확인", "제가 사용하는 모습을 확인해 주실 수 있나요? 계획이 현재 처방과 맞나요?"],
    ] }, claimIds: ["AST-P3-004"], sourceIds: ["SRC-NHLBI-ASTHMA-PLAN", "SRC-NHLBI-ASTHMA-MANAGING", "SRC-NHS-ASTHMA"], tone: "note", imageId: "ast-action", links: [{ href: "/health/tools/asthma-visit-card", label: "천식 증상과 행동계획의 진료 질문 카드" }] },
    { title: "계획에 연결할 기록은 짧고 구체적으로", paragraphs: [
      "기침·쌕쌕거림이 생긴 시간과 상황, 밤에 깼는지, 평소 활동에 어떤 지장이 있었는지를 남깁니다. 처방에 따라 약을 사용했다면 그 뒤 증상이 어떻게 달라졌는지도 알립니다. 기록으로 원인을 확정하거나 응급 도움을 미루지는 않습니다.",
      "최대호기유속계는 공기를 얼마나 빠르게 내쉴 수 있는지 살피는 도구입니다. 의료진이 개인 계획에 따라 사용하도록 안내했다면 그 방법과 기준을 따릅니다. 모든 독자가 새 기기를 사거나 인터넷 공통 기준에 수치를 맞출 필요는 없습니다.",
      "행동계획을 받은 기억이 없거나 찾기 어렵다면 안정된 때 진료팀에 종이·디지털 계획을 요청하세요. 담배 연기 등 자극 노출과 생활 여건도 함께 상의합니다. 운동 때 증상이 있다고 모든 활동을 끊기보다 안전한 활동 방법을 상담합니다. 갑자기 숨쉬기가 매우 어려운 상황은 계획을 마련할 때까지 기다릴 때가 아닙니다.",
    ], claimIds: ["AST-P3-002", "AST-P3-003", "AST-P3-004"], sourceIds: ["SRC-NHLBI-ASTHMA-MANAGING", "SRC-NHLBI-ASTHMA-DIAGNOSIS", "SRC-NHLBI-ASTHMA-PLAN", "SRC-NHLBI-ASTHMA-SYMPTOMS"], imageId: null, links: [{ href: "/health/guides/symptom-journal", label: "증상·상황·처방 뒤 반응을 구분해 기록하기" }, { href: "/health/guides/appointment-questions", label: "다음 진료에서 빠뜨리지 않을 질문" }] },
    { title: "말을 내기 힘든 호흡곤란에는 계획서보다 119가 먼저입니다", paragraphs: [
      "숨쉬기가 매우 어렵거나, 헐떡이거나, 말을 내기 힘들면 즉시 119에 도움을 요청합니다.",
      "입술·피부가 매우 창백해지거나 파랗게 또는 회색빛으로 변하는 경우, 또는 갑자기 혼란스러워하는 경우도 즉시 119에 연락합니다. 색 변화까지 나타나야 하는 조건이 아닙니다.",
      "천식 발작 중 처방된 약으로 증상이 완화되지 않거나 숨쉬기가 여전히 매우 어려운 경우도 119 도움을 요청합니다. 약을 더 쓰며 기다리라는 뜻이 아닙니다.",
      "여러 신호가 함께 나타날 때까지 기다리지 않습니다. 심한 호흡곤란이 있으면 기록이나 계획서를 찾느라 호출을 늦추지 말고 직접 운전하지 마세요. 이미 정해진 응급 대응과 119 안내를 따르며, 다른 사람의 흡입기나 온라인 용량으로 대신하지 않습니다.",
      "발작 뒤 호전되었더라도 진료팀에 지체 없이 연락해 신속한 후속 진료와 계획 점검을 받습니다. 일반적인 증상 상담과 지금의 응급 대응은 구분해야 합니다. 숨참의 원인을 천식으로 단정하지 않는 것도 중요합니다.",
    ], claimIds: ["AST-P3-005"], sourceIds: ["SRC-NHS-BREATHLESSNESS", "SRC-NHLBI-ASTHMA-ATTACK", "SRC-NHS-ASTHMA"], tone: "warning", imageId: null, links: [{ href: "/health/guides/danger-signals", label: "즉시 대응해야 할 호흡·의식 변화" }] },
  ],
  faq: [
    { question: "천식에서는 왜 숨쉬기가 힘들어지나요?", answer: "기도 안쪽 벽의 부종, 주변 근육의 수축, 점액 증가 등이 공기가 지나는 공간을 좁힐 수 있습니다. 이는 이해를 돕는 설명이며 개인의 상태나 심한 정도는 그림으로 판단하지 않습니다.", claimIds: ["AST-P3-001"], sourceIds: ["SRC-KDCA-ASTHMA", "SRC-NHLBI-ASTHMA-ATTACK"] },
    { question: "기침이나 쌕쌕거림만 있으면 천식인가요?", answer: "증상만으로 확정하지 않습니다. 다른 원인도 있을 수 있어 의료진이 패턴과 병력을 확인하고 필요한 검사를 판단합니다. 지금 소리가 들리지 않더라도 심한 호흡곤란을 안전하다고 보지 않습니다.", claimIds: ["AST-P3-002", "AST-P3-003"], sourceIds: ["SRC-NHLBI-ASTHMA-SYMPTOMS", "SRC-NHLBI-ASTHMA-DIAGNOSIS", "SRC-NHS-BREATHLESSNESS"] },
    { question: "증상이 없으면 흡입기를 중단해도 되나요?", answer: "증상이 잠잠하다는 사실만으로 중단하거나 용량을 바꾸지 않습니다. 개인 처방과 행동계획을 따르고 변경은 진료팀과 상의합니다. 평소 사용 지침을 모르면 확인을 요청하세요.", claimIds: ["AST-P3-004"], sourceIds: ["SRC-KDCA-ASTHMA", "SRC-NHLBI-ASTHMA-PLAN"] },
    { question: "흡입기 색이 같으면 사용법도 같나요?", answer: "색이나 모양만으로 판단할 수 없습니다. 약 이름·기기 종류·개인 처방을 확인합니다. 한 기기가 여러 역할을 맡는 처방도 있으므로 자신의 기기로 사용법을 확인받으세요.", claimIds: ["AST-P3-004"], sourceIds: ["SRC-NHS-ASTHMA"] },
    { question: "천식 행동계획을 받은 기억이 없다면 어떻게 하나요?", answer: "상태가 안정적일 때 진료팀에 개인 계획을 요청하고 약의 역할·사용 지침·연락 기준을 함께 확인합니다. 심한 호흡곤란이 있는 지금은 계획서를 마련하거나 찾을 때까지 기다리지 말고 119 도움을 요청합니다.", claimIds: ["AST-P3-004", "AST-P3-005"], sourceIds: ["SRC-NHLBI-ASTHMA-PLAN", "SRC-NHS-BREATHLESSNESS"] },
    { question: "처방된 약을 썼는데 발작이 좋아지지 않으면요?", answer: "천식 발작 중 약으로 완화되지 않거나 호흡이 여전히 매우 어렵다면 119에 도움을 요청합니다. 말을 내기 어려울 정도의 호흡곤란이나 갑작스러운 혼란에는 약효나 피부색 변화를 기다리지 않습니다.", claimIds: ["AST-P3-005"], sourceIds: ["SRC-NHLBI-ASTHMA-ATTACK", "SRC-NHS-BREATHLESSNESS"] },
  ],
  sourceIds: asthmaSources.map(s=>s.id), imageIds: ["ast-hero", "ast-concept", "ast-action"],
  visuals: {
    "ast-hero": { src: "/images/onurim/asthma/hero.webp", alt: "네 줄의 메모 용지와 상담 준비를 상징하는 파란색 장식 표지 삽화", caption: "표지의 줄과 십자 모양은 폐기능 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "ast-concept": { src: "/images/onurim/asthma/concept-v2.webp", alt: "넓게 열린 기도 단면과 안쪽 벽의 부종·바깥 근육의 수축·안쪽 점액으로 통로가 좁아진 기도 단면을 나란히 비교한 개념도", caption: "왼쪽은 열린 기도, 오른쪽은 벽의 부종과 주변 근육 수축, 안쪽의 옅은 노란 점액을 단순화한 모습입니다. 실제 조직검사나 막힌 비율·치료 전후·필연적 진행 단계가 아닙니다.", width: 1536, height: 1024 },
    "ast-action": { src: "/images/onurim/asthma/action-v2.webp", alt: "진료를 상징하는 가상 장면에서 두 성인이 계획서의 한 부분을 함께 확인하고 질문을 별도 노트에 적는 생성 이미지", caption: "실제 환자·검수자 사진이 아닌 AI 생성 상담 장면입니다. 문서의 줄·도형은 처방 내용이 아니고, 회색 기기는 종류·역할·사용량을 권하는 제품이 아닙니다. 심한 호흡곤란에는 계획서를 찾기보다 119가 먼저입니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["asthma-visit-card"],
};
