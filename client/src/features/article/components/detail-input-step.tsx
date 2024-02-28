"use client";

import { Button, CloseButton, TagsInput, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { UseArticleForm } from "../hooks/useArticleForm";

import classes from "./detail-input-step.module.css";

type Mode = "create" | "edit";

interface Props {
  id?: number;
  form: UseFormReturnType<UseArticleForm>;
  mode: Mode;
  isLoading: boolean;
  onPrev: () => void;
  onSubmit: () => void;
}

export function DetailsInputStep({ form, mode, isLoading, onPrev, onSubmit }: Props) {
  return (
    <form
      className={classes.wrap}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
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
        withAsterisk
        autosize
        minRows={2}
        maxRows={10}
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
        <Button aria-label="이전" type="button" mt="sm" fullWidth variant="light" onClick={onPrev}>
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
          {mode === "create" ? "등록" : "수정"}
        </Button>
      </div>
    </form>
  );
}
