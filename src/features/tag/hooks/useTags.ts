import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { GetTagsQuery, GetTagsResponse, getTags } from "../api/getTags";

export default function useTags(
  { page, size, sortBy }: GetTagsQuery,
  options?: UseQueryOptions<GetTagsResponse>,
) {
  return useQuery({
    queryKey: ["tags", page, size, sortBy],
    queryFn: () => getTags({ page, size, sortBy }),
    ...options,
  });
}
