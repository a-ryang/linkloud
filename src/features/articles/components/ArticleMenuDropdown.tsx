import { ActionIcon, Menu } from "@mantine/core";
import {
  Book,
  BookBookmark,
  BookOpen,
  DotsThree,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";

import useAuth from "@/features/auth/hooks/useAuth";
import { useUpdateReadStatus } from "@/features/members/api/updateReadStatus";

interface Props {
  id: number;
  readStatus: ArticleReadStatus;
  isMy?: boolean;
}

export default function ArticleMenuDropdown({ id, readStatus, isMy }: Props) {
  const updateReadStatusMutation = useUpdateReadStatus();
  const { user } = useAuth();

  const handleUpdateReadStatus = (
    e: React.MouseEvent,
    readStatus: ArticleReadStatus,
  ) => {
    e.stopPropagation();
    updateReadStatusMutation.mutate({
      memberId: user.id,
      articleId: id,
      query: { readStatus },
    });
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
            <Menu.Item leftSection={<PencilSimple />}>수정</Menu.Item>
            <Menu.Item leftSection={<Trash />} color="red">
              삭제
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
