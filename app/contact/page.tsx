import Link from "next/link";
import { knowledgeMetadata } from "@/lib/essays/seo";
import styles from "@/components/essays/essays.module.css";

export const metadata = knowledgeMetadata("문의 안내", "Biz2Lab의 현재 문의 경로와 공개 연락처 미지정 상태를 안내합니다. 문의 입력 양식은 제공하지 않습니다.", "/contact");

export default function Contact() {
  return <article className={styles.article}>
    <header className={styles.articleHeader}>
      <Link href="/" className={styles.backLink}>← 이야기 첫 화면</Link>
      <p className={styles.kicker}>사이트 안내</p><h1>문의 안내</h1>
      <p className={styles.articleDeck}>현재 공개된 연락 경로의 상태를 안내합니다.</p>
    </header>
    <div className={styles.prose}>
      <section><h2>공개 연락처 미지정</h2><p>현재 Biz2Lab의 공개 문의 이메일과 공식 SNS 문의 경로가 지정되어 있지 않습니다. 이 사이트에는 문의 접수 양식이 없으며, 현재 이 페이지를 통한 문의 접수도 제공하지 않습니다.</p><p>연락처, 계정 정보 등 개인정보를 공개 게시물이나 원자료 사이트에 문의 내용으로 올리지 마세요.</p></section>
      <section><h2>사이트 안내</h2><p>글의 작성·발행 주체와 편집 기준은 <Link href="/about">운영·편집 안내</Link>, 분석·광고와 외부 링크의 현재 상태는 <Link href="/privacy">개인정보·광고 안내</Link>에서 확인할 수 있습니다.</p></section>
    </div>
  </article>;
}
