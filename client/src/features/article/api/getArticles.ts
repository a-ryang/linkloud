import { get } from "@/libs/http-client";

export interface GetArticlesResponse extends CursorPageInfo {
  items: Article[];
}

export type SortBy = "latest" | "title" | "hearts";

export interface GetArticlesQuery {
  nextId?: number;
  size: number;
  sortBy: SortBy;
}

export async function getArticles(query: GetArticlesQuery): Promise<GetArticlesResponse> {
  return get("/v2/articles", {
    params: {
      ...query,
    },
  });
}
