import { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { SearchContainer } from "@/features/article/components";

export const metadata: Metadata = {
  title: "링클라우드 | 검색",
};

export default function Search() {
  return (
    <AppShell title="검색">
      <SearchContainer />
      <Footer />
    </AppShell>
  );
}
