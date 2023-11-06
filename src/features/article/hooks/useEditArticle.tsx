import { notifications } from "@mantine/notifications";
import { Check } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ROUTER from "@/constants/router";
import useAuth from "@/features/auth/hooks/useAuth";
import { ApiError } from "@/libs/error";

import { UpdateArticleDto, updateArticle } from "../api/updateArticle";

import useArticle from "./useArticle";
import useArticleForm from "./useArticleForm";

export default function useEditArticle(id: number) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const form = useArticleForm({
    title: "",
    url: "",
    description: "",
    tags: [],
  });
  const {
    data: article,
    isLoading: isArticleLoading,
    isError: isArticleError,
    error: articleError,
  } = useArticle(id);
  const router = useRouter();

  useEffect(() => {
    if (isArticleError && articleError instanceof ApiError && articleError.status === 404) {
      notifications.show({ message: "존재하지 않는 링크에요", color: "red" });
      router.replace(ROUTER.HOME);
    }
  }, [isArticleError, articleError, router]);

  useEffect(() => {
    if (isArticleLoading || isArticleError) return;

    if (!article) {
      return;
    }

    if (article.authorId !== user.id) {
      notifications.show({
        message: "잘못된 접근이에요",
        color: "red",
      });
      router.replace(ROUTER.HOME);
      return;
    }

    form.setValues({
      title: article.title,
      url: article.url,
      description: article?.description,
      tags: article?.tags.map((tag) => tag.name),
    });
  }, [article, isArticleError, isArticleLoading, router, user.id]);

  const editMutation = useMutation({
    mutationFn: (data: UpdateArticleDto) => updateArticle(id, data),
    onSuccess: () => {
      notifications.show({
        message: "링크가 수정되었어요",
        icon: <Check weight="bold" />,
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["my-articles", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["article", id],
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

  const edit = (data: UpdateArticleDto) => {
    form.validate();
    if (!form.isValid()) {
      return;
    }
    editMutation.mutate(data);
  };

  return { form, isArticleLoading, edit };
}
