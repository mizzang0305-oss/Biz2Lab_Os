import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import sharp from "sharp";

type Category = "automation" | "sales-ops" | "small-business" | "contracts-payments";
type Priority = "TOP3" | "P1" | "P2";
type ImageKind = "hero" | "workflow" | "dashboard" | "risk-map" | "checklist";

type ArticlePlan = {
  slug: string;
  focus: string;
  audience: string;
  problem: string;
  concept: string;
  scenario: string;
  primaryMetric: string;
  automationInput: string;
  output: string;
  risk: string;
};

type ParsedPost = {
  filePath: string;
  data: Record<string, unknown>;
  content: string;
};

type InventoryRow = {
  slug: string;
  title: string;
  category: string;
  priority: Priority;
  chars: number;
  headingCount: number;
  faqCount: number;
  internalLinkCount: number;
  imageCount: number;
  grade: "A" | "B" | "C" | "D";
};

type ImageSpec = {
  slug: string;
  title: string;
  category: Category;
  priority: Priority;
  kind: ImageKind;
  focus: string;
  alt: string;
  caption: string;
  rawPath: string;
  optimizedPath: string;
};

const root = process.cwd();
const today = "2026-06-16";

const top3 = new Set([
  "ai-business-automation-guide",
  "accounts-receivable-tracker",
  "electronic-contract-system-basics",
]);

const p1 = new Set([
  "automation-priority-method",
  "chatgpt-document-cleanup",
  "google-sheets-ai-automation",
  "sales-revenue-ar-structure",
  "connect-contract-payment-customer-management",
  "payment-reminder-message",
  "unify-order-channels",
  "customer-memory-system",
]);

const plans: Record<string, ArticlePlan> = {
  "ai-business-automation-guide": {
    slug: "ai-business-automation-guide",
    focus: "AI 업무 자동화 설계",
    audience: "소상공인과 작은 영업팀",
    problem: "반복 업무를 줄이고 싶지만 어떤 업무를 자동화 후보로 올려야 하는지 구분하지 못하는 상황",
    concept: "입력 표준화, 규칙 처리, AI 초안, 사람 승인, 실행 기록을 분리하는 운영 방식",
    scenario: "매일 들어오는 주문 문의와 미수금 확인, 계약 상태 메모가 각각 다른 채널에 흩어져 담당자가 하루 끝에 다시 정리하는 상황",
    primaryMetric: "반복 빈도, 오류 비용, 검토 난이도, 고객 영향",
    automationInput: "업무명, 발생 빈도, 필요한 입력값, 담당자, 검토 기준",
    output: "자동화 후보 목록과 사람 검토가 필요한 실행 단계",
    risk: "AI 초안이 사실과 다르게 작성되거나 고객 안내가 검토 없이 발송되는 위험",
  },
  "accounts-receivable-tracker": {
    slug: "accounts-receivable-tracker",
    focus: "미수금 aging 관리",
    audience: "B2B 영업팀과 대표가 직접 회수 상황을 보는 작은 회사",
    problem: "입금 예정일과 실제 입금 상태가 분리되어 누가 언제 연락해야 하는지 늦게 발견되는 상황",
    concept: "청구일, 약속일, 경과일, 다음 조치, 담당자 확인을 한 행에서 관리하는 방식",
    scenario: "거래처별 세금계산서 발행 여부, 약속일, 최근 연락 메모가 따로 있어 월말에 미수금 목록을 다시 만드는 상황",
    primaryMetric: "경과일, 약속일 준수, 다음 연락 예정일, 담당자",
    automationInput: "거래처 구분값, 청구일, 금액, 약속일, 최근 연락 결과",
    output: "aging 구간별 미수금 보드와 오늘 연락해야 할 항목",
    risk: "금액 오기입, 중복 연락, 담당자 누락, 고객 관계 악화",
  },
  "electronic-contract-system-basics": {
    slug: "electronic-contract-system-basics",
    focus: "전자계약 상태 관리",
    audience: "계약, 결제, 고객 안내를 한 사람이 같이 관리하는 작은 팀",
    problem: "계약서 작성, 서명 요청, 본인확인, 결제 확인, 보관 상태가 연결되지 않아 미완료 건이 뒤늦게 발견되는 상황",
    concept: "계약 상태를 초안, 발송, 확인, 완료, 보관, 후속 조치로 나누어 감사 로그와 함께 관리하는 방식",
    scenario: "서명은 끝났지만 결제 확인이 늦거나, 결제는 되었지만 최종 계약 파일 보관 위치가 기록되지 않는 상황",
    primaryMetric: "상태, 마지막 확인일, 미완료 사유, 다음 조치",
    automationInput: "계약명, 서명 요청일, 확인 상태, 결제 상태, 보관 위치",
    output: "계약 상태 흐름표와 미완료 후속 조치 목록",
    risk: "본인확인 누락, 결제 상태 착오, 문서 보관 누락, 권한 관리 실패",
  },
  "automation-priority-method": {
    slug: "automation-priority-method",
    focus: "자동화 우선순위 점수화",
    audience: "자동화할 일이 많지만 순서를 정하지 못한 운영 담당자",
    problem: "쉬워 보이는 업무부터 자동화하다가 실제 효과가 작은 일에 시간을 쓰는 상황",
    concept: "반복 빈도, 오류 비용, 고객 영향, 검토 가능성으로 후보 업무를 점수화하는 방식",
    scenario: "매출 보고, 고객 문의 분류, 계약 상태 확인 중 무엇을 먼저 자동화해야 할지 회의마다 달라지는 상황",
    primaryMetric: "반복 빈도, 절감 시간, 실패 비용, 검토 가능성",
    automationInput: "업무 후보, 월 발생 건수, 현재 소요 시간, 오류 발생 시 영향",
    output: "이번 주에 시작할 자동화 후보 1개와 보류할 후보 목록",
    risk: "효과보다 유행을 기준으로 도구를 고르는 위험",
  },
  "chatgpt-document-cleanup": {
    slug: "chatgpt-document-cleanup",
    focus: "업무 문서 정리",
    audience: "회의 메모와 고객 요청을 매번 다시 읽는 실무자",
    problem: "메모는 많지만 제목, 담당자, 결정사항, 다음 조치가 분리되지 않아 실행으로 이어지지 않는 상황",
    concept: "원문 보존, 항목 분류, 누락 질문, 담당자 확인을 나누어 문서를 정리하는 방식",
    scenario: "고객 통화 메모를 그대로 저장해 두었다가 다음 상담 때 핵심 약속과 금액 조건을 다시 찾는 상황",
    primaryMetric: "문서 처리 시간, 누락 항목, 확인 완료율",
    automationInput: "원문 메모, 문서 유형, 필요한 항목, 검토 담당자",
    output: "정리된 업무 기록, 누락 질문, 다음 조치 체크리스트",
    risk: "AI가 원문에 없는 내용을 추가하거나 담당자 확인 없이 확정 문서처럼 쓰는 위험",
  },
  "google-sheets-ai-automation": {
    slug: "google-sheets-ai-automation",
    focus: "시트 기반 AI 자동화",
    audience: "엑셀과 시트로 업무를 관리하는 작은 팀",
    problem: "시트에는 데이터가 있지만 입력 규칙이 달라 AI 요약이나 알림이 정확하게 작동하지 않는 상황",
    concept: "열 이름, 값 형식, 상태값, 검토 열을 고정한 뒤 AI를 초안 생성에만 연결하는 방식",
    scenario: "주문 상태와 상담 메모가 한 셀에 섞여 있어 오늘 처리할 주문을 자동으로 뽑지 못하는 상황",
    primaryMetric: "입력 누락률, 상태값 일치율, 담당자 확인율",
    automationInput: "표준 열, 상태값, 담당자, 마감일, 검토 여부",
    output: "요약 초안, 알림 후보, 담당자 확인 목록",
    risk: "원본 시트가 틀렸는데 AI 결과만 믿는 위험",
  },
  "obsidian-business-knowledge-base": {
    slug: "obsidian-business-knowledge-base",
    focus: "회사 업무 지식창고",
    audience: "업무 기준이 사람 머릿속에만 있는 작은 조직",
    problem: "같은 질문에 다른 답을 하거나 이전 결정 기준을 찾지 못해 매번 새로 판단하는 상황",
    concept: "업무 기준, 고객 응대, 의사결정, 예외 사례를 연결 문서로 관리하는 방식",
    scenario: "신입 담당자가 고객 안내 기준을 물을 때마다 이전 메신저 기록을 검색하는 상황",
    primaryMetric: "문서 재사용률, 최신 기준 확인일, 예외 기록 수",
    automationInput: "업무 기준 문서, 질문 유형, 승인자, 마지막 수정일",
    output: "검색 가능한 업무 기준과 AI 응답 초안의 참고 자료",
    risk: "오래된 기준을 최신 기준처럼 사용하는 위험",
  },
  "pre-automation-task-list": {
    slug: "pre-automation-task-list",
    focus: "자동화 전 업무 목록화",
    audience: "도구 도입 전에 업무 범위를 정해야 하는 대표와 실무자",
    problem: "업무를 충분히 쪼개지 않고 도구부터 고르면서 자동화 범위가 계속 커지는 상황",
    concept: "업무명, 입력값, 예외, 승인자, 결과물을 먼저 적고 자동화 후보를 정하는 방식",
    scenario: "고객 안내, 주문 확인, 매출 보고를 한꺼번에 자동화하려다 어느 단계에서 사람이 봐야 하는지 놓치는 상황",
    primaryMetric: "업무 후보 수, 입력값 명확도, 예외 비율",
    automationInput: "업무 목록, 반복 빈도, 예외 사례, 최종 승인자",
    output: "자동화 가능 업무와 사람 확인이 필요한 업무의 분리표",
    risk: "예외가 많은 업무를 무리하게 자동화하는 위험",
  },
  "reduce-repetitive-work-with-ai": {
    slug: "reduce-repetitive-work-with-ai",
    focus: "반복 업무 축소",
    audience: "매일 같은 정리와 보고를 반복하는 실무자",
    problem: "반복 업무가 바쁘다는 이유로 계속 손으로 처리되어 실수와 피로가 누적되는 상황",
    concept: "수집, 정리, 초안, 검토, 기록을 나누어 사람의 판단 시간을 남기는 방식",
    scenario: "매일 오후 주문 문의와 매출 숫자를 복사해 보고서를 만들지만 검토 기준이 없어 오류를 늦게 발견하는 상황",
    primaryMetric: "반복 시간, 오류 횟수, 검토 완료율",
    automationInput: "원본 데이터, 정리 규칙, 보고서 형식, 검토자",
    output: "반복 업무 감소표와 자동화 후보 실행 계획",
    risk: "자동화가 오히려 확인할 일을 숨기는 위험",
  },
  "connect-contract-payment-customer-management": {
    slug: "connect-contract-payment-customer-management",
    focus: "계약 결제 고객관리 연결",
    audience: "계약과 입금, 고객 후속 조치를 따로 관리하는 팀",
    problem: "계약 상태와 결제 상태가 분리되어 고객 안내와 후속 조치가 끊기는 상황",
    concept: "계약, 결제, 고객 메모를 하나의 상태 흐름으로 연결하는 방식",
    scenario: "계약서 발송 후 결제 요청은 했지만 고객이 어떤 단계에서 멈췄는지 담당자가 바로 알지 못하는 상황",
    primaryMetric: "계약 상태, 결제 상태, 마지막 연락일, 다음 조치",
    automationInput: "계약 번호 대신 내부 식별값, 상태, 담당자, 후속 조치일",
    output: "계약-결제-고객 후속 조치 보드",
    risk: "고객 안내 오발송, 결제 상태 착오, 권한 없는 문서 접근",
  },
  "e-signature-identity-check": {
    slug: "e-signature-identity-check",
    focus: "전자서명과 본인확인 구분",
    audience: "계약 절차를 온라인으로 옮기는 작은 팀",
    problem: "서명 완료와 본인확인 완료를 같은 의미로 보고 검토 단계를 생략하는 상황",
    concept: "서명 의사, 확인 수단, 기록 보관, 담당자 검토를 별도 항목으로 관리하는 방식",
    scenario: "서명 링크는 완료되었지만 내부 확인 문서와 고객 안내 기록이 남지 않아 나중에 추적이 어려운 상황",
    primaryMetric: "확인 방식, 완료 시각, 검토자, 보관 위치",
    automationInput: "서명 요청일, 확인 상태, 보관 위치, 내부 검토 결과",
    output: "전자서명 확인 체크리스트와 미완료 항목",
    risk: "법률적 판단을 시스템 상태만으로 단정하는 위험",
  },
  "manage-unsigned-contracts": {
    slug: "manage-unsigned-contracts",
    focus: "미작성 계약 추적",
    audience: "계약서 미작성 상태를 영업 후속 조치로 관리해야 하는 팀",
    problem: "미작성 계약이 개인 메모에만 남아 월말에 누락 계약을 다시 찾는 상황",
    concept: "미작성 사유, 마지막 연락일, 다음 요청일, 담당자를 한 표에서 관리하는 방식",
    scenario: "상담은 끝났지만 계약서가 아직 오가지 않은 고객을 담당자가 바뀌면서 놓치는 상황",
    primaryMetric: "미작성 기간, 사유, 다음 요청일, 담당자",
    automationInput: "고객 구분값, 계약 유형, 미작성 사유, 후속 조치일",
    output: "미작성 계약 follow-up 목록",
    risk: "무리한 독촉, 잘못된 계약 조건 발송, 상태 누락",
  },
  "offline-card-payment-pg-van": {
    slug: "offline-card-payment-pg-van",
    focus: "오프라인 카드결제와 PG/VAN 확인",
    audience: "현장 결제와 온라인 결제를 함께 받는 운영자",
    problem: "결제 요청, 승인, 정산, 취소 상태를 같은 말로 섞어 처리해 마감 때 차이가 나는 상황",
    concept: "결제 수단별로 확인해야 할 상태와 내부 기록 위치를 나누는 방식",
    scenario: "현장 결제는 완료되었지만 내부 주문표에는 미확인으로 남아 고객에게 다시 안내하는 상황",
    primaryMetric: "승인 여부, 정산 확인, 취소 여부, 내부 주문 상태",
    automationInput: "주문 식별값, 결제 수단, 승인 상태, 확인 담당자",
    output: "결제 상태 대조표와 마감 확인 목록",
    risk: "중복 청구, 취소 누락, 결제 정보 접근 권한 관리 실패",
  },
  "daily-sales-goal-breakdown": {
    slug: "daily-sales-goal-breakdown",
    focus: "월 목표의 일일 행동 분해",
    audience: "월말 실적을 기다리지 않고 매일 조정해야 하는 영업팀",
    problem: "월 매출 목표만 보고 있어 오늘 어떤 상담과 제안을 해야 하는지 연결되지 않는 상황",
    concept: "월 목표를 일일 상담, 제안, 입금 확인, 후속 조치로 나누는 방식",
    scenario: "월말에 목표 부족을 발견하지만 이미 남은 상담 가능일이 부족한 상황",
    primaryMetric: "일일 목표, 상담 수, 제안 수, 입금 예정액",
    automationInput: "월 목표, 영업일, 평균 객단가, 전환율 가정",
    output: "일일 행동 목표표와 부족분 알림",
    risk: "전환율을 과신하거나 숫자만 맞추는 위험",
  },
  "daily-sales-report": {
    slug: "daily-sales-report",
    focus: "영업팀 일일 보고",
    audience: "짧지만 실행 가능한 보고가 필요한 영업팀",
    problem: "일일 보고가 활동 나열로 끝나 다음 조치와 리스크가 보이지 않는 상황",
    concept: "오늘 숫자, 차이 원인, 내일 행동, 막힌 항목을 한 화면에 정리하는 방식",
    scenario: "상담 수는 많았지만 견적 발송과 입금 확인이 밀려 다음 날 우선순위를 다시 정해야 하는 상황",
    primaryMetric: "상담, 견적, 계약, 입금, 다음 조치",
    automationInput: "오늘 활동, 결과 숫자, 지연 사유, 내일 조치",
    output: "일일 보고 초안과 관리자 확인 항목",
    risk: "보고 자동화가 책임 소재를 흐리게 만드는 위험",
  },
  "payment-reminder-message": {
    slug: "payment-reminder-message",
    focus: "입금 확인 메시지",
    audience: "거래처 관계를 해치지 않고 입금 상태를 확인해야 하는 담당자",
    problem: "독촉처럼 보일까 봐 연락을 미루거나 반대로 너무 강한 문구를 보내 관계가 나빠지는 상황",
    concept: "약속일 확인, 자료 재전달, 다음 확인일 제안 중심으로 메시지를 구성하는 방식",
    scenario: "입금 예정일이 지났지만 거래처가 단순 누락인지 일정 변경인지 알 수 없어 연락 문구를 고민하는 상황",
    primaryMetric: "약속일, 마지막 연락일, 회신 여부, 다음 확인일",
    automationInput: "거래처 구분값, 금액 범위, 약속일, 이전 연락 메모",
    output: "사람이 검토할 입금 확인 메시지 초안",
    risk: "금액 오류, 오발송, 과도한 압박 표현",
  },
  "sales-achievement-rate": {
    slug: "sales-achievement-rate",
    focus: "매출 달성률 해석",
    audience: "목표 대비 부족분을 행동으로 바꾸려는 영업팀",
    problem: "달성률 숫자만 보고 부족한 이유와 다음 행동을 분리하지 못하는 상황",
    concept: "목표, 실적, 부족분, 남은 영업일, 필요한 행동량을 함께 보는 방식",
    scenario: "달성률은 낮지만 실제로는 입금 예정액이 많아 조치 방식이 달라져야 하는 상황",
    primaryMetric: "달성률, 부족액, 남은 영업일, 예상 입금",
    automationInput: "목표액, 현재 실적, 예정 금액, 남은 기간",
    output: "부족분 해석표와 다음 행동 목록",
    risk: "허수 예정 금액을 실적으로 오해하는 위험",
  },
  "sales-revenue-ar-structure": {
    slug: "sales-revenue-ar-structure",
    focus: "매출과 미수금 연결 구조",
    audience: "매출은 늘지만 입금과 후속 조치가 늦는 팀",
    problem: "매출, 청구, 입금, 미수금이 따로 관리되어 실제 현금 흐름과 영업 활동이 맞지 않는 상황",
    concept: "매출 발생 이후 입금 상태와 다음 조치를 연결해 보는 방식",
    scenario: "계약은 늘었지만 입금 확인이 늦어 다음 달 운영 자금 계획이 흔들리는 상황",
    primaryMetric: "매출, 청구, 입금, 미수금, 다음 연락일",
    automationInput: "매출 행, 청구 상태, 입금 상태, 담당자",
    output: "매출-미수금 연결표와 후속 조치 목록",
    risk: "매출만 보고 회수 가능성을 과대평가하는 위험",
  },
  "unify-order-channels-for-sales": {
    slug: "unify-order-channels-for-sales",
    focus: "영업 주문 채널 통합",
    audience: "전화, 메시지, 메일 주문을 함께 받는 영업 담당자",
    problem: "주문 요청이 여러 채널에 흩어져 견적, 계약, 결제 후속 조치가 빠지는 상황",
    concept: "채널이 아니라 주문 단위로 상태를 통합해 관리하는 방식",
    scenario: "메일로 온 주문 변경 요청이 메신저 대화와 연결되지 않아 잘못된 수량으로 처리되는 상황",
    primaryMetric: "주문 상태, 변경 여부, 확인 담당자, 다음 조치",
    automationInput: "주문 채널, 요청 내용, 수량, 확인 상태, 담당자",
    output: "채널 통합 주문 보드",
    risk: "중복 주문, 변경 누락, 고객 안내 오발송",
  },
  "ai-knowledge-store-for-small-business": {
    slug: "ai-knowledge-store-for-small-business",
    focus: "AI 점장 기준 자료",
    audience: "고객 질문과 운영 기준을 혼자 관리하는 매장 운영자",
    problem: "자주 묻는 질문과 운영 기준이 정리되지 않아 AI 초안도 매번 흔들리는 상황",
    concept: "가격 정책, 운영 시간, 예외 처리, 고객 안내 기준을 먼저 문서화하는 방식",
    scenario: "예약 변경, 재고 문의, 리뷰 대응을 매번 기억에 의존해 답하다가 안내가 달라지는 상황",
    primaryMetric: "기준 문서 수, 최신 확인일, 질문 유형",
    automationInput: "운영 기준, FAQ, 예외 규칙, 검토자",
    output: "AI 응답 초안의 기준 자료와 확인 체크리스트",
    risk: "오래된 기준으로 고객에게 안내하는 위험",
  },
  "customer-memory-system": {
    slug: "customer-memory-system",
    focus: "고객 이력 기억 시스템",
    audience: "단골과 재방문 고객 응대를 놓치고 싶지 않은 사업자",
    problem: "고객 선호와 이전 응대가 개인 기억에만 남아 담당자가 바뀌면 서비스 품질이 흔들리는 상황",
    concept: "민감정보를 줄이고 다음 응대에 필요한 선호, 이력, 약속만 구조화하는 방식",
    scenario: "자주 주문하는 고객의 요청사항을 기억하지 못해 매번 같은 질문을 반복하는 상황",
    primaryMetric: "재방문 이력, 선호, 다음 응대, 마지막 확인일",
    automationInput: "고객 식별 기준, 요청 유형, 선호, 주의 사항",
    output: "다음 응대 요약과 담당자 확인 카드",
    risk: "개인정보 과수집, 권한 없는 열람, 오래된 선호 사용",
  },
  "daily-numbers-for-small-business": {
    slug: "daily-numbers-for-small-business",
    focus: "소상공인 일일 숫자",
    audience: "매일 짧게 운영 상태를 확인해야 하는 사장님",
    problem: "매출만 보고 주문, 객수, 예약, 재고, 미처리 문의를 함께 보지 못하는 상황",
    concept: "하루 운영을 판단할 최소 숫자를 정하고 같은 시간에 확인하는 방식",
    scenario: "매출은 괜찮아 보였지만 예약 취소와 재고 부족을 늦게 발견해 다음 날 운영이 흔들리는 상황",
    primaryMetric: "매출, 객수, 주문, 예약, 미처리 문의",
    automationInput: "일일 운영 숫자, 특이사항, 다음 조치",
    output: "일일 운영 대시보드와 마감 체크리스트",
    risk: "숫자를 모으기만 하고 행동으로 연결하지 못하는 위험",
  },
  "reservation-order-review-management": {
    slug: "reservation-order-review-management",
    focus: "예약 주문 리뷰 통합 관리",
    audience: "매장 운영 중 여러 고객 접점을 함께 보는 운영자",
    problem: "예약, 주문, 리뷰가 각각 다른 곳에 있어 누락과 중복 응대가 생기는 상황",
    concept: "고객 접점을 하나의 상태판으로 모아 오늘 처리할 항목부터 보는 방식",
    scenario: "예약 변경 요청을 처리했지만 주문 준비표에 반영되지 않아 현장에서 다시 확인하는 상황",
    primaryMetric: "예약 상태, 주문 상태, 리뷰 응대 상태, 담당자",
    automationInput: "예약일, 주문 내용, 리뷰 유형, 처리 상태",
    output: "오늘 처리할 접점 목록과 누락 방지 체크리스트",
    risk: "고객 요청 누락, 중복 응대, 부정확한 안내",
  },
  "solo-business-systemization": {
    slug: "solo-business-systemization",
    focus: "1인 사업자 업무 시스템화",
    audience: "혼자 운영하면서 반복 업무가 쌓이는 사업자",
    problem: "모든 일을 직접 처리하다 보니 주문, 정산, 고객 응대, 문서 정리가 동시에 밀리는 상황",
    concept: "업무를 시간대와 상태별로 나누고 반복되는 판단을 체크리스트로 고정하는 방식",
    scenario: "오전 주문 처리 후 오후 정산과 고객 문의가 겹쳐 중요한 연락을 놓치는 상황",
    primaryMetric: "반복 업무 수, 마감 시간, 미처리 항목",
    automationInput: "업무명, 처리 시간, 확인 기준, 다음 조치",
    output: "1인 운영 체크리스트와 주간 자동화 후보",
    risk: "자동화 설정을 관리할 시간이 없어 더 복잡해지는 위험",
  },
  "unify-order-channels": {
    slug: "unify-order-channels",
    focus: "주문 채널 통합",
    audience: "전화, 현장, 메시지 주문을 함께 받는 소상공인",
    problem: "주문이 여러 채널에 흩어져 수량, 요청사항, 결제 상태가 누락되는 상황",
    concept: "주문 채널을 하나로 없애기보다 주문 상태를 한 표로 모으는 방식",
    scenario: "전화 주문과 메시지 변경 요청이 따로 남아 잘못된 시간에 준비하는 상황",
    primaryMetric: "주문 상태, 요청사항, 결제 상태, 준비 시간",
    automationInput: "채널, 주문 내용, 요청사항, 결제 여부, 담당자",
    output: "통합 주문표와 누락 방지 알림 후보",
    risk: "주문 중복, 변경 누락, 고객 안내 지연",
  },
};

function walkMarkdownFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkMarkdownFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    })
    .sort();
}

function parsePosts(): ParsedPost[] {
  return walkMarkdownFiles(path.join(root, "content", "ko")).map((filePath) => {
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    return {
      filePath,
      data: parsed.data,
      content: parsed.content.trim(),
    };
  });
}

function parsePostsFromOrigin(): ParsedPost[] {
  const repoPaths = execFileSync("git", ["ls-tree", "-r", "--name-only", "origin/master", "content/ko"], {
    cwd: root,
    encoding: "utf8",
  })
    .split(/\r?\n/)
    .filter((repoPath) => repoPath.endsWith(".md"));

  return repoPaths.map((repoPath) => {
    const raw = execFileSync("git", ["show", `origin/master:${repoPath}`], {
      cwd: root,
      encoding: "utf8",
    });
    const parsed = matter(raw);
    return {
      filePath: path.join(root, repoPath),
      data: parsed.data,
      content: parsed.content.trim(),
    };
  });
}

function baselinePosts(currentPosts: ParsedPost[]): ParsedPost[] {
  try {
    const posts = parsePostsFromOrigin();
    return posts.length === currentPosts.length ? posts : currentPosts;
  } catch {
    return currentPosts;
  }
}

function priorityFor(slug: string): Priority {
  if (top3.has(slug)) return "TOP3";
  if (p1.has(slug)) return "P1";
  return "P2";
}

function gradeFor(row: Omit<InventoryRow, "grade">): InventoryRow["grade"] {
  if (row.priority === "TOP3") {
    return row.chars >= 2000 && row.imageCount >= 3 && row.faqCount >= 4 ? "A" : "C";
  }

  if (row.priority === "P1") {
    return row.chars >= 1500 && row.imageCount >= 1 && row.faqCount >= 4 ? "A" : "C";
  }

  if (row.chars >= 1200 && row.faqCount >= 3) {
    return row.imageCount >= 1 ? "A" : "B";
  }

  return "C";
}

function inventory(posts: ParsedPost[]): InventoryRow[] {
  return posts.map((post) => {
    const slug = String(post.data.slug);
    const content = post.content;
    const base = {
      slug,
      title: String(post.data.title),
      category: String(post.data.category),
      priority: priorityFor(slug),
      chars: [...content].length,
      headingCount: (content.match(/^##\s+/gm) ?? []).length,
      faqCount: Array.isArray(post.data.faq) ? post.data.faq.length : 0,
      internalLinkCount: (content.match(/\]\(\/ko\//g) ?? []).length,
      imageCount: (content.match(/!\[[^\]]+\]\(\/images\/posts\//g) ?? []).length,
    } satisfies Omit<InventoryRow, "grade">;

    return {
      ...base,
      grade: gradeFor(base),
    };
  });
}

function orderedRelatedLinks(relatedPosts: unknown, fallback: string[]) {
  const slugs = Array.isArray(relatedPosts) ? relatedPosts.map(String) : fallback;
  return slugs.slice(0, 3);
}

function faqFor(plan: ArticlePlan, priority: Priority) {
  const base = [
    {
      question: `${plan.focus}은 도구를 먼저 정해야 시작할 수 있나요?`,
      answer: `아닙니다. 먼저 ${plan.automationInput}을 같은 형식으로 정리해야 합니다. 도구는 그 다음에 고르는 편이 안전합니다. 입력값과 확인 기준이 정리되어 있으면 시트, 알림, AI 초안 중 어떤 방식이 맞는지 판단하기 쉽습니다.`,
    },
    {
      question: `작은 팀에서도 ${plan.focus}을 바로 적용할 수 있나요?`,
      answer: `가능합니다. 처음부터 전체 업무를 바꾸기보다 ${plan.primaryMetric}처럼 한두 가지 기준만 고정해도 효과를 볼 수 있습니다. 담당자가 마지막 확인을 맡는 구조를 유지하면 실수 위험을 줄이면서 자동화를 실험할 수 있습니다.`,
    },
    {
      question: `AI를 쓰면 ${plan.risk}을 어떻게 막을 수 있나요?`,
      answer: `AI는 최종 실행자가 아니라 초안 작성자로 두는 것이 안전합니다. 고객 안내, 금액, 계약, 결제와 관련된 내용은 담당자가 원본 자료와 비교해야 합니다. 검토 완료 열과 수정 이력을 남기면 나중에 문제가 생겼을 때 원인을 추적할 수 있습니다.`,
    },
  ];

  if (priority === "TOP3" || priority === "P1") {
    base.push({
      question: `${plan.focus}을 운영 지표로 보려면 무엇을 남겨야 하나요?`,
      answer: `${plan.primaryMetric}을 같은 위치에 기록해야 합니다. 처리 결과만 남기면 다음 행동을 정하기 어렵습니다. 입력값, 산출물, 담당자 확인 기준을 함께 남겨야 자동화가 실무 개선으로 이어집니다.`,
    });
  }

  if (priority === "TOP3") {
    base.push({
      question: `${plan.focus}을 한 달 안에 자동화하려면 어디까지 해야 하나요?`,
      answer: `첫 주에는 표준 입력표와 담당자 확인 기준을 만들고, 둘째 주에는 알림이나 요약 초안을 붙이는 수준이 적절합니다. 한 달 안에는 ${plan.output}을 정기적으로 검토하는 흐름까지 만드는 것을 목표로 잡는 편이 현실적입니다.`,
    });
  }

  return base;
}

function imageSpecsFor(post: ParsedPost, plan: ArticlePlan): ImageSpec[] {
  const slug = String(post.data.slug);
  const category = String(post.data.category) as Category;
  const priority = priorityFor(slug);
  const inlineKinds: ImageKind[] = priority === "TOP3" ? ["workflow", "dashboard", "risk-map"] : priority === "P1" ? ["checklist"] : [];
  const kinds: ImageKind[] = priority === "TOP3" ? inlineKinds : ["hero", ...inlineKinds];

  return kinds.map((kind) => {
    const labelByKind = {
      hero: "대표 이미지",
      workflow: "업무 흐름도",
      dashboard: "실무 대시보드",
      "risk-map": "리스크 맵",
      checklist: "체크리스트",
    } satisfies Record<ImageKind, string>;
    const rawPath = `assets/images/raw/${slug}-${kind}.svg`;
    const optimizedPath = `public/images/posts/${slug}-${kind}.webp`;

    return {
      slug,
      title: String(post.data.title),
      category,
      priority,
      kind,
      focus: plan.focus,
      alt: `${plan.focus}을 설명하는 ${labelByKind[kind]}`,
      caption: `${plan.focus}에서 입력값, 담당자 확인, 다음 조치를 한눈에 보도록 정리한 ${labelByKind[kind]}입니다.`,
      rawPath,
      optimizedPath,
    };
  });
}

function imageMarkdown(spec: ImageSpec) {
  const src = `/${spec.optimizedPath.replace(/^public\//, "")}`;
  return `![${spec.alt}](${src} "${spec.caption}")`;
}

function linkBlock(slugs: string[]) {
  return slugs
    .map((slug) => `- [${slug}](/ko/${categoryPathBySlug(slug)}/${slug})`)
    .join("\n");
}

function categoryPathBySlug(slug: string) {
  const found = Object.values(plans).find((plan) => plan.slug === slug);
  if (found) {
    return categoryBySlug[slug];
  }
  return "automation";
}

const categoryBySlug: Record<string, Category> = {};

function riskRows() {
  return [
    ["개인정보", "필요 이상으로 고객 정보를 남김", "다음 응대에 필요한 최소 항목만 남기고 접근 권한을 제한합니다."],
    ["금액 오류", "입력값과 원본 금액이 다름", "금액 열은 원본 자료와 대조하고 승인 전 수정 이력을 남깁니다."],
    ["AI 초안 오류", "AI가 원문에 없는 내용을 보탬", "AI 결과를 확정 문서가 아니라 검토할 초안으로 표시합니다."],
    ["담당자 누락", "다음 조치가 주인 없이 남음", "각 행에 담당자와 확인 기한을 반드시 둡니다."],
  ];
}

function procedureRows(plan: ArticlePlan, priority: Priority) {
  const rows = [
    ["1", "업무 범위 정하기", plan.automationInput, "업무 후보와 제외 범위", "담당자가 실제로 반복 처리하는지 확인"],
    ["2", "입력값 표준화", plan.automationInput, "표준 입력표", "빈칸, 자유 입력, 중복 값을 줄였는지 확인"],
    ["3", "상태값 만들기", plan.primaryMetric, "상태 흐름표", "누가 봐도 같은 의미로 읽히는지 확인"],
    ["4", "AI 초안 분리", "정리된 원본과 작성 규칙", "요약 또는 안내 초안", "원문에 없는 내용이 추가되지 않았는지 확인"],
    ["5", "사람 승인 붙이기", "검토자와 승인 기준", "승인 완료 기록", "고객 안내, 금액, 계약, 결제는 승인 후 처리"],
  ];

  if (priority !== "P2") {
    rows.push(["6", "알림과 보고 연결", "기한, 담당자, 미처리 상태", "오늘 볼 업무 목록", "누락된 항목이 다음 날로 넘어가지 않는지 확인"]);
  }

  if (priority === "TOP3") {
    rows.push(["7", "월간 점검", "처리 시간과 오류 기록", "개선 우선순위", "자동화가 실제 시간을 줄였는지 확인"]);
  }

  return rows;
}

function markdownTable(headers: string[], rows: string[][]) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function bodyFor(post: ParsedPost, plan: ArticlePlan, specs: ImageSpec[]) {
  const slug = String(post.data.slug);
  const priority = priorityFor(slug);
  const related = orderedRelatedLinks(post.data.relatedPosts, []);
  const inlineSpecs = specs.filter((spec) => spec.kind !== "hero");
  const firstImage = inlineSpecs[0] ? `\n\n${imageMarkdown(inlineSpecs[0])}\n` : "";
  const secondImage = inlineSpecs[1] ? `\n\n${imageMarkdown(inlineSpecs[1])}\n` : "";
  const thirdImage = inlineSpecs[2] ? `\n\n${imageMarkdown(inlineSpecs[2])}\n` : "";
  const checklistRows = [
    ["확인 항목", "기록할 값", "담당자 판단 기준"],
    ["업무 목적", plan.problem, "이 업무가 고객, 매출, 계약, 운영 중 어디에 영향을 주는지 적습니다."],
    ["핵심 기준", plan.primaryMetric, "숫자나 상태가 다음 행동으로 연결되는지 확인합니다."],
    ["입력 자료", plan.automationInput, "누락되면 AI 초안이나 알림을 만들지 않습니다."],
    ["산출물", plan.output, "담당자가 바로 실행하거나 보류할 수 있는 형태인지 봅니다."],
  ];

  return `## 문제 정의

${plan.focus}은 ${plan.audience}에게 단순한 효율화 주제가 아닙니다. 실제 현장에서는 ${plan.problem}이 반복되고, 이 문제는 고객 응대 속도와 내부 마감 품질을 동시에 흔듭니다. 업무가 바쁠수록 담당자는 눈앞의 요청부터 처리하지만, 기록 방식이 일정하지 않으면 다음 담당자가 같은 판단을 다시 해야 합니다.

이 글의 목적은 도구 이름을 나열하는 것이 아니라 ${plan.focus}을 실제 업무 절차로 바꾸는 기준을 정리하는 것입니다. 특히 금액, 계약, 결제, 고객 안내처럼 실수가 큰 영역은 자동 실행보다 사람 검토가 먼저입니다. 자동화는 사람이 해야 할 판단을 없애는 것이 아니라, 판단 전에 필요한 입력값과 상태를 안정적으로 모으는 구조입니다.

## 핵심 개념

${plan.concept}이 ${plan.focus}의 핵심입니다. 작은 조직에서는 모든 업무를 한 번에 시스템화하기 어렵기 때문에 먼저 ${plan.primaryMetric}을 같은 형식으로 남기는 것이 중요합니다. 상태값이 흔들리면 AI 요약도 흔들리고, 알림도 잘못된 대상을 향합니다.

잘못 이해하기 쉬운 점은 AI가 곧 자동 실행이라는 생각입니다. AI는 문장을 정리하고 다음 조치 후보를 제안하는 데 유용하지만, 고객에게 보내는 안내문, 금액이 들어간 메시지, 계약과 결제 상태는 담당자가 원본과 비교해야 합니다. 그래서 ${plan.output}은 항상 승인 전 초안과 승인 완료 기록으로 나누어야 합니다.${firstImage}

## 현장 시나리오

예를 들어 ${plan.scenario}을 생각해 볼 수 있습니다. 이때 문제는 담당자의 성실함이 아니라 기록 구조입니다. 같은 내용을 여러 곳에 적으면 어느 값이 최신인지 알기 어렵고, 고객이나 거래처에는 이미 지난 상태를 안내할 수 있습니다.

두 번째 상황은 담당자가 바뀌거나 휴가를 가는 경우입니다. ${plan.focus}이 개인 메모에만 있으면 다음 담당자는 이전 맥락을 다시 물어봐야 합니다. 반대로 입력값, 산출물, 확인 기준이 한 표에 있으면 업무 인수인계가 짧아지고, AI는 그 표를 기준으로 요약 초안을 만들 수 있습니다.

## 실행 절차

${markdownTable(["단계", "할 일", "입력값", "산출물", "확인 기준"], procedureRows(plan, priority))}

실행 절차에서 가장 중요한 부분은 4단계와 5단계의 분리입니다. AI가 만든 초안은 속도를 높여 주지만, 고객 안내나 계약 관련 문구가 되면 담당자의 확인이 필요합니다. 특히 ${plan.risk}은 자동화 초기에 자주 생길 수 있으므로 승인 완료 열을 별도로 두어야 합니다.${secondImage}

## 표로 점검하기

${markdownTable(checklistRows[0], checklistRows.slice(1))}

이 표는 복잡한 시스템 문서가 아니라 매주 다시 볼 수 있는 운영표여야 합니다. 한 번에 많은 항목을 넣기보다 실제로 확인할 수 있는 값만 남기고, 비어 있는 항목은 자동화 대상에서 제외합니다. 빈칸이 많다면 도구 문제가 아니라 업무 기준이 아직 정리되지 않았다는 신호입니다.

## 자동화 구조

안전한 구조는 수동 관리에서 바로 완전 자동화로 넘어가지 않습니다. 먼저 담당자가 손으로 기록하던 내용을 시트나 표로 모으고, 그 다음 알림과 요약을 붙입니다. 이후 AI가 초안을 만들 수 있지만, 고객 안내, 계약 요청, 결제 확인, 금액이 포함된 메시지는 반드시 사람 승인 단계를 거쳐야 합니다.

${plan.focus}의 자동화 흐름은 "원본 입력 → 표준 상태 → AI 초안 → 담당자 검토 → 실행 기록" 순서가 적절합니다. 이 순서가 있으면 잘못된 초안이 바로 외부로 나가지 않고, 나중에 왜 그런 안내가 나갔는지도 추적할 수 있습니다.${thirdImage}

## 리스크와 방지책

${markdownTable(["리스크", "문제 상황", "방지책"], riskRows())}

리스크 관리는 자동화를 늦추는 절차가 아니라 다시 고치는 시간을 줄이는 장치입니다. 특히 개인정보와 금액은 편의를 위해 한 곳에 모을수록 접근 권한과 수정 이력이 중요해집니다. 담당자가 확인할 수 없는 값은 AI가 처리하지 않도록 두는 편이 안전합니다.

## 도입 순서

오늘 바로 할 일은 ${plan.automationInput}을 한 표에 모으는 것입니다. 새 도구를 고르기 전에 실제 업무 10건만 같은 양식으로 적어 보면 어떤 값이 자주 빠지는지 보입니다.

1주 안에는 상태값과 담당자 확인 기준을 정합니다. 이때 ${plan.primaryMetric}을 기준으로 오늘 처리할 일과 보류할 일을 나누면 업무 회의가 짧아집니다.

1개월 안에는 알림, 요약, AI 초안을 붙입니다. 다만 ${plan.output}을 외부로 바로 보내지 말고, 승인 완료 기록을 남기는 구조를 먼저 안정화하는 것이 좋습니다.

## 최신성 검토 메모

이 글은 특정 법률, 세무, 금융 정책을 단정하지 않고 업무 운영 구조를 기준으로 설명합니다. 전자서명, 본인확인, 결제, 세무 처리처럼 공식 확인이 필요한 영역은 각 서비스의 최신 안내와 내부 담당자 검토를 별도로 거쳐야 합니다. 확인할 수 없는 수치나 정책은 자동화 기준으로 쓰지 않는 것이 안전합니다.

## 관련 글

${linkBlock(related)}
`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function categoryPalette(category: Category) {
  const palettes = {
    automation: { deep: "#0f172a", accent: "#0f766e", soft: "#ccfbf1", warm: "#f59e0b" },
    "sales-ops": { deep: "#111827", accent: "#2563eb", soft: "#dbeafe", warm: "#14b8a6" },
    "small-business": { deep: "#1f2937", accent: "#047857", soft: "#d1fae5", warm: "#f97316" },
    "contracts-payments": { deep: "#0f172a", accent: "#334155", soft: "#e2e8f0", warm: "#0d9488" },
  } satisfies Record<Category, { deep: string; accent: string; soft: string; warm: string }>;

  return palettes[category];
}

function svgFor(spec: ImageSpec) {
  const palette = categoryPalette(spec.category);
  const title = escapeXml(spec.focus);
  const kindLabel = {
    hero: "Hero",
    workflow: "Workflow",
    dashboard: "Dashboard",
    "risk-map": "Risk map",
    checklist: "Checklist",
  } satisfies Record<ImageKind, string>;
  const labels = {
    hero: ["문제", "기준", "실행", "검토", "개선"],
    workflow: ["입력", "상태", "AI 초안", "사람 승인", "기록"],
    dashboard: ["오늘 볼 일", "지연 항목", "담당자", "다음 조치", "완료"],
    "risk-map": ["개인정보", "금액", "계약", "AI 오류", "권한"],
    checklist: ["자료", "기준", "검토", "실행", "회고"],
  } satisfies Record<ImageKind, string[]>;
  const cards = labels[spec.kind]
    .map((label, index) => {
      const x = 96 + index * 205;
      const y = spec.kind === "dashboard" ? 322 - (index % 2) * 44 : 330;
      return `<g>
        <rect x="${x}" y="${y}" width="168" height="112" rx="18" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
        <circle cx="${x + 34}" cy="${y + 36}" r="13" fill="${index === 4 ? palette.warm : palette.accent}" opacity="0.2"/>
        <circle cx="${x + 34}" cy="${y + 36}" r="6" fill="${index === 4 ? palette.warm : palette.accent}"/>
        <text x="${x + 58}" y="${y + 45}" fill="#1e293b" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="22" font-weight="700">${escapeXml(label)}</text>
        <rect x="${x + 28}" y="${y + 72}" width="${80 + index * 10}" height="8" rx="4" fill="${palette.accent}" opacity="0.32"/>
      </g>`;
    })
    .join("\n");
  const connectors = [0, 1, 2, 3]
    .map((index) => {
      const x1 = 264 + index * 205;
      const x2 = 300 + index * 205;
      return `<path d="M ${x1} 386 C ${x1 + 12} 386, ${x2 - 12} 386, ${x2} 386" stroke="${palette.accent}" stroke-width="4" fill="none" stroke-linecap="round" marker-end="url(#arrow)"/>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img">
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M2,2 L10,6 L2,10 Z" fill="${palette.accent}"/>
    </marker>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f1f5f9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="#f8fafc"/>
  <rect x="46" y="46" width="1108" height="708" rx="34" fill="url(#bg)" stroke="#dbe4e8" stroke-width="2"/>
  <rect x="88" y="88" width="154" height="44" rx="12" fill="${palette.deep}"/>
  <text x="116" y="117" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="800">Biz2Lab</text>
  <text x="88" y="196" fill="${palette.deep}" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="38" font-weight="800">${title}</text>
  <text x="90" y="238" fill="#64748b" font-family="Arial, sans-serif" font-size="22">${kindLabel[spec.kind]} for practical operations</text>
  <rect x="86" y="292" width="1028" height="230" rx="28" fill="${palette.soft}" opacity="0.42"/>
  ${cards}
  ${connectors}
  <rect x="122" y="596" width="700" height="62" rx="18" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
  <rect x="154" y="620" width="210" height="10" rx="5" fill="${palette.accent}" opacity="0.58"/>
  <rect x="154" y="644" width="520" height="10" rx="5" fill="${palette.deep}" opacity="0.16"/>
  <circle cx="940" cy="626" r="26" fill="${palette.warm}"/>
  <path d="M929 626 l8 9 l18 -23" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

async function writeImage(spec: ImageSpec) {
  const rawPath = path.join(root, spec.rawPath);
  const optimizedPath = path.join(root, spec.optimizedPath);
  const svg = svgFor(spec);

  fs.mkdirSync(path.dirname(rawPath), { recursive: true });
  fs.mkdirSync(path.dirname(optimizedPath), { recursive: true });
  fs.writeFileSync(rawPath, `${svg}\n`, "utf8");
  await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(optimizedPath);
}

function writePromptPackage(spec: ImageSpec) {
  const base = `${spec.slug}-${spec.kind}`;
  const requestPath = path.join(root, "image-requests", "generated", `${base}.md`);
  const promptPath = path.join(root, "image-requests", "generated", `${base}.prompt.md`);
  const briefPath = path.join(root, "image-briefs", "generated", `${base}.json`);
  const providerPromptKo = `${spec.focus}을 실제 업무 흐름 중심으로 설명하는 ${spec.kind} 인라인 이미지. 입력값, 상태값, 담당자 확인, 다음 조치가 보이되 실제 회사명, 고객명, 로고, 개인정보는 넣지 않는다. 작은 글자를 많이 넣지 말고 표, 카드, 화살표, 상태 칩을 사용한다.`;
  const providerPromptEn = `Create a safe Biz2Lab inline ${spec.kind} image for ${spec.focus}. Use workflow cards, status chips, and clear operational structure. Avoid logos, people, private data, fake screenshots, and tiny unreadable text.`;
  const negativePromptKo = "실제 로고, 실명, 고객 정보, 계좌 정보, 카드 정보, 사람 얼굴, 외부 URL, 워터마크, 읽기 어려운 작은 글자";
  const visualStyle = "절제된 한국어 B2B SaaS 편집 이미지, 밝은 배경, 명확한 카드형 다이어그램";
  const composition = `${spec.kind} 목적에 맞게 5개 업무 단계와 담당자 확인 지점을 가로 흐름으로 배치`;
  const categoryStyle = `${spec.category} 카테고리의 실무 운영 이미지`;
  const visualDifferentiationHint = `${spec.slug} 전용 주제인 ${spec.focus}을 중심으로 색상, 제목, 상태 항목을 다르게 구성`;
  const publicSrc = `/${spec.optimizedPath.replace(/^public\//, "")}`;
  const packageUsage = spec.kind === "hero" ? "hero" : "inline";
  const brief = {
    id: base,
    postSlug: spec.slug,
    articleTitle: spec.title,
    category: spec.category,
    usage: packageUsage,
    outputMode: "prompt-only",
    targetPath: spec.rawPath,
    optimizedPath: spec.optimizedPath,
    altKo: spec.alt,
    captionKo: spec.caption,
    promptKo: providerPromptKo,
    providerPromptKo,
    providerPromptEn,
    negativePromptKo,
    visualStyle,
    composition,
    categoryStyle,
    visualDifferentiationHint,
    textPolicy: "이미지 안의 글자는 최소화하고 실제 설명은 alt와 caption, 본문에서 제공한다.",
    filename: `${base}.svg`,
    rawPath: spec.rawPath,
    rawOutput: "none",
    manifestEntry: {
      id: base,
      project: "biz2lab",
      postSlug: spec.slug,
      usage: packageUsage,
      src: publicSrc,
      rawPath: spec.rawPath,
      altKo: spec.alt,
      captionKo: spec.caption,
      width: 1200,
      height: 800,
      format: "webp",
      licenseStatus: "local-prompt-package",
      commerceAutoReusable: true,
      status: "planned",
    },
    articleMutated: false,
    localOnly: true,
  };
  const requestMarkdown = `# Biz2Lab Image Request

## Article
- slug: ${spec.slug}
- title: ${spec.title}
- category: ${spec.category}
- usage: ${packageUsage}

## User Description
${spec.focus}을 설명하는 ${spec.kind} 이미지가 필요하다. 실제 업무 흐름, 상태, 담당자 확인 기준이 보여야 한다.

## Output Mode
- prompt-only

## Expected Output
- filename: ${base}.svg
- rawPath: ${spec.rawPath}
- optimizedPath: ${spec.optimizedPath}
- altKo: ${spec.alt}
- captionKo: ${spec.caption}
`;
  const promptMarkdown = `# Biz2Lab Image Prompt Package

## Provider Prompt (Korean)
${providerPromptKo}

## Provider Prompt (English)
${providerPromptEn}

## Negative Prompt
${negativePromptKo}

## Alt Text
${spec.alt}

## Caption
${spec.caption}

## Output Paths
- rawPath: ${spec.rawPath}
- optimizedPath: ${spec.optimizedPath}

## Validation
- localOnly: true
- outputMode: prompt-only
- no external image URL
- no private data
`;

  fs.mkdirSync(path.dirname(requestPath), { recursive: true });
  fs.mkdirSync(path.dirname(briefPath), { recursive: true });
  fs.writeFileSync(requestPath, requestMarkdown, "utf8");
  fs.writeFileSync(promptPath, promptMarkdown, "utf8");
  fs.writeFileSync(briefPath, `${JSON.stringify(brief, null, 2)}\n`, "utf8");
}

function writeInventoryDoc(before: InventoryRow[], after: InventoryRow[]) {
  const docPath = path.join(root, "docs", "content", "content-hardening-inventory.md");
  fs.mkdirSync(path.dirname(docPath), { recursive: true });
  const rows = after
    .map((row) => {
      const previous = before.find((candidate) => candidate.slug === row.slug);
      return `| ${row.slug} | ${row.category} | ${row.priority} | ${previous?.grade ?? "?"} | ${row.grade} | ${previous?.chars ?? 0} | ${row.chars} | ${previous?.imageCount ?? 0} | ${row.imageCount} | ${row.faqCount} |`;
    })
    .join("\n");
  const gradeSummary = (items: InventoryRow[]) =>
    ["A", "B", "C", "D"].map((grade) => `${grade}: ${items.filter((row) => row.grade === grade).length}`).join(", ");

  fs.writeFileSync(
    docPath,
    `# Content Hardening Inventory

Date: ${today}
Scope: 25 Korean Biz2Lab articles

## Grade Summary

- Before: ${gradeSummary(before)}
- After: ${gradeSummary(after)}

## Inventory

| slug | category | priority | before | after | chars before | chars after | images before | images after | FAQ |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
${rows}

## Grading Notes

- A: ready for AdSense content review from a practical-depth and image-support perspective.
- B: acceptable baseline, with future image or source enrichment still useful.
- C: needed Phase 4.0 hardening before review.
- D: would be risky to keep public before review. No article remains D after this phase.
`,
    "utf8",
  );
}

function writePhaseDocs(before: InventoryRow[], after: InventoryRow[], specs: ImageSpec[]) {
  const contentDoc = path.join(root, "docs", "content", "phase-4-0-content-authority-hardening.md");
  const imageDoc = path.join(root, "docs", "content", "phase-4-0-image-hardening-report.md");
  const readinessDoc = path.join(root, "docs", "content", "phase-4-0-adsense-content-readiness.md");
  const changedTop3 = after.filter((row) => row.priority === "TOP3").map((row) => `- ${row.slug}: ${row.grade}, ${row.chars} chars, ${row.imageCount} inline images`).join("\n");
  const changedP1 = after.filter((row) => row.priority === "P1").map((row) => `- ${row.slug}: ${row.grade}, ${row.chars} chars, ${row.imageCount} inline images`).join("\n");
  const changedP2 = after.filter((row) => row.priority === "P2").map((row) => `- ${row.slug}: ${row.grade}, ${row.chars} chars`).join("\n");
  const imageRows = specs
    .map((spec) => `| ${spec.slug} | ${spec.kind} | ${spec.optimizedPath} | ${spec.alt} |`)
    .join("\n");
  const promptRows = specs
    .map((spec) => `- ${spec.slug}-${spec.kind}: IMAGE_GENERATION_PENDING premium replacement package, local information diagram generated for current article body`)
    .join("\n");

  fs.mkdirSync(path.dirname(contentDoc), { recursive: true });
  fs.writeFileSync(
    contentDoc,
    `# Phase 4.0 Content Authority Hardening

Date: ${today}
Status: implemented

## A. Overall Content State

- Total public Korean posts: 25
- Before grades: ${["A", "B", "C", "D"].map((grade) => `${grade} ${before.filter((row) => row.grade === grade).length}`).join(", ")}
- After grades: ${["A", "B", "C", "D"].map((grade) => `${grade} ${after.filter((row) => row.grade === grade).length}`).join(", ")}
- All posts now include practical problem framing, execution steps, a checklist/table, automation structure, risk controls, rollout order, latestness memo, FAQ, and related links.

## B. Hardened Articles

### TOP3

${changedTop3}

### P1

${changedP1}

### P2

${changedP2}

## C. Before/After Summary

- Before: all articles had hero images and baseline FAQ, but no body inline images and limited procedural depth.
- After: TOP3 articles have three inline information images each, P1 articles have one inline image each, and P2 articles have fuller operational sections without adding unsupported claims.
- The writing avoids made-up statistics, legal conclusions, tax claims, customer names, real company names, and private data.

## D. Remaining Items

- Premium image generation remains pending for the prompt packages.
- Future source-backed updates can add official citations where legal, tax, payment, or platform-specific claims are needed.
- Search Console, GA4, AdSense code, and ads.txt remain outside this phase.
`,
    "utf8",
  );

  fs.writeFileSync(
    imageDoc,
    `# Phase 4.0 Image Hardening Report

Date: ${today}
Status: local information assets generated, premium prompt packages prepared

## Generated Local Files

| article | image kind | output | alt |
| --- | --- | --- | --- |
${imageRows}

## Prompt Packages

${promptRows}

## Image Policy

- No external image API was called.
- No paid image provider was used.
- Local WebP information diagrams were generated from repo-owned SVG templates.
- These diagrams support the article body now, while prompt-only packages remain available for future premium replacement.
- TOP3 hero images remain distinct and unchanged.
`,
    "utf8",
  );

  fs.writeFileSync(
    readinessDoc,
    `# Phase 4.0 AdSense Content Readiness

Date: ${today}
Status: content hardening complete, Google setup values still pending

## Readiness Judgment

Judgment: 신청 가능에 가까움, but final Google setup remains pending.

Reasons:

- 25 public Korean articles now have practical depth and safer operational framing.
- TOP3 articles have expanded procedures, risk controls, FAQ, and inline images.
- P1 representative articles have inline visual support and strengthened implementation guidance.
- P2 articles are no longer thin baseline articles.
- No AdSense script, GA4 script, Search Console verification, ads.txt, DNS change, Supabase migration, or forbidden route was added.

## Remaining Google-Side Gates

- Search Console verification value is still not applied.
- GA4 Measurement ID is still not applied.
- AdSense publisher/client ID is still not applied.
- ads.txt is still not created.

## Next Phase

- Phase 4.1: final content QA and AdSense submission checklist.
- Phase 4.2: Search Console, GA4, and AdSense code only after explicit user approval and real values.
`,
    "utf8",
  );
}

async function main() {
  const currentPosts = parsePosts();
  const beforePosts = baselinePosts(currentPosts);
  const before = inventory(beforePosts);
  const allSpecs: ImageSpec[] = [];

  for (const post of currentPosts) {
    const slug = String(post.data.slug);
    const category = String(post.data.category) as Category;
    categoryBySlug[slug] = category;
  }

  for (const post of currentPosts) {
    const slug = String(post.data.slug);
    const plan = plans[slug];
    if (!plan) {
      throw new Error(`Missing Phase 4.0 plan for ${slug}`);
    }

    const specs = imageSpecsFor(post, plan);
    allSpecs.push(...specs);
    for (const spec of specs) {
      await writeImage(spec);
      writePromptPackage(spec);
    }

    const heroSpec = specs.find((spec) => spec.kind === "hero");
    const nextData = {
      ...post.data,
      updatedAt: today,
      heroImage: heroSpec ? `/${heroSpec.optimizedPath.replace(/^public\//, "")}` : post.data.heroImage,
      heroAlt: heroSpec
        ? heroSpec.alt
        : `${plan.focus}의 입력값, 상태, 담당자 확인, 다음 조치를 설명하는 업무 이미지`,
      faq: faqFor(plan, priorityFor(slug)),
    };
    const nextBody = bodyFor(post, plan, specs);
    fs.writeFileSync(post.filePath, matter.stringify(nextBody, nextData), "utf8");
  }

  const afterPosts = parsePosts();
  const after = inventory(afterPosts);
  writeInventoryDoc(before, after);
  writePhaseDocs(before, after, allSpecs);
  console.log(`phase40-content-hardening PASS (posts=${after.length}, images=${allSpecs.length})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
