import { get } from "@/libs/http-client";

export interface SearchArticlesResponse extends CursorPageInfo {
  items: Article[];
}

export interface SearchArticlesQuery {
  nextId?: number;
  keyword?: string;
  tags?: string[];
}

export async function searchArticles(query: SearchArticlesQuery): Promise<SearchArticlesResponse> {
  return get("/v2/articles/search", {
    params: {
      ...query,
    },
  });
}
