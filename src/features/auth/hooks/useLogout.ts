import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

import ROUTES_PATH from "@/routes/routesPath";

import useAuth from "./useAuth";

export default function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return () => {
    logout();
    notifications.show({ message: "로그아웃 되었어요" });
    navigate(ROUTES_PATH.HOME, { replace: true });
  };
}
