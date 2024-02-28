"use client";

import { useState } from "react";

import { ArticleList } from "@/features/article/components";
import useAuth from "@/features/auth/hooks/useAuth";

import { SortBy } from "../api/getMyArticles";
import useMyArticles from "../hooks/useMyArticles";

import classes from "./my-articles-secion.module.css";
import { SortOptions } from "./sort-options";

const SIZE = 10;

export function MyArticlesSection() {
  const [sortBy, setSortBy] = useState<SortBy>("latest");
  const { user } = useAuth();
  const myArticlesQuery = useMyArticles({ memberId: user.id, sortBy, size: SIZE });

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
