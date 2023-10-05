import { Button, CloseButton, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";

import ApiError from "@/libs/error/ApiError";

import { getOpenGraph } from "../api/getOpenGraph";

import classes from "./LinkInputStep.module.css";

interface Props {
  value: string;
  onClickNext: (og: OG, url: string) => void;
}

const schema = z.object({
  url: z.string().url("올바른 링크를 입력해주세요"),
});

export default function LinkInputStep({ value = "", onClickNext }: Props) {
  const form = useForm({
    initialValues: {
      url: value,
    },
    validate: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClickNext = async () => {
    try {
      setIsLoading(true);
      const og = await getOpenGraph({ targetUrl: form.values.url });
      onClickNext(og, form.values.url);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.message === "Bad Request") {
          form.setFieldError("url", "올바른 링크를 입력해주세요");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(() => handleClickNext())}
      className={classes.wrap}
    >
      <TextInput
        aria-label="링크 입력란"
        autoComplete="off"
        label="링크"
        {...form.getInputProps("url")}
        placeholder="등록하려는 링크를 입력해주세요"
        size="md"
        radius="md"
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="링크 입력 지우기"
            onClick={() => form.setFieldValue("url", "")}
            style={{
              display: form.values.url.length > 0 ? undefined : "none",
            }}
          />
        }
        className={classes.input}
      />
      <Button
        aria-label="다음"
        type="button"
        fullWidth
        mt="sm"
        loading={isLoading}
        loaderProps={{ type: "dots" }}
        onClick={handleClickNext}
      >
        다음
      </Button>
    </form>
  );
}
