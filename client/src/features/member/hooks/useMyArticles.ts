import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { GetMyArticlesResponse, SortBy, getMyArticles } from "../api/getMyArticles";

interface UseMyArticles {
  memberId: number;
  sortBy: SortBy;
  size?: number;
}

export default function useMyArticles({ memberId, sortBy, size = 10 }: UseMyArticles) {
  return useInfiniteQuery<
    GetMyArticlesResponse,
    Error,
    InfiniteData<Article>,
    ["my-articles", number, SortBy],
    number | undefined
  >({
    queryKey: ["my-articles", memberId, sortBy],
    queryFn: ({ pageParam }) => getMyArticles(memberId, { size, sortBy, nextId: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextItemId || undefined,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.items),
      pageParams: data.pageParams,
    }),
  });
}
