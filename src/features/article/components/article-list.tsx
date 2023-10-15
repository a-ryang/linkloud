"use client";

import { useRef } from "react";

import { useGetMyArticles } from "@/features/member/api/getMyArticles";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { useGetArticles } from "../api/getArticles";
import useOpenArticle from "../hooks/useOpenArticle";

import classes from "./article-list.module.css";
import { ArticleNotFound } from "./article-not-found";
import { ArticleSkeleton } from "./article-skeloton";

import { ArticleCard } from ".";

interface Props {
  query: ReturnType<typeof useGetMyArticles | typeof useGetArticles>;
  isMyArticle?: boolean;
}

export function ArticleList({ query, isMyArticle }: Props) {
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

  if (!query.data?.pages[0].items.length) {
    return <ArticleNotFound />;
  }

  const { pages: articleList } = query.data;

  return (
    <ul className={classes["card-list"]}>
      {articleList.map((page) =>
        page.items.map((item) => (
          <li key={item.id}>
            <ArticleCard
              article={{ ...item, author: isMyArticle ?? item.author }}
              onClick={(id) => handleOpenLink(id)}
            />
          </li>
        )),
      )}
      {query.hasNextPage && <div ref={observeRef} />}
    </ul>
  );
}
