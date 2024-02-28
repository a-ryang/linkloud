import { get } from "@/libs/http-client";

export interface GetMyArticlesResponse extends CursorPageInfo {
  items: Article[];
}

export type SortBy = "latest" | "title" | "read" | "reading" | "unread";

export interface GetMyArticlesQuery {
  nextId?: number;
  sortBy: SortBy;
  size: number;
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
