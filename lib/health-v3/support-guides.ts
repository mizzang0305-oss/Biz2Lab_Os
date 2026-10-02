import type { HealthSource } from "./content";
import { dailyGuides20261002 } from "./daily-guides-20261002";

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
  ...dailyGuides20261002,
  {
    "slug": "danger-signals",
    "title": "지금 위험 신호가 있다면, 기록보다 119가 먼저입니다",
    "seoTitle": "응급 위험 신호: 119·112·109의 역할과 신고 후 전할 내용",
    "description": "갑작스러운 마비·말 이상, 심근경색이 의심되는 흉부 불편, 심한 호흡곤란에는 즉시 119에 연락하세요. 폭력·위협으로 경찰 보호가 필요하면 112입니다. 주소나 약 이름을 모두 알아내느라 신고를 미루지 마세요.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "sections": [
      {
        "id": "urgent-action",
        "title": "몸의 응급 신호 — 지금 119",
        "tone": "warning",
        "paragraphs": [
          "아래 신호 중 하나만 있어도 즉시 도움을 요청하세요. 모든 신호가 나타나거나 심한 통증이 생길 때까지 기다리지 않습니다. 직접 운전하거나 가족의 차를 기다리지 마세요."
        ],
        "bullets": [
          "갑자기 한쪽 얼굴·팔·다리에 힘이 빠지거나 감각이 달라짐, 말하거나 이해하기 어려움, 시야 이상, 어지럼·균형 장애 또는 원인을 알 수 없는 갑작스러운 심한 두통",
          "가슴이 조이거나 무겁고 불편함, 팔·등·목·턱으로 번지는 통증 등 심근경색이 의심되는 증상 — 새롭거나 평소와 다른 흉부 불편이 가벼워도 심근경색이 의심되면 119",
          "헐떡이거나 말을 잇기 어려울 만큼 숨이 참, 입술·피부가 매우 창백하거나 푸르스름함, 갑자기 혼란스럽거나 깨우기 어려움"
        ],
        "sourceIds": [
          "SUP-CDC-STROKE",
          "SUP-NHLBI-MI",
          "SUP-NHS-BREATH",
          "SUP-MEDLINEPLUS-EMERGENCY"
        ]
      },
      {
        "id": "mental-crisis",
        "title": "자해·폭력의 위기 — 구조와 보호가 먼저",
        "tone": "warning",
        "paragraphs": [
          "이미 자신을 다치게 했거나 지금 자신·다른 사람의 안전을 지키기 어렵다면 즉시 119에 연락하세요. 폭력·위협 등으로 즉각적인 경찰 보호가 필요하면 112에 신고하세요. 도움을 주는 사람도 자신의 안전을 먼저 확보하고, 안전하게 함께 있을 수 있다면 혼자 두지 말고 긴급기관의 안내를 따릅니다.",
          "자살 생각이나 마음의 위기를 이야기할 상담은 24시간 자살예방상담전화 109에서 받을 수 있습니다. 109 상담을 먼저 받거나 연결될 때까지 기다려야 119·112에 신고할 수 있는 것은 아닙니다. 지금 필요한 구조·보호를 미루지 마세요."
        ],
        "sourceIds": [
          "SUP-MEDLINEPLUS-EMERGENCY",
          "SUP-POLICE-112",
          "SUP-MOHW-109"
        ]
      },
      {
        "id": "after-calling",
        "title": "119에 먼저 전화한 뒤, 아는 사실을 전하세요",
        "paragraphs": [
          "정확한 주소나 약 이름을 모두 알아내기 전에도 신고하세요. 통화 중 질문에 따라 아는 사실을 전하고, 모르는 것은 모른다고 말합니다. 아래 표를 완성한 뒤 전화하라는 뜻이 아닙니다."
        ],
        "table": {
          "caption": "신고 후 전달할 최소 정보 — 사전 작성표가 아닙니다",
          "columns": [
            "알려줄 것",
            "아는 범위에서 말할 내용"
          ],
          "rows": [
            [
              "현재 위치",
              "주소를 모르면 주변 건물·표지 등 찾을 수 있는 단서"
            ],
            [
              "지금 보이는 변화",
              "반응·호흡·통증 등 평소와 다른 모습; 알면 처음 시작한 시각"
            ],
            [
              "알고 있는 배경",
              "나이·질환·복용약을 아는 만큼; 모르는 내용은 추측하지 않기"
            ],
            [
              "연락과 안내",
              "요청받은 연락처를 전하고 전화를 끊지 않은 채 안내받기"
            ]
          ]
        },
        "sourceIds": [
          "SUP-NFA-119",
          "SUP-CDC-STROKE"
        ]
      },
      {
        "id": "while-waiting",
        "title": "기다리는 동안은 통화 안내를 따릅니다",
        "paragraphs": [
          "반응이나 호흡이 달라지면 통화 중 바로 알리세요. 짧은 글만 보고 응급처치 자세나 약 복용법을 새로 결정하지 말고 119의 상황별 지도를 받습니다. 아스피린 등 약을 찾거나 혈압을 재느라 신고를 늦추지 않습니다. 모든 처방약을 일괄 중단하라는 뜻도 아닙니다."
        ],
        "sourceIds": [
          "SUP-NFA-119",
          "SUP-NHLBI-MI"
        ]
      },
      {
        "id": "after-safety",
        "title": "평소에 알아둘 구분: 잠깐 나아진 것과 안전 확인",
        "paragraphs": [
          "갑작스러운 뇌졸중 의심 신호가 사라져도 안전하다고 단정하지 않습니다. 심근경색 증상도 가볍게 시작하거나 나타났다 사라질 수 있습니다. 증상이 있었던 사실을 긴급기관에 전하고 안내받으세요.",
          "새로 숨이 차거나 평소보다 더 숨찬 경우에는 심한 호흡장애가 아니어도 신속하게 의료진의 평가를 받으세요. 심한 호흡곤란·가슴 조임·갑작스러운 혼란 등 위의 응급 신호가 있으면 119가 먼저입니다. NHS의 호흡곤란 안내를 참고하되, 영국의 신고 번호를 한국 번호와 혼용하지 않습니다.",
          "이 글은 성인의 대표 신호를 정리한 교육 자료이며, 목록에 없다고 안전이 보장되지 않습니다. 멈추지 않는 출혈이나 갑작스러운 심한 통증 등 다른 응급상황도 있습니다. 어린이·임신 중·큰 사고의 판단을 이 목록으로 대신하지 마세요. 응급 신호가 없는 지속적인 불편은 의료진과 상담하고, 새 위험 신호가 생기면 예약일까지 기다리지 않습니다."
        ],
        "sourceIds": [
          "SUP-CDC-STROKE",
          "SUP-NHLBI-MI",
          "SUP-NHS-BREATH",
          "SUP-MEDLINEPLUS-EMERGENCY"
        ],
        "links": [
          {
            "href": "/health/stroke",
            "label": "안전이 확보된 뒤 읽을 뇌졸중 안내"
          },
          {
            "href": "/health/acute-myocardial-infarction",
            "label": "안전이 확보된 뒤 읽을 심근경색 안내"
          },
          {
            "href": "/health/guides/symptom-journal",
            "label": "응급 대응 뒤 진료에 가져갈 증상 기록"
          },
          {
            "href": "/health/guides/appointment-questions",
            "label": "다음 진료에서 연락 기준을 확인할 질문"
          }
        ]
      }
    ],
    "sources": [
      {
        "id": "SUP-NHLBI-MI",
        "organization": "NIH/NHLBI",
        "title": "Heart Attack Symptoms",
        "url": "https://www.nhlbi.nih.gov/health/heart-attack/symptoms",
        "sourceDate": "2022-03-24 (Last updated)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-MOHW-109",
        "organization": "보건복지상담센터",
        "title": "자살예방상담전화 109",
        "url": "https://www.129.go.kr/109",
        "sourceDate": "게시일 미표기; 24시간 상담 안내 확인",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-CDC-STROKE",
        "organization": "CDC",
        "title": "Signs and Symptoms of Stroke",
        "url": "https://www.cdc.gov/stroke/signs-symptoms/index.html",
        "sourceDate": "2026-05-19",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-NFA-119",
        "organization": "소방청",
        "title": "119 구급신고 요령",
        "url": "https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/",
        "sourceDate": "페이지 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-MEDLINEPLUS-EMERGENCY",
        "organization": "MedlinePlus Medical Encyclopedia / A.D.A.M.",
        "title": "Recognizing medical emergencies",
        "url": "https://medlineplus.gov/ency/article/001927.htm",
        "sourceDate": "2025-01-08 (Review Date; 참고문헌접근일과 구분)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-NHS-BREATH",
        "organization": "NHS",
        "title": "Shortness of breath",
        "url": "https://www.nhs.uk/symptoms/shortness-of-breath/",
        "sourceDate": "2024-01-30 (Page last reviewed)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-POLICE-112",
        "organization": "경찰청 112신고포털",
        "title": "112신고 제도의 의의",
        "url": "https://www.112.go.kr/rpea/web/getBoardDtl.do?type=B&seqNo=313",
        "sourceDate": "2024-10-31 (목록 게시일)",
        "retrievedAt": "2026-10-01"
      }
    ]
  },
  {
    "slug": "measuring-blood-pressure",
    "title": "혈압이 두 번 다르게 나왔어요. 어느 값을 적을까요?",
    "seoTitle": "가정혈압 두 번 측정: 원값·시각·조건을 함께 남기는 순서",
    "description": "첫 번째보다 두 번째 혈압이 낮게 나왔다면 낮은 값만 적으면 될까요? 두 값 모두 남기는 데서 시작합니다. 한 번의 측정 세션을 준비하고 시각·원값·조건을 함께 기록하는 순서를 따라갑니다.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "faqTitle": "집에서 잴 때 자주 막히는 부분",
    "sections": [
      {
        "id": "urgent-action",
        "title": "응급 신호가 있다면 재측정보다 119",
        "paragraphs": [
          "새롭거나 평소와 다른 가슴 압박·불편 등으로 심근경색이 의심되면 심한 통증이 될 때까지 기다리지 않습니다. 심한 호흡곤란, 갑작스러운 한쪽 마비나 말·시야·균형의 변화도 혈압을 다시 재며 기다릴 신호가 아닙니다. 즉시 119에 연락하고 직접 운전하지 마세요. 수치가 낮아 보인다는 이유로 도움을 미루지 않습니다."
        ],
        "tone": "warning",
        "sourceIds": [
          "SUP-BP-NHLBI-MI",
          "SUP-BP-CDC-STROKE",
          "SUP-BP-NHS-MI"
        ],
        "links": [
          {
            "href": "/health/guides/danger-signals",
            "label": "측정·기록보다 도움 요청이 먼저인 다른 위험 신호"
          }
        ]
      },
      {
        "id": "very-high-without-symptoms",
        "title": "증상이 없어도 매우 높은 값이 반복되면 즉시 연락",
        "paragraphs": [
          "증상이 없더라도 매우 높은 값이 다시 측정해도 계속 나오면 기록을 며칠 더 모으거나 정기진료까지 기다리지 말고 즉시 의료진에게 연락하세요. AHA가 비임신 성인에 대해 안내하는 매우 높은 범위와 재측정 방법은 아래 원문과 고혈압 글에서 확인할 수 있습니다. 응급 신호가 있다면 이 분기보다 위의 119 안내가 먼저입니다.",
          "측정값만으로 스스로 진단하거나 약을 조절하지 마세요. 임신·소아에 성인 안내를 그대로 적용하지 말고 개별 의료진의 연락 지침을 우선하세요. 평소 연락 기준을 아직 받지 못했다면 무엇을 측정하고 언제 어디로 연락할지 진료에서 정해 두세요."
        ],
        "sourceIds": [
          "SUP-AHA-BP",
          "SUP-AHA-BP-URGENT"
        ],
        "links": [
          {
            "href": "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/when-to-call-911-for-high-blood-pressure",
            "label": "AHA 원문: 매우 높은 값·증상 유무에 따른 연락 안내 (미국 비임신 성인)"
          },
          {
            "href": "/health/hypertension#urgent-action",
            "label": "고혈압 글의 성인 수치 기준·예외와 도움 요청 안내"
          }
        ]
      },
      {
        "title": "1. 팔과 커프, 같은 기기로 확인하기",
        "paragraphs": [
          "가정에서는 검증된 자동 위팔 커프형 혈압계를 사용하는 것이 권장됩니다. 커프는 팔에 감아 공기를 넣는 띠입니다. 팔 둘레에 맞지 않으면 결과가 부정확해질 수 있으므로 제품의 적용 크기를 확인합니다.",
          "이미 가진 기기를 진료에 가져가 커프가 맞는지와 사용법을 확인받으세요. 임신 중이거나 어린이가 사용하는 경우에는 해당 대상에서 검증된 기기인지도 확인합니다. 이 페이지는 특정 제품을 추천하거나 기기 정확도를 인증하지 않습니다."
        ],
        "sourceIds": [
          "SUP-AHA-BP",
          "SUP-NHS-BP"
        ],
        "links": [
          {
            "href": "/health/tools/blood-pressure-prep",
            "label": "인쇄용 준비표로 기기·커프·자세를 점검하기"
          }
        ]
      },
      {
        "title": "2. 앉아 쉬고, 버튼을 누르기 전 네 곳 확인",
        "paragraphs": [
          "미국심장협회(AHA)·CDC의 준비 안내를 바탕으로, 측정 전 30분 동안은 흡연·카페인 음료·운동을 피하고 방광을 비운 뒤 최소 5분 조용히 쉽니다. 재는 동안 말하거나 휴대전화를 사용하지 않습니다. 이는 일상 측정을 위한 준비이지 응급 신호가 있을 때 기다릴 시간은 아닙니다."
        ],
        "table": {
          "caption": "버튼을 누르기 전 네 곳 확인 — 진단 기준표가 아닙니다",
          "columns": [
            "확인할 곳",
            "맞출 조건"
          ],
          "rows": [
            [
              "등",
              "등받이에 기대어 지지받기"
            ],
            [
              "발과 다리",
              "두 발을 바닥에 두고 다리를 꼬지 않기"
            ],
            [
              "팔",
              "탁자 등에 받쳐 커프가 심장 높이에 오도록 하기"
            ],
            [
              "커프와 옷",
              "옷 위가 아닌 맨팔에, 기기 설명서의 위치와 맞는 크기로 감기"
            ]
          ]
        },
        "sourceIds": [
          "SUP-AHA-BP",
          "SUP-CDC-BP",
          "SUP-AHA-BP-POSTURE"
        ]
      },
      {
        "title": "3. 한 번의 세션에서 두 원값 남기기",
        "paragraphs": [
          "AHA의 가정 측정 안내는 1분 간격으로 두 번 재고 두 결과 모두 기록하도록 설명합니다. 의료진이 정해 준 간격·횟수·측정 팔과 기기 설명서가 있다면 그 계획을 따르세요. 첫 값과 둘째 값의 차이만으로 어느 쪽이 맞는지 판단하지 않습니다.",
          "원하는 숫자가 나올 때까지 계속 재서 낮은 값만 고르지 않습니다. 한 번 앉아 재는 횟수와 하루 중 측정 시각, 전체 기록 일수는 서로 다른 항목입니다. 다음 세션의 시각과 기간은 의료진과 정하고 약 먹는 시각도 임의로 바꾸지 않습니다."
        ],
        "sourceIds": [
          "SUP-AHA-BP",
          "SUP-CDC-BP",
          "SUP-NHS-BP"
        ]
      },
      {
        "title": "4. 시각·혈압·맥박·조건을 한 세트로 묶기",
        "paragraphs": [
          "다음 두 줄은 설명을 위한 가상 작성 예시입니다. 실제 환자의 기록도, 정상 판정이나 개인 목표값도 아닙니다. 혈압은 수축기/이완기 순서와 mmHg 단위로 옮기고 맥박은 별도 칸에 적습니다.",
          "둘째 값만 남기면 두 회차를 비교할 자료가 사라집니다. 말했거나 막 움직인 일처럼 측정 조건이 달랐다면 원값을 바꾸지 말고 그 사실을 메모하세요. 기기 오류나 큰 차이가 반복되면 기기·커프·원본 기록을 함께 가져가 사용법을 확인받습니다."
        ],
        "bullets": [
          "기기에 저장된 기록이나 원본 기록표를 진료에 가져갑니다.",
          "기기 오류 표시나 값 차이가 반복되면 커프·사용법·기기를 함께 확인받습니다."
        ],
        "sourceIds": [
          "SUP-AHA-BP",
          "SUP-CDC-BP",
          "SUP-NHS-BP"
        ],
        "links": [
          {
            "href": "/health/tools/blood-pressure-log",
            "label": "이 원값과 시각을 옮겨 적을 인쇄용 혈압 기록표 (화면 입력 저장 없음)"
          }
        ],
        "table": {
          "caption": "가상 작성 예시 — 두 값 모두 보존하며 정상·목표를 뜻하지 않습니다",
          "columns": [
            "날짜·시각 / 회차",
            "혈압 (mmHg)",
            "맥박 (회/분)",
            "당시 조건 메모"
          ],
          "rows": [
            [
              "10월 1일 07:00 / 1차",
              "146/89",
              "72",
              "5분 앉아 쉼, 대화 없음, 특별한 불편 없음"
            ],
            [
              "10월 1일 07:01 / 2차",
              "141/87",
              "71",
              "같은 팔·자세, 대화 없음"
            ]
          ]
        }
      },
      {
        "title": "측정은 이 글에서, 진료의 질문은 기록과 함께",
        "paragraphs": [
          "집과 병원에서 잰 값이 다르면 두 장소의 원본 기록과 조건을 함께 가져가세요. 한 번의 값으로 진단하거나 가정 기록만으로 약을 중단·늘리지 않습니다. 차이를 확인하는 검사와 개인 목표는 의료진에게 질문할 내용입니다.",
          "이 글의 결과물은 비교할 수 있는 두 회차의 기록입니다. 고혈압 글에서는 그 기록을 어떻게 보여 주고 어떤 질문을 남길지 이어갑니다. 가정 측정은 정기 진료를 대신하지 않습니다."
        ],
        "sourceIds": [
          "SUP-AHA-BP",
          "SUP-CDC-BP"
        ],
        "links": [
          {
            "href": "/health/hypertension",
            "label": "백의·가면 고혈압과 진단 과정을 이해하기"
          },
          {
            "href": "/health/tools/blood-pressure-questions",
            "label": "기록 차이와 다음 측정 계획을 물을 진료 질문지"
          }
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "id": "SUP-AHA-BP",
        "organization": "American Heart Association",
        "title": "Home Blood Pressure Monitoring",
        "url": "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home",
        "sourceDate": "2025-08-14 (Last Reviewed)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-CDC-BP",
        "organization": "CDC",
        "title": "Measuring Your Blood Pressure",
        "url": "https://www.cdc.gov/high-blood-pressure/measure/index.html",
        "sourceDate": "2026-09-04 (Updated; Reviewed2024-12-13)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-NHS-BP",
        "organization": "NHS",
        "title": "Blood pressure test",
        "url": "https://www.nhs.uk/tests-and-treatments/blood-pressure-test/",
        "sourceDate": "2025-11-25 (Page last reviewed)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-BP-NHLBI-MI",
        "organization": "NIH/NHLBI",
        "title": "Heart Attack Symptoms",
        "url": "https://www.nhlbi.nih.gov/health/heart-attack/symptoms",
        "sourceDate": "2022-03-24 (Last updated)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-BP-CDC-STROKE",
        "organization": "CDC",
        "title": "Signs and Symptoms of Stroke",
        "url": "https://www.cdc.gov/stroke/signs-symptoms/index.html",
        "sourceDate": "2026-05-19 (페이지 표시일)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-BP-NHS-MI",
        "organization": "NHS",
        "title": "Heart attack",
        "url": "https://www.nhs.uk/conditions/heart-attack/",
        "sourceDate": "2026-03-31 (Page last reviewed)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-AHA-BP-URGENT",
        "organization": "American Heart Association",
        "title": "When To Call 911 About High Blood Pressure",
        "url": "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/when-to-call-911-for-high-blood-pressure",
        "sourceDate": "2025-08-14 (Last Reviewed)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-AHA-BP-POSTURE",
        "organization": "American Heart Association",
        "title": "Home Blood Pressure Measurement Instructions (PDF)",
        "url": "https://www.heart.org/-/media/Files/Health-Topics/High-Blood-Pressure/How_to_Measure_Your_Blood_Pressure_Letter_Size.pdf",
        "sourceDate": "2025 (PDF copyright)",
        "retrievedAt": "2026-10-01"
      }
    ]
  },
  {
    "slug": "understanding-hba1c",
    "title": "HbA1c 숫자 두 개, 먼저 단위를 보세요",
    "seoTitle": "당화혈색소 HbA1c: NGSP·IFCC 가상 검사표와 혈당 비교",
    "description": "학습용 가상 검사표의 NGSP 6.0%와 IFCC 42 mmol/mol은 왜 서로 다른 숫자로 보일까요? 같은 HbA1c의 보고 단위를 구분하고, 공복혈당과 엇갈려 보일 때 검사 원본에 붙일 질문을 준비합니다.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "sections": [
      {
        "title": "가상 검사표: 숫자가 서로 싸우는 것처럼 보일 때",
        "paragraphs": [
          "아래 두 줄은 같은 HbA1c를 서로 다른 보고 단위로 표시한 학습용 가상 검사표입니다. 작성자·가족·실제 환자의 검사 결과가 아니며, 정상 범위·진단 예시·개인 목표값이 아닙니다. 6.0과 42 중 큰 숫자가 더 나쁘다는 뜻으로 비교하지 마세요.",
          "NGSP 공식 관계표의 6.0%와 42 mmol/mol 한 쌍을 사용했습니다. 공식 변환식 NGSP(%) = 0.09148 × IFCC(mmol/mol) + 2.152로 42를 넣으면 5.99416%, 소수 첫째 자리로 반올림하면 6.0%입니다. 보고 자릿수에 따른 반올림을 포함한 단위 대응 예시이며, 결과지의 수치를 직접 고치거나 개인 진단을 내리는 계산기가 아닙니다."
        ],
        "table": {
          "caption": "학습용 가상 검사표 두 줄 — 같은 HbA1c의 보고 단위 대응",
          "columns": [
            "검사표 표기",
            "가상 보고값·단위"
          ],
          "rows": [
            [
              "HbA1c (NGSP)",
              "6.0 %"
            ],
            [
              "HbA1c (IFCC)",
              "42 mmol/mol"
            ]
          ]
        },
        "sourceIds": [
          "SUP-NGSP-IFCC"
        ],
        "links": [
          {
            "href": "https://ngsp.org/ifccngsp.asp",
            "label": "NGSP 공식 관계표·단위 변환식 확인"
          }
        ]
      },
      {
        "title": "NGSP·IFCC: 같은 HbA1c라도 보고 단위가 다릅니다",
        "paragraphs": [
          "NGSP와 IFCC는 HbA1c 측정·보고를 표준화하는 체계와 관련된 이름입니다. NGSP는 병명이나 위험 등급이 아닙니다. 검사표에 NGSP와 IFCC가 함께 있어도 두 숫자를 같은 척도로 비교하면 안 됩니다."
        ],
        "table": {
          "caption": "검사표의 이름·단위·시간 범위 비교 — 진단 기준표가 아닙니다",
          "columns": [
            "검사표 표기",
            "단위",
            "무엇을 구분하나요"
          ],
          "rows": [
            [
              "HbA1c (NGSP)",
              "%",
              "최근 수개월의 평균적인 혈당 상태를 반영하는 당화혈색소 보고값"
            ],
            [
              "HbA1c (IFCC)",
              "mmol/mol",
              "HbA1c의 다른 보고 체계. NGSP %와 숫자를 그대로 비교하지 않음"
            ],
            [
              "공복혈당",
              "mg/dL 또는 mmol/L",
              "금식 후 채혈한 한 시점의 혈당. mmol/mol인 IFCC와도 단위가 다름"
            ]
          ]
        },
        "sourceIds": [
          "SUP-NGSP-IFCC",
          "SUP-NIDDK-A1C"
        ]
      },
      {
        "title": "HbA1c는 오늘 혈당의 다른 이름이 아닙니다",
        "paragraphs": [
          "당화혈색소는 적혈구 속 혈색소에 포도당이 붙은 형태를 말합니다. HbA1c 검사는 대략 지난 3개월의 평균적인 혈당 상태를 이해하는 데 쓰입니다. 한 시점에 잰 혈당과는 보는 기간이 다릅니다."
        ],
        "sourceIds": [
          "SUP-AMC-A1C",
          "SUP-NIDDK-A1C"
        ]
      },
      {
        "title": "공복혈당과 맞지 않아 보일 때",
        "paragraphs": [
          "두 검사는 서로 다른 정보를 줍니다. 결과가 엇갈린다고 어느 한쪽을 곧바로 틀렸다고 판단하지 마세요. 의료진이 검사 시점과 건강 상태를 함께 확인하고 필요한 재검을 정합니다.",
          "적혈구 상태나 검사 방법 때문에 HbA1c 해석이 달라질 수도 있습니다. 빈혈의 종류, 최근 출혈·수혈, 임신, 콩팥 질환 등을 진료 때 알려 주세요. 모든 빈혈이 결과를 같은 방향으로 바꾸는 것은 아닙니다.",
          "HbA1c 검사 자체는 일반적으로 금식이 필요하지 않지만 같은 날 다른 검사를 함께 할 수 있습니다. 준비 안내는 검사기관에서 확인하세요. 오늘 혈당과 최근 수개월의 HbA1c가 다르게 보이면 단위뿐 아니라 검사 날짜·건강 변화도 함께 설명받습니다."
        ],
        "tone": "note",
        "sourceIds": [
          "SUP-NIDDK-A1C",
          "SUP-NGSP-FACTORS"
        ]
      },
      {
        "title": "원본 비교는 짧게, 단위와 질문은 남겨 두세요",
        "paragraphs": [
          "검사명·단위·날짜는 원문 그대로 가져가세요. 일반 결과지 읽는 순서는 아래 별도 가이드에서 확인하고, 이 페이지에서는 같은 HbA1c 표기인지와 혈당 검사인지 구별하는 데 집중합니다."
        ],
        "links": [
          {
            "href": "/health/guides/reading-health-results",
            "label": "검사명·참고범위·추적 계획을 결과지에서 찾는 법"
          }
        ],
        "sourceIds": [
          "SUP-NGSP-IFCC",
          "SUP-NIDDK-A1C"
        ]
      },
      {
        "title": "검사 원본과 함께 가져갈 세 가지 질문",
        "bullets": [
          "‘이 표기와 단위가 이전 검사와 같은가요?’ — 두 결과표를 함께 보여 주세요.",
          "‘제 혈당과 HbA1c의 차이를 설명할 상황이 있나요?’ — 검사 날짜와 최근 건강 변화를 적어 갑니다.",
          "‘확인 검사가 필요하다면 무엇을 언제 하나요?’ — 다음 일정과 문의할 곳을 메모합니다."
        ],
        "links": [
          {
            "href": "/health/tools/diabetes-questions",
            "label": "제2형 당뇨병 진료 질문지 인쇄하기"
          },
          {
            "href": "/health/type-2-diabetes",
            "label": "제2형 당뇨병의 증상·검사·기록을 함께 이해하기"
          }
        ]
      },
      {
        "title": "이 페이지가 정하지 않는 것",
        "paragraphs": [
          "검사표 하나로 스스로 당뇨병을 확정하거나 약·인슐린을 시작, 중단, 증량하지 않습니다. 개인 목표와 재검 시점은 담당 의료진에게 확인합니다. 다른 사람의 결과나 목표를 그대로 적용하지 마세요."
        ],
        "links": [
          {
            "href": "/health/guides/danger-signals",
            "label": "온라인 설명보다 도움 요청이 먼저인 위험 신호"
          }
        ],
        "sourceIds": [
          "SUP-NIDDK-A1C"
        ]
      },
      {
        "title": "접속 확인일과 원문 검토일은 다릅니다",
        "paragraphs": [
          "이 페이지의 출처 대조일은 2026-10-01입니다. NIDDK A1C 원문은 마지막 검토가 2018년 4월이고, NGSP 해석 영향 자료는 2026년 6월 23일 업데이트로 표시됩니다. NGSP 단위 관계 페이지와 서울아산병원 FAQ는 페이지 자체 업데이트일이 표시되지 않습니다. 새로 접속했다는 사실이 모든 임상 기준을 최신 지침으로 검토했다는 뜻은 아닙니다.",
          "여기서는 HbA1c의 기본 개념·보고 단위·서로 다른 검사 비교와 해석에 영향을 줄 수 있는 상황을 대조했습니다. 서울아산병원 FAQ의 일괄 정상 범위나 조절 목표를 이 가이드의 개인 기준으로 가져오지 않았습니다. 일반 건강정보이며 개인의 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다."
        ],
        "sourceIds": [
          "SUP-NIDDK-A1C",
          "SUP-NGSP-IFCC",
          "SUP-NGSP-FACTORS",
          "SUP-AMC-A1C"
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "id": "SUP-NIDDK-A1C",
        "organization": "NIH/NIDDK",
        "title": "The A1C Test & Diabetes",
        "url": "https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test",
        "sourceDate": "2018-04",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-NGSP-IFCC",
        "organization": "NGSP",
        "title": "IFCC Standardization: The IFCC and NGSP",
        "url": "https://ngsp.org/ifccngsp.asp",
        "sourceDate": "날짜 미표시",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-NGSP-FACTORS",
        "organization": "NGSP",
        "title": "Factors that Interfere with HbA1c Test Results",
        "url": "https://ngsp.org/factors.asp",
        "sourceDate": "2026-06-23",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-AMC-A1C",
        "organization": "서울아산병원 당뇨병센터",
        "title": "혈당 검사 중 당화 혈색소(HbA1c)는 무엇인가요?",
        "url": "https://www.amc.seoul.kr/asan/depts/dm/K/bbsDetail.do?contentId=271421&menuId=5110",
        "sourceDate": "날짜 미표시",
        "retrievedAt": "2026-09-06"
      }
    ]
  },
  {
    "slug": "reading-health-results",
    "title": "혈액·소변 검사표의 빨간 표시, 다음에 무엇을 물을까요?",
    "seoTitle": "혈액·소변 검사 결과 읽기: 참고범위·표시에서 다음 질문으로",
    "description": "혈액·소변 검사표에 표시가 생겼다면 병명을 붙이기 전에 검사명·단위·참고범위를 함께 봅니다. 가상의 결과지 조각으로 읽는 위치를 짚고, 다시 확인할 내용과 연락할 곳을 정리합니다.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "faqTitle": "결과 표시를 보고 생기는 질문",
    "sections": [
      {
        "title": "빨간 숫자를 읽기 전, 어떤 검사인지",
        "paragraphs": [
          "「표시에 색이 있으니 병이 있다는 뜻일까?」라는 질문에서 시작해 보세요. 지금 할 일은 색을 진단으로 번역하는 것이 아니라, 어떤 검사에서 무엇이 달라졌는지 설명을 받을 준비입니다.",
          "결과지의 색이나 화살표부터 병명으로 바꾸지 마세요. 먼저 검사명, 검사한 날짜, 결과와 단위, 그 검사실의 참고범위를 한 줄씩 함께 봅니다. 이 안내는 건강검진 중 혈액·소변 같은 검사실 검사 결과를 읽는 출발점입니다. 영상검사 소견이나 국가건강검진의 모든 종합 판정 등급을 해설하는 표는 아닙니다.",
          "검사는 증상의 원인을 찾거나, 위험을 살피거나, 치료 중 변화를 확인하는 등 목적이 다릅니다. ‘이 검사는 제 경우 무엇을 확인하려고 했나요?’부터 물으면 같은 숫자를 어떻게 설명받아야 할지 길이 잡힙니다. 검사값만으로 몸 전체의 상태를 확정하지 않습니다."
        ],
        "sourceIds": [
          "SUP-MEDLINEPLUS-LAB",
          "SUP-NHS-BLOOD-TESTS"
        ],
        "links": [
          {
            "href": "/health/guides/understanding-hba1c",
            "label": "HbA1c·당화혈색소와 혈당의 이름·단위를 구분하기"
          }
        ]
      },
      {
        "id": "result-fragment",
        "title": "결과지 조각에서 네 군데만 먼저 찾기",
        "paragraphs": [
          "아래는 읽는 위치를 보여 주는 가상 결과지 조각입니다. 실제 환자 결과나 실제 검사 항목이 아니며, 진단 수치·정상 목표값·개인정보를 넣지 않았습니다. 내 결과지를 고치는 양식도 아닙니다."
        ],
        "table": {
          "caption": "가상 결과지 조각 — 값을 판정하지 않는 읽기 연습",
          "columns": [
            "결과지의 자리",
            "가상 표시와 다음 확인"
          ],
          "rows": [
            [
              "검사명",
              "검사 항목 A — 무엇을 확인한 검사인지 묻기"
            ],
            [
              "결과·단위",
              "값: 생략 / 단위: 생략 — 실제 결과지에서는 둘을 함께 읽기"
            ],
            [
              "검사실 참고범위·표시",
              "범위: 생략 / 범위 밖 표시 있음 — 다른 기관 기준을 대입하지 않기"
            ],
            [
              "재검·상담 안내",
              "추가 확인 안내 있음 / 시점·연락처 없음 — 시행 기관에 확인 필요"
            ]
          ]
        },
        "sourceIds": [
          "SUP-MEDLINEPLUS-LAB",
          "SUP-NHS-BLOOD-TESTS"
        ]
      },
      {
        "title": "표시를 다음 질문으로 바꾸는 표",
        "paragraphs": [
          "참고범위는 비교에 사용하는 값의 범위입니다. 건강한 사람들의 검사 결과 등을 바탕으로 만들며 나이·집단·검사법 등에 따라 달라질 수 있습니다. 내 결과지의 범위를 확인하고, 인터넷에서 찾은 다른 검사실의 숫자를 그대로 대입하지 않습니다.",
          "범위 안이라고 질환이 전혀 없다는 보장은 없고, 범위를 벗어났다고 곧바로 질환이 확정되는 것도 아닙니다. 증상, 병력과 다른 검사 결과를 함께 해석합니다. 치료 중이라면 ‘제게 따로 정해진 치료 목표가 있나요?’라고 묻고 목표 숫자를 임의로 정하지 않습니다."
        ],
        "table": {
          "caption": "결과를 확정 짓는 표가 아니라, 설명을 요청하는 질문표",
          "columns": [
            "결과지에서 본 표시",
            "진료 때 확인할 질문"
          ],
          "rows": [
            [
              "참고범위 밖·색 표시·화살표",
              "이 변화가 제 상황에서 어떤 의미인가요? 다른 결과와 함께 볼 항목은 무엇인가요?"
            ],
            [
              "참고범위 안인데 불편이 계속됨",
              "이 검사로 확인하지 못하는 원인이 있나요? 증상에 대해 더 살필 필요가 있나요?"
            ],
            [
              "양성 또는 음성",
              "이 검사는 무엇을 찾는 검사인가요? 이 표시만으로 알 수 있는 것과 없는 것은 무엇인가요?"
            ],
            [
              "판정이 불확실하다는 결과 또는 재검·추가 확인 안내",
              "무엇을 다시 확인하나요? 어떤 준비를 하고 언제·어디에서 확인하나요?"
            ]
          ]
        },
        "sourceIds": [
          "SUP-MEDLINEPLUS-LAB",
          "SUP-NHS-BLOOD-TESTS"
        ],
        "links": [
          {
            "href": "/health/dyslipidemia",
            "label": "콜레스테롤 결과는 개인 위험과 함께 보는 이유"
          }
        ]
      },
      {
        "title": "양성·음성·판정 불확실은 무엇이 다른가요?",
        "paragraphs": [
          "양성은 보통 검사에서 찾던 물질이나 표지 등이 확인됐다는 뜻이고, 음성은 확인되지 않았다는 뜻입니다. 하지만 무엇을 찾는 검사인지에 따라 의미가 달라집니다. ‘양성은 무조건 나쁜 결과, 음성은 모든 질환이 없다는 뜻’으로 번역하지 않습니다.",
          "검사에도 한계가 있습니다. 검사 결과가 질환이나 상태가 있다고 가리키지만 실제로는 없는 경우를 위양성, 없다고 가리키지만 실제로는 있는 경우를 위음성이라고 합니다. 판정 불확실은 명확히 결론 내리기 어려운 결과입니다. 이런 한계와 검사 목적에 따라 재검이나 다른 검사가 필요할 수 있지만, 모든 양성·음성에 재검이 반드시 필요한 것은 아닙니다.",
          "의료진에게 ‘지금 결과로 어느 정도까지 판단할 수 있나요? 추가 확인이 필요하다면 이유가 무엇인가요?’라고 묻습니다. 이 페이지는 특정 검사로 질환을 확정하거나 검사 정확도를 계산하지 않습니다."
        ],
        "sourceIds": [
          "SUP-MEDLINEPLUS-LAB",
          "SUP-NHS-BLOOD-TESTS"
        ]
      },
      {
        "title": "이전 결과와 비교할 때 빠뜨리기 쉬운 조건",
        "paragraphs": [
          "검사 이름이 비슷해도 단위·검사 방법·참고범위가 다르면 숫자만 나란히 놓고 좋아졌다거나 나빠졌다고 단정하기 어렵습니다. 이전 결과지를 함께 가져가 날짜와 검사 기관을 알려 주세요. 검사실마다 방법이 다를 수 있으므로 같은 검사실에서 이어서 확인할지 의료진과 상의합니다.",
          "금식이나 다른 준비가 필요한지는 검사마다 다릅니다. 결과가 걱정된다고 다음 검사 전에 임의로 굶거나 약을 끊지 않습니다. 처방약·일반약·비타민·보충제를 알리고, 검사기관의 준비 안내를 확인하세요. 안내를 지키지 못했다면 숨기지 말고 무엇이 달랐는지 알립니다.",
          "이전 결과지가 있다면 함께 가져가고, 검사 준비가 달랐다면 그 사실을 알립니다. 모르는 조건은 「확인 필요」로 남깁니다. 약·비타민·보충제 정보는 아래 약 목록 안내로 따로 준비할 수 있습니다."
        ],
        "sourceIds": [
          "SUP-MEDLINEPLUS-LAB",
          "SUP-MEDLINEPLUS-LAB-PREP"
        ],
        "links": [
          {
            "href": "/health/guides/medication-list",
            "label": "검사 전 알릴 약·비타민·보충제 목록 정리"
          }
        ]
      },
      {
        "title": "결과지를 덮기 전, 다음 연락과 날짜를 확인하세요",
        "paragraphs": [
          "결과지의 재검·추적 안내를 읽고 「무엇을 다시 확인하는지 / 언제까지인지 / 어디로 연락하는지」를 표시하세요. 비어 있으면 검사 시행 기관에 문의합니다. 모든 검사에 같은 재검 간격을 적용하지 않습니다.",
          "결과를 언제 어떤 방법으로 설명받는지, 예정된 연락이 없으면 어디로 문의할지도 확인합니다. 아래 서울아산병원 자료에서는 「결과상담」 부분을 참고했습니다. 결과 전달·상담 방식의 국내 사례이며 그 기관의 준비·복용 지시나 일정을 일반 기준으로 옮기지 않습니다.",
          "상담 답을 행동·날짜·연락처로 옮기는 방법은 진료 질문 안내에 이어집니다. 검사표가 괜찮아 보인다는 이유로 현재의 불편을 넘기지 말고 의료진에게 알리세요."
        ],
        "sourceIds": [
          "SUP-NHS-BLOOD-TESTS",
          "SUP-MEDLINEPLUS-LAB",
          "SUP-AMC-RESULT-CONSULT"
        ],
        "links": [
          {
            "href": "/health/samples/appointment-action-blank.html",
            "label": "확인할 질문·다음 행동을 적는 빈 인쇄 메모"
          },
          {
            "href": "/health/guides/appointment-questions",
            "label": "다음 진료·검사·악화 시 행동을 묻는 질문"
          },
          {
            "href": "/health/guides/danger-signals",
            "label": "검사표 해석보다 도움 요청이 먼저인 위험 신호"
          }
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "id": "SUP-MEDLINEPLUS-LAB",
        "organization": "NIH/NLM MedlinePlus",
        "title": "How to Understand Your Lab Results",
        "url": "https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/",
        "sourceDate": "2025-09-04 (Last updated)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-MEDLINEPLUS-LAB-PREP",
        "organization": "NIH/NLM MedlinePlus",
        "title": "How to Prepare for a Lab Test",
        "url": "https://medlineplus.gov/lab-tests/how-to-prepare-for-a-lab-test/",
        "sourceDate": "2024-08-20 (Last updated)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-NHS-BLOOD-TESTS",
        "organization": "NHS",
        "title": "Blood tests",
        "url": "https://www.nhs.uk/tests-and-treatments/blood-tests/",
        "sourceDate": "2023-11-02 (Page last reviewed)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-AMC-RESULT-CONSULT",
        "organization": "서울아산병원 건강증진센터",
        "title": "건강검진 유의사항 — 결과상담",
        "url": "https://health.amc.seoul.kr/health/personal/reference.do",
        "sourceDate": "페이지 자체 날짜 미표시",
        "retrievedAt": "2026-09-06"
      }
    ]
  },
  {
    slug: "family-medication-support",
    title: "가족의 약 챙기기, 대신 결정하지 않고 돕는 법",
    seoTitle: "가족 복약 관리 돕는 법: 약 혼동·잊음·삼킴 어려움",
    description: "당사자가 원하는 도움부터 확인합니다. 약을 헷갈리거나 잊을 때, 삼키기 어렵거나 복용을 거부할 때의 질문과 가족 간 전달 방법을 정리합니다. 용량·복용법은 임의로 바꾸지 않습니다.",
    publishedAt: "2026-08-26", updatedAt: "2026-10-01", sourceCheckedAt: "2026-09-06",
    faqTitle: "약을 챙기는 가족이 자주 묻는 질문",
    sections: [
      { title: "‘어디까지 도와드릴까요?’부터 묻습니다", paragraphs: [
        "가족이 약을 챙긴다는 이유로 모든 건강정보를 보거나 복용을 대신 결정할 수 있는 것은 아닙니다. 당사자가 어떤 정보를 공유하고 얼마만큼 도움받고 싶은지 먼저 확인합니다. 혼자 할 수 있는 일은 존중하고, 어려운 일을 함께 찾는 것이 출발점입니다.",
        "‘시간을 알려 드릴까요?’, ‘약사에게 함께 물어볼까요?’처럼 선택할 수 있게 묻습니다. 허락 없이 음료·음식에 약을 숨기거나 억지로 먹이지 않습니다. 복용을 원하지 않는 이유가 걱정, 불편, 삼킴 어려움 중 무엇인지 듣고 의료진·약사와 상의하세요. 이 글은 성인 가족의 일상 지원 안내이며 치료 동의나 의사결정 능력을 대신 판정하지 않습니다.",
      ], sourceIds: ["SUP-NHS-MED-CARERS"], links: [{ href: "/health/guides/medication-list", label: "당사자가 동의한 범위에서 함께 정리할 약 목록" }] },
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
    "slug": "symptom-journal",
    "title": "「음식 때문인가요?」를 증상 메모로 다시 써 보기",
    "seoTitle": "증상 메모 쓰기: 관찰·모르는 점·원인 질문을 구분하기",
    "description": "원인이 떠올라도 메모에는 실제 느낀 변화부터 남깁니다. 가상의 복부 불편 메모를 고쳐 보며 관찰·모르는 점·질문을 나누고, 진료에 전할 내용을 짧게 정리합니다.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "faqTitle": "기록을 시작할 때 막히는 부분",
    "sections": [
      {
        "id": "urgent-action",
        "title": "위험 신호라면 기록을 완성하지 말고 119",
        "paragraphs": [
          "심한 호흡곤란이나 갑자기 반응이 떨어지는 변화, 갑작스러운 한쪽 얼굴·팔·다리의 힘·감각 변화 또는 갑작스러운 말·시야 이상, 어지럼, 걷기·균형의 어려움 등이 있으면 즉시 119에 연락합니다. 일지를 채우거나 사진을 찍느라 기다리지 않습니다. 이런 신호가 잠깐 사라져도 도움을 미루지 않습니다."
        ],
        "tone": "warning",
        "sourceIds": [
          "SUP-JOURNAL-EMERGENCY",
          "SUP-JOURNAL-STROKE"
        ],
        "links": [
          {
            "href": "/health/guides/danger-signals",
            "label": "기록보다 도움 요청이 먼저인 다른 위험 신호"
          }
        ]
      },
      {
        "id": "journal-edit",
        "title": "한 문장을 관찰·모르는 점·질문으로 나누기",
        "paragraphs": [
          "표현을 고쳐 보는 가상 예시입니다. 실제 경험·환자 사례가 아니며, 복부 불편의 원인이나 안전 여부를 판단하지 않습니다.",
          "고치기 전: 「어제 그 음식을 먹어서 배가 아팠다.」 고친 뒤에는 함께 일어난 일과 원인 결론을 나눕니다."
        ],
        "table": {
          "caption": "가상 메모 편집 — 확실하지 않은 내용은 만들지 않기",
          "columns": [
            "나눌 자리",
            "고친 표현"
          ],
          "rows": [
            [
              "관찰",
              "어제 저녁 식사 뒤 배가 불편했고 오늘 아침에는 덜했다."
            ],
            [
              "모르는 점",
              "정확한 시작 시각은 기억나지 않는다."
            ],
            [
              "질문",
              "식사와 관련 있는지 궁금하다. 진료에서 확인할 정보는 무엇인가?"
            ]
          ]
        },
        "sourceIds": [
          "SUP-JOURNAL-TALK"
        ],
        "links": [
          {
            "href": "/health/samples/appointment-action-blank.html",
            "label": "진료에서 확인할 질문을 적는 빈 인쇄 메모"
          }
        ]
      },
      {
        "title": "처음부터 긴 일지 대신, 네 가지를 적습니다",
        "paragraphs": [
          "진료실에서 기억이 잘 나지 않을 수 있어 시작 시점과 불편한 모습을 미리 적어 두면 설명에 쓸 수 있습니다. 아래 네 칸은 오누림의 정리 예시이며 검증된 진단 척도나 필수 제출 양식이 아닙니다. 아는 항목만 적고, 정확히 기억나지 않으면 그 사실을 표시합니다."
        ],
        "table": {
          "caption": "진료에 가져갈 증상 메모 — 가능한 항목만 작성",
          "columns": [
            "기록할 것",
            "적는 방법"
          ],
          "rows": [
            [
              "언제 시작·반복됐는지",
              "처음 느낀 날짜·시각, 이어졌는지 반복됐는지; 시각이 추정이면 추정이라고 적기"
            ],
            [
              "어디가 어떻게 불편했는지",
              "본인이 느낀 위치와 불편을 자신의 말로; 같이 느낀 변화도 적기"
            ],
            [
              "어떤 상황에서 달라졌는지",
              "당시 활동이나 쉬고 있을 때의 차이, 더 심해지거나 덜한 때; 원인을 확정하지 않기"
            ],
            [
              "일상에서 무엇이 어려웠는지",
              "잠·식사·걷기·일·공부 등에 실제로 달라진 점; 점수로만 줄이지 않기"
            ]
          ]
        },
        "sourceIds": [
          "SUP-JOURNAL-TALK",
          "SUP-JOURNAL-HEADACHE",
          "SUP-NHLBI-SLEEP-DIARY"
        ]
      },
      {
        "title": "‘느낀 것’과 ‘원인이라고 생각한 것’을 나눕니다",
        "paragraphs": [
          "‘식사 뒤 배가 불편했다’는 느낀 경험이고, ‘그 음식 때문에 병이 생겼다’는 원인 추정입니다. 경험을 적은 뒤 원인이 궁금하면 별도 질문으로 남기세요. 함께 일어났다는 기록만으로 원인을 확정하는 자료는 아닙니다.",
          "본인이 느낀 통증·메스꺼움·불안처럼 다른 사람이 바로 볼 수 없는 불편도 중요한 설명입니다. 보호자가 적을 때는 ‘본인이 이렇게 말함’과 ‘내가 이렇게 관찰함’을 구분하고, 보이지 않는다는 이유로 불편을 지우지 않습니다.",
          "가상 예시의 「오늘은 덜했다」는 느낌을 적은 것이지 안전 판정이 아닙니다. 낮은 통증 점수나 일할 수 있다는 사실만으로 응급상황을 배제하지 않습니다."
        ],
        "sourceIds": [
          "SUP-JOURNAL-TALK",
          "SUP-JOURNAL-EMERGENCY"
        ]
      },
      {
        "id": "unknown-practice",
        "title": "모르는 시각은 「모름」으로 남기는 작은 연습",
        "paragraphs": [
          "「언제부터였나요?」라는 질문에 정확히 기억나지 않으면 「정확한 시각 모름」이나 「저녁쯤으로 기억」처럼 확실한 것과 추정을 나눠 적습니다. 빈칸을 채우려고 날짜나 시각을 만들지 않습니다.",
          "점수를 적더라도 위치·느낌·변화·일상 영향을 함께 설명하세요. 며칠을 채워야 진료받을 수 있다는 최소 기록 기간은 없습니다. 지금 아는 내용을 전하고, 별도 기록이 필요하면 목적·항목·기간을 확인합니다."
        ],
        "sourceIds": [
          "SUP-JOURNAL-TALK",
          "SUP-JOURNAL-EMERGENCY"
        ]
      },
      {
        "title": "증상에 따라 추가할 정보가 달라집니다",
        "paragraphs": [
          "두통 진료에서는 두통이 얼마나 자주 나타났는지와 이전 치료·약 사용 이력이 설명에 도움이 됩니다. St George’s 병원은 본인이 쓰던 일지도 가져올 수 있다고 안내합니다. 전용 양식을 구하지 못했다는 이유로 기록이나 진료를 미룰 필요는 없습니다.",
          "수면에 관한 기록은 잠의 양과 질, 낮의 졸림, 복용약·술·카페인 같은 정보를 함께 살펴볼 수 있습니다. NHLBI 수면일지는 이런 내용을 적어 의료진과 검토하는 자료입니다. 수면 기록에 쓰는 항목을 모든 증상에 똑같이 요구하지 않습니다.",
          "이미 사용한 약과 당시 변화를 기록하는 것과 약의 효과를 스스로 시험하는 것은 다릅니다. 기록을 만들려고 약을 더 먹거나 끊지 말고 실제 사용 정보를 알립니다. 어떤 항목을 얼마나 기록할지는 진료에서 본인 상황에 맞게 확인합니다."
        ],
        "sourceIds": [
          "SUP-JOURNAL-HEADACHE",
          "SUP-NHLBI-SLEEP-DIARY",
          "SUP-JOURNAL-FDA-MEDICINES"
        ],
        "links": [
          {
            "href": "/health/migraine",
            "label": "편두통 진료에서 증상의 흐름을 보는 이유"
          },
          {
            "href": "/health/sleep-apnea",
            "label": "잠과 낮의 변화, 수면검사가 하는 역할"
          },
          {
            "href": "/health/guides/medication-list",
            "label": "실제 사용한 약·보충제 정보를 함께 준비"
          }
        ]
      },
      {
        "title": "진료에서는 가장 걱정되는 변화부터 전달합니다",
        "paragraphs": [
          "기록을 시간순으로 모두 읽기보다 ‘가장 불편한 점 / 언제부터 어떻게 달라졌는지 / 가장 알고 싶은 질문’을 먼저 말하고 필요한 부분을 보여 주세요. 이는 말문을 여는 정리법이지 모든 진료에 정해진 보고 순서는 아닙니다.",
          "빈칸이 있거나 하루만 적었어도 현재 아는 내용을 전달합니다. 일정 기간을 채워야 진료받을 수 있다는 뜻이 아닙니다. 의료진이 별도 기록을 요청했다면 그 목적·항목·기간을 확인하고, 그 전에 새로운 변화가 생기면 언제 어디로 연락할지도 물어보세요.",
          "가족이 메모를 돕는다면 당사자가 원하는 도움인지 먼저 묻습니다. 「본인이 말함」과 「보호자 관찰」을 구분하고, 누구에게 어떤 범위로 보여 줄지 상의하세요. 공개 문의·가족 단체방에 이름·결과지·신체 사진을 무심코 올리지 않습니다. 이 페이지는 기록 업로드나 진단 창구가 아닙니다."
        ],
        "sourceIds": [
          "SUP-JOURNAL-TALK",
          "SUP-JOURNAL-HEADACHE"
        ],
        "links": [
          {
            "href": "/health/guides/appointment-questions",
            "label": "진료 뒤 기록할 항목과 다음 연락 방법을 묻기"
          }
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "id": "SUP-JOURNAL-TALK",
        "organization": "NIH/NLM MedlinePlus",
        "title": "Talking With Your Doctor",
        "url": "https://medlineplus.gov/talkingwithyourdoctor.html",
        "sourceDate": "2024-10-05 (Last updated)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-NHLBI-SLEEP-DIARY",
        "organization": "NIH/NHLBI",
        "title": "Sleep Diary — 자료 소개",
        "url": "https://www.nhlbi.nih.gov/resources/sleep-diary",
        "sourceDate": "2019-01 (Publication Date; HTML 소개 확인)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-JOURNAL-HEADACHE",
        "organization": "St George’s University Hospitals NHS Foundation Trust",
        "title": "Community Headache Hub — 진료 준비와 두통일지",
        "url": "https://www.stgeorges.nhs.uk/service/neuro/neurology/headache-service/headache-hub/",
        "sourceDate": "페이지 자체 날짜 미표시",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-JOURNAL-EMERGENCY",
        "organization": "MedlinePlus Medical Encyclopedia / A.D.A.M.",
        "title": "Recognizing medical emergencies",
        "url": "https://medlineplus.gov/ency/article/001927.htm",
        "sourceDate": "2025-01-08 (Review Date)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-JOURNAL-STROKE",
        "organization": "CDC",
        "title": "Signs and Symptoms of Stroke",
        "url": "https://www.cdc.gov/stroke/signs-symptoms/index.html",
        "sourceDate": "2026-05-19 (페이지 표시일)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-JOURNAL-FDA-MEDICINES",
        "organization": "U.S. FDA",
        "title": "As You Age: You and Your Medicines",
        "url": "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-09-06"
      }
    ]
  },
  {
    "slug": "appointment-questions",
    "title": "진료실에서 끄덕인 설명, 집에서 할 일로 남기기",
    "seoTitle": "진료 질문 준비: 답을 행동·날짜·연락처로 남기는 메모",
    "description": "설명을 들었는데 집에 와서 무엇을 해야 할지 헷갈린다면 질문과 답 사이에 한 줄을 더 남겨 보세요. 중요한 질문부터 고르고, 들은 답을 다음 행동·기한·확인할 연락처로 정리합니다.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "faqTitle": "질문하기가 망설여질 때",
    "sections": [
      {
        "title": "가장 중요한 두세 가지부터 표시합니다",
        "paragraphs": [
          "설명을 들으며 고개를 끄덕이는 것과 집에서 할 일을 아는 것은 다를 수 있습니다. 「지금 제가 이해한 내용을 다시 말씀드려도 될까요?」로 확인하고, 모르는 부분을 메모에 남깁니다. 질문을 잘했다고 검사·치료 결과가 좋아진다고 보장하는 안내는 아닙니다.",
          "진료에서 꼭 확인하고 싶은 걱정을 먼저 적습니다. AHRQ는 중요한 질문 세 가지를, NHS는 두세 가지를 먼저 준비하는 방법을 제안합니다. 질문을 그 개수까지만 해야 한다는 뜻은 아닙니다. 새로운 증상이나 약 알레르기 같은 중요한 정보는 개수 때문에 빼지 않습니다.",
          "‘큰 병인가요?’라는 걱정도 말해도 됩니다. 이어서 ‘지금 무엇을 확인하고 있나요? 아직 모르는 점은 무엇인가요? 다음에 무엇으로 확인하나요?’처럼 설명받고 싶은 부분을 나눠 보세요. 질문을 잘해야만 진료받을 자격이 생기거나 좋은 결과가 보장되는 것은 아닙니다.",
          "증상의 시작과 변화, 현재 쓰는 약·비타민·보충제, 알레르기와 과거 약 사용 중 겪은 문제를 아는 범위에서 준비합니다. 전부 외우려 하지 말고 메모나 실제 용기·안내문을 가져갈 수 있습니다."
        ],
        "sourceIds": [
          "SUP-AHRQ-ENGAGED",
          "SUP-NHS-DOCTOR-QUESTIONS",
          "SUP-MEDLINEPLUS-TALK"
        ],
        "links": [
          {
            "href": "/health/guides/symptom-journal",
            "label": "증상이 언제·어떻게 달라졌는지 짧게 정리"
          },
          {
            "href": "/health/guides/medication-list",
            "label": "약·보충제와 복용 정보를 빠뜨리지 않고 준비"
          }
        ]
      },
      {
        "title": "검사·치료·다음 계획은 이렇게 물을 수 있습니다",
        "paragraphs": [
          "아래는 본인에게 해당하는 질문을 고르는 예시입니다. 특정 검사를 요구하거나, 모든 치료 선택지가 누구에게나 맞는다고 전제하는 목록이 아닙니다. 이미 설명받은 항목은 반복해서 모두 읽지 않아도 됩니다."
        ],
        "table": {
          "caption": "이번 진료에서 필요한 질문만 고르세요",
          "columns": [
            "이야기할 주제",
            "확인할 질문"
          ],
          "rows": [
            [
              "검사를 권유받았을 때",
              "무엇을 확인하나요? 어떻게 진행되고 어떤 준비가 필요한가요? 결과는 언제 어떤 방법으로 받나요?"
            ],
            [
              "치료를 선택할 때",
              "제 상황에서 가능한 선택지와 권하는 이유는 무엇인가요? 기대 효과·위험·기간은 어떻게 다른가요?"
            ],
            [
              "약을 처방받았을 때",
              "어떻게 사용하고 어떤 변화를 살펴야 하나요? 다른 약·보충제나 이전 이상 반응과 함께 고려할 점은 무엇인가요?"
            ],
            [
              "다음 계획을 정할 때",
              "다시 진료·검사할 시점은 언제인가요? 예상대로 결과나 예약 연락이 없으면 어디로 문의하나요?"
            ]
          ]
        },
        "sourceIds": [
          "SUP-AHRQ-ENGAGED",
          "SUP-NHS-DOCTOR-QUESTIONS"
        ],
        "links": [
          {
            "href": "/health/guides/reading-health-results",
            "label": "검사 결과의 표시를 다음 질문으로 바꾸기"
          }
        ]
      },
      {
        "id": "question-dialogue",
        "title": "「알겠습니다」 다음에 한 문장 더 — 가상 대화",
        "paragraphs": [
          "다음은 대화 방법만 보여 주는 편집자의 가상 예시입니다. 실제 진료·개인 경험이 아니며, 의료진의 검사·치료 답변을 지어내지 않았습니다.",
          "질문하는 사람: 「말씀하신 것 중 집에서 할 일과 다음 확인 날짜를 제 말로 정리해도 될까요? 이해가 안 된 부분은 다시 설명해 주세요.」",
          "이어서 확인할 말: 「날짜나 연락 방법은 어디에서 확인하나요? 예약 안내가 오지 않거나 상황이 달라지면 어느 창구에 문의하나요?」 실제 답은 진료기관에서 확인해 적습니다."
        ],
        "sourceIds": [
          "SUP-NHS-DOCTOR-QUESTIONS",
          "SUP-MEDLINEPLUS-TALK"
        ]
      },
      {
        "title": "이해가 안 되는 것과 실행이 어려운 것을 따로 말합니다",
        "paragraphs": [
          "설명이 어렵다면 ‘그 단어를 쉬운 말로 다시 설명해 주실 수 있나요?’라고 묻고 필요한 이름이나 안내를 적어 달라고 요청할 수 있습니다. 이해한 부분을 자신의 말로 말한 뒤 맞는지 확인하는 것도 방법입니다. 고개를 끄덕였다고 이해가 끝난 것은 아닙니다.",
          "설명은 알겠지만 생활 여건, 불편, 비용 등으로 실행이 어렵다면 그 어려움을 알립니다. 가능하지 않은 일을 했다고 말하기보다 조정하거나 도움받을 방법이 있는지 상담하세요. 치료를 스스로 바꾸겠다는 통보가 아니라 함께 계획을 확인하는 대화입니다.",
          "메모를 돕는 사람과 함께 가고 싶거나 통역·의사소통 지원이 필요하면 기관에 미리 가능 여부를 문의합니다. 모든 기관이 같은 서비스를 제공한다고 보장하지 않습니다. 동행인이 본인 대신 모든 답을 정하기보다 본인이 원하는 도움을 상의합니다."
        ],
        "sourceIds": [
          "SUP-AHRQ-ENGAGED",
          "SUP-NHS-DOCTOR-QUESTIONS",
          "SUP-MEDLINEPLUS-TALK"
        ]
      },
      {
        "title": "귀가 전, 행동으로 옮길 내용을 확인합니다",
        "paragraphs": [
          "‘제가 이해한 것은 이렇습니다’라고 짧게 말하고 맞는지 확인해 보세요. 이어서 지금 할 일, 다음 확인 날짜, 결과를 받는 방법, 문제가 생기거나 연락이 오지 않을 때 문의할 곳을 적습니다. 날짜나 담당자를 모르면 임의로 정하지 말고 확인합니다.",
          "여러 검사가 예정됐다면 어떤 예약을 본인이 해야 하는지와 결과를 누가 설명하는지도 묻습니다. 종이나 전자 안내를 받을 수 있는지 확인하되, 안내를 받았다는 사실과 내용을 이해했다는 것은 구분합니다.",
          "빈 메모는 일반 진료 대화를 정리하는 오누림 편집 예시이며 공식 표준 양식이 아닙니다. 화면 입력·저장·전송 기능은 없습니다. 인쇄해서 쓰고 실제 안내를 받은 칸만 채우세요."
        ],
        "bullets": [
          "지금 할 일: 안내받은 내용을 본인 말로 확인",
          "다음 확인: 무엇을 언제·어디에서 확인할지",
          "연락 방법: 결과를 받을 경로와 문제가 있을 때 문의처",
          "아직 남은 질문: 어디에서 다시 확인할지"
        ],
        "sourceIds": [
          "SUP-NHS-DOCTOR-QUESTIONS",
          "SUP-AHRQ-ENGAGED",
          "SUP-MEDLINEPLUS-TALK"
        ],
        "table": {
          "caption": "답을 행동으로 남기는 다섯 칸 — 의료 안내는 실제 답만 기록",
          "columns": [
            "메모할 칸",
            "빈칸에 남길 내용"
          ],
          "rows": [
            [
              "질문",
              "가장 걱정되거나 이해되지 않는 내용"
            ],
            [
              "들은 답",
              "실제로 들은 설명 — 모르면 확인 필요"
            ],
            [
              "내가 할 일",
              "안내받은 다음 행동 — 스스로 치료 지시를 만들지 않기"
            ],
            [
              "기한·다음 날짜",
              "기관에서 확인한 날짜 — 모르면 확인 필요"
            ],
            [
              "연락할 곳·방법",
              "기관에서 확인한 창구 — 미확인 연락처를 추측하지 않기"
            ]
          ]
        },
        "links": [
          {
            "href": "/health/samples/appointment-action-blank.html",
            "label": "질문·들은 답·행동·기한·연락처 빈 인쇄 메모 열기"
          }
        ]
      },
      {
        "title": "집에 와서 헷갈리면, 추측 대신 다시 문의합니다",
        "paragraphs": [
          "안내문을 보아도 뜻이 분명하지 않거나 실제로 따르기 어렵다면 진료기관에 문의합니다. 약에 관한 질문은 처방 의료진·약사에게 확인할 수 있습니다. 기억이 나지 않는다는 이유로 임의로 약을 끊거나 복용법을 바꾸지 않습니다.",
          "기대한 때 결과가 오지 않으면 ‘연락이 없으니 정상’이라고 결론 내리지 말고 확인할 경로를 이용합니다. 문의할 때는 어느 진료·검사인지와 이해되지 않는 부분을 짧게 말합니다. 개인 결과·처방전은 기관이 안내한 안전한 경로로 전달하고 공개 게시판에 올리지 않습니다."
        ],
        "sourceIds": [
          "SUP-AHRQ-ENGAGED",
          "SUP-NHS-DOCTOR-QUESTIONS",
          "SUP-MEDLINEPLUS-TALK"
        ]
      },
      {
        "id": "source-dates",
        "title": "출처의 원문 검토일과 이 글의 확인일은 다릅니다",
        "paragraphs": [
          "AHRQ 자료의 원문 검토는 2024년 11월, MedlinePlus 자료의 업데이트는 2024년 10월 5일로 표시되어 있습니다. NHS 질문 자료는 마지막 검토 2023년 1월 12일, 다음 검토 예정 2026년 1월 12일로 표시되어 있습니다.",
          "예정일이 지났다는 것만으로 내용이 틀렸다고 단정하지 않습니다. 아래는 원문 표시일을 그대로 구분해 적고, 이 글에서 대조한 날짜는 2026년 10월 1일로 따로 남겼습니다. 특정 질환의 검사·치료 지시는 이 대화 안내에서 정하지 않습니다."
        ],
        "sourceIds": [
          "SUP-AHRQ-ENGAGED",
          "SUP-NHS-DOCTOR-QUESTIONS",
          "SUP-MEDLINEPLUS-TALK"
        ]
      },
      {
        "id": "urgent-action",
        "title": "위급한 변화는 예약이나 답변을 기다리지 않습니다",
        "paragraphs": [
          "심한 호흡곤란이나 갑자기 반응이 떨어지는 변화 등 위급한 상태라면 즉시 119에 연락합니다. 질문표를 끝내거나 예약일·문의 답변을 기다리는 일이 먼저가 아닙니다. 평소 상담에서는 본인에게 어떤 변화가 생기면 빨리 도움받아야 하는지도 확인하세요."
        ],
        "tone": "warning",
        "sourceIds": [
          "SUP-APPOINTMENT-EMERGENCY",
          "SUP-NHS-DOCTOR-QUESTIONS"
        ],
        "links": [
          {
            "href": "/health/guides/danger-signals",
            "label": "예약·질문보다 도움 요청이 먼저인 위험 신호"
          }
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "id": "SUP-AHRQ-ENGAGED",
        "organization": "AHRQ",
        "title": "Be More Engaged in Your Healthcare",
        "url": "https://www.ahrq.gov/questions/be-engaged/index.html",
        "sourceDate": "2024-11 (Page last reviewed; originally created2012-09)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-NHS-DOCTOR-QUESTIONS",
        "organization": "NHS",
        "title": "What to ask your doctor or other healthcare professional",
        "url": "https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/",
        "sourceDate": "2023-01-12 (Page last reviewed; next review2026-01-12와 구분)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-MEDLINEPLUS-TALK",
        "organization": "NIH/NLM MedlinePlus",
        "title": "Talking With Your Doctor",
        "url": "https://medlineplus.gov/talkingwithyourdoctor.html",
        "sourceDate": "2024-10-05 (Last updated)",
        "retrievedAt": "2026-09-06"
      },
      {
        "id": "SUP-APPOINTMENT-EMERGENCY",
        "organization": "MedlinePlus Medical Encyclopedia / A.D.A.M.",
        "title": "Recognizing medical emergencies",
        "url": "https://medlineplus.gov/ency/article/001927.htm",
        "sourceDate": "2025-01-08 (Review Date)",
        "retrievedAt": "2026-09-06"
      }
    ]
  },
  {
    "slug": "medication-list",
    "title": "약 봉투의 숫자만 적으면 충분할까요? 한 줄 약 목록 만들기",
    "seoTitle": "약 목록 작성 예시: 제품 함량·사용법·실제 사용과 빈 인쇄 양식",
    "description": "실제 약 이름 없는 가상 라벨을 한 줄 약 목록으로 옮겨 봅니다. 제품 함량, 안내받은 사용법, 실제 사용, 확인할 질문과 변경일을 구분한 뒤 빈 양식에 자신의 안내를 기록하세요.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "sections": [
      {
        "id": "worked-label",
        "title": "가상 라벨에서 한 줄로: 숫자를 옮기기 전에 칸을 나눕니다",
        "paragraphs": [
          "함량을 써 두면 사용법까지 기록한 것처럼 보일 수 있습니다. 하지만 제품에 든 성분의 양과 언제·어떻게·얼마나 쓰라는 안내는 다른 정보입니다. 함량만 보고 사용량을 계산하거나 약을 나누지 마세요.",
          "아래는 작성법을 보여 주기 위해 편집자가 만든 가상 예시입니다. 실제 약·환자·가족의 처방이 아니며, 복용 지시나 국내 약봉투의 표준 형식이 아닙니다. 숫자와 약 이름도 가정하지 않았습니다."
        ],
        "bullets": [
          "가상 제품 표기: 「예시용 제품 A · 정제」 / 함량 표기는 아직 확인하지 못함",
          "가상 안내문: 「의료진이 설명한 사용법이 별도 안내문에 있음」 / 그 안내문을 아직 가져오지 못함",
          "가상 메모: 「오늘 사용했는지는 기억나지 않음」"
        ],
        "table": {
          "caption": "가상 작성 예시 — 한 제품의 기록 한 줄",
          "columns": [
            "제품 이름·형태",
            "제품 함량",
            "안내받은 사용법",
            "실제 사용",
            "확인 필요",
            "변경·확인일"
          ],
          "rows": [
            [
              "예시용 제품 A · 정제 (가상)",
              "확인 필요; 포장 표기를 확인할 예정",
              "확인 필요; 별도 안내문을 가져올 예정",
              "오늘 사용 여부 기억나지 않음",
              "함량과 사용법을 약사에게 확인",
              "2026-10-01: 목록 작성, 안내 변경 확인 안 됨"
            ]
          ]
        },
        "sourceIds": [
          "SUP-FDA-CURRENT-MED-LIST",
          "SUP-LIST-FDA-LABEL"
        ]
      },
      {
        "id": "distinctions",
        "title": "헷갈리기 쉬운 세 쌍을 따로 적습니다",
        "table": {
          "caption": "목록을 완성하려고 추측하지 않기",
          "columns": [
            "구분",
            "기록할 차이"
          ],
          "rows": [
            [
              "함량 / 한 번의 사용량",
              "포장의 함량·농도는 단위까지 그대로; 사용량·시간·방법은 받은 안내에서 별도로 확인"
            ],
            [
              "모름 / 없음",
              "기억나지 않으면 「확인 필요」. 제품·알레르기 등이 없다고 확인한 것과 구분"
            ],
            [
              "현재 사용 / 중단한 과거 기록",
              "현재 전체 목록과 과거 기록을 분리; 중단 안내가 확인되면 날짜·안내한 곳을 표시"
            ]
          ]
        },
        "paragraphs": [
          "안내받은 사용과 실제 사용이 다르면 둘 다 적고 어려웠던 점을 상담하세요. 목록 수정은 약을 임의로 중단·재시작하거나 사용량을 바꾸는 절차가 아닙니다.",
          "FDA의 Drug Facts 설명은 미국 일반약 라벨에 관한 자료입니다. 성분의 양과 사용 지시를 구분하는 원칙을 참고하되, 국내 처방전·약봉투·모든 제품에 같은 표시 순서를 적용하지 않습니다."
        ],
        "sourceIds": [
          "SUP-FDA-CURRENT-MED-LIST",
          "SUP-LIST-FDA-SAFETY",
          "SUP-LIST-FDA-LABEL"
        ]
      },
      {
        "id": "blank-sheet",
        "title": "빈 양식: 한 제품씩, 확인한 내용부터",
        "paragraphs": [
          "아래는 직접 적거나 인쇄할 빈 양식입니다. 약 봉투·용기·처방 안내를 보며 옮기고, 모르는 칸은 「확인 필요」로 남기세요. 화면 입력을 저장하지 않으며 업로드·약 식별·상호작용 자동판정 기능은 없습니다.",
          "사용 이유와 안내한 기관, 알레르기·이전에 겪은 문제는 별도 메모로 함께 가져가세요. 확인하지 않은 증상을 특정 약의 부작용이나 확정 알레르기로 바꾸지 않습니다."
        ],
        "table": {
          "caption": "빈 약 목록 — 종이에 적거나 아래 인쇄용 파일 사용",
          "columns": [
            "제품 이름·형태",
            "제품 함량",
            "안내받은 사용법",
            "실제 사용",
            "확인 필요",
            "변경·확인일"
          ],
          "rows": [
            [
              "________________",
              "________________",
              "________________",
              "________________",
              "________________",
              "________________"
            ]
          ]
        },
        "links": [
          {
            "href": "/health/samples/medication-list-blank.html",
            "label": "약 목록 빈 양식만 열어 인쇄하기"
          }
        ],
        "sourceIds": [
          "SUP-FDA-CURRENT-MED-LIST",
          "SUP-LIST-FDA-AGE"
        ]
      },
      {
        "id": "update-and-share",
        "title": "빠진 제품을 확인하고, 바뀐 날을 남깁니다",
        "paragraphs": [
          "처방약뿐 아니라 일반약·가끔 쓰는 약·안약·바르는 약·비타민·보충제·허브 제품도 알립니다. 새 안내를 받으면 현재 전체 목록을 갱신하고, 변경한 날짜와 안내한 곳을 남기세요. 복용 여부가 기억나지 않으면 완료로 채우지 않습니다.",
          "진료·검사·약국에 최신 목록과 실제 용기·안내문을 가져가 「표기와 사용법이 맞나요? 확인 필요 칸을 함께 봐 주실 수 있나요?」라고 물어보세요. 이 목록만으로 병명이나 함께 써도 되는지를 판단하지 않습니다.",
          "본인이 찾을 수 있는 곳에 두고 동의한 가족·돌봄자에게 필요한 범위만 공유하세요. 공개 문의나 공개 링크에 처방전·이름·연락처를 올리지 않습니다."
        ],
        "sourceIds": [
          "SUP-LIST-FDA-AGE",
          "SUP-LIST-FDA-SAFETY",
          "SUP-FDA-CURRENT-MED-LIST"
        ],
        "links": [
          {
            "href": "/health/guides/appointment-questions",
            "label": "진료에서 사용법과 다음 확인을 물을 질문"
          },
          {
            "href": "/health/guides/family-medication-support",
            "label": "가족이 돕는 범위를 먼저 합의하기"
          },
          {
            "href": "/health/guides/older-parent-health-organizer",
            "label": "최신 목록과 원본의 위치 정리하기"
          }
        ]
      },
      {
        "id": "urgent-action",
        "title": "위급하면 목록 완성보다 119",
        "tone": "warning",
        "paragraphs": [
          "심한 호흡곤란이나 반응이 떨어지는 변화 등 위급한 상태이면 즉시 119에 연락하세요. 약 이름·사용량을 모두 알아내느라 신고를 미루지 말고 아는 정보를 전합니다."
        ],
        "sourceIds": [
          "SUP-LIST-EMERGENCY"
        ],
        "links": [
          {
            "href": "/health/guides/danger-signals",
            "label": "목록 정리보다 즉시 도움이 필요한 위험 신호"
          }
        ]
      }
    ],
    "sources": [
      {
        "id": "SUP-FDA-CURRENT-MED-LIST",
        "organization": "U.S. FDA",
        "title": "Create and Keep a Medication List for Your Health",
        "url": "https://www.fda.gov/consumers/consumer-updates/create-and-keep-medication-list-your-health",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-LIST-FDA-AGE",
        "organization": "U.S. FDA",
        "title": "As You Age: You and Your Medicines",
        "url": "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-LIST-FDA-SAFETY",
        "organization": "U.S. FDA",
        "title": "5 Medication Safety Tips for Older Adults",
        "url": "https://www.fda.gov/consumers/consumer-updates/5-medication-safety-tips-older-adults",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-LIST-FDA-LABEL",
        "organization": "U.S. FDA",
        "title": "The Over-the-Counter Drug Facts Label — 미국 일반약 표시 설명",
        "url": "https://www.fda.gov/drugs/understanding-over-counter-medicines/over-counter-drug-facts-label",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-LIST-EMERGENCY",
        "organization": "MedlinePlus Medical Encyclopedia / A.D.A.M.",
        "title": "Recognizing medical emergencies",
        "url": "https://medlineplus.gov/ency/article/001927.htm",
        "sourceDate": "2025-01-08 (Review Date)",
        "retrievedAt": "2026-10-01"
      }
    ]
  },
  {
    "slug": "older-parent-health-organizer",
    "title": "부모님 서류, 다음 사람이 원본과 최신본을 찾을 수 있나요?",
    "seoTitle": "부모님 건강정보 정리: 원본·최신본 위치와 가족 인계용 빈 양식",
    "description": "건강정보를 모두 다시 쓰기보다, 당사자가 동의한 범위에서 다음 사람이 원본과 최신본을 찾도록 정리합니다. 검사일·예약일·가족 확인일을 구분한 가상 예시와 한 장 인쇄용 찾기표를 제공합니다.",
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-10-01",
    "sourceCheckedAt": "2026-10-01",
    "sections": [
      {
        "id": "one-task",
        "title": "이번 정리의 끝은 “다음 사람이 찾을 수 있음”입니다",
        "paragraphs": [
          "파일을 많이 모았어도 어느 것이 원본이고 어느 사본이 최신인지 알 수 없으면 인계가 막힙니다. 이번에는 건강정보 전체를 다시 쓰는 대신, 다음 사람이 필요한 자료를 찾을 위치와 아직 확인할 일을 한 장에 남겨 보세요.",
          "먼저 부모님이 어떤 도움을 원하는지, 누가 어떤 정보를 볼 수 있는지 상의하세요. 이 찾기표는 편집용 기록 예시이며 공식 표준이나 의료인 검수 양식이 아닙니다. 의료서류 발급·열람·치료 동의 절차를 대신하는 문서도 아닙니다."
        ],
        "sourceIds": [
          "SUP-PARENT-RECORDS",
          "SUP-PARENT-NHS-CARERS"
        ]
      },
      {
        "id": "worked-locator",
        "title": "가상 작성 예시: 세 날짜와 두 위치를 따로 적기",
        "paragraphs": [
          "아래 날짜·폴더·파일명·역할은 작성법을 보여 주기 위한 가상 예시입니다. 실제 부모님·가족의 이름, 연락처, 진단이나 검사 결과는 사용하지 않았습니다. 본인 자료에 맞게 확인해서 적으세요.",
          "검사일은 검사를 시행한 날, 예약일은 다음 일정입니다. 가족이 자료를 확인한 날은 다른 칸에 적으며 의료진이 상태를 확인한 날짜로 바꾸지 않습니다."
        ],
        "table": {
          "caption": "가상 원본·최신본 찾기표 — 한 사람의 실제 기록이 아닙니다",
          "columns": [
            "구분",
            "가상 작성 내용"
          ],
          "rows": [
            [
              "검사 시행일",
              "2026-09-25 (가상 검사일; 검사 종류·결과는 설정하지 않음)"
            ],
            [
              "다음 예약일",
              "2026-10-15 (가상 예약 안내에 적힌 날짜)"
            ],
            [
              "가족의 자료 확인일",
              "2026-10-01 (자료 위치를 확인한 날; 의료진 재평가일이 아님)"
            ],
            [
              "원본 위치",
              "서류함의 「예시 폴더」 안 「원본 봉투」 (모두 가상)"
            ],
            [
              "최신 찾기표 위치",
              "같은 폴더의 「찾기표_2026-10-01」 (가상 파일명)"
            ],
            [
              "도움을 맡은 역할",
              "당사자가 지정한 도움 제공자: 일정 메모와 원본 찾기"
            ],
            [
              "동의한 공유 범위",
              "예약·원본 위치만; 문서 내용 공유는 당사자에게 다시 확인"
            ],
            [
              "아직 답을 못 받은 질문",
              "이전 요약과 원본의 차이를 의료진에게 확인할 예정"
            ],
            [
              "찾기표 변경일",
              "2026-10-01: 원본·최신본 위치를 표시함 (가상)"
            ]
          ]
        },
        "sourceIds": [
          "SUP-PARENT-RECORDS"
        ]
      },
      {
        "id": "blank-sheet",
        "title": "빈 양식: 원본을 찾을 수 있는 만큼만",
        "paragraphs": [
          "아래 빈 양식이나 별도 한 장 인쇄용 찾기표를 사용하세요. 필요한 위치만 적고 비밀번호·계정 정보는 함께 적지 않습니다. 화면 입력을 저장하지 않으며 파일 업로드·가족 자동 공유·의료 판단 기능은 없습니다.",
          "모르는 날짜·약·알레르기를 「없음」으로 채우지 말고 「확인 필요」로 남기세요. 문서가 서로 다르면 날짜와 원문을 구분한 채 질문을 적습니다. 빈칸을 없애려고 병명이나 변경 내용을 추측하지 않습니다."
        ],
        "table": {
          "caption": "빈 원본·최신본 찾기표",
          "columns": [
            "구분",
            "직접 적을 내용"
          ],
          "rows": [
            [
              "검사 시행일",
              "________________________________"
            ],
            [
              "다음 예약일",
              "________________________________"
            ],
            [
              "가족의 자료 확인일",
              "________________________________"
            ],
            [
              "원본 위치",
              "________________________________"
            ],
            [
              "최신 찾기표 위치",
              "________________________________"
            ],
            [
              "도움을 맡은 역할",
              "________________________________"
            ],
            [
              "동의한 공유 범위",
              "________________________________"
            ],
            [
              "아직 답을 못 받은 질문",
              "________________________________"
            ],
            [
              "찾기표 변경일",
              "________________________________"
            ]
          ]
        },
        "links": [
          {
            "href": "/health/samples/parent-record-locator-blank.html",
            "label": "원본·최신본 찾기표 한 장만 열어 인쇄하기"
          }
        ],
        "sourceIds": [
          "SUP-PARENT-RECORDS",
          "SUP-PARENT-TALK"
        ]
      },
      {
        "id": "handoff-check",
        "title": "인계할 때는 위치·바뀐 것·남은 질문만 확인합니다",
        "bullets": [
          "당사자가 동의한 다음 담당자가 최신 찾기표와 원본을 실제로 찾을 수 있는지 확인합니다.",
          "이번에 바뀐 위치나 안내를 표시하고 찾기표 변경일을 적습니다. 이전 사본은 과거 자료로 구분하며 원본을 함부로 버리지 않습니다.",
          "다음 사람이 맡을 일과 공유 범위를 다시 확인합니다. 한 사람이 모든 일을 떠맡기보다 필요한 도움을 상의합니다.",
          "해결되지 않은 질문은 완료 표시를 하지 않고 누구에게 확인할지 적습니다."
        ],
        "paragraphs": [
          "건강정보를 공개 링크나 공개 문의 채널에 올리지 마세요. 이 예시에서 정한 가족 역할은 자료를 찾고 메모하는 역할이며, 다른 사람의 치료를 대신 결정하도록 지정하는 절차가 아닙니다."
        ],
        "sourceIds": [
          "SUP-PARENT-NHS-CARERS",
          "SUP-PARENT-FDA-CARING",
          "SUP-PARENT-TALK"
        ]
      },
      {
        "id": "related-guides",
        "title": "상세 내용은 원본과 기존 목록에 연결합니다",
        "paragraphs": [
          "현재 사용하는 약은 전체 목록을 유지하고, 새 안내와 날짜를 별도로 남깁니다. 중단한 과거 약을 현재 목록과 자동으로 합치거나 목록 정리를 이유로 약을 임의로 바꾸지 않습니다.",
          "검사 결과는 원문을 보관하고 설명받은 내용과 아직 물을 질문을 구분하세요. 다음 진료·검사, 결과를 받을 방법과 문의할 곳은 받은 안내로 확인합니다. 찾기표에 일정을 적는 것만으로 예약이 완료되지는 않습니다."
        ],
        "sourceIds": [
          "SUP-PARENT-FDA-LIST",
          "SUP-PARENT-TALK"
        ],
        "links": [
          {
            "href": "/health/guides/medication-list",
            "label": "함량·사용법·실제 사용을 나눌 약 목록"
          },
          {
            "href": "/health/guides/reading-health-results",
            "label": "검사 결과 원문과 설명을 구분해 읽기"
          },
          {
            "href": "/health/guides/appointment-questions",
            "label": "다음 일정·결과·문의처를 물을 진료 질문"
          }
        ]
      },
      {
        "id": "urgent-action",
        "title": "위급하면 폴더를 찾기보다 119",
        "tone": "warning",
        "paragraphs": [
          "심한 호흡곤란이나 반응이 떨어지는 변화 등 위급한 상태이면 즉시 119에 연락하세요. 파일·약 목록·결과지를 찾거나 가족끼리 기록을 맞추느라 신고를 미루지 않습니다. 아는 정보를 전하고 모르는 것은 모른다고 답하세요."
        ],
        "sourceIds": [
          "SUP-PARENT-EMERGENCY"
        ],
        "links": [
          {
            "href": "/health/guides/danger-signals",
            "label": "서류 정리보다 즉시 도움받아야 할 위험 신호"
          }
        ]
      }
    ],
    "sources": [
      {
        "id": "SUP-PARENT-RECORDS",
        "organization": "NIH/NLM MedlinePlus",
        "title": "Personal Health Records",
        "url": "https://medlineplus.gov/personalhealthrecords.html",
        "sourceDate": "2019-10-17 (Last updated)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-PARENT-NHS-CARERS",
        "organization": "NHS",
        "title": "Medicines: tips for carers",
        "url": "https://www.nhs.uk/social-care-and-support/practical-tips-if-you-care-for-someone/medicines-tips-for-carers/",
        "sourceDate": "2024-04-25 (Page last reviewed)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-PARENT-FDA-LIST",
        "organization": "U.S. FDA",
        "title": "Create and Keep a Medication List for Your Health",
        "url": "https://www.fda.gov/consumers/consumer-updates/create-and-keep-medication-list-your-health",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-PARENT-TALK",
        "organization": "NIH/NLM MedlinePlus",
        "title": "Talking With Your Doctor",
        "url": "https://medlineplus.gov/talkingwithyourdoctor.html",
        "sourceDate": "2024-10-05 (Last updated)",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-PARENT-FDA-CARING",
        "organization": "U.S. FDA / Office of Women's Health",
        "title": "Caring for Others: Resources to Help You",
        "url": "https://www.fda.gov/consumers/womens-health-topics/caring-others-resources-help-you",
        "sourceDate": "HTML 본문 자체 날짜 미표시",
        "retrievedAt": "2026-10-01"
      },
      {
        "id": "SUP-PARENT-EMERGENCY",
        "organization": "MedlinePlus Medical Encyclopedia / A.D.A.M.",
        "title": "Recognizing medical emergencies",
        "url": "https://medlineplus.gov/ency/article/001927.htm",
        "sourceDate": "2025-01-08 (Review Date)",
        "retrievedAt": "2026-10-01"
      }
    ]
  },
];

export function getHealthSupportGuide(slug: string) {
  return healthSupportGuides.find((guide) => guide.slug === slug);
}
