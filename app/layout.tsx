import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { googleSetup } from "@/lib/google-setup";
import { jsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
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
    default: "Biz2Lab",
    template: "%s | Biz2Lab",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: absoluteUrl("/ko/author/biz2lab") }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }}
        />
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
        <a
          href="#site-content"
          className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="site-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
