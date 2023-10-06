import { useMutation, useQueryClient } from "@tanstack/react-query";

import { del } from "@/libs/api";

export async function removeArticle(id: number): Promise<{ id: number }> {
  return del(`/v2/articles/${id}`);
}

export function useRemoveArticle() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number; memberId: number }) => removeArticle(id),
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
