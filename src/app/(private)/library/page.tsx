import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { MyArticlesSection } from "@/features/member/components";

export default function Library() {
  return (
    <AppShell title="내 링크">
      <MyArticlesSection />
      <Footer />
    </AppShell>
  );
}
