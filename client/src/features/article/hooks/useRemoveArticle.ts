import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/libs/error";

import { removeArticle } from "../api/removeArticle";

export default function useRemoveArticle(userId: number) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => removeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-articles", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
    onError: (e) => {
      if (e instanceof ApiError && e.status === 404) {
        notifications.show({
          message: "존재하지 않는 게시글이에요",
          color: "red",
        });

        queryClient.invalidateQueries({
          queryKey: ["my-articles", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });
      }
    },
  });

  return {
    remove: mutate,
  };
}
