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
  "slug": "irritable-bowel-syndrome",
  "seoTitle": "과민성장증후군(IBS): 관찰과 추측을 나누는 복통 기록",
  "title": "배변 뒤 더 아팠다면, 그 기억을 그대로 적으세요",
  "eyebrow": "위장·간 · 몸의 변화를 진료 언어로",
  "publishedAt": "2026-08-26",
  "updatedAt": "2026-10-01",
  "sourceCheckedAt": "2026-10-01",
  "description": "배변 뒤 좋아져야 IBS라고 생각해 기억을 고치고 있지는 않나요? 가상 하루 기록을 관찰과 원인 추측으로 나눠 보고, 진료에 가져갈 한 줄과 식사 제한을 재검토할 질문을 정리합니다.",
  "outcome": "배변과 통증의 관계를 혼자 진단하지 않고 설명하며, 새 경고 신호는 기존 IBS 때문이라고 넘기지 않을 수 있습니다.",
  "archetype": "BODY_SIGNAL",
  "summary": [
    "배변 뒤 통증은 덜해지거나 더해질 수 있습니다. 기억나는 변화를 그대로 적습니다.",
    "IBS와 염증성 장질환(IBD)은 다르며, 증상이나 정상 검사 하나로 스스로 구별하지 않습니다.",
    "새 출혈·체중 감소는 의료 평가가 필요하고, 갑작스럽거나 심한 복통·많은 출혈·쓰러짐은 응급 도움을 우선합니다."
  ],
  "sections": [
    {
      "title": "익숙한 IBS가 있어도 새 위험 신호는 따로 봅니다",
      "paragraphs": [
        "새 항문 출혈, 혈성 설사, 이유 없는 체중 감소 중 하나라도 생기면 기존 IBS 때문이라고 넘기지 마세요. 당일 의료기관에 연락해 신속한 평가를 받습니다. 통증 때문에 밤에 깨거나 양상이 달라진 경우도 진료에서 반드시 알립니다.",
        "갑자기 시작된 복통 또는 심한 복통, 쓰러짐, 멈추지 않거나 많은 항문 출혈은 즉시 119에 도움을 요청할 신호입니다. 복통과 함께 피가 섞인 변이 나오는 경우도 응급 평가가 먼저입니다. 검고 끈적한 타르 같은 변은 복통이 없어도 즉시 의료 도움을 받습니다. 여러 신호가 모두 나타날 때까지 기다리지 않습니다.",
        "응급 신호가 있으면 직접 운전하거나 음식 반응을 더 관찰하며 버티지 않습니다. 진료 메모를 끝내는 것보다 도움 요청이 먼저입니다. 이런 변화만으로 암이나 염증성 장질환이 확정되는 것은 아니지만, 온라인에서 원인을 정해 진료를 미뤄서는 안 됩니다."
      ],
      "claimIds": [
        "IBS-P3-005"
      ],
      "sourceIds": [
        "SRC-NHS-IBS-SYMPTOMS",
        "SRC-NHS-STOMACH-ACHE",
        "SRC-NHS-IBD",
        "SRC-KDCA-IBS",
        "SRC-NIDDK-GI-BLEEDING"
      ],
      "tone": "warning",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/danger-signals",
          "label": "기록보다 의료 도움이 먼저인 위험 신호"
        }
      ]
    },
    {
      "title": "가상 하루 기록: 설명에 맞춰 기억을 고치지 않기",
      "paragraphs": [
        "“화장실에 다녀오면 편해져야 하는 것 아닌가?” 하고 기억을 맞출 필요는 없습니다. 배변 뒤 덜 아프거나 더 아프거나 비슷할 수 있습니다. NIDDK 진단 안내는 통증과 배변의 관계에 호전과 악화를 모두 포함합니다. 그 관계 하나가 IBS 진단을 확정하는 것은 아닙니다.",
        "아래는 한 문장을 고치는 방법을 보여 주는 가상 하루 기록입니다. 실제 환자·지인의 경험, 특정 음식이 원인이라는 결론이나 치료 후기가 아닙니다. 본인의 기록에도 확인한 일만 옮기고 모르는 내용은 모른다고 남깁니다."
      ],
      "bullets": [],
      "claimIds": [
        "IBS-P3-001",
        "IBS-P3-002"
      ],
      "sourceIds": [
        "SRC-NIDDK-IBS-DIAGNOSIS",
        "SRC-NIDDK-IBS-SYMPTOMS",
        "SRC-NHS-IBS-SYMPTOMS",
        "SRC-NHS-IBS-DIAGNOSIS"
      ],
      "imageId": "ibs-action",
      "table": {
        "caption": "가상 기록의 관찰 문장과 추정 문장을 나누기",
        "columns": [
          "구분",
          "예시 문장"
        ],
        "rows": [
          [
            "관찰한 사실",
            "아침 식사 뒤 아랫배가 불편했고, 변을 본 뒤에는 더 아팠다."
          ],
          [
            "아직 확인되지 않은 추측",
            "아침 음식이 원인인 것 같다. 원인으로 확정하지 않고 진료에서 물어본다."
          ]
        ]
      }
    },
    {
      "title": "내 기록 한 줄을 가져가고, 빠진 내용만 확인하기",
      "bullets": [
        "언제·어디가: 시작 시기, 배의 어느 쪽인지, 어떻게 아팠는지와 일상에 미친 영향.",
        "배변 전후: 통증이 줄거나 늘었는지, 비슷했는지. 모르면 모른다고 적습니다.",
        "평소와 다른 변: 횟수·단단함·묽음과 급하게 화장실에 갔던 상황.",
        "함께 바뀐 것: 식사·수면·생활 상황, 새 약이나 최근 장염·항생제 복용 등 알고 있는 정보.",
        "놓치지 않을 변화: 출혈, 원인 없는 체중 감소, 통증 때문에 밤에 깬 일, 알고 있는 소화기질환 가족력."
      ],
      "paragraphs": [
        "기억나는 한 장면을 “언제 무엇이 있었고, 배변 뒤 어떻게 달라졌다”로 적어 보세요. 덜 아팠다·더 아팠다·비슷했다·잘 모르겠다는 말 모두 정보입니다. 원인이나 진단 결론을 붙이지 않습니다. 아래 다섯 가지는 전부 채워야 하는 숙제가 아니라 빠진 내용을 확인하는 목록입니다.",
        "기간을 채우거나 빈칸을 완성해야 진료받을 수 있는 것은 아닙니다. 처음 생겼거나 반복되는 불편으로 일상이 어려우면 평가받고, 새 경고 신호는 기록을 기다리지 않습니다. 개인정보나 변 사진을 이 페이지에 보내지 마세요."
      ],
      "claimIds": [
        "IBS-P3-002",
        "IBS-P3-003",
        "IBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NHS-IBS-DIAGNOSIS",
        "SRC-NIDDK-IBS-DIAGNOSIS",
        "SRC-KDCA-IBS"
      ],
      "tone": "note",
      "imageId": null,
      "links": [
        {
          "href": "/health/tools/irritable-bowel-syndrome-visit-card",
          "label": "복통·배변 변화의 진료 질문 카드"
        },
        {
          "href": "/health/guides/symptom-journal",
          "label": "추측과 관찰을 나누는 증상 기록법"
        },
        {
          "href": "/health/guides/medication-list",
          "label": "최근 시작한 약까지 목록으로 정리하기"
        }
      ]
    },
    {
      "title": "IBS와 IBD는 이름이 비슷해도 다른 질환입니다",
      "table": {
        "caption": "약자를 풀어 읽기 — 증상으로 진단하는 표가 아닙니다",
        "columns": [
          "이름",
          "구분해서 이해할 점"
        ],
        "rows": [
          [
            "IBS: 과민성장증후군",
            "장-뇌 상호작용, 장의 기능과 감각 등을 살피는 질환입니다. 반복되는 복통과 배변 변화가 함께 나타납니다."
          ],
          [
            "IBD: 염증성 장질환",
            "크론병·궤양성대장염 등이 포함됩니다. 장에 염증을 일으키는 질환으로 IBS와 같지 않습니다."
          ]
        ]
      },
      "paragraphs": [
        "복통·설사처럼 겹치는 증상이 있어 이름이나 증상 목록만으로 둘을 구별할 수 없습니다. 특히 새 출혈이나 설명되지 않는 체중 변화가 있으면 기존 IBS로 넘기지 말고 알립니다.",
        "진료에서는 증상의 흐름과 병력·가족력, 신체검사를 먼저 살피고 필요에 따라 혈액·대변검사나 내시경 등으로 다른 원인을 확인합니다. 모두에게 대장내시경이 필수라는 뜻도, IBS가 의심되면 검사할 필요가 없다는 뜻도 아닙니다. ‘검사가 정상이니 IBS 확정’으로 결론 내리지 않습니다."
      ],
      "claimIds": [
        "IBS-P3-001",
        "IBS-P3-003"
      ],
      "sourceIds": [
        "SRC-NIDDK-IBS-DEFINITION",
        "SRC-NHS-IBD",
        "SRC-NHS-IBS-DIAGNOSIS",
        "SRC-NIDDK-IBS-DIAGNOSIS",
        "SRC-KDCA-IBS"
      ],
      "tone": "note",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/reading-health-results",
          "label": "정상·이상 표시만으로 결론 내리지 않고 검사표 읽기"
        }
      ]
    },
    {
      "title": "검사에 뚜렷한 손상이 안 보여도 불편은 실제입니다",
      "paragraphs": [
        "IBS는 반복되는 복통과 설사·변비 등의 배변 변화가 함께 나타나는 질환입니다. 장의 움직임과 감각, 장과 뇌가 신호를 주고받는 작용 등 여러 요인을 함께 살핍니다. 어떤 사람은 장이 늘어나거나 내용물이 움직이는 자극을 더 민감하게 느낄 수 있습니다.",
        "이 설명은 ‘마음먹기에 달렸다’거나 ‘아픈 척한다’는 뜻이 아닙니다. 수면·식사·생활의 긴장과 증상의 관계는 상담할 맥락이지 한 사람을 탓하거나 원인을 하나로 확정하는 답이 아닙니다. IBS가 있어도 모든 복통을 같은 이유로 설명하지 않습니다.",
        "설사가 주로 나타나기도 하고 변비가 주로 나타나거나 두 양상이 번갈아 나타나기도 합니다. 다른 사람에게 맞았던 약이나 식단을 그대로 적용하지 않는 이유 중 하나입니다."
      ],
      "claimIds": [
        "IBS-P3-001",
        "IBS-P3-002",
        "IBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-IBS-DEFINITION",
        "SRC-NIDDK-IBS-SYMPTOMS",
        "SRC-KDCA-IBS",
        "SRC-NIDDK-IBS-TREATMENT"
      ],
      "imageId": "ibs-concept"
    },
    {
      "title": "먹지 못하는 음식 목록이 계속 늘어난다면",
      "paragraphs": [
        "IBS에 모두 똑같이 맞는 식단이나 약은 없습니다. 식사와 증상을 간단히 기록하되 한 번 불편했던 음식을 곧바로 평생 금지하지 않습니다. 증상을 피하려 많은 음식을 빼야 한다면 의료진에게 알리고 영양 전문가의 도움을 상의하세요.",
        "저포드맙(low FODMAP) 식단은 일부 잘 흡수되지 않는 탄수화물의 섭취를 조정하는 방법입니다. 모든 사람에게 필요한 식단이 아니며, 시도할 경우 효과를 살펴보고 음식을 다시 넣는 과정까지 의료진·영양 전문가와 계획합니다. 인터넷 식품표를 영구적인 금지 목록으로 삼지 않습니다.",
        "식이섬유나 유산균도 많이 먹을수록 좋은 하나의 해결책은 아닙니다. 섬유질을 갑자기 늘리면 가스·팽만이 불편할 수 있습니다. 설사·변비 양상과 현재 치료를 알리고 식사 조정이나 약·보충제의 필요성, 부작용 때의 행동을 확인합니다. 이 글은 지사제·변비약·항생제를 선택하거나 용량을 바꾸는 안내가 아닙니다.",
        "이번 수정에서는 관찰과 추측의 가상 기록을 나누고 반복 설명을 합쳤습니다. 배변 후 호전·악화 관계와 식단 재도입, 새 위험 신호의 공식 근거를 다시 대조했으며 개인의 진단·식단·약 처방을 추가하지 않았습니다."
      ],
      "claimIds": [
        "IBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NHS-IBS-LIFESTYLE",
        "SRC-NIDDK-IBS-DIET",
        "SRC-NIDDK-IBS-TREATMENT",
        "SRC-KDCA-IBS"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/appointment-questions",
          "label": "치료 목표·부작용·다음 상담을 묻는 질문"
        }
      ],
      "bullets": [
        "왜 시도하나요? 제 증상과 현재 치료에서 식단 조정을 권하는 이유는 무엇인가요?",
        "무엇으로 효과를 보나요? 어떤 변화를 기록하고 언제 함께 확인하나요?",
        "어떻게 다시 넣나요? 효과와 영양 상태를 살피며 제외했던 음식을 다시 넣는 계획은 누구와 정하나요?"
      ]
    }
  ],
  "faq": [],
  "sourceIds": [
    "SRC-NIDDK-IBS-DEFINITION",
    "SRC-NIDDK-IBS-SYMPTOMS",
    "SRC-NIDDK-IBS-DIAGNOSIS",
    "SRC-NIDDK-IBS-TREATMENT",
    "SRC-NIDDK-IBS-DIET",
    "SRC-KDCA-IBS",
    "SRC-NHS-IBS-SYMPTOMS",
    "SRC-NHS-IBS-DIAGNOSIS",
    "SRC-NHS-IBS-LIFESTYLE",
    "SRC-NHS-STOMACH-ACHE",
    "SRC-NHS-IBD",
    "SRC-NIDDK-GI-BLEEDING"
  ],
  "imageIds": [
    "ibs-hero",
    "ibs-concept",
    "ibs-action"
  ],
  "visuals": {
    "ibs-hero": {
      "src": "/images/onurim/irritable-bowel-syndrome/hero.webp",
      "alt": "네 줄의 메모 용지와 상담 준비를 상징하는 갈색 장식 표지 삽화",
      "caption": "표지의 줄과 십자 모양은 진단 결과나 의료인 검수 완료 표시가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "ibs-concept": {
      "src": "/images/onurim/irritable-bowel-syndrome/concept-v2.webp",
      "alt": "머리의 뇌와 복부의 장 사이에 위쪽과 아래쪽을 향한 두 화살표가 놓인 장-뇌 상호작용 개념도",
      "caption": "화살표는 장과 뇌의 양방향 소통을 단순화한 상징이며 실제 신경의 위치나 음식 이동 경로가 아닙니다. IBS와 관련된 여러 요인 중 일부로, 마음가짐 탓이거나 개인의 원인을 확정한다는 뜻이 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "ibs-action": {
      "src": "/images/onurim/irritable-bowel-syndrome/action-v2.webp",
      "alt": "화장실 문 앞에서 복부의 느낌을 살피는 성인과 책상에서 그 변화를 노트에 적는 같은 인물의 두 장면 삽화",
      "caption": "관찰과 기록을 연결한 가상 장면으로 실제 환자나 치료 전후가 아닙니다. 배변 뒤 통증이 덜하거나 더하거나 비슷한 경우 모두 그대로 적습니다. 컵·시계는 특정 음료나 기록 시간을 권하는 뜻이 아닙니다.",
      "width": 1536,
      "height": 1024
    }
  },
  "toolSlugs": [
    "irritable-bowel-syndrome-visit-card"
  ]
};
