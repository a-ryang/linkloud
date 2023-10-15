import { notifications } from "@mantine/notifications";
import { Check } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ROUTER from "@/constants/router";
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

  const create = async (data: CreateArticleDto) => {
    try {
      setIsLoading(true);

      form.validate();
      if (!form.isValid()) {
        return;
      }

      await createArticle(data);

      notifications.show({
        message: "새 링크가 등록되었어요",
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

  return { form, isLoading, create };
}
