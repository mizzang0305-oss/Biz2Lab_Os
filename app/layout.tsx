import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { googleSetup } from "@/lib/google-setup";
import { PublicRouteChrome } from "@/components/layout/PublicRouteChrome";
import { siteConfig } from "@/lib/site";
import {pocketBrand} from "@/lib/pocket-money/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pocketBrand,
    template: `%s | ${pocketBrand}`,
  },
  description: "용돈벌이와 부업의 할 일, 보상, 참여 조건과 공식 시작 링크를 확인하세요.",
  applicationName: pocketBrand,
  authors: [{ name: `${pocketBrand} 운영자` }],
  creator: `${pocketBrand} 운영자`,
  publisher: `${pocketBrand} 운영자`,
  other: {
    "google-adsense-account": googleSetup.adsenseClientId,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVercelPreview = process.env.VERCEL_ENV === "preview";

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {!isVercelPreview ? (
          <>
            <Script
              id="biz2lab-adsense-client"
              src={googleSetup.adsenseScriptUrl}
              strategy="beforeInteractive"
              async
              crossOrigin="anonymous"
            />
            <Script
              id="biz2lab-ga4-loader"
              src={googleSetup.ga4ScriptUrl}
              strategy="afterInteractive"
            />
            <Script id="biz2lab-ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleSetup.ga4MeasurementId}');
              `}
            </Script>
          </>
        ) : null}
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
