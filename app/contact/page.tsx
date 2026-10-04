import Link from "next/link";
import { knowledgeMetadata } from "@/lib/essays/seo";
import styles from "@/components/essays/essays.module.css";

export const metadata = knowledgeMetadata("문의 안내", "Biz2Lab의 문의 이메일과 글의 오류·출처 정정 제안 방법을 안내합니다.", "/contact");

export default function Contact() {
  return <article className={styles.article}>
    <header className={styles.articleHeader}>
      <Link href="/" className={styles.backLink}>← 이야기 첫 화면</Link>
      <p className={styles.kicker}>사이트 안내</p><h1>문의 안내</h1>
      <p className={styles.articleDeck}>글의 오류나 출처에 관한 의견을 이메일로 보내 주세요.</p>
    </header>
    <div className={styles.prose}>
      <section><h2>문의·정정 제안</h2><p>문의 이메일: <a href="mailto:mizzang0305@gmail.com">mizzang0305@gmail.com</a></p><p>정정을 제안할 때에는 해당 글의 주소와 확인이 필요한 문장, 대조할 원자료를 함께 알려 주세요. 이메일 링크는 기기의 메일 앱을 엽니다. 이 사이트에는 문의 입력 양식이 없습니다.</p><p>문의에 필요하지 않은 계정 정보나 민감한 개인정보는 보내지 마세요.</p></section>
      <section><h2>사이트 안내</h2><p>글의 작성·발행 주체와 편집 기준은 <Link href="/about">운영·편집 안내</Link>, 분석·광고와 외부 링크의 현재 상태는 <Link href="/privacy">개인정보·광고 안내</Link>에서 확인할 수 있습니다.</p></section>
    </div>
  </article>;
}
