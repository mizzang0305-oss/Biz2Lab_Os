import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { googleSetup } from "@/lib/google-setup";
import { PublicRouteChrome } from "@/components/layout/PublicRouteChrome";
import {knowledgeBrand} from "@/lib/essays/antikythera";
import {knowledgeOrigin, knowledgeIsPublished} from "@/lib/essays/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(knowledgeOrigin()),
  robots: {index: knowledgeIsPublished(), follow: knowledgeIsPublished()},
  title: {
    default: knowledgeBrand,
    template: `%s | ${knowledgeBrand}`,
  },
  description: "철학·과학·역사, 질문 하나에서 시작해 원자료를 따라가는 이야기.",
  applicationName: knowledgeBrand,
  authors: [{ name: "Biz2Lab 운영자" }],
  creator: "Biz2Lab 운영자",
  publisher: "Biz2Lab 운영자",
  other: {
    "google-adsense-account": googleSetup.adsenseClientId,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* The approved release keeps third-party measurement/ad scripts paused.
            Existing public publisher IDs remain in google-setup. */}
        <a
          href="#site-content"
          className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          본문으로 건너뛰기
        </a>
        <PublicRouteChrome>
          {children}
        </PublicRouteChrome>
      </body>
    </html>
  );
}
