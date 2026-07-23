export const editorialIdentity = {
  authorName: "Biz2Lab 편집팀",
  authorUrl: "/ko/about",
  operatorName: "mizzang0305-oss",
  operatorUrl: "https://github.com/mizzang0305-oss",
} as const;

export const editorialEvidenceTypes = [
  "original-workflow",
  "calculation-review",
  "official-document-review",
] as const;

export type EditorialEvidenceType = (typeof editorialEvidenceTypes)[number];

export type EditorialSource = {
  title: string;
  url: string;
  reviewedAt: string;
};

export type EditorialEvidence = {
  type: EditorialEvidenceType;
  summary: string;
  scope: string;
  sources: EditorialSource[];
};

const editorialEvidenceBySlug = {
  "ai-business-automation-guide": {
    type: "original-workflow",
    summary:
      "2026년 7월 합성 JSONL 기반 로컬 자동화 흐름을 재실행해 동일 입력의 결과 해시가 유지되고 webhook·알림·게시·업로드가 발생하지 않는지 확인했습니다.",
    scope:
      "실제 고객 문의나 결제를 실행하지 않은 로컬 검증이며 특정 AI 도구의 성능, 절감 시간, 비용 또는 수익을 보장하지 않습니다.",
    sources: [],
  },
  "automation-priority-method": {
    type: "calculation-review",
    summary:
      "부가 문서 작업보다 합성 입력의 end-to-end 처리와 멱등성 확인을 먼저 선택하고, 외부 전송과 대상이 검증되지 않은 작업은 실행 후보에서 제외했습니다.",
    scope:
      "실제 발생 횟수와 처리시간은 현장에서 다시 측정해야 하며 조직별 위험도, 규제 요건과 최종 자동화 결정을 대신하지 않습니다.",
    sources: [],
  },
  "chatgpt-document-cleanup": {
    type: "official-document-review",
    summary:
      "문서 원본 보존, 민감정보 제거, 수정 전후 검토 항목을 샘플 로그로 확인하고 ChatGPT 데이터 설정 관련 표현을 공식 안내와 대조했습니다.",
    scope:
      "문서 정리 절차를 설명하며 입력한 데이터의 보관·학습 설정은 사용 중인 계정과 최신 OpenAI 정책에서 다시 확인해야 합니다.",
    sources: [
      {
        title: "OpenAI Data Controls FAQ",
        url: "https://help.openai.com/en/articles/7730893-chat-and-file-retention-policies-in-chatgpt",
        reviewedAt: "2026-07-16",
      },
    ],
  },
  "google-sheets-ai-automation": {
    type: "official-document-review",
    summary:
      "트리거, 승인 상태, 실패 로그를 분리한 샘플 시트를 점검하고 Apps Script가 Sheets를 읽고 수정하는 방식은 Google 공식 문서와 대조했습니다.",
    scope:
      "설계 기준과 검토 절차를 다루며 실제 권한 범위, 할당량, 배포 방식은 사용하는 Google Workspace 환경에서 확인해야 합니다.",
    sources: [
      {
        title: "Google Apps Script: Extend Google Sheets",
        url: "https://developers.google.com/apps-script/guides/sheets",
        reviewedAt: "2026-07-16",
      },
    ],
  },
  "obsidian-business-knowledge-base": {
    type: "official-document-review",
    summary:
      "상태, 소유자, 근거, 검토일, 대체 문서 필드가 오래된 지식을 구분하는지 샘플 색인으로 확인하고 기본 기능 범위는 공식 도움말과 대조했습니다.",
    scope:
      "업무 지식 관리 구조를 설명하며 동기화, 플러그인, 상업적 사용 조건과 보안 설정은 도입 시점의 공식 문서를 확인해야 합니다.",
    sources: [
      {
        title: "Obsidian Help",
        url: "https://obsidian.md/help/",
        reviewedAt: "2026-07-16",
      },
    ],
  },
  "pre-automation-task-list": {
    type: "original-workflow",
    summary:
      "업무명, 빈도, 입력, 예외, 담당자, 실패 영향 필드가 실제 자동화 후보를 구분할 수 있는지 샘플 업무 목록으로 점검했습니다.",
    scope:
      "자동화 전 조사 양식이며 보안·법률·노무·회계 위험 평가나 제품 선정 결과를 대신하지 않습니다.",
    sources: [],
  },
  "reduce-repetitive-work-with-ai": {
    type: "calculation-review",
    summary:
      "작업 횟수와 건당 시간을 기준으로 주간 소요 시간을 계산하고 자동화 전후 시간 차이가 CSV의 같은 공식으로 재현되는지 확인했습니다.",
    scope:
      "샘플 시간 기록을 이용한 추정 방법이며 실제 절감 시간과 비용은 업무 복잡도와 검토 시간에 따라 달라집니다.",
    sources: [],
  },
  "accounts-receivable-tracker": {
    type: "calculation-review",
    summary:
      "결제 승인 연동에서 원 주문 식별자와 금액 형식을 단계 사이에 보존하고 관련 계약 테스트 10건과 전체 테스트 456건으로 값 전달을 확인한 경험을 기록 원칙에 반영했습니다.",
    scope:
      "결제 소프트웨어 상태 검증을 미수금 기록에 적용한 것이며 실제 회수율, 채권 추심, 법적 통지, 세무 처리나 회수 가능성을 입증하지 않습니다.",
    sources: [],
  },
  "daily-sales-goal-breakdown": {
    type: "calculation-review",
    summary:
      "월 목표와 현재 실적의 차이, 남은 영업일, 평균 주문 금액을 이용한 일 목표와 필요 주문 수 계산을 샘플 숫자로 재검산했습니다.",
    scope:
      "목표를 일일 행동으로 나누는 계산 예시이며 매출 달성이나 영업 성과를 보장하지 않습니다.",
    sources: [],
  },
  "daily-sales-report": {
    type: "original-workflow",
    summary:
      "매출, 주문, 취소, 입금, 미처리 항목이 섞이지 않도록 마감 순서를 나누고 샘플 보고서의 합계와 상태 필드를 점검했습니다.",
    scope:
      "운영 마감용 기록 양식이며 회계 장부, 세금 신고 자료 또는 외부 감사 증빙을 대체하지 않습니다.",
    sources: [],
  },
  "payment-reminder-message": {
    type: "original-workflow",
    summary:
      "청구 사실, 약속일, 확인 요청, 다음 조치가 구분되는지 가상 메시지와 후속 조치 로그를 대조하고 과장·위협 표현을 제외했습니다.",
    scope:
      "일반적인 입금 확인 커뮤니케이션 예시이며 법적 최고, 채권 추심 문안 또는 자동 발송 승인을 대신하지 않습니다.",
    sources: [],
  },
  "sales-achievement-rate": {
    type: "calculation-review",
    summary:
      "목표 대비 실적 비율, 부족 금액, 남은 기간의 일평균 필요 실적을 공개된 공식과 샘플 CSV로 각각 재계산했습니다.",
    scope:
      "기초 산술을 이용한 현황 파악 자료이며 미래 매출, 수익성 또는 계약 성사율을 예측하지 않습니다.",
    sources: [],
  },
  "sales-revenue-ar-structure": {
    type: "calculation-review",
    summary:
      "주문, 매출 인식, 청구, 입금, 미수금 단계를 가상 거래 한 건으로 연결하고 단계별 금액 합계가 일치하는지 확인했습니다.",
    scope:
      "현금 흐름을 이해하기 위한 운영 모델이며 기업별 회계 기준, 부가세, 세무 신고 판단을 대신하지 않습니다.",
    sources: [],
  },
  "unify-order-channels-for-sales": {
    type: "original-workflow",
    summary:
      "전화·메일·메시지 주문을 하나의 주문번호, 담당자, 금액, 상태, 다음 행동 필드로 변환할 수 있는지 샘플 등록부로 점검했습니다.",
    scope:
      "주문 접수 누락을 줄이기 위한 내부 운영 방식이며 결제 승인, 재고 확정 또는 고객 계약을 자동으로 성립시키지 않습니다.",
    sources: [],
  },
  "ai-knowledge-store-for-small-business": {
    type: "original-workflow",
    summary:
      "AI 답변에 쓰는 원본마다 출처, 소유자, 공개 범위, 확인일, 사용 중지일을 기록할 수 있는지 샘플 등록부로 확인했습니다.",
    scope:
      "지식 원본의 추적 구조를 설명하며 답변의 정확성, 개인정보 적법성 또는 최신성을 자동으로 보장하지 않습니다.",
    sources: [],
  },
  "customer-memory-system": {
    type: "original-workflow",
    summary:
      "고객 요청, 선호, 이전 응대, 다음 연락일을 필요한 최소 필드로 분리하고 가상 고객 기록에 민감정보가 포함되지 않았는지 점검했습니다.",
    scope:
      "고객 후속 조치를 위한 최소 기록 예시이며 실제 개인정보 수집·보관의 법적 근거나 동의 절차는 사업자가 별도로 확인해야 합니다.",
    sources: [],
  },
  "daily-numbers-for-small-business": {
    type: "calculation-review",
    summary:
      "Biz2Lab 공개 글 수를 실제 Markdown과 색인에서 계산하고 연결 데이터가 없는 분석 항목에는 가짜 수치를 넣지 않는 운영 대시보드 원칙을 반영했습니다.",
    scope:
      "본문의 금액과 주문 수는 가상 계산 예시이며 실제 매장 성과, 손익계산서, 현금흐름표나 세무 자료를 대체하지 않습니다.",
    sources: [],
  },
  "reservation-order-review-management": {
    type: "original-workflow",
    summary:
      "예약, 주문, 리뷰 요청이 한 목록에서 섞이지 않도록 유형, 상태, 담당자, 기한, 다음 행동 필드를 가상 사례로 점검했습니다.",
    scope:
      "업무 대기열 관리 예시이며 플랫폼별 예약 확정, 환불, 리뷰 요청 정책은 해당 서비스 기준을 따라야 합니다.",
    sources: [],
  },
  "solo-business-systemization": {
    type: "original-workflow",
    summary:
      "판매, 정산, 고객, 문서 업무를 주간 주기로 나누고 각 항목에 마감일, 상태, 다음 행동이 있는지 샘플 통제표로 확인했습니다.",
    scope:
      "1인 사업자의 주간 운영 점검 방식이며 업종별 인허가, 노무, 세무와 법률 의무를 대신 판단하지 않습니다.",
    sources: [],
  },
  "unify-order-channels": {
    type: "original-workflow",
    summary:
      "결제 승인 단계에서 원 주문 ID를 끝까지 보존하고 데이터 원본 대상이 검증되지 않으면 다음 단계로 확장하지 않은 시스템 검증 경험을 통합번호 설계에 반영했습니다.",
    scope:
      "실제 매장의 누락률 개선을 측정한 사례가 아니며 결제, 재고 차감, 배송 확정은 담당 시스템과 사람의 확인이 필요합니다.",
    sources: [],
  },
} as const satisfies Record<string, EditorialEvidence>;

export function getEditorialEvidence(slug: string): EditorialEvidence {
  const evidence = editorialEvidenceBySlug[slug as keyof typeof editorialEvidenceBySlug];

  if (!evidence) {
    throw new Error(`${slug}: published article is missing editorial evidence`);
  }

  return evidence;
}

export function getEditorialEvidenceEntries(): [string, EditorialEvidence][] {
  return Object.entries(editorialEvidenceBySlug);
}
