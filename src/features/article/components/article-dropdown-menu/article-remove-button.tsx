"use client";

import { Center, Menu, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Check, Trash } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { ApiError } from "@/libs/error";

import { useRemoveArticle } from "../../api/removeArticle";

interface Props {
  articleId: number;
  userId: number;
}

export function ArticleRemoveButton({ articleId, userId }: Props) {
  const removeArticleMutation = useRemoveArticle();
  const queryClient = useQueryClient();

  const openModal = () =>
    modals.openConfirmModal({
      children: (
        <Center>
          <Title size="h4">링크를 삭제하시겠습니까?</Title>
        </Center>
      ),
      labels: { confirm: "삭제", cancel: "취소" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        removeArticleMutation.mutate({ id: articleId, memberId: userId });
        notifications.show({
          message: "링크를 삭제했어요",
          icon: <Check weight="bold" />,
          color: "green",
        });
      },
    });

  useEffect(() => {
    const error = removeArticleMutation.error;
    if (error instanceof ApiError && error.message === "Article not found") {
      notifications.show({
        message: "존재하지 않는 게시글이에요",
        color: "red",
      });
      queryClient.refetchQueries(["my-articles", userId]);
      queryClient.refetchQueries(["articles"]);
    }
  }, [queryClient, removeArticleMutation.error, userId]);

  return (
    <Menu.Item
      leftSection={<Trash />}
      color="red"
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
    >
      삭제
    </Menu.Item>
  );
}
