import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";

import { get } from "@/libs/http-client";

export interface GetMyArticlesResponse extends CursorPageInfo {
  items: Article[];
}

export type SortBy = "latest" | "title" | "read" | "reading" | "unread";

export interface GetMyArticlesQuery {
  nextId?: number;
  sortBy: SortBy;
}

export async function getMyArticles(
  memberId: number,
  query: GetMyArticlesQuery,
): Promise<GetMyArticlesResponse> {
  return get(`v2/member/${memberId}/articles`, {
    params: {
      ...query,
    },
  });
}

export function useGetMyArticles(
  memberId: number,
  { sortBy }: GetMyArticlesQuery,
  options?: UseInfiniteQueryOptions<GetMyArticlesResponse>,
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
