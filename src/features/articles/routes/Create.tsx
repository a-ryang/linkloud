import { Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "@/components/Layout/AppShell";
import ROUTES_PATH from "@/routes/routesPath";

import DetailsInputStep from "../components/DetailInputStep";
import LinkInputStep from "../components/LinkInputStep";
import useArticleForm from "../hooks/useArticleForm";

import classes from "./Create.module.css";

export default function CreateArticle() {
  const [step, setStep] = useState(1);
  const { form, isLoading, create } = useArticleForm();
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
    await create(form.values);
    notifications.show({
      message: "새 링크가 등록되었어요",
      icon: <Check weight="bold" />,
      color: "green",
    });
    navigate(ROUTES_PATH.MY_ARTICLES);
  };

  return (
    <AppShell title="새로운 링크 등록하기" ogTitle="새로운 링크 등록하기">
      <Center mih="100vh">
        <div className={classes.wrap}>
          {step === 1 && (
            <LinkInputStep
              value={form.values.url}
              onClickNext={handleClickNext}
            />
          )}
          {step === 2 && (
            <DetailsInputStep
              mode="create"
              form={form}
              isLoading={isLoading}
              onPrev={handleClickPrev}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </Center>
    </AppShell>
  );
}
