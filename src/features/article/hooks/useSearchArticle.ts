"use client";

import { useForm, zodResolver } from "@mantine/form";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { searchSchema } from "@/libs/validation/article";

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

export default function useSearchArticles({ initialTags }: UseSearchArticles) {
  const form = useForm<FormValue>({
    initialValues: {
      input: initialTags ?? "",
    },
    validate: zodResolver(searchSchema),
  });
  const [query, setQuery] = useState<SearchArticlesQuery | null>(null); // 검색할 query
  const [keyword, setKeyword] = useState<string | null>(null); // 입력한 검색어
  const [tags, setTags] = useState<string[]>([]); // 입력한 태그 목록

  const searchQuery = useInfiniteQuery<
    SearchArticlesResponse,
    Error,
    InfiniteData<Article>,
    ["search-articles", string | null, string[]],
    number | undefined
  >({
    queryKey: ["search-articles", keyword, tags],
    queryFn: ({ pageParam }) =>
      searchArticles({
        ...query,
        nextId: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextItemId || undefined,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.items),
      pageParams: data.pageParams,
    }),
    enabled: !!query,
  });

  const validate = useCallback((keyword: string, tags: string[]) => {
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
  }, []);

  const search = useCallback(
    (input: string) => {
      form.validate();
      if (!form.isValid()) {
        return;
      }

      const { keyword, tags } = extractTagsAndKeyword(input);

      if (!validate(keyword, tags)) {
        return;
      }

      setQuery({ keyword, tags });
      setKeyword(keyword);
      setTags(tags);
    },
    [form, validate],
  );

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

  // URL의 쿼리 파라미터가 변경될 때마다 검색창의 상태를 업데이트
  useEffect(() => {
    if (!initialTags) return;
    const { tags } = extractTagsAndKeyword(initialTags);
    form.setValues({ input: initialTags });
    setQuery({ tags: [tags[0]] });
    setTags(tags);
  }, [initialTags]);

  return { form, keyword, tags, searchQuery, search };
}
