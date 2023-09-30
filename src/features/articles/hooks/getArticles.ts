import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { get } from "@/libs/api";

export interface Response extends CursorPageInfo {
  items: Article[];
}

export type SortBy = "latest" | "title" | "hearts";

export interface GetArticlesQuery {
  nextId?: number;
  size: number;
  sortBy: SortBy;
}

export async function getArticles(query: GetArticlesQuery): Promise<Response> {
  return get("/v2/articles", {
    params: {
      ...query,
    },
  });
}

export function useGetArticles(
  { size, sortBy }: GetArticlesQuery,
  options?: UseInfiniteQueryOptions<Response>,
) {
  return useInfiniteQuery({
    queryKey: ["articles", size, sortBy],
    queryFn: ({ pageParam }) => {
      const params = {
        size,
        sortBy,
        ...(pageParam ? { nextId: pageParam } : {}), // nextId 값이 있을 경우에만 전달
      };
      return getArticles(params);
    },
    ...options,
  });
}
