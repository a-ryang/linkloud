"use client";

import { Center, Menu, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Check, Trash } from "@phosphor-icons/react";

import useRemoveArticle from "../../hooks/useRemoveArticle";

interface Props {
  articleId: number;
  userId: number;
}

export function ArticleRemoveButton({ articleId, userId }: Props) {
  const { remove } = useRemoveArticle(userId);

  return (
    <Menu.Item
      leftSection={<Trash />}
      color="red"
      onClick={(e) => {
        e.stopPropagation();
        modals.openConfirmModal({
          children: (
            <Center>
              <Title size="h4">링크를 삭제하시겠습니까?</Title>
            </Center>
          ),
          labels: { confirm: "삭제", cancel: "취소" },
          confirmProps: { color: "red" },
          onConfirm: () => {
            remove({ id: articleId });
            notifications.show({
              message: "링크를 삭제했어요",
              icon: <Check weight="bold" />,
              color: "green",
            });
          },
        });
      }}
    >
      삭제
    </Menu.Item>
  );
}
