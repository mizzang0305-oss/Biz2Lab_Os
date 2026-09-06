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
  sourceIds?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
  links?: Array<{ href: string; label: string }>;
};

export type HealthArticle = {
  slug: HealthArticleSlug;
  title: string;
  seoTitle?: string;
  publishedAt?: string;
  updatedAt?: string;
  sourceCheckedAt?: string;
  eyebrow: string;
  description: string;
  outcome: string;
  summary: string[];
  sections: HealthSection[];
  faq: Array<{ question: string; answer: string; claimIds: string[]; sourceIds?: string[] }>;
  sourceIds: string[];
  imageIds: string[];
  visuals?: Record<string, { src: string; alt: string; caption: string; width: number; height: number }>;
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
  itemGroups?: Array<{ title: string; items: string[] }>;
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
    id: "SRC-NIDDK-MANAGING",
    organization: "NIH/NIDDK",
    title: "Managing Diabetes",
    url: "https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes",
    sourceDate: "2023-10 (Last Reviewed)",
    retrievedAt: "2026-09-06",
  },
  {
    id: "SRC-CDC-DIABETES-FAMILY",
    organization: "CDC",
    title: "Helping Friends and Family With Diabetes",
    url: "https://www.cdc.gov/diabetes/caring/index.html",
    sourceDate: "2024-05-15",
    retrievedAt: "2026-09-06",
  },
  {
    id: "SRC-KDCA-CPR",
    organization: "질병관리청 국가건강정보포털",
    title: "심폐소생술",
    url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6226",
    sourceDate: "2023",
    retrievedAt: "2026-08-24",
  },
  {
    id: "SRC-CDC-LOW-GLUCOSE", organization: "CDC", title: "Low Blood Sugar (Hypoglycemia)",
    url: "https://www.cdc.gov/diabetes/about/low-blood-sugar-hypoglycemia.html", sourceDate: "2024-05-16", retrievedAt: "2026-09-06",
  },
  {
    id: "SRC-NHS-LOW-GLUCOSE", organization: "NHS", title: "Low blood sugar (hypoglycaemia)",
    url: "https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/", sourceDate: "2023-08-03 (검토 예정일과 구분)", retrievedAt: "2026-09-06",
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
    title: "고혈압을 이해하고 집에서 혈압을 정확히 기록하는 법",
    seoTitle: "고혈압 증상과 혈압 재는 법, 가정혈압 기록표",
    publishedAt: "2026-08-26",
    updatedAt: "2026-09-06",
    sourceCheckedAt: "2026-09-06",
    eyebrow: "심장·혈관 · 가정혈압과 진료 준비",
    description: "증상이 없어도 혈압을 확인해야 하는 이유, 측정 자세와 커프 점검, 진료실·가정혈압이 다를 때 남길 기록을 설명합니다. 응급 도움과 진료 상담의 경계도 구분합니다.",
    outcome: "측정 조건을 점검하고, 집과 진료실에서 잰 원래 값을 나란히 남겨 의료진에게 질문할 수 있습니다.",
    summary: [
      "고혈압은 증상만으로 알아차리기 어려워 측정이 필요합니다.",
      "한 번의 숫자로 혼자 진단하거나 약을 바꾸지 않습니다.",
      "측정 조건과 증상을 함께 기록하면 진료 대화가 더 구체적이 됩니다.",
    ],
    sections: [
      {
        title: "느낌보다 측정이 필요한 이유",
        paragraphs: [
          "고혈압은 혈관 안의 압력이 지속해서 높은 상태입니다. 초기에는 별다른 증상이 없는 경우가 많습니다. 두통이 없다고 배제할 수도, 두통이 있다고 고혈압으로 단정할 수도 없습니다.",
        ],
        claimIds: ["HTN-B1-001", "HTN-B1-003"],
        sourceIds: ["SRC-KDCA-HTN", "SRC-CDC-HTN"],
        imageId: null,
      },
      {
        title: "위·아래 혈압은 서로 다른 순간을 봅니다",
        paragraphs: [
          "위 숫자(수축기)는 심장이 피를 내보낼 때, 아래 숫자(이완기)는 박동 사이에 쉴 때의 압력입니다. 두 값과 단위 mmHg를 함께 남깁니다. 혈압계의 맥박 표시는 혈압과 다른 항목입니다.",
          "국가와 지침, 측정 장소에 따라 설명하는 기준이 다를 수 있습니다. 검사표를 다른 나라의 표에 혼자 대입하기보다 의료진에게 적용 기준과 개인 목표를 확인하세요.",
        ],
        claimIds: ["HTN-B1-001", "HTN-B1-002", "HTN-B1-004"],
        sourceIds: ["SRC-CDC-HTN", "SRC-KDCA-HTN"],
        imageId: "htn-process",
        tone: "note",
      },
      {
        title: "집과 진료실에서 다른 값이 나온다면",
        paragraphs: [
          "차이가 난다는 사실만으로 어느 한쪽이 틀렸다고 지우지 마세요. 측정 조건을 확인한 뒤, 의료진이 가정 기록이나 24시간 활동혈압 검사가 필요한지 판단합니다.",
        ],
        claimIds: ["HTN-B1-002", "HTN-B1-004"],
        sourceIds: ["SRC-KDCA-HTN", "SRC-AHA-HOME-BP"],
        imageId: null,
        table: {
          caption: "진료실과 일상 혈압의 차이 — 이 표만으로 진단하지 않습니다",
          columns: ["설명에 쓰이는 용어", "어떤 차이인가요", "가져갈 기록"],
          rows: [
            ["백의 고혈압", "평소에는 정상이지만 진료실에서는 높은 양상", "집에서 잰 날짜·시각·원래 값과 진료실 기록"],
            ["가면 고혈압", "진료실에서는 정상이지만 일상에서는 높은 양상", "측정한 장소, 활동·증상과 함께 남긴 가정 기록"],
            ["측정 조건 차이", "커프 크기·자세·직전 활동 등이 결과에 영향을 줄 수 있음", "혈압계와 커프 정보, 측정 당시 자세와 준비 상황"],
          ],
        },
        links: [{ href: "/health/tools/blood-pressure-log", label: "지우거나 골라 쓰지 않고 원래 값을 남기는 혈압 기록표" }],
      },
      {
        title: "반복해서 재기 전에 조건부터 점검하세요",
        paragraphs: [
          "검증된 위팔 혈압계와 팔 둘레에 맞는 커프를 사용합니다. 기기 선택이나 사용법이 불확실하면 의료진·약사에게 확인하고, 진료에 기기를 가져가 자세와 측정값을 비교할 수 있습니다.",
        ],
        claimIds: ["HTN-B1-006", "HTN-B1-007"],
        sourceIds: ["SRC-AHA-HOME-BP"],
        imageId: null,
        table: {
          caption: "측정 조건 점검표 — 높은 값을 단순 오차로 치부하지 않습니다",
          columns: ["확인할 부분", "다음 측정에서 준비할 것"],
          rows: [
            ["옷 위에 감은 커프", "위팔을 드러내고 기기 설명서대로 착용"],
            ["공중에 든 팔·꼰 다리", "등과 팔을 받치고 두 발을 바닥에 둠"],
            ["직전 운동·흡연·카페인", "평소 측정은 30분 전부터 피하고 조용히 5분 이상 휴식"],
          ],
        },
      },
      {
        title: "측정 전 5분이 기록의 질을 바꿉니다",
        bullets: [
          "측정 30분 전에는 흡연, 카페인 음료와 운동을 피합니다.",
          "화장실을 다녀온 뒤 조용한 곳에서 5분 이상 쉽니다.",
          "등을 기대고 발을 바닥에 둡니다. 다리는 꼬지 않습니다.",
          "혈압계 팔띠(커프)는 옷 위가 아닌 맨팔에 두고 팔을 심장 높이에서 받칩니다.",
          "측정 중에는 말하거나 휴대전화를 보지 않습니다.",
        ],
        claimIds: ["HTN-B1-006", "HTN-B1-007"],
        sourceIds: ["SRC-AHA-HOME-BP", "SRC-KDCA-HTN"],
        imageId: "htn-checklist",
        links: [{ href: "/health/guides/measuring-blood-pressure", label: "혈압 측정 준비·자세·기록을 순서대로 확인하기" }],
      },
      {
        title: "무엇을 기록할까요?",
        paragraphs: [
          "날짜와 시간, 위·아래 혈압 숫자(수축기·이완기), 맥박, 쉬기 전후, 증상과 이미 처방받아 복용한 약 여부를 적습니다. 한 번에 1분 간격으로 두 번 측정한 원래 값을 남기고 평균을 임의로 치료 판단에 사용하지 않습니다.",
        ],
        claimIds: ["HTN-B1-008", "HTN-B1-010"],
        sourceIds: ["SRC-AHA-HOME-BP"],
        imageId: null,
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
        sourceIds: ["SRC-KDCA-HTN", "SRC-AHA-HOME-BP"],
        imageId: null,
        links: [{ href: "/health/tools/blood-pressure-questions", label: "진료에서 받은 답도 함께 적는 혈압 질문 카드" }],
      },
      {
        title: "생활 관리와 약은 역할이 다릅니다",
        paragraphs: [
          "식사, 활동, 흡연, 체중과 스트레스 같은 생활 요소를 살피는 일은 관리의 한 부분입니다. 처방약이 필요한 사람도 있으며, 수치가 좋아졌다고 스스로 용량을 줄이거나 중단해서는 안 됩니다.",
        ],
        claimIds: ["HTN-B1-009", "HTN-B1-010"],
        sourceIds: ["SRC-KDCA-HTN", "SRC-AHA-HOME-BP"],
        imageId: null,
      },
      {
        title: "기록보다 119가 먼저인 때",
        bullets: [
          "새로 생긴 심한 가슴 통증이나 압박감, 심한 호흡곤란, 식은땀 또는 의식 저하",
          "얼굴이나 한쪽 팔다리의 갑작스러운 힘 빠짐, 말이 어눌해지거나 이해하기 어려운 변화",
        ],
        claimIds: ["HTN-B1-011", "HTN-B1-012"],
        sourceIds: ["SRC-KDCA-STROKE", "SRC-KDCA-MI", "SRC-AHA-HOME-BP"],
        tone: "warning",
        imageId: "htn-warning",
        paragraphs: ["이런 변화가 있으면 혈압이 내려가는지 기다리거나 기록을 마무리하지 말고 119에 연락합니다. 숫자가 확인되지 않았어도 도움을 늦추지 않습니다."],
        links: [{ href: "/health/guides/danger-signals", label: "병원에 빨리 가야 하는 위험 신호" }, { href: "/health/stroke", label: "뇌졸중 의심 신호와 119 행동 안내" }],
      },
      {
        title: "응급 증상은 없지만 값이 계속 걱정될 때",
        paragraphs: ["진료에서 정한 연락 기준을 넘거나 매우 높은 값이 계속되면 다음 정기 진료까지 미루지 말고 의료진에게 바로 연락해 평가 시점을 확인하세요. 연락을 준비하며 약을 더 먹거나 줄이지 않습니다. 새 증상이 생기면 위의 응급 행동을 우선합니다."],
        claimIds: ["HTN-B1-004", "HTN-B1-010"],
        sourceIds: ["SRC-AHA-HOME-BP"],
        imageId: null,
        tone: "note",
      },
      {
        title: "가족은 ‘감시’보다 준비를 돕습니다",
        paragraphs: [
          "측정 시간을 함께 정하고 기록지를 찾기 쉬운 곳에 둡니다. 진료 전에는 혈압계 정보와 복용 약 목록, 궁금한 점을 함께 정리합니다. 응급 신호가 보이면 기록을 완성하려 하지 말고 도움 요청을 우선합니다.",
        ],
        claimIds: ["HTN-B1-013"],
        sourceIds: ["SRC-AHA-HOME-BP"],
        imageId: null,
        links: [{ href: "/health/guides/medication-list", label: "처방약·일반약을 함께 정리하는 복용약 목록" }],
      },
    ],
    faq: [
      {
        question: "한 번 높게 나오면 고혈압인가요?",
        answer: "아닙니다. 측정 조건과 반복 결과를 의료진이 함께 판단합니다. 값이 걱정되면 원래 기록을 가지고 상담하세요.",
        claimIds: ["HTN-B1-004", "HTN-B1-008"],
        sourceIds: ["SRC-KDCA-HTN", "SRC-AHA-HOME-BP"],
      },
      {
        question: "머리가 아프지 않으면 괜찮은가요?",
        answer: "고혈압은 뚜렷한 증상이 없는 경우가 많아 두통 유무만으로 판단할 수 없습니다.",
        claimIds: ["HTN-B1-003"],
        sourceIds: ["SRC-KDCA-HTN"],
      },
      {
        question: "약을 먹고 수치가 좋아졌는데 쉬어도 되나요?",
        answer: "처방약의 중단이나 용량 변경은 처방 의료진과 상의해야 합니다.",
        claimIds: ["HTN-B1-010"],
        sourceIds: ["SRC-AHA-HOME-BP"],
      },
      { question: "병원에서는 높은데 집에서는 괜찮으면 기록을 버려도 되나요?", answer: "두 장소의 원래 기록을 함께 가져가세요. 백의 고혈압 같은 양상이나 측정 조건 차이가 있을 수 있어, 의료진이 추가 측정 필요성을 확인합니다.", claimIds: ["HTN-B1-004"], sourceIds: ["SRC-KDCA-HTN"] },
      { question: "손목 혈압계와 위팔 혈압계 중 무엇을 확인해야 하나요?", answer: "가정 측정에는 검증된 위팔 혈압계와 맞는 커프가 권장됩니다. 이미 쓰는 기기나 신체 조건에 대한 질문은 의료진·약사에게 가져가 확인하세요.", claimIds: ["HTN-B1-007"], sourceIds: ["SRC-AHA-HOME-BP"] },
      { question: "높게 나와서 계속 재도 되나요?", answer: "평소 기록은 정해진 조건과 횟수로 남깁니다. 매우 높은 값이 지속되면 의료진에게 바로 연락하고, 가슴 통증·심한 호흡곤란·갑작스러운 마비나 말 이상이 있으면 재측정하며 기다리지 말고 119 도움을 받습니다.", claimIds: ["HTN-B1-008", "HTN-B1-011", "HTN-B1-012"], sourceIds: ["SRC-AHA-HOME-BP", "SRC-KDCA-STROKE", "SRC-KDCA-MI"] },
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
    title: "제2형 당뇨병, 증상부터 혈당 검사와 기록까지",
    seoTitle: "제2형 당뇨병 증상·검사: 공복혈당과 당화혈색소",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    eyebrow: "대사·혈당 · 검사 이해와 개인 대처 계획",
    description: "공복혈당·HbA1c·가정 혈당 기록의 역할을 구분하고, 증상이 없을 때의 검사 상담과 저혈당·응급 신호를 살핍니다. 약을 혼자 조절하지 않고 진료 질문을 준비합니다.",
    outcome: "검사표와 가정 기록을 구분하고, 저혈당·아픈 날의 개인 대처 계획을 의료진에게 확인할 수 있습니다.",
    summary: [
      "제2형 당뇨병은 음식 하나나 의지 부족만으로 설명할 수 없습니다.",
      "공복혈당과 당화혈색소(HbA1c)는 서로 다른 시간 범위를 보여 주는 혈액검사입니다.",
      "가정 측정값은 관찰 기록이며 진단이나 약 조절 지시가 아닙니다.",
    ],
    sections: [
      {
        title: "같은 혈당 이야기라도 검사와 기록은 다릅니다",
        paragraphs: ["검사 이름과 측정 시점을 먼저 찾으세요. 아래 표는 검사 역할을 비교하며, 당뇨병 진단값이나 개인 치료 목표를 정하는 표가 아닙니다."],
        claimIds: ["DIA-B1-007", "DIA-B1-008", "DIA-B1-009"],
        sourceIds: ["SRC-NIDDK-TESTS", "SRC-NIDDK-A1C"], imageId: null,
        table: { caption: "공복혈당·당화혈색소·가정 기록의 역할 비교", columns: ["항목", "무엇을 보나요", "진료에서 확인할 점"], rows: [
          ["공복혈당", "보통 최소 8시간 금식한 뒤 채혈한 한 시점의 혈당", "검사기관의 금식·복약 안내와 재검 필요 여부"],
          ["당화혈색소(HbA1c)", "대략 지난 3개월의 평균적인 혈당 상태", "빈혈 등 결과에 영향을 줄 조건, 같은 날 혈당과 차이"],
          ["가정용 혈당계 기록", "측정 당시의 값과 식사·활동·증상 맥락", "진단 검사를 대신하지 않음; 처방받은 측정·대처 계획 확인"],
        ] },
        links: [{ href: "/health/guides/understanding-hba1c", label: "HbA1c 결과지의 NGSP·IFCC 단위 읽기" }, { href: "/health/guides/reading-health-results", label: "검사표에서 이름·단위·후속 안내 찾기" }],
      },
      {
        title: "제2형은 인슐린 작용과 관련된 질환입니다",
        paragraphs: ["인슐린은 혈액 속 포도당이 세포에서 쓰이도록 돕는 호르몬입니다. 몸이 인슐린을 잘 쓰지 못하고 필요한 만큼 만들지 못하면 혈당이 높은 상태가 이어질 수 있습니다.", "유전, 나이, 활동, 체중과 여러 건강 상태가 함께 관련됩니다. 특정 음식이나 체형 하나로 원인과 책임을 단정하지 않습니다."],
        claimIds: ["DIA-B1-001", "DIA-B1-002", "DIA-B1-005"],
        sourceIds: ["SRC-NIDDK-T2D", "SRC-KDCA-DIA"], imageId: "dia-process",
      },
      {
        title: "갈증·소변 변화가 있거나 검진에서 표시를 받았다면",
        paragraphs: ["갈증, 잦은 소변, 피로, 흐린 시야, 손발 저림이나 잘 낫지 않는 상처가 나타날 수 있습니다. 변화가 느리거나 증상이 없는 경우도 있어 증상 목록으로 확인하거나 배제할 수 없습니다.", "이런 변화가 지속되거나 검진에서 재검·진료 안내를 받았다면 원본 결과지를 가지고 상담하세요. 가정용 혈당계만으로 혼자 진단하지 않습니다. 아래 응급 변화가 있으면 예약일을 기다리지 않습니다."],
        claimIds: ["DIA-B1-003", "DIA-B1-004", "DIA-B1-006"],
        sourceIds: ["SRC-NIDDK-T2D", "SRC-NIDDK-TESTS"], imageId: null,
      },
      {
        title: "치료는 숫자 하나만 낮추는 일이 아닙니다",
        paragraphs: [
          "식사, 활동, 수면, 금연과 처방약을 함께 고려하며 혈압·콜레스테롤과 눈·콩팥·신경 건강도 살핍니다. 개인 목표와 검사 주기는 의료진과 정합니다.",
          "처방받은 측정·복약·저혈당 대처 계획을 따르세요. 의료진이 미리 정해 준 조절 계획이 있다면 그 지시를 따르는 것과 인터넷 글을 보고 임의로 약을 바꾸는 것은 다릅니다. 이 글은 개인 계획을 대체하지 않습니다.",
        ],
        claimIds: ["DIA-B1-010", "DIA-B1-011"],
        sourceIds: ["SRC-KDCA-DIA", "SRC-NIDDK-LIVING", "SRC-NHS-LOW-GLUCOSE"], imageId: null,
        links: [{ href: "/health/hypertension", label: "함께 살피는 혈압과 가정 측정" }],
      },
      {
        title: "저혈당과 아픈 날의 계획은 미리 따로 확인합니다",
        paragraphs: ["인슐린이나 일부 당뇨병 약을 쓰는 사람은 저혈당이 생길 수 있습니다. 떨림·식은땀·두근거림·허기·어지러움 등이 나타날 수 있지만 증상이 뚜렷하지 않은 사람도 있습니다.", "깨어 있고 스스로 대처할 수 있다면 가능한 경우 바로 혈당을 확인하고, 의료진과 정한 저혈당 대처 계획을 따릅니다. 대처 방법을 모르거나 회복되지 않으면 즉시 의료 도움을 받으세요. 의식이나 반응이 달라지면 아래의 119 안내를 우선합니다."],
        bullets: ["내 약이 저혈당을 일으킬 수 있나요? 어떤 변화와 수치에서 무엇을 하나요?", "몸이 아파 못 먹거나 토할 때 측정·약·연락은 어떻게 하나요?", "야간이나 휴일에 연락할 곳과 가족이 알아둘 대처는 무엇인가요?"],
        claimIds: ["DIA-B1-010", "DIA-B1-011", "DIA-B1-012"],
        sourceIds: ["SRC-CDC-LOW-GLUCOSE", "SRC-NHS-LOW-GLUCOSE", "SRC-CDC-DKA"], imageId: null, tone: "note",
        links: [{ href: "/health/tools/diabetes-questions", label: "저혈당·아픈 날의 계획을 물을 진료 질문 카드" }],
      },
      {
        title: "의식 변화·경련·호흡곤란은 기록보다 응급 도움",
        paragraphs: [
          "의식이 흐려짐, 반응 없음, 경련 중 어느 하나라도 나타나면 즉시 119에 연락합니다. 저혈당이 의심되더라도 의식이 없거나 안전하게 삼킬 수 없는 사람에게 음식·물·약을 억지로 먹이지 않습니다.",
          "반복되는 구토로 음식·물을 유지하기 어렵거나 숨쉬기 힘들 때도 즉시 응급의료기관 또는 119 도움을 받습니다. 제2형 당뇨병에서도 당뇨병성 케톤산증 같은 응급 문제가 생길 수 있습니다. 이것이 원인인지 스스로 가리느라 지체하지 않습니다.",
        ],
        claimIds: ["DIA-B1-012"],
        sourceIds: ["SRC-CDC-LOW-GLUCOSE", "SRC-NHS-LOW-GLUCOSE", "SRC-CDC-DKA", "SRC-KDCA-CPR"],
        tone: "warning", imageId: "dia-warning",
        links: [{ href: "/health/guides/danger-signals", label: "그 밖의 즉시 도움을 요청해야 하는 위험 신호" }],
      },
      {
        title: "가족과 남길 것은 평가 점수가 아니라 맥락입니다",
        paragraphs: ["이미 측정 중이라면 날짜·식사와의 시간 간격·활동·혈당값·증상을 나란히 적습니다. ‘잘했다/못했다’ 대신 관찰한 사실을 남기세요. 음식과 숫자를 감시하기보다 어떤 도움이 필요한지 당사자에게 묻습니다."],
        bullets: ["기록에서 질문할 한 가지를 고릅니다: 식사 전후 변화, 밤의 증상, 평소와 다른 활동 등.", "검사 결과지와 약 목록, 미리 정한 응급 계획을 당사자의 동의를 받아 함께 정리합니다."],
        claimIds: ["DIA-B1-013", "DIA-B1-011", "DIA-B1-012"],
        sourceIds: ["SRC-NIDDK-LIVING", "SRC-CDC-LOW-GLUCOSE"], imageId: "dia-checklist",
        links: [{ href: "/health/tools/glucose-observation-log", label: "혈당과 생활 맥락을 함께 적는 관찰 기록표" }, { href: "/health/guides/medication-list", label: "처방약·일반약·보충제를 빠뜨리지 않는 복용약 목록" }],
      },
    ],
    faq: [
      {
        question: "단것을 먹어서 생기는 병인가요?",
        answer: "제2형 당뇨병은 인슐린 작용, 유전, 활동, 체중과 여러 건강 요인이 함께 관련됩니다. 음식 하나로 원인이나 책임을 단정할 수 없습니다.",
        claimIds: ["DIA-B1-001", "DIA-B1-005"],
        sourceIds: ["SRC-NIDDK-T2D"],
      },
      {
        question: "증상이 없으면 검사가 필요 없나요?",
        answer: "증상이 매우 약하거나 없는 사람도 있습니다. 개인 위험과 검사 필요 여부는 의료진에게 확인하세요.",
        claimIds: ["DIA-B1-004", "DIA-B1-006"],
        sourceIds: ["SRC-NIDDK-TESTS", "SRC-NIDDK-T2D"],
      },
      {
        question: "가정용 혈당계 숫자로 약을 조절해도 되나요?",
        answer: "이 글의 설명으로 임의 조절하지 않습니다. 의료진에게 미리 받은 개인 조절·대처 계획이 있다면 그 계획을 따르고, 방법이 불분명하면 의료진에게 확인하세요.",
        claimIds: ["DIA-B1-011"],
        sourceIds: ["SRC-NHS-LOW-GLUCOSE", "SRC-CDC-DKA"],
      },
      { question: "공복혈당과 HbA1c가 다르게 보이면 어느 쪽이 틀렸나요?", answer: "보는 시간 범위가 다르고 HbA1c에 영향을 주는 건강 상태도 있습니다. 원본 검사표와 측정 상황을 가져가 의료진에게 차이와 재검 필요성을 물어보세요.", claimIds: ["DIA-B1-007", "DIA-B1-008", "DIA-B1-009"], sourceIds: ["SRC-NIDDK-A1C", "SRC-NIDDK-TESTS"] },
      { question: "HbA1c 검사도 금식해야 하나요?", answer: "HbA1c 검사 자체에는 금식이 필요하지 않습니다. 같은 날 다른 검사가 함께 있다면 기관의 금식·복약 안내를 따릅니다.", claimIds: ["DIA-B1-007", "DIA-B1-008"], sourceIds: ["SRC-NIDDK-A1C", "SRC-NIDDK-TESTS"] },
      { question: "혈당이 높은 병인데 저혈당도 생기나요?", answer: "인슐린이나 일부 약, 식사·활동 상황에 따라 저혈당이 생길 수 있습니다. 증상과 대처를 미리 배우고, 의식 저하·경련처럼 스스로 대처할 수 없는 변화에는 119 도움을 요청합니다.", claimIds: ["DIA-B1-010", "DIA-B1-012"], sourceIds: ["SRC-CDC-LOW-GLUCOSE", "SRC-NHS-LOW-GLUCOSE", "SRC-KDCA-CPR"] },
    ],
    sourceIds: [
      "SRC-KDCA-DIA",
      "SRC-NIDDK-T2D",
      "SRC-NIDDK-A1C",
      "SRC-NIDDK-TESTS",
      "SRC-NIDDK-LIVING",
      "SRC-CDC-DKA",
      "SRC-KDCA-CPR",
      "SRC-CDC-LOW-GLUCOSE",
      "SRC-NHS-LOW-GLUCOSE",
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
    title: "가정 혈압 기록표",
    description: "결론을 계산하지 않고 측정 환경과 원래 값을 함께 남기는 개인 기록지입니다.",
    claimIds: ["HTN-B1-006", "HTN-B1-007", "HTN-B1-008", "HTN-B1-010"],
    kind: "log",
    columns: ["날짜·시간", "회차", "수축기(mmHg)", "이완기(mmHg)", "맥박(회/분)", "측정 조건·증상", "안내받은 약·기타 메모"],
    rows: 14,
  },
  {
    slug: "blood-pressure-questions",
    articleSlug: "hypertension",
    title: "고혈압 진료 질문 카드",
    description: "기록을 진료 대화로 연결하는 질문을 골라 적습니다.",
    claimIds: ["HTN-B1-004", "HTN-B1-008", "HTN-B1-010"],
    kind: "questions",
    fields: ["가져갈 혈압 기록·기기·약 정보", "오늘 먼저 확인할 질문", "설명대로 하기 어려운 점"],
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
    itemGroups: [{ title: "측정 전: 커프를 작동하기 전에", items: [
      "30분 전 흡연·카페인 음료·운동을 피했습니다.",
      "화장실을 다녀왔습니다.",
      "조용히 최소 5분 쉬었습니다.",
      "등을 기대고 두 발을 바닥에 뒀습니다.",
      "맨팔에 맞는 커프를 두고 팔을 심장 높이에서 받쳤습니다.",
    ] }, { title: "측정 후: 실제 값과 시각을 남긴 다음", items: [
      "말하지 않고 1분 간격으로 두 번 측정했습니다.",
      "원래 값과 날짜·시간을 기록했습니다.",
    ] }],
  },
  {
    slug: "blood-pressure-warning",
    articleSlug: "hypertension",
    title: "기록보다 119가 먼저인 경고 카드",
    description: "혈압 숫자를 다시 재며 기다리지 않아야 할 동반 신호를 기억합니다.",
    claimIds: ["HTN-B1-011", "HTN-B1-012"],
    kind: "warning",
  },
  {
    slug: "glucose-observation-log",
    articleSlug: "type-2-diabetes",
    title: "혈당 관찰 기록표",
    description: "이미 측정 중인 사람이 숫자와 생활 맥락을 함께 적는 기록지입니다.",
    claimIds: ["DIA-B1-006", "DIA-B1-011"],
    kind: "log",
    columns: ["날짜·실제 측정시각", "기기 표시값·단위", "식사 시각·전후 관계", "활동", "증상", "수면·평소와 다른 상황", "기기·기타 메모"],
    rows: 12,
  },
  {
    slug: "diabetes-questions",
    articleSlug: "type-2-diabetes",
    title: "제2형 당뇨병 진료 질문지",
    description: "검사 의미와 다음 행동을 의료진에게 확인하기 위한 질문지입니다.",
    claimIds: ["DIA-B1-006", "DIA-B1-009", "DIA-B1-010", "DIA-B1-011"],
    kind: "questions",
    fields: ["가져갈 검사 결과지: 검사명·검사일·단위", "이미 남긴 혈당 기록·현재 약 목록에서 확인할 점"],
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
    fields: ["당사자와 동의한 도움 한 가지 (실명·검사값 불필요)"],
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

export type HealthTrustPage = {
  slug: string;
  title: string;
  intro: string;
  seoTitle?: string;
  description?: string;
  updatedAt?: string;
  indexDecision?: "INDEX_SUPPORT" | "NOINDEX_FOLLOW";
  sections: ReadonlyArray<{ title: string; body: string; links?: ReadonlyArray<{ href: string; label: string }> }>;
};

export const trustPages: readonly HealthTrustPage[] = [
  {
    slug: "about",
    title: "오누림 소개",
    seoTitle: "오누림 소개: 건강정보의 범위·운영·확인 방법",
    description: "오누림에서 읽을 수 있는 질환·검사 안내와 기록 도구, Biz2Lab 운영 및 박영훈 비의료 편집자의 역할을 소개합니다. 의료 서비스와의 차이, 검수 상태와 정정 경로를 확인하세요.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "오누림은 질환을 쉬운 말과 그림으로 이해하고, 기록하고, 진료에서 질문할 준비를 돕는 일반 건강교육 안내서입니다.",
    sections: [
      { title: "어떤 도움을 얻을 수 있나요?", body: "질환 안내는 흔한 오해와 위험 신호, 검사·치료 설명에서 물어볼 점을 다룹니다. 검사·수치 안내는 결과지의 용어와 해석의 한계를 구분합니다. 기록 도구는 관찰한 사실과 질문을 진료에 가져가기 위한 보조 자료이며 진단 결과를 계산하지 않습니다.", links: [{ href: "/health", label: "질환·검사·도구 중 필요한 안내 찾기" }] },
      { title: "의료 서비스와는 다릅니다", body: "병원이나 정부기관의 서비스가 아니며 개인 진단, 처방, 치료 결정이나 응급상담을 제공하지 않습니다. 공식 출처가 붙었다고 오누림 문장이 의료인의 검수를 끝냈다는 뜻은 아닙니다. 현재 면허 의료인 검수는 미완료입니다.", links: [{ href: "/health/trust/medical-review-policy", label: "의료 검토의 현재 상태와 완료 조건" }] },
      { title: "누가 운영하고 작성하나요?", body: "운영 주체는 Biz2Lab, 공개 작성자는 박영훈 비의료인 건강정보 편집자입니다. 작성자 역할과 출처 확인, 의료인 검수는 구분해서 표시합니다. 임상 경력이나 의료 면허가 있는 작성자로 소개하지 않습니다.", links: [{ href: "/health/trust/author", label: "박영훈 편집자의 역할과 한계" }] },
      { title: "설명과 그림은 어떻게 확인하나요?", body: "공식기관·의료기관의 환자용 자료를 바탕으로 문장과 질문 도구를 새로 구성합니다. 각 안내의 출처에서 원문과 날짜를 확인할 수 있습니다. AI 생성 삽화는 교육용 개념 표현이며 실제 검사 영상이나 환자 사례가 아닙니다.", links: [{ href: "/health/trust/sources-policy", label: "출처 선정·확인 원칙" }, { href: "/health/trust/ai-disclosure", label: "AI 보조와 시각자료의 한계" }] },
      { title: "틀리거나 헷갈리는 표현을 발견했다면", body: "제보할 내용과 공개 게시 주의사항은 정정 정책에서 확인하세요. 현재 제보 접수 가능 여부는 별도 확인이 필요합니다. 공개 게시물에는 본인이나 가족의 의료기록·연락처를 올리지 마세요. 정정 문의는 개인 의료상담이나 응급 도움을 대신하지 않습니다.", links: [{ href: "/health/trust/corrections-policy", label: "정정 정책과 공개 게시 주의사항" }] },
    ],
  },
  {
    slug: "author",
    title: "박영훈 · 비의료인 건강정보 편집자",
    seoTitle: "박영훈: 오누림 비의료인 건강정보 편집자의 역할",
    description: "오누림 공개 작성자 박영훈의 비의료 건강정보 편집 역할과 한계입니다. AI 보조, 공식 출처 대조와 면허 의료인 검수를 구분하며 개인 진단·처방·상담을 제공하지 않습니다.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "박영훈은 오누림의 공개 작성자이자 비의료인 건강정보 편집자입니다. 건강정보를 읽고 기록하고 진료에서 질문할 준비를 돕는 자료를 편집하는 역할입니다.",
    sections: [
      { title: "편집자로서 맡는 일", body: "운영 주체 Biz2Lab의 오누림 건강정보에서 문장 구성과 출처 연결을 관리합니다. 공식기관·의료기관의 환자용 설명을 바탕으로 낯선 용어를 풀고, 기록표와 질문 도구를 구성하는 역할입니다. 모든 자료를 한 사람이 직접 임상 검증했다는 의미는 아닙니다.", links: [{ href: "/health/trust/editorial-policy", label: "건강정보 작성·수정의 편집 원칙" }] },
      { title: "의료 전문가로 소개하지 않습니다", body: "의사, 간호사, 약사, 치료사, 영양사 또는 임상 연구자가 아닙니다. 임상 자격이나 진료 경력을 근거로 글을 작성하는 역할이 아니며 개인 진단, 처방, 치료 결정과 응급상담을 제공하지 않습니다. 작성자 이름이 있다는 사실은 의료 검수나 치료 효과를 보장하지 않습니다." },
      { title: "AI 보조와 작성자의 역할", body: "자료 정리·초안·문장 점검·시각자료 제작에는 AI 보조를 사용합니다. 작성자 이름을 표시한 것이 AI 작업을 모두 인간이 수행했다는 뜻은 아닙니다. AI의 출처 대조와 인간의 직접 확인, 의료인의 임상 검수는 다른 단계이며 완료 여부를 섞어 표시하지 않습니다.", links: [{ href: "/health/trust/ai-disclosure", label: "AI가 사용되는 범위와 검증 한계" }, { href: "/health/trust/sources-policy", label: "공식 출처를 확인하는 기준" }] },
      { title: "의료 검토와 정정은 어떻게 확인하나요?", body: "현재 면허 의료인 검토자는 배정되지 않았고 의료 검수도 미완료입니다. 공식 출처가 연결되어 있어도 임상 검토를 마친 글로 읽지 마세요. 문장 오류를 알리는 방법과 접수 가능 여부의 확인 한계는 정정 정책에서 안내합니다.", links: [{ href: "/health/trust/medical-review-policy", label: "면허 의료인 검토의 현재 상태" }, { href: "/health/trust/corrections-policy", label: "오류 정정 정책과 접수 경로의 한계" }] },
    ],
  },
  {
    slug: "editorial-policy",
    title: "편집 정책",
    seoTitle: "오누림 편집 정책: 작성·수정·확인 단계를 구분하는 원칙",
    description: "오누림이 독자의 질문에 맞춰 건강정보를 구성하고 문장·출처·수정일을 관리하는 원칙입니다. AI 보조, 출처 대조, 의료 검수와 실제 독자 테스트의 완료 상태를 구분합니다.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "글을 읽은 사람이 무엇을 이해하고 어떤 질문을 준비할지에서 시작합니다. 출처를 붙이는 작업과 의료 검수, 실제 독자의 이해 확인은 서로 다른 일입니다.",
    sections: [
      { title: "페이지마다 해결할 질문을 먼저 정합니다", body: "검사 용어가 궁금한 경우에는 결과지에서 읽을 부분을, 응급 행동이 중요한 경우에는 도움 요청을 먼저 설명합니다. 모든 질환에 같은 목차나 질문을 반복하지 않고 혼동하기 쉬운 부분에 맞춰 순서를 정합니다. 공포·과장이나 글의 길이보다 이해, 기록, 진료 질문과 도움 요청을 우선합니다." },
      { title: "근거를 확인하되 독립적으로 구성합니다", body: "의학적 설명은 공식기관·의료기관 등의 원문과 대조하고 적용 범위와 한계를 함께 적는 것을 원칙으로 합니다. 원문 문단·표·삽화를 복사하거나 한 자료를 가깝게 바꾸어 쓰지 않습니다. 자료 정리·초안·문장 점검·시각자료에는 AI 보조를 사용하며 이를 인간이 직접 수행한 확인으로 표시하지 않습니다.", links: [{ href: "/health/trust/sources-policy", label: "문장에 맞는 출처 선정과 확인 기준" }, { href: "/health/trust/ai-disclosure", label: "AI 보조의 사용 범위" }] },
      { title: "절차와 완료 사실을 구분합니다", body: "작성자 표시, 출처 대조, 면허 의료인의 검수, 실제 독자 테스트와 운영자의 공개 결정은 각각 별도로 확인할 단계입니다. 현재 면허 의료인 검토자는 미배정이고 의료 검수와 실제 일반 독자 테스트는 미완료입니다. 기존 두 파일럿의 AI 합성 독자 점검 기록은 실제 사람의 평가도, 현재 모든 글에 대한 검증 결과도 아닙니다.", links: [{ href: "/health/trust/author", label: "비의료인 편집자의 역할" }, { href: "/health/trust/medical-review-policy", label: "의료 검토의 현재 상태" }] },
      { title: "내용을 바꾼 때와 근거를 본 때를 나눕니다", body: "문장을 실제로 수정할 때 해당 페이지의 변경일을 기록합니다. 출처 원문의 발행·수정일과 오누림이 원문을 대조한 날은 다르므로 섞지 않습니다. 사이트를 다시 배포했다는 이유만으로 모든 글을 최신으로 표시하지 않으며 글의 수정일을 의료 검수일로 쓰지 않습니다.", links: [{ href: "/health/trust/corrections-policy", label: "정정할 내용·이유·근거를 기록하는 원칙" }] },
      { title: "기술 점검을 의료 판정으로 바꾸지 않습니다", body: "화면·링크·접근성 점검은 독자가 내용을 이용할 수 있는지 확인하는 작업입니다. 테스트 통과, 검색 노출이나 광고 심사가 문장의 임상적 정확성을 보증하지는 않습니다. 개인 진단·약 조절 지시로 읽힐 표현은 피하고 의료 판단에 영향을 주는 수정은 면허 검토가 필요한 대상으로 구분합니다." },
    ],
  },
  {
    slug: "sources-policy",
    title: "출처 정책",
    seoTitle: "오누림 출처 정책: 자료 선정·날짜·적용 범위 확인",
    description: "오누림의 건강정보 출처 선정과 원문 대조 원칙입니다. 기관명뿐 아니라 문장을 뒷받침하는 내용·날짜·국내 적용 범위를 확인하며, 출처 확인과 면허 의료인 검수를 구분합니다.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "유명한 기관의 링크가 있다는 것만으로 설명이 뒷받침되지는 않습니다. 그 원문이 해당 문장과 적용 범위를 실제로 설명하는지 확인하는 것이 출처 대조의 기준입니다.",
    sections: [
      { title: "질문에 맞는 원문을 고릅니다", body: "국내 안내와 도움 요청에는 질병관리청·국가건강정보포털 등 국내 공공기관 자료를 우선 확인합니다. 설명할 내용에 따라 WHO·NIH·CDC·NHS, 대학병원·전문학회와 동료심사 문헌을 함께 검토합니다. 기관을 일렬로 순위 매기는 대신 대상 독자, 주제, 현재성, 근거의 범위가 문장에 맞는지를 봅니다." },
      { title: "링크 수보다 문장과의 연결을 봅니다", body: "기관 홈페이지나 검색 결과 제목만으로 의학 문장을 확인한 것으로 처리하지 않습니다. 가능한 한 해당 내용을 담은 원문으로 연결하고, 한 자료에서 말하지 않은 결론을 덧붙이지 않습니다. 블로그·인플루언서 게시물·판매용 마케팅·출처 불명 영상은 주된 의학 근거로 쓰지 않습니다.", links: [{ href: "/health/guides/understanding-hba1c", label: "출처와 설명을 함께 읽는 예: HbA1c 안내" }] },
      { title: "원문의 날짜와 확인한 날은 다릅니다", body: "출처 목록의 자료 날짜는 원문이 표시한 발행·수정·검토일을 구분해 기록하고, 열람·대조한 날은 별도로 관리합니다. 원문에 날짜가 없으면 미표시로 남기며 저작권 연도나 예정된 검토일을 실제 수정일로 대신하지 않습니다. 새 자료가 나왔다는 이유만으로 관련 없는 문장까지 최신으로 표시하지 않습니다." },
      { title: "해외 설명을 국내 개인 지시로 옮기지 않습니다", body: "국가별 연락처·의료 이용 경로·검사와 치료 기준의 차이를 확인합니다. 해외 환자용 안내의 약 용량이나 특정 조건을 국내 모든 독자의 자가치료 지시로 바꾸지 않습니다. 원문끼리 조건이나 설명이 다르면 차이를 생략해 확정적인 결론을 만들지 않고 면허 검토가 필요한 부분으로 구분합니다.", links: [{ href: "/health/trust/medical-review-policy", label: "출처 대조로 대신할 수 없는 의료 검토" }] },
      { title: "출처 확인에도 한계가 있습니다", body: "공식 자료의 사실을 참고하되 문단·표·삽화를 복사하지 않고 독립적인 설명을 구성합니다. 출처 개수나 링크 점검 통과가 의료 검수 완료를 뜻하지 않습니다. 현재 면허 의료인 검수는 미완료이며 링크가 끊기거나 원문과 다른 표현을 발견하면 정정 정책의 경로와 확인 한계를 참고하세요.", links: [{ href: "/health/trust/corrections-policy", label: "출처 오류·링크 문제의 정정 안내" }, { href: "/health/trust/editorial-policy", label: "작성과 수정 단계의 편집 원칙" }] },
    ],
  },
  {
    slug: "medical-review-policy",
    title: "의료 검토 정책",
    seoTitle: "오누림 의료 검토 현황: 검토자 미배정·검수 미완료",
    description: "오누림은 현재 면허 의료인 검토자가 미배정이고 의료 검수는 시작되지 않았습니다. 기존 47개 고위험 문장 패킷의 준비와 실제 검토·완료의 차이, 출처 대조의 한계를 안내합니다.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "현재 면허 의료인 검토자는 미배정이며, 의료 검수는 시작되지 않았고 완료되지도 않았습니다. 공식 출처가 연결되어 있거나 검토 자료가 준비되어 있다는 이유로 검수 완료를 뜻하지 않습니다.",
    sections: [
      { title: "준비된 자료와 아직 하지 않은 검토", body: "기존 47개 고위험 문장의 현재 표현·공식 출처·위험등급·검토 질문을 묶은 패킷이 준비되어 있습니다. 이는 검토자가 승인한 47개 문장이 아닙니다. 검토자 섭외 단계에 머물러 있으며, 이후 추가·수정된 문장이 이 패킷만으로 검토 대상에 모두 포함되었다고 볼 수도 없습니다. 실제 검토 전에는 대상 문장과 버전을 다시 대조해야 합니다." },
      { title: "누가 무엇을 확인했는지 나눕니다", body: "비의료인 편집자의 문장 정리, 원문 출처 대조와 면허 의료인의 임상 검토는 다릅니다. AI 점검이나 링크 접속 성공도 의료인의 판정을 대신하지 않습니다. 의료 검수 완료 표시를 사용하려면 실제 자격을 확인한 검토자가 해당 문장과 버전을 검토한 기록이 있어야 합니다.", links: [{ href: "/health/trust/author", label: "현재 작성자의 역할과 자격 범위" }, { href: "/health/trust/sources-policy", label: "출처 대조가 확인하는 범위" }] },
      { title: "검토가 시작되면 구분해 기록할 내용", body: "검토자 배정·실제 검토 시작·결과 수령·수정 반영을 별도 단계로 기록합니다. 문장별 승인, 수정 필요, 삭제 필요, 전문분야 검토 필요 판정을 받고 미해결 항목을 남깁니다. 일부 문장의 승인이 전체 사이트나 이후 수정본의 의료 검수를 뜻하지 않습니다. 지금은 이러한 결과를 받은 상태가 아닙니다." },
      { title: "독자가 지금 알아야 할 한계", body: "오누림은 일반 건강교육 자료이며 개인의 진단·처방·치료 결정을 대신하지 않습니다. 실제 일반 독자 테스트도 아직 실시하지 않았습니다. 읽기 편한지의 확인은 임상 정확성을 보증하지 않으며, 의료 판단에 영향을 주는 후속 문장 수정에는 다시 의료인의 확인이 필요합니다.", links: [{ href: "/health/trust/disclaimer", label: "건강정보를 이용할 때의 한계" }, { href: "/health/trust/corrections-policy", label: "오류 제보 경로와 현재 접수 확인 상태" }] },
    ],
  },
  {
    slug: "corrections-policy",
    title: "정정 정책",
    seoTitle: "오누림 정정 정책: 오류 제보와 접수 경로 확인",
    description: "오누림의 사실 오류·출처 문제를 알릴 때 필요한 내용과 공개 게시 주의사항입니다. GitHub Issues 목록은 열람되지만 일반 독자의 새 글 접수 가능 여부는 아직 확인되지 않았습니다.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "사실 오류, 출처 문제와 오해를 부르는 문장을 어떻게 확인하고 정정하는지 안내합니다. 제보 경로의 공개 열람과 실제 접수 가능 여부는 구분합니다.",
    sections: [
      { title: "제보 경로의 현재 확인 상태", body: "2026-09-07 확인 시 Biz2Lab 공개 GitHub Issues 목록은 열리지만 새 글 작성 제한 안내가 표시됩니다. 일반 독자의 실제 접수 가능 여부는 확인되지 않았습니다. 로그인만 하면 작성할 수 있다고 보장하지 않으며, 현재 정상 접수가 검증된 채널로 안내하지 않습니다. 이메일 채널도 활성화·송수신 검증을 마치지 않았습니다.", links: [{ href: "https://github.com/mizzang0305-oss/Biz2Lab_Os/issues", label: "공개 GitHub Issues 목록 열기 (외부 사이트)" }] },
      { title: "제보 경로를 이용할 수 있을 때 필요한 내용", body: "문제가 있는 오누림 페이지 URL, 해당 문장, 잘못되었거나 헷갈린 이유를 적습니다. 확인 가능한 공식 출처가 있다면 원문 링크와 관련 부분을 함께 제시합니다. 본인이나 가족의 검사 결과를 보내야 사실 오류를 알릴 수 있는 것은 아닙니다." },
      { title: "공개 게시물에 올리지 마세요", body: "GitHub Issues는 비공개 의료상담 창구가 아닙니다. 이름·연락처·주민번호·계정정보, 진단명·검사값·처방전·의료기록·검사 이미지를 게시하거나 첨부하지 마세요. 외부 게시물은 GitHub의 공개 범위와 정책을 따르며 오누림이 비밀 보관을 보장하지 않습니다.", links: [{ href: "/health/trust/privacy", label: "기록 도구와 외부 서비스의 개인정보 안내" }] },
      { title: "정정 내용을 확인하고 반영하는 원칙", body: "원문 출처의 내용·날짜·적용 범위와 해당 문장을 대조합니다. 수정할 때에는 대상 문장, 변경 이유와 근거를 기록하고 실제 변경일을 표시합니다. 의료 판단에 영향을 주는 수정은 면허 의료인의 확인이 필요한 대상으로 남깁니다. 출처 대조만으로 의료 검수 완료로 바꾸지 않으며 모든 제안의 채택이나 일정한 응답 기한을 약속하지 않습니다.", links: [{ href: "/health/trust/sources-policy", label: "출처를 대조하는 기준" }, { href: "/health/trust/medical-review-policy", label: "의료 검토의 현재 상태와 한계" }] },
      { title: "정정 문의가 아닌 경우", body: "정정 채널은 개인의 진단·치료·약물 상담이나 응급 도움을 제공하지 않습니다. 위급한 상황에서 게시·답변을 기다리지 마세요.", links: [{ href: "/health/guides/danger-signals", label: "온라인 정보보다 도움 요청이 먼저인 위험 신호" }] },
    ],
  },
  {
    slug: "ai-disclosure",
    title: "AI 활용 공개",
    seoTitle: "오누림 AI 활용 공개: 사용 범위와 검증의 한계",
    description: "오누림은 자료 정리·초안·문장 점검·시각자료 제작에 AI 보조를 활용합니다. 합성 독자 점검과 실제 사람의 의견, 출처 확인과 의료 검수의 차이를 공개합니다.",
    updatedAt: "2026-09-07",
    indexDecision: "INDEX_SUPPORT",
    intro: "오누림의 자료 정리, 글의 구조와 초안, 문장 점검, 시각자료 제작에는 AI 보조가 사용됩니다. AI를 썼다는 사실과 무엇을 실제로 검증했는지는 별도로 공개해야 합니다.",
    sections: [
      { title: "AI의 답이 곧 사실 확인은 아닙니다", body: "그럴듯한 설명에도 틀린 내용이나 빠진 조건이 있을 수 있습니다. AI가 제시한 기관명·링크·문장을 그 자체로 의학 근거로 취급하지 않습니다. 원문 대조, 인간이 실제 수행한 편집, 면허 의료인의 검토를 서로 구분하며 하지 않은 확인을 완료했다고 표시하지 않습니다.", links: [{ href: "/health/trust/sources-policy", label: "출처 원문을 확인하는 원칙" }, { href: "/health/trust/author", label: "공개 작성자의 비의료 편집 역할" }] },
      { title: "합성 독자 점검은 실제 사람의 의견이 아닙니다", body: "기존 고혈압·제2형 당뇨병 두 파일럿에서는 AI로 가상의 독자 반응을 살피는 내부 시뮬레이션을 수행했습니다. 이는 실제 사람 5명이 읽은 결과가 아니며, 이후 추가·수정된 모든 페이지의 검증 결과도 아닙니다. 실제 일반 독자 테스트는 아직 실시하지 않았습니다. 합성 점검 통과를 임상 안전성이나 실제 가독성의 증명으로 쓰지 않습니다." },
      { title: "그림과 도식은 교육용으로 읽어 주세요", body: "AI 보조 또는 프로그램으로 만든 그림은 설명을 돕는 삽화·도식이며 실제 환자 사진, 검사 결과나 진단 영상이 아닙니다. 단순화된 그림만으로 신체 구조나 본인의 상태를 판단하지 마세요. 이미지 파일의 변경 이력과 연결된 설명을 관리하는 일도 의료인의 영상 검수와는 다릅니다." },
      { title: "현재 남아 있는 확인 단계", body: "면허 의료인 검토자는 미배정이고 의료 검수는 미완료입니다. 공개 작성자 표시는 모든 문장을 사람이 직접 작성·검증했다는 뜻이 아닙니다. 잘못되거나 기계적으로 느껴지는 설명을 발견하면 정정 안내에서 현재 접수 경로와 확인 한계를 먼저 살펴보세요.", links: [{ href: "/health/trust/medical-review-policy", label: "의료 검토가 아직 시작되지 않은 현재 상태" }, { href: "/health/trust/corrections-policy", label: "오류·혼란 문장의 정정 안내" }] },
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
    seoTitle: "오누림 개인정보 안내: 인쇄 기록과 Google 정보 처리",
    description: "오누림 기록표는 인쇄 후 작성하며 화면의 체크에는 저장·제출 기능이 없습니다. 이 범위와 별도로 Google 이용 측정·광고 정보 처리, 공개 문의와 출력물 보관에 유의하세요.",
    updatedAt: "2026-09-07",
    indexDecision: "NOINDEX_FOLLOW",
    intro: "건강 기록 도구의 내용과 사이트 방문 정보는 다르게 다뤄집니다. 도구에 저장·제출 기능이 없다는 말은 사이트 방문 중 어떤 정보도 처리되지 않는다는 뜻이 아닙니다.",
    sections: [
      { title: "기록표와 화면의 체크", body: "기록표의 빈칸은 인쇄한 뒤 손으로 작성합니다. 건강 수치를 화면에 입력해 계정이나 서버에 보관하는 기능은 없습니다. 일부 질문·체크 도구의 화면 체크는 임시 표시이며 오누림의 저장·제출 기능과 연결되지 않습니다. 브라우저가 화면 상태를 유지할 수 있으므로 창을 닫는 것만으로 흔적이 모두 삭제된다고 보장하지 않습니다." },
      { title: "종이와 저장한 파일도 직접 관리하세요", body: "인쇄하거나 기기에 PDF로 저장한 자료는 사용자가 보관하는 사본입니다. 공용 프린터에 출력물을 남기거나 공용 기기에 개인 기록을 저장하지 마세요. 가족의 기록을 보여줄 때에도 필요한 범위와 당사자의 의사를 확인하세요. 오누림에는 사용자의 종이 기록이나 기기 사본을 대신 삭제하는 기능이 없습니다." },
      { title: "Google 측정·광고와 방문 정보", body: "공개 사이트에는 이용 측정을 위한 Google Analytics와 광고 서비스를 위한 Google AdSense 코드가 포함되어 있습니다. 실제 처리는 브라우저·서비스 설정 등에 따라 달라질 수 있습니다. Google의 안내에 따르면 이런 서비스를 사용하는 사이트에서는 페이지 URL·IP 주소 등 방문 정보가 전달되고 쿠키가 설정되거나 읽힐 수 있습니다. 이는 건강 기록표의 값을 제출하는 기능과 다릅니다. 코드가 포함되었다는 사실이 광고 승인이나 실제 광고 노출을 뜻하지는 않습니다." },
      { title: "이용자가 확인할 수 있는 설정", body: "아래 Google 광고 설정에서 개인 맞춤 광고 설정을 살펴보고, 브라우저 설정에서 쿠키를 삭제하거나 제한할 수 있습니다. 광고 개인 최적화를 끄거나 비공개 탐색을 사용하는 것만으로 모든 방문 정보 처리가 중단되는 것은 아닙니다. 자세한 처리 목적과 선택 방법은 아래 Google 파트너 사이트 안내를 확인하세요." },
      { title: "공개 정정 경로에 건강정보를 올리지 마세요", body: "GitHub Issues는 비공개 의료상담 창구가 아닙니다. 이름·연락처·진단명·검사값·처방전·의료기록·계정정보를 게시하거나 첨부하지 마세요. 외부 계정과 게시물은 GitHub의 공개 범위와 정책을 따릅니다. 현재 일반 독자의 접수 가능 여부와 이메일 송수신은 검증되지 않았습니다.", links: [{ href: "/health/trust/corrections-policy", label: "정정 경로의 현재 상태와 공개 게시 주의사항" }] },
      { title: "이 안내의 범위와 변경", body: "운영은 Biz2Lab이 담당합니다. 이 안내는 현재 건강 도구와 공개 페이지의 동작을 설명하며 법률 검토나 모든 외부 서비스 설정의 검증 완료를 뜻하지 않습니다. 새로운 개인정보 수집 기능을 추가하기 전에는 목적·항목·보관 기간·삭제 방법·운영 책임자를 별도로 확인하고 공개해야 합니다. 확인되지 않은 보관 기간이나 삭제 기한을 임의로 약속하지 않습니다.", links: [{ href: "/health/trust/contact", label: "문의 경로와 접수 확인 한계" }] },
    ],
  },
  {
    slug: "advertising",
    title: "광고 정책",
    seoTitle: "오누림 광고 정책: 편집 독립성과 의료 권고의 구분",
    description: "광고와 오누림 건강정보는 구분되어야 합니다. 광고를 의료 권고나 제품 효과의 보증으로 읽지 않도록 편집 원칙, 표시 기준, 개인정보 안내를 설명합니다.",
    updatedAt: "2026-09-07",
    indexDecision: "NOINDEX_FOLLOW",
    intro: "오누림은 광고와 건강정보를 구분하는 편집 원칙을 적용합니다. 광고가 보인다는 이유로 그 상품·서비스가 오누림의 의료 권고이거나 효과가 검증되었다고 판단하지 마세요.",
    sections: [
      { title: "광고보다 질문과 출처가 편집 기준입니다", body: "질환 선정, 문장의 결론과 출처 판단을 광고 수익에 맞춰 바꾸지 않는 것이 운영 원칙입니다. 광고주나 판매자가 제시한 문구·추천 순위를 원문 대조나 의료인의 판단 대신 사용하지 않습니다. 이 원칙이 개별 문장의 면허 의료인 검수 완료를 뜻하지는 않습니다.", links: [{ href: "/health/trust/editorial-policy", label: "건강정보를 작성·수정하는 편집 원칙" }, { href: "/health/trust/medical-review-policy", label: "현재 의료 검토 상태" }] },
      { title: "광고가 노출될 때의 구분", body: "광고는 본문·출처·진료 안내와 구분되는 표시를 사용하고 의료 권고처럼 배치하지 않습니다. 건강정보를 읽거나 기록 도구를 쓰기 위해 광고 클릭이 필요하다고 안내하지 않습니다. 광고 코드가 설치된 상태와 실제 광고 승인·게재 상태는 서로 다릅니다." },
      { title: "과장된 표현과 정보 처리", body: "치료 효과 보장, 공포 유도와 허위 전후 비교를 광고 소재로 만들지 않는 원칙을 유지합니다. 외부 광고 문구의 모든 내용이 오누림에서 검증되었다고 보장하지 않습니다. Google 측정·광고 서비스가 방문 정보를 처리할 수 있는 범위와 이용자 설정은 개인정보 안내에서 확인하세요.", links: [{ href: "/health/trust/privacy", label: "Google 광고·측정 정보 처리와 설정 안내" }, { href: "/health/trust/corrections-policy", label: "혼동되는 표시의 정정 경로와 확인 한계" }] },
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
    seoTitle: "오누림 문의: 공개 경로와 접수 확인 상태",
    description: "오누림의 문의·정정 경로와 현재 확인 한계입니다. GitHub 공개 목록 열람과 새 글 접수는 다르며, 비공개 의료상담이나 이메일 접수는 제공이 검증되지 않았습니다.",
    updatedAt: "2026-09-07",
    indexDecision: "NOINDEX_FOLLOW",
    intro: "문의·정정 경로를 찾는 분을 위한 보조 안내입니다. 현재 일반 독자의 새 글 접수 가능 여부는 확인되지 않았습니다.",
    sections: [
      { title: "먼저 접수 경로의 상태를 확인하세요", body: "2026-09-07 확인 시 Biz2Lab GitHub Issues 공개 목록은 열리지만 새 글 작성 제한 안내가 있습니다. 로그인 후 일반 독자가 글을 제출할 수 있는지는 확인되지 않았고 이메일도 활성화·송수신 검증 전입니다. 접수 가능 여부와 정정에 필요한 내용은 정정 정책에서 구분해 안내합니다.", links: [{ href: "/health/trust/corrections-policy", label: "정정 정책: 접수 상태·필요한 내용 확인" }, { href: "https://github.com/mizzang0305-oss/Biz2Lab_Os/issues", label: "공개 GitHub Issues 목록 열기 (외부 사이트)" }] },
      { title: "공개 게시에 개인 정보를 넣지 마세요", body: "문의 경로는 비공개 상담·의료기록 제출 창구가 아닙니다. 이름·전화번호·주민번호·진단명·검사값·처방전·의료기록·계정정보를 공개 게시물이나 첨부파일에 넣지 마세요. 문제 페이지 URL과 문장만으로 설명하고 다른 사람의 정보도 올리지 마세요.", links: [{ href: "/health/trust/privacy", label: "외부 게시물과 개인정보 안내" }] },
      { title: "답변을 기다릴 곳이 아닌 경우", body: "개인의 진단·치료·약물 상담과 응급 도움을 제공하지 않습니다. 위급한 상황에서는 게시물이나 답변을 기다리지 말고 119에 연락하세요. 문의 접수나 정해진 기한 안의 답변을 보장하지 않습니다.", links: [{ href: "/health/guides/danger-signals", label: "응급 도움을 먼저 요청해야 하는 위험 신호" }] },
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
