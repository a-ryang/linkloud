import { Skeleton, Text } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroller";

import ArticleCard from "@/features/articles/components/ArticleCard";

import { SortBy, useGetMyArticles } from "../api/getMyArticles";

import classes from "./MyArticleCards.module.css";

interface Props {
  memberId: number;
  sortBy: SortBy;
}

export default function MyArticleCards({ memberId, sortBy }: Props) {
  const articleQuery = useGetMyArticles(
    memberId,
    { sortBy },
    { getNextPageParam: (lastPage) => lastPage.nextItemId || undefined },
  );

  if (articleQuery.isLoading)
    return (
      <ul className={classes["card-list"]}>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
      </ul>
    );

  if (!articleQuery.data?.pages.length) {
    return (
      <div className={classes["not-found"]}>
        <Text>등록된 링크가 없어요</Text>
      </div>
    );
  }

  return (
    <InfiniteScroll
      loadMore={() => articleQuery.fetchNextPage()}
      hasMore={articleQuery.hasNextPage}
    >
      <ul className={classes["card-list"]}>
        {articleQuery.data.pages.map((page) =>
          page.items.map((item) => (
            <li key={item.id}>
              <ArticleCard article={item} />
            </li>
          )),
        )}
      </ul>
    </InfiniteScroll>
  );
}
