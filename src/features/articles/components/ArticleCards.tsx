import InfiniteScroll from "react-infinite-scroller";

import { useGetArticles } from "../api/getArticles";
import useArticle from "../hooks/useArticle";

import ArticleCard from "./ArticleCard";
import classes from "./ArticleCards.module.css";
import ArticleNotFound from "./ArticleNotFound";
import ArticleSkeleton from "./ArticleSkeleton";

export default function ArticleCards() {
  const articleQuery = useGetArticles(
    { size: 10, sortBy: "latest" },
    { getNextPageParam: (lastPage) => lastPage.nextItemId || undefined },
  );
  const handleClick = useArticle();

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
        {articleQuery.data.pages.map((page) =>
          page.items.map((item) => (
            <li key={item.id}>
              <ArticleCard
                article={item}
                onClick={() => {
                  handleClick(item.id);
                }}
              />
            </li>
          )),
        )}
      </ul>
    </InfiniteScroll>
  );
}
