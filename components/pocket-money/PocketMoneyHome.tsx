"use client";
import {useState} from "react";
import Link from "next/link";
import {getPublishedPocketGuides} from "@/lib/pocket-money/guide";
import {pocketUpdatedAt} from "@/lib/pocket-money/seo";
import styles from "./pocket-money.module.css";
const audiences=["초등학생","중학생","고등학생","대학생"] as const;
export function PocketMoneyHome(){
 const [audience,setAudience]=useState<string|null>(null);const guides=getPublishedPocketGuides();
 return <div className={styles.home}>
 <section className={styles.hero}><div className={styles.heroTag}><span aria-hidden="true">✳</span> 작게 시작하는 똑똑한 선택</div>
 <p className={styles.eyebrow}>즐거운 용돈벌이</p><h1>용돈 벌기, 가입하기 전에 조건부터.</h1>
 <p className={styles.lead}>무엇을 누르고, 언제 멈춰야 할까요?<br/>확인한 화면과 공식 조건으로 차근차근 읽어요.</p>
 <a className={styles.primaryButton} href="#guides" data-primary-target>첫 가이드 살펴보기 <span aria-hidden="true">↗</span></a>
 <p className={styles.heroNote}>가입·지급 조건을 먼저 확인해요. 수익을 보장하지 않아요.</p>
 <div className={styles.heroStamp} aria-hidden="true">조건<br/><strong>먼저!</strong></div></section>
 <section className={styles.audience} aria-labelledby="audience-title"><div className={styles.sectionTitle}><p className={styles.eyebrow}>내 상황에서 시작하기</p><h2 id="audience-title">어떤 안내가 필요하세요?</h2></div>
 <div className={styles.audienceGrid}>{audiences.map((label,i)=><button key={label} type="button" data-primary-target aria-pressed={audience===label} onClick={()=>setAudience(label)}><span aria-hidden="true">{["✏","↗","✦","◎"][i]}</span>{label}</button>)}</div>
 <p className={styles.audienceNotice} data-testid="audience-notice" aria-live="polite">{audience==="초등학생"?"첫 서비스의 가입 나이는 만 14세 이상이에요. 나이가 맞지 않으면 가입을 진행하지 마세요.":audience?"학년만으로 참여할 수 있다고 판단하지 않아요. 공식 나이·동의 조건을 확인하세요.":"관심 있는 안내를 찾아보세요. 서비스 참여 가능 여부는 공식 나이 조건으로 따로 확인해요."}</p></section>
 <section className={styles.guideList} id="guides"><div className={styles.sectionTitle}><p className={styles.eyebrow}>첫 화면부터 차근차근</p><h2>처음이라면, 이 안내부터</h2></div>
 {guides.length?guides.map(guide=><a className={styles.guideCard} href={`/pocket-money/guides/${guide.slug}`} key={guide.id}><span className={styles.cardLabel}>화면 2장 · 포인트</span><h3>{guide.title}</h3><p>{guide.description}</p><span className={styles.cardLink}>조건부터 읽기 →</span></a>):<div className={styles.guideCard}><span className={styles.cardLabel}>첫 안내 준비 중</span><h3>기후시민 선언,<br/>등록 버튼은 어디에 있을까요?</h3><p>정보 입력을 마친 뒤의 두 화면을 확인하고 있어요. 안내가 준비되면 여기에서 읽을 수 있어요.</p><div className={styles.cardTags}><span>만 14세 이상 가입</span><span>포인트 ≠ 현금 지급</span></div></div>}</section>
 <section className={styles.principles} id="conditions"><p className={styles.eyebrow}>우리의 안내 기준</p><h2>알고 시작하고,<br/>안 맞으면 멈춰요.</h2><ol><li><span>01</span><div><h3>공식 조건부터</h3><p>나이·비용·동의 조건을 먼저 읽어요.</p></div></li><li><span>02</span><div><h3>확인한 화면만</h3><p>보지 못한 단계나 지급 결과는 만들지 않아요.</p></div></li><li><span>03</span><div><h3>입력은 해당 서비스에서</h3><p>여기서는 개인정보와 계정 정보를 입력받지 않아요.</p></div></li></ol></section>
 <section className={styles.healthCard}><span className={styles.healthIcon} aria-hidden="true">+</span><div><p className={styles.eyebrow}>건강 정보는 오누림에서</p><h2>기존 건강 안내를<br/>계속 읽을 수 있어요.</h2><p>질환·건강 글 39편과 출처를 그대로 만나보세요.</p><Link href="/health" data-primary-target className={styles.healthLink}>오누림 건강 정보 보기 →</Link></div></section>
 <footer className={styles.contentFooter}><p>즐거운 용돈벌이 · 조건을 확인하는 정보 안내</p><p>이 로컬 미리보기에는 광고와 분석 전송이 없습니다.</p><p>안내 기준 <time dateTime={pocketUpdatedAt}>{pocketUpdatedAt}</time></p></footer>
 </div>;
}
