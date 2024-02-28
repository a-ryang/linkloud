import { notifications } from "@mantine/notifications";
import { Check } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ROUTER from "@/constants/router";
import useAuth from "@/features/auth/hooks/useAuth";
import { ApiError } from "@/libs/error";

import { CreateArticleDto, createArticle } from "../api/createArticle";

import useArticleForm from "./useArticleForm";

export default function useCreateArticle() {
  const form = useArticleForm({
    title: "",
    url: "",
    description: "",
    tags: [],
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const createArticleMutation = useMutation({
    mutationFn: ({ data }: { data: CreateArticleDto }) => createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-articles", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      notifications.show({
        message: "새 링크가 등록되었어요",
        icon: <Check weight="bold" />,
        color: "green",
      });
      router.replace(ROUTER.MY_ARTICLES);
    },
    onError: (e) => {
      if (e instanceof ApiError) {
        if (e.message === "Bad Request") {
          form.setFieldError("link", "올바른 링크를 입력해주세요");
        }
      }
    },
  });

  const create = async (data: CreateArticleDto) => {
    form.validate();
    if (!form.isValid()) {
      return;
    }

    createArticleMutation.mutate({ data });
  };

  return { form, isLoading, create };
}
