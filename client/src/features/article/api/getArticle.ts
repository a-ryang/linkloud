import { get } from "@/libs/http-client";

export interface GetArticleResponse extends Article {
  authorId: number;
}

export async function getArticle(id: number): Promise<GetArticleResponse> {
  return get(`/v2/articles/${id}`);
}
