import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";
import OnurimHomePage from "./health/page";
import styles from "./health/onurim.module.css";

export const metadata: Metadata = createMetadata({
  title: "오누림",
  description: "질환을 쉽게 이해하고, 몸의 변화를 기록하며, 필요한 의료 도움을 제때 찾도록 돕는 일반 건강교육 안내서입니다.",
  path: "/",
});

export default function Home() {
  return (
    <div className={`onurim-app ${styles.shell}`}>
      <OnurimHomePage />
    </div>
  );
}
