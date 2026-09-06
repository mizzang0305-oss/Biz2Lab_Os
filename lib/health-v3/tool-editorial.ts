import { getSources, healthArticles, healthClaims, type HealthTool } from "./content";

export type ToolEditorial = {
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
