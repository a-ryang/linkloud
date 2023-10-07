import AppShell from "@/components/Layout/AppShell";
import Footer from "@/components/Layout/Footer";
import ArticleCards from "@/features/articles/components/ArticleCards";

import classes from "./Home.module.css";

export default function Home() {
  return (
    <AppShell title="홈" ogTitle="링클라우드 | 모두의 링크 라이브러리">
      <section className={classes["article-section"]}>
        <h1 className="sr-only">링크 목록</h1>
        <ArticleCards />
      </section>
      <Footer />
    </AppShell>
  );
}
