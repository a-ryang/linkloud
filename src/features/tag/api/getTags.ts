import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import { get } from "@/libs/http-client";

type SortBy = "popularity" | "createdAt" | "name";

interface GetTagsQuery {
  page: number;
  size: number;
  sortBy: SortBy;
}

interface GetTagsResponse {
  items: Tag[];
  pageInfo: PageInfo;
}

export async function getTags(query: GetTagsQuery): Promise<GetTagsResponse> {
  return get("/v1/tags", {
    params: {
      ...query,
    },
  });
}

export function useGetTags(
  { page, size, sortBy }: GetTagsQuery,
  options?: UseQueryOptions<GetTagsResponse>,
) {
  return useQuery({
    queryKey: ["tags", page, size, sortBy],
    queryFn: () => getTags({ page, size, sortBy }),
    ...options,
  });
}
