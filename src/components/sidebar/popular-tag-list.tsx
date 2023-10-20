"use client";

import { Skeleton } from "@mantine/core";

import { useGetTags } from "@/features/tag/api/getTags";
import { Tag } from "@/features/tag/components";

import classes from "./popular-tag-list.module.css";

export default function PopularTagList() {
  const tagsQuery = useGetTags({ page: 1, size: 15, sortBy: "popularity" });

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
