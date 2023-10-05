import { put } from "@/libs/api";

export interface UpdateArticleDto {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export async function updateArticle(
  id: number,
  data: UpdateArticleDto,
): Promise<{ id: number }> {
  return put(`/v2/articles/${id}`, data);
}
