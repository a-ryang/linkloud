import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ROUTES_PATH from "@/routes/routesPath";

import useAuth from "./useAuth";

export default function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.invalidateQueries(["articles"]);
    notifications.show({ message: "로그아웃 되었어요" });
    navigate(ROUTES_PATH.HOME);
  };
}
