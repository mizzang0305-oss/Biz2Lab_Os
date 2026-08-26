import {
  batch2HealthArticles,
  batch2HealthClaims,
  batch2HealthSources,
  batch2HealthTools,
} from "./batch2";
import {
  expansionHealthArticles,
  expansionHealthClaims,
  expansionHealthSources,
  expansionHealthTools,
} from "./public-expansion";

export type HealthSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  sourceDate: string;
  retrievedAt: string;
};

export type HealthClaim = {
  id: string;
  articleSlug: HealthArticleSlug;
  section: string;
  text: string;
  type:
    | "DEFINITION"
    | "SYMPTOM"
    | "EMERGENCY_SIGN"
    | "RISK_FACTOR"
    | "TEST"
    | "TREATMENT_OVERVIEW"
    | "PREVENTION"
    | "SELF_CARE_LIMIT"
    | "CAREGIVER_ACTION"
    | "MEASUREMENT_GUIDANCE";
  sourceIds: string[];
  clinicalReviewRequired: boolean;
  wordingRisk: "LOW" | "MEDIUM" | "HIGH";
  riskClass?: "P0_EMERGENCY" | "P1_CLINICAL" | "P2_PATIENT_EDUCATION" | "P3_EDITORIAL";
  publicReleaseDecision?: "KEEP_AS_SAFE_GENERAL_EDUCATION" | "SIMPLIFY" | "REMOVE";
  publicDecisionRationale?: string;
  lastVerified?: string;
  emergencyRelevance?: boolean;
  treatmentRelevance?: boolean;
  diagnosticRelevance?: boolean;
};

export type HealthArticleSlug =
  | "hypertension"
  | "type-2-diabetes"
  | "allergic-rhinitis"
  | "gastroesophageal-reflux-disease"
  | "osteoarthritis"
  | "osteoporosis"
  | "dyslipidemia"
  | "obesity"
  | "metabolic-dysfunction-associated-steatotic-liver-disease"
  | "irritable-bowel-syndrome"
  | "asthma"
  | "sleep-apnea"
  | "gout"
  | "migraine"
  | "kidney-stones"
  | "urinary-tract-infection"
  | "depression"
  | "anxiety-disorder"
  | "stroke"
  | "acute-myocardial-infarction";

export type HealthSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  claimIds: string[];
  tone?: "default" | "note" | "warning";
  imageId?: string | null;
};

export type HealthArticle = {
  slug: HealthArticleSlug;
  title: string;
  eyebrow: string;
  description: string;
  outcome: string;
  summary: string[];
  sections: HealthSection[];
  faq: Array<{ question: string; answer: string; claimIds: string[] }>;
  sourceIds: string[];
  imageIds: string[];
  toolSlugs: string[];
  archetype?: "BODY_SIGNAL" | "FAMILY_SITUATION" | "MYTH_FIRST" | "QUESTION_FIRST" | "SIMPLE_ANALOGY";
};

export type HealthTool = {
  slug: string;
  articleSlug: HealthArticleSlug;
  title: string;
  description: string;
  claimIds: string[];
  kind: "log" | "questions" | "checklist" | "guide" | "warning";
  fields?: string[];
  items?: string[];
  columns?: string[];
  rows?: number;
};

export const onurimTagline =
  "질환을 쉽게 이해하고, 필요한 도움을 제때 찾는 건강 안내서";

export const healthSources: HealthSource[] = [
  {
    id: "SRC-KDCA-HTN",
    organization: "질병관리청 국가건강정보포털",
    title: "고혈압",
    url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6765",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-CDC-HTN",
    organization: "CDC",
    title: "About High Blood Pressure",
    url: "https://www.cdc.gov/high-blood-pressure/about/",
    sourceDate: "2026-01-28",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-AHA-HOME-BP",
    organization: "American Heart Association",
    title: "Home Blood Pressure Monitoring",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home",
    sourceDate: "2025",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-KDCA-STROKE",
    organization: "질병관리청 국가건강정보포털",
    title: "뇌졸중에 대해서",
    url: "https://health.kdca.go.kr/healthinfo/biz/health/ccvdInfo/ccvcdInfo/cbvcacdInfoMain.do",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-KDCA-MI",
    organization: "질병관리청 국가건강정보포털",
    title: "심근경색에 대해서",
    url: "https://health.kdca.go.kr/healthinfo/biz/health/ccvdInfo/cvcdInfo/miInfoMain.do",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-KDCA-DIA",
    organization: "질병관리청 국가건강정보포털",
    title: "당뇨병",
    url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5305",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-NIDDK-T2D",
    organization: "NIH/NIDDK",
    title: "Type 2 Diabetes",
    url: "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/type-2-diabetes",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-NIDDK-A1C",
    organization: "NIH/NIDDK",
    title: "The A1C Test & Diabetes",
    url: "https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-NIDDK-TESTS",
    organization: "NIH/NIDDK",
    title: "Diabetes Tests & Diagnosis",
    url: "https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-NIDDK-LIVING",
    organization: "NIH/NIDDK",
    title: "Healthy Living with Diabetes",
    url: "https://www.niddk.nih.gov/health-information/diabetes/overview/healthy-living-with-diabetes",
    sourceDate: "페이지 표시일 미확인",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-CDC-DKA",
    organization: "CDC",
    title: "Diabetic Ketoacidosis",
    url: "https://www.cdc.gov/diabetes/about/diabetic-ketoacidosis.html",
    sourceDate: "2024-05-15",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-KDCA-CPR",
    organization: "질병관리청 국가건강정보포털",
    title: "심폐소생술",
    url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6226",
    sourceDate: "2023",
    retrievedAt: "2026-08-24",
  },
  ...batch2HealthSources,
  ...expansionHealthSources,
];

export const healthClaims: HealthClaim[] = [
  {
    id: "HTN-B1-001",
    articleSlug: "hypertension",
    section: "definition",
    text: "혈압은 혈액이 동맥 벽을 밀 때 생기는 압력이며, 고혈압은 혈압이 지속해서 정상보다 높은 상태를 말합니다.",
    type: "DEFINITION",
    sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "HTN-B1-002",
    articleSlug: "hypertension",
    section: "numbers",
    text: "혈압의 위 숫자는 심장이 피를 내보낼 때의 수축기 혈압, 아래 숫자는 심장이 쉬는 사이의 이완기 혈압을 나타냅니다.",
    type: "MEASUREMENT_GUIDANCE",
    sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "HTN-B1-003",
    articleSlug: "hypertension",
    section: "symptoms",
    text: "고혈압은 뚜렷한 경고 증상이 없는 경우가 많아 몸의 느낌만으로는 알기 어렵습니다.",
    type: "SYMPTOM",
    sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "HTN-B1-004",
    articleSlug: "hypertension",
    section: "diagnosis-limit",
    text: "혈압은 활동과 측정 조건에 따라 달라질 수 있으므로 한 번의 측정값만으로 스스로 진단하지 않습니다.",
    type: "SELF_CARE_LIMIT",
    sourceIds: ["SRC-CDC-HTN", "SRC-AHA-HOME-BP"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "HTN-B1-005",
    articleSlug: "hypertension",
    section: "why-it-matters",
    text: "높은 혈압이 오래 이어지면 심장, 뇌, 콩팥과 눈을 포함한 여러 장기에 부담을 줄 수 있습니다.",
    type: "RISK_FACTOR",
    sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "HTN-B1-006",
    articleSlug: "hypertension",
    section: "measurement-prep",
    text: "가정 혈압을 재기 전에는 흡연·카페인 음료·운동을 30분 동안 피하고, 방광을 비운 뒤 조용히 5분 정도 쉽니다.",
    type: "MEASUREMENT_GUIDANCE",
    sourceIds: ["SRC-AHA-HOME-BP"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "HTN-B1-007",
    articleSlug: "hypertension",
    section: "measurement-position",
    text: "등을 받치고 두 발을 바닥에 둔 채, 맨팔의 커프와 팔을 심장 높이에서 받치고 말하지 않으며 측정합니다.",
    type: "MEASUREMENT_GUIDANCE",
    sourceIds: ["SRC-AHA-HOME-BP"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "HTN-B1-008",
    articleSlug: "hypertension",
    section: "measurement-record",
    text: "한 번 측정할 때 1분 간격으로 두 번 재고, 날짜·시간·값과 당시 증상을 있는 그대로 기록하면 진료 대화에 도움이 됩니다.",
    type: "MEASUREMENT_GUIDANCE",
    sourceIds: ["SRC-AHA-HOME-BP"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "HTN-B1-009",
    articleSlug: "hypertension",
    section: "management",
    text: "고혈압 관리는 식사, 신체 활동, 금연, 체중과 스트레스 관리, 그리고 개인에게 처방된 약물 치료를 함께 고려할 수 있습니다.",
    type: "TREATMENT_OVERVIEW",
    sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "HTN-B1-010",
    articleSlug: "hypertension",
    section: "medicine-limit",
    text: "증상이 없거나 측정값이 좋아졌다는 이유로 처방약의 용량을 바꾸거나 중단하지 말고 처방 의료진과 상의합니다.",
    type: "SELF_CARE_LIMIT",
    sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "HTN-B1-011",
    articleSlug: "hypertension",
    section: "emergency-heart",
    text: "새로 생긴 심한 가슴 통증이나 압박감, 심한 호흡곤란, 식은땀 또는 의식 저하가 있으면 측정을 반복하며 기다리지 말고 119에 도움을 요청합니다.",
    type: "EMERGENCY_SIGN",
    sourceIds: ["SRC-KDCA-MI"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "HTN-B1-012",
    articleSlug: "hypertension",
    section: "emergency-brain",
    text: "얼굴이나 한쪽 팔다리의 갑작스러운 힘 빠짐, 말이 어눌해지거나 이해하기 어려운 변화가 생기면 즉시 119에 도움을 요청합니다.",
    type: "EMERGENCY_SIGN",
    sourceIds: ["SRC-KDCA-STROKE"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "HTN-B1-013",
    articleSlug: "hypertension",
    section: "family",
    text: "가족은 측정 환경과 기록을 함께 준비하고, 갑작스러운 응급 신호가 나타나면 기록 정리보다 도움 요청을 우선할 수 있습니다.",
    type: "CAREGIVER_ACTION",
    sourceIds: ["SRC-AHA-HOME-BP", "SRC-KDCA-MI", "SRC-KDCA-STROKE"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "DIA-B1-001",
    articleSlug: "type-2-diabetes",
    section: "definition",
    text: "제2형 당뇨병은 몸이 인슐린을 충분히 만들지 못하거나 잘 사용하지 못해 혈액 속 포도당이 높은 상태가 이어지는 질환입니다.",
    type: "DEFINITION",
    sourceIds: ["SRC-KDCA-DIA", "SRC-NIDDK-T2D"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "DIA-B1-002",
    articleSlug: "type-2-diabetes",
    section: "analogy",
    text: "포도당은 세포가 쓰는 연료이고 인슐린은 그 연료가 세포 안에서 쓰이도록 돕는 신호에 비유할 수 있지만, 실제 몸의 작용은 이보다 복잡합니다.",
    type: "DEFINITION",
    sourceIds: ["SRC-NIDDK-T2D"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "DIA-B1-003",
    articleSlug: "type-2-diabetes",
    section: "symptoms",
    text: "갈증과 잦은 소변, 피로, 흐린 시야, 손발 저림, 잘 낫지 않는 상처 같은 증상이 나타날 수 있습니다.",
    type: "SYMPTOM",
    sourceIds: ["SRC-KDCA-DIA", "SRC-NIDDK-T2D"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "DIA-B1-004",
    articleSlug: "type-2-diabetes",
    section: "symptoms-limit",
    text: "제2형 당뇨병의 증상은 천천히 생기거나 매우 약할 수 있고, 아무 증상이 없는 사람도 있습니다.",
    type: "SYMPTOM",
    sourceIds: ["SRC-NIDDK-T2D"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  {
    id: "DIA-B1-005",
    articleSlug: "type-2-diabetes",
    section: "risk",
    text: "가족력, 나이, 신체 활동, 과체중·비만, 고혈압, 당뇨병 전단계나 임신성 당뇨병 병력 등 여러 요인이 제2형 당뇨병 위험과 관련될 수 있습니다.",
    type: "RISK_FACTOR",
    sourceIds: ["SRC-NIDDK-T2D"],
    clinicalReviewRequired: true,
    wordingRisk: "MEDIUM",
  },
  {
    id: "DIA-B1-006",
    articleSlug: "type-2-diabetes",
    section: "diagnosis-limit",
    text: "당뇨병 진단은 의료기관의 혈액검사와 상황에 맞는 확인 절차로 이루어지며, 증상 하나나 가정 측정 한 번으로 스스로 진단하지 않습니다.",
    type: "SELF_CARE_LIMIT",
    sourceIds: ["SRC-NIDDK-TESTS", "SRC-NIDDK-A1C"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-007",
    articleSlug: "type-2-diabetes",
    section: "fasting-glucose",
    text: "공복혈당 검사는 보통 최소 8시간 금식한 뒤 한 시점의 혈당을 확인하는 혈액검사입니다.",
    type: "TEST",
    sourceIds: ["SRC-NIDDK-TESTS"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-008",
    articleSlug: "type-2-diabetes",
    section: "a1c",
    text: "당화혈색소(HbA1c)는 대략 지난 3개월의 평균 혈당 수준에 관한 정보를 주는 혈액검사입니다.",
    type: "TEST",
    sourceIds: ["SRC-NIDDK-A1C"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-009",
    articleSlug: "type-2-diabetes",
    section: "test-limit",
    text: "검사 결과의 의미와 재검 필요 여부는 증상, 임신, 빈혈이나 다른 건강 상태의 영향을 함께 보는 의료진이 판단합니다.",
    type: "SELF_CARE_LIMIT",
    sourceIds: ["SRC-NIDDK-A1C", "SRC-NIDDK-TESTS"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-010",
    articleSlug: "type-2-diabetes",
    section: "management",
    text: "제2형 당뇨병 관리는 식사, 신체 활동, 수면, 금연과 개인에게 처방된 약물 치료를 포함할 수 있으며 건강관리팀과 계획을 맞춥니다.",
    type: "TREATMENT_OVERVIEW",
    sourceIds: ["SRC-NIDDK-T2D", "SRC-NIDDK-LIVING"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-011",
    articleSlug: "type-2-diabetes",
    section: "medicine-limit",
    text: "기록한 혈당값을 근거로 처방약이나 인슐린의 용량을 스스로 바꾸거나 중단하지 않습니다.",
    type: "SELF_CARE_LIMIT",
    sourceIds: ["SRC-NIDDK-T2D"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-012",
    articleSlug: "type-2-diabetes",
    section: "emergency",
    text: "당뇨병이 있는 사람이 반복해서 토해 물도 마시기 어렵거나, 숨쉬기 힘들거나, 의식이 흐려지는 등 상태가 빠르게 나빠지면 즉시 응급 의료 도움을 받고, 반응이 없거나 생명이 위급하면 119에 신고합니다.",
    type: "EMERGENCY_SIGN",
    sourceIds: ["SRC-CDC-DKA", "SRC-KDCA-CPR"],
    clinicalReviewRequired: true,
    wordingRisk: "HIGH",
  },
  {
    id: "DIA-B1-013",
    articleSlug: "type-2-diabetes",
    section: "family",
    text: "가족은 음식이나 숫자를 감시하기보다 당사자의 선택을 존중하면서 기록과 진료 질문 준비를 도울 수 있습니다.",
    type: "CAREGIVER_ACTION",
    sourceIds: ["SRC-NIDDK-LIVING"],
    clinicalReviewRequired: false,
    wordingRisk: "LOW",
  },
  ...batch2HealthClaims,
  ...expansionHealthClaims,
];

export const healthArticles: Record<HealthArticleSlug, HealthArticle> = {
  hypertension: {
    slug: "hypertension",
    title: "고혈압, 숫자에 놀라기 전에 기록부터",
    eyebrow: "심장·혈관 · 비공개 파일럿",
    description: "혈압 숫자의 뜻, 집에서 더 안정적으로 재는 방법, 기록과 진료 질문을 차근차근 정리합니다.",
    outcome: "혈압을 이해하고, 같은 조건에서 기록하고, 진료에서 확인할 질문을 준비합니다.",
    summary: [
      "고혈압은 증상만으로 알아차리기 어려워 측정이 필요합니다.",
      "한 번의 숫자로 혼자 진단하거나 약을 바꾸지 않습니다.",
      "측정 조건과 증상을 함께 기록하면 진료 대화가 더 구체적이 됩니다.",
    ],
    sections: [
      {
        title: "한 문장으로 이해하기",
        paragraphs: [
          "혈압은 피가 혈관 벽을 미는 힘입니다. 그 힘이 계속 높은 상태가 고혈압입니다.",
        ],
        claimIds: ["HTN-B1-001"],
      },
      {
        title: "아이에게 설명한다면",
        paragraphs: [
          "심장은 물을 보내는 펌프, 혈관은 부드러운 길이라고 생각해 보세요. 압력이 너무 높은 채 오래 이어지면 길과 연결된 곳들이 부담을 받습니다. 몸은 호스보다 훨씬 복잡하지만 ‘압력이 오래 높으면 부담이 된다’는 부분을 이해하는 데 도움이 되는 비유입니다.",
        ],
        claimIds: ["HTN-B1-001", "HTN-B1-005"],
        tone: "note",
      },
      {
        title: "위 숫자와 아래 숫자",
        paragraphs: [
          "혈압계에는 숫자가 두 개 보입니다. 위 숫자는 심장이 피를 내보낼 때, 아래 숫자는 심장이 다음 박동을 준비하며 쉬는 사이의 압력을 나타냅니다.",
          "어떤 범위를 목표로 할지는 나이, 질환, 임신 여부와 치료 상황에 따라 달라질 수 있어 이 페이지는 개인 목표를 정하지 않습니다.",
        ],
        claimIds: ["HTN-B1-002", "HTN-B1-004"],
      },
      {
        title: "아무 느낌이 없어도 재는 이유",
        paragraphs: [
          "고혈압은 아프거나 어지러운 느낌이 없는 경우가 많습니다. 반대로 두통이 있다고 원인이 반드시 혈압인 것도 아닙니다. 느낌 대신 올바른 방법으로 잰 기록과 의료진의 판단이 필요합니다.",
        ],
        claimIds: ["HTN-B1-003", "HTN-B1-004"],
      },
      {
        title: "측정 전 5분이 기록의 질을 바꿉니다",
        bullets: [
          "측정 30분 전에는 흡연, 카페인 음료와 운동을 피합니다.",
          "화장실을 다녀온 뒤 조용한 곳에서 5분 정도 쉽니다.",
          "등을 기대고 발을 바닥에 둡니다. 다리는 꼬지 않습니다.",
          "혈압계 팔띠(커프)는 옷 위가 아닌 맨팔에 두고 팔을 심장 높이에서 받칩니다.",
          "측정 중에는 말하거나 휴대전화를 보지 않습니다.",
        ],
        claimIds: ["HTN-B1-006", "HTN-B1-007"],
      },
      {
        title: "무엇을 기록할까요?",
        paragraphs: [
          "날짜와 시간, 위·아래 혈압 숫자(수축기·이완기), 맥박, 쉬기 전후, 증상과 이미 처방받아 복용한 약 여부를 적습니다. 한 번에 1분 간격으로 두 번 측정한 원래 값을 남기고 평균을 임의로 치료 판단에 사용하지 않습니다.",
        ],
        claimIds: ["HTN-B1-008", "HTN-B1-010"],
      },
      {
        title: "진료에서 확인할 질문",
        bullets: [
          "이 기록에서 제가 꼭 확인해야 할 패턴은 무엇인가요?",
          "집에서 잴 때 자세나 커프 크기를 어떻게 확인할까요?",
          "제게 맞는 측정 횟수와 시간대는 어떻게 정하나요?",
          "복용 중인 약과 관련해 확인할 점은 무엇인가요?",
        ],
        claimIds: ["HTN-B1-004", "HTN-B1-008", "HTN-B1-010"],
      },
      {
        title: "생활 관리와 약은 역할이 다릅니다",
        paragraphs: [
          "식사, 활동, 흡연, 체중과 스트레스 같은 생활 요소를 살피는 일은 관리의 한 부분입니다. 처방약이 필요한 사람도 있으며, 수치가 좋아졌다고 스스로 용량을 줄이거나 중단해서는 안 됩니다.",
        ],
        claimIds: ["HTN-B1-009", "HTN-B1-010"],
      },
      {
        title: "기록보다 119가 먼저인 때",
        bullets: [
          "새로 생긴 심한 가슴 통증이나 압박감, 심한 호흡곤란, 식은땀 또는 의식 저하",
          "얼굴이나 한쪽 팔다리의 갑작스러운 힘 빠짐, 말이 어눌해지거나 이해하기 어려운 변화",
        ],
        claimIds: ["HTN-B1-011", "HTN-B1-012"],
        tone: "warning",
      },
      {
        title: "가족은 ‘감시’보다 준비를 돕습니다",
        paragraphs: [
          "측정 시간을 함께 정하고 기록지를 찾기 쉬운 곳에 둡니다. 진료 전에는 혈압계 정보와 복용 약 목록, 궁금한 점을 함께 정리합니다. 응급 신호가 보이면 기록을 완성하려 하지 말고 도움 요청을 우선합니다.",
        ],
        claimIds: ["HTN-B1-013"],
      },
    ],
    faq: [
      {
        question: "한 번 높게 나오면 고혈압인가요?",
        answer: "아닙니다. 측정 조건과 반복 결과를 의료진이 함께 판단합니다. 값이 걱정되면 원래 기록을 가지고 상담하세요.",
        claimIds: ["HTN-B1-004", "HTN-B1-008"],
      },
      {
        question: "머리가 아프지 않으면 괜찮은가요?",
        answer: "고혈압은 뚜렷한 증상이 없는 경우가 많아 두통 유무만으로 판단할 수 없습니다.",
        claimIds: ["HTN-B1-003"],
      },
      {
        question: "약을 먹고 수치가 좋아졌는데 쉬어도 되나요?",
        answer: "처방약의 중단이나 용량 변경은 처방 의료진과 상의해야 합니다.",
        claimIds: ["HTN-B1-010"],
      },
    ],
    sourceIds: [
      "SRC-KDCA-HTN",
      "SRC-CDC-HTN",
      "SRC-AHA-HOME-BP",
      "SRC-KDCA-STROKE",
      "SRC-KDCA-MI",
    ],
    imageIds: ["htn-hero", "htn-process", "htn-warning", "htn-checklist"],
    toolSlugs: ["blood-pressure-log", "blood-pressure-questions", "blood-pressure-prep", "blood-pressure-warning"],
  },
  "type-2-diabetes": {
    slug: "type-2-diabetes",
    title: "제2형 당뇨병, 한 번의 숫자보다 흐름 보기",
    eyebrow: "대사·혈당 · 비공개 파일럿",
    description: "혈당과 인슐린의 기본 관계, 검사 용어, 안전한 관찰 기록과 가족의 도움을 쉬운 말로 정리합니다.",
    outcome: "혈당 검사의 뜻을 구분하고, 혼자 진단하지 않으며, 진료에서 물어볼 내용을 준비합니다.",
    summary: [
      "제2형 당뇨병은 음식 하나나 의지 부족만으로 설명할 수 없습니다.",
      "공복혈당과 당화혈색소(HbA1c)는 서로 다른 시간 범위를 보여 주는 혈액검사입니다.",
      "가정 측정값은 관찰 기록이며 진단이나 약 조절 지시가 아닙니다.",
    ],
    sections: [
      {
        title: "한 문장으로 이해하기",
        paragraphs: [
          "몸이 인슐린을 충분히 만들지 못하거나 잘 사용하지 못해 혈액 속 포도당이 높은 상태가 이어지는 질환입니다.",
        ],
        claimIds: ["DIA-B1-001"],
      },
      {
        title: "연료와 문 신호로 비유해 보기",
        paragraphs: [
          "포도당은 세포가 쓰는 연료, 인슐린은 그 연료가 세포에서 쓰이도록 돕는 신호와 비슷합니다. 신호가 충분히 작동하지 않으면 포도당이 혈액에 더 많이 남을 수 있습니다. 실제 몸은 이 비유보다 복잡하므로 치료 판단에는 사용할 수 없습니다.",
        ],
        claimIds: ["DIA-B1-001", "DIA-B1-002"],
        tone: "note",
      },
      {
        title: "있을 수도, 없을 수도 있는 신호",
        paragraphs: [
          "갈증, 잦은 소변, 피로, 흐린 시야, 손발 저림이나 상처가 잘 낫지 않는 변화가 나타날 수 있습니다. 하지만 변화가 천천히 오거나 아무 증상이 없는 사람도 있어 증상 목록만으로 확인하거나 배제할 수 없습니다.",
        ],
        claimIds: ["DIA-B1-003", "DIA-B1-004", "DIA-B1-006"],
      },
      {
        title: "누구의 잘못으로 설명하지 않기",
        paragraphs: [
          "가족력, 나이, 활동량, 체중과 다른 건강 상태 등 여러 요인이 함께 관련됩니다. 체형이나 특정 음식 하나만 보고 당뇨병 여부를 판단하거나 사람을 탓해서는 안 됩니다.",
        ],
        claimIds: ["DIA-B1-005"],
      },
      {
        title: "검사 이름부터 구분합니다",
        bullets: [
          "공복혈당: 보통 최소 8시간 금식한 뒤 한 시점의 혈당을 확인합니다.",
          "당화혈색소(HbA1c): 대략 지난 3개월 평균 혈당 수준에 관한 정보를 줍니다.",
          "검사 하나의 의미와 재검 필요 여부는 의료진이 다른 건강 상태와 함께 판단합니다.",
        ],
        claimIds: ["DIA-B1-007", "DIA-B1-008", "DIA-B1-009"],
      },
      {
        title: "한 번 잰 값으로 진단하지 않는 이유",
        paragraphs: [
          "가정용 혈당계는 이미 측정 중인 사람이 패턴을 기록하는 데 도움을 줄 수 있습니다. 하지만 한 번의 값은 측정 시점과 상황의 영향을 받으므로 자가 진단이나 약 변경 근거로 삼지 않습니다.",
        ],
        claimIds: ["DIA-B1-006", "DIA-B1-011"],
      },
      {
        title: "치료는 숫자 하나만 낮추는 일이 아닙니다",
        paragraphs: [
          "식사, 신체 활동, 수면, 금연과 처방약을 함께 고려하며 혈당뿐 아니라 혈압과 콜레스테롤, 눈·콩팥·신경·심혈관 건강도 살핍니다. 구체적인 목표와 약은 진료를 맡은 의료진과 정합니다.",
        ],
        claimIds: ["DIA-B1-010", "DIA-B1-011"],
      },
      {
        title: "관찰 기록에는 맥락을 남깁니다",
        paragraphs: [
          "이미 혈당을 재는 사람이라면 날짜, 식사 시점, 활동, 측정값, 증상, 수면과 메모를 함께 적습니다. 기록은 약을 바꾸는 계산표가 아니라 진료 질문을 준비하는 재료입니다.",
        ],
        claimIds: ["DIA-B1-006", "DIA-B1-011"],
      },
      {
        title: "빠르게 의료 도움을 받아야 할 변화",
        paragraphs: [
          "당뇨병이 있는 사람이 반복해서 토해 물도 마시기 어렵거나 숨쉬기 힘들고 의식이 흐려지는 등 상태가 빠르게 나빠지면 기록을 계속하지 말고 즉시 가까운 응급의료기관이나 119에 도움을 요청합니다. 반응이 없거나 생명이 위급하면 즉시 119에 신고합니다.",
        ],
        claimIds: ["DIA-B1-012"],
        tone: "warning",
      },
      {
        title: "가족이 도울 수 있는 방식",
        bullets: [
          "음식이나 숫자를 감시하기보다 당사자가 원하는 도움을 먼저 묻습니다.",
          "검사 결과지와 약 목록, 진료 질문을 함께 정리합니다.",
          "응급 상황의 개인 행동 계획은 의료진에게 함께 묻습니다.",
        ],
        claimIds: ["DIA-B1-013", "DIA-B1-011", "DIA-B1-012"],
      },
    ],
    faq: [
      {
        question: "단것을 먹어서 생기는 병인가요?",
        answer: "제2형 당뇨병은 인슐린 작용, 유전, 활동, 체중과 여러 건강 요인이 함께 관련됩니다. 음식 하나로 원인이나 책임을 단정할 수 없습니다.",
        claimIds: ["DIA-B1-001", "DIA-B1-005"],
      },
      {
        question: "증상이 없으면 검사가 필요 없나요?",
        answer: "증상이 매우 약하거나 없는 사람도 있습니다. 개인 위험과 검사 필요 여부는 의료진에게 확인하세요.",
        claimIds: ["DIA-B1-004", "DIA-B1-006"],
      },
      {
        question: "가정용 혈당계 숫자로 약을 조절해도 되나요?",
        answer: "아닙니다. 처방약이나 인슐린 변경은 개인 치료 계획을 아는 의료진과 상의해야 합니다.",
        claimIds: ["DIA-B1-011"],
      },
    ],
    sourceIds: [
      "SRC-KDCA-DIA",
      "SRC-NIDDK-T2D",
      "SRC-NIDDK-A1C",
      "SRC-NIDDK-TESTS",
      "SRC-NIDDK-LIVING",
      "SRC-CDC-DKA",
      "SRC-KDCA-CPR",
    ],
    imageIds: ["dia-hero", "dia-process", "dia-warning", "dia-checklist"],
    toolSlugs: ["glucose-observation-log", "diabetes-questions", "family-support-checklist", "diabetes-test-terms"],
  },
  ...batch2HealthArticles,
  ...expansionHealthArticles,
};

export const healthTools: HealthTool[] = [
  {
    slug: "blood-pressure-log",
    articleSlug: "hypertension",
    title: "7일 혈압 기록표",
    description: "결론을 계산하지 않고 측정 환경과 원래 값을 함께 남기는 개인 기록지입니다.",
    claimIds: ["HTN-B1-006", "HTN-B1-007", "HTN-B1-008", "HTN-B1-010"],
    kind: "log",
    columns: ["날짜", "시간", "수축기", "이완기", "맥박", "쉬기 전/후", "증상", "처방약 복용 기록", "메모"],
    rows: 14,
  },
  {
    slug: "blood-pressure-questions",
    articleSlug: "hypertension",
    title: "고혈압 진료 질문 카드",
    description: "기록을 진료 대화로 연결하는 질문을 골라 적습니다.",
    claimIds: ["HTN-B1-004", "HTN-B1-008", "HTN-B1-010"],
    kind: "questions",
    items: [
      "이 혈압 기록에서 제가 꼭 확인해야 할 점은 무엇인가요?",
      "집에서 측정할 때 제가 잘못하고 있는 부분이 있나요?",
      "제가 복용 중인 약과 관련해 확인할 점이 있나요?",
      "어떤 증상이 생기면 바로 진료를 받아야 하나요?",
      "제게 맞는 측정 시간과 횟수는 어떻게 정하나요?",
    ],
  },
  {
    slug: "blood-pressure-prep",
    articleSlug: "hypertension",
    title: "혈압 측정 준비 체크리스트",
    description: "같은 조건에서 더 안정적으로 측정하기 위한 준비표입니다.",
    claimIds: ["HTN-B1-006", "HTN-B1-007", "HTN-B1-008"],
    kind: "checklist",
    items: [
      "30분 전 흡연·카페인 음료·운동을 피했습니다.",
      "화장실을 다녀왔습니다.",
      "조용히 5분 정도 쉬었습니다.",
      "등을 기대고 두 발을 바닥에 뒀습니다.",
      "맨팔에 맞는 커프를 두고 팔을 심장 높이에서 받쳤습니다.",
      "말하지 않고 1분 간격으로 두 번 측정했습니다.",
      "원래 값과 날짜·시간을 기록했습니다.",
    ],
  },
  {
    slug: "blood-pressure-warning",
    articleSlug: "hypertension",
    title: "기록보다 119가 먼저인 경고 카드",
    description: "혈압 숫자를 다시 재며 기다리지 않아야 할 동반 신호를 기억합니다.",
    claimIds: ["HTN-B1-011", "HTN-B1-012"],
    kind: "warning",
    items: [
      "새로 생긴 심한 가슴 통증 또는 압박감",
      "심한 호흡곤란, 식은땀 또는 의식 저하",
      "얼굴이나 한쪽 팔다리의 갑작스러운 힘 빠짐",
      "말이 어눌해지거나 이해하기 어려운 갑작스러운 변화",
    ],
  },
  {
    slug: "glucose-observation-log",
    articleSlug: "type-2-diabetes",
    title: "혈당 관찰 기록표",
    description: "이미 측정 중인 사람이 숫자와 생활 맥락을 함께 적는 기록지입니다.",
    claimIds: ["DIA-B1-006", "DIA-B1-011"],
    kind: "log",
    columns: ["날짜", "식사 시점", "활동", "측정값(측정 중인 경우)", "증상", "수면", "메모"],
    rows: 12,
  },
  {
    slug: "diabetes-questions",
    articleSlug: "type-2-diabetes",
    title: "제2형 당뇨병 진료 질문지",
    description: "검사 의미와 다음 행동을 의료진에게 확인하기 위한 질문지입니다.",
    claimIds: ["DIA-B1-006", "DIA-B1-009", "DIA-B1-010", "DIA-B1-011"],
    kind: "questions",
    items: [
      "제 검사 결과는 어떤 기간과 상태를 보여 주나요?",
      "재검이 필요하다면 어떤 검사와 시점인가요?",
      "제가 기록할 때 식사·활동·증상 중 무엇을 함께 적을까요?",
      "복용 중인 약에서 제가 알아둘 저혈당 또는 이상 반응은 무엇인가요?",
      "가족이 안전하게 도울 수 있는 범위는 어디까지인가요?",
    ],
  },
  {
    slug: "family-support-checklist",
    articleSlug: "type-2-diabetes",
    title: "가족 지원 체크리스트",
    description: "감시와 비난을 줄이고 당사자가 원하는 도움을 확인합니다.",
    claimIds: ["DIA-B1-010", "DIA-B1-011", "DIA-B1-012", "DIA-B1-013"],
    kind: "checklist",
    items: [
      "당사자가 원하는 도움을 먼저 물었습니다.",
      "음식과 숫자를 평가하거나 비난하지 않았습니다.",
      "진료 질문과 결과지 정리를 함께 준비했습니다.",
      "처방약을 대신 결정하거나 바꾸지 않았습니다.",
      "응급 상황의 개인 행동 계획을 의료진에게 확인했습니다.",
    ],
  },
  {
    slug: "diabetes-test-terms",
    articleSlug: "type-2-diabetes",
    title: "혈당 검사 용어 한 장",
    description: "공복혈당과 HbA1c가 보는 시간 범위를 구분합니다.",
    claimIds: ["DIA-B1-006", "DIA-B1-007", "DIA-B1-008", "DIA-B1-009"],
    kind: "guide",
    items: [
      "공복혈당: 보통 최소 8시간 금식한 뒤 한 시점의 혈당을 확인하는 검사",
      "당화혈색소(HbA1c): 대략 지난 3개월 평균 혈당 수준에 관한 정보를 주는 검사",
      "두 검사는 서로 다른 정보를 주며, 결과 해석과 재검 여부는 의료진이 판단",
      "가정용 한 번의 측정값은 자가 진단이나 약 변경 지시가 아님",
    ],
  },
  ...batch2HealthTools,
  ...expansionHealthTools,
];

export const trustPages = [
  {
    slug: "about",
    title: "오누림 소개",
    intro: "오누림은 질환을 쉬운 말과 그림으로 이해하고, 기록하고, 진료에서 질문할 준비를 돕는 일반 건강교육 안내서입니다.",
    sections: [
      { title: "무엇을 하는가", body: "공식기관과 의료기관의 환자용 자료를 바탕으로 설명, 기록표와 질문 도구를 새로 구성합니다." },
      { title: "무엇을 하지 않는가", body: "진단, 처방, 개인 치료 결정, 의료 상담, 병원 서비스 또는 정부기관 소속을 제공하거나 주장하지 않습니다." },
      { title: "운영", body: "운영 주체는 Biz2Lab입니다. 박영훈 비의료인 건강정보 편집자가 공개 문장과 출처 연결을 관리합니다." },
    ],
  },
  {
    slug: "author",
    title: "박영훈 | 비의료인 건강정보 편집자",
    intro: "공공기관과 의료기관의 환자용 자료를 일반인이 이해하기 쉬운 말과 그림, 기록표와 질문 도구로 다시 정리합니다.",
    sections: [
      { title: "역할", body: "역할 상태는 NON_CLINICIAN_HEALTH_INFORMATION_EDITOR입니다. 출처 기반 건강정보 편집자이며 의사, 간호사, 약사, 치료사, 영양사 또는 임상 연구자가 아닙니다." },
      { title: "제공하지 않는 것", body: "진단, 처방, 개인별 치료 결정이나 응급상담을 제공하지 않습니다." },
      { title: "검증의 구분", body: "작성자 표시, 공식 출처 확인과 면허 의료인 검수는 서로 다른 상태이며 페이지마다 따로 공개합니다." },
    ],
  },
  {
    slug: "editorial-policy",
    title: "편집 정책",
    intro: "짧은 설명, 더 깊은 이해, 바로 쓸 행동 도구의 순서로 건강정보를 구성합니다.",
    sections: [
      { title: "독자 중심", body: "공포나 권위보다 이해, 기록, 질문과 적절한 도움 요청을 우선합니다." },
      { title: "독립 작성", body: "공식 자료의 사실은 확인하지만 문단, 표, 그림을 복사하거나 한 출처를 가깝게 바꾸어 쓰지 않습니다." },
      { title: "상태 표시", body: "출처 확인, 의료인 검수, 독자 테스트와 Owner 공개 승인을 독립된 단계로 관리합니다." },
    ],
  },
  {
    slug: "sources-policy",
    title: "출처 정책",
    intro: "질병관리청과 국가건강정보포털을 우선하고 WHO, NIH, CDC, NHS 같은 공공기관 자료로 교차 확인합니다.",
    sections: [
      { title: "우선순위", body: "국내 공공기관, 국제 공공기관, 대학병원·전문학회·동료심사 문헌 순으로 사용합니다." },
      { title: "배제", body: "블로그, 인플루언서 게시물, 제약·건강기능식품 마케팅과 출처가 불명확한 영상은 주된 의학 근거로 사용하지 않습니다." },
      { title: "저작권", body: "공공정보는 사실 확인에 사용하며 라이선스를 확인합니다. 표·삽화·환자자료를 복사하지 않고 독립 문장과 원본 그림을 만듭니다." },
    ],
  },
  {
    slug: "medical-review-policy",
    title: "의료 검토 정책",
    intro: "공식 출처 확인은 면허 의료인 검수와 같지 않습니다.",
    sections: [
      { title: "공식 출처 확인 ≠ 의료인 검수", body: "출처와 문장을 대조해도 실제 면허 의료인이 해당 버전과 claim을 검토하지 않았다면 의료 검수 완료로 표시하지 않습니다." },
      { title: "현재 상태", body: "기존 47개 고위험 Claim 검토 패킷은 ONURIM_MEDICAL_REVIEW_PACKAGE_READY입니다. 검토자 섭외 상태는 LICENSED_REVIEWER_SOURCING이며 REVIEWER_ASSIGNED = NO, ONURIM_MEDICAL_REVIEW_IN_PROGRESS = NO, MEDICAL_REVIEW_COMPLETED = NO입니다. 공개 문장은 공식 출처에 다시 대조하고 개인 진단·치료·약물 결정을 제거한 일반 건강교육 범위로 제한했습니다." },
      { title: "응급 문장", body: "뇌졸중·급성심근경색·심한 호흡곤란·자해 위험처럼 행동 지연이 위험한 문장은 질병관리청·보건복지부·NIH 등 권위 출처에 직접 연결하고 119 또는 확인된 국내 위기 연락처만 간단히 안내합니다." },
    ],
  },
  {
    slug: "corrections-policy",
    title: "정정 정책",
    intro: "사실 오류, 출처 문제와 오해를 부르는 표현을 실제 공개 GitHub Issues에서 접수하고 변경 이유를 기록합니다.",
    sections: [
      { title: "현재 채널", body: "현재 실동작 정정 채널은 Biz2Lab 공개 GitHub Issues입니다. 문제 페이지 URL, 정정할 문장과 확인 가능한 출처를 적어 주세요. health@biz2lab.com은 활성화·송수신 검증 전이므로 공개 연락처로 사용하지 않습니다." },
      { title: "받지 않는 정보", body: "의료기록, 처방전, 검사 이미지, 주민번호와 개인 건강정보를 받지 않습니다." },
      { title: "응급·의료상담", body: "정정 채널은 응급, 진단, 치료 또는 약물 상담을 제공하지 않습니다." },
    ],
  },
  {
    slug: "ai-disclosure",
    title: "AI 활용 공개",
    intro: "AI는 자료 정리, 구조 초안, 문장 점검과 원본 시각자료 제작을 보조할 수 있습니다.",
    sections: [
      { title: "AI가 아닌 역할", body: "AI를 저자, 인간 출처 확인자 또는 면허 의료 검수자로 표시하지 않습니다." },
      { title: "검증", body: "공식 출처 매핑, 인간 편집, 의료 검수와 최종 공개 승인은 서로 분리해 기록합니다." },
      { title: "시각자료", body: "생성 이미지는 교육용 삽화이며 진단 영상이 아닙니다. claim map과 파일 hash를 남깁니다." },
    ],
  },
  {
    slug: "disclaimer",
    title: "면책 안내",
    intro: "오누림의 내용은 일반적인 건강정보 교육용이며 개인 의료상담을 대신하지 않습니다.",
    sections: [
      { title: "개인 판단 금지", body: "이 페이지로 질환을 진단하거나 처방약·인슐린을 시작, 중단 또는 변경하지 마세요." },
      { title: "도움 요청", body: "새롭거나 심한 증상, 의식 저하 또는 호흡곤란처럼 위급한 변화가 있으면 온라인 정보를 기다리지 말고 119 또는 응급의료 도움을 요청하세요." },
      { title: "지역 차이", body: "검사와 치료 기준은 개인 상황과 지역 지침에 따라 달라질 수 있으므로 담당 의료진과 확인하세요." },
    ],
  },
  {
    slug: "privacy",
    title: "개인정보 안내",
    intro: "건강 도구는 입력값을 서버에 전송하거나 저장하지 않는 브라우저·인쇄용 양식입니다.",
    sections: [
      { title: "최소 수집", body: "공개 GitHub Issues 정정 채널에는 건강정보·의료기록·연락처를 올리지 않습니다. GitHub 계정과 공개 게시물은 GitHub 정책에 따라 처리됩니다." },
      { title: "기록표", body: "브라우저에서 적은 내용은 제출되지 않습니다. 공용 기기에서는 입력하지 말고 출력물 보관에 주의하세요." },
      { title: "향후 변경", body: "수집 기능을 추가하려면 목적, 항목, 보관 기간, 삭제 방법과 운영 책임자를 먼저 공개합니다." },
    ],
  },
  {
    slug: "advertising",
    title: "광고 정책",
    intro: "광고가 콘텐츠의 결론, 질환 선정 또는 출처 판단을 바꾸지 않도록 편집과 광고를 분리합니다.",
    sections: [
      { title: "독립성", body: "광고주·제약사·건강기능식품 판매자로부터 질환 문장, 추천 또는 순위를 제공받지 않습니다." },
      { title: "표시", body: "광고가 노출되면 콘텐츠와 구분되는 표시를 사용하며 광고를 의료 권고처럼 배치하지 않습니다." },
      { title: "금지", body: "치료 보장, 공포 유도, 허위 전후 비교와 개인의 건강 상태를 이용한 과장 광고를 직접 만들지 않습니다." },
    ],
  },
  {
    slug: "terms",
    title: "이용약관",
    intro: "오누림 자료는 개인의 일반 건강교육과 진료 질문 준비를 위한 정보입니다.",
    sections: [
      { title: "허용 범위", body: "페이지를 읽고 개인용 기록표를 출력할 수 있습니다. 출처를 지우거나 오누림의 의료 권고처럼 재판매할 수 없습니다." },
      { title: "의료 한계", body: "콘텐츠와 도구는 의료기관의 진단·치료·응급 판단을 대체하지 않습니다." },
      { title: "변경", body: "출처 갱신, 안전성 보완 또는 서비스 운영상 필요에 따라 내용을 수정할 수 있으며 중요한 정정은 기록합니다." },
    ],
  },
  {
    slug: "contact",
    title: "문의",
    intro: "현재 공개 문의와 정정 제보는 실제 운영 중인 Biz2Lab GitHub Issues를 이용합니다.",
    sections: [
      { title: "보낼 내용", body: "문제가 있는 페이지 URL, 정정할 문장, 오류라고 판단한 이유와 확인 가능한 공식 출처를 적어 주세요." },
      { title: "보내지 않을 내용", body: "이름·전화번호·주민번호·진단명·검사값·처방전·의료기록·계정정보는 공개 Issue에 올리지 마세요." },
      { title: "상담 한계", body: "이 채널은 의료상담이나 응급상담을 제공하지 않습니다. 위급한 상황에서는 답변을 기다리지 말고 119에 연락하세요." },
    ],
  },
] as const;

export function getHealthTool(slug: string) {
  return healthTools.find((tool) => tool.slug === slug);
}

export function getTrustPage(slug: string) {
  return trustPages.find((page) => page.slug === slug);
}

export function getSources(ids: string[]) {
  return ids.map((id) => healthSources.find((source) => source.id === id)).filter(Boolean) as HealthSource[];
}
