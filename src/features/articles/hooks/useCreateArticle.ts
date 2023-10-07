import { CreateArticleDto, createArticle } from "../api/createArticle";

export default function useCreateArticle() {
  return (data: CreateArticleDto) => createArticle(data);
}
