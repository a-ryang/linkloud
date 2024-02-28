"use client";

import { Tooltip, useMantineTheme } from "@mantine/core";
import { BookBookmark, BookOpen } from "@phosphor-icons/react";

interface Props {
  status: ArticleReadStatus;
}

export function ArticleReadStatus({ status }: Props) {
  const theme = useMantineTheme();

  if (status === "READ")
    return (
      <Tooltip label="읽음">
        <BookBookmark color={theme.colors.orange["9"]} weight="fill" />
      </Tooltip>
    );

  if (status === "READING")
    return (
      <Tooltip label="읽는중">
        <BookOpen color={theme.colors.blue["5"]} weight="fill" />
      </Tooltip>
    );

  return null;
}
