import { notifications } from "@mantine/notifications";
import { Check } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ROUTER from "@/constants/router";
import useAuth from "@/features/auth/hooks/useAuth";
import { ApiError } from "@/libs/error";

import { getArticle } from "../api/getArticle";
import { UpdateArticleDto, updateArticle } from "../api/updateArticle";

import useArticleForm from "./useArticleForm";

export default function useEditArticle(id: number) {
  const form = useArticleForm({
    title: "",
    url: "",
    description: "",
    tags: [],
  });
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const edit = async (id: number, data: UpdateArticleDto) => {
    try {
      setIsLoading(true);

      form.validate();
      if (!form.isValid()) {
        return;
      }

      await updateArticle(id, data);

      notifications.show({
        message: "링크가 수정되었어요",
        icon: <Check weight="bold" />,
        color: "green",
      });
      router.replace(ROUTER.MY_ARTICLES);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.message === "Bad Request") {
          form.setFieldError("link", "올바른 링크를 입력해주세요");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchArticle = async (id: number, userId: number) => {
      const data = await getArticle(id);

      if (data.authorId !== userId) {
        router.replace(ROUTER.MY_ARTICLES);
        return;
      }

      setIsFetching(false);

      form.setFieldValue("title", data.title);
      form.setFieldValue("url", data.url);
      form.setFieldValue("description", data.description);
      form.setFieldValue(
        "tags",
        data.tags.map((tag) => tag.name),
      );
    };

    if (isNaN(id)) {
      notifications.show({ message: "유효하지 않는 링크에요", color: "red" });
      router.push(ROUTER.HOME);
      return;
    }

    fetchArticle(id, user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user.id, router]);

  return { form, isLoading, isFetching, edit };
}
