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
      { title: "Google 측정과 광고", body: "Production 사이트는 이용 현황을 이해하기 위해 Google Analytics를, 광고 제공을 위해 Google AdSense를 사용할 수 있습니다. 이 과정에서 Google과 광고 파트너가 쿠키 또는 유사한 식별자를 사용하고 브라우저·기기 정보와 페이지 이용 정보를 처리할 수 있지만, 오누림 건강 도구에 적은 내용은 서버로 제출하지 않습니다." },
      { title: "선택과 외부 정책", body: "Google 광고 설정에서 맞춤 광고를 관리할 수 있고 브라우저 설정에서 쿠키를 삭제하거나 제한할 수 있습니다. Google 서비스의 정보 처리 방식은 Google의 파트너 사이트 정책에서 확인합니다." },
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
