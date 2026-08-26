import type { HealthSource } from "./content";

export type HealthSupportGuide = {
  slug: string;
  title: string;
  description: string;
  sections: Array<{ title: string; paragraphs?: string[]; bullets?: string[]; tone?: "default" | "warning" | "note" }>;
  sources: HealthSource[];
};

const retrievedAt = "2026-08-26";

export const healthSupportGuides: HealthSupportGuide[] = [
  {
    slug: "danger-signals",
    title: "병원에 빨리 가야 하는 위험 신호",
    description: "온라인 글을 더 읽기보다 119 또는 신속한 의료 평가를 먼저 생각해야 하는 변화를 짧게 정리합니다.",
    sections: [
      { title: "갑작스러운 뇌 신호", bullets: ["한쪽 얼굴·팔·다리에 힘이 빠짐", "말이 어눌하거나 이해하기 어려움", "갑작스러운 시야·균형 변화나 전에 없던 심한 두통"], tone: "warning" },
      { title: "심장과 호흡 신호", bullets: ["새롭고 심한 가슴 통증·압박감", "숨쉬기 매우 어렵거나 입술이 푸르게 보임", "실신·의식 저하 또는 깨우기 어려움"], tone: "warning" },
      { title: "마음의 위기", paragraphs: ["자신이나 다른 사람을 해칠 위험이 있거나 즉시 안전을 지키기 어렵다면 혼자 두지 말고 119에 연락합니다. 자살 관련 위기에는 24시간 자살예방 상담전화 109도 이용할 수 있습니다."], tone: "warning" },
      { title: "기억할 행동", bullets: ["증상이 시작된 시각을 기억합니다.", "직접 운전하기보다 119의 안내를 따릅니다.", "음식이나 약을 억지로 먹이지 않습니다.", "확신이 없다는 이유로 연락을 미루지 않습니다."] },
    ],
    sources: [
      { id: "SUP-KDCA-STROKE", organization: "질병관리청 국가건강정보포털", title: "뇌졸중", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5495", sourceDate: "2026-04-29", retrievedAt },
      { id: "SUP-NHLBI-MI", organization: "NIH/NHLBI", title: "Heart Attack Symptoms", url: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms", sourceDate: "2022-03-24", retrievedAt },
      { id: "SUP-MOHW-109", organization: "보건복지부", title: "24시간 자살예방 상담전화 109", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "2026", retrievedAt },
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
    title: "당화혈색소 HbA1c 쉽게 이해하기",
    description: "HbA1c가 무엇을 보여 주고 무엇은 말해 주지 못하는지, 진료 질문으로 연결합니다.",
    sections: [
      { title: "어떤 검사인가요", paragraphs: ["HbA1c는 최근 몇 달 동안의 평균 혈당 수준에 관한 정보를 주는 혈액검사입니다. 오늘 한 번의 혈당과 같은 뜻은 아닙니다."] },
      { title: "숫자 하나의 한계", paragraphs: ["빈혈, 임신, 일부 혈액 질환과 다른 상황이 결과 해석에 영향을 줄 수 있습니다. 검사표만으로 스스로 진단하지 않습니다."], tone: "note" },
      { title: "진료에서 물을 것", bullets: ["이 결과를 제 건강 상태에서 어떻게 해석하나요?", "확인 검사가 필요한가요?", "다음 검사 시점과 목표는 어떻게 정하나요?"] },
      { title: "하지 않을 일", bullets: ["결과만 보고 약이나 인슐린 용량을 바꾸지 않습니다.", "다른 사람의 목표치와 단순 비교하지 않습니다."] },
    ],
    sources: [
      { id: "SUP-NIDDK-A1C", organization: "NIH/NIDDK", title: "The A1C Test & Diabetes", url: "https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test", sourceDate: "2018", retrievedAt },
      { id: "SUP-NIDDK-DIABETES-TESTS", organization: "NIH/NIDDK", title: "Diabetes Tests & Diagnosis", url: "https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis", sourceDate: "2022", retrievedAt },
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
