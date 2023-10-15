import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

import useAuth from "@/features/auth/hooks/useAuth";
import { ApiError } from "@/libs/error";

import { getArticle } from "../api/getArticle";

export default function useOpenArticle() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const openAritlce = async (id: number) => {
    try {
      const { url } = await getArticle(id);
      if (url) {
        window.open(url, "_blank", "noreferrer");
      }
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 404) {
          notifications.show({ message: "유효하지 않는 링크에요", color: "red" });

          queryClient.invalidateQueries({
            queryKey: ["articles"],
          });
          if (user?.id) {
            queryClient.invalidateQueries({
              queryKey: ["my-articles", user.id],
            });
          }
        }
      }
    }
  };

  return openAritlce;
}
