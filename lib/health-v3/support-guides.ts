import type { HealthSource } from "./content";

export type HealthSupportGuide = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  sourceCheckedAt?: string;
  sections: Array<{
    id?: string;
    title: string; paragraphs?: string[]; bullets?: string[]; tone?: "default" | "warning" | "note";
    sourceIds?: string[];
    table?: { caption: string; columns: string[]; rows: string[][] };
    links?: Array<{ href: string; label: string }>;
  }>;
  faqTitle?: string;
  faq?: Array<{ question: string; answer: string; sourceIds: string[] }>;
  sources: HealthSource[];
};

const retrievedAt = "2026-08-26";

export const healthSupportGuides: HealthSupportGuide[] = [
  {
    slug: "danger-signals",
    title: "이런 위험 신호라면 글보다 119가 먼저입니다",
    seoTitle: "응급 위험 신호: 바로 119를 부를 때와 신고 후 전할 내용",
    description: "갑작스러운 마비·말 이상, 심근경색 의심 증상, 심한 호흡곤란·의식 변화에는 즉시 119에 연락합니다. 잠깐 호전돼도 미루지 않을 이유와 119 신고·109 상담의 차이를 확인하세요.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "도움을 요청하기 전 망설이게 되는 질문",
    sections: [
      { id: "urgent-action", title: "지금 나타났다면 즉시 119", paragraphs: ["아래 신호 중 하나라도 나타나면 글을 끝까지 읽거나 병명을 확정하려 하지 말고 즉시 119에 연락합니다. 모든 신호를 갖출 필요는 없습니다. 목록에 없다고 안전을 보장하는 안내도 아닙니다."],
        bullets: [
          "갑자기 한쪽 얼굴·팔·다리의 힘이나 감각이 달라짐, 말하거나 이해하기 어려움, 시야 이상, 어지럼, 걷기·균형의 어려움, 또는 원인을 알 수 없는 갑작스러운 심한 두통",
          "가슴이 조이거나 짓눌리는 통증·압박감, 팔·목·턱 등으로 퍼지는 가슴 통증, 또는 심근경색이 의심되는 불편 — 심한 통증만 기다리지 않음",
          "헐떡이거나 말을 내기 힘들 정도의 호흡곤란, 입술·피부가 창백하거나 푸르스름해짐, 또는 갑자기 반응이 떨어지거나 깨우기 어려움 — 쓰러졌는지와 무관하게 도움 요청",
        ], tone: "warning", sourceIds: ["SUP-KDCA-STROKE", "SUP-CDC-STROKE", "SUP-NHLBI-MI", "SUP-NHS-MI", "SUP-MEDLINEPLUS-EMERGENCY"] },
      { title: "잠깐 나아지거나 약하게 느껴져도 미루지 않습니다", paragraphs: [
        "갑작스러운 마비·말 이상 같은 뇌졸중 신호가 사라졌어도 집에서 안전하다고 판단하지 않습니다. 심근경색도 약하게 시작하거나 증상이 줄었다 다시 나타날 수 있습니다. 확신이 없다는 이유로, 또는 ‘몇 분 더 지켜보자’며 도움을 늦추지 마세요.",
        "직접 운전하거나 가족이 올 때까지 기다리지 않습니다. 혈압·맥박을 재거나 인터넷 증상표와 맞춰 보느라 신고를 미루지 않습니다. 이 글은 증상으로 병을 확정하는 검사가 아니라 도움 요청의 출발점입니다.",
      ], sourceIds: ["SUP-CDC-STROKE", "SUP-NHLBI-MI"], links: [
        { href: "/health/stroke", label: "평소에 알아둘 뇌졸중의 갑작스러운 신호" },
        { href: "/health/acute-myocardial-infarction", label: "심한 흉통만 기다리면 안 되는 이유" },
      ] },
      { title: "마음의 위기: 지금 구조가 필요한지 먼저", paragraphs: [
        "이미 자신을 해치는 행동이 있었거나 자신·다른 사람의 안전을 당장 지키기 어렵다면 즉시 119에 연락합니다. 본인이 위험하면 곁의 믿을 만한 사람에게 도움을 요청하세요. 돕는 사람도 자신의 안전을 확보하고, 안전하게 함께 있을 수 있다면 혼자 두지 말고 구조 안내를 따릅니다.",
        "자살 생각이나 관련 위기로 상담이 필요할 때는 24시간 자살예방 상담전화 109를 이용할 수 있습니다. 109 상담은 당장 필요한 응급 구조를 대신하지 않습니다. 상담 연결을 기다리느라 긴급 신고를 늦추지 않습니다.",
      ], tone: "warning", sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY", "SUP-MOHW-109"], links: [{ href: "/health/depression", label: "평소 우울 신호와 주변의 도움을 이해하기" }] },
      { title: "119에 먼저 전화한 뒤, 아는 사실을 전하세요", paragraphs: [
        "정리된 기록이 없어도 신고합니다. 통화 중 질문을 듣고 아는 범위에서 답하세요. 위치를 정확히 모르면 주변 건물 이름이나 표지처럼 찾을 수 있는 단서를 전합니다. 아래 표를 채우거나 주소·약 이름을 완벽히 알아낸 뒤 전화하라는 뜻이 아닙니다.",
      ], table: { caption: "신고 후 전달할 정보 — 사전 작성표가 아닙니다", columns: ["알려줄 내용", "전달하는 방법"], rows: [
        ["환자가 있는 곳", "주소·건물·주변 표지 등 현재 위치를 알 수 있는 정보"],
        ["지금 보이는 변화", "어디가 어떻게 불편한지, 반응·호흡이 평소와 다른지"],
        ["알고 있는 배경", "나이·주요 질환·복용약을 아는 범위에서; 모르면 모른다고 답하기"],
        ["연락과 변화", "요청받은 연락처, 통화 중 새로 생기거나 달라지는 상태"],
      ] }, sourceIds: ["SUP-NFA-119"] },
      { title: "기다리는 동안도 전화 안내를 따릅니다", paragraphs: [
        "소방청은 구급차가 오는 동안 통화를 유지하며 의료지도를 받도록 안내합니다. 반응이나 호흡이 달라지면 바로 알리세요. 이 페이지의 짧은 설명으로 응급처치 방법·자세·약을 스스로 정하지 않습니다.",
        "심근경색이 의심된다고 아스피린이나 다른 약을 찾고 효과를 보느라 신고를 늦추지 않습니다. 약을 쓸지와 어떻게 할지는 119·의료진의 상황별 안내를 받습니다. 평소 처방약이 모두 금지라는 뜻도 아닙니다.",
      ], sourceIds: ["SUP-NFA-119", "SUP-NHLBI-MI", "SUP-NHS-MI"] },
      { title: "이 목록 밖의 불편은 어떻게 하나요?", paragraphs: [
        "이 페이지는 성인의 대표적인 응급 신호를 다루며 모든 질환·상황을 나열하지 않습니다. 멈추지 않는 출혈이나 갑작스러운 심한 통증 등 다른 응급상황도 있습니다. 당장 위급하다고 느끼거나 안전이 걱정되면 119에 현재 상황을 설명합니다.",
        "새로 숨이 차거나 평소보다 갑자기 더 숨이 찬 경우에는 위의 심각한 모습이 아니어도 신속히 의료기관에 연락해 평가받습니다. 심한 호흡곤란이나 다른 응급 신호가 있으면 119가 먼저입니다.",
        "급한 상황이 아니더라도 새로 생긴 불편이 계속되거나 일상에 영향을 주면 의료기관에 문의해 진료 시점과 악화 시 행동을 확인하세요. 예약일이 있다고 새 위험 신호를 그때까지 기다리는 것은 아닙니다. 어린이·임신 중·큰 사고 상황의 세부 판단은 이 성인 요약으로 대신하지 않습니다.",
      ], sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY", "SUP-NFA-119", "SUP-NHS-MI"], links: [
        { href: "/health/guides/symptom-journal", label: "급하지 않은 때 진료에 가져갈 증상 기록" },
        { href: "/health/guides/appointment-questions", label: "진료 시점·악화 시 행동을 확인할 질문" },
      ] },
    ],
    faq: [
      { question: "한 가지 증상만 있어도 119에 연락하나요?", answer: "위의 응급 신호를 모두 갖출 필요는 없습니다. 특히 갑작스러운 마비·말 이상·시야·어지럼·균형 변화 등은 각각 도움을 요청할 신호입니다. 증상 수를 세며 기다리지 않습니다.", sourceIds: ["SUP-CDC-STROKE", "SUP-KDCA-STROKE"] },
      { question: "지금은 괜찮아졌는데 지켜봐도 되나요?", answer: "갑작스러운 뇌졸중 신호나 심근경색 의심 증상이 잠깐 줄었다는 이유로 안전을 정하지 않습니다. 증상이 있었다는 사실을 119에 알리고 안내를 받습니다.", sourceIds: ["SUP-CDC-STROKE", "SUP-NHLBI-MI"] },
      { question: "109에 먼저 상담하면 119를 안 불러도 되나요?", answer: "당장 자신이나 다른 사람의 안전을 지키기 어렵거나 이미 자신을 해치는 행동이 있었다면 즉시 119가 우선입니다. 109는 24시간 자살예방 상담이며 긴급 구조를 기다리게 하는 선행 절차가 아닙니다.", sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY", "SUP-MOHW-109"] },
      { question: "정확한 주소나 약 이름을 몰라도 신고할 수 있나요?", answer: "먼저 신고하고 주변 건물·표지, 현재 보이는 변화와 아는 정보를 전합니다. 모르는 내용은 모른다고 답하고 전화 안내를 따릅니다. 기록을 완성하느라 신고를 늦추지 않습니다.", sourceIds: ["SUP-NFA-119"] },
      { question: "목록에 없으면 응급상황이 아닌가요?", answer: "아닙니다. 대표 신호만 다룬 요약이며 목록에 없다고 안전을 보장하지 않습니다. 위급함이나 현재 안전이 걱정되면 119에 상황을 설명하고, 다른 지속적인 불편도 진료 시점을 문의하세요.", sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY"] },
    ],
    sources: [
      { id: "SUP-KDCA-STROKE", organization: "질병관리청 국가건강정보포털", title: "뇌졸중", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5495", sourceDate: "2026-04-29 (업데이트)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHLBI-MI", organization: "NIH/NHLBI", title: "Heart Attack Symptoms", url: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms", sourceDate: "2022-03-24 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-MOHW-109", organization: "보건복지부", title: "자살예방 정책 추진 — 24시간 상담전화109", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "페이지 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-CDC-STROKE", organization: "CDC", title: "Signs and Symptoms of Stroke", url: "https://www.cdc.gov/stroke/signs-symptoms/index.html", sourceDate: "2026-05-19 (페이지 표시일)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHS-MI", organization: "NHS", title: "Heart attack", url: "https://www.nhs.uk/conditions/heart-attack/", sourceDate: "2026-03-31 (Page last reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-NFA-119", organization: "소방청", title: "119 구급신고 요령", url: "https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/", sourceDate: "페이지 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-MEDLINEPLUS-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date; 참고문헌접근일과 구분)", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "measuring-blood-pressure",
    title: "혈압 제대로 재는 방법",
    description: "한 번의 숫자에 놀라기 전에 같은 조건에서 잴 수 있도록 준비·자세·기록을 나눕니다.",
    sections: [
      { title: "재기 전", bullets: ["운동·흡연·카페인 음료 직후는 피합니다.", "화장실을 다녀오고 조용히 앉아 쉽니다.", "옷 위가 아닌 맨팔에 맞는 크기의 위팔 커프를 사용합니다."] },
      { title: "재는 동안", bullets: ["등과 팔을 받치고 두 발을 바닥에 둡니다.", "팔은 심장 높이에서 받치고 말하지 않습니다.", "기기 설명서와 의료진의 측정 계획을 따릅니다."] },
      { title: "남길 기록", bullets: ["날짜와 시각", "측정값과 당시 증상", "평소와 달랐던 활동·수면·복용 상황"] },
      { title: "숫자보다 먼저 볼 때", paragraphs: ["새롭고 심한 가슴 통증, 숨쉬기 어려움, 갑작스러운 한쪽 마비나 말 이상이 있으면 측정을 반복하지 말고 119 도움을 우선합니다."], tone: "warning" },
    ],
    sources: [
      { id: "SUP-AHA-BP", organization: "American Heart Association", title: "Home Blood Pressure Monitoring", url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home", sourceDate: "2025", retrievedAt },
      { id: "SUP-CDC-BP", organization: "CDC", title: "About High Blood Pressure", url: "https://www.cdc.gov/high-blood-pressure/about/", sourceDate: "2026", retrievedAt },
    ],
  },
  {
    slug: "understanding-hba1c",
    title: "당화혈색소(HbA1c), 검사표의 NGSP·IFCC부터 읽기",
    seoTitle: "당화혈색소 HbA1c 뜻: NGSP·IFCC와 공복혈당 차이",
    description: "HbA1c가 보여 주는 기간, NGSP·IFCC 단위와 공복혈당의 차이를 비교합니다. 결과표에서 확인할 항목과 수치가 엇갈릴 때 의료진에게 물을 질문을 정리했습니다.",
    publishedAt: "2026-08-26",
    updatedAt: "2026-09-06",
    sourceCheckedAt: "2026-09-06",
    sections: [
      {
        title: "HbA1c는 오늘 혈당의 다른 이름이 아닙니다",
        paragraphs: ["당화혈색소는 적혈구 속 혈색소에 포도당이 붙은 형태를 말합니다. HbA1c 검사는 대략 지난 3개월의 평균적인 혈당 상태를 이해하는 데 쓰입니다. 한 시점에 잰 혈당과는 보는 기간이 다릅니다.", "검사표에 낯선 약자가 보이면 숫자의 크기부터 비교하지 말고 검사명과 단위를 먼저 찾으세요."],
        sourceIds: ["SUP-AMC-A1C", "SUP-NIDDK-A1C"],
      },
      {
        title: "NGSP·IFCC: 같은 HbA1c라도 보고 단위가 다릅니다",
        paragraphs: ["NGSP와 IFCC는 HbA1c 측정·보고를 표준화하는 체계와 관련된 이름입니다. NGSP는 병명이나 위험 등급이 아닙니다. 검사표에 NGSP와 IFCC가 함께 있어도 두 숫자를 같은 척도로 비교하면 안 됩니다."],
        table: {
          caption: "검사표의 이름·단위·시간 범위 비교 — 진단 기준표가 아닙니다",
          columns: ["검사표 표기", "단위", "무엇을 구분하나요"],
          rows: [
            ["HbA1c (NGSP)", "%", "최근 수개월의 평균적인 혈당 상태를 반영하는 당화혈색소 보고값"],
            ["HbA1c (IFCC)", "mmol/mol", "HbA1c의 다른 보고 체계. NGSP %와 숫자를 그대로 비교하지 않음"],
            ["공복혈당", "mg/dL 또는 mmol/L", "금식 후 채혈한 한 시점의 혈당. mmol/mol인 IFCC와도 단위가 다름"],
          ],
        },
        sourceIds: ["SUP-NGSP-IFCC", "SUP-NIDDK-A1C"],
      },
      {
        title: "결과표에서는 이 순서로 표시해 두세요",
        paragraphs: ["예시: ‘검사명 HbA1c(NGSP) → 단위 % → 검사 날짜 → 이전 같은 표기의 결과 → 의료진 설명’. 실제 환자의 검사표가 아닌 읽는 순서 예시이며, 정상·위험을 가르는 수치는 넣지 않았습니다."],
        bullets: ["HbA1c인지 공복혈당인지 검사 이름에 표시합니다.", "숫자 옆 단위를 그대로 적습니다. 모르는 약자는 추측해서 바꾸지 않습니다.", "검사 날짜가 다른 결과는 날짜까지 함께 가져갑니다.", "검사실의 참고범위와 의료진이 정한 개인 목표를 같은 말로 취급하지 않습니다."],
        links: [{ href: "/health/guides/reading-health-results", label: "검사명·참고범위·추적 계획을 결과지에서 찾는 법" }],
        sourceIds: ["SUP-NGSP-IFCC", "SUP-NIDDK-A1C"],
      },
      {
        title: "공복혈당과 맞지 않아 보일 때",
        paragraphs: ["두 검사는 서로 다른 정보를 줍니다. 결과가 엇갈린다고 어느 한쪽을 곧바로 틀렸다고 판단하지 마세요. 의료진이 검사 시점과 건강 상태를 함께 확인하고 필요한 재검을 정합니다.", "적혈구 상태나 검사 방법 때문에 HbA1c 해석이 달라질 수도 있습니다. 빈혈의 종류, 최근 출혈·수혈, 임신, 콩팥 질환 등을 진료 때 알려 주세요. 모든 빈혈이 결과를 같은 방향으로 바꾸는 것은 아닙니다."],
        tone: "note", sourceIds: ["SUP-NIDDK-A1C", "SUP-NGSP-FACTORS"],
      },
      {
        title: "검사 원본과 함께 가져갈 세 가지 질문",
        bullets: ["‘이 표기와 단위가 이전 검사와 같은가요?’ — 두 결과표를 함께 보여 주세요.", "‘제 혈당과 HbA1c의 차이를 설명할 상황이 있나요?’ — 검사 날짜와 최근 건강 변화를 적어 갑니다.", "‘확인 검사가 필요하다면 무엇을 언제 하나요?’ — 다음 일정과 문의할 곳을 메모합니다."],
        links: [
          { href: "/health/tools/diabetes-questions", label: "제2형 당뇨병 진료 질문지 인쇄하기" },
          { href: "/health/type-2-diabetes", label: "제2형 당뇨병의 증상·검사·기록을 함께 이해하기" },
        ],
      },
      {
        title: "이 페이지가 정하지 않는 것",
        paragraphs: ["검사표 하나로 스스로 당뇨병을 확정하거나 약·인슐린을 시작, 중단, 증량하지 않습니다. 개인 목표와 재검 시점은 담당 의료진에게 확인합니다. 다른 사람의 결과나 목표를 그대로 적용하지 마세요."],
        links: [{ href: "/health/guides/danger-signals", label: "온라인 설명보다 도움 요청이 먼저인 위험 신호" }],
        sourceIds: ["SUP-NIDDK-A1C"],
      },
    ],
    faq: [
      { question: "HbA1c NGSP라고 쓰여 있으면 별도의 질환인가요?", answer: "아닙니다. NGSP는 HbA1c 결과를 비교할 수 있도록 표준화하는 체계와 관련된 표기입니다. 병명이나 중증도 등급을 뜻하지 않습니다.", sourceIds: ["SUP-NGSP-IFCC"] },
      { question: "%와 mmol/mol 중 어느 숫자가 더 정확한가요?", answer: "숫자가 작거나 크다는 이유로 정확도를 고를 수 없습니다. 서로 다른 보고 체계이므로 원래 단위와 검사 방법을 확인해야 합니다. 단위를 지우고 결과만 비교하지 마세요.", sourceIds: ["SUP-NGSP-IFCC"] },
      { question: "HbA1c 검사 전에 꼭 굶어야 하나요?", answer: "HbA1c 검사 자체는 일반적으로 금식이 필요하지 않습니다. 다만 같은 날 공복혈당 등 다른 검사를 함께 할 수 있으므로 검사기관의 준비 안내를 확인하세요.", sourceIds: ["SUP-NIDDK-A1C"] },
      { question: "공복혈당과 HbA1c가 다르면 어느 결과를 믿어야 하나요?", answer: "한 시점의 혈당과 최근 수개월을 반영하는 HbA1c를 먼저 구분합니다. 결과가 맞지 않아 보이면 검사 날짜·원본과 건강 변화를 가져가 재검 필요성을 물어보세요.", sourceIds: ["SUP-NIDDK-A1C", "SUP-NGSP-FACTORS"] },
      { question: "HbA1c 하나만으로 제가 당뇨병인지 알 수 있나요?", answer: "HbA1c는 의료진이 진단에 사용하는 검사 중 하나지만 이 페이지가 개인 진단을 내리지는 않습니다. 증상과 검사 조건에 따라 확인 검사가 필요할 수 있습니다.", sourceIds: ["SUP-NIDDK-A1C"] },
    ],
    sources: [
      { id: "SUP-NIDDK-A1C", organization: "NIH/NIDDK", title: "The A1C Test & Diabetes", url: "https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test", sourceDate: "2018-04", retrievedAt: "2026-09-06" },
      { id: "SUP-NGSP-IFCC", organization: "NGSP", title: "IFCC Standardization: The IFCC and NGSP", url: "https://ngsp.org/ifccngsp.asp", sourceDate: "날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-NGSP-FACTORS", organization: "NGSP", title: "Factors that Interfere with HbA1c Test Results", url: "https://ngsp.org/factors.asp", sourceDate: "2026-06-23", retrievedAt: "2026-09-06" },
      { id: "SUP-AMC-A1C", organization: "서울아산병원 당뇨병센터", title: "혈당 검사 중 당화 혈색소(HbA1c)는 무엇인가요?", url: "https://www.amc.seoul.kr/asan/depts/dm/K/bbsDetail.do?contentId=271421&menuId=5110", sourceDate: "날짜 미표시", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "reading-health-results",
    title: "건강검진 결과지 처음 보는 법",
    description: "빨간 숫자를 곧바로 병명으로 바꾸지 않고, 검사명·기준·추적 계획을 차례로 확인합니다.",
    sections: [
      { title: "검사명부터 정확히", bullets: ["비슷한 이름의 검사인지 확인합니다.", "검사 날짜와 금식 여부를 적습니다.", "이전 결과와 같은 검사법인지 묻습니다."] },
      { title: "기준범위와 진단은 다릅니다", paragraphs: ["검사실 기준범위를 벗어난 값이 곧바로 질환 진단을 뜻하지는 않습니다. 증상, 병력과 다른 검사 결과를 함께 봅니다."], tone: "note" },
      { title: "한 장에 적을 질문", bullets: ["이 결과가 의미하는 가장 중요한 점은 무엇인가요?", "다시 확인할 검사와 시점은 언제인가요?", "지금 바로 바꿔야 할 행동과 기다려도 되는 일은 무엇인가요?"] },
      { title: "온라인 계산기의 한계", paragraphs: ["질환 확률이나 치료 목표를 자동 계산하는 사이트에 개인정보와 검사값을 입력하지 않습니다. 오누림 도구도 값을 서버에 보내지 않습니다."] },
    ],
    sources: [
      { id: "SUP-MEDLINEPLUS-LAB", organization: "NIH/MedlinePlus", title: "Understanding Your Lab Test Results", url: "https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/", sourceDate: "2024", retrievedAt },
      { id: "SUP-NIDDK-TESTS", organization: "NIH/NIDDK", title: "Diabetes Tests & Diagnosis", url: "https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis", sourceDate: "2022", retrievedAt },
    ],
  },
  {
    slug: "family-medication-support",
    title: "가족의 복약 관리를 도울 때 확인할 것",
    description: "감시하거나 약을 대신 정하지 않고, 당사자의 동의 아래 정확한 목록과 문의 경로를 준비합니다.",
    sections: [
      { title: "먼저 동의를 구합니다", paragraphs: ["가족이 돕더라도 약을 먹는 사람의 선택과 사생활을 존중합니다. 허락 없이 약을 버리거나 바꾸지 않습니다."] },
      { title: "목록에 적을 것", bullets: ["처방전이나 용기의 정확한 약 이름", "복용하라고 안내받은 시간", "처방 의료기관과 약국", "알레르기와 이미 겪은 이상 반응"] },
      { title: "하지 않을 일", bullets: ["증상이 좋아졌다고 중단하지 않습니다.", "놓친 용량을 임의로 두 배 복용하게 하지 않습니다.", "다른 사람의 처방약을 나누지 않습니다."] },
      { title: "문의 계획", bullets: ["약을 잊었을 때 연락할 곳", "이상 반응이 의심될 때 연락할 곳", "응급 신호가 있을 때 119를 부를 기준"] },
    ],
    sources: [
      { id: "SUP-MEDLINEPLUS-MEDICINES", organization: "NIH/MedlinePlus", title: "Medicines", url: "https://medlineplus.gov/medicines.html", sourceDate: "2025", retrievedAt },
      { id: "SUP-FDA-MED-LIST", organization: "U.S. FDA", title: "My Medicine Record", url: "https://www.fda.gov/media/73856/download", sourceDate: "2011", retrievedAt },
    ],
  },
  {
    slug: "symptom-journal",
    title: "아픈 증상을 기록하는 방법",
    description: "통증 점수 하나보다 시작 시각, 변화, 함께 나타난 신호와 일상 영향을 짧게 남깁니다.",
    sections: [
      { title: "사실과 해석을 나눕니다", bullets: ["사실: 오후 3시에 시작, 계단에서 심해짐", "해석: 심장 때문인 것 같음 — 진단처럼 적지 않고 질문으로 둡니다."] },
      { title: "네 칸이면 충분합니다", bullets: ["언제 시작했는지", "어디가 어떻게 불편한지", "무엇을 할 때 달라지는지", "함께 나타난 변화와 일상 영향"] },
      { title: "사진과 개인정보", paragraphs: ["공개 문의 채널에 신체 사진, 처방전, 검사 결과와 개인정보를 올리지 않습니다."] },
      { title: "기록을 멈출 때", paragraphs: ["의식 저하, 심한 호흡곤란, 갑작스러운 마비·말 이상처럼 위급한 변화가 있으면 기록을 완성하지 말고 119에 연락합니다."], tone: "warning" },
    ],
    sources: [
      { id: "SUP-NINDS-MIGRAINE-DIARY", organization: "NIH/NINDS", title: "Migraine", url: "https://www.ninds.nih.gov/health-information/disorders/migraine", sourceDate: "2025", retrievedAt },
      { id: "SUP-NHLBI-SLEEP-DIARY", organization: "NIH/NHLBI", title: "Sleep Diary", url: "https://www.nhlbi.nih.gov/resources/sleep-diary", sourceDate: "2025", retrievedAt },
    ],
  },
  {
    slug: "appointment-questions",
    title: "진료 전에 준비하면 좋은 질문",
    description: "진료시간에 가장 중요한 내용을 놓치지 않도록 질문을 세 묶음으로 정리합니다.",
    sections: [
      { title: "무엇을 확인하나요", bullets: ["가능한 원인과 아직 모르는 점은 무엇인가요?", "어떤 검사로 무엇을 확인하나요?", "다른 질환 가능성도 살펴야 하나요?"] },
      { title: "어떤 선택지가 있나요", bullets: ["치료 선택지의 목적과 주의점은 무엇인가요?", "제 다른 질환·약과 함께 고려할 점은 무엇인가요?", "효과와 이상 반응을 어떻게 확인하나요?"] },
      { title: "다음은 언제인가요", bullets: ["어떤 변화가 생기면 빨리 연락해야 하나요?", "다음 진료나 검사는 언제인가요?", "응급실·119를 생각할 신호는 무엇인가요?"] },
      { title: "질문을 줄여도 됩니다", paragraphs: ["가장 걱정되는 질문 세 개를 먼저 표시합니다. 모든 항목을 한 번에 해결하지 못해도 괜찮습니다."] },
    ],
    sources: [
      { id: "SUP-AHRQ-QUESTIONS", organization: "AHRQ", title: "Questions Are the Answer", url: "https://www.ahrq.gov/questions/index.html", sourceDate: "2024", retrievedAt },
      { id: "SUP-NIA-APPOINTMENT", organization: "NIH/NIA", title: "What Do I Need to Tell the Doctor?", url: "https://www.nia.nih.gov/health/medical-care-and-appointments/what-do-i-need-tell-doctor", sourceDate: "2024", retrievedAt },
    ],
  },
  {
    slug: "medication-list",
    title: "약 이름과 복용 정보를 정리하는 법",
    description: "처방약·일반약·보충제를 한 목록에 적어 진료와 약국에서 정확히 보여 줍니다.",
    sections: [
      { title: "용기에서 그대로 옮깁니다", bullets: ["제품명과 성분명", "용량 표기와 복용 안내", "처방한 곳과 시작 시점", "복용 이유를 설명받은 내용"] },
      { title: "함께 적을 것", bullets: ["일반의약품", "비타민·건강기능식품", "약 알레르기와 이상 반응"] },
      { title: "추측하지 않습니다", paragraphs: ["이름을 모르면 색·모양만으로 맞히지 말고 실제 용기나 처방전을 의료진·약사에게 보여 줍니다."] },
      { title: "공개하지 않습니다", paragraphs: ["약 목록은 개인 건강정보입니다. 공개 Issue나 공용 기기에 저장하지 말고 출력물 보관에 주의합니다."] },
    ],
    sources: [
      { id: "SUP-FDA-MED-RECORD", organization: "U.S. FDA", title: "My Medicine Record", url: "https://www.fda.gov/media/73856/download", sourceDate: "2011", retrievedAt },
      { id: "SUP-MEDLINEPLUS-DRUGS", organization: "NIH/MedlinePlus", title: "Drugs, Herbs and Supplements", url: "https://medlineplus.gov/druginformation.html", sourceDate: "2025", retrievedAt },
    ],
  },
  {
    slug: "older-parent-health-organizer",
    title: "고령 부모님 건강정보를 정리하는 방법",
    description: "가족이 대신 결정하기보다 당사자의 동의 아래 응급·진료 정보를 찾기 쉽게 정리합니다.",
    sections: [
      { title: "당사자와 함께 정합니다", paragraphs: ["무엇을 누가 볼지 먼저 합의합니다. 부모님의 선택을 무시하거나 모든 건강정보를 가족 단체방에 공유하지 않습니다."] },
      { title: "한 장의 기본 정보", bullets: ["정확한 약 목록과 알레르기", "주요 진료기관과 연락처", "평소 이동·의사소통에 필요한 도움", "응급 시 연락할 가족"] },
      { title: "진료 뒤 업데이트", bullets: ["새로 바뀐 약만 표시", "다음 진료·검사 날짜", "의료진이 말한 위험 신호", "모르는 내용은 추측하지 않고 빈칸으로 둠"] },
      { title: "보관과 공유", paragraphs: ["최소한의 정보만 안전한 장소에 보관하고, 공개 클라우드 링크나 공개 문의 채널에 올리지 않습니다."] },
    ],
    sources: [
      { id: "SUP-NIA-CAREGIVER", organization: "NIH/NIA", title: "Getting Your Affairs in Order", url: "https://www.nia.nih.gov/health/advance-care-planning/getting-your-affairs-order-checklist-documents-prepare-future", sourceDate: "2024", retrievedAt },
      { id: "SUP-NIA-DOCTOR", organization: "NIH/NIA", title: "What Do I Need to Tell the Doctor?", url: "https://www.nia.nih.gov/health/medical-care-and-appointments/what-do-i-need-tell-doctor", sourceDate: "2024", retrievedAt },
    ],
  },
];

export function getHealthSupportGuide(slug: string) {
  return healthSupportGuides.find((guide) => guide.slug === slug);
}
