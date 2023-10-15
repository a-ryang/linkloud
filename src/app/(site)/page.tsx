import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { ArticleSection } from "@/features/article/components";

export default function Home() {
  return (
    <AppShell title="홈">
      <ArticleSection />
      <Footer />
    </AppShell>
  );
}
