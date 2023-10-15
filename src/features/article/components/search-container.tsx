"use client";

import { Popover, TextInput, Title } from "@mantine/core";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { useSearchArticles } from "../hooks/useSearchArticle";

import classes from "./search-container.module.css";

import { ArticleList } from ".";

interface SearchContainerProps {
  initialTags?: string;
}

export function SearchContainer({ initialTags }: SearchContainerProps) {
  const { form, keyword, tags, searchQuery, search } = useSearchArticles({ initialTags });
  const [isGuideOpened, setIsGuideOpened] = useState(false);

  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      setIsGuideOpened(false);
    }
  }, [form.errors]);

  return (
    <div className={classes.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsGuideOpened(false);
          search(form.values.input);
        }}
      >
        <Popover
          opened={isGuideOpened}
          onChange={setIsGuideOpened}
          width="target"
          withArrow
          shadow="sm"
          radius="md"
        >
          <Popover.Target>
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<MagnifyingGlass />}
              size="md"
              radius="xl"
              placeholder="검색"
              onClick={() => setIsGuideOpened(true)}
              {...form.getInputProps("input")}
            />
          </Popover.Target>
          <Popover.Dropdown py="xl">
            <p className={classes["popover-guide"]}>
              <span className={classes["popover-label"]}>[태그] </span> 태그와 함께 검색
              <br />
              <span className={classes["popover-ex"]}>예) &apos;검색어 [태그1] [태그2]&apos;</span>
            </p>
          </Popover.Dropdown>
        </Popover>
      </form>
      {searchQuery.isFetched && (
        <>
          <div>
            {keyword && (
              <>
                <Title order={2} size="h5">
                  <strong>&apos;{keyword}&apos;</strong> 검색결과
                </Title>
                {tags.length > 0 && <span>다음 태그와 함께 검색 되었어요: {tags.join(", ")}</span>}
              </>
            )}
            {!keyword && tags.length > 0 && (
              <>
                <Title order={2} size="h5">
                  태그 검색결과
                </Title>
                <span>다음 태그와 함께 검색 되었어요: {tags.join(", ")}</span>
              </>
            )}
          </div>
          <ArticleList query={searchQuery} />
        </>
      )}
    </div>
  );
}
