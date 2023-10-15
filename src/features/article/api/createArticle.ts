import { post } from "@/libs/http-client";

export interface CreateArticleDto {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export async function createArticle(data: CreateArticleDto): Promise<{ id: number }> {
  return post(`/v2/articles`, data);
}
