"use client";

import { Skeleton, Title } from "@mantine/core";
import clsx from "clsx";

import { useGetTags } from "../api/getTags";

import classes from "./popular-tag-list.module.css";
import { Tag } from "./tag";

export function PopularTagList() {
  const tagsQuery = useGetTags({ page: 1, size: 15, sortBy: "popularity" });

  if (tagsQuery.isLoading) {
    return <Skeleton m="md" height={98} width="full" />;
  }

  return (
    <section className={classes["popular-tag-list"]}>
      <Title size="h4" p="sm">
        인기 태그
      </Title>
      <ul className={clsx(classes["tag-list"], "no-scrollbar")}>
        {tagsQuery.data?.items.map((item) => (
          <li key={item.id}>
            <Tag tag={item} href={`/search?tags=${item.name}`} color="gray" />
          </li>
        ))}
      </ul>
    </section>
  );
}
