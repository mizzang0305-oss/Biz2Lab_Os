import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const dyslipidemiaSources: HealthSource[] = [
  { id: "SRC-MEDLINEPLUS-CHOLESTEROL", organization: "NIH/MedlinePlus", title: "Cholesterol", url: "https://medlineplus.gov/cholesterol.html", sourceDate: "2025-03-18", retrievedAt: checkedAt },
  { id: "SRC-CDC-CHOLESTEROL", organization: "CDC", title: "About Cholesterol", url: "https://www.cdc.gov/cholesterol/about/", sourceDate: "2024-05-15", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-BLOOD-CHOLESTEROL", organization: "NIH/NHLBI", title: "What Is Blood Cholesterol?", url: "https://www.nhlbi.nih.gov/health/blood-cholesterol", sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-KDCA-DLP", organization: "질병관리청 국가건강정보포털", title: "이상지질혈증", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6715", sourceDate: "2026-08-19 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-LIPID-TEST", organization: "질병관리청 국가건강정보포털", title: "지질 검사", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6709", sourceDate: "2026-05-06 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-CHOLESTEROL-DIAGNOSIS", organization: "NIH/NHLBI", title: "Blood Cholesterol — Diagnosis", url: "https://www.nhlbi.nih.gov/health/blood-cholesterol/diagnosis", sourceDate: "2024-04-18", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-CHOLESTEROL-CAUSES", organization: "NIH/NHLBI", title: "Blood Cholesterol — Causes and Risk Factors", url: "https://www.nhlbi.nih.gov/health/blood-cholesterol/causes", sourceDate: "2024-04-19", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-CHOLESTEROL-TREATMENT", organization: "NIH/NHLBI", title: "Blood Cholesterol — Treatment", url: "https://www.nhlbi.nih.gov/health/blood-cholesterol/treatment", sourceDate: "2024-04-19", retrievedAt: checkedAt },
];

// These source-linked SEO explanations are not additions to, or clinical approval
// of, the preserved 144-claim ledger / original 47 high-risk review packet.
export const dyslipidemiaArticle: HealthArticle = {
  slug: "dyslipidemia",
  seoTitle: "이상지질혈증 검사표 읽기: LDL·HDL·중성지방의 차이",
  title: "이상지질혈증, 검사표의 네 항목부터 보기",
  eyebrow: "심장·혈관 · 콜레스테롤에 관한 오해부터",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "LDL·HDL·중성지방·총콜레스테롤이 각각 무엇인지, 금식 여부와 이전 결과를 왜 함께 보는지 설명합니다. 개인 목표와 약은 혼자 정하지 않고 진료 질문으로 연결합니다.",
  outcome: "검사표 네 항목의 뜻을 구분하고, 다음 진료에 검사 당시 상황과 치료 질문을 가져갈 수 있습니다.",
  archetype: "MYTH_FIRST",
  summary: [
    "HDL이 높거나 몸에 불편이 없다는 사실만으로 다른 지질 수치와 심혈관 위험을 무시하지 않습니다.",
    "LDL·HDL·중성지방·총콜레스테롤은 같은 숫자를 다른 이름으로 부르는 것이 아닙니다.",
    "심근경색·뇌졸중이 의심되는 갑작스러운 변화에는 검사표 확인보다 119 도움이 먼저입니다.",
  ],
  sections: [
    { title: "‘좋은 콜레스테롤’이 높으면 모두 괜찮을까요?", paragraphs: [
      "그렇지 않습니다. HDL을 ‘좋은 콜레스테롤’이라고 부르지만, HDL 한 항목이 다른 수치나 혈압·당뇨병·흡연 같은 위험을 없애 주는 점수는 아닙니다. 한 숫자의 색깔이나 정상 표시만 보고 검사표 전체를 덮지 마세요.",
      "이상지질혈증은 LDL·중성지방 등이 높거나 HDL이 낮은 상태를 포함합니다. ‘고지혈증’이라는 익숙한 말보다 범위가 넓습니다. 대부분 뚜렷한 불편이 없어 몸의 느낌만으로 알기 어렵고, 혈액검사와 개인의 건강 이력을 함께 살핍니다.",
    ], claimIds: ["DLP-P3-001", "DLP-P3-002"], sourceIds: ["SRC-KDCA-DLP", "SRC-NHLBI-CHOLESTEROL-CAUSES", "SRC-MEDLINEPLUS-CHOLESTEROL"], imageId: null },
    { title: "검사표의 LDL·HDL·중성지방·총콜레스테롤", paragraphs: [
      "콜레스테롤은 세포와 호르몬 등을 만드는 데 필요한 물질입니다. 없애야 할 독소라는 뜻이 아닙니다. LDL과 HDL은 혈액에서 지질을 나르는 입자이고, 검사표의 LDL/HDL 콜레스테롤은 각각 그 입자에 실린 콜레스테롤을 가리킵니다.",
      "아래 표는 용어를 읽는 안내입니다. 결과가 내게 얼마나 중요한지, 어느 수치를 목표로 할지는 이미 앓은 심혈관질환과 다른 위험 요인에 따라 달라집니다. 인터넷의 하나의 정상 범위를 모든 사람의 치료 목표로 옮기지 않습니다.",
    ], table: { caption: "네 항목의 역할과 진료에서 확인할 점", columns: ["검사표 항목", "무엇을 뜻하나요?", "혼동하지 않을 점"], rows: [
      ["LDL 콜레스테롤", "LDL 입자에 실려 이동하는 콜레스테롤입니다. 높은 수치는 동맥 벽의 플라크 축적과 관련됩니다.", "개인 치료 목표를 가족의 결과표와 같게 정하지 않습니다."],
      ["HDL 콜레스테롤", "HDL은 몸의 다른 부위에서 간으로 콜레스테롤을 되돌리는 데 관여합니다.", "높다는 이유로 LDL·혈압·흡연 등의 위험이 상쇄되지는 않습니다."],
      ["중성지방(TG)", "몸이 에너지로 쓰거나 저장하는 지방의 한 종류입니다.", "콜레스테롤의 다른 이름이 아니며 식사 등 검사 상황의 영향을 함께 봅니다."],
      ["총콜레스테롤(TC)", "여러 지단백 입자에 실린 콜레스테롤을 전체적으로 나타내는 항목입니다.", "이 항목만으로 나머지 수치나 개인 위험을 대신 판단하지 않습니다."],
    ] }, claimIds: ["DLP-P3-001", "DLP-P3-003"], sourceIds: ["SRC-KDCA-LIPID-TEST", "SRC-MEDLINEPLUS-CHOLESTEROL", "SRC-CDC-CHOLESTEROL", "SRC-NHLBI-CHOLESTEROL-DIAGNOSIS", "SRC-NHLBI-CHOLESTEROL-CAUSES"], imageId: null, links: [{ href: "/health/guides/reading-health-results", label: "검사표의 항목·단위·참고범위를 읽는 순서" }] },
    { title: "증상이 없어도 혈관 위험을 살피는 이유", paragraphs: [
      "혈액 속 콜레스테롤이 다른 물질과 함께 동맥 벽에 쌓이면 플라크를 형성할 수 있습니다. 통로가 좁아지거나 혈류에 문제가 생기면 심장과 뇌 등에 영향을 줄 수 있습니다. 검사 수치는 이런 위험을 살피는 자료이지, 혈관이 얼마나 막혔는지 직접 찍은 영상은 아닙니다.",
      "생활 습관뿐 아니라 유전, 다른 질환이나 약의 영향도 있습니다. 체형이나 식습관 한 가지로 원인을 단정하거나 누군가의 의지 부족으로 돌리지 않습니다. 가족 중 콜레스테롤 문제나 이른 나이의 심혈관질환을 겪은 사람이 있다면 알고 있는 범위에서 의료진에게 알립니다.",
    ], claimIds: ["DLP-P3-001", "DLP-P3-003"], sourceIds: ["SRC-NHLBI-BLOOD-CHOLESTEROL", "SRC-NHLBI-CHOLESTEROL-CAUSES", "SRC-NHLBI-CHOLESTEROL-DIAGNOSIS"], imageId: "dlp-concept", links: [{ href: "/health/hypertension", label: "혈압 기록도 함께 볼 때 필요한 측정 안내" }, { href: "/health/type-2-diabetes", label: "함께 확인하는 혈당 검사와 당뇨병 안내" }] },
    { title: "금식 여부와 이전 결과를 함께 가져가세요", paragraphs: [
      "지질검사는 금식이 필요할 수 있지만, 검사 목적과 항목에 따라 안내가 다릅니다. 특히 중성지방은 식사 영향을 고려합니다. 예약한 검사기관의 준비 지시를 먼저 확인하고, 식사를 했거나 안내를 지키지 못했다면 채혈 전에 말하세요. 모든 비금식 검사를 무효라고 판단하거나 임의로 오래 굶지 않습니다.",
      "검사 전 물·약 복용에 관한 질문도 해당 기관에 확인합니다. 이 글을 보고 평소 약을 건너뛰지 않습니다. 이전 결과가 있다면 이번 결과와 함께 가져가 비교할 조건과 다음 검사 시점을 물어보세요.",
    ], table: { caption: "검사 준비와 상담을 잇는 결과표 메모", columns: ["확인할 자료", "있는 그대로 남길 내용", "의료진에게 물을 질문"], rows: [
      ["검사 전 안내", "금식 지시를 받았는지와 실제 마지막 식사 시각", "이번 검사 준비 조건을 맞췄나요?"],
      ["이번·이전 결과", "검사 날짜, 항목 이름, 수치와 단위를 원본대로", "같은 조건의 결과끼리 비교할 수 있나요?"],
      ["현재 치료", "복용 약·보충제 이름과 최근 변경 여부", "결과 해석에 함께 볼 약이나 질환이 있나요?"],
      ["개인·가족 이력", "알고 있는 심혈관질환과 발병 시기", "제 목표와 재검사 시점을 어떻게 정하나요?"],
    ] }, claimIds: ["DLP-P3-003", "DLP-P3-004"], sourceIds: ["SRC-KDCA-LIPID-TEST", "SRC-KDCA-DLP", "SRC-NHLBI-CHOLESTEROL-DIAGNOSIS"], tone: "note", imageId: "dlp-action", links: [{ href: "/health/tools/dyslipidemia-visit-card", label: "지질검사 진료 질문 카드 열기" }, { href: "/health/guides/medication-list", label: "약·보충제 목록 준비하기" }] },
    { title: "생활 조정과 약은 서로 대신하는 선택지가 아닙니다", paragraphs: [
      "식사·활동·금연 같은 생활 조정은 치료의 한 부분입니다. 포화지방이 많은 음식이나 정제 탄수화물의 섭취 패턴을 살피고, 본인에게 가능한 활동을 의료진과 상의할 수 있습니다. 어떤 항목이 문제인지와 기존 질환에 따라 우선할 내용이 다르므로 특정 음식 하나만 끊으면 해결된다고 생각하지 않습니다.",
      "약이 필요한지와 종류·강도는 개인 위험과 기대 효과, 부작용을 함께 고려해 정합니다. 생활을 바꾸는 동안 누구나 약을 몇 달 미뤄도 된다는 뜻이 아닙니다. 약을 처방받았다고 생활 조정이 불필요해지는 것도 아닙니다.",
      "수치가 좋아졌거나 약을 먹고 새 불편이 생겼다면 결과·증상·시기를 알리고 처방 의료진과 상의하세요. 한 결과만으로 약을 시작·중단·증량하지 않고, 미리 받은 개인별 안내가 있다면 그 계획을 확인합니다. 다음 검사까지 기다려도 되는지 모호한 불편도 먼저 문의할 수 있습니다.",
    ], claimIds: ["DLP-P3-004"], sourceIds: ["SRC-KDCA-DLP", "SRC-NHLBI-CHOLESTEROL-TREATMENT"], imageId: null, links: [{ href: "/health/guides/appointment-questions", label: "기대 효과·부작용·추적검사를 질문으로 정리하기" }] },
    { title: "가슴·마비·말의 갑작스러운 변화는 검사표보다 119", paragraphs: [
      "새롭거나 평소와 다른 가슴 압박·통증, 숨참, 식은땀이나 팔·턱으로 퍼지는 불편 등으로 심근경색이 의심되면 즉시 119에 연락합니다. 증상이 가볍거나 오르내릴 수도 있어 아주 심해질 때까지 기다리지 않습니다.",
      "갑작스러운 한쪽 얼굴·팔·다리의 힘 빠짐이나 말 이상 등 뇌졸중 의심 변화도 119 도움이 먼저입니다. 지질 수치를 다시 확인하거나 질문 카드를 완성하느라 지연하지 마세요. 심한 호흡곤란이나 의식 저하도 즉시 119에 도움을 요청할 변화입니다.",
    ], claimIds: ["DLP-P3-005"], sourceIds: ["SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-KDCA-STROKE", "SRC-KDCA-CPR"], tone: "warning", imageId: null, links: [{ href: "/health/guides/danger-signals", label: "119 도움을 먼저 구할 위험 신호" }] },
    { title: "오늘 결과표에 표시할 질문 세 가지", bullets: [
      "네 항목 중 제 상황에서 우선 확인할 항목과 그 이유는 무엇인가요?",
      "제가 할 수 있는 생활 조정과 현재 치료를 어떻게 함께 이어가나요?",
      "다음 검사는 언제, 어떤 준비 조건으로 받고 그 전에 문의할 변화는 무엇인가요?",
    ], paragraphs: ["이 질문은 결과표를 혼자 채점하지 않고 진료 대화에 쓰기 위한 예시입니다. 이미 받은 설명은 메모하고, 모르는 가족력이나 기억나지 않는 약 이름은 추측으로 채우지 않습니다."], claimIds: ["DLP-P3-003", "DLP-P3-004"], sourceIds: ["SRC-NHLBI-CHOLESTEROL-DIAGNOSIS", "SRC-NHLBI-CHOLESTEROL-TREATMENT"], tone: "note", imageId: null },
  ],
  faq: [
    { question: "고지혈증과 이상지질혈증은 같은 말인가요?", answer: "겹쳐 쓰이지만 이상지질혈증은 지질이 높은 상태뿐 아니라 HDL이 낮은 경우도 포함하는 더 넓은 말입니다. 검사표에서 어떤 항목을 설명한 것인지 확인하세요.", claimIds: ["DLP-P3-001"], sourceIds: ["SRC-KDCA-DLP", "SRC-KDCA-LIPID-TEST"] },
    { question: "HDL이 높으면 LDL은 보지 않아도 되나요?", answer: "아닙니다. HDL 하나로 다른 지질 수치나 혈압·당뇨병·흡연 등 위험 요인을 상쇄했다고 판단하지 않습니다. 전체 결과와 개인 이력으로 상담합니다.", claimIds: ["DLP-P3-003"], sourceIds: ["SRC-NHLBI-CHOLESTEROL-CAUSES", "SRC-KDCA-DLP"] },
    { question: "중성지방은 콜레스테롤과 어떻게 다른가요?", answer: "중성지방은 에너지로 쓰거나 저장하는 지방이고 콜레스테롤과 다른 항목입니다. 함께 검사하더라도 뜻과 영향을 주는 조건이 같지는 않습니다.", claimIds: ["DLP-P3-001"], sourceIds: ["SRC-CDC-CHOLESTEROL", "SRC-KDCA-LIPID-TEST"] },
    { question: "아침을 먹었으면 검사를 취소해야 하나요?", answer: "혼자 취소하거나 검사 결과를 무효로 단정하지 말고 채혈 전에 검사기관에 알립니다. 검사 목적·항목과 실제 식사 시각을 보고 준비 조건이나 일정 안내를 받으세요.", claimIds: ["DLP-P3-003"], sourceIds: ["SRC-KDCA-LIPID-TEST", "SRC-NHLBI-CHOLESTEROL-DIAGNOSIS"] },
    { question: "마르고 잘 먹지 않는데도 높을 수 있나요?", answer: "생활 습관 외에도 유전·질환·약 등이 지질 수치에 영향을 줄 수 있습니다. 체형 하나로 배제하지 말고 가족력과 현재 치료를 함께 알립니다.", claimIds: ["DLP-P3-002", "DLP-P3-003"], sourceIds: ["SRC-NHLBI-CHOLESTEROL-CAUSES"] },
    { question: "수치가 좋아지면 약을 끊어도 되나요?", answer: "결과가 좋아졌다는 이유만으로 임의 중단하지 않습니다. 현재 치료와 생활 변화의 영향을 의료진과 확인하고 개인 목표·추적검사·계속 복용할 계획을 상의합니다.", claimIds: ["DLP-P3-004"], sourceIds: ["SRC-NHLBI-CHOLESTEROL-TREATMENT", "SRC-KDCA-DLP"] },
  ],
  sourceIds: [...dyslipidemiaSources.map(s => s.id), "SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-KDCA-STROKE", "SRC-KDCA-CPR"],
  imageIds: ["dlp-hero", "dlp-concept", "dlp-action"],
  visuals: {
    "dlp-action": { src: "/images/onurim/dyslipidemia/action-v2.webp", alt: "두 성인이 이전과 이번의 네 항목 결과표를 나란히 놓고 별도 노트에 진료 질문을 적는 삽화", caption: "동의를 받고 결과표와 질문을 함께 정리하는 예입니다. 빈 줄과 시계는 실제 검사값·금식 시간이나 치료 판단 기준이 아닙니다.", width: 1536, height: 1024 },
    "dlp-hero": { src: "/images/onurim/dyslipidemia/hero.webp", alt: "네 줄의 결과표와 건강 상담을 상징하는 표지가 있는 장식 삽화", caption: "표지 삽화의 색과 줄은 실제 검사값이나 정상·이상 판정이 아닙니다.", width: 1536, height: 1024 },
    "dlp-concept": { src: "/images/onurim/dyslipidemia/concept-v2.webp", alt: "왼쪽 열린 동맥 단면과 오른쪽 혈관 벽 안쪽의 노란 플라크로 통로가 좁아진 단면을 비교한 개념도", caption: "오른쪽 노란 부분은 혈관 벽의 플라크를 상징합니다. 두 단면은 구조 차이의 예이며 누구나 거치는 단계나 치료 전후가 아닙니다. 실제 검사 영상·크기·협착률을 나타내지 않습니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["dyslipidemia-visit-card"],
};
