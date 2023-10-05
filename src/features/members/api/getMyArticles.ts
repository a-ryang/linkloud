import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { get } from "@/libs/api";

export interface Response extends CursorPageInfo {
  items: Article[];
}

export type SortBy = "latest" | "title" | "hearts";

export interface GetMyArticlesQuery {
  nextId?: number;
  sortBy: SortBy;
}

export async function getMyArticles(
  memberId: number,
  query: GetMyArticlesQuery,
): Promise<Response> {
  return get(`v2/member/${memberId}/articles`, {
    params: {
      ...query,
    },
  });
}

export function useGetMyArticles(
  memberId: number,
  { sortBy }: GetMyArticlesQuery,
  options?: UseInfiniteQueryOptions<Response>,
) {
  return useInfiniteQuery({
    queryKey: ["my-articles", memberId, sortBy],
    queryFn: ({ pageParam }) => {
      const params = {
        sortBy,
        ...(pageParam ? { nextId: pageParam } : {}), // nextId 값이 있을 경우에만 전달
      };
      return getMyArticles(memberId, params);
    },
    ...options,
  });
}
