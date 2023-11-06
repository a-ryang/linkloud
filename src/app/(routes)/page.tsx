import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { SitePopup } from "@/components/popup";
import { ArticleSection } from "@/features/article/components";
import { PopularTagList } from "@/features/tag/components";

export default function Home() {
  return (
    <AppShell title="홈">
      <SitePopup />
      <PopularTagList />
      <ArticleSection />
      <Footer />
    </AppShell>
  );
}
