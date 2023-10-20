import { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { MyArticlesSection } from "@/features/member/components";

export const metadata: Metadata = {
  title: "링클라우드 | 내 링크",
};

export default function Library() {
  return (
    <AppShell title="내 링크">
      <MyArticlesSection />
      <Footer />
    </AppShell>
  );
}
