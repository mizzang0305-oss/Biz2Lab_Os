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
