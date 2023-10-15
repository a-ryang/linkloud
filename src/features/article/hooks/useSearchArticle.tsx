"use client";

import { useForm } from "@mantine/form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import {
  type SearchArticlesResponse,
  SearchArticlesQuery,
  searchArticles,
} from "../api/searchArticles";

interface FormValue {
  input: string;
}

interface UseSearchArticles {
  initialTags?: string;
}

export function useSearchArticles({ initialTags }: UseSearchArticles) {
  const form = useForm<FormValue>({
    initialValues: {
      input: initialTags ?? "",
    },
  });
  const [query, setQuery] = useState<SearchArticlesQuery | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const searchQuery = useInfiniteQuery<SearchArticlesResponse, Error>(
    ["search-articles", query?.keyword, query?.tags],
    async ({ pageParam }) => {
      if (!query) throw new Error("query is not set");

      return searchArticles({
        ...query,
        ...(pageParam ? { nextId: pageParam } : {}),
      });
    },
    {
      enabled: !!query,
    },
  );

  const search = useCallback((input: string) => {
    const { keyword, tags } = extractTagsAndKeyword(input);

    if (!validate(keyword, tags)) {
      return;
    }

    setQuery({ keyword, tags });
    setKeyword(keyword);
    setTags(tags);
  }, []);

  const validate = (keyword: string, tags: string[]) => {
    if (keyword && keyword.length > 20) {
      form.setErrors({ input: "키워드는 20자 이내로 입력해주세요" });
      return false;
    }

    // 태그 중복 검사
    const uniqueTags = new Set(tags);
    if (uniqueTags.size !== tags.length) {
      form.setErrors({ input: "중복된 태그가 있어요" });
      return false;
    }

    // 태그 개수 검사
    if (tags.length >= 6) {
      form.setErrors({ input: "태그는 최대 5개까지 입력해주세요" });
      return false;
    }

    return true;
  };

  const extractTagsAndKeyword = (input: string) => {
    const tagPattern = /\[([^\]]+)\]/g;
    const tags: string[] = [];
    let match;

    while ((match = tagPattern.exec(input)) !== null) {
      tags.push(match[1]);
    }

    const keyword = input.replace(tagPattern, "").trim();

    return { tags, keyword };
  };

  useEffect(() => {
    if (!initialTags) return;

    search(initialTags);
  }, [initialTags, search]);

  return { form, keyword, tags, searchQuery, search };
}
