"use client";

import { Menu } from "@mantine/core";
import { PencilSimple } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Props {
  articleId: number;
}

export function ArticleEditButton({ articleId }: Props) {
  const router = useRouter();

  const handleClickEdit = (id: number) => {
    router.push(`/links/edit/${id}`);
  };

  return (
    <Menu.Item
      leftSection={<PencilSimple />}
      onClick={(e) => {
        e.stopPropagation();
        handleClickEdit(articleId);
      }}
    >
      수정
    </Menu.Item>
  );
}
