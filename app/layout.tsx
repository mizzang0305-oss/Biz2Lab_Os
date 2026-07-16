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
    default: "Biz2Lab PLAY",
    template: "%s | Biz2Lab PLAY",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: absoluteUrl("/ko/about") }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: siteConfig.url,
  },
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
