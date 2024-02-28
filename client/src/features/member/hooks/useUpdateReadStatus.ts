import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateReadStatusQuery, updateReadStatus } from "../api/updateReadStatus";

export default function useUpdateReadStatus() {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: ({
      memberId,
      articleId,
      query,
    }: {
      memberId: number;
      articleId: number;
      query: UpdateReadStatusQuery;
    }) => updateReadStatus(memberId, articleId, query),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-articles", variables.memberId],
      });
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });

  return {
    updateReadStatus: mutate,
  };
}
