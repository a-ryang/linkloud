"use client";

import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { DotsThree } from "@phosphor-icons/react";

import useAuth from "@/features/auth/hooks/useAuth";

import { ArticleEditButton } from "./article-edit-button";
import { ArticleReadStatusUpdater } from "./article-read-status-updator";
import { ArticleRemoveButton } from "./article-remove-button";

interface Props {
  id: number;
  readStatus: ArticleReadStatus;
  isMy?: boolean;
}

export function ArticleDropdownMenu({ id, readStatus, isMy }: Props) {
  const { user, isLoggedIn } = useAuth();
  const theme = useMantineTheme();

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon
          aria-label="더보기"
          variant="subtle"
          color={theme.colors.gray["80"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DotsThree size={24} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <ArticleReadStatusUpdater
          articleId={id}
          userId={user.id}
          isLoggedIn={isLoggedIn}
          readStatus={readStatus}
        />
        {isMy && (
          <>
            <ArticleEditButton articleId={id} />
            <ArticleRemoveButton articleId={id} userId={user.id} />
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
