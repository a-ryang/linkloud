import InfiniteScroll from "react-infinite-scroller";

import ArticleCard from "@/features/articles/components/ArticleCard";
import ArticleNotFound from "@/features/articles/components/ArticleNotFound";
import ArticleSkeleton from "@/features/articles/components/ArticleSkeleton";

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

  if (articleQuery.isLoading) {
    return <ArticleSkeleton />;
  }

  if (!articleQuery.data?.pages[0].items) {
    return <ArticleNotFound />;
  }

  return (
    <InfiniteScroll
      loadMore={() => articleQuery.fetchNextPage()}
      hasMore={articleQuery.hasNextPage}
    >
      <ul className={classes["card-list"]}>
        {articleQuery.data?.pages.map((page) =>
          page.items.map((item) => (
            <li key={item.id}>
              <ArticleCard article={{ ...item, author: true }} />
            </li>
          )),
        )}
      </ul>
    </InfiniteScroll>
  );
}
