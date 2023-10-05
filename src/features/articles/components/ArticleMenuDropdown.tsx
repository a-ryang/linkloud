import { ActionIcon, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  Book,
  BookBookmark,
  BookOpen,
  DotsThree,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/features/auth/hooks/useAuth";
import { useUpdateReadStatus } from "@/features/members/api/updateReadStatus";
import ROUTES_PATH from "@/routes/routesPath";

interface Props {
  id: number;
  readStatus: ArticleReadStatus;
  isMy?: boolean;
}

export default function ArticleMenuDropdown({ id, readStatus, isMy }: Props) {
  const updateReadStatusMutation = useUpdateReadStatus();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleUpdateReadStatus = (
    e: React.MouseEvent,
    readStatus: ArticleReadStatus,
  ) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate(ROUTES_PATH.LOGIN);
      return;
    }

    updateReadStatusMutation.mutate({
      memberId: user.id,
      articleId: id,
      query: { readStatus },
    });
    notifications.show({ message: "읽기 상태가 수정되었어요", color: "green" });
  };

  const renderMenuItems = () => {
    switch (readStatus) {
      case "UNREAD":
        return (
          <>
            <Menu.Item
              leftSection={<BookOpen />}
              onClick={(e) => handleUpdateReadStatus(e, "READING")}
            >
              읽는 중
            </Menu.Item>
            <Menu.Item
              leftSection={<BookBookmark />}
              onClick={(e) => handleUpdateReadStatus(e, "READ")}
            >
              읽음
            </Menu.Item>
          </>
        );
      case "READING":
        return (
          <>
            <Menu.Item
              leftSection={<BookBookmark />}
              onClick={(e) => handleUpdateReadStatus(e, "READ")}
            >
              읽음
            </Menu.Item>
            <Menu.Item
              leftSection={<Book />}
              onClick={(e) => handleUpdateReadStatus(e, "UNREAD")}
            >
              읽기 해제
            </Menu.Item>
          </>
        );
      case "READ":
        return (
          <>
            <Menu.Item
              leftSection={<BookOpen />}
              onClick={(e) => handleUpdateReadStatus(e, "READING")}
            >
              읽는 중
            </Menu.Item>
            <Menu.Item
              leftSection={<Book />}
              onClick={(e) => handleUpdateReadStatus(e, "UNREAD")}
            >
              읽기 해제
            </Menu.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon
          aria-label="더보기"
          variant="subtle"
          color="gray"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DotsThree size={24} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {renderMenuItems()}
        {isMy && (
          <>
            <Menu.Item
              leftSection={<PencilSimple />}
              onClick={(e) => {
                e.stopPropagation();
                handleClickEdit(id);
              }}
            >
              수정
            </Menu.Item>
            <Menu.Item leftSection={<Trash />} color="red">
              삭제
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
