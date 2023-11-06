import { z } from "zod";

export const createArticleSchema = z.object({
  url: z.string().url("올바른 링크를 입력해주세요"),
  title: z
    .string()
    .min(1, "제목을 입력하세요")
    .min(2, "제목은 2~50자를 입력해주세요")
    .max(50, "제목은 2~50자를 입력해주세요"),
  description: z.string().min(1, "설명을 입력하세요").max(200, "최대 200자까지 입력해주세요"),
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

export const linkInputStepSchema = z.object({
  url: z.string().url("올바른 링크를 입력해주세요"),
});
