import { Center, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";

import DetailsInputStep from "../components/DetailInputStep";
import LinkInputStep from "../components/LinkInputStep";

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
  description: z.string().max(200, "최대 200자까지 입력해주세요"),
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

export default function CreateArticle() {
  const [step, setStep] = useState(1);
  const form = useForm<FormValues>({
    initialValues: {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
    validate: zodResolver(schema),
  });

  const handleClickNext = (og: OG, url: string) => {
    setStep((prev) => prev + 1);
    form.setFieldValue("url", og.url ? og.url : url);
    form.setFieldValue("title", og.title);
    form.setFieldValue("description", og.description);
  };

  const handleClickPrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <SEO title="새로운 링크 등록하기" />
      <Center mih="100vh">
        <div className="min-h-screen w-full max-w-xs">
          <div className="my-6">
            <Title ml="md">새 링크 등록</Title>
          </div>
          {step === 1 && (
            <LinkInputStep
              value={form.values.url}
              onClickNext={handleClickNext}
            />
          )}
          {step === 2 && (
            <DetailsInputStep form={form} onPrev={handleClickPrev} />
          )}
        </div>
      </Center>
      <BottomNav />
    </>
  );
}
