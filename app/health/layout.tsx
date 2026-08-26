import type { Metadata } from "next";

import { onurimTagline } from "@/lib/health-v3/content";
import styles from "./onurim.module.css";

export const metadata: Metadata = {
  title: { default: "오누림", template: "%s | 오누림" },
  description: onurimTagline,
};

export default function HealthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`onurim-app ${styles.shell}`}>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
