import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import ROUTER from "@/constants/router";

import useAuth from "./useAuth";

/**
 * - 로그아웃 처리
 * - notification 로그아웃 되었어요
 * - home으로
 */
export default function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.invalidateQueries(["articles"]);
    notifications.show({ message: "로그아웃 되었어요" });
    router.push(ROUTER.HOME);
  };
}
