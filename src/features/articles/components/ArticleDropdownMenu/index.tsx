import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { DotsThree } from "@phosphor-icons/react";

import useAuth from "@/features/auth/hooks/useAuth";

import Edit from "./Edit";
import ReadStatusUpdater from "./ReadStatusUpdater";
import Remove from "./Remove";

interface Props {
  id: number;
  readStatus: ArticleReadStatus;
  isMy?: boolean;
}

export default function ArticleDropdownMenu({ id, readStatus, isMy }: Props) {
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
        <ReadStatusUpdater
          articleId={id}
          userId={user.id}
          isLoggedIn={isLoggedIn}
          readStatus={readStatus}
        />
        {isMy && (
          <>
            <Edit articleId={id} />
            <Remove articleId={id} userId={user.id} />
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
