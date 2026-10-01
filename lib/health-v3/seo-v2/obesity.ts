import type { HealthArticle, HealthSource } from "../content";

const checkedAt = "2026-09-06";
const niddk = "https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/";
export const obesitySources: HealthSource[] = [
  { id: "SRC-NIDDK-OBESITY-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts for Adult Overweight & Obesity", url: `${niddk}definition-facts`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-OBESITY-FACTORS", organization: "NIH/NIDDK", title: "Factors Affecting Weight & Health", url: `${niddk}factors-affecting-weight-health`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-OBESITY-RISKS", organization: "NIH/NIDDK", title: "Health Risks of Overweight & Obesity", url: `${niddk}health-risks`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-HEALTHY-WEIGHT", organization: "NIH/NIDDK", title: "Am I at a Healthy Weight?", url: `${niddk}am-i-healthy-weight`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-OBESITY-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for Overweight & Obesity", url: `${niddk}treatment`, sourceDate: "2023-05 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-NIDDK-WEIGHT-CONVERSATION", organization: "NIH/NIDDK", title: "Talking with Your Patients about Weight", url: "https://www.niddk.nih.gov/health-information/professionals/clinical-tools-patient-management/weight-management/talking-with-your-patients-about-weight", sourceDate: "2023-08 (Last Reviewed)", retrievedAt: checkedAt },
  { id: "SRC-AMC-OBESITY", organization: "서울아산병원", title: "비만(Obesity)", url: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31809", sourceDate: "페이지 표시일 미확인", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-WEIGHT-GAIN", organization: "MedlinePlus / A.D.A.M.", title: "Weight gain - unintentional", url: "https://medlineplus.gov/ency/article/003084.htm", sourceDate: "2025-07-03 (Review Date)", retrievedAt: checkedAt },
  { id: "SRC-MEDLINEPLUS-LEG-SWELLING", organization: "MedlinePlus / A.D.A.M.", title: "Foot, leg, and ankle swelling", url: "https://medlineplus.gov/ency/article/003104.htm", sourceDate: "2025-05-19 (Review Date)", retrievedAt: checkedAt },
];

// New source-linked explanations do not rewrite or clinically approve the
// original 144 claims or the 47-claim licensed-review packet.
export const obesityArticle: HealthArticle = {
  "slug": "obesity",
  "seoTitle": "비만 상담 준비: 동의 한 문장·최근 변화 세 칸·원하는 도움",
  "title": "체중을 묻기 전에, 요즘 달라진 몸과 생활부터",
  "eyebrow": "대사·내분비 · 본인이 원하는 가족의 도움부터",
  "publishedAt": "2026-08-26",
  "updatedAt": "2026-10-01",
  "sourceCheckedAt": "2026-10-01",
  "description": "체중 숫자만으로 의지나 원인을 판단하지 않습니다. 먼저 대화 동의를 묻는 가상 예시를 보고, 몸·약·수면과 생활의 최근 변화를 세 칸에 정리해 상담에 가져갑니다.",
  "outcome": "대화 동의 한 문장과 최근 변화 세 칸, 본인이 원하는 도움 한 가지를 정리해 상담을 준비할 수 있습니다.",
  "archetype": "FAMILY_SITUATION",
  "summary": [
    "체중 이야기를 꺼내도 괜찮은지 먼저 묻고, 지금 가장 불편한 점을 듣습니다.",
    "몸의 변화·약의 변화·수면과 생활 여건을 따로 적습니다. 같은 시기에 생겼다는 이유만으로 원인을 확정하지 않습니다.",
    "갑작스러운 증가와 붓기는 지방 증가로 단정하지 않습니다. 숨참이나 가슴 불편이 함께 있으면 119 도움이 먼저입니다."
  ],
  "sections": [
    {
      "title": "“체중 이야기를 지금 해도 괜찮을까?”",
      "paragraphs": [
        "체중이 늘면 의지가 부족해서라고 생각하기 쉽지만, 수면·약·질환·생활 환경 등 여러 조건도 관련됩니다. 가족이 걱정하는 마음을 바로 감량 지시로 바꾸기 전에, 지금 이 이야기를 해도 괜찮은지 묻고 본인이 느끼는 불편부터 듣습니다.",
        "아래 두 줄은 의료 대화의 동의 원칙을 가정의 말로 옮긴 가상 대화입니다. 실제 가족·환자의 경험이나 대화로 체중이 줄었다는 사례가 아닙니다. 대화를 원하지 않으면 강요하지 않고, 혼자 진료받겠다는 선택도 존중합니다."
      ],
      "table": {
        "caption": "가상 대화 두 줄 — 진료나 치료 효과를 재현한 사례가 아닙니다",
        "columns": [
          "말하는 사람",
          "예시 문장"
        ],
        "rows": [
          [
            "도움을 제안하는 사람",
            "체중 이야기를 지금 해도 괜찮을까? 요즘 몸에서 가장 불편한 건 뭐야?"
          ],
          [
            "도움을 받는 사람",
            "지금은 얘기해도 괜찮아. 식사 감시보다 진료 질문을 같이 적어 주면 좋겠어."
          ]
        ]
      },
      "claimIds": [
        "OBS-P3-001",
        "OBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-WEIGHT-CONVERSATION",
        "SRC-NIDDK-OBESITY-FACTORS"
      ],
      "imageId": null
    },
    {
      "title": "같은 체중에도 빠져 있는 정보가 있습니다",
      "paragraphs": [
        "비만은 몸에 지방이 과도하게 축적되어 건강 위험이 커질 수 있는 상태입니다. 단순히 몸무게가 무겁거나 특정 외모라는 뜻이 아닙니다. 체중은 지방뿐 아니라 근육·뼈·수분 등도 포함하므로 체중계 한 번의 숫자로 원인이나 건강 상태를 결론내리지 않습니다.",
        "BMI는 키와 체중으로 계산하는 체질량지수입니다. 건강 위험을 살필 때 쓰는 자료지만 지방량을 직접 측정하지는 않습니다. 허리둘레는 복부 지방과 관련된 위험을 살피는 데 도움이 되지만 내장지방의 양을 직접 보여 주는 검사도 아닙니다.",
        "미국 NIDDK 자료와 국내 서울아산병원 자료는 BMI 분류에 적용하는 인구집단과 기준이 다를 수 있습니다. 해외 표의 분류를 국내 상담의 기준으로 바로 옮기지 말고, 내게 적용하는 기준과 함께 볼 검사·불편을 의료진에게 확인하세요. 이 글은 BMI 계산기나 감량 목표표가 아닙니다."
      ],
      "table": {
        "caption": "체중 관련 지표를 진료에서 함께 읽는 방법",
        "columns": [
          "지표",
          "알아볼 때 도움이 되는 점",
          "이것만으로 알 수 없는 점"
        ],
        "rows": [
          [
            "체중의 흐름",
            "언제부터 어느 방향으로 달라졌는지 설명합니다.",
            "갑작스러운 변화가 지방·수분·다른 원인 중 무엇 때문인지는 구분하지 못합니다."
          ],
          [
            "BMI",
            "키에 비해 체중이 어느 정도인지 살피는 자료입니다.",
            "근육과 지방을 나누거나 지방의 위치를 직접 보여 주지 않습니다."
          ],
          [
            "허리둘레",
            "복부의 크기를 통해 건강 위험을 살피는 데 보탭니다.",
            "정확한 내장지방량이나 비만 관련 질환의 유무를 확정하지 못합니다."
          ]
        ]
      },
      "bullets": [
        "근육이 많은 성인은 BMI가 높아도 같은 BMI의 다른 사람과 몸의 구성이 다를 수 있습니다.",
        "나이가 들며 근육량이 달라지면 BMI가 비슷해도 몸의 구성이 달라질 수 있습니다.",
        "이 글은 성인의 상담 준비 안내입니다. 아동·청소년, 임신 중인 사람에게 성인의 수치 기준이나 감량 계획을 그대로 적용하지 않습니다."
      ],
      "claimIds": [
        "OBS-P3-001",
        "OBS-P3-002",
        "OBS-P3-003"
      ],
      "sourceIds": [
        "SRC-NIDDK-OBESITY-DEFINITION",
        "SRC-NIDDK-HEALTHY-WEIGHT",
        "SRC-AMC-OBESITY",
        "SRC-MEDLINEPLUS-WEIGHT-GAIN"
      ],
      "imageId": "obs-concept"
    },
    {
      "title": "최근 변화 세 칸: 몸 / 약 / 수면과 생활",
      "paragraphs": [
        "날짜가 정확하지 않으면 기억나는 시기만 적고 모르는 내용은 비워 둡니다. 매일 체중을 재거나 모든 식사를 기록해야 하는 과제가 아닙니다. 갑작스러운 증가와 붓기는 아래 별도 안내를 먼저 확인하세요.",
        "가상 메모 예시: “최근 옷의 맞음새가 달라졌다 / 비슷한 시기에 복용 약이 바뀌었다 / 근무 일정이 바뀌어 잠을 자주 깼다.” 실제 환자 정보가 아니며, 약이나 수면이 원인이라고 결론낸 사례도 아닙니다. 약 이름과 변경 시기는 처방전으로 확인하고 임의로 끊지 않습니다."
      ],
      "bullets": [],
      "claimIds": [
        "OBS-P3-002",
        "OBS-P3-003",
        "OBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-OBESITY-FACTORS",
        "SRC-MEDLINEPLUS-WEIGHT-GAIN"
      ],
      "tone": "note",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/medication-list",
          "label": "약·보충제 이름과 변경 시기 정리하기"
        },
        {
          "href": "/health/tools/obesity-visit-card",
          "label": "비만 상담에 가져갈 질문 카드"
        }
      ],
      "table": {
        "caption": "확실한 사실과 모르는 것을 나누는 최근 변화 세 칸",
        "columns": [
          "기록 칸",
          "기억나는 사실만 적기"
        ],
        "rows": [
          [
            "몸의 변화",
            "체중·옷의 맞음새가 달라진 시기, 갑자기인지 서서히인지, 붓기나 일상 불편. 모르는 수치는 만들지 않습니다."
          ],
          [
            "약의 변화",
            "처방약·일반약·보충제의 이름과 시작·변경 시기. 같은 시기에 변했어도 원인은 의료진에게 확인합니다."
          ],
          [
            "수면과 생활",
            "잠을 자는 조건, 근무·돌봄 일정, 식사 준비·활동을 어렵게 한 일과 가능한 도움."
          ]
        ]
      }
    },
    {
      "title": "갑작스러운 증가와 붓기는 ‘살이 쪘다’로 넘기지 마세요",
      "paragraphs": [
        "원치 않던 체중 증가에는 수분이 몸에 쌓이는 경우도 있습니다. 뚜렷한 이유 없이 갑자기 늘었거나 새로 붓는다면 지방이 늘었다고 단정하지 말고 의료기관에 연락해 원인과 진료 시점을 확인하세요. 체중을 빨리 줄이려고 이뇨제나 감량 제품을 스스로 시작하지 않습니다.",
        "붓기와 함께 숨이 차거나 가슴이 눌리고 조이는 불편이 있으면 즉시 119에 도움을 요청합니다. 심한 호흡곤란이나 의식 저하도 119 도움이 먼저입니다. 비만 때문이라고 여기거나 기록을 마칠 때까지 기다리지 않습니다."
      ],
      "claimIds": [
        "OBS-P3-005"
      ],
      "sourceIds": [
        "SRC-MEDLINEPLUS-WEIGHT-GAIN",
        "SRC-MEDLINEPLUS-LEG-SWELLING",
        "SRC-KDCA-CPR"
      ],
      "tone": "warning",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/danger-signals",
          "label": "체중 문제와 별개로 먼저 대응할 위험 신호"
        }
      ]
    },
    {
      "title": "본인이 고른 한 가지를 돕는 생활 환경",
      "paragraphs": [
        "원하는 도움은 본인이 한 가지 고릅니다. 식사 준비 나누기, 쉬는 시간을 방해하지 않기, 진료 동행처럼 가능한 일을 먼저 물을 수 있습니다. 어떤 일을 함께 할지 정했으면 다음에는 체중 결과보다 그 도움이 실제로 편했는지 확인해 보세요.",
        "아래 그림은 가능한 도움의 예입니다. 정해진 식단·수면 시간·운동량을 지시하지 않습니다. 활동의 종류와 정도는 몸의 상태에 따라 달라질 수 있고, 통증이나 숨참이 있다면 무조건 걷기를 권하지 않습니다. 무엇을 바꿀지는 본인의 선호와 진료 안내를 함께 고려합니다."
      ],
      "claimIds": [
        "OBS-P3-003",
        "OBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-OBESITY-FACTORS",
        "SRC-NIDDK-OBESITY-TREATMENT",
        "SRC-NIDDK-WEIGHT-CONVERSATION"
      ],
      "imageId": "obs-action"
    },
    {
      "title": "치료 목표는 체중 숫자 하나로 정하지 않습니다",
      "paragraphs": [
        "비만은 혈압·혈당·수면 중 호흡 문제·관절 불편 등과 관련될 수 있지만, 비만이라는 말만으로 이런 질환이 모두 있다는 뜻은 아닙니다. 현재 증상과 검사 결과, 개인 이력을 살펴 필요한 평가를 의료진과 정합니다.",
        "식사와 활동 조정, 전문적인 체중 관리, 약물이나 수술 등 치료 선택지가 있습니다. 모두에게 같은 방법이 필요하지는 않습니다. 이 페이지는 치료 대상 기준이나 약 이름·용량, 목표 체중·감량 속도를 정하지 않습니다. 나이와 질환, 현재 치료, 생활 여건에 맞는 계획을 담당 의료진과 상의합니다."
      ],
      "claimIds": [
        "OBS-P3-003",
        "OBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-OBESITY-RISKS",
        "SRC-NIDDK-OBESITY-TREATMENT",
        "SRC-NIDDK-WEIGHT-CONVERSATION",
        "SRC-MEDLINEPLUS-WEIGHT-GAIN"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/type-2-diabetes",
          "label": "혈당 검사를 함께 설명받았다면"
        },
        {
          "href": "/health/sleep-apnea",
          "label": "코골이와 수면 중 호흡 문제가 걱정된다면"
        }
      ]
    },
    {
      "title": "상담 질문과 내가 원하는 도움 한 가지",
      "bullets": [
        "최근 변화 세 칸에서 어떤 내용이나 검사를 더 확인하면 좋을까요?",
        "제 상황에서 치료로 기대하는 변화와 부담, 다음에 경과를 볼 방법은 무엇인가요?",
        "가족에게 원하는 도움은 무엇이며, 혼자 결정하고 싶은 부분은 무엇인가요?"
      ],
      "paragraphs": [
        "질문은 전부 할 필요 없이 중요한 것부터 고릅니다. 이미 받은 결과표나 약 목록이 있으면 활용하고, 기록이 부족하다고 진료를 미루지는 마세요."
      ],
      "claimIds": [
        "OBS-P3-003",
        "OBS-P3-004"
      ],
      "sourceIds": [
        "SRC-NIDDK-OBESITY-TREATMENT",
        "SRC-NIDDK-WEIGHT-CONVERSATION"
      ],
      "tone": "note",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/appointment-questions",
          "label": "가장 중요한 진료 질문부터 고르는 방법"
        }
      ]
    }
  ],
  "faq": [],
  "sourceIds": [
    "SRC-NIDDK-OBESITY-DEFINITION",
    "SRC-NIDDK-OBESITY-FACTORS",
    "SRC-NIDDK-OBESITY-RISKS",
    "SRC-NIDDK-HEALTHY-WEIGHT",
    "SRC-NIDDK-OBESITY-TREATMENT",
    "SRC-NIDDK-WEIGHT-CONVERSATION",
    "SRC-AMC-OBESITY",
    "SRC-MEDLINEPLUS-WEIGHT-GAIN",
    "SRC-MEDLINEPLUS-LEG-SWELLING",
    "SRC-KDCA-CPR"
  ],
  "imageIds": [
    "obs-hero",
    "obs-concept",
    "obs-action"
  ],
  "visuals": {
    "obs-hero": {
      "src": "/images/onurim/obesity/hero.webp",
      "alt": "기록 용지와 원형 표지로 건강 상담 준비를 상징하는 장식 삽화",
      "caption": "표지의 색과 원은 개인 체형이나 체지방률·진단 결과를 뜻하지 않습니다.",
      "width": 1536,
      "height": 1024
    },
    "obs-concept": {
      "src": "/images/onurim/obesity/concept-v2.webp",
      "alt": "복부 단면에서 근육 벽 바깥의 피하지방과 벽 안 장 사이의 내장·장간막 지방 위치를 구분한 개념도",
      "caption": "바깥쪽 노란 층은 피부 아래·근육 벽 밖의 피하지방, 안쪽 장 사이 노란 부분은 내장·장간막 지방을 상징합니다. 위치를 단순화한 그림이며 실제 검사 영상·지방량·정상 기준이 아닙니다. BMI나 허리둘레만으로 이 모양을 알 수는 없습니다.",
      "width": 1536,
      "height": 1024
    },
    "obs-action": {
      "src": "/images/onurim/obesity/action-v2.webp",
      "alt": "가족이 식사 준비를 나누는 장면, 조용한 침실을 지키는 장면, 성인 두 사람이 평평한 길에서 동행하는 장면",
      "caption": "동의를 받고 식사 준비·휴식 여건·가능한 동행을 돕는 예입니다. 그림의 음식과 활동은 정해진 식단·운동량이나 감량 효과를 뜻하지 않으며 개인의 상태와 선택에 따라 달라집니다.",
      "width": 1536,
      "height": 1024
    }
  },
  "toolSlugs": [
    "obesity-visit-card"
  ]
};
