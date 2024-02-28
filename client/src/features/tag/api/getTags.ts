import { get } from "@/libs/http-client";

export type SortBy = "popularity" | "createdAt" | "name";

export interface GetTagsQuery {
  page: number;
  size: number;
  sortBy: SortBy;
}

export interface GetTagsResponse {
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
