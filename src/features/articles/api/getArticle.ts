import { get } from "@/libs/api";

export async function getArticle(id: number): Promise<Article> {
  return get(`/v2/articles/${id}`);
}
