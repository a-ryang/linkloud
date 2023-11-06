"use client";

import { useRef } from "react";

import useMyArticles from "@/features/member/hooks/useMyArticles";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import useArticles from "../hooks/useArticles";
import useOpenArticle from "../hooks/useOpenArticle";

import classes from "./article-list.module.css";
import { ArticleNotFound } from "./article-not-found";
import { ArticleSkeleton } from "./article-skeloton";

import { ArticleCard } from ".";

interface Props {
  query: ReturnType<typeof useMyArticles | typeof useArticles>;
}

export function ArticleList({ query }: Props) {
  const observeRef = useRef<HTMLDivElement>(null);
  const handleOpenLink = useOpenArticle();

  useIntersectionObserver({
    target: observeRef,
    onIntersect: () => query.fetchNextPage(),
    enabled: query.hasNextPage,
  });

  if (query.isLoading) {
    return <ArticleSkeleton />;
  }

  if (!query.data?.pages.length) {
    return <ArticleNotFound />;
  }

  const { pages: articleList } = query.data;

  return (
    <ul className={classes["card-list"]}>
      {articleList.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} onClick={(id) => handleOpenLink(id)} />
        </li>
      ))}
      {query.hasNextPage && <div ref={observeRef} />}
    </ul>
  );
}
