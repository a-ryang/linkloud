"use client";

import { Skeleton } from "@mantine/core";

import { Tag } from "@/features/tag/components";
import useTags from "@/features/tag/hooks/useTags";

import classes from "./popular-tag-list.module.css";

export default function PopularTagList() {
  const tagsQuery = useTags({ page: 1, size: 15, sortBy: "popularity" });

  if (tagsQuery.isLoading) {
    return <Skeleton m="lg" radius="md" height="300" width="full" />;
  }

  return (
    <div className={classes["tag-list-wrap"]}>
      <ul className={classes["tag-list"]}>
        {tagsQuery.data?.items.map((item) => (
          <li key={item.id}>
            <Tag tag={item} href={`/search?tags=${item.name}`} color="gray" />
          </li>
        ))}
      </ul>
    </div>
  );
}
