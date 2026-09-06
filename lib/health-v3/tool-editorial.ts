import { getSources, healthArticles, healthClaims, type HealthTool } from "./content";

export type ToolEditorial = {
  indexDecision?: "INDEX_UTILITY" | "NOINDEX_FOLLOW";
  inheritParentWarning?: boolean;
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
  "oa-visit-questions": {
    indexDecision: "INDEX_UTILITY",
    inheritParentWarning: true,
    title: "골관절염 진료 질문지: 원하는 활동과 치료 선택을 함께 묻기",
    description: "불편한 활동과 되찾고 싶은 일상을 적고 검사 목적·개인 활동 계획·약과 보조기구 선택을 묻는 인쇄 카드입니다. 의료진의 답과 다음 확인 시점을 남기며 스스로 운동이나 치료를 처방하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "관절 진료에서 통증뿐 아니라 계단·손 사용 등 생활의 어려움과 본인의 우선순위를 함께 전달할 때 씁니다. 통증을 참거나 낮춰 말할 필요는 없습니다.",
    steps: [
      "불편한 관절·좌우와 어려워진 활동을 적고, 다시 편하게 하고 싶은 일을 남깁니다. 먼저 이야기할 것을 골라도 다른 중요한 증상을 생략하지 않습니다. 기존 관찰 기록이 있으면 가져갑니다.",
      "이미 쓰는 약·바르는 제품·보조기구와 불편했던 점을 적습니다. 검사 결과가 있다면 원본을 준비하되, 없는 자료를 만들거나 모르는 약 이름을 추측하지 않습니다.",
      "질문에 표시하고 진료 중 답을 아래에 적습니다. 개인 활동의 범위·조정 기준, 제안받은 치료의 기대와 부담, 다시 평가할 때와 문의처를 구분합니다. 이해되지 않는 설명은 다시 묻습니다.",
    ],
    example: "질문을 연결하는 예시: ‘계단을 이용하기 어렵다’는 관찰 → 제게 맞는 활동·재활·보조도구 선택 질문. 특정 도구를 사거나 운동 횟수를 정하는 답을 미리 채워 넣지 않습니다.",
    limitation: "모든 사람에게 MRI·주사·수술이 필요하다는 목록이 아닙니다. 기록이나 검사 하나로 골관절염을 확정하지 않고, 현재 상태와 다른 질환·약을 함께 고려해 의료진과 선택합니다. 약을 혼자 시작·중단·증량하지 않습니다.",
    sheetNotice: "갑작스러운 심한 관절통이나 새 부종, 관절 주변 피부색 변화는 예약·질문지 완성보다 당일 신속한 진료가 먼저입니다. 열이 나거나 모든 증상이 모일 때까지 기다리지 않습니다. 심한 외상 뒤 움직일 수 없거나 의식·호흡의 위급한 변화가 있으면 119에 도움을 요청합니다.",
    sourceIds: ["SRC-NIAMS-OA-TREATMENT", "SRC-NHS-SEPTIC-ARTHRITIS"],
    links: [
      { href: "/health/tools/oa-daily-activity-log", label: "관절·좌우와 실제 활동 전후 느낌을 적는 관찰표" },
      { href: "/health/guides/medication-list", label: "처방약·진통제·바르는 제품의 실제 사용 목록" },
      { href: "/health/tools/oa-family-support", label: "본인이 원하는 진료 동행·기록 도움을 묻는 체크" },
    ],
  },
  "oa-daily-activity-log": {
    indexDecision: "INDEX_UTILITY",
    inheritParentWarning: true,
    title: "관절 일상 기록표: 어느 관절이 어떤 활동에서 달라졌는지",
    description: "불편한 관절·좌우, 실제 활동과 전후 느낌, 부종·수면·일상 영향을 함께 적는 인쇄 기록표입니다. 골관절염 진료에 관찰을 전달하는 양식이며 운동량이나 병의 단계를 판정하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "‘관절이 아프다’에 더해 어떤 일을 하기 어려웠는지 함께 설명할 때 씁니다. 12줄은 작성 공간이지 12일 관찰이나 운동 횟수의 기준이 아닙니다.",
    steps: [
      "한 줄에 한 번의 관찰을 적습니다. 어느 관절·어느 쪽인지, 실제 활동과 그 시각·시간을 아는 만큼 남기고 기억나지 않으면 미확인으로 표시합니다.",
      "활동 전후의 통증·뻣뻣함을 자신의 말로 구분합니다. 붓기·열감·피부 변화, 수면이나 일상에서 어려워진 일과 이미 사용한 약도 적습니다. 움직이지 못한 때도 사실대로 남깁니다.",
      "원본을 진료에 가져가 개인 활동 계획을 상의합니다. 비교 기록을 만들려고 아픈 동작을 일부러 반복하거나 통증을 참고 정해진 양을 채우지 않습니다. 약이나 보조기구를 혼자 바꾸며 효과를 시험하지 않습니다.",
    ],
    example: "작성 위치 예시: 왼쪽 무릎 → 관절·좌우 / 계단 내려가기 → 실제 활동 / 멈춰 쉬었음 → 일상 영향. 가상의 환자 결과나 정상 점수를 채워 넣지 않고 본인이 겪은 일을 적습니다.",
    limitation: "통증과 기능 변화는 함께 전달할 정보이며 어느 하나를 덜 중요하게 평가하지 않습니다. 이 기록으로 골관절염·통풍·감염을 구분하거나 연골 상태·치료 효과를 확정하지 않습니다. 심하거나 가라앉지 않는 통증은 의료진에게 알립니다.",
    sheetNotice: "갑작스러운 심한 관절통이나 새 부종, 관절 주변 피부색 변화는 기록보다 당일 신속한 진료가 먼저입니다. 열이 나거나 모든 증상이 모일 때까지 기다리지 않습니다. 심한 외상 뒤 움직일 수 없거나 의식·호흡의 위급한 변화가 있으면 119에 도움을 요청합니다.",
    sourceIds: ["SRC-NIAMS-OA-TREATMENT", "SRC-CDC-ARTHRITIS-ACTIVITY", "SRC-NHS-SEPTIC-ARTHRITIS"],
    links: [
      { href: "/health/tools/oa-visit-questions", label: "기록과 원하는 활동을 가져갈 골관절염 진료 질문" },
      { href: "/health/guides/medication-list", label: "바르는 약·진통제까지 사용법을 남기는 약 목록" },
      { href: "/health/tools/oa-family-support", label: "당사자가 원하는 기록·진료 도움을 묻는 가족 체크" },
    ],
  },
  "gerd-appointment-prep": {
    indexDecision: "INDEX_UTILITY",
    inheritParentWarning: true,
    title: "위식도역류 진료 질문 카드: 검사 목적·현재 약·다음 확인 시점",
    description: "성인 역류 증상 진료에 기록과 현재 약을 가져가 검사 필요성·목적, 개별 준비 지침과 다음 연락 시점을 묻는 인쇄 카드입니다. 질문을 고르고 의료진의 답을 함께 남길 수 있습니다.",
    updatedAt: "2026-09-06",
    purpose: "진료에서 가장 설명하고 싶은 불편과 실제로 사용 중인 약을 질문에 연결합니다. 모든 질문에 미리 답하거나 긴 관찰 기록을 완성해야 진료받을 수 있다는 뜻은 아닙니다.",
    steps: [
      "증상 시각·지속 시간과 식사·자세의 흐름을 아는 만큼 적습니다. 기존 기록이 있다면 원본을 가져오며 기억나지 않는 내용은 미확인으로 남깁니다.",
      "처방약·일반약의 이름과 실제 사용법, 이전 검사 결과나 기관 안내가 있다면 함께 준비합니다. 위장약을 먹은 뒤 변화만으로 원인을 확정하거나 약을 혼자 중단하지 않습니다.",
      "먼저 물을 질문에 표시하고 진료 중 답을 적습니다. 검사가 필요하다면 무엇을 확인하려는지와 해당 기관의 식사·약 준비 지침을 묻습니다. 치료나 관찰을 먼저 한다면 다시 평가할 때와 문의처를 확인합니다.",
    ],
    example: "질문을 연결하는 예시: ‘제게 지금 검사가 필요한가요?’ → 필요 여부·검사 목적·준비 안내를 답변 칸에 구분해 적기. 이해하지 못한 지침은 확인 필요로 남겨 다시 묻습니다.",
    limitation: "내시경·식도 산도검사를 모두 받아야 한다는 카드가 아닙니다. 검사 선택과 치료는 의료진이 병력·증상을 함께 보고 정합니다. 삼키기 어렵거나 아프거나, 구토가 계속되거나, 이유 없이 체중이 줄면 다음 예약까지 질문으로만 남기지 말고 의료진에게 알립니다.",
    sheetNotice: "가슴 압박·통증, 숨참·식은땀 등으로 심근경색이 의심되거나 심한 호흡곤란·의식 저하가 있으면 즉시 119에 연락합니다. 위장약 반응이나 예약·질문지 완성을 기다리지 않습니다. 피·커피 찌꺼기 같은 구토 또는 검고 타르 같은 변은 바로 의료 도움을 구하고, 실신 등 위급한 상태라면 119가 먼저입니다.",
    sourceIds: ["SRC-NIDDK-GERD-DIAGNOSIS", "SRC-NIDDK-GERD-SYMPTOMS", "SRC-NHS-GERD", "SRC-NIDDK-GI-BLEEDING"],
    links: [
      { href: "/health/tools/gerd-symptom-timing-log", label: "식사·자세와 증상 시작 시각을 적는 기록표" },
      { href: "/health/guides/medication-list", label: "약 포장·실제 사용법을 구분해 준비하는 목록" },
      { href: "/health/guides/appointment-questions", label: "설명받은 다음 행동과 문의처를 확인하는 순서" },
    ],
  },
  "gerd-everyday-patterns": {
    indexDecision: "NOINDEX_FOLLOW",
    inheritParentWarning: true,
    title: "역류 생활 패턴 체크: 이미 바꾼 일과 관찰 사실 구분하기",
    description: "생활에서 이미 바꾼 일·날짜와 함께 달라진 점을 남기는 인쇄용 보조 체크리스트입니다. 역류 증상 시간 기록표와 함께 쓰며 음식 금지표나 생활습관 점수표가 아닙니다.",
    updatedAt: "2026-09-06",
    purpose: "역류 증상 기록표를 작성한 뒤 생활 변화에 대한 메모가 빠졌는지 확인할 때 씁니다. 새로운 식사 실험이나 생활 규칙을 처방하지 않습니다.",
    steps: [
      "이미 바꾼 일이 있다면 무엇을 언제 바꿨는지 적습니다. 같은 시기의 다른 변화와 남은 불편도 구분하고, 바꾼 일이 없거나 모르면 그대로 적습니다.",
      "확인한 항목만 표시합니다. 실제 식사·자세·증상 시각은 연결된 기록표에 남기고, 효과를 확인하려고 불편했던 음식이나 자세를 일부러 반복하지 않습니다.",
    ],
    example: "작성 위치 예시: 바꾼 일·날짜 → 아래 메모 / 증상이 시작된 시각·지속 시간 → 역류 증상 기록표. 여러 변화가 겹쳤다면 한 음식이나 한 행동의 효과로 단정하지 않습니다.",
    limitation: "체크 수는 치료 성적이나 안전 판정이 아닙니다. 증상을 유발하는 음식은 개인마다 다를 수 있으므로 공통 금지 목록을 만들지 않습니다. 삼키기 어렵거나 아프거나, 구토가 계속되거나, 이유 없이 체중이 줄면 기록 완성을 기다리지 말고 의료진에게 알립니다.",
    sheetNotice: "가슴 압박·통증, 숨참·식은땀 등으로 심근경색이 의심되거나 심한 호흡곤란·의식 저하가 있으면 즉시 119에 연락합니다. 위장약 반응이나 체크 완료를 기다리지 않습니다. 피·커피 찌꺼기 같은 구토 또는 검고 타르 같은 변은 바로 의료 도움을 구하고, 실신 등 위급한 상태라면 119가 먼저입니다.",
    sourceIds: ["SRC-NIDDK-GERD-DIET", "SRC-NIDDK-GERD-SYMPTOMS", "SRC-NHS-GERD", "SRC-NIDDK-GI-BLEEDING"],
    links: [
      { href: "/health/tools/gerd-symptom-timing-log", label: "식사·자세·실제 증상 시각을 적는 역류 기록표" },
      { href: "/health/tools/gerd-appointment-prep", label: "기록으로 알 수 없는 원인과 검사 목적을 묻는 카드" },
    ],
  },
  "gerd-symptom-timing-log": {
    inheritParentWarning: true,
    title: "역류 증상 기록표: 식사·자세·불편이 시작된 시각을 나란히",
    description: "먹고 마신 시각, 눕거나 몸을 굽힌 활동, 불편이 시작된 시각과 이미 사용한 약을 나란히 적는 성인용 인쇄 기록표입니다. 음식 원인을 판정하거나 식도 산도검사를 대신하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "식사·자세·불편이 어떤 순서로 있었는지 진료에서 설명할 때 씁니다. 12줄은 종이의 공간이며 12일을 채운 뒤 상담하라는 뜻이 아닙니다.",
    steps: [
      "한 줄에 한 번의 관찰을 적습니다. 증상이 시작된 실제 시각과 느낌·지속 시간을 남기고, 기억나지 않는 때는 미확인으로 표시합니다.",
      "먹고 마신 것·대략적인 양·시각을 눕기·수면·몸을 굽힌 활동과 구분합니다. 이미 사용한 약의 이름·시각도 함께 적되 기록을 위해 약이나 식사를 임의로 바꾸지 않습니다.",
      "진료 때 원본 기록을 보여 줍니다. 한 음식 뒤 불편했다는 사실을 원인으로 확정하거나 확인하려고 일부러 증상을 유발하지 않습니다. 새 삼킴 변화·지속 구토·이유 없는 체중 감소는 기록을 더 모으지 말고 의료진에게 알립니다.",
    ],
    example: "작성 위치 예시: 식사한 때 → 먹고 마신 것 칸 / 불편이 생긴 때 → 증상 시작 칸. ‘식후’라고만 적기보다 아는 실제 시각을 나누어 쓰고, 이 표로 안전한 식사 간격을 계산하지 않습니다.",
    limitation: "시간표로 역류나 심장질환을 진단하지 않습니다. 생활 조정이나 기존 치료로 나아지지 않거나 증상이 자주 반복되면 의료진에게 상담합니다. 아래 출혈 신호는 다음 예약까지 기다리지 않습니다.",
    sheetNotice: "가슴 압박·통증, 숨참·식은땀 등으로 심근경색이 의심되거나 심한 호흡곤란·의식 저하가 있으면 즉시 119에 연락합니다. 위장약 반응이나 기록 완성을 기다리지 않습니다. 피·커피 찌꺼기 같은 구토 또는 검고 타르 같은 변은 바로 의료 도움을 구하고, 실신 등 위급한 상태라면 119가 먼저입니다.",
    sourceIds: ["SRC-NIDDK-GERD-DIAGNOSIS", "SRC-NIDDK-GERD-SYMPTOMS", "SRC-NHS-GERD", "SRC-NIDDK-GI-BLEEDING"],
    links: [
      { href: "/health/tools/gerd-appointment-prep", label: "기록과 현재 약을 가져가 검사 목적을 묻는 카드" },
      { href: "/health/guides/medication-list", label: "일반약까지 실제 사용법을 적는 약 목록" },
      { href: "/health/guides/danger-signals", label: "기록보다 도움 요청이 먼저인 위험 신호" },
    ],
  },
  "allergy-appointment-questions": {
    title: "알레르기 비염 진료 질문지: 검사 준비·코 스프레이 사용법 확인",
    description: "증상 사례와 현재 약·코·눈 제품을 질문에 연결하고, 검사 준비·제품별 사용법·다음 상담 시점을 적는 성인 진료용 인쇄 카드입니다. 필요한 검사나 약의 중단 기간을 대신 결정하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "성인이 비염 증상으로 상담할 때 관찰 기록을 질문과 답변으로 옮기는 양식입니다. 빈칸은 진료 준비를 돕는 공간이며 모든 답을 미리 알아야 진료받을 수 있다는 뜻은 아닙니다.",
    steps: [
      "가장 설명하고 싶은 관찰 사례부터 적습니다. 시작 시각·장소와 코·눈·호흡·수면의 변화를 아는 만큼 남기며, 사례 하나를 고른다고 다른 중요한 증상을 생략하지 않습니다.",
      "사용 중인 약과 코·눈 제품의 포장 또는 목록을 가져갑니다. 제품명·실제 사용법·불편했던 점을 구분하고 모르면 추측하지 않습니다. 검사기관에서 이미 받은 안내도 함께 준비합니다.",
      "먼저 물을 질문에 표시하고 진료 중 답을 아래에 적습니다. 스프레이는 모두 같은 종류가 아니므로 해당 제품의 사용법·기간·문의 기준을 확인합니다.",
      "검사가 예정되면 기관에 현재 제품명을 알려 준비 사항을 확인합니다. 피부검사에 영향을 줄 수 있는 약이 있지만 모든 검사·약에 같은 중단 규칙을 적용하지 않습니다. 임의로 약을 끊지 말고 안내가 어렵거나 불분명하면 다시 문의합니다.",
    ],
    example: "질문을 연결하는 예시: ‘제가 가져온 이 제품을 어떻게 사용해야 하나요?’ → 제품명과 받은 설명을 같이 적기. 답변 칸에는 확인한 준비 사항·다음 연락 시점·문의처를 구분하고 미확인 사항은 남겨 다시 묻습니다.",
    limitation: "질문 선택은 진단이나 검사 처방이 아닙니다. 이 카드는 스프레이를 며칠 쓰거나 약을 며칠 쉬라는 지시를 제공하지 않습니다. 천식이 평소보다 악화되면 의료진에게 신속히 알리고 기존 개인 대처 계획을 따릅니다.",
    sheetNotice: "숨쉬기 매우 어렵거나 의식이 흐려지는 등 위급한 변화가 있으면 비염이라고 단정하지 말고 즉시 119에 도움을 요청합니다. 예약일·검사·질문지 완성을 기다리지 않습니다.",
    sourceIds: ["SRC-MEDLINEPLUS-AR-QUESTIONS", "SRC-MEDLINEPLUS-ALLERGY-SKIN-TEST", "SRC-NHS-AR", "SRC-KDCA-CPR"],
    links: [
      { href: "/health/tools/allergy-trigger-observation", label: "진료에 가져갈 증상 시각·장소·수면 관찰표" },
      { href: "/health/guides/medication-list", label: "약·스프레이 제품명과 실제 사용법을 정리하는 목록" },
      { href: "/health/guides/appointment-questions", label: "설명받은 다음 행동·문의처를 확인하는 진료 준비 순서" },
    ],
  },
  "allergy-environment-check": {
    indexDecision: "NOINDEX_FOLLOW",
    title: "비염 환경 변화 체크: 날짜와 관찰 사실을 확인하는 보조표",
    description: "환경을 바꾼 날짜와 실제 증상을 함께 적었는지 확인하는 인쇄용 체크리스트입니다. 알레르기 관찰표의 보조 도구이며 청소 점수나 알레르기 원인 검사표가 아닙니다.",
    updatedAt: "2026-09-06",
    purpose: "관찰표를 작성한 뒤 빠뜨린 정보가 있는지 확인할 때 씁니다. 새 환경 개선법을 처방하거나 특정 제품을 사도록 권하는 목록은 아닙니다.",
    steps: [
      "이미 바꾼 환경이 있으면 무엇을 언제 바꿨는지 적고, 같은 때의 증상·장소를 관찰표에 남깁니다. 바꾼 것이 없거나 기억나지 않으면 그대로 적습니다.",
      "실제로 확인한 항목만 표시합니다. 빈칸을 채우려고 환경을 새로 바꾸거나 의심 물질에 일부러 다시 노출되지 않습니다. 여러 변화가 겹쳤다면 각각 적되 효과를 분리해 입증했다고 보지 않습니다.",
    ],
    example: "작성 위치 예시: 바꾼 일과 날짜 → 아래 메모 / 증상이 생긴 시각·장소·지속 시간 → 연결된 비염 관찰표. ‘청소했으므로 원인을 없앴다’는 결론 대신 관찰한 사실을 남깁니다.",
    limitation: "체크 개수로 환경이나 가족을 평가하지 않습니다. 원인과 개인 효과는 이 표로 확정하지 않으며, 증상이 악화되거나 수면·일상에 영향을 주거나 기존 치료로 나아지지 않으면 의료진에게 상담합니다. 기록을 위해 약을 임의로 바꾸지 않습니다.",
    sheetNotice: "숨쉬기 매우 어렵거나 의식이 흐려지는 등 위급한 변화가 있으면 비염이라고 단정하지 말고 즉시 119에 도움을 요청합니다. 체크를 끝내거나 환경 변화의 효과를 기다리지 않습니다.",
    sourceIds: ["SRC-NHS-AR", "SRC-MEDLINEPLUS-AR", "SRC-KDCA-CPR"],
    links: [
      { href: "/health/tools/allergy-trigger-observation", label: "증상 시각·장소·기존 약 사용을 적는 비염 관찰표" },
      { href: "/health/tools/allergy-appointment-questions", label: "관찰만으로 알 수 없는 원인과 치료를 묻는 질문 카드" },
    ],
  },
  "allergy-trigger-observation": {
    title: "알레르기 비염 관찰표: 증상 시각·장소·수면과 약 사용 기록",
    description: "코·눈 증상이 언제 어디서 생겼는지, 호흡·수면·일상에 어떤 변화가 있었는지 함께 남기는 인쇄 기록표입니다. 이미 사용한 약과 환경 변화를 구분해 적으며 알레르기 원인을 확정하지 않습니다.",
    updatedAt: "2026-09-06",
    purpose: "진료에서 증상 흐름을 설명할 때 가져가는 기록입니다. 12줄은 인쇄 공간이며 12일 관찰이나 정해진 횟수를 채워야 한다는 뜻이 아닙니다. 불편한 증상의 상담을 미루며 표를 완성할 필요가 없습니다.",
    steps: [
      "한 줄에 한 번의 관찰을 적습니다. 적는 시간이 아니라 증상이 시작된 시각과 실제 머문 장소·활동을 남기고, 기억나지 않는 정보는 미확인으로 표시합니다.",
      "코막힘·콧물·가려움 등 실제 증상과 지속 시간을 아는 만큼 적습니다. 눈·호흡 변화, 잠이나 일상에서 불편했던 일을 별도 칸에 남깁니다.",
      "이미 사용한 약·스프레이의 이름과 사용 시각, 바꾼 환경이 있다면 그 날짜를 구분합니다. 기록을 위해 약을 새로 쓰거나 중단하지 않습니다.",
      "진료 때 원본 기록을 보여 줍니다. 특정 장소에서 증상이 생겼다는 사실과 그곳의 물질이 원인이라는 결론을 구분하며, 확인하려고 의심 물질에 일부러 다시 노출되지 않습니다.",
    ],
    example: "작성 위치 예시: 증상이 생긴 때 → 시작 시각 / 당시 있던 곳과 하던 일 → 장소·활동 / 사용 중인 제품 → 약·스프레이 칸. 장소 이름만으로 꽃가루나 집먼지진드기를 원인으로 채워 넣지 않습니다.",
    limitation: "관찰만으로 알레르기·감기·천식을 구분하거나 치료 효과를 확정하지 않습니다. 증상이 악화되거나, 수면·일상에 영향을 주거나, 기존 치료로 나아지지 않으면 의료진에게 상담합니다. 천식이 평소보다 악화되면 신속히 연락하고, 이미 받은 개인 대처 계획을 따릅니다.",
    sheetNotice: "숨쉬기 매우 어렵거나 의식이 흐려지는 등 위급한 변화가 있으면 비염이라고 단정하지 말고 즉시 119에 도움을 요청합니다. 기록을 채우거나 검사 결과를 기다리지 않습니다.",
    sourceIds: ["SRC-NHS-AR", "SRC-MEDLINEPLUS-AR", "SRC-KDCA-CPR"],
    links: [
      { href: "/health/tools/allergy-appointment-questions", label: "증상 기록을 가져가 검사·스프레이를 물을 질문 카드" },
      { href: "/health/guides/symptom-journal", label: "관찰한 사실과 추측을 나누어 적는 방법" },
      { href: "/health/guides/medication-list", label: "스프레이·복용약 이름과 사용법을 정리하는 목록" },
    ],
  },
  "diabetes-test-terms": {
    indexDecision: "NOINDEX_FOLLOW",
    title: "혈당 검사 용어 한 장: 공복혈당·HbA1c의 시간 범위",
    description: "공복혈당과 HbA1c가 보는 시간 범위를 나누어 읽는 인쇄용 요약입니다. 검사 준비 지시나 정상 수치표가 아니며, 자세한 단위·해석 질문은 HbA1c 가이드로 연결합니다.",
    updatedAt: "2026-09-06",
    purpose: "검사 결과지의 이름을 찾을 때 옆에 둘 짧은 참고 자료입니다. HbA1c 해설의 내용을 요약한 것이며 검사 결과를 입력하거나 점수를 계산하지 않습니다.",
    steps: [
      "결과지에서 검사명·날짜·단위를 먼저 확인한 뒤 아래 시간 범위와 대조합니다.",
      "결과가 서로 다르거나 단위가 낯설면 원본을 가져가 의료진에게 묻습니다. 숫자를 임의로 환산하거나 한 결과를 지우지 않습니다.",
    ],
    example: "검사 이름을 확인했어도 그 결과가 본인의 진단이나 개인 목표를 뜻하는지는 별도로 설명받아야 합니다.",
    limitation: "이 요약으로 금식이나 약 중단을 새로 시작하지 않습니다. HbA1c 검사 자체에는 금식이 필요 없지만 같은 날 다른 검사가 있을 수 있으므로 실제 준비·복약은 검사기관의 안내를 확인합니다.",
    sourceIds: ["SRC-NIDDK-TESTS", "SRC-NIDDK-A1C"],
    links: [
      { href: "/health/guides/understanding-hba1c", label: "HbA1c·NGSP·IFCC와 공복혈당의 자세한 차이" },
      { href: "/health/guides/reading-health-results", label: "결과지의 단위·참고범위·날짜 읽는 순서" },
      { href: "/health/tools/diabetes-questions", label: "검사 의미와 개인 목표를 확인할 질문지" },
    ],
  },
  "family-support-checklist": {
    indexDecision: "NOINDEX_FOLLOW",
    title: "당뇨병 가족 지원 체크리스트: 동의한 도움과 개인 계획 확인",
    description: "당뇨병이 있는 가족에게 원하는 도움을 먼저 묻고, 동의한 진료 준비와 개인 대처 계획을 확인하는 인쇄용 체크리스트입니다. 가족의 관리 성적을 매기거나 음식·혈당을 감시하는 표가 아닙니다.",
    updatedAt: "2026-09-06",
    purpose: "평소 대화를 마친 뒤 서로 동의한 도움을 기억하기 위한 보조 양식입니다. 당뇨병 해설과 가족 복약 안내를 대신하지 않습니다. 체크하는 사람은 도움을 주는 가족이며, 당사자가 얼마나 잘 관리했는지 평가하는 표가 아닙니다.",
    steps: [
      "원하는 도움과 원하지 않는 도움을 먼저 묻습니다. 진료 동행이나 결과지 공유도 당사자의 동의를 확인하며, 이전에 동의했더라도 마음이 달라질 수 있습니다.",
      "합의한 도움 한 가지를 빈칸에 적고 실제로 확인한 항목만 표시합니다. 아직 이야기하지 않은 항목은 비워 두며 체크 개수를 점수로 합산하지 않습니다.",
      "약 사용이나 저혈당 대처가 불분명하면 의료진에게 질문할 내용으로 남깁니다. 이미 받은 개인 대처 계획은 따르고, 가족이 임의로 약이나 측정 계획을 정하지 않습니다.",
    ],
    example: "대화를 여는 예시: ‘다음 진료 때 질문지를 정리하는 도움이 필요해요?’ 동의한 도움만 적고 원하지 않는 도움을 설득하기 위한 증거로 이 종이를 사용하지 않습니다.",
    limitation: "체크 완료가 안전한 혈당이나 충분한 돌봄을 보장하지 않습니다. 이름·검사값·약 목록을 공개 게시판에 올리지 마세요. 위급한 변화가 생기면 대화나 체크를 마칠 때까지 기다리지 않습니다.",
    sheetNotice: "의식이 흐려지거나 반응이 없거나 경련·심한 호흡곤란이 있으면 즉시 119에 연락합니다. 의식이 없거나 안전하게 삼킬 수 없는 사람에게 음식·물·약을 억지로 먹이지 않습니다.",
    sourceIds: ["SRC-CDC-DIABETES-FAMILY", "SRC-NIDDK-MANAGING", "SRC-NHS-LOW-GLUCOSE", "SRC-CDC-DKA", "SRC-KDCA-CPR"],
    links: [
      { href: "/health/guides/family-medication-support", label: "약을 대신 결정하지 않고 복약을 돕는 범위" },
      { href: "/health/tools/diabetes-questions", label: "가족의 역할·저혈당 대처를 확인할 진료 질문" },
      { href: "/health/guides/appointment-questions", label: "동행 진료에서 질문과 답변을 정리하는 방법" },
    ],
  },
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
  if (!toolEditorial[tool.slug]?.inheritParentWarning && tool.kind !== "warning" && !["stroke", "acute-myocardial-infarction", "migraine", "depression"].includes(tool.articleSlug)) return undefined;
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
