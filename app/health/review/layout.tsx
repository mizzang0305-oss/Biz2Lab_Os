import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default async function MedicalReviewLayout({ children }: { children: React.ReactNode }) {
  await connection();
  if (process.env.VERCEL_ENV === "production") notFound();
  return children;
}
