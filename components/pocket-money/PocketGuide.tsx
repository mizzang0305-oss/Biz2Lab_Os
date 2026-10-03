import Image from "next/image";
import type {PocketGuide as Guide} from "@/lib/pocket-money/guide";
import {GuideResume} from "./GuideResume";
import styles from "./pocket-money.module.css";
export function PocketGuide({guide}:{guide:Guide}){
 if(guide.photos.length!==2)return <p>첫 안내를 확인하고 있어요.</p>;
 return <article className={styles.guide}>
 <a className={styles.backLink} href="/pocket-money" data-primary-target>← 가이드 목록</a>
 <p className={styles.eyebrow}>화면부터 차근차근 · 2단계</p><h1>{guide.title}</h1><p className={styles.lead}>{guide.description}</p>
 <section className={styles.conditions} id="conditions" aria-label="참여 조건">
 <h2>시작하기 전에 확인하세요</h2><dl>
 <div><dt>보상 구분</dt><dd>{guide.conditions.rewardKind==="points"?"포인트 · 현금 지급과 별개":guide.conditions.rewardKind==="cash"?"현금":guide.conditions.rewardKind==="coupon"?"쿠폰":"미확인"}</dd></div>
 <div><dt>가입 나이</dt><dd>{guide.conditions.age??"미확인"}</dd></div><div><dt>비용</dt><dd>{guide.conditions.cost??"미확인"}</dd></div>
 <div><dt>보호자 동의</dt><dd>{guide.conditions.consent??"미확인 · 공식 안내에서 확인"}</dd></div>
 <div><dt>지급 조건</dt><dd>{guide.conditions.payout??"미확인 · 적립과 지급을 보장하지 않음"}</dd></div>
 <div><dt>기준 기기</dt><dd>{guide.photos.every(p=>p.platform==="unknown")?"기준 기기 미확인":guide.photos.map(p=>p.platform).filter((p,i,a)=>a.indexOf(p)===i).join(" / ")}</dd></div>
 <div><dt>안내 범위</dt><dd>{guide.scope}</dd></div></dl>
 <p className={styles.small}>공식 가입 조건 확인: {guide.conditions.checkedAt??"미확인"} · <a href={guide.conditions.officialUrl??"https://www.cpoint.or.kr/netzero/"} rel="noreferrer">공식 안내</a></p></section>
 <GuideResume guide={guide}/><nav className={styles.stepNav} aria-label="가이드 단계">{guide.steps.map((s,i)=><a key={s.id} data-primary-target href={`#step-${s.id}`}>{i+1}. {s.title}</a>)}</nav>
 {guide.steps.map((step,i)=>{const photo=guide.photos.find(p=>p.imageId===step.photoId)!;return <section className={styles.step} key={step.id} id={`step-${step.id}`} data-guide-step={step.id}>
 <p className={styles.eyebrow}>STEP 0{i+1}</p><h2>{step.title}</h2><p className={styles.instruction}>{step.instruction}</p>
 <figure><Image unoptimized src={photo.image} width={photo.width} height={photo.height} alt={photo.altKo} className={styles.screen} sizes="(max-width: 600px) 100vw, 560px"/>
 <figcaption>제공된 실제 화면 · 사진{photo.inputNumber} · <a href={photo.sourceUrl} rel="noreferrer">공식 출처</a></figcaption></figure>
 <div className={styles.nextCheck}><h3>다음 화면에서 확인할 것</h3><p>{step.expectedScreen}</p></div><p className={styles.stopNotice}>{step.stopCondition}</p>
 {i===0?<a className={styles.primaryButton} href="#step-consent-register" data-primary-target>2단계 보기 →</a>:null}</section>;})}
 <section className={styles.result}><h2>완료 표시와 지급은 따로 확인해요</h2><p>{guide.resultNotice}</p><p>포인트 적립·현금 지급·별도 로그인 성공은 미확인입니다.</p>
 <a className={styles.secondaryButton} data-primary-target href="https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do" rel="noreferrer">공식 선언 안내 확인 ↗</a></section>
 <section className={styles.privacy}><h2>읽기 위치와 개인정보</h2><p>이 안내는 이름·나이·학년·참여 정보를 입력받지 않습니다. 같은 탭의 sessionStorage와 단계 링크로 읽기 위치만 기억합니다. 읽기 위치 지우기로 이 탭의 기록을 지울 수 있습니다.</p><p>로컬 미리보기에는 광고와 Google Analytics를 로딩하지 않습니다. 공식 사이트로 이동하면 해당 사이트의 정책이 적용됩니다.</p></section>
 </article>;
}

