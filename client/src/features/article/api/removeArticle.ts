import { del } from "@/libs/http-client";

export async function removeArticle(id: number): Promise<{ id: number }> {
  return del(`/v2/articles/${id}`);
}
