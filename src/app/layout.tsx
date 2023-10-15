import "@/styles/reset.css";
import "@/styles/global.css";
import "@/styles/utils.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import Providers from "@/providers/providers";

const font = localFont({ src: "./PretendardVariable.woff2" });

export const metadata: Metadata = {
  title: "링클라우드",
  description: "모두의 링크 라이브러리",
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
