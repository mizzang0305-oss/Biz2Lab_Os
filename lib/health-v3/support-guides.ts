import type { HealthSource } from "./content";

export type HealthSupportGuide = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  sourceCheckedAt?: string;
  sections: Array<{
    id?: string;
    title: string; paragraphs?: string[]; bullets?: string[]; tone?: "default" | "warning" | "note";
    sourceIds?: string[];
    table?: { caption: string; columns: string[]; rows: string[][] };
    links?: Array<{ href: string; label: string }>;
  }>;
  faqTitle?: string;
  faq?: Array<{ question: string; answer: string; sourceIds: string[] }>;
  sources: HealthSource[];
};

export const healthSupportGuides: HealthSupportGuide[] = [
  {
    slug: "danger-signals",
    title: "이런 위험 신호라면 글보다 119가 먼저입니다",
    seoTitle: "응급 위험 신호: 바로 119를 부를 때와 신고 후 전할 내용",
    description: "갑작스러운 마비·말 이상, 심근경색 의심 증상, 심한 호흡곤란·의식 변화에는 즉시 119에 연락합니다. 잠깐 호전돼도 미루지 않을 이유와 119 신고·109 상담의 차이를 확인하세요.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "도움을 요청하기 전 망설이게 되는 질문",
    sections: [
      { id: "urgent-action", title: "지금 나타났다면 즉시 119", paragraphs: ["아래 신호 중 하나라도 나타나면 글을 끝까지 읽거나 병명을 확정하려 하지 말고 즉시 119에 연락합니다. 모든 신호를 갖출 필요는 없습니다. 목록에 없다고 안전을 보장하는 안내도 아닙니다."],
        bullets: [
          "갑자기 한쪽 얼굴·팔·다리의 힘이나 감각이 달라짐, 말하거나 이해하기 어려움, 시야 이상, 어지럼, 걷기·균형의 어려움, 또는 원인을 알 수 없는 갑작스러운 심한 두통",
          "가슴이 조이거나 짓눌리는 통증·압박감, 팔·목·턱 등으로 퍼지는 가슴 통증, 또는 심근경색이 의심되는 불편 — 심한 통증만 기다리지 않음",
          "헐떡이거나 말을 내기 힘들 정도의 호흡곤란, 입술·피부가 창백하거나 푸르스름해짐, 또는 갑자기 반응이 떨어지거나 깨우기 어려움 — 쓰러졌는지와 무관하게 도움 요청",
        ], tone: "warning", sourceIds: ["SUP-KDCA-STROKE", "SUP-CDC-STROKE", "SUP-NHLBI-MI", "SUP-NHS-MI", "SUP-MEDLINEPLUS-EMERGENCY"] },
      { title: "잠깐 나아지거나 약하게 느껴져도 미루지 않습니다", paragraphs: [
        "갑작스러운 마비·말 이상 같은 뇌졸중 신호가 사라졌어도 집에서 안전하다고 판단하지 않습니다. 심근경색도 약하게 시작하거나 증상이 줄었다 다시 나타날 수 있습니다. 확신이 없다는 이유로, 또는 ‘몇 분 더 지켜보자’며 도움을 늦추지 마세요.",
        "직접 운전하거나 가족이 올 때까지 기다리지 않습니다. 혈압·맥박을 재거나 인터넷 증상표와 맞춰 보느라 신고를 미루지 않습니다. 이 글은 증상으로 병을 확정하는 검사가 아니라 도움 요청의 출발점입니다.",
      ], sourceIds: ["SUP-CDC-STROKE", "SUP-NHLBI-MI"], links: [
        { href: "/health/stroke", label: "평소에 알아둘 뇌졸중의 갑작스러운 신호" },
        { href: "/health/acute-myocardial-infarction", label: "심한 흉통만 기다리면 안 되는 이유" },
      ] },
      { title: "마음의 위기: 지금 구조가 필요한지 먼저", paragraphs: [
        "이미 자신을 해치는 행동이 있었거나 자신·다른 사람의 안전을 당장 지키기 어렵다면 즉시 119에 연락합니다. 본인이 위험하면 곁의 믿을 만한 사람에게 도움을 요청하세요. 돕는 사람도 자신의 안전을 확보하고, 안전하게 함께 있을 수 있다면 혼자 두지 말고 구조 안내를 따릅니다.",
        "자살 생각이나 관련 위기로 상담이 필요할 때는 24시간 자살예방 상담전화 109를 이용할 수 있습니다. 109 상담은 당장 필요한 응급 구조를 대신하지 않습니다. 상담 연결을 기다리느라 긴급 신고를 늦추지 않습니다.",
      ], tone: "warning", sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY", "SUP-MOHW-109"], links: [{ href: "/health/depression", label: "평소 우울 신호와 주변의 도움을 이해하기" }] },
      { title: "119에 먼저 전화한 뒤, 아는 사실을 전하세요", paragraphs: [
        "정리된 기록이 없어도 신고합니다. 통화 중 질문을 듣고 아는 범위에서 답하세요. 위치를 정확히 모르면 주변 건물 이름이나 표지처럼 찾을 수 있는 단서를 전합니다. 아래 표를 채우거나 주소·약 이름을 완벽히 알아낸 뒤 전화하라는 뜻이 아닙니다.",
      ], table: { caption: "신고 후 전달할 정보 — 사전 작성표가 아닙니다", columns: ["알려줄 내용", "전달하는 방법"], rows: [
        ["환자가 있는 곳", "주소·건물·주변 표지 등 현재 위치를 알 수 있는 정보"],
        ["지금 보이는 변화", "어디가 어떻게 불편한지, 반응·호흡이 평소와 다른지"],
        ["알고 있는 배경", "나이·주요 질환·복용약을 아는 범위에서; 모르면 모른다고 답하기"],
        ["연락과 변화", "요청받은 연락처, 통화 중 새로 생기거나 달라지는 상태"],
      ] }, sourceIds: ["SUP-NFA-119"] },
      { title: "기다리는 동안도 전화 안내를 따릅니다", paragraphs: [
        "소방청은 구급차가 오는 동안 통화를 유지하며 의료지도를 받도록 안내합니다. 반응이나 호흡이 달라지면 바로 알리세요. 이 페이지의 짧은 설명으로 응급처치 방법·자세·약을 스스로 정하지 않습니다.",
        "심근경색이 의심된다고 아스피린이나 다른 약을 찾고 효과를 보느라 신고를 늦추지 않습니다. 약을 쓸지와 어떻게 할지는 119·의료진의 상황별 안내를 받습니다. 평소 처방약이 모두 금지라는 뜻도 아닙니다.",
      ], sourceIds: ["SUP-NFA-119", "SUP-NHLBI-MI", "SUP-NHS-MI"] },
      { title: "이 목록 밖의 불편은 어떻게 하나요?", paragraphs: [
        "이 페이지는 성인의 대표적인 응급 신호를 다루며 모든 질환·상황을 나열하지 않습니다. 멈추지 않는 출혈이나 갑작스러운 심한 통증 등 다른 응급상황도 있습니다. 당장 위급하다고 느끼거나 안전이 걱정되면 119에 현재 상황을 설명합니다.",
        "새로 숨이 차거나 평소보다 갑자기 더 숨이 찬 경우에는 위의 심각한 모습이 아니어도 신속히 의료기관에 연락해 평가받습니다. 심한 호흡곤란이나 다른 응급 신호가 있으면 119가 먼저입니다.",
        "급한 상황이 아니더라도 새로 생긴 불편이 계속되거나 일상에 영향을 주면 의료기관에 문의해 진료 시점과 악화 시 행동을 확인하세요. 예약일이 있다고 새 위험 신호를 그때까지 기다리는 것은 아닙니다. 어린이·임신 중·큰 사고 상황의 세부 판단은 이 성인 요약으로 대신하지 않습니다.",
      ], sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY", "SUP-NFA-119", "SUP-NHS-MI"], links: [
        { href: "/health/guides/symptom-journal", label: "급하지 않은 때 진료에 가져갈 증상 기록" },
        { href: "/health/guides/appointment-questions", label: "진료 시점·악화 시 행동을 확인할 질문" },
      ] },
    ],
    faq: [
      { question: "한 가지 증상만 있어도 119에 연락하나요?", answer: "위의 응급 신호를 모두 갖출 필요는 없습니다. 특히 갑작스러운 마비·말 이상·시야·어지럼·균형 변화 등은 각각 도움을 요청할 신호입니다. 증상 수를 세며 기다리지 않습니다.", sourceIds: ["SUP-CDC-STROKE", "SUP-KDCA-STROKE"] },
      { question: "지금은 괜찮아졌는데 지켜봐도 되나요?", answer: "갑작스러운 뇌졸중 신호나 심근경색 의심 증상이 잠깐 줄었다는 이유로 안전을 정하지 않습니다. 증상이 있었다는 사실을 119에 알리고 안내를 받습니다.", sourceIds: ["SUP-CDC-STROKE", "SUP-NHLBI-MI"] },
      { question: "109에 먼저 상담하면 119를 안 불러도 되나요?", answer: "당장 자신이나 다른 사람의 안전을 지키기 어렵거나 이미 자신을 해치는 행동이 있었다면 즉시 119가 우선입니다. 109는 24시간 자살예방 상담이며 긴급 구조를 기다리게 하는 선행 절차가 아닙니다.", sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY", "SUP-MOHW-109"] },
      { question: "정확한 주소나 약 이름을 몰라도 신고할 수 있나요?", answer: "먼저 신고하고 주변 건물·표지, 현재 보이는 변화와 아는 정보를 전합니다. 모르는 내용은 모른다고 답하고 전화 안내를 따릅니다. 기록을 완성하느라 신고를 늦추지 않습니다.", sourceIds: ["SUP-NFA-119"] },
      { question: "목록에 없으면 응급상황이 아닌가요?", answer: "아닙니다. 대표 신호만 다룬 요약이며 목록에 없다고 안전을 보장하지 않습니다. 위급함이나 현재 안전이 걱정되면 119에 상황을 설명하고, 다른 지속적인 불편도 진료 시점을 문의하세요.", sourceIds: ["SUP-MEDLINEPLUS-EMERGENCY"] },
    ],
    sources: [
      { id: "SUP-KDCA-STROKE", organization: "질병관리청 국가건강정보포털", title: "뇌졸중", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5495", sourceDate: "2026-04-29 (업데이트)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHLBI-MI", organization: "NIH/NHLBI", title: "Heart Attack Symptoms", url: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms", sourceDate: "2022-03-24 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-MOHW-109", organization: "보건복지부", title: "자살예방 정책 추진 — 24시간 상담전화109", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "페이지 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-CDC-STROKE", organization: "CDC", title: "Signs and Symptoms of Stroke", url: "https://www.cdc.gov/stroke/signs-symptoms/index.html", sourceDate: "2026-05-19 (페이지 표시일)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHS-MI", organization: "NHS", title: "Heart attack", url: "https://www.nhs.uk/conditions/heart-attack/", sourceDate: "2026-03-31 (Page last reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-NFA-119", organization: "소방청", title: "119 구급신고 요령", url: "https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/", sourceDate: "페이지 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-MEDLINEPLUS-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date; 참고문헌접근일과 구분)", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "measuring-blood-pressure",
    title: "집에서 혈압 재는 방법, 준비부터 기록까지",
    seoTitle: "가정혈압 측정 방법: 커프·자세·반복 측정과 기록",
    description: "맨팔에 맞는 위팔 커프, 안정 시간, 등·팔·발의 자세와 반복 측정 기록을 확인합니다. 진단 숫자를 고르는 대신 의료진에게 비교 가능한 결과와 측정 조건을 가져가는 방법입니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "집에서 잴 때 자주 막히는 부분",
    sections: [
      { id: "urgent-action", title: "응급 신호가 있다면 재측정보다 119", paragraphs: ["가슴 압박·불편 등으로 심근경색이 의심되거나, 심한 호흡곤란이 생기거나, 갑자기 한쪽 얼굴·팔·다리의 힘이나 감각이 달라지거나, 갑작스러운 말·시야 이상, 어지럼, 걷기·균형의 어려움이 생기면 혈압을 다시 재며 기다리지 말고 즉시 119에 연락합니다. 수치가 괜찮아 보인다는 이유로 도움을 미루지 않습니다."], tone: "warning", sourceIds: ["SUP-BP-NHLBI-MI", "SUP-BP-CDC-STROKE", "SUP-BP-NHS-MI"], links: [{ href: "/health/guides/danger-signals", label: "측정·기록보다 도움 요청이 먼저인 다른 위험 신호" }] },
      { title: "기기보다 먼저, 내 팔에 맞는 커프인지", paragraphs: [
        "가정에서는 검증된 자동 위팔 커프형 혈압계를 사용하는 것이 권장됩니다. 커프는 팔에 감아 공기를 넣는 띠입니다. 팔 둘레에 맞지 않으면 결과가 부정확해질 수 있으므로 제품의 적용 크기를 확인합니다.",
        "이미 가진 기기를 진료에 가져가 커프가 맞는지와 사용법을 확인받으세요. 임신 중이거나 어린이가 사용하는 경우에는 해당 대상에서 검증된 기기인지도 확인합니다. 이 페이지는 특정 제품을 추천하거나 기기 정확도를 인증하지 않습니다.",
      ], sourceIds: ["SUP-AHA-BP", "SUP-NHS-BP"], links: [{ href: "/health/tools/blood-pressure-prep", label: "기기와 함께 확인할 가정혈압 측정 준비표" }] },
      { title: "앉아서 준비할 때와 측정 중 자세", paragraphs: [
        "미국심장협회(AHA)·CDC의 준비 안내를 바탕으로, 측정 전 30분 동안은 흡연·카페인 음료·운동을 피하고 방광을 비운 뒤 최소 5분 조용히 쉽니다. 재는 동안 말하거나 휴대전화를 사용하지 않습니다. 이는 일상 측정을 위한 준비이지 응급 신호가 있을 때 기다릴 시간은 아닙니다.",
      ], table: { caption: "버튼을 누르기 전 네 곳 확인 — 진단 기준표가 아닙니다", columns: ["확인할 곳", "맞출 조건"], rows: [
        ["등", "등받이에 기대어 지지받기"],
        ["발과 다리", "두 발을 바닥에 두고 다리를 꼬지 않기"],
        ["팔", "탁자 등에 받쳐 커프가 심장 높이에 오도록 하기"],
        ["커프와 옷", "옷 위가 아닌 맨팔에, 기기 설명서의 위치와 맞는 크기로 감기"],
      ] }, sourceIds: ["SUP-AHA-BP", "SUP-CDC-BP"] },
      { title: "한 번 잰 뒤에는 결과를 남기고 간격을 둡니다", paragraphs: [
        "AHA는 한 번 앉아 잴 때 1분 간격으로 두 번 측정하고 두 결과를 모두 기록하도록 안내합니다. CDC는 1~2분 간격을 제시합니다. 의료진이 정해 준 간격·횟수·측정 팔이 있다면 그 계획과 기기 설명서를 따릅니다.",
        "매일 비슷한 시각과 조건에서 기록하되 하루 중 언제, 며칠 동안 잴지는 의료진과 정합니다. 아침·저녁 측정을 안내받을 수 있지만 모두에게 같은 일수나 복약 전후 순서를 일괄 적용하지 않습니다. 원하는 숫자가 나올 때까지 계속 재서 낮은 값만 남기지 마세요.",
      ], sourceIds: ["SUP-AHA-BP", "SUP-CDC-BP", "SUP-NHS-BP"] },
      { title: "숫자 옆에 조건을 남겨야 비교할 수 있습니다", paragraphs: [
        "날짜·시각과 두 번의 측정값을 기기 표시 그대로 옮깁니다. 첫 숫자(수축기)와 두 번째 숫자(이완기), 단위 mmHg를 구분하고 맥박 표시를 혈압값으로 바꾸어 적지 않습니다.",
        "기록 예시는 ‘날짜/시각 → 첫 측정 → 두 번째 측정 → 당시 불편·평소와 달랐던 점’입니다. 실제 환자 수치나 정상 판정은 넣지 않았습니다. 방금 움직였거나 재는 동안 말한 일처럼 조건이 달랐다면 그 사실을 메모합니다.",
      ], bullets: ["기기에 저장된 기록이나 원본 기록표를 진료에 가져갑니다.", "기기 오류 표시나 값 차이가 반복되면 커프·사용법·기기를 함께 확인받습니다."], sourceIds: ["SUP-AHA-BP", "SUP-CDC-BP", "SUP-NHS-BP"], links: [{ href: "/health/tools/blood-pressure-log", label: "측정값과 상황을 함께 적을 혈압 기록표" }] },
      { title: "집과 병원 수치가 다를 때는 기록으로 질문하세요", paragraphs: [
        "긴장이나 측정 전 활동·자세가 결과에 영향을 줄 수 있습니다. 한 번의 높은 값만으로 고혈압을 확정하거나 한 번 낮게 나왔다고 문제가 없다고 단정하지 않습니다. 두 장소의 기록과 측정 방법을 함께 보여 주고 차이를 어떻게 확인할지 물어보세요.",
        "가정 측정은 진료를 돕는 자료이지 정기 진료의 대체가 아닙니다. 결과가 걱정되면 의료진에게 연락해 확인 계획을 정하고, 약을 스스로 중단하거나 늘리지 않습니다. 어떤 값·증상에서 바로 연락해야 하는지도 개인 계획으로 받아 두세요.",
      ], sourceIds: ["SUP-AHA-BP", "SUP-CDC-BP"], links: [
        { href: "/health/hypertension", label: "백의·가면 고혈압과 진단 과정을 이해하기" },
        { href: "/health/tools/blood-pressure-questions", label: "기록 차이와 다음 측정 계획을 물을 진료 질문지" },
      ] },
    ],
    faq: [
      { question: "옷 위에 커프를 감아도 되나요?", answer: "맨팔에 감습니다. 커프가 팔 둘레에 맞는지와 감는 위치도 기기 설명서에 따라 확인하세요. 얇은 옷이라는 이유로 같은 조건이라고 가정하지 않습니다.", sourceIds: ["SUP-AHA-BP", "SUP-CDC-BP"] },
      { question: "커피를 마시거나 운동한 직후 재면 되나요?", answer: "일상적인 측정은 카페인·흡연·운동을 피할 준비 시간 30분과 조용히 쉬는 시간 최소 5분을 둡니다. 다만 응급 신호가 있으면 이 시간을 채우지 말고 즉시 도움을 요청합니다.", sourceIds: ["SUP-AHA-BP", "SUP-BP-NHLBI-MI", "SUP-BP-CDC-STROKE"] },
      { question: "두 번의 값이 다르면 낮은 것만 적나요?", answer: "두 결과를 모두 기록합니다. 낮은 값을 골라 남기기보다 시각과 측정 조건을 함께 보여 주세요. 차이가 걱정되면 기기·커프·측정법과 기록을 의료진에게 확인받습니다.", sourceIds: ["SUP-AHA-BP", "SUP-CDC-BP"] },
      { question: "아침·저녁으로 며칠이나 재야 하나요?", answer: "측정 목적과 상황에 따라 의료진이 일정을 정합니다. 한 번 앉아 재는 횟수와 하루 측정 시각, 전체 기록 일수는 서로 다른 항목입니다. 약 먹는 시각까지 임의로 바꾸지 말고 안내받은 계획을 확인하세요.", sourceIds: ["SUP-NHS-BP", "SUP-AHA-BP"] },
      { question: "집에서 낮게 나오면 혈압약을 쉬어도 되나요?", answer: "기록만 보고 스스로 약을 쉬거나 조절하지 않습니다. 가정 측정 결과와 불편을 의료진에게 알리고 계획을 확인하세요. 가정 측정은 진료를 대신하지 않습니다.", sourceIds: ["SUP-AHA-BP"] },
    ],
    sources: [
      { id: "SUP-AHA-BP", organization: "American Heart Association", title: "Home Blood Pressure Monitoring", url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home", sourceDate: "2025-08-14 (Last Reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-CDC-BP", organization: "CDC", title: "Measuring Your Blood Pressure", url: "https://www.cdc.gov/high-blood-pressure/measure/index.html", sourceDate: "2026-09-04 (Updated; Reviewed2024-12-13)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHS-BP", organization: "NHS", title: "Blood pressure test", url: "https://www.nhs.uk/tests-and-treatments/blood-pressure-test/", sourceDate: "2025-11-25 (Page last reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-BP-NHLBI-MI", organization: "NIH/NHLBI", title: "Heart Attack Symptoms", url: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms", sourceDate: "2022-03-24 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-BP-CDC-STROKE", organization: "CDC", title: "Signs and Symptoms of Stroke", url: "https://www.cdc.gov/stroke/signs-symptoms/index.html", sourceDate: "2026-05-19 (페이지 표시일)", retrievedAt: "2026-09-06" },
      { id: "SUP-BP-NHS-MI", organization: "NHS", title: "Heart attack", url: "https://www.nhs.uk/conditions/heart-attack/", sourceDate: "2026-03-31 (Page last reviewed)", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "understanding-hba1c",
    title: "당화혈색소(HbA1c), 검사표의 NGSP·IFCC부터 읽기",
    seoTitle: "당화혈색소 HbA1c 뜻: NGSP·IFCC와 공복혈당 차이",
    description: "HbA1c가 보여 주는 기간, NGSP·IFCC 단위와 공복혈당의 차이를 비교합니다. 결과표에서 확인할 항목과 수치가 엇갈릴 때 의료진에게 물을 질문을 정리했습니다.",
    publishedAt: "2026-08-26",
    updatedAt: "2026-09-06",
    sourceCheckedAt: "2026-09-06",
    sections: [
      {
        title: "HbA1c는 오늘 혈당의 다른 이름이 아닙니다",
        paragraphs: ["당화혈색소는 적혈구 속 혈색소에 포도당이 붙은 형태를 말합니다. HbA1c 검사는 대략 지난 3개월의 평균적인 혈당 상태를 이해하는 데 쓰입니다. 한 시점에 잰 혈당과는 보는 기간이 다릅니다.", "검사표에 낯선 약자가 보이면 숫자의 크기부터 비교하지 말고 검사명과 단위를 먼저 찾으세요."],
        sourceIds: ["SUP-AMC-A1C", "SUP-NIDDK-A1C"],
      },
      {
        title: "NGSP·IFCC: 같은 HbA1c라도 보고 단위가 다릅니다",
        paragraphs: ["NGSP와 IFCC는 HbA1c 측정·보고를 표준화하는 체계와 관련된 이름입니다. NGSP는 병명이나 위험 등급이 아닙니다. 검사표에 NGSP와 IFCC가 함께 있어도 두 숫자를 같은 척도로 비교하면 안 됩니다."],
        table: {
          caption: "검사표의 이름·단위·시간 범위 비교 — 진단 기준표가 아닙니다",
          columns: ["검사표 표기", "단위", "무엇을 구분하나요"],
          rows: [
            ["HbA1c (NGSP)", "%", "최근 수개월의 평균적인 혈당 상태를 반영하는 당화혈색소 보고값"],
            ["HbA1c (IFCC)", "mmol/mol", "HbA1c의 다른 보고 체계. NGSP %와 숫자를 그대로 비교하지 않음"],
            ["공복혈당", "mg/dL 또는 mmol/L", "금식 후 채혈한 한 시점의 혈당. mmol/mol인 IFCC와도 단위가 다름"],
          ],
        },
        sourceIds: ["SUP-NGSP-IFCC", "SUP-NIDDK-A1C"],
      },
      {
        title: "결과표에서는 이 순서로 표시해 두세요",
        paragraphs: ["예시: ‘검사명 HbA1c(NGSP) → 단위 % → 검사 날짜 → 이전 같은 표기의 결과 → 의료진 설명’. 실제 환자의 검사표가 아닌 읽는 순서 예시이며, 정상·위험을 가르는 수치는 넣지 않았습니다."],
        bullets: ["HbA1c인지 공복혈당인지 검사 이름에 표시합니다.", "숫자 옆 단위를 그대로 적습니다. 모르는 약자는 추측해서 바꾸지 않습니다.", "검사 날짜가 다른 결과는 날짜까지 함께 가져갑니다.", "검사실의 참고범위와 의료진이 정한 개인 목표를 같은 말로 취급하지 않습니다."],
        links: [{ href: "/health/guides/reading-health-results", label: "검사명·참고범위·추적 계획을 결과지에서 찾는 법" }],
        sourceIds: ["SUP-NGSP-IFCC", "SUP-NIDDK-A1C"],
      },
      {
        title: "공복혈당과 맞지 않아 보일 때",
        paragraphs: ["두 검사는 서로 다른 정보를 줍니다. 결과가 엇갈린다고 어느 한쪽을 곧바로 틀렸다고 판단하지 마세요. 의료진이 검사 시점과 건강 상태를 함께 확인하고 필요한 재검을 정합니다.", "적혈구 상태나 검사 방법 때문에 HbA1c 해석이 달라질 수도 있습니다. 빈혈의 종류, 최근 출혈·수혈, 임신, 콩팥 질환 등을 진료 때 알려 주세요. 모든 빈혈이 결과를 같은 방향으로 바꾸는 것은 아닙니다."],
        tone: "note", sourceIds: ["SUP-NIDDK-A1C", "SUP-NGSP-FACTORS"],
      },
      {
        title: "검사 원본과 함께 가져갈 세 가지 질문",
        bullets: ["‘이 표기와 단위가 이전 검사와 같은가요?’ — 두 결과표를 함께 보여 주세요.", "‘제 혈당과 HbA1c의 차이를 설명할 상황이 있나요?’ — 검사 날짜와 최근 건강 변화를 적어 갑니다.", "‘확인 검사가 필요하다면 무엇을 언제 하나요?’ — 다음 일정과 문의할 곳을 메모합니다."],
        links: [
          { href: "/health/tools/diabetes-questions", label: "제2형 당뇨병 진료 질문지 인쇄하기" },
          { href: "/health/type-2-diabetes", label: "제2형 당뇨병의 증상·검사·기록을 함께 이해하기" },
        ],
      },
      {
        title: "이 페이지가 정하지 않는 것",
        paragraphs: ["검사표 하나로 스스로 당뇨병을 확정하거나 약·인슐린을 시작, 중단, 증량하지 않습니다. 개인 목표와 재검 시점은 담당 의료진에게 확인합니다. 다른 사람의 결과나 목표를 그대로 적용하지 마세요."],
        links: [{ href: "/health/guides/danger-signals", label: "온라인 설명보다 도움 요청이 먼저인 위험 신호" }],
        sourceIds: ["SUP-NIDDK-A1C"],
      },
    ],
    faq: [
      { question: "HbA1c NGSP라고 쓰여 있으면 별도의 질환인가요?", answer: "아닙니다. NGSP는 HbA1c 결과를 비교할 수 있도록 표준화하는 체계와 관련된 표기입니다. 병명이나 중증도 등급을 뜻하지 않습니다.", sourceIds: ["SUP-NGSP-IFCC"] },
      { question: "%와 mmol/mol 중 어느 숫자가 더 정확한가요?", answer: "숫자가 작거나 크다는 이유로 정확도를 고를 수 없습니다. 서로 다른 보고 체계이므로 원래 단위와 검사 방법을 확인해야 합니다. 단위를 지우고 결과만 비교하지 마세요.", sourceIds: ["SUP-NGSP-IFCC"] },
      { question: "HbA1c 검사 전에 꼭 굶어야 하나요?", answer: "HbA1c 검사 자체는 일반적으로 금식이 필요하지 않습니다. 다만 같은 날 공복혈당 등 다른 검사를 함께 할 수 있으므로 검사기관의 준비 안내를 확인하세요.", sourceIds: ["SUP-NIDDK-A1C"] },
      { question: "공복혈당과 HbA1c가 다르면 어느 결과를 믿어야 하나요?", answer: "한 시점의 혈당과 최근 수개월을 반영하는 HbA1c를 먼저 구분합니다. 결과가 맞지 않아 보이면 검사 날짜·원본과 건강 변화를 가져가 재검 필요성을 물어보세요.", sourceIds: ["SUP-NIDDK-A1C", "SUP-NGSP-FACTORS"] },
      { question: "HbA1c 하나만으로 제가 당뇨병인지 알 수 있나요?", answer: "HbA1c는 의료진이 진단에 사용하는 검사 중 하나지만 이 페이지가 개인 진단을 내리지는 않습니다. 증상과 검사 조건에 따라 확인 검사가 필요할 수 있습니다.", sourceIds: ["SUP-NIDDK-A1C"] },
    ],
    sources: [
      { id: "SUP-NIDDK-A1C", organization: "NIH/NIDDK", title: "The A1C Test & Diabetes", url: "https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test", sourceDate: "2018-04", retrievedAt: "2026-09-06" },
      { id: "SUP-NGSP-IFCC", organization: "NGSP", title: "IFCC Standardization: The IFCC and NGSP", url: "https://ngsp.org/ifccngsp.asp", sourceDate: "날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-NGSP-FACTORS", organization: "NGSP", title: "Factors that Interfere with HbA1c Test Results", url: "https://ngsp.org/factors.asp", sourceDate: "2026-06-23", retrievedAt: "2026-09-06" },
      { id: "SUP-AMC-A1C", organization: "서울아산병원 당뇨병센터", title: "혈당 검사 중 당화 혈색소(HbA1c)는 무엇인가요?", url: "https://www.amc.seoul.kr/asan/depts/dm/K/bbsDetail.do?contentId=271421&menuId=5110", sourceDate: "날짜 미표시", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "reading-health-results",
    title: "건강검진 결과지, 숫자와 표시를 읽는 순서",
    seoTitle: "건강검진 결과지 읽는 법: 참고범위·양성·재검 질문",
    description: "빨간 숫자나 양성 표시만으로 병을 확정하지 않습니다. 혈액·소변 검사 결과에서 비교할 항목과 참고범위의 한계, 다시 검사하거나 진료받을 때 물을 질문을 정리합니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "결과 표시를 보고 생기는 질문",
    sections: [
      { title: "빨간 숫자를 읽기 전, 어떤 검사인지", paragraphs: [
        "결과지의 색이나 화살표부터 병명으로 바꾸지 마세요. 먼저 검사명, 검사한 날짜, 결과와 단위, 그 검사실의 참고범위를 한 줄씩 함께 봅니다. 이 안내는 건강검진 중 혈액·소변 같은 검사실 검사 결과를 읽는 출발점입니다. 영상검사 소견이나 국가건강검진의 모든 종합 판정 등급을 해설하는 표는 아닙니다.",
        "검사는 증상의 원인을 찾거나, 위험을 살피거나, 치료 중 변화를 확인하는 등 목적이 다릅니다. ‘이 검사는 제 경우 무엇을 확인하려고 했나요?’부터 물으면 같은 숫자를 어떻게 설명받아야 할지 길이 잡힙니다. 검사값만으로 몸 전체의 상태를 확정하지 않습니다.",
      ], sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-NHS-BLOOD-TESTS"], links: [{ href: "/health/guides/understanding-hba1c", label: "HbA1c·당화혈색소와 혈당의 이름·단위를 구분하기" }] },
      { title: "표시를 다음 질문으로 바꾸는 표", paragraphs: [
        "참고범위는 비교에 사용하는 값의 범위입니다. 건강한 사람들의 검사 결과 등을 바탕으로 만들며 나이·집단·검사법 등에 따라 달라질 수 있습니다. 내 결과지의 범위를 확인하고, 인터넷에서 찾은 다른 검사실의 숫자를 그대로 대입하지 않습니다.",
        "범위 안이라고 질환이 전혀 없다는 보장은 없고, 범위를 벗어났다고 곧바로 질환이 확정되는 것도 아닙니다. 증상, 병력과 다른 검사 결과를 함께 해석합니다. 치료 중이라면 ‘제게 따로 정해진 치료 목표가 있나요?’라고 묻고 목표 숫자를 임의로 정하지 않습니다.",
      ], table: { caption: "결과를 확정 짓는 표가 아니라, 설명을 요청하는 질문표", columns: ["결과지에서 본 표시", "진료 때 확인할 질문"], rows: [
        ["참고범위 밖·색 표시·화살표", "이 변화가 제 상황에서 어떤 의미인가요? 다른 결과와 함께 볼 항목은 무엇인가요?"],
        ["참고범위 안인데 불편이 계속됨", "이 검사로 확인하지 못하는 원인이 있나요? 증상에 대해 더 살필 필요가 있나요?"],
        ["양성 또는 음성", "이 검사는 무엇을 찾는 검사인가요? 이 표시만으로 알 수 있는 것과 없는 것은 무엇인가요?"],
        ["판정이 불확실하다는 결과 또는 재검·추가 확인 안내", "무엇을 다시 확인하나요? 어떤 준비를 하고 언제·어디에서 확인하나요?"],
      ] }, sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-NHS-BLOOD-TESTS"], links: [{ href: "/health/dyslipidemia", label: "콜레스테롤 결과는 개인 위험과 함께 보는 이유" }] },
      { title: "양성·음성·판정 불확실은 무엇이 다른가요?", paragraphs: [
        "양성은 보통 검사에서 찾던 물질이나 표지 등이 확인됐다는 뜻이고, 음성은 확인되지 않았다는 뜻입니다. 하지만 무엇을 찾는 검사인지에 따라 의미가 달라집니다. ‘양성은 무조건 나쁜 결과, 음성은 모든 질환이 없다는 뜻’으로 번역하지 않습니다.",
        "검사에도 한계가 있습니다. 검사 결과가 질환이나 상태가 있다고 가리키지만 실제로는 없는 경우를 위양성, 없다고 가리키지만 실제로는 있는 경우를 위음성이라고 합니다. 판정 불확실은 명확히 결론 내리기 어려운 결과입니다. 이런 한계와 검사 목적에 따라 재검이나 다른 검사가 필요할 수 있지만, 모든 양성·음성에 재검이 반드시 필요한 것은 아닙니다.",
        "의료진에게 ‘지금 결과로 어느 정도까지 판단할 수 있나요? 추가 확인이 필요하다면 이유가 무엇인가요?’라고 묻습니다. 이 페이지는 특정 검사로 질환을 확정하거나 검사 정확도를 계산하지 않습니다.",
      ], sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-NHS-BLOOD-TESTS"] },
      { title: "이전 결과와 비교할 때 빠뜨리기 쉬운 조건", paragraphs: [
        "검사 이름이 비슷해도 단위·검사 방법·참고범위가 다르면 숫자만 나란히 놓고 좋아졌다거나 나빠졌다고 단정하기 어렵습니다. 이전 결과지를 함께 가져가 날짜와 검사 기관을 알려 주세요. 검사실마다 방법이 다를 수 있으므로 같은 검사실에서 이어서 확인할지 의료진과 상의합니다.",
        "금식이나 다른 준비가 필요한지는 검사마다 다릅니다. 결과가 걱정된다고 다음 검사 전에 임의로 굶거나 약을 끊지 않습니다. 처방약·일반약·비타민·보충제를 알리고, 검사기관의 준비 안내를 확인하세요. 안내를 지키지 못했다면 숨기지 말고 무엇이 달랐는지 알립니다.",
        "적어 갈 메모는 ‘검사 날짜 / 전과 다른 준비 조건 / 당시 불편 / 함께 복용한 것 / 묻고 싶은 점’ 정도면 됩니다. 모든 과거 기록을 찾아야 상담받을 수 있다는 뜻은 아닙니다. 모르는 부분은 추측 대신 ‘확인 필요’라고 남깁니다.",
      ], sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-MEDLINEPLUS-LAB-PREP"], links: [{ href: "/health/guides/medication-list", label: "검사 전 알릴 약·비타민·보충제 목록 정리" }] },
      { title: "결과지를 덮기 전, 다음 연락과 날짜를 확인하세요", paragraphs: [
        "다음 행동은 숫자의 색이 아니라 검사 목적과 의료진의 설명에 맞춰 정합니다. 결과지에 재검·진료·추적 안내가 있다면 ‘누구에게, 언제까지, 무엇을 준비해 연락하나요?’를 확인하세요. 시점이 없거나 설명을 이해하기 어려우면 검사를 시행한 기관에 문의합니다.",
        "모든 검사에 같은 재검 간격을 적용하지 않습니다. 결과를 언제 어떤 방법으로 설명받는지, 연락이 오지 않으면 어디로 문의하는지도 물어 두세요. 서울아산병원 건강증진센터는 결과 전달과 상담을 별도로 안내하는 국내 사례이며, 구체적인 연락 방식과 일정은 본인이 검사한 기관에서 확인해야 합니다.",
        "상담 후에는 ‘지금 할 일 / 다음 확인 날짜 / 그 전에 변화가 생기면 연락할 곳’을 본인 말로 다시 확인합니다. 검사표를 읽는 일과 증상 때문에 도움을 요청하는 일은 별개입니다. 결과가 괜찮아 보인다는 이유로 현재의 불편을 설명하지 않고 넘기지 마세요.",
      ], sourceIds: ["SUP-NHS-BLOOD-TESTS", "SUP-MEDLINEPLUS-LAB", "SUP-AMC-RESULT-CONSULT"], links: [
        { href: "/health/guides/appointment-questions", label: "다음 진료·검사·악화 시 행동을 묻는 질문" },
        { href: "/health/guides/danger-signals", label: "검사표 해석보다 도움 요청이 먼저인 위험 신호" },
      ] },
    ],
    faq: [
      { question: "빨간 숫자가 하나 있으면 병이 있다는 뜻인가요?", answer: "그 표시 하나로 병을 확정할 수 없습니다. 해당 검사의 단위·참고범위와 함께 증상·병력·다른 검사 결과를 해석해야 합니다. ‘괜찮겠지’ 하고 무시하는 대신 그 변화의 의미와 다음 확인이 필요한지 물어보세요.", sourceIds: ["SUP-MEDLINEPLUS-LAB"] },
      { question: "모두 참고범위 안이면 증상도 걱정하지 않아도 되나요?", answer: "검사값이 범위 안이어도 질환이 없다고 보장하지 않습니다. 불편이 계속된다면 그 증상과 검사 목적을 의료진에게 알립니다. 검사가 확인할 수 있는 범위와 추가 평가 필요성을 함께 설명받으세요.", sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-NHS-BLOOD-TESTS"] },
      { question: "양성이면 재검 없이 치료부터 시작해야 하나요?", answer: "어떤 검사인지와 현재 상황에 따라 판단이 달라집니다. 양성 표시만 보고 약을 시작하거나 멈추지 말고, 결과가 의미하는 것과 추가 확인 또는 치료가 필요한지 의료진에게 설명받습니다.", sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-NHS-BLOOD-TESTS"] },
      { question: "지난해보다 숫자가 높아졌는데 바로 나빠진 건가요?", answer: "검사명·단위·방법·참고범위와 검사 전 조건을 함께 비교해야 합니다. 두 결과지를 가져가 이번 변화가 의미 있는지 물어보세요. 숫자가 올랐다는 사실만으로 질환의 악화를 확정하지 않습니다.", sourceIds: ["SUP-MEDLINEPLUS-LAB", "SUP-MEDLINEPLUS-LAB-PREP"] },
      { question: "재검을 잘 받으려면 약을 쉬고 오래 금식하면 되나요?", answer: "아닙니다. 필요한 준비는 검사별로 확인하고, 의료진의 지시 없이 약을 중단하지 않습니다. 임의로 더 오래 금식하는 것이 아니라 안내받은 조건을 따릅니다. 준비가 달랐다면 검사기관에 알리세요.", sourceIds: ["SUP-MEDLINEPLUS-LAB-PREP"] },
    ],
    sources: [
      { id: "SUP-MEDLINEPLUS-LAB", organization: "NIH/NLM MedlinePlus", title: "How to Understand Your Lab Results", url: "https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/", sourceDate: "2025-09-04 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-MEDLINEPLUS-LAB-PREP", organization: "NIH/NLM MedlinePlus", title: "How to Prepare for a Lab Test", url: "https://medlineplus.gov/lab-tests/how-to-prepare-for-a-lab-test/", sourceDate: "2024-08-20 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHS-BLOOD-TESTS", organization: "NHS", title: "Blood tests", url: "https://www.nhs.uk/tests-and-treatments/blood-tests/", sourceDate: "2023-11-02 (Page last reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-AMC-RESULT-CONSULT", organization: "서울아산병원 건강증진센터", title: "건강검진 유의사항 — 결과상담", url: "https://health.amc.seoul.kr/health/personal/reference.do", sourceDate: "페이지 자체 날짜 미표시", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "family-medication-support",
    title: "가족의 약 챙기기, 대신 결정하지 않고 돕는 법",
    seoTitle: "가족 복약 관리 돕는 법: 약 혼동·잊음·삼킴 어려움",
    description: "당사자가 원하는 도움부터 확인합니다. 약을 헷갈리거나 잊을 때, 삼키기 어렵거나 복용을 거부할 때의 질문과 가족 간 전달 방법을 정리합니다. 용량·복용법은 임의로 바꾸지 않습니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "약을 챙기는 가족이 자주 묻는 질문",
    sections: [
      { title: "‘어디까지 도와드릴까요?’부터 묻습니다", paragraphs: [
        "가족이 약을 챙긴다는 이유로 모든 건강정보를 보거나 복용을 대신 결정할 수 있는 것은 아닙니다. 당사자가 어떤 정보를 공유하고 얼마만큼 도움받고 싶은지 먼저 확인합니다. 혼자 할 수 있는 일은 존중하고, 어려운 일을 함께 찾는 것이 출발점입니다.",
        "‘시간을 알려 드릴까요?’, ‘약사에게 함께 물어볼까요?’처럼 선택할 수 있게 묻습니다. 허락 없이 음료·음식에 약을 숨기거나 억지로 먹이지 않습니다. 복용을 원하지 않는 이유가 걱정, 불편, 삼킴 어려움 중 무엇인지 듣고 의료진·약사와 상의하세요. 이 글은 성인 가족의 일상 지원 안내이며 치료 동의나 의사결정 능력을 대신 판정하지 않습니다.",
      ], sourceIds: ["SUP-NHS-MED-CARERS"], links: [{ href: "/health/tools/family-support-checklist", label: "당사자가 원하는 도움을 함께 확인할 가족 지원표" }] },
      { title: "먹으라고 재촉하기 전, 어떤 어려움인지 나눕니다", paragraphs: [
        "‘약을 잘 안 먹는다’는 말만으로는 도움이 필요한 지점이 보이지 않습니다. 아래 상황처럼 실제 어려움을 구분해 의료진·약사에게 전하세요. 표는 복용법을 바꾸는 지시가 아니라 질문을 준비하는 자료입니다.",
      ], table: { caption: "가족이 관찰할 어려움과 의료진·약사에게 물을 내용", columns: ["겪는 어려움", "함께 확인할 사실", "문의할 질문"], rows: [
        ["약 이름·봉투가 헷갈림", "현재 처방·실제 용기·안내문을 함께 보기; 색·모양으로 약을 단정하지 않기", "구별하기 쉬운 표기나 큰 글씨 안내를 받을 수 있나요?"],
        ["시간을 자꾸 놓침", "어느 시간·상황에서 어려운지 듣기; 먹었는지 불확실하면 추측하지 않기", "이 약을 놓쳤을 때 어떻게 하나요? 알림이나 복약 일정 조정이 가능한가요?"],
        ["알약을 삼키기 어려움", "무엇을 삼키기 힘든지 알리기; 임의로 쪼개거나 갈지 않기", "이 약을 더 안전하게 복용할 다른 형태나 방법이 있나요?"],
        ["먹고 싶지 않다고 말함", "이유를 먼저 듣고 동의 없이 투약하지 않기", "불편·걱정을 줄이면서 치료를 이어갈 선택지를 설명받을 수 있나요?"],
      ] }, sourceIds: ["SUP-NHS-MED-CARERS", "SUP-FDA-AGE-MEDICINES"], links: [{ href: "/health/guides/appointment-questions", label: "진료에서 선택지와 다음 행동을 확인할 질문" }] },
      { title: "목록은 같이 만들되, 약을 고르는 일과 구분합니다", paragraphs: [
        "진료나 약국에 갈 때 현재 복용하는 것을 함께 보여 주세요. 처방약만이 아니라 일반약, 안약·바르는 약, 비타민·건강기능식품·허브 제품도 알립니다. 먹는 양·시간과 처방한 곳은 실제 안내에서 확인하고, 모르는 이름은 실제 용기나 안내문으로 확인받습니다.",
        "가족이 보기에 약이 많거나 증상이 좋아졌다고 중단·감량하지 않습니다. 다른 사람의 처방약을 나누거나, 새 일반약·보충제를 괜찮을 것이라 짐작해 추가하지 않습니다. 함께 사용할 수 있는지는 전체 목록을 보여 주고 의료진·약사에게 확인합니다.",
        "약을 놓쳤을 때의 대응은 약마다 문의합니다. 가족이 임의로 두 배를 먹이거나 다음 복용 시각을 바꾸지 않습니다. 실제로 언제 복용했는지 불확실하다면 ‘모른다’는 사실까지 알리고 해당 약의 안내를 받으세요.",
      ], sourceIds: ["SUP-FDA-AGE-MEDICINES", "SUP-FDA-SAFETY-OLDER", "SUP-NHS-MED-CARERS"], links: [{ href: "/health/guides/medication-list", label: "이름·복용 정보·일반약·보충제를 한 목록으로 정리" }] },
      { title: "여러 가족이 돕는다면 같은 안내를 보고 인계합니다", paragraphs: [
        "당사자가 동의한 범위에서, 누가 어떤 도움을 맡고 바뀐 안내를 어디에서 확인할지 정합니다. ‘아침 약 챙겼음’만 남기기보다 실제로 확인한 복용과 아직 확인하지 못한 일을 구분하세요. 확인하지 않은 복용을 완료로 표시하지 않는 것은 가족 간 전달 원칙입니다.",
        "진료 후에는 새 안내를 받았는지, 현재 목록에 반영됐는지 함께 확인합니다. 원래 용기와 안내문을 확인할 수 있게 보관하고, 알림 앱·요일별 약통을 쓰려면 해당 약에 맞는 방법인지 약사에게 물어보세요. 모든 약이 같은 약통에 옮겨 담기 적합한 것은 아닙니다.",
        "보관은 약마다 제공된 지시를 따르고 어린이가 닿지 않게 합니다. 냉장 보관이 필요한 약 등 조건이 다를 수 있으므로 모든 약을 같은 장소에 두라는 뜻은 아닙니다. 도움을 맡은 사람도 쉬거나 교대할 때 전달할 내용을 정해 혼자 감당하지 않도록 합니다.",
      ], sourceIds: ["SUP-FDA-CARING", "SUP-FDA-SAFETY-OLDER", "SUP-NHS-MED-CARERS"], links: [{ href: "/health/guides/older-parent-health-organizer", label: "부모님과 합의한 정보·연락처·변경사항 정리" }] },
      { id: "urgent-action", title: "새로운 이상은 약 탓으로 단정하지 말고 도움을 요청합니다", paragraphs: [
        "심한 호흡곤란, 반응이 떨어지거나 깨우기 어려운 변화처럼 위급한 상태이면 즉시 119에 연락합니다. 약 목록을 완성하거나 처방기관이 문을 열 때까지 기다리지 않습니다. 어떤 약 때문인지 가족이 먼저 밝혀야 신고할 수 있는 것은 아닙니다.",
        "위급한 모습이 아니어도 새로 생긴 어지럼·졸림 등 불편이 약과 관련됐다고 의심되면 의료진·약사에게 바로 문의합니다. 나이 탓이나 약 탓으로 단정하지 말고 시작 시점, 바뀐 복용 안내와 관찰한 변화를 알리세요. 임의로 약을 끊거나 더 먹여 반응을 시험하지 않습니다.",
        "평소 상담에서 ‘이 약에서 살필 변화는 무엇인가요? 생기면 누구에게 어떻게 연락하나요?’를 확인해 둡니다. 안내받은 긴급 행동이 있다면 따르고, 이 페이지의 짧은 목록만으로 모든 위험을 배제하지 않습니다.",
      ], tone: "warning", sourceIds: ["SUP-FAMILY-EMERGENCY", "SUP-FDA-AGE-MEDICINES", "SUP-FDA-SAFETY-OLDER"], links: [{ href: "/health/guides/danger-signals", label: "복약 확인보다 119가 먼저인 다른 위험 신호" }] },
    ],
    faq: [
      { question: "본인이 거부하면 음식에 몰래 섞어도 되나요?", answer: "동의 없이 숨겨서 투약하거나 억지로 먹이지 않습니다. 거부하는 이유를 듣고 의료진·약사에게 상의합니다. 가루로 만들거나 캡슐을 열어 음식에 섞는 것도 안전한지 먼저 확인해야 하며, 다른 형태가 적합한지는 처방 의료진과 논의합니다.", sourceIds: ["SUP-NHS-MED-CARERS", "SUP-FDA-AGE-MEDICINES"] },
      { question: "요일별 약통을 사면 모든 약을 옮겨도 되나요?", answer: "모든 약에 적합한 방법은 아닙니다. 약마다 보관 지시를 확인하고, 약통·알림이 실제 복용 방식에 맞는지 약사에게 문의합니다. 가족이 임의로 여러 약의 복용 시각을 하나로 합치지 않습니다.", sourceIds: ["SUP-NHS-MED-CARERS", "SUP-FDA-SAFETY-OLDER"] },
      { question: "한 번 잊었으니 다음에 두 배 먹으면 되나요?", answer: "임의로 두 배를 먹거나 먹이지 않습니다. 약 이름과 놓친 시점, 마지막 복용을 아는 범위에서 전하고 해당 약의 안내를 받으세요. 이 글은 모든 약에 같은 보충 복용법을 제시하지 않습니다.", sourceIds: ["SUP-NHS-MED-CARERS", "SUP-FDA-AGE-MEDICINES"] },
      { question: "알약이 크면 반으로 쪼개거나 갈면 되나요?", answer: "그 약에 안전한 방법인지 의료진·약사에게 먼저 확인합니다. 지시 없이 쪼개거나 갈거나 씹지 않습니다. 삼키기 어렵다는 사실을 알리고 사용할 수 있는 형태나 방법을 상담합니다.", sourceIds: ["SUP-FDA-AGE-MEDICINES", "SUP-NHS-MED-CARERS"] },
      { question: "약국에서 산 약과 영양제도 가족이 알려야 하나요?", answer: "당사자가 동의한 도움 범위에서 처방약뿐 아니라 일반약·안약·바르는 약·비타민·보충제도 목록에 포함하도록 돕습니다. 처방약과 같이 써도 되는지 임의로 판단하지 말고 의료진·약사에게 전체 목록을 보여 주세요.", sourceIds: ["SUP-FDA-AGE-MEDICINES", "SUP-FDA-CARING", "SUP-NHS-MED-CARERS"] },
    ],
    sources: [
      { id: "SUP-NHS-MED-CARERS", organization: "NHS", title: "Medicines: tips for carers", url: "https://www.nhs.uk/social-care-and-support/practical-tips-if-you-care-for-someone/medicines-tips-for-carers/", sourceDate: "2024-04-25 (Page last reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-FDA-CARING", organization: "U.S. FDA / Office of Women's Health", title: "Caring for Others: Resources to Help You", url: "https://www.fda.gov/consumers/womens-health-topics/caring-others-resources-help-you", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-FDA-SAFETY-OLDER", organization: "U.S. FDA", title: "5 Medication Safety Tips for Older Adults", url: "https://www.fda.gov/consumers/consumer-updates/5-medication-safety-tips-older-adults", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-FDA-AGE-MEDICINES", organization: "U.S. FDA", title: "As You Age: You and Your Medicines", url: "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-FAMILY-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date)", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "symptom-journal",
    title: "아픈 증상을 짧고 정확하게 기록하는 방법",
    seoTitle: "증상일지 쓰는 법: 시작·변화·일상 영향을 진료에 전하기",
    description: "시작 시점, 느낀 불편, 달라지는 상황과 일상 영향을 가능한 만큼 기록합니다. 관찰과 원인 추정을 나누는 예시, 두통·수면 기록의 차이와 기록보다 도움 요청이 먼저인 때를 확인하세요.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "기록을 시작할 때 막히는 부분",
    sections: [
      { id: "urgent-action", title: "위험 신호라면 기록을 완성하지 말고 119", paragraphs: [
        "심한 호흡곤란이나 갑자기 반응이 떨어지는 변화, 갑작스러운 한쪽 얼굴·팔·다리의 힘·감각 변화 또는 갑작스러운 말·시야 이상, 어지럼, 걷기·균형의 어려움 등이 있으면 즉시 119에 연락합니다. 일지를 채우거나 사진을 찍느라 기다리지 않습니다. 이런 신호가 잠깐 사라져도 도움을 미루지 않습니다.",
      ], tone: "warning", sourceIds: ["SUP-JOURNAL-EMERGENCY", "SUP-JOURNAL-STROKE"], links: [{ href: "/health/guides/danger-signals", label: "기록보다 도움 요청이 먼저인 다른 위험 신호" }] },
      { title: "처음부터 긴 일지 대신, 네 가지를 적습니다", paragraphs: [
        "진료실에서 기억이 잘 나지 않을 수 있어 시작 시점과 불편한 모습을 미리 적어 두면 설명에 쓸 수 있습니다. 아래 네 칸은 오누림의 정리 예시이며 검증된 진단 척도나 필수 제출 양식이 아닙니다. 아는 항목만 적고, 정확히 기억나지 않으면 그 사실을 표시합니다.",
      ], table: { caption: "진료에 가져갈 증상 메모 — 가능한 항목만 작성", columns: ["기록할 것", "적는 방법"], rows: [
        ["언제 시작·반복됐는지", "처음 느낀 날짜·시각, 이어졌는지 반복됐는지; 시각이 추정이면 추정이라고 적기"],
        ["어디가 어떻게 불편했는지", "본인이 느낀 위치와 불편을 자신의 말로; 같이 느낀 변화도 적기"],
        ["어떤 상황에서 달라졌는지", "당시 활동이나 쉬고 있을 때의 차이, 더 심해지거나 덜한 때; 원인을 확정하지 않기"],
        ["일상에서 무엇이 어려웠는지", "잠·식사·걷기·일·공부 등에 실제로 달라진 점; 점수로만 줄이지 않기"],
      ] }, sourceIds: ["SUP-JOURNAL-TALK", "SUP-JOURNAL-HEADACHE", "SUP-NHLBI-SLEEP-DIARY"] },
      { title: "‘느낀 것’과 ‘원인이라고 생각한 것’을 나눕니다", paragraphs: [
        "‘식사 뒤 배가 불편했다’는 느낀 경험이고, ‘그 음식 때문에 병이 생겼다’는 원인 추정입니다. 경험을 적은 뒤 원인이 궁금하면 별도 질문으로 남기세요. 함께 일어났다는 기록만으로 원인을 확정하는 자료는 아닙니다.",
        "본인이 느낀 통증·메스꺼움·불안처럼 다른 사람이 바로 볼 수 없는 불편도 중요한 설명입니다. 보호자가 적을 때는 ‘본인이 이렇게 말함’과 ‘내가 이렇게 관찰함’을 구분하고, 보이지 않는다는 이유로 불편을 지우지 않습니다.",
        "예를 들어 ‘어제 저녁 식사 뒤 배가 불편했고 오늘 아침에는 덜했다. 정확한 시작 시각은 기억나지 않는다. 식사와 관련 있는지 궁금하다’처럼 쓸 수 있습니다. 가상의 표현 예시이며 병명이나 안전 여부를 판단하는 사례가 아닙니다. 낮은 통증 점수나 일할 수 있다는 사실만으로 응급상황을 배제하는 표도 아닙니다.",
      ], sourceIds: ["SUP-JOURNAL-TALK", "SUP-JOURNAL-EMERGENCY"] },
      { title: "증상에 따라 추가할 정보가 달라집니다", paragraphs: [
        "두통 진료에서는 두통이 얼마나 자주 나타났는지와 이전 치료·약 사용 이력이 설명에 도움이 됩니다. St George’s 병원은 본인이 쓰던 일지도 가져올 수 있다고 안내합니다. 전용 양식을 구하지 못했다는 이유로 기록이나 진료를 미룰 필요는 없습니다.",
        "수면에 관한 기록은 잠의 양과 질, 낮의 졸림, 복용약·술·카페인 같은 정보를 함께 살펴볼 수 있습니다. NHLBI 수면일지는 이런 내용을 적어 의료진과 검토하는 자료입니다. 수면 기록에 쓰는 항목을 모든 증상에 똑같이 요구하지 않습니다.",
        "이미 사용한 약과 당시 변화를 기록하는 것과 약의 효과를 스스로 시험하는 것은 다릅니다. 기록을 만들려고 약을 더 먹거나 끊지 말고 실제 사용 정보를 알립니다. 어떤 항목을 얼마나 기록할지는 진료에서 본인 상황에 맞게 확인합니다.",
      ], sourceIds: ["SUP-JOURNAL-HEADACHE", "SUP-NHLBI-SLEEP-DIARY", "SUP-JOURNAL-FDA-MEDICINES"], links: [
        { href: "/health/migraine", label: "편두통 진료에서 증상의 흐름을 보는 이유" },
        { href: "/health/sleep-apnea", label: "잠과 낮의 변화, 수면검사가 하는 역할" },
        { href: "/health/guides/medication-list", label: "실제 사용한 약·보충제 정보를 함께 준비" },
      ] },
      { title: "진료에서는 가장 걱정되는 변화부터 전달합니다", paragraphs: [
        "기록을 시간순으로 모두 읽기보다 ‘가장 불편한 점 / 언제부터 어떻게 달라졌는지 / 가장 알고 싶은 질문’을 먼저 말하고 필요한 부분을 보여 주세요. 이는 말문을 여는 정리법이지 모든 진료에 정해진 보고 순서는 아닙니다.",
        "빈칸이 있거나 하루만 적었어도 현재 아는 내용을 전달합니다. 일정 기간을 채워야 진료받을 수 있다는 뜻이 아닙니다. 의료진이 별도 기록을 요청했다면 그 목적·항목·기간을 확인하고, 그 전에 새로운 변화가 생기면 언제 어디로 연락할지도 물어보세요.",
        "메모를 누구에게 보여 줄지는 당사자와 상의합니다. 공개 문의·가족 단체방에 신체 사진이나 결과지·이름이 담긴 기록을 무심코 올리지 말고 필요한 사람에게 필요한 범위만 전달하세요. 이 페이지는 기록을 업로드하거나 진단받는 창구가 아닙니다.",
      ], sourceIds: ["SUP-JOURNAL-TALK", "SUP-JOURNAL-HEADACHE"], links: [{ href: "/health/guides/appointment-questions", label: "진료 뒤 기록할 항목과 다음 연락 방법을 묻기" }] },
    ],
    faq: [
      { question: "시작 시각을 정확히 기억하지 못하면 어떻게 적나요?", answer: "‘정확한 시각 모름’이나 ‘저녁쯤으로 기억’처럼 확실한 것과 추정을 나눕니다. 빈칸을 채우려고 시각을 만들어 내지 않습니다. 지금 아는 증상과 변화부터 의료진에게 전달하세요.", sourceIds: ["SUP-JOURNAL-TALK"] },
      { question: "통증을 숫자로만 적으면 충분한가요?", answer: "점수를 쓰더라도 위치·느낌·시작 시점·변화·일상 영향을 함께 설명합니다. 이 안내는 특정 점수를 진단하거나 응급 여부를 결정하는 기준으로 쓰지 않습니다. 위험 신호가 있으면 기록보다 도움 요청이 먼저입니다.", sourceIds: ["SUP-JOURNAL-TALK", "SUP-JOURNAL-EMERGENCY"] },
      { question: "식사나 약 뒤에 생겼다면 그것이 원인인가요?", answer: "전후에 생긴 경험은 적되 원인을 확정하지 않습니다. 관련 있는지 질문으로 남기고 실제 사용한 약과 변화를 알립니다. 원인을 시험하려고 임의로 약을 추가하거나 중단하지 않습니다.", sourceIds: ["SUP-JOURNAL-TALK", "SUP-JOURNAL-FDA-MEDICINES"] },
      { question: "며칠 이상 채워야 병원에 갈 수 있나요?", answer: "이 페이지는 진료 전에 채워야 할 최소 일수를 정하지 않습니다. 기록이 적어도 현재 불편을 알리고, 별도 일지가 필요한지는 의료진과 정하세요. 응급 신호는 기록 기간과 관계없이 즉시 도움을 요청합니다.", sourceIds: ["SUP-JOURNAL-TALK", "SUP-JOURNAL-EMERGENCY", "SUP-JOURNAL-STROKE"] },
      { question: "가족이 대신 기록해도 되나요?", answer: "당사자가 원하는 도움인지 먼저 묻고, 본인이 말한 불편과 가족이 관찰한 것을 구분합니다. 진료에 함께 가거나 메모를 돕는 방법도 상의할 수 있습니다. 가족이 쓴 해석을 본인의 경험이나 확정 진단처럼 바꾸지 않습니다.", sourceIds: ["SUP-JOURNAL-TALK"] },
    ],
    sources: [
      { id: "SUP-JOURNAL-TALK", organization: "NIH/NLM MedlinePlus", title: "Talking With Your Doctor", url: "https://medlineplus.gov/talkingwithyourdoctor.html", sourceDate: "2024-10-05 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHLBI-SLEEP-DIARY", organization: "NIH/NHLBI", title: "Sleep Diary — 자료 소개", url: "https://www.nhlbi.nih.gov/resources/sleep-diary", sourceDate: "2019-01 (Publication Date; HTML 소개 확인)", retrievedAt: "2026-09-06" },
      { id: "SUP-JOURNAL-HEADACHE", organization: "St George’s University Hospitals NHS Foundation Trust", title: "Community Headache Hub — 진료 준비와 두통일지", url: "https://www.stgeorges.nhs.uk/service/neuro/neurology/headache-service/headache-hub/", sourceDate: "페이지 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-JOURNAL-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date)", retrievedAt: "2026-09-06" },
      { id: "SUP-JOURNAL-STROKE", organization: "CDC", title: "Signs and Symptoms of Stroke", url: "https://www.cdc.gov/stroke/signs-symptoms/index.html", sourceDate: "2026-05-19 (페이지 표시일)", retrievedAt: "2026-09-06" },
      { id: "SUP-JOURNAL-FDA-MEDICINES", organization: "U.S. FDA", title: "As You Age: You and Your Medicines", url: "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "appointment-questions",
    title: "진료에서 꼭 묻고 싶은 것부터 준비하세요",
    seoTitle: "병원 진료 전 질문 준비: 검사·치료·다음 연락 확인",
    description: "가장 걱정되는 질문부터 고르고 검사 목적·치료 선택지·다음 일정을 확인합니다. 설명을 이해하지 못했거나 실행이 어려울 때 말하는 방법과 귀가 후 문의할 내용을 정리합니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "질문하기가 망설여질 때",
    sections: [
      { title: "가장 중요한 두세 가지부터 표시합니다", paragraphs: [
        "진료에서 꼭 확인하고 싶은 걱정을 먼저 적습니다. AHRQ는 중요한 질문 세 가지를, NHS는 두세 가지를 먼저 준비하는 방법을 제안합니다. 질문을 그 개수까지만 해야 한다는 뜻은 아닙니다. 새로운 증상이나 약 알레르기 같은 중요한 정보는 개수 때문에 빼지 않습니다.",
        "‘큰 병인가요?’라는 걱정도 말해도 됩니다. 이어서 ‘지금 무엇을 확인하고 있나요? 아직 모르는 점은 무엇인가요? 다음에 무엇으로 확인하나요?’처럼 설명받고 싶은 부분을 나눠 보세요. 질문을 잘해야만 진료받을 자격이 생기거나 좋은 결과가 보장되는 것은 아닙니다.",
        "증상의 시작과 변화, 현재 쓰는 약·비타민·보충제, 알레르기와 과거 약 사용 중 겪은 문제를 아는 범위에서 준비합니다. 전부 외우려 하지 말고 메모나 실제 용기·안내문을 가져갈 수 있습니다.",
      ], sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-NHS-DOCTOR-QUESTIONS", "SUP-MEDLINEPLUS-TALK"], links: [
        { href: "/health/guides/symptom-journal", label: "증상이 언제·어떻게 달라졌는지 짧게 정리" },
        { href: "/health/guides/medication-list", label: "약·보충제와 복용 정보를 빠뜨리지 않고 준비" },
      ] },
      { title: "검사·치료·다음 계획은 이렇게 물을 수 있습니다", paragraphs: [
        "아래는 본인에게 해당하는 질문을 고르는 예시입니다. 특정 검사를 요구하거나, 모든 치료 선택지가 누구에게나 맞는다고 전제하는 목록이 아닙니다. 이미 설명받은 항목은 반복해서 모두 읽지 않아도 됩니다.",
      ], table: { caption: "이번 진료에서 필요한 질문만 고르세요", columns: ["이야기할 주제", "확인할 질문"], rows: [
        ["검사를 권유받았을 때", "무엇을 확인하나요? 어떻게 진행되고 어떤 준비가 필요한가요? 결과는 언제 어떤 방법으로 받나요?"],
        ["치료를 선택할 때", "제 상황에서 가능한 선택지와 권하는 이유는 무엇인가요? 기대 효과·위험·기간은 어떻게 다른가요?"],
        ["약을 처방받았을 때", "어떻게 사용하고 어떤 변화를 살펴야 하나요? 다른 약·보충제나 이전 이상 반응과 함께 고려할 점은 무엇인가요?"],
        ["다음 계획을 정할 때", "다시 진료·검사할 시점은 언제인가요? 예상대로 결과나 예약 연락이 없으면 어디로 문의하나요?"],
      ] }, sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-NHS-DOCTOR-QUESTIONS"], links: [{ href: "/health/guides/reading-health-results", label: "검사 결과의 표시를 다음 질문으로 바꾸기" }] },
      { title: "이해가 안 되는 것과 실행이 어려운 것을 따로 말합니다", paragraphs: [
        "설명이 어렵다면 ‘그 단어를 쉬운 말로 다시 설명해 주실 수 있나요?’라고 묻고 필요한 이름이나 안내를 적어 달라고 요청할 수 있습니다. 이해한 부분을 자신의 말로 말한 뒤 맞는지 확인하는 것도 방법입니다. 고개를 끄덕였다고 이해가 끝난 것은 아닙니다.",
        "설명은 알겠지만 생활 여건, 불편, 비용 등으로 실행이 어렵다면 그 어려움을 알립니다. 가능하지 않은 일을 했다고 말하기보다 조정하거나 도움받을 방법이 있는지 상담하세요. 치료를 스스로 바꾸겠다는 통보가 아니라 함께 계획을 확인하는 대화입니다.",
        "메모를 돕는 사람과 함께 가고 싶거나 통역·의사소통 지원이 필요하면 기관에 미리 가능 여부를 문의합니다. 모든 기관이 같은 서비스를 제공한다고 보장하지 않습니다. 동행인이 본인 대신 모든 답을 정하기보다 본인이 원하는 도움을 상의합니다.",
      ], sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-NHS-DOCTOR-QUESTIONS", "SUP-MEDLINEPLUS-TALK"] },
      { title: "귀가 전, 행동으로 옮길 내용을 확인합니다", paragraphs: [
        "‘제가 이해한 것은 이렇습니다’라고 짧게 말하고 맞는지 확인해 보세요. 이어서 지금 할 일, 다음 확인 날짜, 결과를 받는 방법, 문제가 생기거나 연락이 오지 않을 때 문의할 곳을 적습니다. 날짜나 담당자를 모르면 임의로 정하지 말고 확인합니다.",
        "여러 검사가 예정됐다면 어떤 예약을 본인이 해야 하는지와 결과를 누가 설명하는지도 묻습니다. 종이나 전자 안내를 받을 수 있는지 확인하되, 안내를 받았다는 사실과 내용을 이해했다는 것은 구분합니다.",
      ], bullets: [
        "지금 할 일: 안내받은 내용을 본인 말로 확인",
        "다음 확인: 무엇을 언제·어디에서 확인할지",
        "연락 방법: 결과를 받을 경로와 문제가 있을 때 문의처",
        "아직 남은 질문: 어디에서 다시 확인할지",
      ], sourceIds: ["SUP-NHS-DOCTOR-QUESTIONS", "SUP-AHRQ-ENGAGED", "SUP-MEDLINEPLUS-TALK"] },
      { title: "집에 와서 헷갈리면, 추측 대신 다시 문의합니다", paragraphs: [
        "안내문을 보아도 뜻이 분명하지 않거나 실제로 따르기 어렵다면 진료기관에 문의합니다. 약에 관한 질문은 처방 의료진·약사에게 확인할 수 있습니다. 기억이 나지 않는다는 이유로 임의로 약을 끊거나 복용법을 바꾸지 않습니다.",
        "기대한 때 결과가 오지 않으면 ‘연락이 없으니 정상’이라고 결론 내리지 말고 확인할 경로를 이용합니다. 문의할 때는 어느 진료·검사인지와 이해되지 않는 부분을 짧게 말합니다. 개인 결과·처방전은 기관이 안내한 안전한 경로로 전달하고 공개 게시판에 올리지 않습니다.",
      ], sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-NHS-DOCTOR-QUESTIONS", "SUP-MEDLINEPLUS-TALK"] },
      { id: "urgent-action", title: "위급한 변화는 예약이나 답변을 기다리지 않습니다", paragraphs: [
        "심한 호흡곤란이나 갑자기 반응이 떨어지는 변화 등 위급한 상태라면 즉시 119에 연락합니다. 질문표를 끝내거나 예약일·문의 답변을 기다리는 일이 먼저가 아닙니다. 평소 상담에서는 본인에게 어떤 변화가 생기면 빨리 도움받아야 하는지도 확인하세요.",
      ], tone: "warning", sourceIds: ["SUP-APPOINTMENT-EMERGENCY", "SUP-NHS-DOCTOR-QUESTIONS"], links: [{ href: "/health/guides/danger-signals", label: "예약·질문보다 도움 요청이 먼저인 위험 신호" }] },
    ],
    faq: [
      { question: "질문이 너무 많으면 세 개만 해야 하나요?", answer: "두세 개는 우선순위를 정하는 예시이지 질문의 상한이 아닙니다. 중요한 걱정부터 말하고, 새로운 증상이나 약 알레르기 같은 정보는 빠뜨리지 않습니다. 이번에 다루지 못한 질문을 어디에서 확인할지도 물어보세요.", sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-NHS-DOCTOR-QUESTIONS"] },
      { question: "의학 용어를 다시 물으면 진료를 방해하나요?", answer: "이해되지 않는 단어는 쉬운 말로 다시 설명하거나 적어 달라고 요청할 수 있습니다. 이해한 내용을 자신의 말로 확인하고, 필요하면 서면 안내를 받을 수 있는지도 물어보세요.", sourceIds: ["SUP-NHS-DOCTOR-QUESTIONS", "SUP-MEDLINEPLUS-TALK"] },
      { question: "검사를 꼭 해 달라고 요청하는 표인가요?", answer: "아닙니다. 검사가 무엇을 확인하고 본인에게 왜 필요한지 설명받는 질문표입니다. 검사를 많이 받을수록 좋다는 뜻이나, 특정 검사·치료를 선택하라는 지시가 아닙니다.", sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-NHS-DOCTOR-QUESTIONS"] },
      { question: "안내는 이해했지만 지키기 어렵다면 어떻게 하나요?", answer: "무엇이 어려운지 솔직하게 알리고 다른 방법이나 도움을 상담합니다. 실제로 하지 못한 일을 했다고 말하거나 약·치료 계획을 혼자 바꾸지 않습니다. 문의할 곳과 다음 확인 시점을 함께 정하세요.", sourceIds: ["SUP-AHRQ-ENGAGED", "SUP-MEDLINEPLUS-TALK"] },
      { question: "검사 뒤 연락이 없으면 정상이라는 뜻인가요?", answer: "연락이 없는 것만으로 결과를 정하지 않습니다. 미리 안내받은 결과 확인 방법을 이용하고, 예상한 때 연락이 없으면 기관에 문의하세요. 결과의 의미와 다음에 할 일까지 설명받습니다.", sourceIds: ["SUP-NHS-DOCTOR-QUESTIONS", "SUP-AHRQ-ENGAGED"] },
    ],
    sources: [
      { id: "SUP-AHRQ-ENGAGED", organization: "AHRQ", title: "Be More Engaged in Your Healthcare", url: "https://www.ahrq.gov/questions/be-engaged/index.html", sourceDate: "2024-11 (Page last reviewed; originally created2012-09)", retrievedAt: "2026-09-06" },
      { id: "SUP-NHS-DOCTOR-QUESTIONS", organization: "NHS", title: "What to ask your doctor or other healthcare professional", url: "https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/", sourceDate: "2023-01-12 (Page last reviewed; next review2026-01-12와 구분)", retrievedAt: "2026-09-06" },
      { id: "SUP-MEDLINEPLUS-TALK", organization: "NIH/NLM MedlinePlus", title: "Talking With Your Doctor", url: "https://medlineplus.gov/talkingwithyourdoctor.html", sourceDate: "2024-10-05 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-APPOINTMENT-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date)", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "medication-list",
    title: "약 목록, 이름과 사용 안내를 나누어 적으세요",
    seoTitle: "복용약 목록 작성법: 약 이름·함량·사용법과 변경일",
    description: "처방약·일반약·안약·바르는 약·보충제를 한 목록에 정리합니다. 제품 함량과 안내받은 사용량을 나누고, 모르는 정보와 변경사항을 표시해 진료·약국에 전달하는 방법입니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "목록을 적다가 헷갈리는 질문",
    sections: [
      { title: "목록을 만드는 목적은 약을 다시 처방하는 것이 아닙니다", paragraphs: [
        "여러 진료기관이나 약국을 이용하면 현재 무엇을 쓰고 있는지 한 번에 설명하기 어려울 수 있습니다. 복용약 목록은 의료진·약사가 확인할 정보를 모으는 자료입니다. 어떤 약을 빼거나 더할지, 함께 써도 안전한지 스스로 판정하는 표가 아닙니다.",
        "FDA는 이름·함량·사용 이유·언제 어떻게 얼마나 쓰는지를 정리하고 변경 때 갱신하도록 안내합니다. 종이든 휴대전화 메모든 본인이 계속 확인할 수 있는 방식이면 됩니다. 특별한 앱을 설치하거나 모든 칸을 외울 필요는 없습니다.",
      ], sourceIds: ["SUP-FDA-CURRENT-MED-LIST", "SUP-LIST-FDA-AGE"] },
      { title: "제품 표기와 안내받은 사용법을 따로 봅니다", paragraphs: [
        "실제 용기·약봉투·처방전·안내문을 펼쳐 놓고 옮기세요. 제품에 적힌 함량·농도 등의 숫자와, 한 번에 얼마를 언제 쓰라고 안내받았는지는 다른 정보입니다. 함량만 보고 한 번의 사용량을 계산하거나 정하지 않습니다.",
        "FDA의 미국 일반약 라벨 설명도 성분의 양과 사용 지시를 구분합니다. 국내 모든 제품이 같은 순서·모양으로 표시된다는 뜻은 아니므로 실제 제품과 받은 안내를 확인합니다.",
        "이름이 비슷하거나 표기가 서로 달라 보이면 지우고 하나로 합치지 말고 의료진·약사에게 확인합니다. 색·모양만으로 이름을 추측하지 않고 실제 용기나 안내문을 보여 주세요. 아래는 기록할 항목의 예시이지 특정 약의 사용 지시가 아닙니다.",
      ], table: { caption: "약 하나마다 확인할 항목 — 실제 숫자는 안내에서 확인", columns: ["항목", "옮길 내용과 확인할 점"], rows: [
        ["정확한 제품 정보", "제품 이름, 확인 가능한 성분명과 형태; 모르는 이름은 ‘확인 필요’ 표시"],
        ["제품의 함량·농도 표기", "단위를 빼지 않고 포장 표기를 그대로 옮기기; 임의 단위 환산하지 않기"],
        ["안내받은 사용법", "언제·어떻게·얼마나 쓰는지 별도 기록; 제품 함량으로 대체하지 않기"],
        ["사용 이유와 안내한 곳", "설명받은 사용 이유, 처방·상담 기관을 아는 범위에서; 병명을 추측하지 않기"],
        ["현재 상황과 확인 날짜", "지금 사용 중인지, 안내와 다른 점·미확인 내용이 있는지, 목록을 확인한 날짜"],
      ] }, sourceIds: ["SUP-FDA-CURRENT-MED-LIST", "SUP-LIST-FDA-AGE", "SUP-LIST-FDA-SAFETY", "SUP-LIST-FDA-LABEL"] },
      { title: "매일 먹는 처방약 말고도 포함합니다", paragraphs: [
        "약국에서 산 일반약, 필요할 때만 쓰는 약, 안약·바르는 약, 비타민·건강기능식품·허브 제품도 알립니다. 보충제를 모두 법적으로 의약품이라고 부르는 것이 아니라, 함께 사용하는 것을 빠뜨리지 않고 전달하려는 목록입니다.",
        "필요할 때 쓰는 약은 그렇게 안내받았다는 점과 실제 사용 정보를 아는 범위에서 적습니다. ‘필요할 때’의 뜻이나 사용 간격이 불분명하면 약사·처방기관에 확인합니다. 이 페이지가 모든 약에 공통된 사용 간격·횟수를 정하지는 않습니다.",
        "알레르기와 이전에 약을 쓰며 겪은 문제도 별도로 알립니다. 어떤 약 뒤에 무엇을 겪었는지 아는 만큼 적고, 확인받지 않은 원인을 알레르기 확정처럼 바꾸지 않습니다. 목록이 길다는 이유로 본인이 중요하지 않다고 생각한 제품을 숨기지 마세요.",
      ], sourceIds: ["SUP-LIST-FDA-AGE", "SUP-LIST-FDA-SAFETY", "SUP-FDA-CURRENT-MED-LIST"], links: [{ href: "/health/guides/family-medication-support", label: "가족이 돕는 범위와 약 관련 어려움을 함께 확인" }] },
      { title: "바뀔 때 고치고, 다음 진료에서 다시 확인합니다", paragraphs: [
        "새 처방이나 사용법 변경을 안내받았으면 목록을 갱신합니다. 현재 사용하는 것과 의료진 안내로 중단한 과거 기록을 구분하고, 언제 어떤 안내로 바뀌었는지 아는 범위에서 남기세요. 목록을 고친다는 이유로 약을 임의로 중단·재시작하지 않습니다.",
        "안내받은 사용법과 실제 사용이 달랐다면 두 내용을 구분해 알립니다. 부끄러워서 처방대로만 적기보다 어떤 점이 달랐고 무엇이 어려웠는지 말해야 다음 계획을 상담할 수 있습니다. 복용했는지 기억나지 않는 부분은 완료로 채우지 않습니다.",
        "진료·검사·약국 방문 때 최신 목록과 궁금한 점을 보여 주세요. ‘이전 목록과 바뀐 것은 무엇인가요? 같이 고려할 제품이 빠졌나요?’라고 확인하고, 받은 새 안내를 반영합니다. 여러 기관의 정보가 자동으로 모두 합쳐진다고 가정하지 않습니다.",
      ], sourceIds: ["SUP-FDA-CURRENT-MED-LIST", "SUP-LIST-FDA-AGE", "SUP-LIST-FDA-SAFETY"], links: [
        { href: "/health/guides/appointment-questions", label: "약 사용법·주의점·다음 확인을 물을 질문" },
        { href: "/health/guides/reading-health-results", label: "검사 준비와 결과 설명 때 약 정보를 알릴 이유" },
      ] },
      { title: "필요할 때 찾되, 공개하지 않는 방법을 정합니다", paragraphs: [
        "목록에는 개인 건강정보가 담깁니다. 본인이 찾을 수 있는 곳에 두고, 동의한 가족·돌봄자와 필요한 범위에서 공유할 방법을 정합니다. 종이 사본이나 휴대전화의 목록도 최신인지 확인하고, 공개 링크나 공개 문의 게시판에 처방전·이름·연락처를 올리지 않습니다.",
        "FDA는 목록에 응급 연락처와 알레르기 정보를 함께 두는 방법도 안내합니다. 다만 이 페이지는 파일 업로드·약 식별·상호작용 자동판정 서비스가 아닙니다. 목록이 있으면 전달할 수 있지만, 목록을 갖고 있어야만 도움받을 수 있다는 뜻은 아닙니다.",
      ], sourceIds: ["SUP-FDA-CURRENT-MED-LIST"], links: [{ href: "/health/guides/older-parent-health-organizer", label: "부모님과 합의한 정보의 위치·공유·갱신 방법" }] },
      { id: "urgent-action", title: "위급하다면 약 이름 찾기보다 119", paragraphs: [
        "심한 호흡곤란이나 반응이 떨어지는 변화 등 위급한 상태이면 즉시 119에 연락합니다. 약 이름·용량을 모두 알아내거나 목록을 완성한 뒤 신고하지 않습니다. 아는 정보만 전하고 도움 요청을 먼저 합니다.",
      ], tone: "warning", sourceIds: ["SUP-LIST-EMERGENCY"], links: [{ href: "/health/guides/danger-signals", label: "목록 정리보다 즉시 도움이 필요한 다른 위험 신호" }] },
    ],
    faq: [
      { question: "함량 숫자만 적으면 한 번 먹는 양도 알 수 있나요?", answer: "제품에 표시된 함량·농도와 안내받은 사용량은 따로 확인합니다. 단위를 포함한 제품 표기와 언제·어떻게·얼마나 쓰라는 안내를 각각 옮기세요. 함량만으로 사용량을 계산하거나 약을 나누지 않습니다.", sourceIds: ["SUP-FDA-CURRENT-MED-LIST", "SUP-LIST-FDA-AGE", "SUP-LIST-FDA-LABEL"] },
      { question: "약 이름을 모르는데 색이나 모양으로 적어도 되나요?", answer: "정확한 이름을 추측해서 확정하지 않습니다. ‘이름 확인 필요’로 표시하고 실제 용기·약봉투·안내문을 의료진·약사에게 보여 확인받습니다. 이 페이지는 알약 사진으로 약을 식별하지 않습니다.", sourceIds: ["SUP-LIST-FDA-AGE", "SUP-LIST-FDA-SAFETY"] },
      { question: "가끔 쓰는 약과 안약도 적어야 하나요?", answer: "매일 먹는 약만 적는 목록이 아닙니다. 일반약·필요할 때 쓰는 약·안약·바르는 약·비타민·보충제를 함께 알립니다. 실제 사용 정보와 불분명한 안내는 확인 필요로 남겨 의료진·약사에게 묻습니다.", sourceIds: ["SUP-LIST-FDA-AGE", "SUP-FDA-CURRENT-MED-LIST"] },
      { question: "목록에서 약이 많아 보이면 몇 개 빼도 되나요?", answer: "정보를 정확히 전달하는 것과 약을 줄이는 결정은 별개입니다. 임의로 중단하거나 목록에서 숨기지 말고, 현재 쓰는 것과 걱정되는 점을 보여 주세요. 계속 필요한지·함께 쓸 때 고려할 점은 의료진·약사와 상담합니다.", sourceIds: ["SUP-LIST-FDA-AGE", "SUP-LIST-FDA-SAFETY"] },
      { question: "작년에 만든 목록을 그대로 가져가도 되나요?", answer: "새 처방·사용법 변경·중단 안내가 있었다면 현재 상황을 반영합니다. 지난 목록밖에 없으면 바뀐 점과 모르는 부분을 알리고 함께 확인하세요. 완벽한 최신 목록을 만들 때까지 진료나 긴급 도움을 미루지는 않습니다.", sourceIds: ["SUP-FDA-CURRENT-MED-LIST", "SUP-LIST-EMERGENCY"] },
    ],
    sources: [
      { id: "SUP-FDA-CURRENT-MED-LIST", organization: "U.S. FDA", title: "Create and Keep a Medication List for Your Health", url: "https://www.fda.gov/consumers/consumer-updates/create-and-keep-medication-list-your-health", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-LIST-FDA-AGE", organization: "U.S. FDA", title: "As You Age: You and Your Medicines", url: "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-LIST-FDA-SAFETY", organization: "U.S. FDA", title: "5 Medication Safety Tips for Older Adults", url: "https://www.fda.gov/consumers/consumer-updates/5-medication-safety-tips-older-adults", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-LIST-FDA-LABEL", organization: "U.S. FDA", title: "The Over-the-Counter Drug Facts Label — 미국 일반약 표시 설명", url: "https://www.fda.gov/drugs/understanding-over-counter-medicines/over-counter-drug-facts-label", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-LIST-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date)", retrievedAt: "2026-09-06" },
    ],
  },
  {
    slug: "older-parent-health-organizer",
    title: "부모님 건강정보, 함께 정하고 찾기 쉽게 정리하세요",
    seoTitle: "부모님 건강정보 정리: 약·검사·진료 기록과 확인 날짜",
    description: "당사자가 동의한 범위에서 한 장 요약과 원본 위치를 나눕니다. 현재 전체 약 목록, 검사·예약 날짜, 연락처와 확인 필요 사항을 구분해 가족과 진료기관에 전달하는 방법입니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-09-06", sourceCheckedAt: "2026-09-06",
    faqTitle: "가족끼리 기록을 정리하며 생기는 질문",
    sections: [
      { title: "무엇을 누가 볼지 부모님과 먼저 정합니다", paragraphs: [
        "부모님이 어떤 도움을 원하고 누구에게 어떤 정보를 보여 주고 싶은지 먼저 묻습니다. 약·진료 기록을 가족이 갖고 있다는 사실이 치료를 대신 결정할 권한을 뜻하지는 않습니다. 혼자 할 수 있는 일과 도움받고 싶은 일을 함께 구분하세요.",
        "모든 기록을 한 번에 모으기보다 당장 진료에 필요한 정보부터 시작할 수 있습니다. 이 안내는 가족의 일상적인 정보 정리 방법이지 법적 대리권, 치료 동의, 연명의료 결정을 정하는 문서가 아닙니다. 별도 권한이나 절차가 필요한지 불분명하면 해당 기관에 확인합니다.",
      ], sourceIds: ["SUP-PARENT-NHS-CARERS", "SUP-PARENT-RECORDS"] },
      { title: "한 장 요약에는 ‘어디에서 확인할지’도 남깁니다", paragraphs: [
        "여러 기관에 검사·처방 기록이 나뉘어 있을 수 있습니다. 요약은 필요한 내용을 찾는 출발점이고 원본 문서를 대신하지 않습니다. 긴 결과지를 모두 옮기거나 숫자를 가족이 다시 해석하지 말고, 정확한 문서를 확인할 위치와 기관을 함께 적습니다.",
        "아래 표는 오누림의 정리 예시이며 기관이 인증한 표준 서식이 아닙니다. ‘검사한 날’, ‘다음 예약일’, ‘가족이 정보를 확인한 날’을 구분하세요. 마지막 확인일은 가족이 자료를 확인한 날짜이지 의료진이 상태를 다시 평가한 날짜가 아닙니다.",
      ], table: { caption: "요약·원본 위치·확인할 점을 나누는 안내표", columns: ["요약할 정보", "세부자료를 찾을 곳", "함께 확인할 점"], rows: [
        ["현재 약·보충제와 알레르기", "최신 약 목록, 실제 약봉투·용기와 안내문", "현재 전체 목록인지, 모르는 반응·이름이 있는지"],
        ["주요 진료·질환·수술 이력", "본인이 보관한 진료 안내와 해당 기관", "어떤 문서·설명을 바탕으로 적었는지, 날짜가 확실한지"],
        ["검사 결과와 다음 예약", "검사 결과지, 예약 안내", "검사 시행일과 다음 예약일을 섞지 않았는지"],
        ["진료기관·도움받을 사람의 연락처", "기관이 안내한 문의 경로, 동의한 연락처", "지금도 쓸 수 있는 경로인지, 누구에게 무엇을 공유할지"],
      ] }, sourceIds: ["SUP-PARENT-RECORDS", "SUP-PARENT-FDA-LIST", "SUP-PARENT-TALK"], links: [{ href: "/health/guides/medication-list", label: "약 이름·함량·사용법의 상세 목록을 만드는 방법" }] },
      { title: "현재 전체 정보와 바뀐 부분을 함께 유지합니다", paragraphs: [
        "새 약이나 변경 안내를 받았다고 새로 바뀐 약만 남기지 않습니다. 현재 사용하는 전체 약 목록을 유지하면서, 의료진이 안내한 변경과 날짜를 별도로 표시합니다. 과거에 중단한 기록을 현재 목록과 섞거나 가족이 중단 여부를 추측하지 않습니다.",
        "모르는 내용은 ‘모름’ 또는 ‘확인 필요’라고 씁니다. 알레르기나 복용약을 기억하지 못하는 것과 없다고 확인한 것은 다릅니다. 기관별 문서가 다르면 어느 날짜의 어떤 자료인지 함께 보여 주고 의료진·약사에게 확인합니다.",
        "검사 결과는 원문을 보관하고 무엇을 설명받았는지, 다시 확인할 시점을 메모합니다. 결과지의 표시만 보고 새 병명을 만들어 넣지 않습니다. 오래된 요약밖에 없더라도 어떤 부분이 오래됐고 무엇이 바뀌었는지 알리는 데 사용할 수 있습니다.",
      ], sourceIds: ["SUP-PARENT-FDA-LIST", "SUP-PARENT-RECORDS", "SUP-PARENT-TALK"], links: [{ href: "/health/guides/reading-health-results", label: "검사 숫자·참고범위를 확진과 혼동하지 않고 읽기" }] },
      { title: "진료 뒤에는 ‘다음 행동’을 짧게 확인합니다", paragraphs: [
        "동행했다면 본인이 어떤 설명을 들었고 무엇이 궁금한지 먼저 확인합니다. 필요한 메모를 돕되 본인이 느낀 불편과 가족이 관찰한 점을 구분합니다. 확실하지 않은 내용을 가족끼리 정답으로 채우지 않습니다.",
        "지금 할 일, 다음 진료·검사 시점, 결과를 받을 방법, 그전에 문제가 생기면 문의할 곳을 확인하세요. 이해가 어려운 안내는 다시 설명하거나 적어 달라고 요청할 수 있습니다. 일정을 기록했다고 예약이 자동으로 끝난 것은 아니므로 필요한 예약 절차도 확인합니다.",
      ], sourceIds: ["SUP-PARENT-TALK"], links: [{ href: "/health/guides/appointment-questions", label: "진료에서 다음 일정·결과·문의처를 확인할 질문" }] },
      { title: "공유할 사람과 보관 위치를 함께 정합니다", paragraphs: [
        "도움을 맡은 가족이 바뀌면 부모님이 동의한 범위에서 최신 요약이 있는 곳, 확인된 변경, 아직 답을 받지 못한 질문을 전달합니다. 가족 모두에게 모든 원본을 보내는 방식만 있는 것은 아닙니다. 종이 사본·휴대전화 메모 중 본인이 찾고 관리하기 쉬운 방법을 고릅니다.",
        "공개 링크나 공개 문의 채널에 건강정보를 올리지 않습니다. 기록을 찾는 안내표에 앱 비밀번호를 함께 적거나, 필요하지 않은 식별정보를 모으는 방식은 피하세요. 오래된 사본은 최신본과 구분하고 원본을 함부로 버리지 않습니다.",
        "돌보는 사람도 자신의 생활과 건강을 챙길 필요가 있습니다. 할 일을 한 사람이 모두 떠맡는 대신 필요한 도움과 교대할 때 전달할 범위를 상의합니다. 약을 실제로 챙길 때의 어려움은 별도 복약 지원 안내를 참고하세요.",
      ], sourceIds: ["SUP-PARENT-NHS-CARERS", "SUP-PARENT-FDA-LIST", "SUP-PARENT-FDA-CARING"], links: [{ href: "/health/guides/family-medication-support", label: "동의한 범위에서 약 혼동·잊음·삼킴 어려움을 돕기" }] },
      { id: "urgent-action", title: "응급상황에서는 기록을 찾느라 기다리지 않습니다", paragraphs: [
        "심한 호흡곤란이나 반응이 떨어지는 변화 등 위급한 상태이면 즉시 119에 연락합니다. 파일·약 목록·결과지를 모두 찾거나 가족끼리 기록을 맞춰 본 뒤 신고하는 것이 아닙니다. 아는 정보를 전하고, 모르는 것은 모른다고 답합니다. 요약표가 없다고 도움 요청을 미루지 마세요.",
      ], tone: "warning", sourceIds: ["SUP-PARENT-EMERGENCY"], links: [{ href: "/health/guides/danger-signals", label: "건강정보 정리보다 즉시 도움받아야 할 위험 신호" }] },
    ],
    faq: [
      { question: "한 장만 만들면 원본 기록은 없어도 되나요?", answer: "요약과 원본의 역할은 다릅니다. 요약에는 필요한 정보를 찾을 위치·기관·날짜를 함께 적고, 정확한 검사 결과와 처방 안내는 원문으로 확인할 수 있게 둡니다. 한 장에 모두 옮겨 진단 내용을 다시 만드는 것이 아닙니다.", sourceIds: ["SUP-PARENT-RECORDS", "SUP-PARENT-TALK"] },
      { question: "이번에 새로 바뀐 약만 적으면 되나요?", answer: "현재 사용하는 전체 목록을 유지하고, 확인된 변경과 날짜를 별도로 표시합니다. 새 약만 남기거나 과거 중단약을 현재 약으로 자동 합치지 않습니다. 중단·사용법이 불분명하면 의료진·약사에게 확인합니다.", sourceIds: ["SUP-PARENT-FDA-LIST", "SUP-PARENT-FDA-CARING"] },
      { question: "기억나지 않는 알레르기는 ‘없음’으로 적어도 되나요?", answer: "기억나지 않는 것과 없다고 확인한 것은 다릅니다. ‘모름·확인 필요’라고 표시하고 어떤 내용을 확인해야 하는지 남깁니다. 건강정보를 완성하려고 가족이 추측해 채우지 않습니다.", sourceIds: ["SUP-PARENT-RECORDS", "SUP-PARENT-TALK"] },
      { question: "병원마다 기록이 다르면 하나로 고쳐도 되나요?", answer: "자료의 날짜와 기관을 구분한 채 차이가 있는 내용을 보여 주고 설명을 요청합니다. 가족이 임의로 병명·약 정보를 고치거나 서로 다른 문서를 같은 시점의 정보처럼 합치지 않습니다.", sourceIds: ["SUP-PARENT-RECORDS", "SUP-PARENT-TALK"] },
      { question: "형제자매에게 모든 기록을 공유해야 하나요?", answer: "먼저 부모님이 원하는 도움과 공유 범위를 상의합니다. 필요한 사람에게 필요한 정보를 전하는 방식도 가능합니다. 기록을 보관하는 것이 치료를 대신 결정할 권한을 자동으로 주는 것은 아닙니다.", sourceIds: ["SUP-PARENT-NHS-CARERS", "SUP-PARENT-FDA-LIST"] },
      { question: "마지막 확인일은 병원에서 검사한 날인가요?", answer: "이 정리 예시의 마지막 확인일은 가족이 해당 자료를 확인한 날입니다. 검사 시행일·다음 예약일과 별도로 적고, 의료진이 상태를 재평가한 날짜로 바꾸지 않습니다. 날짜가 불확실하면 확인 필요라고 표시하세요.", sourceIds: ["SUP-PARENT-RECORDS", "SUP-PARENT-FDA-LIST"] },
    ],
    sources: [
      { id: "SUP-PARENT-RECORDS", organization: "NIH/NLM MedlinePlus", title: "Personal Health Records", url: "https://medlineplus.gov/personalhealthrecords.html", sourceDate: "2019-10-17 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-PARENT-NHS-CARERS", organization: "NHS", title: "Medicines: tips for carers", url: "https://www.nhs.uk/social-care-and-support/practical-tips-if-you-care-for-someone/medicines-tips-for-carers/", sourceDate: "2024-04-25 (Page last reviewed)", retrievedAt: "2026-09-06" },
      { id: "SUP-PARENT-FDA-LIST", organization: "U.S. FDA", title: "Create and Keep a Medication List for Your Health", url: "https://www.fda.gov/consumers/consumer-updates/create-and-keep-medication-list-your-health", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-PARENT-TALK", organization: "NIH/NLM MedlinePlus", title: "Talking With Your Doctor", url: "https://medlineplus.gov/talkingwithyourdoctor.html", sourceDate: "2024-10-05 (Last updated)", retrievedAt: "2026-09-06" },
      { id: "SUP-PARENT-FDA-CARING", organization: "U.S. FDA / Office of Women's Health", title: "Caring for Others: Resources to Help You", url: "https://www.fda.gov/consumers/womens-health-topics/caring-others-resources-help-you", sourceDate: "HTML 본문 자체 날짜 미표시", retrievedAt: "2026-09-06" },
      { id: "SUP-PARENT-EMERGENCY", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Recognizing medical emergencies", url: "https://medlineplus.gov/ency/article/001927.htm", sourceDate: "2025-01-08 (Review Date)", retrievedAt: "2026-09-06" },
    ],
  },
];

export function getHealthSupportGuide(slug: string) {
  return healthSupportGuides.find((guide) => guide.slug === slug);
}
