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
  "slug": "migraine",
  "seoTitle": "편두통 일지: 두통 발생일·급성기 약 사용일과 재연락 질문",
  "title": "두통이 있던 날과 약을 쓴 날, 달력에 따로 남기세요",
  "eyebrow": "뇌·마음 · 두통 전후를 설명하는 기록",
  "publishedAt": "2026-08-26",
  "updatedAt": "2026-10-01",
  "sourceCheckedAt": "2026-10-01",
  "description": "자주 아프다는 말에 두통 발생일과 실제 급성기 약 사용일을 따로 더해 보세요. 가상 두 줄 기록으로 생활 영향·약 사용 후 변화를 구분하고, 새 위험 신호와 담당 진료팀의 재연락 기준을 확인합니다.",
  "outcome": "두통이 있었던 날과 급성기 약을 실제 사용한 날을 구분해 기록하고, 약의 목적·사용 후 변화·재연락 기준을 진료에서 물을 수 있습니다.",
  "archetype": "BODY_SIGNAL",
  "summary": [
    "갑작스러운 극심한 두통이나 새 말·시야·마비·의식 변화는 기록보다 119가 먼저입니다.",
    "두통 발생일과 급성기 약을 실제 사용한 날은 다른 기록입니다. 예방약의 계획된 사용과도 구분합니다.",
    "평소 패턴이 달라졌거나 치료가 잘 듣지 않으면 진료팀에 알리고, 본인의 재연락 기준을 확인합니다."
  ],
  "sections": [
    {
      "title": "새로운 위험 신호라면 두통 일지보다 119가 먼저입니다",
      "paragraphs": [
        "갑자기 시작된 극심한 두통이 있으면 즉시 119에 연락합니다. 갑작스러운 말하기·이해하기 어려움, 시야 이상, 한쪽 얼굴·팔·다리의 힘 빠짐이나 감각 이상, 균형 상실도 각각 즉시 도움을 요청할 신호입니다. 두통과 이 변화가 모두 있어야 하는 조건이 아닙니다.",
        "새 의식 저하·혼돈이나 경련이 있으면 즉시 119에 연락합니다. 증상이 잠깐 좋아졌거나 예전에 편두통을 진단받았다는 이유로 기다리지 않습니다. 직접 운전하지 말고 신고를 받은 사람의 안내를 따르세요.",
        "머리를 다친 뒤 두통이 생기거나, 두통에 발열 또는 목의 뻣뻣함이 동반되면 즉시 의료 도움을 받으세요. 두 증상이 모두 생길 때까지 기다리지 않습니다. 바로 평가받을 수 없으면 응급의료기관으로 가거나 119에 연락하세요. 심한 통증이나 앞의 신경·의식 변화가 있다면 즉시 119에 연락합니다. 약 반응을 보거나 기록을 완성하느라 도움을 늦추지 마세요."
      ],
      "claimIds": [
        "MIG-P3-005"
      ],
      "sourceIds": [
        "SRC-NHS-MIGRAINE",
        "SRC-CDC-STROKE-SIGNS",
        "SRC-MEDLINEPLUS-HEADACHE",
        "SRC-MEDLINEPLUS-HEADACHE-DANGER"
      ],
      "tone": "warning",
      "imageId": null,
      "links": [
        {
          "href": "/health/stroke",
          "label": "잠깐 호전되어도 넘기지 않는 뇌졸중 신호"
        },
        {
          "href": "/health/guides/danger-signals",
          "label": "갑작스러운 몸의 위험 신호와 도움 요청"
        }
      ]
    },
    {
      "title": "달력의 두 줄은 서로 다른 질문을 만듭니다",
      "paragraphs": [
        "“자주 아파요”라는 설명에 두통 발생일과 실제 급성기 약 사용일을 따로 더하면 진료 대화가 구체적이 됩니다. 약 이름을 모르겠다면 처방전이나 포장을 가져가 확인합니다. 이 기록은 앞으로 약을 먹을 날이나 추가 복용량을 정하는 도구가 아닙니다.",
        "아래는 구분 방법만 보여 주는 가상 달력 두 줄입니다. 실제 환자의 경험, 정상 사용 빈도, 약 효과 비교나 앞으로의 복용 계획이 아닙니다. 예시 날짜에 맞춰 약을 먹거나 건너뛰지 않습니다."
      ],
      "table": {
        "caption": "가상 기록: 두통이 있던 날과 실제 급성기 약 사용일을 따로 표시",
        "columns": [
          "예시 날짜",
          "두통과 생활 영향",
          "그날 실제 급성기 약 사용"
        ],
        "rows": [
          [
            "10월 1일",
            "두통이 있었고 밝은 화면을 보기 어려웠음",
            "사용했음. 사용 뒤 변화는 기억나지 않아 모름으로 남김."
          ],
          [
            "10월 2일",
            "두통이 있었고 하던 일을 잠시 멈췄음",
            "사용하지 않았음. 이 예시는 미사용을 권하는 지시가 아님."
          ]
        ]
      },
      "claimIds": [
        "MIG-P3-003",
        "MIG-P3-004"
      ],
      "sourceIds": [
        "SRC-KDCA-MIGRAINE",
        "SRC-MEDLINEPLUS-MIGRAINE-HOME",
        "SRC-NHS-MIGRAINE"
      ],
      "imageId": "migraine-action",
      "links": [
        {
          "href": "/health/tools/migraine-visit-card",
          "label": "편두통 관찰·진료 질문 카드"
        },
        {
          "href": "/health/guides/medication-list",
          "label": "사용 중인 약을 함께 알리는 목록"
        }
      ],
      "bullets": [
        "두통이 있던 날과 급성기 약을 사용한 날을 각각 표시합니다. 하루의 복용 횟수와 사용한 날짜를 혼동하지 않습니다.",
        "평소 정해진 예방약과 급성 증상 때문에 사용한 약의 목적을 처방 안내로 확인합니다. 예방약을 빠뜨리거나 바꾸라는 기록이 아닙니다.",
        "실제 약 이름·사용 후 도움이 된 점과 불편, 수면·식사 맥락을 덧붙일 수 있습니다. 한 번 겹쳤다는 이유로 원인이나 효과를 확정하지 않습니다."
      ]
    },
    {
      "title": "두 줄 옆에 덧붙일 짧은 전·중·후 장면",
      "paragraphs": [
        "편두통은 이름과 달리 한쪽 머리만 아파야 하는 것은 아닙니다. 욱신거림, 메스꺼움, 빛·소리 민감성이나 움직일 때의 불편을 함께 살피고, 멈춘 일·학업·집안일을 설명합니다. 모든 사람이 같은 순서나 모든 단계를 겪지는 않습니다.",
        "일부는 시각·감각 등의 조짐을 겪지만 온라인 설명으로 새 증상을 조짐이라고 확정하지 않습니다. 갑작스러운 말·시야 이상이나 한쪽 힘 빠짐은 맨 위 응급 안내를 따릅니다. 평소 조짐에 대한 안내를 받았어도 일반적인 지속 시간이 끝날 때까지 기다리는 안전선으로 삼지 않습니다."
      ],
      "claimIds": [
        "MIG-P3-001",
        "MIG-P3-002",
        "MIG-P3-004",
        "MIG-P3-005"
      ],
      "sourceIds": [
        "SRC-KDCA-MIGRAINE",
        "SRC-AMC-MIGRAINE",
        "SRC-MEDLINEPLUS-MIGRAINE",
        "SRC-MEDLINEPLUS-MIGRAINE-HOME",
        "SRC-NHS-MIGRAINE",
        "SRC-CDC-STROKE-SIGNS"
      ],
      "imageId": "migraine-concept",
      "table": {
        "caption": "필수 단계가 아닌, 두통 전후를 돌아보는 질문",
        "columns": [
          "돌아볼 때",
          "내 경험에서 적어 볼 내용"
        ],
        "rows": [
          [
            "통증 전",
            "평소와 달랐던 수면·피로·기분 변화가 있었나요? 없었다면 없다고 적습니다."
          ],
          [
            "통증이 있을 때",
            "언제 어떻게 시작했고, 빛·소리·메스꺼움이나 움직임이 얼마나 불편했나요?"
          ],
          [
            "통증이 줄어든 뒤",
            "피로가 남았는지, 일상으로 돌아가는 데 어떤 어려움이 있었나요?"
          ]
        ]
      },
      "links": [
        {
          "href": "/health/guides/symptom-journal",
          "label": "기억한 사실과 추측을 나누는 증상 기록"
        }
      ]
    },
    {
      "title": "검사 결과 하나보다 병력과 진찰이 먼저 필요한 이유",
      "paragraphs": [
        "진료에서는 시작 시기, 반복 양상, 위치·느낌, 동반 변화와 생활 영향을 묻고 신체·신경학적 진찰을 합니다. CT·MRI 등은 다른 원인을 확인할 필요에 따라 선택합니다. 모든 두통에 같은 영상검사가 필요하거나, 영상이 정상이면 편두통으로 확정된다는 뜻은 아닙니다.",
        "‘검사는 무엇을 확인하려는 건가요?’, ‘검사가 필요하지 않다면 어떤 변화가 생길 때 다시 연락해야 하나요?’를 물어보세요. 예전 검사 결과도 가져갈 수 있지만, 새로운 증상에 대한 평가를 대신하는 자료로 보지는 않습니다."
      ],
      "claimIds": [
        "MIG-P3-003"
      ],
      "sourceIds": [
        "SRC-KDCA-MIGRAINE",
        "SRC-AMC-MIGRAINE",
        "SRC-MEDLINEPLUS-MIGRAINE"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/reading-health-results",
          "label": "검사 결과와 다음 평가 계획을 함께 읽기"
        }
      ]
    },
    {
      "title": "약의 목적과 다시 연락할 기준을 따로 확인하기",
      "paragraphs": [
        "급성기 치료는 현재 발작의 증상을 줄이는 목적이고, 예방치료는 앞으로의 발작과 생활 부담을 줄이는 목적입니다. 필요성·방법은 빈도·심한 정도·다른 건강 상태에 따라 정합니다. 모든 사람이 같은 약을 매일 복용하는 계획은 아닙니다.",
        "통증 때문에 쓰는 약의 사용일이 늘거나 이전 치료가 잘 듣지 않으면 의료진에게 알립니다. 급성기 약을 자주 쓰는 양상은 약물 과용에 의한 두통 가능성도 함께 평가할 정보입니다. 여기서는 하나의 횟수를 안전한 한도로 정하거나 예방약에도 같은 제한을 적용하지 않습니다. 약을 혼자 늘리거나 바꾸거나 중단하지 마세요.",
        "두통의 패턴·강도가 달라지거나, 평소보다 길어지거나, 일상을 유지하기 어려우면 진료팀에 연락해 평가 시점을 확인합니다. 임신 중이거나 출산 직후의 두통은 신속히 의료진과 상담하세요. 앞의 응급 신호는 예약일까지 기다릴 상황이 아닙니다."
      ],
      "claimIds": [
        "MIG-P3-004",
        "MIG-P3-005"
      ],
      "sourceIds": [
        "SRC-NHS-MIGRAINE",
        "SRC-KDCA-MIGRAINE",
        "SRC-MEDLINEPLUS-MIGRAINE",
        "SRC-MEDLINEPLUS-HEADACHE-DANGER"
      ],
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/appointment-questions",
          "label": "약의 목적·재연락 기준을 묻는 진료 질문"
        }
      ]
    },
    {
      "title": "다음 진료에서 달력을 펴고 물을 세 가지",
      "paragraphs": [
        "두통이 없었던 날도 알고 있는 범위에서 남기고, 기억나지 않는 날은 추측으로 채우지 않습니다. 기록이 부족하다고 진료를 미루지 마세요. 담당 진료팀과 정한 답을 적되 새 응급 신호는 그 연락 시점까지 기다리지 않습니다."
      ],
      "bullets": [
        "제 두통 발생일과 급성기 약 사용일을 함께 보면 무엇을 더 확인해야 하나요?",
        "제가 쓰는 약은 각각 어떤 목적이며, 사용 후 불편이나 효과 부족은 어떻게 알리나요?",
        "평소보다 길거나 강해진 두통·조짐, 생활을 막는 변화가 생기면 언제 어디로 연락하나요?"
      ],
      "sourceIds": [
        "SRC-NHS-MIGRAINE",
        "SRC-MEDLINEPLUS-MIGRAINE-HOME"
      ],
      "claimIds": [
        "MIG-P3-003",
        "MIG-P3-004",
        "MIG-P3-005"
      ],
      "tone": "note",
      "imageId": null,
      "links": [
        {
          "href": "/health/guides/appointment-questions",
          "label": "담당 진료팀의 재연락 기준을 질문으로 정리하기"
        }
      ]
    }
  ],
  "faq": [],
  "sourceIds": [
    "SRC-MEDLINEPLUS-MIGRAINE",
    "SRC-MEDLINEPLUS-HEADACHE",
    "SRC-KDCA-MIGRAINE",
    "SRC-AMC-MIGRAINE",
    "SRC-NHS-MIGRAINE",
    "SRC-MEDLINEPLUS-HEADACHE-DANGER",
    "SRC-MEDLINEPLUS-MIGRAINE-HOME",
    "SRC-CDC-STROKE-SIGNS"
  ],
  "imageIds": [
    "migraine-hero",
    "migraine-concept",
    "migraine-action"
  ],
  "visuals": {
    "migraine-hero": {
      "src": "/images/onurim/migraine/hero.webp",
      "alt": "진료 메모와 상담 준비를 상징하는 초록·노랑 장식 표지 삽화",
      "caption": "표지의 선과 십자 모양은 뇌 검사 결과나 의료인 검수 완료 표시가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "migraine-concept": {
      "src": "/images/onurim/migraine/concept-v2.webp",
      "alt": "가상 성인 곁에 빛·소리, 메스꺼움, 피로와 휴식을 상징하는 작은 장면을 배치한 편두통 동반 변화 삽화",
      "caption": "빛·소리 민감성, 메스꺼움, 피로를 상징한 AI 생성 삽화입니다. 전구는 전조의 섬광, 위 모양은 장기 손상, 누운 모습은 치료 효과를 뜻하지 않습니다. 모두에게 필요한 단계나 진단 기준이 아니며, 새 신경 증상을 잠으로 넘기라는 안내가 아닙니다.",
      "width": 1536,
      "height": 1024
    },
    "migraine-action": {
      "src": "/images/onurim/migraine/action-v2.webp",
      "alt": "가상 성인이 두통 기록과 약 사용 기록이라는 빈 양식 앞에서 연필을 든 AI 생성 장면",
      "caption": "실제 환자·진료 기록이 아닌 AI 생성 장면입니다. 두통과 이미 사용한 약을 설명하는 빈 기록 예시이지 약을 먹을 날짜·횟수·용량을 정하는 일정표가 아닙니다. 응급 신호가 있으면 작성보다 도움 요청이 먼저입니다.",
      "width": 1536,
      "height": 1024
    }
  },
  "toolSlugs": [
    "migraine-visit-card"
  ]
};
