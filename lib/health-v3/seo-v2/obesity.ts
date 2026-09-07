import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const niddk = "https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/";
export const obesitySources: HealthSource[] = [
  { id: "SRC-NIDDK-OBESITY-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts for Adult Overweight & Obesity", url: `${niddk}definition-facts`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-OBESITY-FACTORS", organization: "NIH/NIDDK", title: "Factors Affecting Weight & Health", url: `${niddk}factors-affecting-weight-health`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-OBESITY-RISKS", organization: "NIH/NIDDK", title: "Health Risks of Overweight & Obesity", url: `${niddk}health-risks`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-HEALTHY-WEIGHT", organization: "NIH/NIDDK", title: "Am I at a Healthy Weight?", url: `${niddk}am-i-healthy-weight`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-OBESITY-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for Overweight & Obesity", url: `${niddk}treatment`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-WEIGHT-CONVERSATION", organization: "NIH/NIDDK", title: "Talking with Your Patients about Weight", url: "https://www.niddk.nih.gov/health-information/professionals/clinical-tools-patient-management/weight-management/talking-with-your-patients-about-weight", sourceDate: "2023-08 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-AMC-OBESITY", organization: "서울아산병원", title: "비만(Obesity)", url: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31809", sourceDate: "페이지 표시일 미확인", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-WEIGHT-GAIN", organization: "MedlinePlus / A.D.A.M.", title: "Weight gain - unintentional", url: "https://medlineplus.gov/ency/article/003084.htm", sourceDate: "2025-07-03 (Review Date)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-LEG-SWELLING", organization: "MedlinePlus / A.D.A.M.", title: "Foot, leg, and ankle swelling", url: "https://medlineplus.gov/ency/article/003104.htm", sourceDate: "2025-05-19 (Review Date)", retrievedAt: checkedAt },
];

// New source-linked explanations do not rewrite or clinically approve the
// original 144 claims or the 47-claim licensed-review packet.
export const obesityArticle: HealthArticle = {
  slug: "obesity",
  seoTitle: "비만 상담 준비: BMI·허리둘레와 수면·약·생활 변화",
  title: "비만 상담 전, 체중과 생활 변화를 함께 정리하기",
  eyebrow: "대사·내분비 · 본인이 원하는 가족의 도움부터",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "BMI·허리둘레가 알려 주는 것과 한계, 수면·약·생활 변화에 관한 진료 메모를 정리합니다. 갑작스러운 체중 증가를 지방으로 단정하지 않고, 가족의 도움도 본인의 동의부터 시작합니다.",
  outcome: "체중 숫자만으로 자신을 평가하지 않고, 몸과 생활의 변화 및 원하는 도움을 진료에서 설명할 수 있습니다.",
  archetype: "FAMILY_SITUATION",
  summary: [
    "비만은 의지나 외모만의 문제가 아닙니다. 몸의 지방과 건강 위험, 생활 여건을 함께 살핍니다.",
    "BMI·허리둘레는 참고 자료이며 근육량·지방의 위치·개인의 건강을 모두 보여 주지 않습니다.",
    "갑자기 늘어난 체중은 지방 증가와 다를 수 있습니다. 붓기와 숨참·가슴 불편, 의식 변화는 따로 살펴야 합니다.",
  ],
  sections: [
    { title: "가족이라도 먼저 ‘어떤 도움이 필요해?’", paragraphs: [
      "건강이 걱정돼도 체중 이야기부터 꺼내거나 식사를 감시하면 본인이 원하는 도움과 멀어질 수 있습니다. 지금 체중에 관해 이야기해도 괜찮은지, 가장 불편한 점이 무엇인지 먼저 물어보세요. 대화를 원하지 않는다면 강요하지 않습니다.",
      "아래는 비난하지 않고 동의를 구하는 의료 대화 원칙을 가정의 말로 옮긴 편집 예시입니다. 가족이 치료자가 되거나 특정 대화로 체중이 줄어든다는 뜻은 아닙니다. 혼자 진료받기를 원한다면 그 선택도 존중합니다.",
    ], table: { caption: "체중을 평가하기 전에 동의와 필요한 도움을 묻는 예", columns: ["대화 상황", "이렇게 물어볼 수 있어요"], rows: [
      ["건강이 걱정될 때", "요즘 몸이나 생활에서 불편한 점이 있어? 이 이야기를 지금 해도 괜찮을까?"],
      ["같이 무언가 하고 싶을 때", "식사 준비나 외출 동행 중에 내가 도우면 좋은 일이 있을까? 원하지 않아도 괜찮아."],
      ["진료를 준비할 때", "질문을 같이 적을까, 아니면 혼자 정리하는 게 편할까?"],
    ] }, claimIds: ["OBS-P3-001", "OBS-P3-004"], sourceIds: ["SRC-NIDDK-WEIGHT-CONVERSATION"], imageId: null },
    { title: "BMI·허리둘레는 무엇을 보고, 무엇을 놓칠까요?", paragraphs: [
      "비만은 몸에 지방이 과도하게 축적되어 건강 위험이 커질 수 있는 상태입니다. 단순히 몸무게가 무겁거나 특정 외모라는 뜻이 아닙니다. 체중은 지방뿐 아니라 근육·뼈·수분 등도 포함하므로 체중계 한 번의 숫자로 원인이나 건강 상태를 결론내리지 않습니다.",
      "BMI는 키와 체중으로 계산하는 체질량지수입니다. 건강 위험을 살필 때 쓰는 자료지만 지방량을 직접 측정하지는 않습니다. 허리둘레는 복부 지방과 관련된 위험을 살피는 데 도움이 되지만 내장지방의 양을 직접 보여 주는 검사도 아닙니다.",
    ], table: { caption: "체중 관련 지표를 진료에서 함께 읽는 방법", columns: ["지표", "알아볼 때 도움이 되는 점", "이것만으로 알 수 없는 점"], rows: [
      ["체중의 흐름", "언제부터 어느 방향으로 달라졌는지 설명합니다.", "갑작스러운 변화가 지방·수분·다른 원인 중 무엇 때문인지는 구분하지 못합니다."],
      ["BMI", "키에 비해 체중이 어느 정도인지 살피는 자료입니다.", "근육과 지방을 나누거나 지방의 위치를 직접 보여 주지 않습니다."],
      ["허리둘레", "복부의 크기를 통해 건강 위험을 살피는 데 보탭니다.", "정확한 내장지방량이나 비만 관련 질환의 유무를 확정하지 못합니다."],
    ] }, bullets: [
      "근육이 많은 성인은 BMI가 높아도 같은 BMI의 다른 사람과 몸의 구성이 다를 수 있습니다.",
      "나이가 들며 근육량이 달라지면 BMI가 비슷해도 몸의 구성이 달라질 수 있습니다.",
      "이 글은 성인의 상담 준비 안내입니다. 아동·청소년, 임신 중인 사람에게 성인의 수치 기준이나 감량 계획을 그대로 적용하지 않습니다.",
    ], claimIds: ["OBS-P3-001", "OBS-P3-002", "OBS-P3-003"], sourceIds: ["SRC-NIDDK-OBESITY-DEFINITION", "SRC-NIDDK-HEALTHY-WEIGHT", "SRC-AMC-OBESITY", "SRC-MEDLINEPLUS-WEIGHT-GAIN"], imageId: "obs-concept" },
    { title: "체중과 함께 달라진 수면·약·생활을 적어 보세요", paragraphs: [
      "체중에 영향을 주는 조건은 식사와 활동만이 아닙니다. 유전과 질환, 복용 약, 수면, 스트레스, 일하는 시간이나 식품을 구하기 쉬운 환경도 관련될 수 있습니다. 변화 하나를 발견했다고 그것이 내 원인이라고 확정하지는 않습니다.",
      "기억나는 시점을 기준으로 아래 내용을 메모하면 진료 대화에 쓸 수 있습니다. 매일 체중을 재거나 먹은 것을 모두 기록해야 한다는 뜻은 아닙니다. 모르는 날짜나 수치를 추측해서 채우지 않아도 됩니다.",
    ], bullets: [
      "변화 시기: 체중이나 옷의 맞음새가 달라진 때, 갑작스러웠는지 서서히였는지.",
      "몸의 변화: 붓기, 잠잘 때의 불편, 일상 활동의 어려움 등 함께 생긴 일.",
      "약의 변화: 처방약·일반약·보충제를 시작하거나 바꾼 시기와 이름. 임의로 끊지 않습니다.",
      "생활 여건: 근무·돌봄 일정, 수면, 식사 준비나 활동을 어렵게 하는 조건과 가능한 도움.",
    ], claimIds: ["OBS-P3-002", "OBS-P3-003", "OBS-P3-004"], sourceIds: ["SRC-NIDDK-OBESITY-FACTORS", "SRC-MEDLINEPLUS-WEIGHT-GAIN"], tone: "note", imageId: null, links: [{ href: "/health/guides/medication-list", label: "약·보충제 이름과 변경 시기 정리하기" }, { href: "/health/tools/obesity-visit-card", label: "비만 상담에 가져갈 질문 카드" }] },
    { title: "갑작스러운 증가와 붓기는 ‘살이 쪘다’로 넘기지 마세요", paragraphs: [
      "원치 않던 체중 증가에는 수분이 몸에 쌓이는 경우도 있습니다. 뚜렷한 이유 없이 갑자기 늘었거나 새로 붓는다면 지방이 늘었다고 단정하지 말고 의료기관에 연락해 원인과 진료 시점을 확인하세요. 체중을 빨리 줄이려고 이뇨제나 감량 제품을 스스로 시작하지 않습니다.",
      "붓기와 함께 숨이 차거나 가슴이 눌리고 조이는 불편이 있으면 즉시 119에 도움을 요청합니다. 심한 호흡곤란이나 의식 저하도 119 도움이 먼저입니다. 비만 때문이라고 여기거나 기록을 마칠 때까지 기다리지 않습니다.",
    ], claimIds: ["OBS-P3-005"], sourceIds: ["SRC-MEDLINEPLUS-WEIGHT-GAIN", "SRC-MEDLINEPLUS-LEG-SWELLING", "SRC-KDCA-CPR"], tone: "warning", imageId: null, links: [{ href: "/health/guides/danger-signals", label: "체중 문제와 별개로 먼저 대응할 위험 신호" }] },
    { title: "본인이 고른 한 가지를 돕는 생활 환경", paragraphs: [
      "식품을 마련하고 조리할 시간, 쉴 공간, 안전하게 움직일 여건은 사람마다 다릅니다. ‘더 노력해’라는 말 대신 본인이 어렵다고 느끼는 조건을 함께 살펴보세요. 본인의 동의를 받은 뒤 식사 준비를 나누거나 휴식 시간을 방해하지 않는 일을 제안할 수 있습니다.",
      "아래 그림은 가능한 도움의 예입니다. 정해진 식단·수면 시간·운동량을 지시하지 않습니다. 활동의 종류와 정도는 몸의 상태에 따라 달라질 수 있고, 통증이나 숨참이 있다면 무조건 걷기를 권하지 않습니다. 무엇을 바꿀지는 본인의 선호와 진료 안내를 함께 고려합니다.",
    ], claimIds: ["OBS-P3-003", "OBS-P3-004"], sourceIds: ["SRC-NIDDK-OBESITY-FACTORS", "SRC-NIDDK-OBESITY-TREATMENT", "SRC-NIDDK-WEIGHT-CONVERSATION"], imageId: "obs-action" },
    { title: "치료 목표는 체중 숫자 하나로 정하지 않습니다", paragraphs: [
      "비만은 혈압·혈당·수면 중 호흡 문제·관절 불편 등과 관련될 수 있지만, 비만이라는 말만으로 이런 질환이 모두 있다는 뜻은 아닙니다. 현재 증상과 검사 결과, 개인 이력을 살펴 필요한 평가를 의료진과 정합니다.",
      "식사와 활동 조정, 전문적인 체중 관리, 약물이나 수술 등 치료 선택지가 있습니다. 모두에게 같은 방법이 필요하지는 않습니다. 이 페이지는 치료 대상 기준이나 약 이름·용량, 목표 체중·감량 속도를 정하지 않습니다. 나이와 질환, 현재 치료, 생활 여건에 맞는 계획을 담당 의료진과 상의합니다.",
      "인터넷의 빠른 감량 약속보다 어떤 도움을 받을 수 있는지, 기대 효과와 부담은 무엇인지, 어떻게 경과를 볼지 질문하세요. 체중뿐 아니라 일상에서 달라지기를 바라는 불편도 이야기할 수 있습니다. 약을 먹은 뒤 체중이 변했다면 시기를 알리고 처방 의료진에게 확인하되 스스로 중단하지 않습니다.",
    ], claimIds: ["OBS-P3-003", "OBS-P3-004"], sourceIds: ["SRC-NIDDK-OBESITY-RISKS", "SRC-NIDDK-OBESITY-TREATMENT", "SRC-NIDDK-WEIGHT-CONVERSATION", "SRC-MEDLINEPLUS-WEIGHT-GAIN"], imageId: null, links: [{ href: "/health/type-2-diabetes", label: "혈당 검사를 함께 설명받았다면" }, { href: "/health/sleep-apnea", label: "코골이와 수면 중 호흡 문제가 걱정된다면" }] },
    { title: "상담에 가져갈 질문과 원하는 도움", bullets: [
      "제 체중 변화와 현재 불편을 설명할 때 더 확인할 자료가 있나요?",
      "몸의 상태와 생활 여건에 맞춰 무엇부터 바꾸고, 어떤 지원을 받을 수 있나요?",
      "제게 제안하는 치료의 이점·위험과 경과를 확인할 방법은 무엇인가요?",
      "가족이 도울 수 있는 일과 제가 혼자 결정하고 싶은 부분을 함께 말씀드려도 될까요?",
    ], paragraphs: ["질문은 전부 할 필요 없이 중요한 것부터 고릅니다. 이미 받은 결과표나 약 목록이 있으면 활용하고, 기록이 부족하다고 진료를 미루지는 마세요."], claimIds: ["OBS-P3-003", "OBS-P3-004"], sourceIds: ["SRC-NIDDK-OBESITY-TREATMENT", "SRC-NIDDK-WEIGHT-CONVERSATION"], tone: "note", imageId: null, links: [{ href: "/health/guides/appointment-questions", label: "가장 중요한 진료 질문부터 고르는 방법" }] },
  ],
  faq: [
    { question: "BMI가 같으면 건강 위험도 같나요?", answer: "그렇지 않습니다. 근육량과 지방의 위치, 나이, 질환과 검사 결과가 다를 수 있습니다. BMI는 쓸모 있는 참고 자료지만 개인 건강 전체를 대신하지는 않습니다.", claimIds: ["OBS-P3-002", "OBS-P3-003"], sourceIds: ["SRC-NIDDK-HEALTHY-WEIGHT", "SRC-AMC-OBESITY"] },
    { question: "허리둘레로 내장지방량을 알 수 있나요?", answer: "복부 지방과 관련된 위험을 살피는 데 도움이 되지만 정확한 내장지방량을 직접 측정하는 방법은 아닙니다. 한 번 잰 숫자나 이 페이지의 개념도로 개인의 지방량을 판정하지 않습니다.", claimIds: ["OBS-P3-002"], sourceIds: ["SRC-NIDDK-HEALTHY-WEIGHT", "SRC-AMC-OBESITY"] },
    { question: "체중은 의지가 부족해서 늘어나는 건가요?", answer: "그렇게 단정할 수 없습니다. 생활 조건 외에도 유전·질환·수면·약 등 여러 요인이 관련됩니다. 비난보다 어떤 변화가 있었고 어떤 도움이 가능한지 살핍니다.", claimIds: ["OBS-P3-001", "OBS-P3-003"], sourceIds: ["SRC-NIDDK-OBESITY-FACTORS", "SRC-NIDDK-WEIGHT-CONVERSATION"] },
    { question: "약을 바꾼 뒤 체중이 늘었는데 끊어야 하나요?", answer: "약이 영향을 줄 수 있지만 시기가 겹쳤다는 이유만으로 원인을 확정할 수는 없습니다. 약 이름·변경 시기와 몸의 변화를 처방 의료진에게 알리고 확인합니다. 혼자 중단하거나 다른 약으로 바꾸지 않습니다.", claimIds: ["OBS-P3-004"], sourceIds: ["SRC-MEDLINEPLUS-WEIGHT-GAIN", "SRC-NIDDK-OBESITY-FACTORS"] },
    { question: "가족이 식사와 체중 기록을 관리해 줘야 하나요?", answer: "본인의 의사와 필요한 도움을 먼저 확인합니다. 식사 감시나 기록 강요를 치료처럼 권하지 않습니다. 함께 준비할 일과 혼자 하고 싶은 일을 물어보는 것은 비난하지 않는 대화 원칙을 응용한 편집 제안입니다.", claimIds: ["OBS-P3-001", "OBS-P3-004"], sourceIds: ["SRC-NIDDK-WEIGHT-CONVERSATION"] },
    { question: "예전 체중이 기억나지 않으면 상담하기 어렵나요?", answer: "정확하지 않은 숫자를 만들 필요는 없습니다. 기억나는 변화 시기와 갑작스러웠는지, 붓기나 수면·약·생활 변화가 함께 있었는지를 설명하세요. 기록을 완벽하게 만들려고 진료를 미루지 않습니다.", claimIds: ["OBS-P3-002", "OBS-P3-003"], sourceIds: ["SRC-MEDLINEPLUS-WEIGHT-GAIN", "SRC-NIDDK-OBESITY-FACTORS"] },
  ],
  sourceIds: [...obesitySources.map(s => s.id), "SRC-KDCA-CPR"],
  imageIds: ["obs-hero", "obs-concept", "obs-action"],
  visuals: {
    "obs-hero": { src: "/images/onurim/obesity/hero.webp", alt: "기록 용지와 원형 표지로 건강 상담 준비를 상징하는 장식 삽화", caption: "표지의 색과 원은 개인 체형이나 체지방률·진단 결과를 뜻하지 않습니다.", width: 1536, height: 1024 },
    "obs-concept": { src: "/images/onurim/obesity/concept-v2.webp", alt: "복부 단면에서 근육 벽 바깥의 피하지방과 벽 안 장 사이의 내장·장간막 지방 위치를 구분한 개념도", caption: "바깥쪽 노란 층은 피부 아래·근육 벽 밖의 피하지방, 안쪽 장 사이 노란 부분은 내장·장간막 지방을 상징합니다. 위치를 단순화한 그림이며 실제 검사 영상·지방량·정상 기준이 아닙니다. BMI나 허리둘레만으로 이 모양을 알 수는 없습니다.", width: 1536, height: 1024 },
    "obs-action": { src: "/images/onurim/obesity/action-v2.webp", alt: "가족이 식사 준비를 나누는 장면, 조용한 침실을 지키는 장면, 성인 두 사람이 평평한 길에서 동행하는 장면", caption: "동의를 받고 식사 준비·휴식 여건·가능한 동행을 돕는 예입니다. 그림의 음식과 활동은 정해진 식단·운동량이나 감량 효과를 뜻하지 않으며 개인의 상태와 선택에 따라 달라집니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["obesity-visit-card"],
};
