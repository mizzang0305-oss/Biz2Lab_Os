import type { HealthArticleSlug, HealthTool } from "./content";

// Navigation summaries, not symptom matching or medical recommendations.
export const hubConditions: Record<HealthArticleSlug, { name: string; detail: string }> = {
  hypertension: { name: "고혈압", detail: "측정 조건·원래 혈압 값과 진료 질문" },
  "type-2-diabetes": { name: "제2형 당뇨병", detail: "혈당검사의 역할과 개인 관리 질문" },
  "allergic-rhinitis": { name: "알레르기 비염", detail: "코 증상·환경 관찰과 알레르기 검사" },
  "gastroesophageal-reflux-disease": { name: "위식도역류질환(역류성 식도염)", detail: "속쓰림이 생기는 때와 다른 불편의 구분" },
  osteoarthritis: { name: "골관절염", detail: "통증뿐 아니라 일상 동작에서 달라진 점" },
  osteoporosis: { name: "골다공증", detail: "골밀도검사·골절 이력과 집안 환경" },
  dyslipidemia: { name: "이상지질혈증", detail: "LDL·HDL·중성지방과 검사 준비 질문" },
  obesity: { name: "비만", detail: "낙인 없이 체중 변화·생활 여건 이야기하기" },
  "metabolic-dysfunction-associated-steatotic-liver-disease": { name: "지방간(MASLD)", detail: "간효소·간 지방·섬유화 검사의 차이" },
  "irritable-bowel-syndrome": { name: "과민성장증후군", detail: "복통과 배변 전후 변화, 검사로 확인할 것" },
  asthma: { name: "천식", detail: "기도의 변화·흡입기와 개인 행동계획 질문" },
  "sleep-apnea": { name: "수면무호흡증", detail: "밤의 관찰·낮의 졸림과 수면검사" },
  gout: { name: "통풍", detail: "이번 관절 통증과 이후 요산 관리 질문 나누기" },
  migraine: { name: "편두통", detail: "두통의 변화·동반 현상과 실제 약 사용 기록" },
  "kidney-stones": { name: "신장결석", detail: "요로의 위치·검사와 배출 여부 확인 질문" },
  "urinary-tract-infection": { name: "요로감염", detail: "방광염·신우신염, 소변검사와 배양검사" },
  depression: { name: "우울증", detail: "본인의 경험을 듣고 도움을 연결하는 가족의 역할" },
  "anxiety-disorder": { name: "불안장애", detail: "불안을 느낀 상황·생활 영향과 진료 준비" },
  stroke: { name: "뇌졸중", detail: "갑작스러운 신호와 119 도움 요청, 두 시각의 의미" },
  "acute-myocardial-infarction": { name: "급성심근경색", detail: "심한 흉통만 기다리지 않는 도움 요청과 검사 이해" },
};

export const hubConditionGroups: { id: string; title: string; slugs: HealthArticleSlug[] }[] = [
  { id: "heart", title: "심장·혈관", slugs: ["hypertension", "dyslipidemia", "acute-myocardial-infarction"] },
  { id: "metabolism", title: "혈당·체중", slugs: ["type-2-diabetes", "obesity"] },
  { id: "digestion", title: "소화·간", slugs: ["gastroesophageal-reflux-disease", "irritable-bowel-syndrome", "metabolic-dysfunction-associated-steatotic-liver-disease"] },
  { id: "breathing", title: "호흡·알레르기·수면", slugs: ["allergic-rhinitis", "asthma", "sleep-apnea"] },
  { id: "joints", title: "뼈·관절", slugs: ["osteoarthritis", "osteoporosis", "gout"] },
  { id: "urinary", title: "신장·비뇨기", slugs: ["kidney-stones", "urinary-tract-infection"] },
  { id: "brain", title: "뇌·신경", slugs: ["migraine", "stroke"] },
  { id: "mental-health", title: "마음 건강", slugs: ["depression", "anxiety-disorder"] },
];

export const hubSupportGroups = [
  { title: "측정·검사", slugs: ["reading-health-results", "understanding-hba1c", "measuring-blood-pressure"] },
  { title: "기록·진료·약 목록", slugs: ["symptom-journal", "appointment-questions", "medication-list"] },
  { title: "가족이 함께 준비할 때", slugs: ["family-medication-support", "older-parent-health-organizer"] },
  { title: "도움 요청을 먼저 알아둘 때", slugs: ["danger-signals"] },
];

export function hubToolKind(tool: HealthTool) {
  if (tool.articleSlug === "stroke" || tool.articleSlug === "acute-myocardial-infarction") return "119 신고 후 전달·치료 뒤 질문";
  return { log: "인쇄 기록표", questions: "진료 질문지", checklist: "관찰·준비 점검", guide: "용어·사용 참고", warning: "위험 신호 참고" }[tool.kind];
}
