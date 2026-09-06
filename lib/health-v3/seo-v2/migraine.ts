import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const migraineSources: HealthSource[] = [
  { id: "SRC-MEDLINEPLUS-MIGRAINE", organization: "NIH/MedlinePlus", title: "Migraine", url: "https://medlineplus.gov/migraine.html", sourceDate: "2025-11-20 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-HEADACHE", organization: "NIH/MedlinePlus", title: "Headache", url: "https://medlineplus.gov/headache.html", sourceDate: "2025-11-19 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-MIGRAINE", organization: "질병관리청 국가건강정보포털", title: "편두통", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6557", sourceDate: "2026-06-05 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-AMC-MIGRAINE", organization: "서울아산병원", title: "편두통(Migraine)", url: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31876", sourceDate: "페이지 등록·수정일 미표시", retrievedAt: checkedAt },
  { id: "SRC-NHS-MIGRAINE", organization: "NHS", title: "Migraine", url: "https://www.nhs.uk/conditions/migraine/", sourceDate: "2026-03-10 (페이지 검토일; 영상 검토일과 구분)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-HEADACHE-DANGER", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Headaches - danger signs", url: "https://medlineplus.gov/ency/patientinstructions/000424.htm", sourceDate: "2025-10-27 (Review Date; 오누림 검수 아님)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-MIGRAINE-HOME", organization: "MedlinePlus Medical Encyclopedia / A.D.A.M.", title: "Managing migraines at home", url: "https://medlineplus.gov/ency/patientinstructions/000420.htm", sourceDate: "2023-12-31 (Review Date; 참고문헌 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-CDC-STROKE-SIGNS", organization: "CDC", title: "Signs and Symptoms of Stroke", url: "https://www.cdc.gov/stroke/signs-symptoms/index.html", sourceDate: "2026-05-19 (페이지 표시일)", retrievedAt: checkedAt },
];

// NINDS remains in the unchanged historic claim registry; its current page
// could not be read. This article explicitly cites the sources checked above.
export const migraineArticle: HealthArticle = {
  slug: "migraine", seoTitle: "편두통: 증상 흐름·두통 일지·응급 신호 구분",
  title: "편두통이 걱정될 때, 평소 두통 패턴과 새 변화를 나눠 보기",
  eyebrow: "뇌·마음 · 두통 전후를 설명하는 기록",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "편두통은 한쪽 통증만으로 판단하지 않습니다. 두통 전후의 변화, 조짐 설명의 한계, 두통·약 사용 기록과 즉시 도움을 받아야 하는 신호를 정리합니다.",
  outcome: "두통 위치만으로 진단하지 않고 평소의 흐름을 설명하며, 새 신경 증상과 갑작스러운 극심한 두통에는 기록보다 도움을 먼저 요청할 수 있습니다.",
  archetype: "BODY_SIGNAL",
  summary: [
    "편두통은 메스꺼움·빛과 소리 민감성 등 여러 변화가 함께 나타날 수 있는 질환입니다. 한쪽이 아픈지 여부만으로 판단하지 않습니다.",
    "같은 사람도 매번 같은 단계를 겪지는 않습니다. 시작 방식과 동반 변화, 일상 영향, 실제 약 사용을 구분해 설명합니다.",
    "갑자기 시작된 극심한 두통이나 갑작스러운 말·시야 이상, 한쪽 힘 빠짐은 즉시 119에 연락할 신호입니다. 평소 편두통이나 전조라고 넘기지 마세요.",
  ],
  sections: [
    { title: "새로운 위험 신호라면 두통 일지보다 119가 먼저입니다", paragraphs: [
      "갑자기 시작된 극심한 두통이 있으면 즉시 119에 연락합니다. 갑작스러운 말하기·이해하기 어려움, 시야 이상, 한쪽 얼굴·팔·다리의 힘 빠짐이나 감각 이상, 균형 상실도 각각 즉시 도움을 요청할 신호입니다. 두통과 이 변화가 모두 있어야 하는 조건이 아닙니다.",
      "새 의식 저하·혼돈이나 경련이 있으면 즉시 119에 연락합니다. 증상이 잠깐 좋아졌거나 예전에 편두통을 진단받았다는 이유로 기다리지 않습니다. 직접 운전하지 말고 신고를 받은 사람의 안내를 따르세요.",
      "머리를 다친 뒤 두통이 생기거나, 두통에 발열 또는 목의 뻣뻣함이 동반되면 즉시 의료 도움을 받으세요. 두 증상이 모두 생길 때까지 기다리지 않습니다. 바로 평가받을 수 없으면 응급의료기관으로 가거나 119에 연락하세요. 심한 통증이나 앞의 신경·의식 변화가 있다면 즉시 119에 연락합니다. 약 반응을 보거나 기록을 완성하느라 도움을 늦추지 마세요.",
    ], claimIds: ["MIG-P3-005"], sourceIds: ["SRC-NHS-MIGRAINE", "SRC-CDC-STROKE-SIGNS", "SRC-MEDLINEPLUS-HEADACHE", "SRC-MEDLINEPLUS-HEADACHE-DANGER"], tone: "warning", imageId: null,
      links: [{ href: "/health/stroke", label: "잠깐 호전되어도 넘기지 않는 뇌졸중 신호" }, { href: "/health/guides/danger-signals", label: "갑작스러운 몸의 위험 신호와 도움 요청" }] },
    { title: "한쪽 머리 통증만을 뜻하는 말은 아닙니다", paragraphs: [
      "편두통이라는 이름 때문에 ‘한쪽이 아파야 한다’고 생각하기 쉽습니다. 실제로는 양쪽이나 머리 전체에 통증을 느끼기도 합니다. 욱신거림, 메스꺼움, 빛·소리에 대한 민감성, 움직일 때 더 불편한 양상 등을 함께 살핍니다.",
      "불편이 겉으로 드러나지 않아도 일·학업·집안일을 멈추게 할 수 있습니다. 단순히 참고 버텨야 하는 성격 문제로 보지 말고, 어떤 일을 하기 어려웠는지 진료에서 설명해 주세요. 그림의 사람과 같은 모습이어야 편두통이라는 뜻은 아닙니다.",
    ], claimIds: ["MIG-P3-001", "MIG-P3-002"], sourceIds: ["SRC-KDCA-MIGRAINE", "SRC-AMC-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE"], imageId: "migraine-concept" },
    { title: "두통 전·중·후에 내가 느낀 것을 살펴보세요", paragraphs: [
      "통증 전에 피로·하품이나 기분 변화가 있기도 하고, 통증이 있을 때 빛·소리와 메스꺼움이 더 불편하기도 합니다. 통증이 가라앉은 뒤에도 피곤할 수 있습니다. 다만 모든 사람이 모든 변화를 겪거나 같은 순서로 진행하는 것은 아닙니다.",
      "아래 칸은 지나간 경험을 진료에 설명하기 위한 질문입니다. 맞는 칸이 없으면 비워 두고, 기억나지 않으면 추측하지 않습니다. 현재의 갑작스러운 위험 신호를 ‘다음 단계’로 관찰하라는 표가 아닙니다.",
    ], table: { caption: "필수 단계가 아닌, 두통 전후를 돌아보는 질문", columns: ["돌아볼 때", "내 경험에서 적어 볼 내용"], rows: [
      ["통증 전", "평소와 달랐던 수면·피로·기분 변화가 있었나요? 없었다면 없다고 적습니다."],
      ["통증이 있을 때", "언제 어떻게 시작했고, 빛·소리·메스꺼움이나 움직임이 얼마나 불편했나요?"],
      ["통증이 줄어든 뒤", "피로가 남았는지, 일상으로 돌아가는 데 어떤 어려움이 있었나요?"],
    ] }, claimIds: ["MIG-P3-002", "MIG-P3-004"], sourceIds: ["SRC-MEDLINEPLUS-MIGRAINE", "SRC-AMC-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE-HOME"], imageId: null,
      links: [{ href: "/health/guides/symptom-journal", label: "기억한 사실과 추측을 나누는 증상 기록" }] },
    { title: "‘조짐’이라는 설명으로 새 신경 증상을 확정하지 마세요", paragraphs: [
      "일부 사람은 조짐이라고도 부르는 전조를 경험합니다. 시각·감각 등의 변화가 두통 전이나 두통 중에 나타날 수 있지만, 모두가 경험하는 것은 아닙니다. 조짐이 없는 편두통도 있으며, 온라인 설명만으로 지금의 증상을 조짐으로 확정하지 않습니다.",
      "특히 갑작스러운 말·시야 이상이나 한쪽 힘 빠짐을 ‘전조는 원래 이런 것’이라고 기다리지 마세요. 다른 원인과 구별이 필요합니다. 조짐의 일반적인 지속 시간을 읽었더라도 그 시간이 지날 때까지 기다리는 안전선으로 사용하지 않습니다.",
      "이미 개인별 평가와 안내를 받은 경우에는 자신에게 설명된 대응 계획을 확인합니다. 그래도 새롭거나 평소와 다른 급한 변화가 있으면 의료 도움을 먼저 요청합니다. 머리가 아프지 않거나 증상이 호전되는 것만으로 응급 원인을 배제하지 않습니다.",
    ], claimIds: ["MIG-P3-002", "MIG-P3-003", "MIG-P3-005"], sourceIds: ["SRC-KDCA-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE", "SRC-NHS-MIGRAINE", "SRC-CDC-STROKE-SIGNS"], imageId: null },
    { title: "검사 결과 하나보다 병력과 진찰이 먼저 필요한 이유", paragraphs: [
      "진료에서는 시작 시기, 반복 양상, 위치·느낌, 동반 변화와 생활 영향을 묻고 신체·신경학적 진찰을 합니다. CT·MRI 등은 다른 원인을 확인할 필요에 따라 선택합니다. 모든 두통에 같은 영상검사가 필요하거나, 영상이 정상이면 편두통으로 확정된다는 뜻은 아닙니다.",
      "‘검사는 무엇을 확인하려는 건가요?’, ‘검사가 필요하지 않다면 어떤 변화가 생길 때 다시 연락해야 하나요?’를 물어보세요. 예전 검사 결과도 가져갈 수 있지만, 새로운 증상에 대한 평가를 대신하는 자료로 보지는 않습니다.",
    ], claimIds: ["MIG-P3-003"], sourceIds: ["SRC-KDCA-MIGRAINE", "SRC-AMC-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE"], imageId: null,
      links: [{ href: "/health/guides/reading-health-results", label: "검사 결과와 다음 평가 계획을 함께 읽기" }] },
    { title: "두통이 있었던 날과 급성기 약을 사용한 날을 따로", paragraphs: [
      "진료에는 ‘자주 아파요’뿐 아니라 두통이 있던 날, 어떤 약을 실제로 사용한 날, 사용 후 변화가 각각 도움이 됩니다. 약 이름을 모르겠다면 처방전이나 포장 정보를 가져가 확인합니다. 이 기록은 약을 더 먹어도 되는 날을 계산하는 도구가 아닙니다.",
      "수면·식사·활동과 두통이 겹친 상황도 남길 수 있습니다. 한 번 겹쳤다는 이유만으로 음식 하나를 원인으로 확정하지 마세요. 여러 날의 흐름을 의료진과 함께 보고, 이미 처방된 예방약의 계획된 사용과 급성 증상 때문에 추가로 사용한 약을 구분합니다.",
    ], table: { caption: "두통 일지에 남길 서로 다른 정보", columns: ["두통·생활 기록", "실제 약 사용 기록"], rows: [
      ["발생한 날과 시작 방식, 지속한 정도", "어떤 약을 어느 날 사용했는지, 처방된 목적"],
      ["빛·소리 민감성·메스꺼움 등 동반 변화", "사용 뒤 도움이 되었는지, 불편한 반응은 없었는지"],
      ["수면·식사 맥락과 중단한 일상 활동", "다른 처방약·일반약·보충제도 함께 사용했는지"],
    ] }, claimIds: ["MIG-P3-003", "MIG-P3-004"], sourceIds: ["SRC-KDCA-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE-HOME", "SRC-NHS-MIGRAINE"], imageId: "migraine-action",
      links: [{ href: "/health/tools/migraine-visit-card", label: "편두통 관찰·진료 질문 카드" }, { href: "/health/guides/medication-list", label: "사용 중인 약을 함께 알리는 목록" }] },
    { title: "치료의 목적과 다시 연락할 시점을 확인하세요", paragraphs: [
      "급성기 치료는 현재 발작의 증상을 줄이는 목적이고, 예방치료는 앞으로의 발작과 생활 부담을 줄이는 목적입니다. 필요성·방법은 빈도·심한 정도·다른 건강 상태에 따라 정합니다. 모든 사람이 같은 약을 매일 복용하는 계획은 아닙니다.",
      "통증 때문에 쓰는 약의 사용일이 늘거나 이전 치료가 잘 듣지 않으면 의료진에게 알립니다. 급성기 약을 자주 쓰는 양상은 약물 과용에 의한 두통 가능성도 함께 평가할 정보입니다. 여기서는 하나의 횟수를 안전한 한도로 정하거나 예방약에도 같은 제한을 적용하지 않습니다. 약을 혼자 늘리거나 바꾸거나 중단하지 마세요.",
      "두통의 패턴·강도가 달라지거나, 평소보다 길어지거나, 일상을 유지하기 어려우면 진료팀에 연락해 평가 시점을 확인합니다. 임신 중이거나 출산 직후의 두통은 신속히 의료진과 상담하세요. 앞의 응급 신호는 예약일까지 기다릴 상황이 아닙니다.",
      "생활 관리는 자신에게 맞는 수면·식사·활동 리듬을 찾는 보조입니다. 모든 유발 요인을 피해야 낫는다고 부담을 주거나 특정 식품·보충제를 치료제로 삼지 않습니다. 조용한 곳에서 쉬는 행동도 새 신경 증상의 응급 평가를 대신하지 않습니다.",
    ], claimIds: ["MIG-P3-004", "MIG-P3-005"], sourceIds: ["SRC-NHS-MIGRAINE", "SRC-KDCA-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE", "SRC-MEDLINEPLUS-HEADACHE-DANGER"], imageId: null,
      links: [{ href: "/health/guides/appointment-questions", label: "약의 목적·재연락 기준을 묻는 진료 질문" }] },
  ],
  faq: [
    { question: "양쪽 머리가 아프면 편두통은 아닌가요?", answer: "양쪽이나 전체에 통증을 느끼기도 합니다. 위치 하나가 아니라 시작·반복 양상과 동반 증상·진찰을 함께 보며 판단합니다.", claimIds: ["MIG-P3-002", "MIG-P3-003"], sourceIds: ["SRC-KDCA-MIGRAINE", "SRC-AMC-MIGRAINE"] },
    { question: "반짝임이나 저림이 생기면 전조니까 기다려도 되나요?", answer: "온라인 설명으로 전조를 확정하지 않습니다. 갑작스러운 말·시야 이상이나 한쪽 힘 빠짐 등은 즉시 119에 연락할 신호입니다. 두통이 없거나 잠깐 좋아져도 무시하지 않고, 일반적인 전조 지속 시간을 대기 기준으로 쓰지 않습니다.", claimIds: ["MIG-P3-002", "MIG-P3-005"], sourceIds: ["SRC-NHS-MIGRAINE", "SRC-CDC-STROKE-SIGNS", "SRC-KDCA-MIGRAINE"] },
    { question: "CT나 MRI가 정상이면 편두통으로 확정되나요?", answer: "영상 하나로 확정하는 병이 아닙니다. 병력·진찰이 중요하고 다른 원인을 확인할 필요에 따라 검사를 선택합니다. 새 증상이 생기면 예전 정상 검사만으로 평가를 끝내지 않습니다.", claimIds: ["MIG-P3-003"], sourceIds: ["SRC-AMC-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE"] },
    { question: "두통 일지에는 무엇을 남기면 좋나요?", answer: "시작·지속, 동반 변화, 수면·식사 맥락, 실제 약 사용과 반응, 일상 영향을 간단히 남깁니다. 추측한 원인과 실제 경험을 구분하며 응급 신호가 있다면 기록보다 도움 요청이 먼저입니다.", claimIds: ["MIG-P3-004", "MIG-P3-005"], sourceIds: ["SRC-KDCA-MIGRAINE", "SRC-MEDLINEPLUS-MIGRAINE-HOME", "SRC-NHS-MIGRAINE"] },
    { question: "진통제를 쓰는 날이 늘면 어떻게 하나요?", answer: "약 이름과 사용일·반응을 정리해 상담합니다. 약 종류와 사용 양상을 함께 평가해야 하므로 자가 증량하거나 약을 바꿔 돌려 먹지 않습니다. 처방된 예방약의 사용을 급성기 약 과용과 똑같이 취급하지 않습니다.", claimIds: ["MIG-P3-004"], sourceIds: ["SRC-NHS-MIGRAINE", "SRC-KDCA-MIGRAINE"] },
    { question: "아프지 않은 날에도 예방치료를 하는 이유는 무엇인가요?", answer: "현재 증상 완화와 앞으로의 발작·생활 부담 감소는 목적이 다릅니다. 예방치료 필요성·방식·평가 시점은 개인별로 결정합니다. 약을 스스로 골라 시작하거나, 처방된 사용법을 임의로 바꾸거나 중단하지 않습니다.", claimIds: ["MIG-P3-004"], sourceIds: ["SRC-MEDLINEPLUS-MIGRAINE", "SRC-NHS-MIGRAINE"] },
  ],
  sourceIds: migraineSources.map(s=>s.id), imageIds: ["migraine-hero", "migraine-concept", "migraine-action"],
  visuals: {
    "migraine-hero": { src: "/images/onurim/migraine/hero.webp", alt: "진료 메모와 상담 준비를 상징하는 초록·노랑 장식 표지 삽화", caption: "표지의 선과 십자 모양은 뇌 검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "migraine-concept": { src: "/images/onurim/migraine/concept-v2.webp", alt: "가상 성인 곁에 빛·소리, 메스꺼움, 피로와 휴식을 상징하는 작은 장면을 배치한 편두통 동반 변화 삽화", caption: "빛·소리 민감성, 메스꺼움, 피로를 상징한 AI 생성 삽화입니다. 전구는 전조의 섬광, 위 모양은 장기 손상, 누운 모습은 치료 효과를 뜻하지 않습니다. 모두에게 필요한 단계나 진단 기준이 아니며, 새 신경 증상을 잠으로 넘기라는 안내가 아닙니다.", width: 1536, height: 1024 },
    "migraine-action": { src: "/images/onurim/migraine/action-v2.webp", alt: "가상 성인이 두통 기록과 약 사용 기록이라는 빈 양식 앞에서 연필을 든 AI 생성 장면", caption: "실제 환자·진료 기록이 아닌 AI 생성 장면입니다. 두통과 이미 사용한 약을 설명하는 빈 기록 예시이지 약을 먹을 날짜·횟수·용량을 정하는 일정표가 아닙니다. 응급 신호가 있으면 작성보다 도움 요청이 먼저입니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["migraine-visit-card"],
};
