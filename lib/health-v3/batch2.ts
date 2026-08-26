import type { HealthArticle, HealthClaim, HealthSource, HealthTool } from "./content";

type Batch2Slug =
  | "allergic-rhinitis"
  | "gastroesophageal-reflux-disease"
  | "osteoarthritis"
  | "osteoporosis";

export const batch2HealthSources: HealthSource[] = [
  { id: "SRC-MEDLINEPLUS-AR", organization: "NIH/MedlinePlus", title: "Allergic rhinitis", url: "https://medlineplus.gov/ency/article/000813.htm", sourceDate: "2026-01", retrievedAt: "2026-08-25" },
  { id: "SRC-MEDLINEPLUS-HAY", organization: "NIH/MedlinePlus", title: "Hay Fever", url: "https://medlineplus.gov/hayfever.html", sourceDate: "페이지 표시일 미확인", retrievedAt: "2026-08-25" },
  { id: "SRC-CDC-POLLEN", organization: "CDC", title: "Pollen and Your Health", url: "https://www.cdc.gov/climate-health/php/effects/pollen-health.html", sourceDate: "2024", retrievedAt: "2026-08-25" },
  { id: "SRC-NIDDK-GERD-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts for GER & GERD", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/definition-facts", sourceDate: "2020", retrievedAt: "2026-08-25" },
  { id: "SRC-NIDDK-GERD-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of GER & GERD", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes", sourceDate: "2020", retrievedAt: "2026-08-25" },
  { id: "SRC-NIDDK-GERD-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of GER & GERD", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/diagnosis", sourceDate: "2020", retrievedAt: "2026-08-25" },
  { id: "SRC-NIDDK-GERD-DIET", organization: "NIH/NIDDK", title: "Eating, Diet, & Nutrition for GER & GERD", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/eating-diet-nutrition", sourceDate: "2020", retrievedAt: "2026-08-25" },
  { id: "SRC-NIAMS-OA", organization: "NIH/NIAMS", title: "Osteoarthritis", url: "https://www.niams.nih.gov/health-topics/osteoarthritis", sourceDate: "2023-09", retrievedAt: "2026-08-25" },
  { id: "SRC-NIAMS-OA-TREATMENT", organization: "NIH/NIAMS", title: "Osteoarthritis: Diagnosis, Treatment, and Steps to Take", url: "https://www.niams.nih.gov/health-topics/osteoarthritis/diagnosis-treatment-and-steps-to-take", sourceDate: "2023-09", retrievedAt: "2026-08-25" },
  { id: "SRC-CDC-OA", organization: "CDC", title: "Osteoarthritis", url: "https://www.cdc.gov/arthritis/osteoarthritis/index.html", sourceDate: "2024-01-26", retrievedAt: "2026-08-25" },
  { id: "SRC-CDC-ARTHRITIS-ACTIVITY", organization: "CDC", title: "About Physical Activity and Arthritis", url: "https://www.cdc.gov/arthritis/prevention/index.html", sourceDate: "2024-02-14", retrievedAt: "2026-08-25" },
  { id: "SRC-NIAMS-OP", organization: "NIH/NIAMS", title: "Osteoporosis", url: "https://www.niams.nih.gov/health-topics/osteoporosis", sourceDate: "2022-12", retrievedAt: "2026-08-25" },
  { id: "SRC-NIAMS-OP-TREATMENT", organization: "NIH/NIAMS", title: "Osteoporosis: Diagnosis, Treatment, and Steps to Take", url: "https://www.niams.nih.gov/health-topics/osteoporosis/diagnosis-treatment-and-steps-to-take", sourceDate: "페이지 표시일 미확인", retrievedAt: "2026-08-25" },
  { id: "SRC-NIAMS-BMD", organization: "NIH/NIAMS", title: "Bone Mineral Density Tests: What the Numbers Mean", url: "https://www.niams.nih.gov/health-topics/bone-mineral-density-tests-what-numbers-mean", sourceDate: "2025-02", retrievedAt: "2026-08-25" },
  { id: "SRC-NIAMS-BONE-HEALTH", organization: "NIH/NIAMS", title: "Bone Health and Osteoporosis", url: "https://www.niams.nih.gov/health-topics/bone-health-and-osteoporosis", sourceDate: "2025-03", retrievedAt: "2026-08-25" },
];

const claim = (
  id: string,
  articleSlug: Batch2Slug,
  section: string,
  text: string,
  type: HealthClaim["type"],
  sourceIds: string[],
  clinicalReviewRequired: boolean,
  wordingRisk: HealthClaim["wordingRisk"],
): HealthClaim => ({ id, articleSlug, section, text, type, sourceIds, clinicalReviewRequired, wordingRisk });

export const batch2HealthClaims: HealthClaim[] = [
  claim("AR-B2-001", "allergic-rhinitis", "definition", "알레르기 비염은 꽃가루·집먼지·동물 비듬처럼 알레르기 반응을 일으킬 수 있는 물질에 코가 반응하며 재채기, 맑은 콧물, 코막힘 같은 증상이 나타나는 상태입니다.", "DEFINITION", ["SRC-MEDLINEPLUS-AR", "SRC-MEDLINEPLUS-HAY"], false, "LOW"),
  claim("AR-B2-002", "allergic-rhinitis", "symptoms", "재채기, 맑은 콧물, 코막힘, 코·눈의 가려움과 눈물은 알레르기 비염에서 나타날 수 있지만, 이 목록만으로 원인을 확정할 수는 없습니다.", "SYMPTOM", ["SRC-MEDLINEPLUS-AR", "SRC-MEDLINEPLUS-HAY"], true, "MEDIUM"),
  claim("AR-B2-003", "allergic-rhinitis", "trigger", "사람마다 관련되는 계절·장소·환경이 다를 수 있어, 증상이 생긴 때와 장소를 관찰해 의료진과 이야기하는 것이 원인 추정에 도움이 될 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-MEDLINEPLUS-AR", "SRC-CDC-POLLEN"], false, "LOW"),
  claim("AR-B2-004", "allergic-rhinitis", "diagnosis-limit", "증상은 감기나 다른 코 질환과 겹칠 수 있으므로 웹페이지나 한 번의 증상만으로 알레르기 비염을 스스로 진단하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-MEDLINEPLUS-AR"], true, "HIGH"),
  claim("AR-B2-005", "allergic-rhinitis", "observation", "관찰 기록에는 증상이 시작된 때, 있었던 장소, 눈 증상 여부, 수면과 이미 사용 중인 치료를 함께 적을 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-MEDLINEPLUS-AR", "SRC-MEDLINEPLUS-HAY"], false, "LOW"),
  claim("AR-B2-006", "allergic-rhinitis", "environment", "꽃가루나 실내 알레르기 유발 물질과의 관련성은 개인마다 달라서, 환경 변화가 나에게 맞는지 기록으로 확인하고 일괄적인 해결책으로 단정하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-CDC-POLLEN", "SRC-MEDLINEPLUS-AR"], true, "MEDIUM"),
  claim("AR-B2-007", "allergic-rhinitis", "medicine-limit", "비강 스프레이나 알레르기 약의 선택과 사용법은 나이, 다른 질환과 복용 약에 따라 달라질 수 있어 제품을 임의로 시작·중단·변경하지 말고 의료진 또는 약사에게 확인합니다.", "SELF_CARE_LIMIT", ["SRC-MEDLINEPLUS-AR"], true, "HIGH"),
  claim("AR-B2-008", "allergic-rhinitis", "professional-help", "증상이 계속되거나 일상생활·수면에 영향을 주거나, 원인이 불확실하면 의료진과 상담해 다른 원인과 필요한 검사를 확인합니다.", "TREATMENT_OVERVIEW", ["SRC-MEDLINEPLUS-AR", "SRC-MEDLINEPLUS-HAY"], true, "MEDIUM"),
  claim("AR-B2-009", "allergic-rhinitis", "emergency", "숨쉬기 매우 어렵거나 의식이 흐려지는 등 위급한 변화가 있으면 비염으로 단정하거나 온라인 정보를 기다리지 말고 119에 도움을 요청합니다.", "EMERGENCY_SIGN", ["SRC-CDC-POLLEN", "SRC-KDCA-CPR"], true, "HIGH"),
  claim("AR-B2-010", "allergic-rhinitis", "family", "가족은 증상을 과장하거나 무시하지 않고, 당사자가 원할 때 기록 정리와 진료 질문 준비를 도울 수 있습니다.", "CAREGIVER_ACTION", ["SRC-MEDLINEPLUS-AR"], false, "LOW"),
  claim("AR-B2-011", "allergic-rhinitis", "questions", "진료에서는 증상 시기와 장소, 눈·호흡 증상, 사용 중인 약과 검사 필요 여부를 질문할 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-MEDLINEPLUS-AR", "SRC-MEDLINEPLUS-HAY"], false, "LOW"),
  claim("AR-B2-012", "allergic-rhinitis", "limit", "이 페이지의 체크리스트는 관찰과 질문 준비용이며 알레르기 원인을 확정하거나 치료 효과를 보장하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-MEDLINEPLUS-AR"], true, "MEDIUM"),

  claim("GERD-B2-001", "gastroesophageal-reflux-disease", "definition", "위식도역류는 위 내용물이 식도로 올라오는 현상이며, 반복되어 불편하거나 합병증과 이어질 때 위식도역류질환이라고 부릅니다.", "DEFINITION", ["SRC-NIDDK-GERD-DEFINITION"], false, "LOW"),
  claim("GERD-B2-002", "gastroesophageal-reflux-disease", "symptoms", "속쓰림이나 내용물이 목·입 쪽으로 올라오는 느낌이 흔할 수 있고, 흉통·삼킴의 불편·기침·쉰 목소리처럼 다른 증상도 나타날 수 있습니다.", "SYMPTOM", ["SRC-NIDDK-GERD-SYMPTOMS"], true, "MEDIUM"),
  claim("GERD-B2-003", "gastroesophageal-reflux-disease", "diagnosis-limit", "속쓰림이나 흉부 불편이 있다고 해서 모두 역류는 아니며, 증상만으로 위식도역류질환을 스스로 진단하거나 다른 원인을 배제하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-NIDDK-GERD-DIAGNOSIS", "SRC-NIDDK-GERD-SYMPTOMS"], true, "HIGH"),
  claim("GERD-B2-004", "gastroesophageal-reflux-disease", "observation", "기록에는 식사 시점, 눕거나 잠든 시점, 불편의 종류와 지속 시간, 삼킴 변화, 사용 중인 약과 메모를 함께 남길 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-NIDDK-GERD-DIAGNOSIS"], false, "LOW"),
  claim("GERD-B2-005", "gastroesophageal-reflux-disease", "individual-triggers", "어떤 음식·음료·식사 시간·자세가 증상과 관련되는지는 사람마다 다를 수 있으므로, 기록을 바탕으로 의료진과 개별적으로 확인합니다.", "SELF_CARE_LIMIT", ["SRC-NIDDK-GERD-DIET"], true, "MEDIUM"),
  claim("GERD-B2-006", "gastroesophageal-reflux-disease", "medicine-limit", "일반의약품을 포함한 약의 시작·중단·기간·용량은 다른 질환과 복용 약에 따라 달라질 수 있어 온라인 글만으로 결정하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-NIDDK-GERD-SYMPTOMS", "SRC-NIDDK-GERD-DIAGNOSIS"], true, "HIGH"),
  claim("GERD-B2-007", "gastroesophageal-reflux-disease", "professional-help", "흉통, 지속되는 구토, 삼키기 어렵거나 아픈 증상, 출혈을 의심할 수 있는 구토·검은 변, 원인 없는 체중 감소는 의료진에게 확인해야 할 변화입니다.", "EMERGENCY_SIGN", ["SRC-NIDDK-GERD-SYMPTOMS"], true, "HIGH"),
  claim("GERD-B2-008", "gastroesophageal-reflux-disease", "emergency", "새롭고 심한 가슴 통증, 숨쉬기 어려움, 의식 저하처럼 위급한 변화가 있으면 역류로 단정하지 말고 119에 도움을 요청합니다.", "EMERGENCY_SIGN", ["SRC-NIDDK-GERD-SYMPTOMS", "SRC-KDCA-CPR"], true, "HIGH"),
  claim("GERD-B2-009", "gastroesophageal-reflux-disease", "family", "가족은 식사나 체형을 평가하기보다, 당사자가 원할 때 기록과 진료 질문을 정리하는 방식으로 도울 수 있습니다.", "CAREGIVER_ACTION", ["SRC-NIDDK-GERD-DIAGNOSIS"], false, "LOW"),
  claim("GERD-B2-010", "gastroesophageal-reflux-disease", "questions", "진료에서는 증상 시점, 누웠을 때의 변화, 삼킴 문제, 사용 중인 약, 검사 필요 여부를 질문할 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-NIDDK-GERD-DIAGNOSIS"], false, "LOW"),
  claim("GERD-B2-011", "gastroesophageal-reflux-disease", "care-limit", "이 페이지의 시간표와 체크리스트는 치료 처방이나 음식 금지 목록이 아니라, 개인 패턴을 의료진과 상의하기 위한 자료입니다.", "SELF_CARE_LIMIT", ["SRC-NIDDK-GERD-DIET", "SRC-NIDDK-GERD-DIAGNOSIS"], true, "MEDIUM"),
  claim("GERD-B2-012", "gastroesophageal-reflux-disease", "management", "생활 조정과 치료 방법은 증상·검사·다른 건강 상태에 따라 달라질 수 있어 개인 목표를 이 페이지가 정하지 않습니다.", "TREATMENT_OVERVIEW", ["SRC-NIDDK-GERD-DIAGNOSIS", "SRC-NIDDK-GERD-DIET"], true, "HIGH"),

  claim("OA-B2-001", "osteoarthritis", "definition", "골관절염은 관절 안의 연골과 다른 조직에 시간이 지나며 변화가 생기는 관절 질환입니다.", "DEFINITION", ["SRC-NIAMS-OA", "SRC-CDC-OA"], false, "LOW"),
  claim("OA-B2-002", "osteoarthritis", "symptoms", "관절을 쓸 때의 통증, 쉬고 난 뒤의 뻣뻣함, 움직임의 제한이나 부종은 골관절염에서 나타날 수 있지만 개인마다 양상이 다릅니다.", "SYMPTOM", ["SRC-NIAMS-OA", "SRC-CDC-OA"], true, "MEDIUM"),
  claim("OA-B2-003", "osteoarthritis", "diagnosis-limit", "관절 통증이나 소리만으로 골관절염을 스스로 확정하지 않으며, 의료진은 병력·진찰과 필요에 따라 다른 원인을 함께 확인합니다.", "SELF_CARE_LIMIT", ["SRC-NIAMS-OA-TREATMENT", "SRC-CDC-OA"], true, "HIGH"),
  claim("OA-B2-004", "osteoarthritis", "observation", "관찰 기록에는 불편한 관절, 활동 전후 변화, 부종·열감 여부, 수면과 일상에 미치는 영향, 사용 중인 치료를 적을 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-NIAMS-OA", "SRC-NIAMS-OA-TREATMENT"], false, "LOW"),
  claim("OA-B2-005", "osteoarthritis", "activity", "활동 계획은 관절 상태와 다른 건강 문제에 따라 달라질 수 있어, 새로운 운동이나 보조기구는 의료진 또는 재활 전문가와 안전한 범위를 상의합니다.", "TREATMENT_OVERVIEW", ["SRC-NIAMS-OA-TREATMENT", "SRC-CDC-ARTHRITIS-ACTIVITY"], true, "HIGH"),
  claim("OA-B2-006", "osteoarthritis", "medicine-limit", "진통제·주사·보조기구·수술 여부는 개인 치료 결정이므로 온라인 글이나 기록만으로 약을 스스로 시작·중단·변경하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-NIAMS-OA-TREATMENT", "SRC-CDC-OA"], true, "HIGH"),
  claim("OA-B2-007", "osteoarthritis", "professional-help", "통증·부종·움직임 제한이 새롭게 생기거나 일상을 어렵게 하면 원인을 확인하기 위해 의료진에게 상담합니다.", "TREATMENT_OVERVIEW", ["SRC-NIAMS-OA", "SRC-NIAMS-OA-TREATMENT"], true, "MEDIUM"),
  claim("OA-B2-008", "osteoarthritis", "emergency", "심한 외상 뒤 움직일 수 없거나, 의식 저하·호흡곤란처럼 위급한 변화가 있으면 관절염으로 단정하거나 온라인 정보를 기다리지 말고 119에 도움을 요청합니다.", "EMERGENCY_SIGN", ["SRC-KDCA-CPR"], true, "HIGH"),
  claim("OA-B2-009", "osteoarthritis", "family", "가족은 속도를 재촉하거나 통증을 판단하기보다, 당사자가 원하는 일상 지원과 진료 질문 정리를 도울 수 있습니다.", "CAREGIVER_ACTION", ["SRC-NIAMS-OA-TREATMENT"], false, "LOW"),
  claim("OA-B2-010", "osteoarthritis", "questions", "진료에서는 어느 관절이 언제 불편한지, 활동·수면 변화, 다른 원인 확인, 안전한 활동 범위와 치료 선택지를 질문할 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-NIAMS-OA-TREATMENT"], false, "LOW"),
  claim("OA-B2-011", "osteoarthritis", "care-limit", "이 페이지의 활동 기록은 통증 점수로 병의 진행을 판단하거나 치료 효과를 보장하는 도구가 아닙니다.", "SELF_CARE_LIMIT", ["SRC-NIAMS-OA", "SRC-CDC-OA"], true, "MEDIUM"),
  claim("OA-B2-012", "osteoarthritis", "variation", "골관절염은 단순히 나이가 들어서 생기는 정상 변화로만 볼 수 없고, 증상과 영향은 사람마다 다를 수 있습니다.", "DEFINITION", ["SRC-NIAMS-OA", "SRC-CDC-OA"], false, "LOW"),

  claim("OP-B2-001", "osteoporosis", "definition", "골다공증은 뼈의 밀도·양 또는 구조와 강도가 변해 뼈가 약해지고 골절 위험이 커질 수 있는 질환입니다.", "DEFINITION", ["SRC-NIAMS-OP", "SRC-NIAMS-BMD"], false, "LOW"),
  claim("OP-B2-002", "osteoporosis", "silent", "골다공증은 증상이 없는 경우가 많아 골절이 생기기 전까지 알기 어려울 수 있습니다.", "SYMPTOM", ["SRC-NIAMS-OP"], false, "LOW"),
  claim("OP-B2-003", "osteoporosis", "risk", "나이, 일부 질환과 약, 생활 요인 등 여러 요소가 골다공증 위험과 관련될 수 있지만, 위험 요소 목록으로 개인의 질환을 판단하지 않습니다.", "RISK_FACTOR", ["SRC-NIAMS-OP"], true, "MEDIUM"),
  claim("OP-B2-004", "osteoporosis", "diagnosis", "골밀도 검사는 뼈의 밀도를 측정하는 검사이며, 결과 해석과 진단은 나이·다른 위험 요소를 함께 고려해 의료진이 합니다.", "TEST", ["SRC-NIAMS-BMD", "SRC-NIAMS-OP-TREATMENT"], true, "HIGH"),
  claim("OP-B2-005", "osteoporosis", "record", "진료 준비에는 이전 골절·낙상, 복용 약, 다른 질환, 검사 결과와 가족력을 포함해 의료진이 물어본 정보를 정리할 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-NIAMS-OP-TREATMENT", "SRC-NIAMS-OP"], false, "LOW"),
  claim("OP-B2-006", "osteoporosis", "fall-prevention", "집 안의 걸려 넘어질 수 있는 물건과 조명·통로를 살피는 일은 낙상 위험을 줄이기 위한 환경 점검의 한 부분이지만, 골절을 막는다고 보장하지는 않습니다.", "PREVENTION", ["SRC-NIAMS-OP-TREATMENT"], true, "MEDIUM"),
  claim("OP-B2-007", "osteoporosis", "medicine-limit", "골다공증 약의 시작·중단·변경과 칼슘·비타민D 보충 여부는 개인 상황에 따라 달라서 웹페이지나 검사 숫자만으로 스스로 결정하지 않습니다.", "SELF_CARE_LIMIT", ["SRC-NIAMS-OP-TREATMENT", "SRC-NIAMS-BONE-HEALTH"], true, "HIGH"),
  claim("OP-B2-008", "osteoporosis", "professional-help", "낙상 뒤 통증이 심하거나 움직이기 어렵거나, 새롭고 심한 등 통증·키 변화가 있으면 의료진에게 확인합니다.", "EMERGENCY_SIGN", ["SRC-NIAMS-OP"], true, "HIGH"),
  claim("OP-B2-009", "osteoporosis", "emergency", "낙상 뒤 의식이 흐려지거나 숨쉬기 어렵고 움직일 수 없을 만큼 위급한 변화가 있으면 온라인 정보를 기다리지 말고 119에 도움을 요청합니다.", "EMERGENCY_SIGN", ["SRC-KDCA-CPR"], true, "HIGH"),
  claim("OP-B2-010", "osteoporosis", "family", "가족은 낙상 위험을 비난하지 않고, 당사자 동의 아래 통로 점검·기록 정리·진료 질문 준비를 도울 수 있습니다.", "CAREGIVER_ACTION", ["SRC-NIAMS-OP-TREATMENT"], false, "LOW"),
  claim("OP-B2-011", "osteoporosis", "questions", "진료에서는 골밀도 검사 필요 여부와 결과 의미, 골절·낙상 이력, 복용 약, 개인에게 맞는 예방·치료 계획을 질문할 수 있습니다.", "MEASUREMENT_GUIDANCE", ["SRC-NIAMS-BMD", "SRC-NIAMS-OP-TREATMENT"], false, "LOW"),
  claim("OP-B2-012", "osteoporosis", "care-limit", "이 페이지의 집안 점검표와 용어 안내는 골다공증을 진단하거나 골절 위험을 계산하는 도구가 아닙니다.", "SELF_CARE_LIMIT", ["SRC-NIAMS-BMD", "SRC-NIAMS-OP"], true, "HIGH"),
];

export const batch2HealthArticles: Record<Batch2Slug, HealthArticle> = {
  "allergic-rhinitis": {
    slug: "allergic-rhinitis", title: "알레르기 비염, 원인을 단정하기보다 흐름을 살펴요", eyebrow: "호흡·알레르기 · Preview 안내", description: "코와 눈의 불편을 감기와 혼동하지 않도록, 안전한 관찰과 진료 질문 준비를 돕습니다.", outcome: "증상과 환경의 흐름을 기록하고, 혼자 원인을 확정하지 않은 채 진료 질문을 준비합니다.",
    summary: ["재채기·맑은 콧물·코막힘은 알레르기 비염에서 나타날 수 있지만 증상만으로 확정하지 않습니다.", "언제·어디서·어떤 변화가 있었는지 기록하면 진료 대화가 구체적이 됩니다.", "숨쉬기 매우 어렵거나 의식이 흐려지는 위급한 변화는 119가 먼저입니다."],
    sections: [
      { title: "코가 특정 자극에 반응할 때", paragraphs: ["알레르기 비염은 공기 중의 어떤 물질에 코가 반응하면서 증상이 생길 수 있는 상태입니다. 계절성일 수도, 실내에서 계속 느껴질 수도 있지만 사람마다 원인은 다릅니다."], claimIds: ["AR-B2-001", "AR-B2-003"] },
      { title: "그림으로 보는 관찰의 출발점", paragraphs: ["그림은 실외와 실내의 여러 자극이 코 증상과 연결될 수 있다는 개념만 보여 줍니다. 그림이나 증상 목록으로 내 원인을 확정할 수는 없습니다."], claimIds: ["AR-B2-001", "AR-B2-004"], tone: "note", imageId: "ar-explainer" },
      { title: "무엇을 알아차릴 수 있나요?", bullets: ["재채기, 맑은 콧물, 코막힘", "코·눈·목의 가려움 또는 눈물", "언제 시작했고 어디에 있었는지, 수면에 미친 변화"], claimIds: ["AR-B2-002", "AR-B2-005"] },
      { title: "환경을 바꾸기 전, 내 패턴부터 봅니다", paragraphs: ["창문, 외출, 청소, 반려동물, 계절 같은 상황을 무조건 피해야 한다는 뜻은 아닙니다. 변화 전후의 증상을 관찰해 나에게 관련이 있는지 의료진과 함께 확인합니다."], claimIds: ["AR-B2-003", "AR-B2-006"], imageId: "ar-action" },
      { title: "약과 자가 판단의 경계", paragraphs: ["알레르기 약이나 비강 스프레이는 사람마다 맞는 선택과 사용법이 다릅니다. 증상만 보고 약을 시작·중단·변경하거나 원인을 단정하지 말고 의료진 또는 약사에게 확인하세요."], claimIds: ["AR-B2-004", "AR-B2-007", "AR-B2-012"] },
      { title: "진료에서 확인할 질문", bullets: ["증상이 생기는 계절·장소·시간대가 있나요?", "눈·호흡 증상도 함께 있나요?", "사용 중인 약과 검사 필요 여부는 어떻게 확인하나요?"], claimIds: ["AR-B2-008", "AR-B2-011"] },
      { title: "기록보다 119가 먼저인 변화", paragraphs: ["숨쉬기 매우 어렵거나 의식이 흐려지는 등 위급한 변화가 있으면 비염으로 단정하거나 기록을 계속하지 말고 119에 도움을 요청합니다."], claimIds: ["AR-B2-009"], tone: "warning", imageId: null },
      { title: "가족은 준비를 함께합니다", paragraphs: ["가족은 ‘그 정도는 참아’라고 판단하기보다, 당사자가 원할 때 관찰표와 질문을 함께 정리합니다. 치료 선택은 당사자와 의료진의 대화로 남겨 둡니다."], claimIds: ["AR-B2-010"] },
    ],
    faq: [
      { question: "콧물만 있으면 알레르기 비염인가요?", answer: "아닙니다. 감기나 다른 원인과 증상이 겹칠 수 있어, 증상만으로 스스로 확정하지 않습니다.", claimIds: ["AR-B2-002", "AR-B2-004"] },
      { question: "집 안을 바꾸면 반드시 좋아지나요?", answer: "환경과 증상의 관련성은 사람마다 달라서 보장할 수 없습니다. 변화와 증상을 기록해 의료진과 상의하세요.", claimIds: ["AR-B2-006", "AR-B2-012"] },
      { question: "가족은 무엇을 도우면 좋나요?", answer: "당사자의 동의를 먼저 확인하고, 기록과 진료 질문 준비를 돕는 것이 안전합니다.", claimIds: ["AR-B2-010", "AR-B2-011"] },
    ],
    sourceIds: ["SRC-MEDLINEPLUS-AR", "SRC-MEDLINEPLUS-HAY", "SRC-CDC-POLLEN", "SRC-KDCA-CPR"], imageIds: ["ar-hero", "ar-explainer", "ar-action"], toolSlugs: ["allergy-trigger-observation", "allergy-environment-check", "allergy-appointment-questions"],
  },
  "gastroesophageal-reflux-disease": {
    slug: "gastroesophageal-reflux-disease", title: "위식도역류질환, 음식 하나보다 시간과 변화를 기록해요", eyebrow: "소화 · Preview 안내", description: "속쓰림과 역류감의 흐름을 관찰하고, 흉부 불편을 혼자 역류로 결론 내리지 않도록 돕습니다.", outcome: "증상의 시간과 상황을 기록하고, 위험 신호를 구분해 진료 질문을 준비합니다.",
    summary: ["역류는 위 내용물이 식도로 올라오는 현상이고, 불편이 반복되거나 이어질 때 질환으로 다룹니다.", "음식·자세·시간의 관련성은 사람마다 다르므로 기록으로 살펴봅니다.", "새롭고 심한 가슴 통증이나 숨쉬기 어려움은 역류로 단정하지 않고 119에 도움을 요청합니다."],
    sections: [
      { title: "역류와 질환은 같은 말이 아닙니다", paragraphs: ["위 내용물이 올라오는 현상은 누구에게나 가끔 생길 수 있습니다. 불편이 반복되거나 오래 이어져 일상에 영향을 주거나 합병증과 연결될 때 위식도역류질환이라는 진단을 검토합니다."], claimIds: ["GERD-B2-001"] },
      { title: "위에서 식도로 올라오는 흐름", paragraphs: ["그림은 위 내용물이 식도 쪽으로 올라올 수 있다는 단순한 개념을 보여 줄 뿐입니다. 증상이 있다고 이 그림으로 진단하거나 다른 원인을 배제할 수는 없습니다."], claimIds: ["GERD-B2-001", "GERD-B2-003"], tone: "note", imageId: "gerd-explainer" },
      { title: "어떤 변화가 있을 수 있나요?", bullets: ["속쓰림 또는 내용물이 목·입 쪽으로 올라오는 느낌", "흉부 불편, 메스꺼움, 삼킴의 불편", "기침이나 쉰 목소리처럼 다른 증상"], claimIds: ["GERD-B2-002"] },
      { title: "시간표는 음식 금지표가 아닙니다", paragraphs: ["식사 시점, 눕거나 잠든 시점, 불편의 종류와 지속 시간을 적어 보세요. 특정 음식이나 자세가 모두에게 같은 영향을 준다고 단정하지 않고, 개인의 기록을 진료에서 함께 해석합니다."], claimIds: ["GERD-B2-004", "GERD-B2-005"], imageId: "gerd-action" },
      { title: "약과 자가 판단의 경계", paragraphs: ["일반의약품을 포함한 약의 선택과 사용 기간은 개인 상황에 따라 달라집니다. 이 페이지의 기록만으로 약을 시작·중단·변경하거나 치료 목표를 정하지 않습니다."], claimIds: ["GERD-B2-003", "GERD-B2-006", "GERD-B2-011", "GERD-B2-012"] },
      { title: "의료진에게 바로 확인할 변화", bullets: ["지속되는 구토, 삼키기 어렵거나 아픈 증상", "출혈을 의심할 수 있는 구토나 검은 변", "원인 없는 체중 감소 또는 계속되는 흉통"], claimIds: ["GERD-B2-007"] },
      { title: "역류로 단정하지 말고 119가 먼저인 때", paragraphs: ["새롭고 심한 가슴 통증, 숨쉬기 어려움, 의식 저하처럼 위급한 변화가 있으면 온라인 글을 더 읽지 말고 119에 도움을 요청합니다."], claimIds: ["GERD-B2-008"], tone: "warning", imageId: null },
      { title: "가족이 도울 수 있는 방식", paragraphs: ["식사나 체형을 평가하기보다, 당사자가 원할 때 시간표와 증상 기록을 함께 정리하고 진료에서 물을 내용을 준비합니다."], claimIds: ["GERD-B2-009", "GERD-B2-010"] },
    ],
    faq: [
      { question: "속쓰림이 있으면 모두 위식도역류질환인가요?", answer: "아닙니다. 비슷한 증상을 다른 문제가 만들 수 있어 증상만으로 확정하지 않습니다.", claimIds: ["GERD-B2-002", "GERD-B2-003"] },
      { question: "음식 하나를 영구히 끊어야 하나요?", answer: "개인마다 관련성이 다르므로 이 페이지는 금지 목록을 정하지 않습니다. 기록을 의료진과 상의하세요.", claimIds: ["GERD-B2-005", "GERD-B2-011"] },
      { question: "가족은 무엇을 기록하면 좋나요?", answer: "식사·증상·자세·수면의 시간 흐름과 질문을 당사자 동의 아래 정리하면 됩니다.", claimIds: ["GERD-B2-004", "GERD-B2-009", "GERD-B2-010"] },
    ],
    sourceIds: ["SRC-NIDDK-GERD-DEFINITION", "SRC-NIDDK-GERD-SYMPTOMS", "SRC-NIDDK-GERD-DIAGNOSIS", "SRC-NIDDK-GERD-DIET", "SRC-KDCA-CPR"], imageIds: ["gerd-hero", "gerd-explainer", "gerd-action"], toolSlugs: ["gerd-symptom-timing-log", "gerd-everyday-patterns", "gerd-appointment-prep"],
  },
  osteoarthritis: {
    slug: "osteoarthritis", title: "골관절염, 아픈 정도보다 생활의 변화를 함께 적어요", eyebrow: "뼈·관절 · Preview 안내", description: "관절의 불편을 혼자 병명으로 결론 내리지 않고, 일상 변화와 진료 질문을 차분히 준비합니다.", outcome: "어느 관절이 언제 불편한지 기록하고, 안전한 활동과 치료 선택을 의료진에게 질문합니다.",
    summary: ["골관절염은 관절 조직에 변화가 생기는 질환이며 증상은 사람마다 다릅니다.", "통증·뻣뻣함만으로 스스로 병명을 확정하지 않습니다.", "활동·도구·약의 선택은 개인 상황이 달라 의료진과 상의합니다."],
    sections: [
      { title: "관절 전체에서 일어나는 변화", paragraphs: ["골관절염은 연골뿐 아니라 관절 안의 여러 조직에 변화가 생길 수 있는 질환입니다. 단순히 ‘닳아서 생긴다’는 한 문장으로 사람의 증상이나 원인을 설명할 수는 없습니다."], claimIds: ["OA-B2-001", "OA-B2-012"] },
      { title: "그림은 관절의 일부만 단순화합니다", paragraphs: ["그림은 관절을 이루는 뼈 끝, 완충 조직과 주변 구조를 이해하기 위한 단순화입니다. 영상 검사나 개인의 관절 상태를 보여 주는 그림이 아닙니다."], claimIds: ["OA-B2-001", "OA-B2-003"], tone: "note", imageId: "oa-explainer" },
      { title: "일상에서 느낄 수 있는 변화", bullets: ["관절을 쓸 때의 통증 또는 쉬고 난 뒤의 뻣뻣함", "움직임이 줄거나 부은 느낌", "수면·계단·걷기·집안일 같은 일상에 미치는 영향"], claimIds: ["OA-B2-002", "OA-B2-004"] },
      { title: "활동은 점수보다 맥락을 남깁니다", paragraphs: ["걷기, 계단, 집안일 같은 활동 전후에 어떤 변화가 있었는지 적습니다. 기록은 내 몸에 맞는 운동 강도나 보조기구를 스스로 처방하는 계산표가 아닙니다."], claimIds: ["OA-B2-004", "OA-B2-005", "OA-B2-011"], imageId: "oa-action" },
      { title: "치료 결정을 대신하지 않습니다", paragraphs: ["약, 주사, 보조기구와 수술은 개인의 상태와 목표를 함께 고려하는 치료 결정입니다. 온라인 글이나 기록만으로 약을 시작·중단·변경하거나 치료를 고르지 않습니다."], claimIds: ["OA-B2-003", "OA-B2-006"] },
      { title: "진료에서 확인할 질문", bullets: ["어느 관절이 언제 불편하고 일상에 어떤 영향을 주나요?", "다른 원인을 확인하려면 어떤 진찰·검사가 필요한가요?", "제 상황에서 안전하게 시작하거나 조정할 활동은 무엇인가요?"], claimIds: ["OA-B2-007", "OA-B2-010"] },
      { title: "온라인 정보보다 119가 먼저인 변화", paragraphs: ["심한 외상 뒤 움직일 수 없거나 의식 저하·호흡곤란처럼 위급한 변화가 있으면 관절염으로 단정하거나 기록을 계속하지 말고 119에 도움을 요청합니다."], claimIds: ["OA-B2-008"], tone: "warning", imageId: null },
      { title: "가족은 속도보다 선택을 존중합니다", paragraphs: ["가족은 활동을 재촉하거나 통증을 판단하지 않고, 당사자가 원하는 일상 지원과 진료 질문 준비를 돕습니다."], claimIds: ["OA-B2-009"] },
    ],
    faq: [
      { question: "관절이 아프면 골관절염인가요?", answer: "아닙니다. 여러 원인이 있을 수 있어 증상만으로 스스로 확정하지 않습니다.", claimIds: ["OA-B2-002", "OA-B2-003"] },
      { question: "아프면 활동을 모두 멈춰야 하나요?", answer: "활동 범위는 개인 상태에 따라 다릅니다. 기록을 바탕으로 의료진 또는 재활 전문가와 상의하세요.", claimIds: ["OA-B2-005", "OA-B2-011"] },
      { question: "가족은 무엇을 도우면 좋나요?", answer: "당사자의 속도와 선택을 존중하고, 기록·질문·필요한 일상 지원을 함께 준비할 수 있습니다.", claimIds: ["OA-B2-009", "OA-B2-010"] },
    ],
    sourceIds: ["SRC-NIAMS-OA", "SRC-NIAMS-OA-TREATMENT", "SRC-CDC-OA", "SRC-CDC-ARTHRITIS-ACTIVITY", "SRC-KDCA-CPR"], imageIds: ["oa-hero", "oa-explainer", "oa-action"], toolSlugs: ["oa-daily-activity-log", "oa-visit-questions", "oa-family-support"],
  },
  osteoporosis: {
    slug: "osteoporosis", title: "골다공증, 증상이 없을 때도 질문을 준비해요", eyebrow: "뼈·관절 · Preview 안내", description: "골밀도와 골절 위험을 혼자 계산하지 않고, 집안 환경과 진료 질문을 안전하게 준비합니다.", outcome: "검사·낙상·복용 약 정보를 정리하고, 골절 위험을 스스로 계산하지 않은 채 진료에서 질문합니다.",
    summary: ["골다공증은 뼈의 강도가 약해져 골절 위험이 커질 수 있는 질환입니다.", "증상이 없을 수 있어 검사 결과와 위험은 의료진이 함께 해석합니다.", "집안 점검표는 예방을 보장하거나 골절 위험을 계산하는 도구가 아닙니다."],
    sections: [
      { title: "뼈의 강도가 달라질 수 있습니다", paragraphs: ["골다공증은 뼈의 밀도나 구조·강도가 변해 골절 위험이 커질 수 있는 질환입니다. 누구에게나 같은 모습으로 나타나는 것은 아니며, 증상이 없을 수도 있습니다."], claimIds: ["OP-B2-001", "OP-B2-002"] },
      { title: "그림으로 보는 뼈 구조의 개념", paragraphs: ["그림은 뼈 내부 구조가 달라질 수 있다는 개념을 단순화한 것입니다. 내 뼈의 상태나 골절 위험을 보여 주는 검사 결과가 아닙니다."], claimIds: ["OP-B2-001", "OP-B2-004"], tone: "note", imageId: "op-explainer" },
      { title: "위험 요인은 계산식이 아닙니다", paragraphs: ["나이, 일부 질환·약, 생활 요인은 서로 다르게 관련될 수 있습니다. 목록에 해당한다고 골다공증을 진단하거나, 해당하지 않는다고 안심할 수는 없습니다."], claimIds: ["OP-B2-003", "OP-B2-012"] },
      { title: "검사와 집안 점검은 다른 역할입니다", paragraphs: ["골밀도 검사는 의료진이 결과를 해석하는 검사입니다. 집 안의 통로·조명·느슨한 물건을 살피는 일은 낙상을 줄이기 위한 환경 점검의 한 부분이지만, 골절을 막는다고 보장하지는 않습니다."], claimIds: ["OP-B2-004", "OP-B2-006"], imageId: "op-action" },
      { title: "약과 보충제는 스스로 정하지 않습니다", paragraphs: ["약, 칼슘·비타민D 보충과 생활 계획은 검사 결과와 다른 건강 상태를 함께 봐야 합니다. 이 페이지나 한 번의 검사 숫자만으로 시작·중단·변경하지 않습니다."], claimIds: ["OP-B2-004", "OP-B2-007"] },
      { title: "진료에서 확인할 질문", bullets: ["제게 골밀도 검사가 필요한지와 결과의 의미는 무엇인가요?", "낙상·골절 이력과 복용 약 중 무엇을 알려야 하나요?", "개인에게 맞는 예방·치료 계획은 어떻게 정하나요?"], claimIds: ["OP-B2-005", "OP-B2-011"] },
      { title: "낙상 뒤 119가 먼저인 변화", paragraphs: ["낙상 뒤 의식이 흐려지거나 숨쉬기 어렵고 움직일 수 없을 만큼 위급한 변화가 있으면 온라인 정보를 기다리지 말고 119에 도움을 요청합니다."], claimIds: ["OP-B2-008", "OP-B2-009"], tone: "warning", imageId: null },
      { title: "가족은 비난 없이 환경을 함께 봅니다", paragraphs: ["가족은 낙상 위험을 개인 탓으로 돌리지 않고, 당사자 동의 아래 통로 점검·기록 정리·진료 질문 준비를 함께할 수 있습니다."], claimIds: ["OP-B2-010"] },
    ],
    faq: [
      { question: "증상이 없으면 골다공증이 아닌가요?", answer: "아닙니다. 증상이 없을 수 있어 필요한 검사와 해석은 의료진과 상의합니다.", claimIds: ["OP-B2-002", "OP-B2-004"] },
      { question: "집안 점검만 하면 골절을 막을 수 있나요?", answer: "환경 점검은 한 부분일 뿐, 골절 예방을 보장하지 않으며 개인 위험을 계산하지 않습니다.", claimIds: ["OP-B2-006", "OP-B2-012"] },
      { question: "약이나 보충제는 직접 정해도 되나요?", answer: "아닙니다. 검사·다른 건강 상태·복용 약을 함께 고려해야 하므로 의료진과 상의합니다.", claimIds: ["OP-B2-007"] },
    ],
    sourceIds: ["SRC-NIAMS-OP", "SRC-NIAMS-OP-TREATMENT", "SRC-NIAMS-BMD", "SRC-NIAMS-BONE-HEALTH", "SRC-KDCA-CPR"], imageIds: ["op-hero", "op-explainer", "op-action"], toolSlugs: ["osteoporosis-appointment-prep", "osteoporosis-home-check", "osteoporosis-terms"],
  },
};

export const batch2HealthTools: HealthTool[] = [
  { slug: "allergy-trigger-observation", articleSlug: "allergic-rhinitis", title: "알레르기 비염 관찰표", description: "증상·장소·시간을 적되 원인을 판정하지 않는 기록지입니다.", claimIds: ["AR-B2-003", "AR-B2-005", "AR-B2-012"], kind: "log", columns: ["날짜", "시간", "장소", "증상", "눈·호흡 변화", "수면", "메모"], rows: 12 },
  { slug: "allergy-environment-check", articleSlug: "allergic-rhinitis", title: "환경 변화 관찰 체크", description: "환경을 바꾼 뒤의 흐름을 살피고 개인 효과를 단정하지 않습니다.", claimIds: ["AR-B2-006", "AR-B2-012"], kind: "checklist", items: ["오늘의 증상과 장소를 적었습니다.", "바꾼 환경이 있다면 날짜를 함께 적었습니다.", "좋아짐·나빠짐을 한 번의 경험으로 확정하지 않았습니다.", "약 시작·변경은 의료진 또는 약사에게 확인합니다."] },
  { slug: "allergy-appointment-questions", articleSlug: "allergic-rhinitis", title: "알레르기 비염 진료 질문 카드", description: "증상 흐름과 검사 필요 여부를 묻기 위한 질문 카드입니다.", claimIds: ["AR-B2-008", "AR-B2-011"], kind: "questions", items: ["제 증상 흐름에서 확인할 점은 무엇인가요?", "알레르기 검사나 다른 원인 확인이 필요한가요?", "사용 중인 약과 스프레이에서 주의할 점은 무엇인가요?", "가족은 어떤 방식으로 기록을 도우면 좋나요?"] },
  { slug: "gerd-symptom-timing-log", articleSlug: "gastroesophageal-reflux-disease", title: "역류 증상·시간 기록표", description: "식사·자세·수면과 불편의 흐름을 적는 관찰표입니다.", claimIds: ["GERD-B2-004", "GERD-B2-011"], kind: "log", columns: ["날짜", "식사 시점", "눕거나 잠든 시점", "불편", "지속 시간", "삼킴 변화", "메모"], rows: 12 },
  { slug: "gerd-everyday-patterns", articleSlug: "gastroesophageal-reflux-disease", title: "일상 패턴 관찰 체크", description: "음식 금지표가 아니라 개인의 흐름을 기록하는 체크리스트입니다.", claimIds: ["GERD-B2-005", "GERD-B2-011"], kind: "checklist", items: ["식사와 불편의 시간 흐름을 적었습니다.", "특정 음식 하나를 원인으로 단정하지 않았습니다.", "약의 시작·중단·변경은 온라인 글로 결정하지 않았습니다.", "흉통이나 삼킴 변화를 진료 질문으로 적었습니다."] },
  { slug: "gerd-appointment-prep", articleSlug: "gastroesophageal-reflux-disease", title: "위식도역류 진료 준비 카드", description: "증상·약·검사 필요 여부를 묻기 위한 질문 카드입니다.", claimIds: ["GERD-B2-007", "GERD-B2-010", "GERD-B2-012"], kind: "questions", items: ["제 증상에서 다른 원인 확인이 필요한가요?", "삼킴·구토·흉통 변화는 어떻게 알려야 하나요?", "복용 중인 약과 일반의약품은 어떻게 확인하나요?", "제 기록에서 어떤 검사가 필요한지 물어볼 점은 무엇인가요?"] },
  { slug: "oa-daily-activity-log", articleSlug: "osteoarthritis", title: "관절 일상 변화 기록표", description: "활동 전후의 관절 변화와 일상 영향을 적는 관찰표입니다.", claimIds: ["OA-B2-004", "OA-B2-011"], kind: "log", columns: ["날짜", "불편한 관절", "활동", "전후 변화", "부종·열감", "수면", "메모"], rows: 12 },
  { slug: "oa-visit-questions", articleSlug: "osteoarthritis", title: "골관절염 진료 질문 카드", description: "원인 확인과 개인별 활동·치료 선택을 묻기 위한 질문 카드입니다.", claimIds: ["OA-B2-003", "OA-B2-005", "OA-B2-010"], kind: "questions", items: ["이 증상에 다른 원인을 확인할 검사가 필요한가요?", "제 기록에서 어떤 패턴을 봐야 하나요?", "제게 안전한 활동 조정은 무엇인가요?", "약·보조기구·재활 선택은 어떻게 함께 정하나요?"] },
  { slug: "oa-family-support", articleSlug: "osteoarthritis", title: "관절 불편 가족 지원 체크", description: "속도를 재촉하지 않고 일상 지원과 질문 준비를 돕는 체크리스트입니다.", claimIds: ["OA-B2-009", "OA-B2-010"], kind: "checklist", items: ["당사자가 원하는 도움을 먼저 물었습니다.", "통증을 평가하거나 활동을 재촉하지 않았습니다.", "기록과 진료 질문을 함께 정리했습니다.", "약·주사·보조기구를 대신 결정하지 않았습니다."] },
  { slug: "osteoporosis-appointment-prep", articleSlug: "osteoporosis", title: "골다공증 진료 준비표", description: "골절·낙상·복용 약과 검사 질문을 정리하는 준비표입니다.", claimIds: ["OP-B2-004", "OP-B2-005", "OP-B2-011"], kind: "questions", items: ["골밀도 검사가 필요한지와 결과 의미는 무엇인가요?", "낙상·골절·가족력 중 무엇을 알려야 하나요?", "현재 복용 약이 뼈 건강에 미칠 점이 있나요?", "개인에게 맞는 예방·치료 계획은 어떻게 정하나요?"] },
  { slug: "osteoporosis-home-check", articleSlug: "osteoporosis", title: "낙상 위험 집안 점검표", description: "통로와 조명을 점검하되 골절 예방을 보장하지 않는 체크리스트입니다.", claimIds: ["OP-B2-006", "OP-B2-010", "OP-B2-012"], kind: "checklist", items: ["통로에 걸릴 수 있는 물건이 없는지 살폈습니다.", "느슨한 매트나 전선을 확인했습니다.", "밤에 이동하는 길의 조명을 확인했습니다.", "점검표만으로 골절 위험을 계산하거나 보장하지 않았습니다."] },
  { slug: "osteoporosis-terms", articleSlug: "osteoporosis", title: "골밀도 검사 용어 한 장", description: "골밀도 검사와 결과 해석의 경계를 구분하는 안내입니다.", claimIds: ["OP-B2-001", "OP-B2-004", "OP-B2-012"], kind: "guide", items: ["골밀도: 뼈 안의 미네랄 양을 측정하는 검사 정보", "DXA: 골밀도를 재는 데 흔히 쓰이는 검사", "검사 숫자는 나이와 다른 위험 요인을 함께 봐야 함", "한 번의 숫자로 이 페이지에서 진단·약 결정·골절 위험 계산을 하지 않음"] },
];
