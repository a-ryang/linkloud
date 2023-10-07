import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patch } from "@/libs/api";

interface UpdateReadStatusQuery {
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

export function useUpdateReadStatus() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      memberId,
      articleId,
      query,
    }: {
      memberId: number;
      articleId: number;
      query: UpdateReadStatusQuery;
    }) => updateReadStatus(memberId, articleId, query),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["my-articles", variables.memberId],
        });
        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });
      },
    },
  );
}
