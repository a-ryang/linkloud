"use client";

import { useState } from "react";

import useCreateArticle from "../hooks/useCreateArticle";

import classes from "./create-article-form.module.css";
import { DetailsInputStep } from "./detail-input-step";
import { LinkInputStep } from "./link-input-step";

export function CreateArticleForm() {
  const [step, setStep] = useState(1);
  const { form, isLoading, create } = useCreateArticle();

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
    <div className={classes.wrap}>
      {step === 1 && <LinkInputStep value={form.values.url} onClickNext={handleClickNext} />}
      {step === 2 && (
        <DetailsInputStep
          mode="create"
          form={form}
          isLoading={isLoading}
          onPrev={handleClickPrev}
          onSubmit={() => create(form.values)}
        />
      )}
    </div>
  );
}
