import { post } from "@/libs/api";

export interface CreateArticleDto {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export async function createArticle(
  data: CreateArticleDto,
): Promise<{ id: number }> {
  return post(`/v2/articles`, data);
}
