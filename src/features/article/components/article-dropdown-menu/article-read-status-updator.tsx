import { Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Book, BookBookmark, BookOpen } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import ROUTER from "@/constants/router";
import { useUpdateReadStatus } from "@/features/member/api/updateReadStatus";

interface Props {
  articleId: number;
  userId: number;
  isLoggedIn: boolean;
  readStatus: ArticleReadStatus;
}

export function ArticleReadStatusUpdater({ articleId, userId, isLoggedIn, readStatus }: Props) {
  const updateReadStatusMutation = useUpdateReadStatus();
  const router = useRouter();

  const handleUpdateReadStatus = (e: React.MouseEvent, readStatus: ArticleReadStatus) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push(ROUTER.LOGIN);
      return;
    }

    updateReadStatusMutation.mutate({
      memberId: userId,
      articleId,
      query: { readStatus },
    });
    notifications.show({ message: "읽기 상태가 수정되었어요", color: "green" });
  };

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
          <Menu.Item leftSection={<Book />} onClick={(e) => handleUpdateReadStatus(e, "UNREAD")}>
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
          <Menu.Item leftSection={<Book />} onClick={(e) => handleUpdateReadStatus(e, "UNREAD")}>
            읽기 해제
          </Menu.Item>
        </>
      );
    default:
      return null;
  }
}
