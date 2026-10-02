import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const niddk = "https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/";
export const masldSources: HealthSource[] = [
  { id: "SRC-NIDDK-MASLD-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts of NAFLD & NASH", url: `${niddk}definition-facts`, sourceDate: "2021-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-MASLD-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of NAFLD & NASH", url: `${niddk}symptoms-causes`, sourceDate: "2021-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-MASLD-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of NAFLD & NASH", url: `${niddk}diagnosis`, sourceDate: "2021-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-MASLD-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for NAFLD & NASH", url: `${niddk}treatment`, sourceDate: "2021-04 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-AMC-FATTY-LIVER", organization: "서울아산병원", title: "지방간(Fatty liver)", url: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31685", sourceDate: "페이지 표시일 미확인", retrievedAt: checkedAt },
  { id: "SRC-KDCA-LIVER-TESTS", organization: "질병관리청 국가건강정보포털", title: "간기능검사", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5444", sourceDate: "2026-05-06 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-AASLD-MASLD-NAME", organization: "미국간학회(AASLD)", title: "New MASLD Nomenclature", url: "https://www.aasld.org/new-masld-nomenclature", sourceDate: "페이지 표시일 미확인 (명칭 발표 2023-06과 구분)", retrievedAt: checkedAt },
  { id: "SRC-EASL-MASLD-2024", organization: "EASL·EASD·EASO", title: "Clinical Practice Guidelines on the management of MASLD (496·513쪽 등)", url: "https://easlcampus.eu/sites/default/files/2024-08/EASL_CPGs_management_of_MASLD.pdf", sourceDate: "2024-06-07 (온라인 공개; 학술지 2024-09)", retrievedAt: checkedAt },
  { id: "SRC-NHS-JAUNDICE", organization: "NHS", title: "Jaundice", url: "https://www.nhs.uk/conditions/jaundice/", sourceDate: "2024-01-22", retrievedAt: checkedAt },
  { id: "SRC-NHS-VOMITING-BLOOD", organization: "NHS", title: "Vomiting blood", url: "https://www.nhs.uk/symptoms/vomiting-blood/", sourceDate: "2025-08-18", retrievedAt: checkedAt },
  { id: "SRC-NHS-SUDDEN-CONFUSION", organization: "NHS", title: "Sudden confusion (delirium)", url: "https://www.nhs.uk/symptoms/confusion/", sourceDate: "2024-05-28", retrievedAt: checkedAt },
  { id: "SRC-NHS-ALCOHOL-USE-DISORDER", organization: "NHS", title: "Alcohol-use disorder", url: "https://www.nhs.uk/conditions/alcohol-use-disorder/", sourceDate: "2026-04-24", retrievedAt: checkedAt },
];

// A separately sourced editorial expansion, not a rewrite or clinical approval
// of the original 144 claims or the original 47-claim medical-review packet.
export const masldArticle: HealthArticle = {
  "slug": "metabolic-dysfunction-associated-steatotic-liver-disease",
  "seoTitle": "지방간(MASLD): 간효소·초음파·탄성도검사 결과 구분",
  "title": "간 수치는 정상인데 초음파는 지방간, 두 결과를 함께 읽기",
  "eyebrow": "위장·간 · 결과가 다르게 보일 때의 질문",
  "publishedAt": "2026-08-26",
  "updatedAt": "2026-10-01",
  "sourceCheckedAt": "2026-10-01",
  "description": "정상 표시가 있는 혈액검사와 지방간이라는 초음파 소견은 왜 함께 나올까요? 가상 결과표 두 장으로 각 검사가 확인하는 것을 구분하고, 기존 결과 원문과 음주·약 정보를 진료 질문으로 연결합니다.",
  "outcome": "서로 다른 간 검사 결과를 혼자 채점하지 않고, 어떤 상태를 확인했으며 무엇을 더 물을지 정리할 수 있습니다.",
  "archetype": "QUESTION_FIRST",
  "summary": [
    "간 수치가 참고범위 안이라는 결과와 초음파의 지방간 소견은 함께 나올 수 있습니다.",
    "지방 축적·염증과 손상·섬유화는 같은 말이 아니며 검사마다 확인할 수 있는 내용도 다릅니다.",
    "검사표를 보고 약·보충제를 시작하지 않습니다. 음주와 현재 치료, 새 증상을 함께 알립니다."
  ],
  "sections": [
    {
      "title": "새 황달과 응급 변화는 다음 검진까지 미루지 마세요",
      "paragraphs": [
        "피부나 눈 흰자가 새로 노래지면 빠른 의료 평가가 필요합니다. 당일 의료기관에 연락해 신속한 진료를 받으세요. 지방간 때문이라고 단정하거나 정기검진일까지 기다리지 않습니다.",
        "갑작스러운 혼란이나 평소와 다른 의식·인지 변화는 즉시 119에 도움을 요청할 신호입니다.",
        "피를 토하는 중이거나 이미 토했고 어지럼·혼란·전반적으로 몸이 좋지 않음·빠르거나 얕은 호흡·창백한 피부와 식은땀·복통·검은 변 중 하나라도 있으면 즉시 119에 연락합니다.",
        "토혈이 멈췄고 다른 증상이 없어도 당일 의료기관에 연락해 신속한 평가를 받습니다. 토혈은 항상 의료 도움을 받아야 하며, 계속 토하고 있다면 멈추기를 기다리지 말고 즉시 의료 도움을 요청하세요.",
        "직접 운전하거나 기록을 완성하느라 지연하지 않습니다. 이런 변화가 있다고 MASLD나 간경변이 확정되는 것은 아니므로 온라인에서 원인을 단정하지 않습니다."
      ],
      "claimIds": [
        "MASLD-P3-005"
      ],
      "sourceIds": [
        "SRC-NHS-JAUNDICE",
        "SRC-NHS-VOMITING-BLOOD",
        "SRC-NHS-SUDDEN-CONFUSION"
      ],
      "tone": "warning",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/danger-signals",
          "label": "진료 기록보다 먼저 대응할 위험 신호"
        }
      ]
    },
    {
      "title": "정상 표시와 지방간 소견, 서로 다른 질문의 답",
      "paragraphs": [
        "한 검사에는 정상, 다른 검사에는 지방간. 둘 중 하나를 골라 믿어야 할까요? AST·ALT 같은 간효소와 일반 초음파는 같은 것을 보는 검사가 아닙니다. 간효소가 참고범위 안이어도 지방간이나 중요한 간 손상이 모두 배제되는 것은 아닙니다.",
        "가상 결과표 두 장: 혈액검사 쪽에는 “간효소가 검사실 참고범위 안”, 일반 초음파 쪽에는 “지방간 소견”이라는 문구가 있다고 생각해 보세요. 실제 환자의 결과나 수치·개인 진단을 제시한 사례가 아닙니다. 아래 표에서 두 문구가 답하는 질문을 나눠 봅니다.",
        "반대로 간효소가 높다는 이유만으로 지방간이나 섬유화 정도를 확정하지도 않습니다. 원래 결과의 항목·단위·참고범위와 개인 이력을 함께 설명받습니다. 모든 사람이 추가 정밀검사를 받아야 한다는 뜻은 아닙니다."
      ],
      "claimIds": [
        "MASLD-P3-002",
        "MASLD-P3-003"
      ],
      "sourceIds": [
        "SRC-EASL-MASLD-2024",
        "SRC-KDCA-LIVER-TESTS",
        "SRC-NIDDK-MASLD-SYMPTOMS",
        "SRC-AMC-FATTY-LIVER"
      ],
      "imageId": null,
      "links": [
        {
          "href": "https://easlcampus.eu/sites/default/files/2024-08/EASL_CPGs_management_of_MASLD.pdf#page=5",
          "label": "EASL·EASD·EASO 2024 PDF: 정상 간효소의 한계 — 인쇄 496쪽/PDF 5쪽"
        },
        {
          "href": "/health/guides/reading-health-results",
          "label": "검사표의 항목·단위·참고범위부터 읽기"
        }
      ]
    },
    {
      "title": "검사명 / 확인한 것 / 다음에 물을 것",
      "table": {
        "caption": "가상 두 문구를 실제 결과 원문에 연결하는 세 칸 — 검사 주문표가 아닙니다",
        "columns": [
          "검사·자료",
          "무엇을 살피나요?",
          "진료에서 확인할 질문"
        ],
        "rows": [
          [
            "AST·ALT 등 혈액검사",
            "주로 간세포 손상과 관련된 단서를 봅니다. 간의 모든 기능을 하나의 점수로 나타내지는 않습니다.",
            "수치 변화와 다른 결과를 함께 보면 어떤 의미인가요?"
          ],
          [
            "일반 복부 초음파",
            "간의 지방 축적 소견 등을 살핍니다. 이것만으로 지방간염·섬유화 정도를 확정하지 않습니다.",
            "결과지의 지방 소견 외에 확인할 내용이 있나요?"
          ],
          [
            "간 탄성도검사",
            "간의 뻣뻣한 정도를 살펴 섬유화 위험 평가에 도움을 줍니다. 일반 초음파와 역할이 다릅니다.",
            "제 상황에서 이 결과의 의미와 한계는 무엇인가요?"
          ],
          [
            "조직검사 등 추가 평가",
            "일부 상황에서 염증·손상·섬유화를 더 자세히 확인합니다. 모두에게 조직검사가 필요한 것은 아닙니다.",
            "추가 평가를 권하는 이유와 이점·위험은 무엇인가요?"
          ]
        ]
      },
      "paragraphs": [
        "이 표는 검사 주문 목록이 아닙니다. 어떤 검사가 필요한지는 의료진이 기존 결과와 다른 원인을 함께 살펴 정합니다. 인터넷 계산식에 수치를 넣어 섬유화 단계를 확정하거나 추적검사를 취소하지 않습니다."
      ],
      "claimIds": [
        "MASLD-P3-003"
      ],
      "sourceIds": [
        "SRC-KDCA-LIVER-TESTS",
        "SRC-NIDDK-MASLD-DIAGNOSIS",
        "SRC-AMC-FATTY-LIVER"
      ],
      "tone": "note",
      "imageId": null
    },
    {
      "title": "이름 상자: 옛 NAFLD 결과지는 그대로 가져가세요",
      "paragraphs": [
        "지방간은 간에 지방이 과도하게 쌓인 상태를 가리키는 넓은 말입니다. 그중 MASLD는 간의 지방 축적과 함께 혈당·혈압·지질·체중 관련 대사 위험요인 등을 확인하는 질환 범주입니다. 모든 지방간을 곧바로 MASLD라고 부르는 것은 아닙니다.",
        "과거 자료에는 비알코올성 지방간질환(NAFLD), 비알코올성 지방간염(NASH)이라는 말이 흔합니다. 새 명칭 체계에서는 각각 MASLD와 MASH라는 용어를 사용합니다. 대사 위험요인과 음주·다른 원인을 함께 고려하는 분류이므로 옛 결과표의 이름만 보고 내 진단을 바꾸지 않습니다.",
        "대사 문제와 음주 영향이 겹치는 경우 등은 따로 구분할 수 있습니다. 술을 마시지 않는다는 사실만으로 진단을 확정하거나, 마신다는 이유로 대사 요인을 살피지 않아도 되는 것은 아닙니다."
      ],
      "claimIds": [
        "MASLD-P3-001",
        "MASLD-P3-003"
      ],
      "sourceIds": [
        "SRC-AASLD-MASLD-NAME",
        "SRC-NIDDK-MASLD-DEFINITION",
        "SRC-NIDDK-MASLD-SYMPTOMS"
      ],
      "imageId": null,
      "tone": "note"
    },
    {
      "title": "간의 지방·염증·섬유화는 서로 다른 말입니다",
      "bullets": [
        "지방 축적: 간세포 안에 지방이 늘어난 상태를 말합니다.",
        "염증과 간세포 손상: 지방이 있다는 것 외에 염증과 세포 손상이 함께 있는지를 살핍니다. 지방간염(MASH)의 설명과 연결됩니다.",
        "섬유화: 손상에 대한 반응으로 간에 흉터 조직이 쌓이는 변화를 뜻합니다."
      ],
      "paragraphs": [
        "이 세 가지는 같은 검사 결과를 다른 말로 표현한 것이 아닙니다. 한 사람에게 함께 나타날 수 있지만 누구나 차례로 거치는 세 단계도 아닙니다. ‘지방간 소견’이라는 한 문장을 지방간염이나 간경변 진단으로 바꾸어 읽지 마세요."
      ],
      "claimIds": [
        "MASLD-P3-001",
        "MASLD-P3-003"
      ],
      "sourceIds": [
        "SRC-NIDDK-MASLD-DEFINITION",
        "SRC-NIDDK-MASLD-DIAGNOSIS",
        "SRC-EASL-MASLD-2024"
      ],
      "imageId": "masld-concept"
    },
    {
      "title": "진료에는 결과 원문과 음주·약 정보를 함께",
      "paragraphs": [
        "검사 결과는 기억으로 ‘좋았다·나빴다’고 적기보다 가능하면 원본 그대로 가져갑니다. 아래는 이미 가진 정보를 정리하는 예입니다. 해 보지 않은 검사나 모르는 가족력을 채우려고 새 검사를 받거나 추측할 필요는 없습니다.",
        "결과지를 분실했다면 검사받은 기관에 결과 사본을 받을 방법을 문의하고, 기억나는 검사명·날짜만 남기세요. 해 보지 않은 검사나 잊은 수치를 만들어 넣지 않습니다. 예전 결과지의 NAFLD·NASH 이름도 고쳐 쓰지 말고 원문 그대로 가져가 현재 설명과 어떻게 이어지는지 묻습니다."
      ],
      "bullets": [
        "검사 날짜와 결과: 혈액검사의 항목·단위·참고범위, 초음파의 정확한 문구, 추가 평가를 받았다면 검사명과 결과.",
        "음주 정보: 지금과 과거의 음주 횟수, 한 번에 마시는 양, 줄이거나 끊을 때 생기는 불편.",
        "현재 치료: 처방약·일반약·보충제·생약의 이름과 시작 시기, 알고 있는 당뇨병·혈압·지질 문제.",
        "질문: 다른 원인도 확인해야 하는지, 섬유화 평가가 필요한지, 다음 확인 시점과 그 전에 연락할 변화는 무엇인지."
      ],
      "claimIds": [
        "MASLD-P3-003",
        "MASLD-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-MASLD-DIAGNOSIS",
        "SRC-NIDDK-MASLD-SYMPTOMS",
        "SRC-NHS-ALCOHOL-USE-DISORDER"
      ],
      "tone": "note",
      "imageId": "masld-action",
      "links": [
        {
          "href": "/health/tools/metabolic-dysfunction-associated-steatotic-liver-disease-visit-card",
          "label": "지방간 결과 설명을 준비하는 진료 질문 카드"
        },
        {
          "href": "/health/guides/medication-list",
          "label": "보충제·생약까지 포함한 약 목록 만들기"
        }
      ]
    },
    {
      "title": "보충제보다 개인에게 맞는 관리 계획을 확인하세요",
      "paragraphs": [
        "식사와 활동 조정, 필요한 경우의 체중 관리는 의료진과 생활 여건에 맞춰 계획합니다. 빨리 줄일수록 좋다고 생각해 굶거나 급격히 감량하지 않습니다. 혈당·혈압·지질을 함께 관리할 필요도 있으므로 간 수치 하나만 낮추는 것을 목표로 삼지 않습니다.",
        "‘간에 좋다’는 광고가 안전한 치료를 뜻하지 않습니다. 보충제의 효과·안전 근거는 충분하지 않을 수 있고 일부 생약 등은 간에 해로울 수 있습니다. 제품명과 성분을 알리고, 검사표를 보고 약이나 보충제를 혼자 시작·중단하지 않습니다. 이 글은 특정 약의 국내 허가·처방 대상·용량을 안내하지 않습니다.",
        "음주는 간 건강 계획에서 반드시 상의할 부분입니다. 다만 술을 줄이거나 끊을 때 떨림·식은땀 같은 금단 증상이 있거나 의존이 의심되면 혼자 갑자기 끊는 방식으로 해결하려 하지 말고 먼저 의료 도움을 받으세요. 이는 음주를 계속하라는 권장이 아니라 안전하게 중단할 도움을 받으라는 뜻입니다."
      ],
      "claimIds": [
        "MASLD-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-MASLD-TREATMENT",
        "SRC-EASL-MASLD-2024",
        "SRC-AMC-FATTY-LIVER",
        "SRC-NHS-ALCOHOL-USE-DISORDER"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/obesity",
          "label": "체중과 생활 여건을 함께 상담하는 방법"
        },
        {
          "href": "/health/type-2-diabetes",
          "label": "함께 확인하는 혈당 검사의 뜻"
        },
        {
          "href": "/health/dyslipidemia",
          "label": "LDL·HDL·중성지방 검사표 읽기"
        }
      ]
    }
  ],
  "faq": [],
  "sourceIds": [
    "SRC-NIDDK-MASLD-DEFINITION",
    "SRC-NIDDK-MASLD-SYMPTOMS",
    "SRC-NIDDK-MASLD-DIAGNOSIS",
    "SRC-NIDDK-MASLD-TREATMENT",
    "SRC-AMC-FATTY-LIVER",
    "SRC-KDCA-LIVER-TESTS",
    "SRC-AASLD-MASLD-NAME",
    "SRC-EASL-MASLD-2024",
    "SRC-NHS-JAUNDICE",
    "SRC-NHS-VOMITING-BLOOD",
    "SRC-NHS-SUDDEN-CONFUSION",
    "SRC-NHS-ALCOHOL-USE-DISORDER"
  ],
  "imageIds": [
    "masld-hero",
    "masld-concept",
    "masld-action"
  ],
  "visuals": {
    "masld-hero": {
      "src": "/images/onurim/metabolic-dysfunction-associated-steatotic-liver-disease/hero.webp",
      "alt": "네 줄의 기록 용지와 상담 준비를 상징하는 보라색 장식 표지 삽화",
      "caption": "표지의 색과 줄은 실제 간 검사 결과나 의료 검수 완료 표시가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "masld-concept": {
      "src": "/images/onurim/metabolic-dysfunction-associated-steatotic-liver-disease/concept-v2.webp",
      "alt": "왼쪽 간세포 안의 노란 지방 방울, 가운데 부푼 세포와 주변 염증세포, 오른쪽 세포 사이의 푸른 섬유조직을 구분한 개념도",
      "caption": "왼쪽은 지방 축적, 가운데는 염증·세포 손상, 오른쪽은 섬유화를 단순화했습니다. 함께 나타날 수 있는 서로 다른 특징이며 누구나 순서대로 겪는 단계가 아닙니다. 실제 조직검사 영상·등급·치료 전후가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "masld-action": {
      "src": "/images/onurim/metabolic-dysfunction-associated-steatotic-liver-disease/action-v2.webp",
      "alt": "성인 한 명이 혈액검사 결과지와 초음파 보고서 폴더를 옆에 놓고 별도 노트에 질문을 정리하는 생성 이미지",
      "caption": "실제 환자 사진이 아닌 AI 생성 상황 예시입니다. 결과지의 빈칸·표지는 실제 값이나 판독이 아니며, 뒤쪽 약·보충제 포장은 목록을 준비한다는 뜻이지 복용 권장이 아닙니다.",
      "width": 1536,
      "height": 1024
    }
  },
  "toolSlugs": [
    "metabolic-dysfunction-associated-steatotic-liver-disease-visit-card"
  ]
};
