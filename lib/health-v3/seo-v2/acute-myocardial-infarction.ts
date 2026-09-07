import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
export const myocardialInfarctionSources: HealthSource[] = [
  { id: "SRC-KDCA-CARDIO-2026", organization: "질병관리청", title: "갑작스러운 마비·언어장애·가슴통증… 뇌졸중·심근경색 조기 대응 중요", url: "https://www.kdca.go.kr/kdca/2847/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa2RjYSUyRjQxJTJGMzEwMDYxJTJGYXJ0Y2xWaWV3LmRvJTNGcGFzc3dvcmQlM0QlMjZyZ3NCZ25kZVN0ciUzRCUyNmZpbmRPcG53cmQlM0QlMjZmaW5kV29yZCUzRCUyNnJnc0VuZGRlU3RyJTNEJTI2ZmluZFR5cGUlM0QlMjZmaW5kQ2xTZXElM0QlMjZwYWdlJTNEMSUyNg%3D%3D", sourceDate: "2026-02-11 (최종수정; 작성2026-02-10)", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-HEART-ATTACK", organization: "NIH/NHLBI", title: "Heart Attack — What Is a Heart Attack?", url: "https://www.nhlbi.nih.gov/health/heart-attack", sourceDate: "2022-03-24 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-HEART-ATTACK-SYMPTOMS", organization: "NIH/NHLBI", title: "Heart Attack Symptoms", url: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms", sourceDate: "2022-03-24 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-KDCA-MYOCARDIAL-INFARCTION", organization: "질병관리청 국가건강정보포털", title: "급성 심근경색증", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6770", sourceDate: "2026-04-23 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-HEART-ATTACK-DIAGNOSIS", organization: "NIH/NHLBI", title: "Heart Attack Diagnosis", url: "https://www.nhlbi.nih.gov/health/heart-attack/diagnosis", sourceDate: "2022-03-24 (Last updated)", retrievedAt: checkedAt },
  { id: "SRC-NHS-HEART-ATTACK", organization: "NHS", title: "Heart attack", url: "https://www.nhs.uk/conditions/heart-attack/", sourceDate: "2026-03-31 (Page last reviewed)", retrievedAt: checkedAt },
  { id: "SRC-CDC-HEART-ATTACK", organization: "CDC", title: "About Heart Attack Symptoms, Risk, and Recovery", url: "https://www.cdc.gov/heart-disease/about/heart-attack.html", sourceDate: "2024-10-24 (페이지 표시일)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-TROPONIN", organization: "NIH/NLM MedlinePlus", title: "Troponin Test", url: "https://medlineplus.gov/lab-tests/troponin-test/", sourceDate: "2023-10-30 (Last updated; 고정 재검시간 지시로 사용하지 않음)", retrievedAt: checkedAt },
];

export const myocardialInfarctionArticle: HealthArticle = {
  slug: "acute-myocardial-infarction", seoTitle: "급성심근경색 증상: 심한 흉통을 기다리지 말아야 하는 이유",
  title: "급성심근경색, 얼마나 아파야 119를 불러야 할까요?",
  eyebrow: "심장·혈관 · 통증 강도보다 의심될 때 행동",
  publishedAt: "2026-08-26", updatedAt: checkedAt, sourceCheckedAt: checkedAt,
  description: "심근경색이 의심되면 확신이 없어도 즉시 119에 연락합니다. 약하거나 오락가락하는 증상을 넘기지 않는 이유, 약 때문에 신고를 늦추지 않을 원칙과 심전도·트로포닌 검사의 역할을 설명합니다.",
  outcome: "통증 강도나 지속시간을 채우려 기다리지 않고 도움을 요청하며, 증상과 검사 결과를 함께 보는 이유를 이해합니다.",
  archetype: "QUESTION_FIRST",
  summary: [
    "심근경색은 반드시 극심한 흉통으로 시작하지 않습니다. 가슴의 압박·불편, 퍼지는 통증, 숨참 등으로 의심된다면 확신이 없어도 즉시 119에 연락합니다.",
    "직접 운전하거나 가족을 기다리지 않습니다. 아스피린이나 소화제를 찾거나 효과를 확인하느라 신고를 늦추지 말고 119의 안내를 받습니다.",
    "의료진은 증상·병력·심전도·혈액검사를 함께 봅니다. 트로포닌은 심장근육 손상과 관련된 단백질이며 수치 하나만으로 심근경색의 원인·안전을 확정하지 않습니다.",
  ],
  sections: [
    { title: "지금 이런 변화가 있다면 먼저 119에 연락하세요", paragraphs: [
      "심근경색이 의심되면 확신이 없어도 즉시 119에 연락합니다. 아래 상황은 특히 바로 도움을 요청할 신호입니다. 증상이 모두 나타나거나 통증이 더 심해지기를 기다리지 마세요. 의심 증상이 잠깐 줄어도 신고를 미루지 않습니다.",
    ], bullets: [
      "가슴이 조이거나 짓눌리는 통증·압박감, 또는 팔·목·턱 등으로 퍼지는 가슴 통증",
      "헐떡이거나 말을 내기 어려울 정도의 호흡곤란, 또는 입술·피부가 창백하거나 푸르스름하게 변함",
      "사람이 쓰러져 평소처럼 반응하지 않음 — 즉시 119에 알리고 의식·호흡 상태에 맞는 안내를 따름",
    ], tone: "warning", claimIds: ["AMI-P3-002", "AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-KDCA-CARDIO-2026", "SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-NHS-HEART-ATTACK"], imageId: null,
      links: [{ href: "/health/guides/danger-signals", label: "다른 급한 몸의 변화와 119 도움 안내" }] },
    { title: "약하게 아프거나 체한 느낌이면 아닌가요?", paragraphs: [
      "심근경색 증상은 서서히 시작하거나 약하게 느껴질 수 있고, 나타났다 줄어들기도 합니다. 가슴 중앙·왼쪽의 불편 외에 한쪽 또는 양쪽 팔, 어깨·등·목·턱의 불편, 숨참·식은땀·메스꺼움·어지럼 등이 생길 수 있습니다. 이 목록은 증상 개수를 세는 진단표가 아닙니다.",
      "속이 쓰리거나 더부룩해 소화불량처럼 느낄 수도 있습니다. 어떤 사람은 전형적인 흉통이 뚜렷하지 않습니다. 그렇다고 모든 피로나 메스꺼움이 심근경색이라는 뜻은 아니지만, 가슴 통증이 약하거나 없다는 이유만으로 집에서 배제할 수도 없습니다.",
      "이전에 심근경색을 겪었더라도 다음 증상이 꼭 같지는 않습니다. 성별·나이·과거 경험을 안전 확인표로 쓰지 마세요. 심근경색인지 다른 원인인지 확신이 서지 않을 때도 119에 연락하고 증상을 설명합니다. ‘몇 분 지나면 신고’ 같은 대기 시간을 만들지 않습니다.",
    ], table: { caption: "신고를 미루게 하는 생각과 확인할 원칙", columns: ["망설이는 이유", "놓치지 않을 점"], rows: [
      ["아주 심하게 아픈 것은 아닌데", "심한 통증만이 신고 조건은 아닙니다. 의심되면 즉시 119에 연락합니다."],
      ["아까보다 조금 덜한데", "증상은 오락가락할 수 있어 호전만으로 안전을 정하지 않습니다."],
      ["체한 것 같아서 약부터 먹어 보려는데", "원인이나 약의 반응을 스스로 시험하느라 신고를 늦추지 않습니다."],
    ] }, claimIds: ["AMI-P3-002", "AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-CDC-HEART-ATTACK", "SRC-NHS-HEART-ATTACK"], imageId: null },
    { title: "심장은 혈액을 보내는데, 왜 자기 근육에 피가 부족해지나요?", paragraphs: [
      "심장은 온몸으로 혈액을 보내는 펌프지만 심장근육 자체도 산소를 공급받아야 합니다. 이 근육에 혈액을 보내는 혈관이 관상동맥입니다. 심근경색은 심장근육 일부에 혈액 공급이 충분히 이루어지지 않아 손상이 생기는 응급질환입니다.",
      "관상동맥 벽의 동맥경화 부위와 혈전 때문에 혈류가 막히는 경우가 대표적입니다. 혈관의 심한 경련 등 다른 원인도 있어 모든 사람의 원인이나 막힌 정도가 같지는 않습니다. 그림은 혈액 공급 문제를 이해하는 개념도이며, 해당 부위가 실제로 얼마나 손상됐는지는 검사와 진찰로 평가합니다.",
      "심근경색과 심정지는 같은 말이 아닙니다. 심근경색이 심정지를 일으킬 수는 있지만, 심장근육의 혈액 공급 문제와 심장이 갑자기 멈추는 상태를 같은 그림으로 설명하지 않습니다. 반응하지 않거나 호흡이 이상해지면 119에 즉시 알리고 안내를 따릅니다.",
    ], claimIds: ["AMI-P3-001", "AMI-P3-003", "AMI-P3-005"], sourceIds: ["SRC-KDCA-MYOCARDIAL-INFARCTION", "SRC-NHLBI-HEART-ATTACK", "SRC-CDC-HEART-ATTACK", "SRC-NHS-HEART-ATTACK"], imageId: "acute-myocardial-infarction-concept" },
    { title: "신고한 뒤 어떤 내용을 전하면 되나요?", paragraphs: [
      "본인이나 곁의 사람이 먼저 119에 연락하고, 통화 중 질문에 따라 아는 사실을 전합니다. 아래 네 가지를 전부 알아야 신고할 수 있는 것은 아닙니다. 정확한 시작 시각이나 약 이름을 모르면 모른다고 말하고, 메모를 완성하거나 약 봉투를 찾느라 시간을 보내지 않습니다.",
      "직접 운전하거나 가족이 올 때까지 기다리지 않습니다. 아스피린을 먼저 먹거나 약의 효과를 확인하려고 신고를 늦추지도 않습니다. 약을 쓸지 여부는 119·의료진에게 현재 상황과 알레르기·복용약을 알리고 안내받으세요. 아스피린이 모든 상황에서 금지라는 뜻도, 누구나 같은 양을 먹어도 된다는 뜻도 아닙니다.",
      "이 글은 전화 안내를 대신하는 응급처치 매뉴얼이 아닙니다. 기다리는 동안 새로 생기는 변화, 의식이나 호흡 상태를 알리고 안내를 따릅니다. 스스로 움직여 통증이 재현되는지 시험하거나 맥박·검사값을 확인한 뒤 도움을 결정하지 않습니다.",
    ], bullets: [
      "어디가 어떻게: 가슴·팔·등 등 실제로 불편한 위치와 압박·통증·숨참 같은 느낌",
      "처음 느낀 때: 처음 알아챈 시각과 이후 계속됐는지·줄었다 다시 나타났는지",
      "함께 생긴 변화: 식은땀·메스꺼움·어지럼·호흡이나 반응의 변화 등",
      "알고 있는 약과 병력: 현재 복용약·알레르기·이전에 받은 진단을 아는 범위에서",
    ], claimIds: ["AMI-P3-002", "AMI-P3-003", "AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-KDCA-CARDIO-2026", "SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-NHLBI-HEART-ATTACK-DIAGNOSIS", "SRC-NHS-HEART-ATTACK"], imageId: "acute-myocardial-infarction-action",
      links: [{ href: "/health/tools/acute-myocardial-infarction-visit-card", label: "신고 후 전달 내용과 치료 뒤 질문을 확인할 심근경색 카드" }, { href: "/health/guides/medication-list", label: "평소에 준비할 약·알레르기 목록" }] },
    { title: "심전도와 트로포닌은 서로 무엇을 보나요?", paragraphs: [
      "심전도는 심근경색을 시사하는 변화를 살피는 기본 검사입니다. 의료진은 그 결과에 증상·병력·진찰을 더해 다음 검사를 정합니다. 가족이 심전도 선 모양이나 온라인 그림과 비교해 확진하거나 배제하는 검사는 아닙니다.",
      "트로포닌은 심장근육 세포에 있는 단백질입니다. 심장근육이 손상되면 혈액으로 나와 수치가 높아질 수 있어 혈액검사로 확인합니다. 트로포닌을 ‘효소’라고 부르거나 높은 수치가 곧 심근경색 확진이라고 읽지 않습니다. 다른 원인으로 심장근육이 손상된 경우에도 올라갈 수 있습니다.",
      "처음 검사에서 높지 않았더라도 시점에 따라 뒤의 결과가 달라질 수 있습니다. 의료진이 혈액검사를 반복하는 이유 중 하나는 시간에 따른 변화를 보기 위해서입니다. 반복검사의 간격과 해석은 상황·검사 방식에 따라 판단하므로 온라인 시간표나 숫자로 퇴원·안전을 정하지 않습니다.",
      "필요하면 심장초음파나 관상동맥 조영술 등으로 기능·혈류 문제를 더 확인합니다. 모두에게 모든 검사가 필요한 것은 아닙니다. 현재 증상과 결과를 함께 설명받고, 새 불편이 생기면 검사 순서를 기다리며 참지 말고 곧바로 의료진에게 알립니다.",
    ], table: { caption: "검사 이름과 확인하는 정보 — 한 결과만으로 결론 내리지 않기", columns: ["검사", "주로 보태는 정보"], rows: [
      ["심전도", "심근경색을 시사하는 변화; 병력·증상과 함께 판단"],
      ["트로포닌 혈액검사", "심장근육 손상을 시사하는 단백질 수치와 시간에 따른 변화"],
      ["초음파·관상동맥 조영술 등", "필요에 따라 심장 기능이나 혈관의 혈류 문제를 추가 확인"],
    ] }, claimIds: ["AMI-P3-003"], sourceIds: ["SRC-NHLBI-HEART-ATTACK-DIAGNOSIS", "SRC-MEDLINEPLUS-TROPONIN", "SRC-KDCA-MYOCARDIAL-INFARCTION", "SRC-NHS-HEART-ATTACK"], imageId: null,
      links: [{ href: "/health/guides/reading-health-results", label: "검사 이름·단위·결과의 한계를 읽는 방법" }] },
    { title: "급한 치료 뒤에는 무엇을 확인하나요?", paragraphs: [
      "치료는 혈액 공급을 회복하고 손상을 줄이는 것을 목표로 하며, 약물·시술·수술 중 필요한 방법을 의료진이 판단합니다. 증상 시작이 불명확하거나 시간이 지난 것 같아도 스스로 치료가 불가능하다고 결론 내리지 않습니다. 이 글은 치료 마감시간이나 시술 선택표를 제공하지 않습니다.",
      "퇴원이나 다음 진료를 준비할 때는 약의 역할과 복용 안내, 다시 의심 신호가 생겼을 때의 행동, 다음 방문·재활 계획을 확인합니다. 혈관 시술을 받았다는 이유로 처방약이 더는 필요 없다고 생각하지 않습니다. 약을 놓쳤거나 불편하면 누구에게 연락할지 질문하고 스스로 중단·조절하지 않습니다.",
      "회복 속도와 활동 범위는 사람마다 다릅니다. 직장·이동·운동을 언제 어떻게 늘릴지, 심장재활을 어떻게 이용할지 상의하세요. 평소 혈압·콜레스테롤 관리도 이어가되, 급한 증상이 있을 때 기록값이 괜찮다는 이유로 신고를 미루는 데 쓰지 않습니다.",
    ], claimIds: ["AMI-P3-003", "AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-KDCA-MYOCARDIAL-INFARCTION", "SRC-NHLBI-HEART-ATTACK", "SRC-NHS-HEART-ATTACK", "SRC-CDC-HEART-ATTACK"], imageId: null,
      links: [{ href: "/health/guides/appointment-questions", label: "퇴원·다음 진료에서 확인할 질문" }, { href: "/health/dyslipidemia", label: "급한 대응과 구분해 이어가는 콜레스테롤 관리" }] },
  ],
  faq: [
    { question: "가슴 통증이 심하지 않으면 심근경색이 아닌가요?", answer: "통증 강도만으로 배제하지 않습니다. 약하게 시작하거나 오락가락할 수 있고 흉통이 뚜렷하지 않을 수도 있습니다. 심근경색이 의심되면 확신이 없어도 즉시 119에 연락합니다.", claimIds: ["AMI-P3-002", "AMI-P3-005"], sourceIds: ["SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-CDC-HEART-ATTACK"] },
    { question: "체한 느낌이나 속쓰림으로도 나타날 수 있나요?", answer: "소화불량처럼 느껴질 수 있습니다. 집에서 느낌만으로 구분하거나 소화제 반응을 기다리며 신고를 늦추지 않습니다. 의심 증상이 있으면 119에 먼저 연락하고 어떤 불편인지 설명합니다.", claimIds: ["AMI-P3-002", "AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-NHS-HEART-ATTACK", "SRC-NHLBI-HEART-ATTACK-SYMPTOMS"] },
    { question: "가슴 통증이 몇 분 지속돼야 119를 부르나요?", answer: "기다려야 하는 시간을 정하지 않습니다. 심근경색이 의심되면 즉시 연락합니다. 더 심해지거나 더 오래 지속되는지 시험하지 않고, 잠깐 줄어도 안전하다고 결론 내리지 않습니다.", claimIds: ["AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-KDCA-CARDIO-2026", "SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-CDC-HEART-ATTACK"] },
    { question: "아스피린을 먼저 먹고 지켜보면 되나요?", answer: "아스피린을 찾거나 먹고 효과를 보느라 119 연락을 늦추지 않습니다. 먼저 신고하고 약·알레르기를 알린 뒤 안내를 따릅니다. 모든 상황에서 금지라는 뜻도, 누구나 같은 용량을 써도 된다는 뜻도 아닙니다.", claimIds: ["AMI-P3-004"], sourceIds: ["SRC-NHLBI-HEART-ATTACK-SYMPTOMS", "SRC-NHS-HEART-ATTACK"] },
    { question: "가족 차나 제 차로 가면 더 빠르지 않나요?", answer: "119에 먼저 연락하고 직접 운전하거나 가족 도착을 기다리지 않습니다. 구급대가 상태를 확인하고 필요한 대응을 이어가도록 도움을 요청하세요. 어느 병원으로 갈지 혼자 검색하며 지연하지 않습니다.", claimIds: ["AMI-P3-004", "AMI-P3-005"], sourceIds: ["SRC-KDCA-CARDIO-2026", "SRC-NHLBI-HEART-ATTACK-SYMPTOMS"] },
    { question: "첫 트로포닌 검사만 보면 알 수 있나요?", answer: "의료진은 증상·병력·심전도와 혈액검사, 시간에 따른 변화를 함께 봅니다. 초기에 높지 않았다고 안전을 확정하거나, 높다는 이유만으로 원인을 심근경색으로 단정하지 않습니다. 결과 설명과 다음 검사·행동 계획을 확인하세요.", claimIds: ["AMI-P3-003"], sourceIds: ["SRC-NHLBI-HEART-ATTACK-DIAGNOSIS", "SRC-MEDLINEPLUS-TROPONIN"] },
  ],
  sourceIds: myocardialInfarctionSources.map(s=>s.id),
  imageIds: ["acute-myocardial-infarction-hero", "acute-myocardial-infarction-concept", "acute-myocardial-infarction-action"],
  visuals: {
    "acute-myocardial-infarction-hero": { src: "/images/onurim/acute-myocardial-infarction/hero.webp", alt: "메모판과 도움 연결을 상징하는 분홍·초록 장식 표지 삽화", caption: "표지 도형은 심장 검사 결과나 의료인 검수 완료 표시가 아닙니다.", width: 1536, height: 1024 },
    "acute-myocardial-infarction-concept": { src: "/images/onurim/acute-myocardial-infarction/concept-v2.webp", alt: "심장 표면의 관상동맥과 심장근육, 혈류를 방해하는 혈관 벽 변화·혈전의 확대 개념도", caption: "AI 생성 개념도입니다. 오른쪽 혈관 확대도 안의 노란 부분은 혈관벽의 플라크, 짙은 붉은 덩어리는 혈전을 단순화한 표현입니다. 관상동맥의 혈액 공급이 방해되는 대표 상황이며 실제 혈관 지도·손상 영역·폐색률·모든 원인을 나타내지 않습니다. 완전 폐색이 모든 심근경색의 필수 조건이라는 뜻이나 심장이 멈췄다는 그림도 아닙니다.", width: 1536, height: 1024 },
    "acute-myocardial-infarction-action": { src: "/images/onurim/acute-myocardial-infarction/action-v2.webp", alt: "먼저 119에 전화하는 가상 인물과 어디가 어떻게·처음 느낀 때·함께 생긴 변화·알고 있는 약의 빈 기록 칸", caption: "AI 생성 가상 장면입니다. 먼저 119에 연락한 뒤 아는 사실을 전합니다. 네 칸이 신고 조건이나 진단 점수는 아니며 모르면 모른다고 말합니다. 카드 완성·약 찾기·시각 확인 때문에 신고를 늦추지 않습니다.", width: 1536, height: 1024 },
  },
  toolSlugs: ["acute-myocardial-infarction-visit-card"],
};
