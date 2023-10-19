"use client";

import { useGetArticles } from "../api/getArticles";

import { ArticleList } from "./article-list";
import classes from "./article-section.module.css";

export function ArticleSection() {
  const articlesQuery = useGetArticles(
    { size: 10, sortBy: "latest" },
    { getNextPageParam: (lastPage) => lastPage.nextItemId || undefined, retry: 2 },
  );

  return (
    <section className={classes["article-section"]}>
      <h1 className="sr-only">링크 목록</h1>
      <ArticleList query={articlesQuery} />
    </section>
  );
}
