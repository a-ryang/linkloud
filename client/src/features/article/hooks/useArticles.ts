import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { GetArticlesQuery, GetArticlesResponse, SortBy, getArticles } from "../api/getArticles";

export default function useArticles({ size, sortBy }: GetArticlesQuery) {
  return useInfiniteQuery<
    GetArticlesResponse,
    Error,
    InfiniteData<Article>,
    ["articles", number, SortBy],
    number | undefined
  >({
    queryKey: ["articles", size, sortBy],
    queryFn: ({ pageParam }) => getArticles({ size, sortBy, nextId: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextItemId || undefined,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.items),
      pageParams: data.pageParams,
    }),
  });
}
