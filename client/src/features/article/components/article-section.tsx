"use client";

import useArticles from "../hooks/useArticles";

import { ArticleList } from "./article-list";
import classes from "./article-section.module.css";

export function ArticleSection() {
  const articlesQuery = useArticles({ size: 2, sortBy: "latest" });
  return (
    <section className={classes["article-section"]}>
      <h1 className="sr-only">링크 목록</h1>
      <ArticleList query={articlesQuery} />
    </section>
  );
}
