"use client";
import {useState} from "react";
import {filterOpportunities, opportunityCategories, type OpportunityCategory} from "@/lib/pocket-money/opportunities";
import styles from "./opportunity-list.module.css";

export function PocketMoneyHome() {
  const [category, setCategory] = useState<OpportunityCategory>("전체");
  const [knownAgeOnly, setKnownAgeOnly] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = filterOpportunities(category, knownAgeOnly);
  return <div className={styles.home}>
    <section className={styles.intro} aria-labelledby="list-title">
      <h1 id="list-title">용돈벌이·부업, 할 일부터 골라요</h1>
      <p>받는 보상과 참여 조건을 보고 바로 시작하세요.</p>
    </section>
    <div className={styles.filters} role="group" aria-label="정보 종류">
      {opportunityCategories.map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => {setCategory(value); setExpanded(null);}}>{value}</button>)}
    </div>
    <div className={styles.listBar}><p aria-live="polite">{items.length}개 정보 <span>· 공식 안내 10.03 확인</span></p><details className={styles.ageFilter}><summary>연령 조건</summary><label><input type="checkbox" checked={knownAgeOnly} onChange={e => setKnownAgeOnly(e.target.checked)}/>연령 기준이 확인된 정보만</label><p>실제 참여 가능 여부는 각 서비스가 정해요.</p></details></div>
    <section id="guides" aria-label="용돈벌이와 부업 목록" className={styles.list}>
      {items.map(item => <article key={item.id} id={item.id} className={styles.item} data-opportunity={item.id}>
        <div className={styles.itemTop}><span className={styles.category}>{item.category}</span><span className={styles.service}>{item.service}</span><span className={styles.rewardKind}>{item.rewardKind}</span></div>
        <h2>{item.task}</h2><p className={styles.reward}>{item.reward}</p>
        <p className={styles.facts}>{item.age} · {item.cost}<br/>{item.deadline} · {item.duration}</p>
        <p className={styles.condition}>{item.conditions}</p>
        <div className={styles.actions}><button type="button" aria-expanded={expanded === item.id} aria-controls={`method-${item.id}`} onClick={() => setExpanded(expanded === item.id ? null : item.id)}>{expanded === item.id ? "방법 접기" : "방법 보기"}<span aria-hidden="true">{expanded === item.id ? "−" : "+"}</span></button><a href={item.startUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.service} 공식 시작 (새 탭)`}>공식 시작 <span aria-hidden="true">↗</span></a></div>
        <div id={`method-${item.id}`} hidden={expanded !== item.id} className={styles.method}>
          <h3>참여 방법</h3><ol>{item.steps.map(step => <li key={step}>{step}</li>)}</ol><p>{item.payout}</p>
          <div className={styles.sources}><span>공식 출처 · {item.checkedAt} 확인</span>{item.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
        </div>
      </article>)}
    </section>
    <section id="conditions" className={styles.conditions}><h2>보상 표시는 이렇게 읽어요</h2><p><strong>현금</strong>은 지급 조건을, <strong>포인트</strong>는 교환 기준을 함께 확인하세요. <strong>추첨</strong>은 당첨되어야 받는 혜택이에요.</p><p>가입만으로 수익이 생기지는 않아요. 참여 가능 여부·마감·지급 조건은 시작 전 공식 화면에서 다시 확인하세요.</p></section>
    <footer className={styles.footer}>즐거운 용돈벌이 · 공식 안내를 확인해 정리한 정보<br/>개인정보 입력과 신청은 해당 서비스에서 진행합니다.</footer>
  </div>;
}
