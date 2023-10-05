import {
  Button,
  CloseButton,
  TagsInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ApiError from "@/libs/error/ApiError";
import ROUTES_PATH from "@/routes/routesPath";

import useCreateArticle from "../hooks/useCreateArticle";
import { FormValues } from "../routes/Create";

import classes from "./DetailInputStep.module.css";

interface Props {
  form: UseFormReturnType<FormValues>;
  onPrev: () => void;
}

export default function DetailsInputStep({ form, onPrev }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const createArticle = useCreateArticle();
  const navigate = useNavigate();

  const handleClickCreate = async () => {
    try {
      setIsLoading(true);
      await createArticle(form.values);
      navigate(ROUTES_PATH.MY_ARTICLES);
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

  return (
    <form
      className={classes.wrap}
      onSubmit={form.onSubmit(() => handleClickCreate())}
    >
      <TextInput
        aria-label="링크 입력란"
        label="링크"
        disabled
        placeholder="등록하려는 링크를 입력해주세요"
        size="md"
        radius="md"
        {...form.getInputProps("url")}
      />
      <TextInput
        aria-label="제목 입력란"
        label="제목"
        placeholder="제목을 입력해주세요"
        size="md"
        radius="md"
        withAsterisk
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="제목 입력 지우기"
            onClick={() => form.setFieldValue("title", "")}
            style={{
              display: form.values.title.length > 0 ? undefined : "none",
            }}
          />
        }
        {...form.getInputProps("title")}
      />
      <Textarea
        aria-label="설명 입력란"
        label="설명"
        placeholder="설명을 입력해주세요"
        size="md"
        radius="md"
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="설명 입력 지우기"
            onClick={() => form.setFieldValue("description", "")}
            style={{
              display: form.values.description.length > 0 ? undefined : "none",
            }}
          />
        }
        {...form.getInputProps("description")}
      />
      <TagsInput
        aria-label="태그 입력란"
        label="엔터를 눌러 태그를 등록해보세요"
        description="최대 5개까지 등록할 수 있어요"
        placeholder="태그를 등록해보세요"
        maxTags={5}
        size="md"
        radius="md"
        {...form.getInputProps("tags")}
      />
      <div className={classes["action-list"]}>
        <Button
          aria-label="이전"
          type="button"
          mt="sm"
          fullWidth
          variant="light"
          onClick={onPrev}
        >
          이전
        </Button>
        <Button
          aria-label="등록"
          type="submit"
          mt="sm"
          fullWidth
          loading={isLoading}
          loaderProps={{ type: "dots" }}
        >
          등록
        </Button>
      </div>
    </form>
  );
}
