import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { ArticleSection } from "@/features/article/components";
import { PopularTagList } from "@/features/tag/components";

export default function Home() {
  return (
    <AppShell title="홈">
      <PopularTagList />
      <ArticleSection />
      <Footer />
    </AppShell>
  );
}
