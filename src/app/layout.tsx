import "@/styles/reset.css";
import "@/styles/global.css";
import "@/styles/utils.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { SITE_CONFIG } from "@/constants/config";
import Providers from "@/providers/providers";

const font = localFont({ src: "./PretendardVariable.woff2" });

export const metadata: Metadata = {
  title: SITE_CONFIG.NAME,
  description: SITE_CONFIG.DESCRIPTION,
  keywords: ["개발 사이트 모음", "디자인 사이트 모음", "즐겨찾기 관리"],
  authors: [
    {
      name: "linkloud",
      url: SITE_CONFIG.URL,
    },
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.URL,
    title: SITE_CONFIG.NAME,
    description: SITE_CONFIG.NAME,
    siteName: SITE_CONFIG.NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.NAME,
    description: SITE_CONFIG.DESCRIPTION,
    images: [`${SITE_CONFIG.URL}/og.png`],
    creator: "@shadcn",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicons/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicons/favicon-32x32.png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        url: "/favicons/apple-touch-icon.png",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
