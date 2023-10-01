import { useMutation } from "@tanstack/react-query";

import { post } from "@/libs/api";

interface CreateArticleDto {
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

export function useCreateArticle() {
  return useMutation(createArticle);
}
