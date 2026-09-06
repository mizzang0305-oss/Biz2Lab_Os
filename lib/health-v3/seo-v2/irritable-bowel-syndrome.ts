import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const niddk = "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/";
export const ibsSources: HealthSource[] = [
  { id: "SRC-NIDDK-IBS-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts for Irritable Bowel Syndrome", url: `${niddk}definition-facts`, sourceDate: "2017-11 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-IBS-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Irritable Bowel Syndrome", url: `${niddk}symptoms-causes`, sourceDate: "2017-11 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-IBS-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of Irritable Bowel Syndrome", url: `${niddk}diagnosis`, sourceDate: "2017-11 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-IBS-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for Irritable Bowel Syndrome", url: `${niddk}treatment`, sourceDate: "2017-11 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-IBS-DIET", organization: "NIH/NIDDK", title: "Eating, Diet, & Nutrition for Irritable Bowel Syndrome", url: `${niddk}eating-diet-nutrition`, sourceDate: "2017-11 (Last Reviewed; 참고문헌 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-IBS", organization: "질병관리청 국가건강정보포털", title: "과민성장증후군", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250", sourceDate: "2026-05-15 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHS-IBS-SYMPTOMS", organization: "NHS", title: "Symptoms of IBS", url: "https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/symptoms/", sourceDate: "2025-03-17", retrievedAt: checkedAt },
  { id: "SRC-NHS-IBS-DIAGNOSIS", organization: "NHS", title: "Getting diagnosed with IBS", url: "https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/getting-diagnosed/", sourceDate: "2025-03-17", retrievedAt: checkedAt },
  { id: "SRC-NHS-IBS-LIFESTYLE", organization: "NHS", title: "Diet, lifestyle and medicines for IBS", url: "https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/diet-lifestyle-and-medicines/", sourceDate: "2025-03-17 (페이지 검토; 동영상 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-NHS-STOMACH-ACHE", organization: "NHS", title: "Stomach ache", url: "https://www.nhs.uk/symptoms/stomach-ache/", sourceDate: "2023-05-26 (표시된 차기 검토일 2026-05-26 경과)", retrievedAt: checkedAt },
  { id: "SRC-NHS-IBD", organization: "NHS", title: "Inflammatory bowel disease", url: "https://www.nhs.uk/conditions/inflammatory-bowel-disease/", sourceDate: "2023-05-05 (표시된 차기 검토일 2026-05-05 경과)", retrievedAt: checkedAt },
];

// New editorial text is source-mapped separately. Original claims and the
// licensed-review packet are not rewritten or marked clinically approved here.
export const ibsArticle: HealthArticle = {
  slug: "irritable-bowel-syndrome",
  seoTitle: "과민성장증후군(IBS): 복통·배변 변화 기록과 진료 신호",
  title: "배가 아플 때, 배변 전후 무엇이 달라졌나요?",
  eyebrow: "위장·간 · 몸의 변화를 진료 언어로",
  publishedAt: "2026-08-26", updatedAt: "2026-09-07", sourceCheckedAt: checkedAt,
  description: "복통이 배변 전후 어떻게 달라지는지, 변의 형태와 횟수는 어떻게 변했는지 정리합니다. IBS·IBD의 차이, 음식 제한의 경계와 진료를 미루지 말아야 할 신호를 설명합니다.",
  outcome: "배변과 통증의 관계를 혼자 진단하지 않고 설명하며, 새 경고 신호는 기존 IBS 때문이라고 넘기지 않을 수 있습니다.",
  archetype: "BODY_SIGNAL",
  summary: [
    "배변 뒤 통증은 덜해지거나 더해질 수 있습니다. 기억나는 변화를 그대로 적습니다.",
    "IBS와 염증성 장질환(IBD)은 다르며, 증상이나 정상 검사 하나로 스스로 구별하지 않습니다.",
    "새 출혈·체중 감소는 의료 평가가 필요하고, 갑작스럽거나 심한 복통·많은 출혈·쓰러짐은 응급 도움을 우선합니다.",
  ],
  sections: [
    { title: "화장실을 다녀온 뒤의 느낌부터 떠올려 보세요", paragraphs: [
      "‘배가 자주 아파요’에서 한 걸음 더 나아가, 변을 보기 전과 후에 무엇이 달랐는지 말해 보세요. 덜 아팠을 수도, 더 아팠을 수도 있습니다. 잘 모르거나 비슷했다면 그렇게 적으면 됩니다. 정답에 맞추려 기억을 고치지 마세요.",
      "복통에 배변 횟수나 변의 형태 변화가 함께 반복될 때 과민성장증후군(IBS)을 살펴볼 수 있습니다. 하지만 화장실에 다녀온 뒤 편해졌다는 사실 하나가 IBS 진단은 아닙니다. 처음 생겼거나 반복되는 불편으로 일상이 어려우면 진료를 받아 원인을 확인합니다.",
    ], bullets: [
      "통증의 변화: ‘덜 아팠다 / 더 아팠다 / 비슷했다 / 잘 모르겠다’처럼 자신의 말로 남깁니다.",
      "배변의 변화: 평소보다 잦거나 드물었는지, 단단했는지 묽었는지를 함께 봅니다.",
      "하루의 차이: 괜찮은 날도 있었는지, 식사나 외출·수면 중 언제 불편했는지 떠올립니다.",
    ], claimIds: ["IBS-P3-001", "IBS-P3-002"], sourceIds: ["SRC-NIDDK-IBS-DIAGNOSIS", "SRC-NIDDK-IBS-SYMPTOMS", "SRC-NHS-IBS-SYMPTOMS", "SRC-NHS-IBS-DIAGNOSIS"], imageId: "ibs-action" },
    { title: "검사에 뚜렷한 손상이 안 보여도 불편은 실제입니다", paragraphs: [
      "IBS는 반복되는 복통과 설사·변비 등의 배변 변화가 함께 나타나는 질환입니다. 장의 움직임과 감각, 장과 뇌가 신호를 주고받는 작용 등 여러 요인을 함께 살핍니다. 어떤 사람은 장이 늘어나거나 내용물이 움직이는 자극을 더 민감하게 느낄 수 있습니다.",
      "이 설명은 ‘마음먹기에 달렸다’거나 ‘아픈 척한다’는 뜻이 아닙니다. 수면·식사·생활의 긴장과 증상의 관계는 상담할 맥락이지 한 사람을 탓하거나 원인을 하나로 확정하는 답이 아닙니다. IBS가 있어도 모든 복통을 같은 이유로 설명하지 않습니다.",
      "설사가 주로 나타나기도 하고 변비가 주로 나타나거나 두 양상이 번갈아 나타나기도 합니다. 다른 사람에게 맞았던 약이나 식단을 그대로 적용하지 않는 이유 중 하나입니다.",
    ], claimIds: ["IBS-P3-001", "IBS-P3-002", "IBS-P3-004"], sourceIds: ["SRC-NIDDK-IBS-DEFINITION", "SRC-NIDDK-IBS-SYMPTOMS", "SRC-KDCA-IBS", "SRC-NIDDK-IBS-TREATMENT"], imageId: "ibs-concept" },
    { title: "IBS와 IBD는 이름이 비슷해도 다른 질환입니다", table: { caption: "약자를 풀어 읽기 — 증상으로 진단하는 표가 아닙니다", columns: ["이름", "구분해서 이해할 점"], rows: [
      ["IBS: 과민성장증후군", "장-뇌 상호작용, 장의 기능과 감각 등을 살피는 질환입니다. 반복되는 복통과 배변 변화가 함께 나타납니다."],
      ["IBD: 염증성 장질환", "크론병·궤양성대장염 등이 포함됩니다. 장에 염증을 일으키는 질환으로 IBS와 같지 않습니다."],
    ] }, paragraphs: [
      "복통·설사처럼 겹치는 증상이 있어 이름이나 증상 목록만으로 둘을 구별할 수 없습니다. 특히 새 출혈이나 설명되지 않는 체중 변화가 있으면 기존 IBS로 넘기지 말고 알립니다.",
      "진료에서는 증상의 흐름과 병력·가족력, 신체검사를 먼저 살피고 필요에 따라 혈액·대변검사나 내시경 등으로 다른 원인을 확인합니다. 모두에게 대장내시경이 필수라는 뜻도, IBS가 의심되면 검사할 필요가 없다는 뜻도 아닙니다. ‘검사가 정상이니 IBS 확정’으로 결론 내리지 않습니다.",
    ], claimIds: ["IBS-P3-001", "IBS-P3-003"], sourceIds: ["SRC-NIDDK-IBS-DEFINITION", "SRC-NHS-IBD", "SRC-NHS-IBS-DIAGNOSIS", "SRC-NIDDK-IBS-DIAGNOSIS", "SRC-KDCA-IBS"], tone: "note", imageId: null, links: [{ href: "/health/guides/reading-health-results", label: "정상·이상 표시만으로 결론 내리지 않고 검사표 읽기" }] },
    { title: "진료에서는 이 다섯 가지를 짧게 설명하세요", bullets: [
      "언제·어디가: 시작 시기, 배의 어느 쪽인지, 어떻게 아팠는지와 일상에 미친 영향.",
      "배변 전후: 통증이 줄거나 늘었는지, 비슷했는지. 모르면 모른다고 적습니다.",
      "평소와 다른 변: 횟수·단단함·묽음과 급하게 화장실에 갔던 상황.",
      "함께 바뀐 것: 식사·수면·생활 상황, 새 약이나 최근 장염·항생제 복용 등 알고 있는 정보.",
      "놓치지 않을 변화: 출혈, 원인 없는 체중 감소, 통증 때문에 밤에 깬 일, 알고 있는 소화기질환 가족력.",
    ], paragraphs: [
      "예를 들어 ‘아침 식사 뒤 아랫배가 불편했고 변을 본 뒤에도 비슷했다’처럼 관찰을 남길 수 있습니다. 이는 실제 환자 사례나 진단 기준이 아닌 기록 문장 예시입니다. ‘아침 음식이 원인이다’라는 결론까지 붙일 필요는 없습니다.",
      "기록은 기억을 돕는 도구입니다. 빈칸을 모두 채우거나 일정 기간을 기다려야 진료받을 수 있는 것은 아닙니다. 말하기 불편한 배변 변화도 의료진에게 전달할 정보이며, 이 페이지에 개인정보나 변 사진을 보내지 않습니다.",
    ], claimIds: ["IBS-P3-002", "IBS-P3-003", "IBS-P3-004"], sourceIds: ["SRC-NHS-IBS-DIAGNOSIS", "SRC-NIDDK-IBS-DIAGNOSIS", "SRC-KDCA-IBS"], tone: "note", imageId: null, links: [{ href: "/health/tools/irritable-bowel-syndrome-visit-card", label: "복통·배변 변화의 진료 질문 카드" }, { href: "/health/guides/symptom-journal", label: "추측과 관찰을 나누는 증상 기록법" }, { href: "/health/guides/medication-list", label: "최근 시작한 약까지 목록으로 정리하기" }] },
    { title: "먹지 못하는 음식 목록이 계속 늘어난다면", paragraphs: [
      "IBS에 모두 똑같이 맞는 식단이나 약은 없습니다. 식사와 증상을 간단히 기록하되 한 번 불편했던 음식을 곧바로 평생 금지하지 않습니다. 증상을 피하려 많은 음식을 빼야 한다면 의료진에게 알리고 영양 전문가의 도움을 상의하세요.",
      "저포드맙(low FODMAP) 식단은 일부 잘 흡수되지 않는 탄수화물의 섭취를 조정하는 방법입니다. 모든 사람에게 필요한 식단이 아니며, 시도할 경우 효과를 살펴보고 음식을 다시 넣는 과정까지 의료진·영양 전문가와 계획합니다. 인터넷 식품표를 영구적인 금지 목록으로 삼지 않습니다.",
      "식이섬유나 유산균도 많이 먹을수록 좋은 하나의 해결책은 아닙니다. 섬유질을 갑자기 늘리면 가스·팽만이 불편할 수 있습니다. 설사·변비 양상과 현재 치료를 알리고 식사 조정이나 약·보충제의 필요성, 부작용 때의 행동을 확인합니다. 이 글은 지사제·변비약·항생제를 선택하거나 용량을 바꾸는 안내가 아닙니다.",
      "잠과 활동, 스트레스를 다루는 도움도 개인 계획의 일부가 될 수 있습니다. 생활 조정 후에도 계속 어렵다면 의지가 부족해서라고 생각하지 말고 진료에서 계획을 다시 상의합니다.",
    ], claimIds: ["IBS-P3-004"], sourceIds: ["SRC-NHS-IBS-LIFESTYLE", "SRC-NIDDK-IBS-DIET", "SRC-NIDDK-IBS-TREATMENT", "SRC-KDCA-IBS"], imageId: null, links: [{ href: "/health/guides/appointment-questions", label: "치료 목표·부작용·다음 상담을 묻는 질문" }] },
    { title: "익숙한 IBS가 있어도 새 위험 신호는 따로 봅니다", paragraphs: [
      "새 항문 출혈, 혈성 설사, 이유 없는 체중 감소 중 하나라도 생기면 기존 IBS 때문이라고 넘기지 마세요. 당일 의료기관에 연락해 신속한 평가를 받습니다. 통증 때문에 밤에 깨거나 양상이 달라진 경우도 진료에서 반드시 알립니다.",
      "갑자기 시작된 복통 또는 심한 복통, 쓰러짐, 멈추지 않거나 많은 항문 출혈은 즉시 119에 도움을 요청할 신호입니다. 복통과 함께 피가 섞인 변이 나오는 경우도 응급 평가가 먼저입니다. 검고 끈적한 타르 같은 변은 복통이 없어도 즉시 의료 도움을 받습니다. 여러 신호가 모두 나타날 때까지 기다리지 않습니다.",
      "응급 신호가 있으면 직접 운전하거나 음식 반응을 더 관찰하며 버티지 않습니다. 진료 메모를 끝내는 것보다 도움 요청이 먼저입니다. 이런 변화만으로 암이나 염증성 장질환이 확정되는 것은 아니지만, 온라인에서 원인을 정해 진료를 미뤄서는 안 됩니다.",
    ], claimIds: ["IBS-P3-005"], sourceIds: ["SRC-NHS-IBS-SYMPTOMS", "SRC-NHS-STOMACH-ACHE", "SRC-NHS-IBD", "SRC-KDCA-IBS", "SRC-NIDDK-GI-BLEEDING"], tone: "warning", imageId: null, links: [{ href: "/health/guides/danger-signals", label: "기록보다 의료 도움이 먼저인 위험 신호" }] },
  ],
  faq: [
    { question: "변을 보고 배가 덜 아프면 IBS가 확실한가요?", answer: "아닙니다. 배변과 통증의 관계는 중요한 정보지만 그것만으로 진단하지 않습니다. 배변 후 더 아픈 경우도 있어 변화를 그대로 설명하고 병력·신체검사와 필요한 평가를 함께 받습니다.", claimIds: ["IBS-P3-002", "IBS-P3-003"], sourceIds: ["SRC-NIDDK-IBS-DIAGNOSIS", "SRC-NHS-IBS-DIAGNOSIS"] },
    { question: "IBS와 IBD는 같은 병의 다른 이름인가요?", answer: "다릅니다. IBS는 과민성장증후군, IBD는 크론병·궤양성대장염 등이 포함되는 염증성 장질환입니다. 증상이 겹칠 수 있어 약자나 증상만으로 구별하지 않습니다.", claimIds: ["IBS-P3-001", "IBS-P3-003"], sourceIds: ["SRC-NHS-IBD", "SRC-NIDDK-IBS-DEFINITION"] },
    { question: "IBS가 의심되면 모두 대장내시경을 받아야 하나요?", answer: "모두에게 일률적으로 필요한 것은 아닙니다. 의료진이 증상 변화·가족력·다른 검사 결과와 경고 신호를 보고 필요성을 판단합니다. 검사 하나가 정상이었다는 이유로 새 변화를 무시하지 않습니다.", claimIds: ["IBS-P3-003"], sourceIds: ["SRC-NHS-IBS-DIAGNOSIS", "SRC-NIDDK-IBS-DIAGNOSIS", "SRC-KDCA-IBS"] },
    { question: "얼마나 오래 기록해야 진료받을 수 있나요?", answer: "일정 기간을 채우는 것이 진료의 조건은 아닙니다. 기억나는 통증·배변·생활 변화를 간단히 가져가도 됩니다. 출혈, 갑작스러운 복통 또는 심한 복통이 있으면 기록을 기다리지 말고 의료 도움을 받습니다.", claimIds: ["IBS-P3-003", "IBS-P3-005"], sourceIds: ["SRC-NHS-IBS-DIAGNOSIS", "SRC-NHS-IBS-SYMPTOMS", "SRC-NHS-STOMACH-ACHE"] },
    { question: "저FODMAP 식단은 계속 엄격하게 지켜야 하나요?", answer: "모두에게 필요한 영구 제한 식단이 아닙니다. 시도의 필요성과 효과 확인, 음식을 다시 넣는 과정을 전문가와 상의합니다. 먹을 수 있는 음식이 계속 줄거나 증상이 잘 조절되지 않으면 혼자 제한을 늘리지 않습니다.", claimIds: ["IBS-P3-004"], sourceIds: ["SRC-NIDDK-IBS-DIET", "SRC-NHS-IBS-LIFESTYLE"] },
    { question: "이미 IBS 진단을 받았다면 혈변도 지켜봐도 되나요?", answer: "기존 IBS로 단정하지 않습니다. 새 출혈이나 이유 없는 체중 감소는 신속히 평가받고, 많은·계속되는 출혈, 갑작스럽거나 심한 복통, 쓰러짐은 119 도움을 우선합니다. 검고 끈적한 타르 같은 변은 복통이 없어도 즉시 의료 도움을 받습니다. 응급 상황에는 기록보다 대응이 먼저입니다.", claimIds: ["IBS-P3-005"], sourceIds: ["SRC-NHS-IBS-SYMPTOMS", "SRC-NHS-IBD", "SRC-NHS-STOMACH-ACHE", "SRC-NIDDK-GI-BLEEDING"] },
  ],
  sourceIds: [...ibsSources.map(s=>s.id), "SRC-NIDDK-GI-BLEEDING"],
  imageIds: ["ibs-hero", "ibs-concept", "ibs-action"],
  visuals: {
    "ibs-hero": { src: "/images/onurim/irritable-bowel-syndrome/hero.webp", alt: "네 줄의 메모 용지와 상담 준비를 상징하는 갈색 장식 표지 삽화", caption: "표지의 줄과 십자 모양은 진단 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "ibs-concept": { src: "/images/onurim/irritable-bowel-syndrome/concept-v2.webp", alt: "머리의 뇌와 복부의 장 사이에 위쪽과 아래쪽을 향한 두 화살표가 놓인 장-뇌 상호작용 개념도", caption: "화살표는 장과 뇌의 양방향 소통을 단순화한 상징이며 실제 신경의 위치나 음식 이동 경로가 아닙니다. IBS와 관련된 여러 요인 중 일부로, 마음가짐 탓이거나 개인의 원인을 확정한다는 뜻이 아닙니다.", width: 1536, height: 1024 },
    "ibs-action": { src: "/images/onurim/irritable-bowel-syndrome/action-v2.webp", alt: "화장실 문 앞에서 복부의 느낌을 살피는 성인과 책상에서 그 변화를 노트에 적는 같은 인물의 두 장면 삽화", caption: "관찰과 기록을 연결한 가상 장면으로 실제 환자나 치료 전후가 아닙니다. 배변 뒤 통증이 덜하거나 더하거나 비슷한 경우 모두 그대로 적습니다. 컵·시계는 특정 음료나 기록 시간을 권하는 뜻이 아닙니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["irritable-bowel-syndrome-visit-card"],
};
