import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentAutomationConsole } from "@/components/admin/ContentAutomationConsole";
import { isContentAutomationAdminEnabled } from "@/lib/admin/content-automation-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Automation Admin",
  description: "Admin-only Biz2Lab content automation scheduler console.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentAutomationAdminPage() {
  if (!isContentAutomationAdminEnabled()) {
    notFound();
  }

  return <ContentAutomationConsole />;
}
