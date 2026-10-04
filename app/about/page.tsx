import Link from "next/link";
import { knowledgeMetadata } from "@/lib/essays/seo";
import styles from "@/components/essays/essays.module.css";

export const metadata = knowledgeMetadata("운영·편집 안내", "Biz2Lab 지식 에세이의 편집 원칙, 근거와 해석의 구분, AI 활용과 검토 범위, 문의 안내를 소개합니다.", "/about");

export default function About() {
  return <article className={styles.article}>
    <header className={styles.articleHeader}>
      <Link href="/" className={styles.backLink}>← 이야기 첫 화면</Link>
      <p className={styles.kicker}>사이트 안내</p><h1>운영과 편집 기준</h1>
      <p className={styles.articleDeck}>과학·기술·역사가 인간의 생각과 삶을 바꾸는 과정을 읽습니다.</p>
    </header>
    <div className={styles.prose}>
      <section><h2>이곳에서 다루는 질문</h2><p>Biz2Lab이 발행하는 지식 에세이입니다. 유물, 실험, 기술, 기록을 살펴보고 그것이 인간의 판단을 어떻게 바꾸었는지 묻습니다. 글의 작성·발행 주체는 Biz2Lab입니다.</p></section>
      <section><h2>근거와 해석을 구분합니다</h2><p>논문과 공식 기관·소장 기관의 자료를 우선 확인하고, 핵심 주장 가까이에 근거 링크를 둡니다. 확인된 사실, 연구자가 제안한 모델, 아직 모르는 부분, 글쓴이의 해석을 구분해 말합니다. 자료가 없다는 이유로 빈칸을 사실처럼 채우지 않습니다.</p><p>이미지를 사용하는 글에는 출처와 이용 조건, 원본에 가한 변경을 표시합니다. 이미지가 없는 글도 본문만으로 읽을 수 있게 구성합니다.</p></section>
      <section><h2>AI 활용과 검토의 범위</h2><p>원고의 초안·구성·교정에 AI 도구를 활용했습니다. AI의 답변을 사실 출처로 삼지 않고 원자료와 비교했습니다. Gemini 검토 회신을 대조하고 필요한 수정과 최신 30편의 내용 검토를 마쳤습니다.</p><p>이 검토는 Google의 광고 심사나 검색 노출 승인을 뜻하지 않습니다. 검색 결과나 광고 승인을 보장하지 않습니다.</p></section>
      <section><h2>문의와 개인정보 안내</h2><p>현재 공개된 연락 경로와 제한은 <Link href="/contact">문의 안내</Link>에서 확인할 수 있습니다. 이 사이트는 회원가입이나 문의 입력 양식을 제공하지 않습니다.</p><p>분석·광고 기능의 현재 상태와 외부 링크 이용에 관한 안내는 <Link href="/privacy">개인정보·광고 안내</Link>에 정리했습니다.</p></section>
    </div>
  </article>;
}
