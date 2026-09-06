import { getSources, healthArticles, healthClaims, type HealthTool } from "./content";

export type ToolEditorial = {
  indexDecision?: "INDEX_UTILITY" | "NOINDEX_FOLLOW";
  sheetNotice?: string;
  title: string;
  description: string;
  updatedAt: string;
  purpose: string;
  steps: string[];
  example: string;
  limitation: string;
  sourceIds: string[];
  links: Array<{ href: string; label: string }>;
};

// Per-page reviewed copy; absence retains existing metadata, never certification.
export const toolEditorial: Record<string, ToolEditorial> = {
  "diabetes-questions": {
    title: "제2형 당뇨병 진료 질문지: 검사 결과·기록 계획·저혈당 대처",
    description: "검사명·날짜·단위가 있는 결과지와 이미 남긴 혈당 기록, 현재 약 목록을 준비합니다. 개인 목표와 측정 계획, 저혈당 대처에서 모르는 점을 묻고 받은 답을 손으로 적는 진료 질문지입니다.",
    updatedAt: "2026-09-06",
    purpose: "검사표의 숫자와 집에서 남긴 기록을 구분해 질문할 때 쓰는 양식입니다. HbA1c와 한 번의 혈당을 같은 검사처럼 비교하거나 인터넷의 목표를 본인에게 그대로 적용하지 않도록, 개인 설명을 확인할 질문을 준비합니다.",
    steps: [
      "검사 결과지는 원본을 준비하고 검사명·검사일·단위를 먼저 확인합니다. 일부 숫자만 떼어 놓고 정상 여부를 단정하지 않습니다.",
      "이미 측정한 기록과 현재 약 목록에서 궁금한 점을 적습니다. 이 질문지를 채우려고 측정을 새로 시작하거나 처방을 바꾸지 않습니다.",
      "오늘 먼저 물을 질문을 표시합니다. 질문을 고르는 것이 새 증상·약 관련 변화 같은 중요한 정보를 생략하라는 뜻은 아닙니다.",
      "아래 답변 칸에 안내받은 개인 목표·측정 시간과 횟수·대처 계획·다음 연락 시점을 나누어 적습니다. 설명대로 하기 어려운 점과 이해하지 못한 부분은 그 자리에서 다시 묻습니다.",
    ],
    example: "질문을 구체화하는 예시: ‘검사표의 기준과 제 개인 목표는 같은가요?’, ‘제가 받은 저혈당 대처 계획에서 가족이 알아야 할 부분은 무엇인가요?’ 답변이 확인되지 않은 항목은 미확인으로 남기고 임의의 수치를 채우지 않습니다.",
    limitation: "질문지가 검사·치료 필요성이나 약·인슐린량을 결정하지 않습니다. 미리 받은 개인 조절·대처 계획은 따르고 불분명하면 의료진에게 확인합니다. 위급한 증상이 있으면 예약일이나 질문지 완성을 기다리지 않습니다.",
    sheetNotice: "의식이 흐려지거나 반응이 없거나 경련·심한 호흡곤란이 있으면 즉시 119에 연락합니다. 의식이 없거나 안전하게 삼킬 수 없는 사람에게 음식·물·약을 억지로 먹이지 않습니다.",
    sourceIds: ["SRC-NIDDK-MANAGING", "SRC-NIDDK-A1C", "SRC-NHS-LOW-GLUCOSE", "SRC-CDC-DKA", "SRC-KDCA-CPR"],
    links: [
      { href: "/health/guides/understanding-hba1c", label: "검사표의 HbA1c·NGSP·IFCC 표시 이해" },
      { href: "/health/tools/glucose-observation-log", label: "이미 측정한 값·시각·단위를 가져갈 혈당 기록표" },
      { href: "/health/guides/appointment-questions", label: "진료 후 답변·다음 일정·문의처 확인 순서" },
    ],
  },
  "glucose-observation-log": {
    title: "혈당 기록표: 실제 측정시각·기기 단위·식사와 활동",
    description: "이미 혈당을 측정하는 사람이 실제 잰 시각, 기기의 원래 값과 단위, 식사·활동·증상을 함께 남기는 인쇄 양식입니다. 개인 측정 계획에 따라 기록하며 목표 혈당이나 인슐린량을 계산하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "이미 의료진에게 안내받은 측정 계획으로 모은 결과를 진료에 가져갈 때 씁니다. 12줄은 인쇄 공간일 뿐 12번 측정이나 특정 기간의 권고가 아닙니다. 이 기록표로 측정을 새로 시작하거나 횟수를 늘리지 않습니다.",
    steps: [
      "한 줄에 한 번의 관찰을 적습니다. 날짜·시각은 표를 작성하는 시간이 아니라 실제 측정한 때입니다.",
      "기기에 보인 원래 값과 단위를 함께 옮깁니다. 서로 다른 단위를 임의로 섞거나 환산하지 않습니다. 기기·측정 방법은 아는 범위에서 메모하고 모르는 것은 추측하지 않습니다.",
      "식사한 실제 시각과 측정 전후 관계, 활동·증상·수면 등 평소와 다른 상황을 나란히 적습니다. 식사 후 정해진 시간에 새로 측정하라는 지시가 아닙니다.",
      "원본 기록을 진료에 가져가 목표 범위 밖의 결과나 반복되는 변화를 어떻게 대처할지 확인합니다. 이상 표시·증상이 생기면 메모만 하고 예약일까지 기다리지 말고 기존 기기 안내·개인 대처 계획에 따라 도움을 구합니다.",
    ],
    example: "작성 위치 예시: 실제 측정 시각 → 날짜·시각 칸 / 화면에 보인 결과 → 값·단위 칸 / 식사를 언제 했는지 → 식사 칸. 기억나지 않는 시각은 ‘미확인’으로 남깁니다. 가상의 정상값이나 좋은 기록 예시는 제시하지 않습니다.",
    limitation: "기록만으로 HbA1c·평균·정상 여부를 판정하거나 약·인슐린량을 결정하지 않습니다. 미리 받은 개인 조절·저혈당 대처 계획은 따르고 불분명한 부분은 의료진에게 확인합니다. 위급한 변화에는 기록보다 도움 요청이 먼저입니다.",
    sheetNotice: "의식이 흐려지거나 반응이 없거나 경련·심한 호흡곤란이 있으면 기록 대신 즉시 119에 연락합니다. 의식이 없거나 안전하게 삼킬 수 없는 사람에게 음식·물·약을 억지로 먹이지 않습니다.",
    sourceIds: ["SRC-NIDDK-MANAGING", "SRC-NIDDK-LIVING", "SRC-NHS-LOW-GLUCOSE", "SRC-CDC-DKA", "SRC-KDCA-CPR"],
    links: [
      { href: "/health/guides/understanding-hba1c", label: "한 번의 혈당 기록과 HbA1c가 다른 이유" },
      { href: "/health/tools/diabetes-questions", label: "측정 계획과 결과를 확인할 당뇨병 진료 질문" },
      { href: "/health/guides/medication-list", label: "기록과 함께 가져갈 현재 약 목록" },
    ],
  },
  "blood-pressure-warning": {
    indexDecision: "NOINDEX_FOLLOW",
    title: "119 경고 카드: 혈압 기록보다 도움 요청이 먼저인 때",
    description: "혈압을 다시 재거나 기록을 마치며 기다리지 않아야 할 위험 신호를 확인합니다. 고혈압 해설의 경고를 출처와 함께 인쇄하는 보조 카드이며 응급 여부를 판정하는 검사표가 아닙니다.",
    updatedAt: "2026-09-06",
    purpose: "평소에 읽고 눈에 띄는 곳에 둘 인쇄용 보조 안내입니다. 지금 위급한 변화가 있다면 출력이나 글 읽기를 마치려고 기다리지 않습니다.",
    steps: ["위 경고와 도움 요청 행동을 함께 읽습니다. 여러 항목에 동시에 해당해야 119에 연락하는 것은 아닙니다.", "인쇄할 때 위험 신호뿐 아니라 119 행동, 아래 한계와 출처까지 함께 남깁니다."],
    example: "이 카드는 체크 수나 점수를 계산하지 않습니다. 빈칸을 완성하거나 혈압 숫자를 알아야 사용할 수 있는 서류도 아닙니다.",
    limitation: "목록이 모든 위험 신호를 담지는 않습니다. 통증이 심해질 때까지 기다리는 기준이 아니며 질환을 스스로 확정하거나 약을 추가로 먹는 지시가 아닙니다.",
    sourceIds: ["SRC-KDCA-STROKE", "SRC-KDCA-MI", "SRC-AHA-HOME-BP"],
    links: [
      { href: "/health/guides/danger-signals", label: "위험 신호별 행동과 119에 전할 정보" },
      { href: "/health/stroke", label: "갑작스러운 얼굴·팔·말 변화와 도움 요청" },
      { href: "/health/acute-myocardial-infarction", label: "가슴 불편감을 기다리지 않아야 하는 이유" },
    ],
  },
  "blood-pressure-prep": {
    "title": "혈압 측정 준비 체크리스트: 측정 전 자세와 측정 후 기록",
    "description": "AHA의 가정 혈압 측정 안내를 바탕으로 측정 전 준비 5가지와 측정 후 기록 2가지를 나눕니다. 개인 측정 계획과 기기 안내를 확인하며 사용하는 인쇄용 체크리스트입니다.",
    "updatedAt": "2026-09-06",
    "purpose": "측정법을 읽은 뒤 같은 준비를 빠뜨리지 않으려 할 때 쓰는 확인표입니다. 체크를 모두 했다는 사실이 기기 정확도나 정상 혈압을 보장하지는 않습니다. AHA 안내를 바탕으로 구성했으며 의료진이 정한 개인 계획과 기기 설명도 함께 확인합니다.",
    "steps": [
      "‘측정 전’ 항목은 커프를 작동하기 전에 확인합니다. AHA는 흡연·카페인·운동을 30분 전부터 피하고, 방광을 비운 뒤 최소 5분 조용히 쉬도록 안내합니다.",
      "팔을 심장 높이로 받치고 맨팔에 맞는 커프를 댑니다. 커프 크기나 기기 사용이 맞는지 불분명하면 의료진·약사에게 확인합니다.",
      "‘측정 후’ 항목은 실제로 측정한 다음 확인합니다. AHA가 안내하는 1분 간격 두 측정의 원래 값과 시각을 각각 기록합니다. 표를 미리 모두 체크하지 않습니다."
    ],
    "example": "사용 순서 예시: 준비가 끝났다면 위쪽 항목을 확인 → 실제 측정 → 두 회차의 원래 값을 기록 → 아래쪽 항목 확인. 조건을 놓쳤다면 무엇이 달랐는지 메모하고, 원하는 값이 나올 때까지 반복 측정하는 방식으로 사용하지 않습니다.",
    "limitation": "측정 시간·횟수와 결과에 따른 개인 행동은 의료진과 확인합니다. 체크 수로 건강을 판정하거나 약을 바꾸지 않습니다. 가슴 통증·심한 호흡곤란·갑작스러운 마비나 말 이상 같은 위급한 변화가 있다면 준비표나 재측정 대신 즉시 119에 도움을 요청합니다.",
    "sourceIds": [
      "SRC-AHA-HOME-BP",
      "SRC-KDCA-HTN",
      "SRC-KDCA-STROKE",
      "SRC-KDCA-MI"
    ],
    "links": [
      {
        "href": "/health/guides/measuring-blood-pressure",
        "label": "AHA·국내 기관의 측정 안내와 조건 차이 이해"
      },
      {
        "href": "/health/tools/blood-pressure-log",
        "label": "두 회차의 원래 값을 나누어 남길 혈압 기록표"
      },
      {
        "href": "/health/tools/blood-pressure-questions",
        "label": "커프·측정 조건·개인 계획을 확인할 진료 질문"
      }
    ]
  },
  "blood-pressure-questions": {
    "title": "고혈압 진료 질문지: 집에서 잰 기록과 다음 측정 계획 확인",
    "description": "가정 혈압 기록·혈압계·약 정보를 준비하고, 병원과 집의 차이와 개인 측정 일정을 질문합니다. 먼저 물을 내용, 받은 답과 다음 연락 계획을 손으로 남기는 진료 준비 양식입니다.",
    "updatedAt": "2026-09-06",
    "purpose": "집에서 측정한 결과를 진료 대화로 옮길 때 씁니다. 숫자를 판정하는 표가 아니라 지금 궁금한 점과 의료진의 개인별 안내를 구분하는 질문지입니다. 모든 질문에 답을 받아야만 진료가 끝나는 것은 아닙니다.",
    "steps": [
      "원래 혈압 기록과 사용 중인 혈압계 정보를 준비합니다. 약 이름이나 사용법이 불분명하면 실제 안내문을 가져가 확인할 질문으로 적습니다.",
      "가장 먼저 확인할 질문을 표시합니다. 질문 순서를 고르는 것이 새로운 증상이나 중요한 약 관련 정보를 생략하라는 뜻은 아닙니다.",
      "병원과 집에서 측정값이 달랐다면 어느 쪽을 지울지 결정하지 말고 두 장소의 기록과 측정 조건을 함께 보여 줍니다.",
      "아래 답변 칸에는 안내받은 측정 시간·횟수·다음 연락 시점·문의처를 구분해 적습니다. 하기 어려운 조건이 있으면 가능한 방법을 다시 묻습니다."
    ],
    "example": "질문을 구체화하는 예시: ‘혈압이 괜찮나요?’ 대신 ‘집과 병원의 기록이 다른데 측정 조건에서 확인할 점이 있나요?’라고 물을 수 있습니다. 답변 칸에는 설명받은 계획을 쓰고, 듣지 못한 일정은 추측해 채우지 않습니다.",
    "limitation": "이 질문지는 검사 필요성이나 약 변경을 미리 결정하지 않습니다. 가슴 통증·심한 호흡곤란·갑작스러운 마비나 말 이상처럼 위급한 변화가 있다면 예약일까지 기다리거나 질문지를 완성하지 말고 119 도움을 받습니다.",
    "sourceIds": [
      "SRC-AHA-HOME-BP",
      "SRC-KDCA-HTN",
      "SRC-KDCA-STROKE",
      "SRC-KDCA-MI"
    ],
    "links": [
      {
        "href": "/health/tools/blood-pressure-log",
        "label": "측정 회차와 원래 값을 남길 혈압 기록표"
      },
      {
        "href": "/health/guides/appointment-questions",
        "label": "진료 답변·다음 일정·문의처를 확인하는 방법"
      },
      {
        "href": "/health/guides/medication-list",
        "label": "약 이름·함량·사용 안내를 구분한 목록"
      }
    ]
  },
  "blood-pressure-log": {
    title: "가정 혈압 기록표: 측정 회차와 원래 값을 남기는 인쇄 양식",
    description: "날짜·시간과 측정 회차, 수축기·이완기·맥박의 단위, 측정 조건을 한 줄씩 적습니다. 두 번의 원래 값을 남기는 인쇄용 양식이며 평균·진단·약 변경을 계산하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "이미 안내받은 가정 혈압 측정 계획에 따라 기록을 가져갈 때 씁니다. 표의 14줄은 인쇄 공간이며 7일 측정이나 하루 횟수를 처방하는 기준이 아닙니다. 사용할 기간·시간·횟수는 의료진과 정하세요.",
    steps: [
      "측정 준비 안내를 확인하고 안정한 뒤 측정합니다. 쉬기 전후를 비교하는 실험표가 아닙니다.",
      "한 번의 측정값을 한 줄에 씁니다. 같은 시점에 두 번 측정했다면 1차·2차를 서로 다른 줄에 남기고 날짜·시간을 각각 적습니다. AHA는 1분 간격의 두 측정값 기록을 안내합니다.",
      "수축기와 이완기는 mmHg, 기기에 표시된 맥박은 회/분으로 원래 표시값을 옮깁니다. 기기 오류 표시는 정상 숫자로 추측하지 말고 메모합니다.",
      "평소와 다른 측정 조건·증상·안내받은 약 관련 메모를 별도로 적고 원본을 진료에 가져갑니다. 높은 값이나 낮은 값을 골라 지우지 않습니다.",
    ],
    example: "작성 위치 예시(환자 데이터 아님): 날짜·시간 → 실제 측정 시각 / 회차 → 1차 또는 2차 / 수축기·이완기 → 기기에 나온 각각의 값 / 메모 → 말했음·커프 다시 확인 등 실제 상황. 이 예시는 정상값이나 목표값을 제시하지 않습니다.",
    limitation: "한 번의 수치로 진단하거나 처방약을 바꾸지 않습니다. 재측정 후에도 매우 높은 값이면 며칠 동안 기록을 모으느라 기다리지 말고 즉시 의료진에게 연락합니다. 가슴 통증·심한 호흡곤란·갑작스러운 마비나 말 이상 같은 위급한 변화에는 표를 채우거나 다시 재며 기다리지 말고 119 도움을 받습니다.",
    sourceIds: ["SRC-AHA-HOME-BP", "SRC-KDCA-HTN", "SRC-KDCA-STROKE", "SRC-KDCA-MI"],
    links: [
      { href: "/health/guides/measuring-blood-pressure", label: "안정·자세·두 번 측정의 준비 순서" },
      { href: "/health/tools/blood-pressure-questions", label: "작성한 혈압 기록을 가져갈 진료 질문" },
      { href: "/health/guides/danger-signals", label: "기록보다 즉시 도움이 먼저인 위험 신호" },
    ],
  },
};

export function getToolSafetyNotice(tool: HealthTool) {
  if (tool.kind !== "warning" && !["stroke", "acute-myocardial-infarction", "migraine", "depression"].includes(tool.articleSlug)) return undefined;
  const notice = healthArticles[tool.articleSlug].sections.find(section => section.tone === "warning");
  if (!notice) throw new Error(`Missing existing safety notice: ${tool.slug}`);
  return notice;
}

export function getToolSources(tool: HealthTool) {
  const sourceIds = toolEditorial[tool.slug]?.sourceIds ?? tool.claimIds.flatMap(id => {
    const claim = healthClaims.find(claim => claim.id === id);
    if (!claim) throw new Error(`Missing tool claim: ${id}`);
    return claim.sourceIds;
  });
  const uniqueIds = [...new Set([...sourceIds, ...(getToolSafetyNotice(tool)?.sourceIds ?? [])])];
  const sources = getSources(uniqueIds);
  if (sources.length !== uniqueIds.length) throw new Error(`Unresolved tool source: ${tool.slug}`);
  return sources;
}
