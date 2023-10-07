import { Center, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppShell from "@/components/Layout/AppShell";
import BottomNav from "@/components/Layout/BottomNav";
import ROUTES_PATH from "@/routes/routesPath";

import { getArticle } from "../api/getArticle";
import DetailsInputStep from "../components/DetailInputStep";
import LinkInputStep from "../components/LinkInputStep";
import useArticleForm from "../hooks/useArticleForm";

import classes from "./Create.module.css";

export default function EditArticle() {
  const [step, setStep] = useState(2);
  const { form, isLoading, edit } = useArticleForm();
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

  const handleSubmit = async () => {
    edit(Number(id), form.values);
    notifications.show({
      message: "수정이 완료되었어요",
      icon: <Check weight="bold" />,
      color: "green",
    });
    navigate(ROUTES_PATH.MY_ARTICLES);
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
    <AppShell title="링크 수정하기" ogTitle="링크 수정하기">
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
              form={form}
              mode="edit"
              isLoading={isLoading}
              onPrev={handleClickPrev}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </Center>
      <BottomNav />
    </AppShell>
  );
}
