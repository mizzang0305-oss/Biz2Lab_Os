import {createRoot} from "react-dom/client";
import {GuideResume} from "../../components/pocket-money/GuideResume";
import {firstGuideDraft} from "../../lib/pocket-money/first-guide";
import styles from "../../components/pocket-money/pocket-money.module.css";
// Test-only mounted reading controls; no service screens/images or published route.
createRoot(document.getElementById("root")!).render(<div className={styles.pocketChrome}><header className={styles.header}><div className={styles.headerInner}>읽기 위치 컴포넌트 검증 화면</div></header><main className={styles.guide}><GuideResume guide={firstGuideDraft}/>{firstGuideDraft.steps.map((step,i)=><section key={step.id} id={`step-${step.id}`} className={styles.step} style={{minHeight:900}} data-guide-step={step.id}><h2>{i+1}. {step.title}</h2><p>테스트용 본문 공간입니다. 실제 서비스 화면·사진을 재현하지 않습니다.</p><a href="https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do">공식 안내 확인</a><a href={`#step-${firstGuideDraft.steps[1].id}`}>2단계 링크</a></section>)}</main></div>);

