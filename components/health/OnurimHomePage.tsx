import Link from "next/link";

import { homeUpdatedAt } from "@/lib/health-v3/entry-pages";

export default function OnurimHomePage() {
  return (
    <div className="onurim-home onurim-start">
      <section className="onurim-start-hero">
        <div>
          <h1>건강정보를 이해하고,<br />진료 질문을 준비하세요</h1>
          <p>오누림은 질환 설명, 검사표 읽기와 가족의 진료 준비를 돕는 일반 건강교육 안내서입니다. 개인의 진단이나 처방을 대신하지 않습니다.</p>
          <Link href="/health/trust/about">오누림이 제공하는 정보와 한계</Link>
        </div>
        <nav className="onurim-start-chooser" aria-labelledby="start-choice-title">
          <h2 id="start-choice-title">지금 필요한 안내는 무엇인가요?</h2>
          <ul>
            <li><Link href="/health">질환 이름을 알아보고 싶어요<span>20개 질환에서 찾기</span></Link></li>
            <li><Link href="/health/guides/reading-health-results">검사표의 숫자와 용어가 낯설어요<span>결과지를 읽을 때 확인할 항목</span></Link></li>
            <li><Link href="/health/guides/appointment-questions">진료에서 무엇을 물을지 정리하고 싶어요<span>질문을 추리고 가져갈 자료 준비하기</span></Link></li>
            <li><Link href="/health/guides/family-medication-support">가족의 약을 함께 확인하고 싶어요<span>대신 결정하지 않고 돕는 방법</span></Link></li>
          </ul>
        </nav>
      </section>

      <section className="onurim-start-urgent" aria-labelledby="start-urgent-title">
        <h2 id="start-urgent-title">지금 위급하다면 글보다 119가 먼저입니다</h2>
        <p>의식 저하나 심한 호흡곤란 같은 위급한 변화가 있으면 즉시 119에 연락합니다. 글을 더 읽거나 기록을 완성하며 기다리지 마세요. 이 예시만으로 모든 응급상황을 판단할 수는 없습니다.</p>
        <Link href="/health/guides/danger-signals">평소에 알아둘 위험 신호와 신고 후 안내</Link>
        <p className="onurim-start-source">근거: <a href="https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/">소방청 119 구급신고 요령</a>, <a href="https://medlineplus.gov/ency/article/001927.htm">MedlinePlus 응급상황 안내</a></p>
      </section>

      <section className="onurim-start-section" aria-labelledby="start-conditions-title">
        <h2 id="start-conditions-title">알아보려는 질환이 있나요?</h2>
        <p>아래는 분야별 출발점입니다. 증상으로 병을 골라 진단하는 목록이 아닙니다.</p>
        <div className="onurim-start-categories">
          <div><h3>혈압·혈당·대사</h3><ul>
            <li><Link href="/health/hypertension">고혈압: 측정 조건과 혈압 기록</Link></li>
            <li><Link href="/health/type-2-diabetes">제2형 당뇨병: 검사와 진료 질문</Link></li>
            <li><Link href="/health/dyslipidemia">이상지질혈증: 지질검사표 읽기</Link></li>
          </ul></div>
          <div><h3>호흡·소화</h3><ul>
            <li><Link href="/health/allergic-rhinitis">알레르기 비염: 증상과 환경 관찰</Link></li>
            <li><Link href="/health/asthma">천식: 진료에서 확인할 것</Link></li>
            <li><Link href="/health/gastroesophageal-reflux-disease">역류성 식도염: 불편한 시간 기록</Link></li>
          </ul></div>
          <div><h3>뼈·관절</h3><ul>
            <li><Link href="/health/osteoarthritis">골관절염: 일상 동작의 변화</Link></li>
            <li><Link href="/health/osteoporosis">골다공증: 골밀도검사 질문</Link></li>
            <li><Link href="/health/gout">통풍: 관절 증상과 요산검사</Link></li>
          </ul></div>
        </div>
        <Link className="onurim-start-main-link" href="/health">뇌·마음 건강 등을 포함한 20개 질환 전체 보기</Link>
      </section>

      <section className="onurim-start-section onurim-start-reading" aria-labelledby="start-results-title">
        <div>
          <h2 id="start-results-title">검사표에서 생긴 질문</h2>
          <p>HbA1c 뜻이나 NGSP 표기가 궁금한가요? 당화혈색소 안내에서 검사표의 이름·단위와 공복혈당과의 차이를 함께 살펴보세요.</p>
          <ul>
            <li><Link href="/health/guides/understanding-hba1c">HbA1c 뜻·NGSP와 검사표 읽기</Link></li>
            <li><Link href="/health/guides/measuring-blood-pressure">집에서 혈압을 잴 때의 준비와 기록</Link></li>
          </ul>
          <p>결과 하나로 병을 확정하거나 약을 바꾸기 위한 안내는 아닙니다.</p>
        </div>
        <div>
          <h2>가족과 진료를 준비할 때</h2>
          <p>당사자의 이야기를 먼저 듣고, 함께 확인할 자료와 질문을 정리하세요. 기록표는 진료 준비를 돕는 자료이지 건강 판정표가 아닙니다.</p>
          <ul>
            <li><Link href="/health/guides/older-parent-health-organizer">부모님이 동의한 범위에서 진료 자료 정리하기</Link></li>
            <li><Link href="/health/guides/medication-list">복용 중인 약과 확인할 질문 적기</Link></li>
            <li><Link href="/health#tools">인쇄해서 작성할 건강 기록표와 질문 카드 찾기</Link></li>
          </ul>
        </div>
      </section>

      <section className="onurim-start-section onurim-start-trust" aria-labelledby="start-trust-title">
        <h2 id="start-trust-title">누가 쓰고, 어디까지 확인했나요?</h2>
        <p><Link href="/health/trust/author">박영훈 비의료인 건강정보 편집자</Link>가 작성합니다. <Link href="/health/trust/sources-policy">출처 대조</Link>와 의료인의 임상 검수는 다릅니다. 현재 의료인 검수는 미완료입니다.</p>
        <ul>
          <li><Link href="/health/trust/medical-review-policy">의료 검토의 현재 상태</Link></li>
          <li><Link href="/health/trust/editorial-policy">글을 만들고 고치는 원칙</Link></li>
          <li><Link href="/health/trust/ai-disclosure">AI 활용 공개와 실제 독자 테스트 상태</Link></li>
        </ul>
        <p>정정용 공개 게시판의 새 글 접수 가능 여부는 확인되지 않았습니다. <Link href="/health/trust/corrections-policy">정정 원칙과 현재 연락 경로</Link>를 확인하세요. 공개 공간에 검사 결과나 처방전 등 개인정보를 올리지 마세요.</p>
        <p className="onurim-start-date">홈 안내 수정 <time dateTime={homeUpdatedAt}>{homeUpdatedAt}</time>. 의료 검수일이 아닙니다.</p>
      </section>
    </div>
  );
}
