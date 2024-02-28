"use client";

import { Skeleton, Title } from "@mantine/core";
import clsx from "clsx";

import useTags from "../hooks/useTags";

import classes from "./popular-tag-list.module.css";
import { Tag } from "./tag";

export function PopularTagList() {
  const tagsQuery = useTags({ page: 1, size: 15, sortBy: "popularity" });

  if (tagsQuery.isLoading) {
    return <Skeleton m="md" height={98} width="full" />;
  }

  return (
    <section className={clsx(classes["popular-tag-list"], "container")}>
      <div className={classes.wrap}>
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
      </div>
    </section>
  );
}
