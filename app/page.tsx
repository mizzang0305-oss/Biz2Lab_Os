import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";
import OnurimHomePage from "@/components/health/OnurimHomePage";
import styles from "./health/onurim.module.css";
import entryStyles from "./health/entry.module.css";

export const metadata: Metadata = createMetadata({
  title: "건강정보가 낯설 때, 질환 이해부터 진료 준비까지",
  description: "질환 이름, 검사표의 HbA1c·NGSP, 가족의 약과 진료 질문이 궁금할 때 필요한 안내를 찾아보세요. 오누림의 작성자·출처 원칙과 의료 검수 미완료 상태도 공개합니다.",
  path: "/",
});

export default function Home() {
  return (
    <div className={`onurim-app ${styles.shell} ${entryStyles.entryRoot}`}>
      <OnurimHomePage />
    </div>
  );
}
