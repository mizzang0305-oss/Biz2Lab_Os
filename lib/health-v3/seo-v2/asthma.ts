import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const nhlbi = "https://www.nhlbi.nih.gov/health/asthma/";
export const asthmaSources: HealthSource[] = [
  { id: "SRC-NHLBI-ASTHMA-SYMPTOMS", organization: "NIH/NHLBI", title: "Asthma Symptoms", url: `${nhlbi}symptoms`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-DIAGNOSIS", organization: "NIH/NHLBI", title: "Asthma Diagnosis", url: `${nhlbi}diagnosis`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-ATTACK", organization: "NIH/NHLBI", title: "Asthma Attack", url: `${nhlbi}attacks`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-PLAN", organization: "NIH/NHLBI", title: "Asthma Treatment and Action Plan", url: `${nhlbi}treatment-action-plan`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-NHLBI-ASTHMA-MANAGING", organization: "NIH/NHLBI", title: "Managing Asthma", url: `${nhlbi}living-with`, sourceDate: "2024-04-17", retrievedAt: checkedAt },
  { id: "SRC-KDCA-ASTHMA", organization: "질병관리청 국가건강정보포털", title: "천식", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6784", sourceDate: "2026-05-06 (업데이트)", retrievedAt: checkedAt },
  { id: "SRC-NHS-ASTHMA", organization: "NHS", title: "Asthma", url: "https://www.nhs.uk/conditions/asthma/", sourceDate: "2025-04-07 (페이지 검토; 동영상 날짜와 구분)", retrievedAt: checkedAt },
  { id: "SRC-NHS-BREATHLESSNESS", organization: "NHS", title: "Shortness of breath", url: "https://www.nhs.uk/symptoms/shortness-of-breath/", sourceDate: "2024-01-30", retrievedAt: checkedAt },
];

// Explain how to read an existing clinical plan, never generate a prescription.
// Original claim records and their licensed-review status remain unchanged.
export const asthmaArticle: HealthArticle = {
  "slug": "asthma",
  "seoTitle": "천식 흡입기: 색보다 약 이름·개인 행동계획 확인하기",
  "title": "같은 색 흡입기면 같은 약일까요? 내 행동계획부터 확인해요",
  "eyebrow": "호흡기·알레르기 · 공기가 지나는 길부터",
  "publishedAt": "2026-08-26",
  "updatedAt": "2026-10-01",
  "sourceCheckedAt": "2026-10-01",
  "description": "내 흡입기는 편한 날과 불편한 날에 각각 어떻게 쓰도록 처방됐나요? 실제 기기·약 봉투·개인 행동계획을 함께 놓고 모르는 지침을 찾아 진료에서 확인합니다. 심한 호흡곤란에는 읽기보다 119가 먼저입니다.",
  "outcome": "내 흡입기의 이름·역할·현재 지침을 확인하고, 계획에서 찾지 못한 내용과 발작 후 연락 시점을 진료 질문으로 남깁니다.",
  "archetype": "SIMPLE_ANALOGY",
  "summary": [
    "숨쉬기가 매우 어렵거나 말을 내기 힘들면 계획서를 찾거나 약효를 기다리지 말고 즉시 119에 도움을 요청합니다.",
    "안정된 때 실제 기기·약 봉투·현재 행동계획을 함께 놓습니다. 흡입기 색으로 약의 역할을 정하지 않습니다.",
    "모르는 지침은 추측해 채우지 않고 진료팀에 확인합니다. 처방을 혼자 바꾸거나 다른 사람의 사용법을 가져오지 않습니다."
  ],
  "sections": [
    {
      "title": "말을 내기 힘든 호흡곤란에는 계획서보다 119가 먼저입니다",
      "paragraphs": [
        "숨쉬기가 매우 어렵거나, 헐떡이거나, 말을 내기 힘들면 즉시 119에 도움을 요청합니다.",
        "입술·피부가 매우 창백해지거나 파랗게 또는 회색빛으로 변하는 경우, 또는 갑자기 혼란스러워하는 경우도 즉시 119에 연락합니다. 색 변화까지 나타나야 하는 조건이 아닙니다.",
        "천식 발작 중 처방된 약으로 증상이 완화되지 않거나 숨쉬기가 여전히 매우 어려운 경우도 119 도움을 요청합니다. 약을 더 쓰며 기다리라는 뜻이 아닙니다.",
        "여러 신호가 함께 나타날 때까지 기다리지 않습니다. 심한 호흡곤란이 있으면 기록이나 계획서를 찾느라 호출을 늦추지 말고 직접 운전하지 마세요. 이미 정해진 응급 대응과 119 안내를 따르며, 다른 사람의 흡입기나 온라인 용량으로 대신하지 않습니다.",
        "발작 뒤 호전되었더라도 진료팀에 지체 없이 연락해 신속한 후속 진료와 계획 점검을 받습니다. 일반적인 증상 상담과 지금의 응급 대응은 구분해야 합니다. 숨참의 원인을 천식으로 단정하지 않는 것도 중요합니다."
      ],
      "claimIds": [
        "AST-P3-005"
      ],
      "sourceIds": [
        "SRC-NHS-BREATHLESSNESS",
        "SRC-NHLBI-ASTHMA-ATTACK",
        "SRC-NHS-ASTHMA"
      ],
      "tone": "warning",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/danger-signals",
          "label": "즉시 대응해야 할 호흡·의식 변화"
        }
      ]
    },
    {
      "title": "안정된 때, 내 흡입기 하나를 놓고 시작하세요",
      "paragraphs": [
        "비슷한 색의 흡입기를 보고 같은 약이라고 생각하기 쉽습니다. 하지만 기기의 색·모양만으로 역할과 사용법을 정할 수 없습니다. NHS에는 증상이 있을 때 쓰는 AIR, 평소 사용과 증상 완화를 함께 하는 MART 등 서로 다른 처방 방식이 나옵니다. 이는 내 약을 골라 주는 기준이 아니라 이름과 개인 지침을 확인해야 하는 이유입니다.",
        "아래 작업은 숨쉬기가 편한 때 기존 처방을 확인하는 과정입니다. 실제 기기·약 봉투와 이미 받은 계획서를 꺼내고, 서로 맞지 않거나 찾지 못한 부분만 표시합니다. 새 치료계획을 만들거나 용량을 계산하는 작업은 아닙니다."
      ],
      "bullets": [
        "기기·약 봉투에서 약 이름을 찾고 계획서에 같은 이름이 있는지 봅니다. 읽기 어렵거나 다르면 확인할 질문으로 남깁니다.",
        "편한 날과 증상이 달라진 날의 지침, 진료팀 연락처를 찾아봅니다. 모르겠으면 인터넷 숫자로 채우지 않습니다.",
        "기기와 질문지를 다음 진료에 가져가 사용 모습을 확인받습니다. 개인·가족의 처방 사진을 이 사이트에 올릴 필요는 없습니다."
      ],
      "claimIds": [
        "AST-P3-004"
      ],
      "sourceIds": [
        "SRC-NHS-ASTHMA",
        "SRC-NHLBI-ASTHMA-PLAN"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/tools/asthma-visit-card",
          "label": "찾지 못한 지침을 적는 인쇄용 천식 진료 질문지"
        }
      ]
    },
    {
      "title": "현재 행동계획에서 찾을 내용과 모르는 내용",
      "paragraphs": [
        "아래 표에서 이미 받은 계획의 해당 부분을 찾습니다. 편한 날에도 내 처방을 따르고, 약을 혼자 줄이거나 중단하지 않습니다. 계획이 없거나 지금 처방과 맞는지 모르겠다면 안정된 때 진료팀에 종이·디지털 계획과 사용법 확인을 요청하세요.",
        "발작 뒤 좋아졌더라도 진료팀에 지체 없이 연락해 후속 진료와 계획 점검을 받습니다. 인쇄 질문지의 현재 개인 행동계획·찾지 못한 지침 칸에는 담당 진료팀과 정한 발작 후 연락 시점·연락처도 적어 두세요. 공통 숫자 기한이나 온라인 용량을 개인 지침으로 대신하지 않습니다."
      ],
      "table": {
        "caption": "개인 행동계획을 읽는 질문 — 치료계획을 대신 만들지 않습니다",
        "columns": [
          "찾아볼 항목",
          "확인할 질문"
        ],
        "rows": [
          [
            "약 이름과 역할",
            "예방·증상 완화 등 이 약이 내 처방에서 맡는 역할은 무엇인가요?"
          ],
          [
            "편한 날의 지침",
            "증상이 없는 날에도 어떤 지침을 따르나요?"
          ],
          [
            "증상이 달라진 날",
            "어떤 변화 때 계획의 어느 부분을 따르나요?"
          ],
          [
            "도움 요청과 후속 연락",
            "즉시 119가 필요한 때, 진료팀 연락 기준·연락처와 발작 후 연락 시점은 어디에 적혀 있나요?"
          ],
          [
            "기기·계획 확인",
            "사용 모습을 확인받았나요? 이 계획이 지금 처방과 맞나요?"
          ]
        ]
      },
      "claimIds": [
        "AST-P3-004"
      ],
      "sourceIds": [
        "SRC-NHLBI-ASTHMA-PLAN",
        "SRC-NHLBI-ASTHMA-MANAGING",
        "SRC-NHS-ASTHMA"
      ],
      "tone": "note",
      "imageId": null,
      "links": [
        {
          "href": "/health/tools/asthma-visit-card",
          "label": "천식 증상과 행동계획의 진료 질문 카드"
        }
      ]
    },
    {
      "title": "계획을 이해하는 데 필요한 기도 그림 하나",
      "paragraphs": [
        "기도는 폐로 공기가 드나드는 길입니다. 천식에서는 이 길이 자극에 민감해지고 염증이 생겨, 공기가 지나갈 공간이 좁아질 수 있습니다. 단순히 폐 자체가 작아진다는 뜻은 아닙니다."
      ],
      "bullets": [
        "안쪽 벽이 붓는 변화: 기도 안의 빈 공간이 줄어들 수 있습니다.",
        "주변 근육이 조이는 변화: 통로를 둘러싼 근육의 수축이 좁아짐에 관여합니다.",
        "점액이 늘어나는 변화: 통로 안의 점액도 공기 흐름에 영향을 줄 수 있습니다."
      ],
      "claimIds": [
        "AST-P3-001"
      ],
      "sourceIds": [
        "SRC-KDCA-ASTHMA",
        "SRC-NHLBI-ASTHMA-ATTACK"
      ],
      "imageId": "ast-concept"
    },
    {
      "title": "기침·쌕쌕거림은 ‘언제 달라지는지’도 중요합니다",
      "paragraphs": [
        "천식에서는 기침, 숨을 쉴 때 나는 휘파람 같은 쌕쌕 소리, 숨참, 가슴 답답함이 나타날 수 있습니다. 같은 날에도 오르내리거나 밤·이른 아침, 감기, 운동, 찬 공기 등과 관련해 달라질 수 있습니다. 모든 사람에게 같은 유발 요인이 있는 것은 아닙니다.",
        "이런 증상은 다른 문제에서도 나타날 수 있습니다. 소리가 난다는 이유로 천식을 확정하거나, 지금 쌕쌕거리지 않는다는 이유로 심한 호흡곤란을 안전하다고 판단하지 않습니다. 진료에서는 증상 흐름과 병력에 더해 필요한 검사를 살핍니다.",
        "폐기능검사는 내쉬는 공기의 양·속도 등을 살핍니다. 준비 방법은 진료팀에 확인하고 약을 임의로 중단하지 않습니다. 집에서 숨을 참거나 빨대로 숨 쉬는 체험으로 천식을 진단하지 마세요."
      ],
      "claimIds": [
        "AST-P3-002",
        "AST-P3-003"
      ],
      "sourceIds": [
        "SRC-NHLBI-ASTHMA-SYMPTOMS",
        "SRC-NHLBI-ASTHMA-DIAGNOSIS",
        "SRC-NHS-BREATHLESSNESS"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/allergic-rhinitis",
          "label": "함께 상담할 코 알레르기의 유발 상황"
        }
      ]
    },
    {
      "title": "다음 진료에서 물을 세 질문",
      "paragraphs": [
        "약 이름이나 역할을 모르면 “이 약은 편한 날과 불편한 날에 각각 어떤 역할인가요?”, 사용법이 헷갈리면 “제 기기로 사용하는 모습을 봐 주실 수 있나요?”, 계획을 찾지 못하면 “현재 처방에 맞는 계획과 발작 후 연락 시점을 적어 주실 수 있나요?”라고 물어보세요.",
        "기침·쌕쌕거림이 생긴 때와 상황, 밤에 깼는지, 평소 활동에 생긴 지장과 처방대로 사용한 뒤의 변화를 짧게 기록해 가져갑니다. 최대호기유속계는 개인 계획에 따라 안내받은 경우 그 방법과 기준을 따릅니다. 모든 사람이 새 기기를 사거나 공통 수치를 적용할 필요는 없습니다."
      ],
      "claimIds": [
        "AST-P3-002",
        "AST-P3-003",
        "AST-P3-004"
      ],
      "sourceIds": [
        "SRC-NHLBI-ASTHMA-MANAGING",
        "SRC-NHLBI-ASTHMA-DIAGNOSIS",
        "SRC-NHLBI-ASTHMA-PLAN",
        "SRC-NHLBI-ASTHMA-SYMPTOMS"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/symptom-journal",
          "label": "증상·상황·처방 뒤 반응을 구분해 기록하기"
        },
        {
          "href": "/health/guides/appointment-questions",
          "label": "다음 진료에서 빠뜨리지 않을 질문"
        }
      ]
    }
  ],
  "faq": [],
  "sourceIds": [
    "SRC-NHLBI-ASTHMA-SYMPTOMS",
    "SRC-NHLBI-ASTHMA-DIAGNOSIS",
    "SRC-NHLBI-ASTHMA-ATTACK",
    "SRC-NHLBI-ASTHMA-PLAN",
    "SRC-NHLBI-ASTHMA-MANAGING",
    "SRC-KDCA-ASTHMA",
    "SRC-NHS-ASTHMA",
    "SRC-NHS-BREATHLESSNESS"
  ],
  "imageIds": [
    "ast-hero",
    "ast-concept",
    "ast-action"
  ],
  "visuals": {
    "ast-hero": {
      "src": "/images/onurim/asthma/hero.webp",
      "alt": "네 줄의 메모 용지와 상담 준비를 상징하는 파란색 장식 표지 삽화",
      "caption": "표지의 줄과 십자 모양은 폐기능 결과나 의료인 검수 완료 표시가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "ast-concept": {
      "src": "/images/onurim/asthma/concept-v2.webp",
      "alt": "넓게 열린 기도 단면과 안쪽 벽의 부종·바깥 근육의 수축·안쪽 점액으로 통로가 좁아진 기도 단면을 나란히 비교한 개념도",
      "caption": "왼쪽은 열린 기도, 오른쪽은 벽의 부종과 주변 근육 수축, 안쪽의 옅은 노란 점액을 단순화한 모습입니다. 실제 조직검사나 막힌 비율·치료 전후·필연적 진행 단계가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "ast-action": {
      "src": "/images/onurim/asthma/action-v2.webp",
      "alt": "진료를 상징하는 가상 장면에서 두 성인이 계획서의 한 부분을 함께 확인하고 질문을 별도 노트에 적는 생성 이미지",
      "caption": "실제 환자·검수자 사진이 아닌 AI 생성 상담 장면입니다. 문서의 줄·도형은 처방 내용이 아니고, 회색 기기는 종류·역할·사용량을 권하는 제품이 아닙니다. 심한 호흡곤란에는 계획서를 찾기보다 119가 먼저입니다.",
      "width": 1536,
      "height": 1024
    }
  },
  "toolSlugs": [
    "asthma-visit-card"
  ]
};
