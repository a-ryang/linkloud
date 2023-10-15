"use client";

import { useState } from "react";

import { ArticleList } from "@/features/article/components";
import useAuth from "@/features/auth/hooks/useAuth";

import { SortBy, useGetMyArticles } from "../api/getMyArticles";

import classes from "./my-articles-secion.module.css";
import { SortOptions } from "./sort-options";

interface MyArticlesProps {}

export function MyArticlesSection({}: MyArticlesProps) {
  const [sortBy, setSortBy] = useState<SortBy>("latest");
  const { user } = useAuth();
  const myArticlesQuery = useGetMyArticles(
    user.id,
    { sortBy },
    { getNextPageParam: (lastPage) => lastPage.nextItemId || undefined },
  );

  return (
    <>
      <SortOptions onChange={(value) => setSortBy(value)} />
      <section className={classes["article-section"]}>
        <h1 className="sr-only">링크 목록</h1>
        <ArticleList query={myArticlesQuery} />
      </section>
    </>
  );
}
