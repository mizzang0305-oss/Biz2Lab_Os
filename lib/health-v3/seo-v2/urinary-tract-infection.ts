import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const urinaryTractInfectionSources: HealthSource[] = [
  { id: "SRC-NIDDK-UTI-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts of Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/definition-facts", sourceDate: "2024-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-UTI-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/symptoms-causes", sourceDate: "2024-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-UTI-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/diagnosis", sourceDate: "2024-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-UTI-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/treatment", sourceDate: "2024-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-PYELONEPHRITIS-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Kidney Infection (Pyelonephritis)", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-infection-pyelonephritis/symptoms-causes", sourceDate: "2024-10 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-UTI", organization: "질병관리청 국가건강정보포털", title: "요로감염", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6674", sourceDate: "2026-05-08 (업데이트; 치료 항목은 2018 지침 인용)", retrievedAt: checkedAt },
  { id: "SRC-NHS-UTI", organization: "NHS", title: "Urinary tract infections (UTIs)", url: "https://www.nhs.uk/conditions/urinary-tract-infections-utis/", sourceDate: "2025-07-11 (페이지 검토일)", retrievedAt: checkedAt },
  { id: "SRC-CDC-ANTIBIOTIC-USE", organization: "CDC", title: "Healthy Habits: Antibiotic Do’s and Don’ts", url: "https://www.cdc.gov/antibiotic-use/about/", sourceDate: "2025-09-23 (페이지 표시일)", retrievedAt: checkedAt },
  { id: "SRC-NHS-SEPSIS", organization: "NHS", title: "Sepsis", url: "https://www.nhs.uk/conditions/sepsis/", sourceDate: "2026-05-14 (페이지 검토일)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-URINE-CULTURE", organization: "MedlinePlus / A.D.A.M.", title: "Urine culture", url: "https://medlineplus.gov/ency/article/003751.htm", sourceDate: "2024-10-09 (Review Date; 제공자 인증일과 구분)", retrievedAt: checkedAt },
];

export const urinaryTractInfectionArticle: HealthArticle = {
  slug: "urinary-tract-infection", seoTitle: "요로감염: 방광염·신우신염 차이와 소변검사 질문",
  title: "소변 볼 때 불편한데, 방광염일까요?",
  eyebrow: "신장·비뇨기 · 감염 위치와 검사 질문",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "요로감염과 방광염·신우신염의 관계, 소변검사와 배양검사의 역할을 설명합니다. 급한 전신 증상, 임신·반복 감염 때 전할 정보와 항생제 사용 경계도 확인하세요.",
  outcome: "소변의 겉모습으로 감염을 확정하지 않고, 급한 변화와 개인 상황을 의료진에게 전하며 검사·처방의 목적을 질문할 수 있습니다.",
  archetype: "QUESTION_FIRST",
  summary: [
    "요로감염은 소변길의 감염을 넓게 부르는 말입니다. 방광염과 콩팥 쪽 감염인 신우신염은 같은 이름이 아니며, 증상과 필요한 평가가 다를 수 있습니다.",
    "열·오한, 옆구리나 등 통증, 메스꺼움·구토 같은 신우신염 의심 증상이 있으면 바로 의료 도움을 받습니다. 배뇨 통증이 없거나 모든 증상이 함께 있지 않아도 미루지 않습니다.",
    "소변 색·냄새나 검사 표시 하나로 항생제를 고르지 않습니다. 남은 약이나 다른 사람의 항생제를 쓰지 말고, 현재 증상과 상황에 맞는 진료를 받습니다.",
  ],
  sections: [
    { title: "먼저, 소변 불편 외에 급한 변화가 있나요?", paragraphs: [
      "새로 혼돈이 생기거나 비정상적으로 처지고 의식이 흐려지는 경우, 말하기가 어려워지는 경우에는 즉시 119에 연락합니다. 숨이 매우 빨라지거나 숨쉬기 어려운 경우도 즉시 119에 도움을 요청하세요. 감염 때문이라고 혼자 확정하지 말고, 직접 운전하지 않습니다.",
      "요로감염이 의심되면서 발열 또는 오한, 옆구리·등 통증, 메스꺼움 또는 구토가 있으면 바로 의료진에게 연락해 평가받습니다. 이 증상들이 모두 나타나야 하는 조건이 아니며, 소변 볼 때 아프지 않아도 콩팥 쪽 감염을 배제할 수 없습니다. 바로 진료받기 어렵거나 상태가 심하면 응급의료기관에 도움을 요청합니다.",
      "눈에 보이는 혈뇨, 아랫배 통증, 빠르게 나빠지는 증상도 신속히 평가받아야 합니다. 배양검사 결과나 예약일을 기다리느라 악화를 견디지 마세요. 단순 방광염인지, 다른 원인이나 더 심한 감염이 있는지는 진료에서 구분합니다.",
    ], tone: "warning", claimIds: ["UTI-P3-005"], sourceIds: ["SRC-NHS-UTI", "SRC-NHS-SEPSIS", "SRC-NIDDK-PYELONEPHRITIS-SYMPTOMS", "SRC-KDCA-UTI"], imageId: null,
      links: [{ href: "/health/guides/danger-signals", label: "호흡·의식 등 갑작스러운 위험 신호와 도움 요청" }] },
    { title: "요로감염, 방광염, 신우신염은 어떻게 다른가요?", paragraphs: [
      "요로는 콩팥에서 만들어진 소변이 요관을 지나 방광에 모였다가 요도를 통해 몸 밖으로 나가는 길입니다. 이 길에 생긴 감염을 요로감염이라고 합니다. 방광염은 소변을 저장하는 방광의 감염이고, 신우신염은 콩팥 쪽 감염입니다.",
      "방광염에서는 소변 볼 때 화끈거림, 자주 또는 급하게 마려움, 아랫배 불편이 나타날 수 있습니다. 신우신염에서는 열·오한·옆구리 통증 같은 전신 증상이 문제가 될 수 있고, 배뇨 불편은 없을 수도 있습니다. 이 구분은 말을 이해하기 위한 것이며 증상표만으로 감염 위치를 확정하는 방법은 아닙니다.",
      "대개 세균이 소변길에 들어가 감염을 일으킵니다. 방광의 감염이 콩팥으로 퍼질 수 있지만 모든 방광염이 반드시 같은 순서로 진행하는 것은 아닙니다. 그림의 두 위치는 서로 다른 예시입니다. 한쪽이 안전하다는 뜻이나 사람마다 같은 치료를 받는다는 뜻도 아닙니다.",
    ], claimIds: ["UTI-P3-001", "UTI-P3-002"], sourceIds: ["SRC-NIDDK-UTI-DEFINITION", "SRC-NIDDK-UTI-SYMPTOMS", "SRC-NIDDK-PYELONEPHRITIS-SYMPTOMS", "SRC-KDCA-UTI"], imageId: "urinary-tract-infection-concept" },
    { title: "소변이 탁하거나 냄새가 나면 감염인가요?", paragraphs: [
      "겉모습만으로 확정할 수 없습니다. 감염 때 소변이 탁해지거나 냄새가 달라질 수 있지만 다른 이유로도 변합니다. 특히 색이 진하거나 냄새가 나는 변화만 있다면 수분 섭취 부족 같은 원인도 가능하므로, 사진이나 냄새의 강도로 항생제 필요성을 판단하지 않습니다.",
      "진료에서는 언제 시작됐는지, 평소보다 자주 또는 급하게 보는지, 배뇨 통증과 아랫배 불편이 있는지, 열·오한·옆구리 통증이 새로 생겼는지를 함께 전하세요. 피가 보였다면 그 사실도 알립니다. 정확히 기억나지 않는 횟수나 시작 시각을 추측해서 채울 필요는 없습니다.",
      "소변 불편은 결석 등 다른 원인과도 겹칠 수 있습니다. 과거에 방광염을 앓았어도 이번 증상의 원인이 같다고 정하지 마세요. 특히 연세가 많거나 도뇨관을 사용하는 사람은 전형적인 증상과 다를 수 있습니다. 평소와 다른 행동이나 몸 상태도 의료진에게 함께 전하세요.",
    ], claimIds: ["UTI-P3-002", "UTI-P3-003"], sourceIds: ["SRC-KDCA-UTI", "SRC-NHS-UTI", "SRC-NIDDK-UTI-DIAGNOSIS"], imageId: null,
      links: [{ href: "/health/kidney-stones", label: "결석의 소변길 위치와 검사 후 확인할 내용" }, { href: "/health/guides/symptom-journal", label: "기억나는 변화와 모르는 부분을 나눠 적는 증상 일지" }] },
    { title: "소변검사와 배양검사는 무엇을 다르게 보나요?", paragraphs: [
      "의료진은 증상·병력·진찰을 바탕으로 필요한 검사를 정합니다. 소변검사는 감염의 단서를 살피고, 소변배양검사는 어떤 세균이 자라는지 등을 확인해 치료 선택에 도움을 줍니다. 같은 소변을 다루더라도 질문과 확인하는 정보가 다릅니다.",
      "검사에서 백혈구나 세균이 보인다는 사실만으로 모두 항생제를 써야 하는 것은 아닙니다. 증상, 검체 상태, 임신 여부 등 맥락을 함께 평가합니다. 반대로 증상이 지속되거나 악화되면 결과 한 번만으로 안심하며 버티지 말고 다시 의료진에게 알립니다.",
      "소변을 받는 방법은 검사기관의 안내를 따르세요. 최근 사용한 항생제가 있다면 검사 전 의료진에게 알려 해석에 반영하도록 합니다. 모든 사람에게 배양검사·영상검사가 필수인 것은 아니며, 검사를 위해 급한 진료를 늦추거나 처방약을 혼자 중단하지 않습니다.",
    ], table: { caption: "두 검사에서 의료진에게 물을 질문", columns: ["검사", "확인하는 정보와 질문"], rows: [
      ["소변검사", "백혈구·혈액 등 어떤 단서가 있나요? 제 증상과 함께 보면 어떤 의미인가요?"],
      ["소변배양검사", "원인균 확인이나 항생제 선택에 필요한가요? 결과를 어떻게 전달받고 후속 안내를 받나요?"],
    ] }, claimIds: ["UTI-P3-003"], sourceIds: ["SRC-NIDDK-UTI-DIAGNOSIS", "SRC-KDCA-UTI", "SRC-NHS-UTI", "SRC-MEDLINEPLUS-URINE-CULTURE"], imageId: "urinary-tract-infection-action",
      links: [{ href: "/health/guides/reading-health-results", label: "검사 표시와 진단·다음 계획을 구분해 읽기" }] },
    { title: "예전에 남은 항생제를 먼저 먹어도 되나요?", paragraphs: [
      "남은 항생제나 다른 사람에게 처방된 약을 이번 증상에 사용하지 않습니다. 맞지 않는 약은 필요한 치료를 늦추고 부작용을 일으킬 수 있습니다. 처방 필요성·종류·기간은 감염 위치와 심한 정도, 검사 결과, 알레르기, 다른 건강 상태를 고려해 의료진이 정합니다.",
      "처방받았다면 안내된 방법과 기간을 따릅니다. 좋아졌다고 혼자 끝내거나 불편이 남았다고 스스로 연장하지 않습니다. 부작용이 생기거나 복용이 어려우면 처방 의료진에게 연락해 대응을 확인하세요. 심한 호흡·의식 변화는 약 질문을 남기고 기다릴 상황이 아니라 위의 응급 안내를 따를 상황입니다.",
      "치료 뒤에도 증상이 남거나 다시 생기면 새 평가가 필요합니다. 이전 약을 반복하면 된다고 정하지 말고, 언제 어떤 치료를 받았고 어떻게 변했는지 알려주세요. 물이나 크랜베리 제품으로 이미 생긴 감염을 치료하려 하지 않습니다. 수분 제한을 안내받았다면 억지로 늘리지 말고 자신의 적정 범위를 확인합니다.",
    ], claimIds: ["UTI-P3-004"], sourceIds: ["SRC-CDC-ANTIBIOTIC-USE", "SRC-NIDDK-UTI-TREATMENT", "SRC-NHS-UTI", "SRC-NHS-SEPSIS"], imageId: null,
      links: [{ href: "/health/guides/medication-list", label: "최근 항생제와 알레르기 정보를 포함할 약 목록" }] },
    { title: "임신 가능성이나 반복 감염은 왜 먼저 말하나요?", paragraphs: [
      "임신 중이거나 임신 가능성이 있다면 처음부터 알립니다. 남성, 도뇨관 사용자, 당뇨병이나 면역저하가 있는 사람도 요로감염이 의심되면 신속히 진료받고 그 상황을 설명하세요. 다른 사람의 단순 방광염 경험이나 약을 그대로 적용하기 어렵습니다.",
      "비슷한 증상이 반복되면 날짜와 진단·검사·처방을 아는 범위에서 모읍니다. 매번 같은 균이나 같은 원인이라고 확정하지 않으며, 정해진 횟수를 채워야 진료받을 수 있는 것은 아닙니다. 반복되는 불편을 어떻게 평가하고 예방할지 상담할 수 있습니다.",
      "진료에 가져갈 정보는 네 갈래로 나누면 됩니다. 배뇨 변화와 시작 시점, 열·오한·옆구리 통증 같은 몸 전체의 변화, 임신 가능성·도뇨관·다른 질환, 최근 치료와 약 알레르기입니다. 작성은 도움 요청 뒤에 하며, 급한 신호가 있으면 빈칸을 채우기보다 진료가 먼저입니다.",
      "의료진에게 ‘어떤 검사 결과를 기다리나요?’, ‘어떤 변화가 생기면 바로 다시 연락하나요?’, ‘증상이 남거나 재발하면 어디로 연락하나요?’를 물어보세요. 답은 실제 병원 안내로 기록하며, 이 페이지가 약 선택이나 추적 일정을 대신 정하지 않습니다.",
    ], claimIds: ["UTI-P3-003", "UTI-P3-004", "UTI-P3-005"], sourceIds: ["SRC-NHS-UTI", "SRC-NIDDK-UTI-DIAGNOSIS", "SRC-NIDDK-UTI-TREATMENT", "SRC-KDCA-UTI", "SRC-NIDDK-PYELONEPHRITIS-SYMPTOMS"], imageId: null,
      links: [{ href: "/health/tools/urinary-tract-infection-visit-card", label: "요로감염 관찰·진료 질문 카드" }, { href: "/health/guides/appointment-questions", label: "진료 답변을 다음 행동과 연결하는 질문" }] },
  ],
  faq: [
    { question: "요로감염은 방광염의 다른 이름인가요?", answer: "요로감염이 더 넓은 말입니다. 방광의 감염인 방광염뿐 아니라 콩팥 쪽 감염인 신우신염 등이 포함됩니다. 증상만으로 위치를 확정하지 않고 필요한 평가를 받습니다.", claimIds: ["UTI-P3-001"], sourceIds: ["SRC-NIDDK-UTI-DEFINITION", "SRC-KDCA-UTI"] },
    { question: "냄새가 강하면 바로 항생제가 필요한가요?", answer: "냄새만으로 감염이나 항생제 필요성을 확정할 수 없습니다. 다른 증상과 개인 상황을 함께 평가합니다. 피가 보이거나 배뇨 통증·발열 등 새 변화가 있으면 이를 알리고 진료받으세요.", claimIds: ["UTI-P3-002", "UTI-P3-003"], sourceIds: ["SRC-NHS-UTI", "SRC-KDCA-UTI"] },
    { question: "소변 볼 때 안 아프면 신우신염은 아닌가요?", answer: "그렇게 배제할 수 없습니다. 신우신염은 배뇨 증상 없이 전신 증상으로 나타나기도 합니다. 요로감염이 의심되며 열·오한, 옆구리·등 통증, 메스꺼움·구토 등이 있으면 모두 겹칠 때까지 기다리지 말고 바로 평가받습니다.", claimIds: ["UTI-P3-005"], sourceIds: ["SRC-KDCA-UTI", "SRC-NIDDK-PYELONEPHRITIS-SYMPTOMS"] },
    { question: "소변검사에서 세균이 보이면 무조건 치료하나요?", answer: "검사 표시 하나로 결정하지 않습니다. 증상·검체 상태·임신 여부 등 맥락을 함께 살피며, 필요한 경우 배양검사 등이 치료 선택을 돕습니다. 본인이 결과만 보고 약을 시작하거나 처방을 중단하지 않습니다.", claimIds: ["UTI-P3-003", "UTI-P3-004"], sourceIds: ["SRC-KDCA-UTI", "SRC-NIDDK-UTI-DIAGNOSIS", "SRC-NIDDK-UTI-TREATMENT"] },
    { question: "남성이거나 임신 중이어도 예전 방광염처럼 대처하면 되나요?", answer: "같은 방식으로 자가치료하지 않습니다. 요로감염이 의심되면 신속히 진료받고 임신 가능성·도뇨관·다른 질환 등을 처음부터 알립니다. 필요한 평가와 약 선택이 달라질 수 있습니다.", claimIds: ["UTI-P3-004"], sourceIds: ["SRC-NHS-UTI", "SRC-KDCA-UTI", "SRC-NIDDK-UTI-TREATMENT"] },
    { question: "지난번 항생제가 남았는데 같은 증상에 다시 먹어도 되나요?", answer: "남은 약이나 다른 사람의 항생제를 사용하지 않습니다. 맞지 않는 약으로 진료가 늦어지거나 부작용이 생길 수 있습니다. 이번 증상에 맞게 평가받고, 새 처방이 있다면 그 안내를 따릅니다.", claimIds: ["UTI-P3-004"], sourceIds: ["SRC-CDC-ANTIBIOTIC-USE", "SRC-NIDDK-UTI-TREATMENT"] },
  ],
  sourceIds: urinaryTractInfectionSources.map(s=>s.id), imageIds: ["urinary-tract-infection-hero", "urinary-tract-infection-concept", "urinary-tract-infection-action"],
  visuals: {
    "urinary-tract-infection-hero": { src: "/images/onurim/urinary-tract-infection/hero.webp", alt: "상담 메모와 준비를 상징하는 보라·모래색 장식 표지 삽화", caption: "표지의 선과 십자 모양은 소변검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "urinary-tract-infection-concept": { src: "/images/onurim/urinary-tract-infection/concept-v2.webp", alt: "서로 분리된 두 소변길 그림에서 방광과 한쪽 콩팥을 각각 강조한 위치 예시", caption: "방광과 콩팥의 위치를 비교한 AI 생성 삽화입니다. 필수 진행 단계나 서로 배타적인 상태가 아니며, 한쪽 콩팥만 감염된다는 뜻도 아닙니다. 색과 기관 비율은 실제 감염 범위·손상·중증도·검사 결과를 나타내지 않습니다.", width: 1536, height: 1024 },
    "urinary-tract-infection-action": { src: "/images/onurim/urinary-tract-infection/action-v2.webp", alt: "소변검사라는 제목 아래 현미경, 배양검사라는 제목 아래 배양접시를 나란히 놓은 삽화", caption: "검사의 역할을 질문하기 위한 AI 생성 상징 삽화입니다. 현미경은 소변검사의 일부 방법을, 접시는 배양검사를 상징합니다. 실제 검체·검사 결과나 음성 판정이 아니며, 필수 검사 조합·순서·대기시간·검사 수행법을 안내하지 않습니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["urinary-tract-infection-visit-card"],
};
