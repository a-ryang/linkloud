import { Center, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";

import { getArticle } from "../api/getArticle";
import DetailsInputStep from "../components/DetailInputStep";
import LinkInputStep from "../components/LinkInputStep";

import classes from "./Create.module.css";

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
  const [step, setStep] = useState(2);
  const form = useForm<FormValues>({
    initialValues: {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
    validate: zodResolver(schema),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClickNext = (og: OG, url: string) => {
    setStep((prev) => prev + 1);
    form.setFieldValue("url", og.url ? og.url : url);
    form.setFieldValue("title", og.title);
    form.setFieldValue("description", og.description);
  };

  const handleClickPrev = () => {
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchArticle = async (id: number) => {
      const data = await getArticle(id);

      form.setFieldValue("title", data.title);
      form.setFieldValue("url", data.url);
      form.setFieldValue("description", data.description);
      form.setFieldValue(
        "tags",
        data.tags.map((tag) => tag.name),
      );
    };

    const articleId = Number(id);

    if (isNaN(articleId)) {
      navigate("404", { replace: true });
      return;
    }

    fetchArticle(articleId);
  }, []);

  return (
    <>
      <SEO title="링크 수정하기" />
      <Center mih="100vh">
        <div className={classes.wrap}>
          <header className={classes.header}>
            <Title ml="md">링크 수정</Title>
          </header>
          {step === 1 && (
            <LinkInputStep
              value={form.values.url}
              onClickNext={handleClickNext}
            />
          )}
          {step === 2 && (
            <DetailsInputStep
              id={Number(id)}
              mode="edit"
              form={form}
              onPrev={handleClickPrev}
            />
          )}
        </div>
      </Center>
      <BottomNav />
    </>
  );
}
