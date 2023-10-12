import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";

import ApiError from "@/libs/error/ApiError";

import { CreateArticleDto, createArticle } from "../api/createArticle";
import { UpdateArticleDto, updateArticle } from "../api/updateArticle";

export interface FormValues {
  url: string;
  title: string;
  description: string;
  tags: string[];
}

const schema = z.object({
  url: z.string().url("올바른 링크를 입력해주세요"),
  title: z
    .string()
    .nonempty("제목을 입력하세요")
    .min(2, "제목은 2~20자를 입력해주세요")
    .max(20, "제목은 2~20자를 입력해주세요"),
  description: z
    .string()
    .nonempty("설명 입력하세요")
    .max(200, "최대 200자까지 입력해주세요"),
  tags: z
    .string()
    .array()
    .max(5, "태그는 최대 5개까지만 입력해주세요")
    .refine((tags) => {
      const uniqueTags = new Set(tags);
      return uniqueTags.size === tags.length;
    }, "중복된 태그는 입력할 수 없어요")
    .refine(
      (tags) => tags.every((tag) => tag.length <= 20),
      "태그는 최대 20자까지 입력할 수 있어요",
    ),
});

export type ArticleFormMode = "create" | "edit";

export default function useArticleForm() {
  const form = useForm<FormValues>({
    initialValues: {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
    validate: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: CreateArticleDto) => {
    try {
      setIsLoading(true);

      await createArticle(data);

      return true;
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.message === "Bad Request") {
          form.setFieldError("link", "올바른 링크를 입력해주세요");
        }
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const edit = async (id: number, data: UpdateArticleDto) => {
    try {
      setIsLoading(true);

      form.validate();
      if (!form.isValid()) return;

      await updateArticle(id, data);

      return true;
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

  return { form, isLoading, create, edit };
}
