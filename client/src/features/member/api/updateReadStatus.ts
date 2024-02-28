import { patch } from "@/libs/http-client";

export interface UpdateReadStatusQuery {
  readStatus: ArticleReadStatus;
}

export async function updateReadStatus(
  memberId: number,
  articleId: number,
  query: UpdateReadStatusQuery,
): Promise<{ id: number }> {
  return patch(
    `/v2/member/${memberId}/articles/${articleId}/status`,
    {},
    {
      params: {
        ...query,
      },
    },
  );
}
