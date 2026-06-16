import { createImageRequestPackage } from "@/scripts/create-image-request";
import { runBiz2LabImageSkill } from "@/scripts/run-biz2lab-image-skill";
import type { ImageBriefCategory } from "@/lib/image-generation/types";
import type { Biz2LabImageUsage } from "@/lib/image-generation/prompt-builder";

type PackageSpec = {
  slug: string;
  usage: Biz2LabImageUsage;
  description: string;
  title?: string;
  category?: ImageBriefCategory;
  targetFeeling?: string;
  mustInclude?: string[];
  mustAvoid?: string[];
};

const commonAvoid = ["실제 로고", "사람 얼굴", "제품 사진", "실제 개인정보", "실제 서비스 화면", "외부 이미지 URL"];

const heroSpecs: PackageSpec[] = [
  {
    slug: "accounts-receivable-tracker",
    usage: "hero",
    description: "거래처별 미수금, 청구일, 약속일, 후속 조치 상태가 한눈에 정렬된 영업 운영 보드형 대표 이미지",
    mustInclude: ["미수금 상태 열", "약속일 타임라인", "후속 조치 우선순위"],
  },
  {
    slug: "ai-business-automation-guide",
    usage: "hero",
    description: "반복 업무, 판단 업무, 기록 업무가 AI 자동화 후보로 분류되고 작은 자동화부터 시작되는 흐름을 보여주는 대표 이미지",
    mustInclude: ["업무 분류", "자동화 후보", "사람 검토 단계"],
  },
  {
    slug: "ai-knowledge-store-for-small-business",
    usage: "hero",
    description: "자주 묻는 질문, 고객 요청, 운영 기준이 내부 지식창고로 모이고 AI 점장이 참고하는 구조를 보여주는 대표 이미지",
    mustInclude: ["지식창고", "고객 요청", "운영 기준"],
  },
  {
    slug: "automation-priority-method",
    usage: "hero",
    description: "반복 빈도, 소요 시간, 실패 비용, 검토 가능성 기준으로 자동화 우선순위를 매기는 평가 매트릭스형 대표 이미지",
    mustInclude: ["우선순위 매트릭스", "평가 기준", "검토 가능성"],
  },
  {
    slug: "chatgpt-document-cleanup",
    usage: "hero",
    description: "회의 메모와 고객 요청이 입력 형식, 검토 기준, 보관 위치로 정리되는 문서 정리 워크플로 대표 이미지",
    mustInclude: ["문서 입력", "검토 기준", "보관 흐름"],
  },
  {
    slug: "connect-contract-payment-customer-management",
    usage: "hero",
    description: "계약서 작성, 전자서명, 결제 요청, 거래처 후속 조치가 끊기지 않고 이어지는 운영 흐름 대표 이미지",
    mustInclude: ["계약 상태", "결제 요청", "거래처 후속 조치"],
  },
  {
    slug: "customer-memory-system",
    usage: "hero",
    description: "고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지",
    mustInclude: ["고객 메모", "응대 이력", "재방문 단서"],
  },
  {
    slug: "daily-numbers-for-small-business",
    usage: "hero",
    description: "매출, 주문 수, 객단가, 재방문, 미처리 업무를 매일 같은 기준으로 확인하는 운영 체크 보드 대표 이미지",
    mustInclude: ["5가지 숫자", "일일 체크", "미처리 업무"],
  },
  {
    slug: "daily-sales-goal-breakdown",
    usage: "hero",
    description: "월 매출 목표가 일일 목표, 객단가, 전환율, 후속 조치 수로 나뉘는 계산 흐름 대표 이미지",
    mustInclude: ["월 목표", "일일 목표", "전환율"],
  },
  {
    slug: "daily-sales-report",
    usage: "hero",
    description: "목표 대비 실적, 상담, 견적, 미수금, 다음 행동이 짧은 일일 보고 흐름으로 정리되는 대표 이미지",
    mustInclude: ["일일 보고", "다음 행동", "목표 대비 실적"],
  },
  {
    slug: "e-signature-identity-check",
    usage: "hero",
    description: "전자서명, 본인확인, 인증 기록의 역할 차이를 세 개의 보안 모듈로 구분해 보여주는 대표 이미지",
    mustInclude: ["전자서명", "본인확인", "인증 기록"],
  },
  {
    slug: "electronic-contract-system-basics",
    usage: "hero",
    description: "서명 요청, 본인 확인, 상태 추적, 보관, 결제 연결을 전자계약 기본 기능 흐름으로 보여주는 대표 이미지",
    mustInclude: ["서명 요청", "상태 추적", "보관"],
  },
  {
    slug: "google-sheets-ai-automation",
    usage: "hero",
    description: "구글시트의 표준화된 업무 상태가 AI 요약, 분류, 보고서 초안으로 연결되는 자동화 구조 대표 이미지",
    mustInclude: ["표준화된 표", "AI 요약", "보고서 초안"],
  },
  {
    slug: "manage-unsigned-contracts",
    usage: "hero",
    description: "미작성 사유, 마지막 연락일, 다음 조치일로 서명이 멈춘 거래처를 추적하는 계약 관리 레인 대표 이미지",
    mustInclude: ["미작성 사유", "마지막 연락일", "다음 조치일"],
  },
  {
    slug: "obsidian-business-knowledge-base",
    usage: "hero",
    description: "회의 기록, 고객 응대 기준, 업무 매뉴얼이 연결형 지식 노드로 묶이는 회사 업무 지식창고 대표 이미지",
    mustInclude: ["연결형 지식 노드", "업무 매뉴얼", "고객 응대 기준"],
  },
  {
    slug: "offline-card-payment-pg-van",
    usage: "hero",
    description: "카드 키인 결제, PG, VAN, 정산 상태의 역할 차이를 운영표 흐름으로 정리하는 대표 이미지",
    mustInclude: ["카드 키인", "PG/VAN", "정산 상태"],
  },
  {
    slug: "payment-reminder-message",
    usage: "hero",
    description: "입금 확인 요청을 일정 확인 중심의 부드러운 거래처 메시지 흐름으로 바꾸는 커뮤니케이션 대표 이미지",
    mustInclude: ["일정 확인", "부드러운 문장", "입금 상태"],
  },
  {
    slug: "pre-automation-task-list",
    usage: "hero",
    description: "반복 업무, 예외 업무, 고객 영향 업무, 데이터 원본을 분리해 자동화 시작 범위를 정하는 체크리스트 대표 이미지",
    mustInclude: ["업무 목록", "예외 업무", "데이터 원본"],
  },
  {
    slug: "reduce-repetitive-work-with-ai",
    usage: "hero",
    description: "반복 업무 목록화, 입력 표준화, AI 초안, 사람 검토, 실행 기록의 5단계를 보여주는 대표 이미지",
    mustInclude: ["5단계 흐름", "입력 표준화", "사람 검토"],
  },
  {
    slug: "reservation-order-review-management",
    usage: "hero",
    description: "예약, 주문, 고객 리뷰 응대를 같은 운영표에서 상태와 다음 행동으로 관리하는 매장 운영 대표 이미지",
    mustInclude: ["예약 상태", "주문 흐름", "리뷰 대응"],
  },
  {
    slug: "sales-achievement-rate",
    usage: "hero",
    description: "매출 달성률, 부족분, 필요한 상담 수가 영업 행동으로 이어지는 계산 패널형 대표 이미지",
    mustInclude: ["달성률", "부족분", "필요 상담 수"],
  },
  {
    slug: "sales-revenue-ar-structure",
    usage: "hero",
    description: "매출 목표, 실제 매출, 미수금, 계약 대기 상태를 한 흐름으로 비교하는 영업관리 구조 대표 이미지",
    mustInclude: ["매출 목표", "실제 매출", "계약 대기"],
  },
  {
    slug: "solo-business-systemization",
    usage: "hero",
    description: "1인 사업자의 주문, 상담, 정산, 고객 기록이 놓치지 않는 운영 시스템으로 정리되는 대표 이미지",
    mustInclude: ["주문", "상담", "정산", "고객 기록"],
  },
  {
    slug: "unify-order-channels",
    usage: "hero",
    description: "전화, 메시지, 플랫폼, 현장 주문이 하나의 식당 주문 상태 보드로 모이는 운영 구조 대표 이미지",
    mustInclude: ["전화 주문", "메시지 주문", "현장 주문"],
  },
  {
    slug: "unify-order-channels-for-sales",
    usage: "hero",
    description: "전화, 메시지, 이메일, 현장 요청으로 들어오는 거래처 주문을 한 기준으로 정리하는 영업 운영 대표 이미지",
    mustInclude: ["주문 채널", "거래처 요청", "후속 조치"],
  },
];

const inlineSpecs: PackageSpec[] = [
  {
    slug: "ai-business-automation-guide",
    usage: "inline",
    description: "반복 업무, 판단 업무, 기록 업무를 세 갈래로 나누고 자동화 후보와 사람 검토 단계를 설명하는 본문용 프로세스 다이어그램",
    mustInclude: ["업무 분류", "자동화 후보", "사람 검토"],
  },
  {
    slug: "google-sheets-ai-automation",
    usage: "inline",
    description: "구글시트 입력값이 표준화된 열, AI 요약 규칙, 검토용 표, 보고서 초안으로 이어지는 본문용 설명 다이어그램",
    mustInclude: ["스프레드시트", "AI 요약", "검토 표"],
  },
  {
    slug: "accounts-receivable-tracker",
    usage: "inline",
    description: "거래처, 청구일, 약속일, 후속 조치 상태를 미수금 관리표의 네 개 핵심 열로 설명하는 본문용 구조 다이어그램",
    mustInclude: ["거래처", "약속일", "후속 조치"],
  },
  {
    slug: "ai-knowledge-store-for-small-business",
    usage: "inline",
    description: "FAQ, 고객 요청, 운영 기준이 내부 자료함으로 모이고 AI 점장 답변 초안에 참고되는 본문용 지식 흐름 다이어그램",
    mustInclude: ["FAQ", "운영 기준", "답변 초안"],
  },
  {
    slug: "electronic-contract-system-basics",
    usage: "inline",
    description: "서명 요청, 본인 확인, 상태 추적, 보관, 결제 연결을 순서대로 보여주는 본문용 전자계약 기능 다이어그램",
    mustInclude: ["서명 요청", "본인 확인", "보관"],
  },
];

const hubSpecs: PackageSpec[] = [
  {
    slug: "automation",
    usage: "hub",
    category: "automation",
    title: "업무 자동화 허브",
    description: "AI 업무 자동화, 문서 정리, 스프레드시트 자동화, 지식창고 글을 하나의 학습 경로로 묶는 카테고리 허브 이미지",
    mustInclude: ["자동화 학습 경로", "문서와 표", "지식창고"],
  },
  {
    slug: "sales-ops",
    usage: "hub",
    category: "sales-ops",
    title: "영업 운영 허브",
    description: "매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지",
    mustInclude: ["매출 목표", "미수금", "일일 보고"],
  },
  {
    slug: "small-business",
    usage: "hub",
    category: "small-business",
    title: "소상공인 운영 허브",
    description: "주문, 예약, 고객 기억, 매일 보는 숫자, 1인 사업 시스템화를 한 화면에 묶는 카테고리 허브 이미지",
    mustInclude: ["주문", "예약", "고객 기록", "운영 숫자"],
  },
  {
    slug: "contracts-payments",
    usage: "hub",
    category: "contracts-payments",
    title: "계약 결제 허브",
    description: "전자계약, 본인 확인, 서명 상태, 결제 요청, 거래처 후속 조치를 신뢰 흐름으로 묶는 카테고리 허브 이미지",
    mustInclude: ["전자계약", "본인 확인", "결제 상태"],
  },
];

const allSpecs = [...heroSpecs, ...inlineSpecs, ...hubSpecs];

for (const spec of allSpecs) {
  const request = createImageRequestPackage({
    rootDir: process.cwd(),
    slug: spec.slug,
    usage: spec.usage,
    category: spec.category,
    title: spec.title,
    description: spec.description,
    targetFeeling: spec.targetFeeling ?? "차분하고 신뢰감 있는 프리미엄 Korean SaaS/editorial style",
    mustInclude: spec.mustInclude,
    mustAvoid: spec.mustAvoid ?? commonAvoid,
    mode: "prompt-only",
    force: true,
  });

  runBiz2LabImageSkill({
    rootDir: process.cwd(),
    requestPath: request.requestPath,
    mode: "prompt-only",
    force: true,
    apply: false,
  });
}

console.log(`image-prompts:generate PASS (${allSpecs.length} packages)`);
