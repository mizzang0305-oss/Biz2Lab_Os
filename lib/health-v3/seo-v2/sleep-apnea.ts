import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const nhlbi = "https://www.nhlbi.nih.gov/health/sleep-apnea";
export const sleepApneaSources: HealthSource[] = [
  { id: "SRC-NHLBI-APNEA-OVERVIEW", organization: "NIH/NHLBI", title: "What Is Sleep Apnea?", url: nhlbi, sourceDate: "2025-01-09", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-APNEA-SYMPTOMS", organization: "NIH/NHLBI", title: "Sleep Apnea Symptoms", url: `${nhlbi}/symptoms`, sourceDate: "2025-01-09", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-APNEA-DIAGNOSIS", organization: "NIH/NHLBI", title: "Sleep Apnea Diagnosis", url: `${nhlbi}/diagnosis`, sourceDate: "2025-01-09", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-APNEA-TREATMENT", organization: "NIH/NHLBI", title: "Sleep Apnea Treatment", url: `${nhlbi}/treatment`, sourceDate: "2025-01-09", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-APNEA-LIVING", organization: "NIH/NHLBI", title: "Sleep Apnea Living With", url: `${nhlbi}/living-with`, sourceDate: "2025-01-09", retrievedAt: checkedAt },
  { id: "SRC-KDCA-APNEA", organization: "질병관리청 국가건강정보포털", title: "수면무호흡증", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6308", sourceDate: "2026-07-30 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-APNEA-MONTHLY", organization: "질병관리청 국가건강정보포털", title: "자도 자도 피곤하다면? 수면무호흡증 진단·관리법", url: "https://health.kdca.go.kr/healthinfo/biz/health/ntcnInfo/healthSourc/thtimtCntnts/thtimtCntntsView.do?thtimt_cntnts_sn=171", sourceDate: "2026-05 (페이지 표시 월; 등록·수정 구분 없음)", retrievedAt: checkedAt },
  { id: "SRC-AASM-OSA-DIAGNOSIS", organization: "American Academy of Sleep Medicine", title: "Clinical Practice Guideline for Diagnostic Testing for Adult Obstructive Sleep Apnea", url: "https://www.aasm.org/resources/clinicalguidelines/diagnostic-testing-osa.pdf", sourceDate: "2017-03-15 (원 논문 발행; JCSM 13(3):479–504)", retrievedAt: checkedAt },
  { id: "SRC-FDA-OXIMETERS", organization: "U.S. FDA", title: "Pulse Oximeters", url: "https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters", sourceDate: "페이지 날짜 미표시 (본문의 2025-01-07은 초안 발표일)", retrievedAt: checkedAt },
  { id: "SRC-SJA-CPR", organization: "St John Ambulance", title: "How to do CPR", url: "https://www.sja.org.uk/first-aid-advice/cpr/", sourceDate: "2025-04-28 (원출처 임상 검토일; 오누림 검수 아님)", retrievedAt: checkedAt },
  { id: "SRC-SJA-RECOVERY", organization: "St John Ambulance", title: "How to put someone in the recovery position", url: "https://www.sja.org.uk/first-aid-advice/recovery-position/", sourceDate: "2025-04-28 (원출처 임상 검토일; 오누림 검수 아님)", retrievedAt: checkedAt },
];

// Adult consultation literacy, not a screening score or device prescription.
// The original 144 claims and licensed-review packet are not rewritten here.
export const sleepApneaArticle: HealthArticle = {
  slug: "sleep-apnea", seoTitle: "수면무호흡증: 코골이·낮 졸림 기록과 수면검사 질문",
  title: "수면무호흡증이 걱정될 때, 밤과 낮의 변화를 함께 정리하기",
  eyebrow: "호흡기·알레르기 · 서로 다른 단서를 모으기",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "코골이와 수면무호흡증의 차이, 가족이 관찰한 밤의 변화와 낮 졸림 기록, 일반 기기와 의료 수면검사의 역할 및 양압기 상담 질문을 정리합니다.",
  outcome: "밤의 관찰과 낮의 경험을 구분해 진료에 전달하고, 기기 수치로 진단하지 않으며 졸음운전과 응급상황에 다르게 대응할 수 있습니다.",
  archetype: "FAMILY_SITUATION",
  summary: [
    "수면무호흡증에서는 자는 동안 호흡이 반복해서 멈추거나 줄어들 수 있습니다. 코골이만으로 확정하지 않습니다.",
    "함께 사는 사람이 본 밤의 변화와 본인이 느낀 낮 졸림은 서로 다른 상담 정보입니다.",
    "졸리면 운전하지 마세요. 반응이 없거나 정상적으로 숨 쉬지 않는 상황은 평소 코골이로 단정하지 말고 즉시 119에 연락합니다.",
  ],
  sections: [
    { title: "‘밤에 숨이 멎는 것 같았어’라는 말을 들었다면", paragraphs: [
      "함께 자는 사람은 코골이·헐떡임·호흡이 멈추는 듯한 모습을 먼저 알아챌 수 있고, 당사자는 낮에 자꾸 졸리거나 집중하기 어렵다는 변화를 먼저 느낄 수 있습니다. 한 사람이 모든 정보를 알 필요는 없습니다.",
      "코를 크게 곤다고 모두 수면무호흡증인 것은 아닙니다. 반대로 소리의 크기나 조용했던 하룻밤만으로 상태를 판정하지도 않습니다. 반복되는 호흡 변화나 일상에 영향을 주는 졸림은 의료진에게 이야기할 이유가 됩니다.",
      "대화는 ‘왜 그렇게 코를 골아?’보다 ‘밤에 이런 모습을 봤는데, 낮에는 어땠어?’처럼 시작해 보세요. 이는 비난 없이 정보를 나누기 위한 편집 예시입니다. 녹음·촬영은 진료의 필수 조건이 아니며, 기록을 공유할 범위도 당사자와 먼저 이야기합니다.",
    ], claimIds: ["OSA-P3-001", "OSA-P3-002"], sourceIds: ["SRC-NHLBI-APNEA-SYMPTOMS", "SRC-KDCA-APNEA-MONTHLY"], imageId: "osa-action" },
    { title: "밤에 본 것과 낮에 느낀 것을 두 칸으로", paragraphs: [
      "아래는 진료 전 대화를 정리하는 예시이지 진단표가 아닙니다. 본 것과 들은 것, 당사자가 느낀 것을 구분하고 모르는 내용은 모른다고 남깁니다. 정확한 시간을 재려고 밤새 감시하거나 일부러 잠을 줄일 필요는 없습니다.",
    ], table: { caption: "두 사람이 모을 수 있는 서로 다른 정보", columns: ["밤의 관찰·수면 경험", "낮의 영향·생활 정보"], rows: [
      ["들리거나 보였던 코골이·헐떡임·호흡 변화", "회의·식사·대화 중 졸림 등 본인이 느낀 상황"],
      ["잠든 시간, 깬 기억, 전체 수면 시간", "집중하기 어려웠던 일, 운전에 영향을 줄 정도의 졸림"],
      ["관찰한 날짜와 평소와 달랐던 점", "복용 약과 수면 일정 등 진료에 함께 알릴 정보"],
    ] }, claimIds: ["OSA-P3-002", "OSA-P3-003"], sourceIds: ["SRC-NHLBI-APNEA-SYMPTOMS", "SRC-NHLBI-APNEA-DIAGNOSIS", "SRC-KDCA-APNEA"], imageId: null,
      links: [{ href: "/health/tools/sleep-apnea-visit-card", label: "수면무호흡증 관찰·진료 질문 카드" }, { href: "/health/guides/symptom-journal", label: "관찰과 추측을 나눠 쓰는 증상 기록" }] },
    { title: "폐쇄성과 중추성, 같은 말은 아닙니다", paragraphs: [
      "폐쇄성 수면무호흡증은 자는 동안 코·입 뒤쪽의 상기도가 좁아지거나 막혀 공기 흐름이 줄거나 멈추는 유형입니다. 상기도는 공기가 폐로 가기 전에 지나가는 위쪽 통로를 말합니다.",
      "중추성 수면무호흡증은 뇌에서 호흡을 조절하는 신호의 문제와 관련된 유형입니다. ‘코골이가 있다’, ‘몸이 움직인다’는 가족 관찰만으로 두 유형을 구별하지 않습니다. 이 안내의 기도 그림은 폐쇄성의 한 개념만 설명합니다.",
      "진료에서는 증상과 다른 질환·복용 약을 확인하고 검사 결과를 함께 봅니다. 체형만으로 확정하거나, 본인과 다른 체형의 사람은 해당하지 않는다고 판단하지 마세요. 비만 등 관련 요인은 비난의 근거가 아니라 상담할 정보입니다.",
    ], claimIds: ["OSA-P3-001", "OSA-P3-003"], sourceIds: ["SRC-NHLBI-APNEA-OVERVIEW", "SRC-NHLBI-APNEA-DIAGNOSIS", "SRC-KDCA-APNEA"], imageId: "osa-concept",
      links: [{ href: "/health/obesity", label: "체형 하나보다 생활·건강 변화를 함께 상담하기" }] },
    { title: "일반 기기 기록과 의료 수면검사는 역할이 다릅니다", paragraphs: [
      "‘집에서 확인했다’는 말도 무엇을 사용했는지에 따라 의미가 다릅니다. 워치·앱의 일반 기록이나 산소 수치 하나를 의료진이 계획하고 해석하는 수면검사와 같다고 보지 않습니다. 일부 기기의 의료적 기능도 제품·허가 목적에 따라 다르므로, 모든 웨어러블이 같다고 단정하지 않습니다.",
      "산소포화도는 혈액이 산소를 얼마나 운반하는지에 관한 정보를 주지만, 측정값만으로 수면무호흡증을 확정하거나 배제할 수는 없습니다. 수치가 괜찮아 보여도 실제 증상과 느끼는 변화를 의료진에게 알려야 합니다.",
    ], table: { caption: "성인 수면 평가에서 기록과 검사가 맡는 역할", columns: ["자료·검사", "어떤 역할인가요?", "진료에서 확인할 점"], rows: [
      ["일반 기기·앱과 본인 기록", "증상이나 수면 상황을 설명할 보조 정보", "무엇을 어떻게 측정한 기록인지, 해석에 어떤 한계가 있는지"],
      ["의료진이 선택한 가정 수면검사", "적합한 성인에게 필요한 장비로 시행하는 의료 검사", "내 상태에 적합한지, 측정이 잘 되었는지, 다음 평가는 무엇인지"],
      ["검사실 수면다원검사", "호흡뿐 아니라 뇌파·움직임 등 여러 변화를 함께 평가", "어떤 질문을 확인하기 위한 검사인지, 결과는 언제 누구와 볼지"],
    ] }, claimIds: ["OSA-P3-003", "OSA-P3-004"], sourceIds: ["SRC-AASM-OSA-DIAGNOSIS", "SRC-FDA-OXIMETERS", "SRC-KDCA-APNEA"], imageId: null,
      links: [{ href: "/health/guides/reading-health-results", label: "검사명·조건·추적 안내를 함께 읽기" }] },
    { title: "검사 뒤에는 결과와 다음 단계를 함께 물어보세요", paragraphs: [
      "가정검사는 모든 성인에게 맞는 선택은 아닙니다. 다른 질환이나 수면 문제에 따라 검사실 검사가 더 적합할 수 있습니다. 한 번의 가정검사가 음성·불확정이거나 측정이 충분하지 않았다면 수면다원검사가 권고되므로 의료진과 다음 검사 안내를 확인합니다. 이 성인 검사 안내를 아이에게 그대로 적용하지 않습니다.",
      "진단 뒤에는 내 유형과 상태에 맞는 치료 선택지를 논의합니다. 양압기·구강 장치·생활 관리·수술 등은 누구에게나 같은 순서로 적용하는 목록이 아닙니다. 여기서는 기기를 선택하거나 약을 처방하지 않습니다.",
      "양압기 중 CPAP는 일정한 공기 압력으로 수면 중 기도가 열린 상태를 유지하도록 돕는 장치입니다. 무호흡이 생긴 뒤에만 공기를 넣는 응급 소생 장치라는 뜻이 아닙니다. 자신의 장치 종류와 사용 지침을 확인하고 압력을 혼자 바꾸지 마세요.",
      "마스크 누출·코막힘·소음·잠들기 어려움처럼 불편한 점은 진료팀에 구체적으로 알립니다. 복부 불편이나 배가 부푸는 팽만이 생기면 양압기 사용을 중단하고 의료진에게 연락합니다. 다른 새 증상도 무조건 참고 계속 사용하라는 뜻이 아니며, 신속히 연락해 사용 지침과 조정 방법을 확인합니다. 복용 중인 약은 목록으로 알려 주고, 수면에 영향을 줄 수 있다는 이유만으로 임의 중단하지 않습니다.",
    ], claimIds: ["OSA-P3-003", "OSA-P3-004"], sourceIds: ["SRC-AASM-OSA-DIAGNOSIS", "SRC-NHLBI-APNEA-TREATMENT", "SRC-NHLBI-APNEA-LIVING", "SRC-NHLBI-APNEA-DIAGNOSIS", "SRC-KDCA-APNEA-MONTHLY"], imageId: null,
      links: [{ href: "/health/guides/medication-list", label: "진료팀에 알릴 복용 약 목록" }, { href: "/health/guides/appointment-questions", label: "검사 결과와 다음 행동을 묻는 질문" }] },
    { title: "즉시 119가 필요한 상황과 졸음운전 예방을 구분하세요", paragraphs: [
      "깨워도 반응이 없거나 정상적으로 숨 쉬지 않으면 즉시 119에 연락합니다. 반응이 없고 정상 호흡이 없는 경우에는 119 안내에 따라 심폐소생술을 시작합니다. 간헐적으로 불규칙하게 헐떡이는 것은 정상 호흡으로 보지 않습니다.",
      "평소 수면무호흡증이 있다는 이유로 기다리거나, 기기 경고·입술 색 변화·기록 완성을 추가 조건으로 삼지 마세요. 심한 호흡곤란이나 갑작스러운 의식 변화도 즉각 도움을 받을 상황입니다. 양압기를 조작하느라 신고와 응급 대응을 늦추지 않습니다.",
      "낮에 피곤하거나 졸리면 운전하지 마세요. 짧은 거리라는 이유로 안전하다고 보거나, 커피·창문 열기만 믿고 운전하지 않습니다. 운전·위험 작업에 졸림이 영향을 준다면 평가와 안전한 활동 계획을 의료진과 상의합니다.",
    ], claimIds: ["OSA-P3-004", "OSA-P3-005"], sourceIds: ["SRC-NHLBI-APNEA-LIVING", "SRC-SJA-CPR", "SRC-SJA-RECOVERY", "SRC-NHS-BREATHLESSNESS"], tone: "warning", imageId: null,
      links: [{ href: "/health/guides/danger-signals", label: "호흡·의식 변화의 즉각 도움 신호" }] },
  ],
  faq: [
    { question: "코를 크게 골면 모두 수면무호흡증인가요?", answer: "그렇지 않습니다. 소리만으로 확정하지 말고 함께 나타나는 호흡 변화와 낮의 영향을 상담 정보로 정리합니다. 의심되는 변화가 있으면 의료진과 수면 평가를 상의하세요.", claimIds: ["OSA-P3-001", "OSA-P3-002"], sourceIds: ["SRC-KDCA-APNEA-MONTHLY"] },
    { question: "함께 사는 사람은 무엇을 기록하면 좋나요?", answer: "본인이 보거나 들은 밤의 호흡 변화와 당사자가 느낀 낮 졸림을 구분합니다. 수면 시간·깬 기억도 도움이 될 수 있습니다. 녹음이나 밤샘 감시가 필수는 아니며, 모르는 정보는 추측하지 않습니다.", claimIds: ["OSA-P3-002", "OSA-P3-003"], sourceIds: ["SRC-NHLBI-APNEA-SYMPTOMS", "SRC-NHLBI-APNEA-DIAGNOSIS"] },
    { question: "워치 산소 수치가 괜찮으면 안심해도 되나요?", answer: "일반 기기의 수치 하나로 확진·배제하지 않습니다. 측정 목적과 한계를 확인하고 증상도 함께 알립니다. 의료진이 선택한 가정검사는 일반 앱 기록과 같지 않습니다.", claimIds: ["OSA-P3-003", "OSA-P3-004"], sourceIds: ["SRC-FDA-OXIMETERS", "SRC-AASM-OSA-DIAGNOSIS"] },
    { question: "가정 수면검사와 검사실 검사는 어떻게 선택하나요?", answer: "의료진이 성인의 증상·다른 질환·검사 적합성을 판단합니다. 한 번의 가정검사가 음성·불확정이거나 측정이 충분하지 않았다면 수면다원검사가 권고되므로 다음 검사 안내를 확인하세요. 아이의 검사 기준은 별도입니다.", claimIds: ["OSA-P3-003"], sourceIds: ["SRC-AASM-OSA-DIAGNOSIS"] },
    { question: "양압기가 불편하면 압력을 낮춰도 되나요?", answer: "압력을 혼자 조정하지 말고 어떤 불편이 언제 생기는지 진료팀에 알립니다. 복부 불편·팽만이 생기면 양압기 사용을 중단하고 의료진에게 연락합니다. 다른 새 증상도 무조건 참고 버티기보다 사용 지침과 기기·마스크 조정 방법을 확인하세요.", claimIds: ["OSA-P3-004"], sourceIds: ["SRC-NHLBI-APNEA-TREATMENT", "SRC-NHLBI-APNEA-LIVING"] },
    { question: "낮에 졸린데 짧은 거리만 운전해도 되나요?", answer: "졸리거나 피곤하면 운전하지 않습니다. 거리나 커피가 안전을 보장하지 않습니다. 일상·운전에 영향을 주는 졸림을 진료팀에 알리고 안전한 활동 계획을 상의합니다.", claimIds: ["OSA-P3-004"], sourceIds: ["SRC-NHLBI-APNEA-LIVING"] },
  ],
  sourceIds: [...sleepApneaSources.map(s=>s.id), "SRC-NHS-BREATHLESSNESS"], imageIds: ["osa-hero", "osa-concept", "osa-action"],
  visuals: {
    "osa-hero": { src: "/images/onurim/sleep-apnea/hero.webp", alt: "메모 용지와 상담 준비를 상징하는 초록색 장식 표지 삽화", caption: "표지의 선·십자 모양은 수면검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "osa-concept": { src: "/images/onurim/sleep-apnea/concept-v2.webp", alt: "코와 입 뒤쪽의 열린 인두 공간과 혀·연구개 뒤의 공간이 좁아진 모습을 나란히 보여 주는 상기도 개념도", caption: "폐쇄성 수면무호흡의 상기도 좁아짐만 단순화한 비교입니다. 청록색은 빈 공기 공간을 강조한 색이지 실제 조직 색이 아닙니다. 중추성 원인·개인 진단·협착률·진행 단계·치료 전후를 보여 주지 않으며 아래쪽 후두와 기관은 생략했습니다.", width: 1536, height: 1024 },
    "osa-action": { src: "/images/onurim/sleep-apnea/action-v2.webp", alt: "가정의 식탁에서 두 가상 성인이 각자의 노트를 두고 밤의 관찰과 낮의 경험을 서로 이야기하는 AI 생성 장면", caption: "실제 환자·검수자 사진이 아닌 AI 생성 장면입니다. 동의한 상대와 관찰·질문을 나누는 선택적 예시이며, 노트의 선은 진료 기록이나 검사 수치가 아닙니다. 가족의 감시·녹음·대리 진단을 권하지 않습니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["sleep-apnea-visit-card"],
};
