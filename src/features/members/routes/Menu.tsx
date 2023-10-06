import { Center, NavLink } from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import AppShell from "@/components/Layout/AppShell";
import useAuth from "@/features/auth/hooks/useAuth";
import useLogout from "@/features/auth/hooks/useLogout";
import ROUTES_PATH from "@/routes/routesPath";

import classes from "./Menu.module.css";

export default function Menu() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleLogout = useLogout();

  return (
    <AppShell title="메뉴" ogTitle="메뉴">
      <Center w="100%">
        <ul className={classes["nav-list"]}>
          {isLoggedIn && (
            <li className={classes["nav-wrap"]}>
              <NavLink
                href={ROUTES_PATH.LOGOUT}
                label={"로그아웃"}
                leftSection={<SignOut />}
                className={classes.nav}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              />
            </li>
          )}
          {!isLoggedIn && (
            <li className={classes["nav-wrap"]}>
              <NavLink
                href={ROUTES_PATH.LOGIN}
                label={"로그인"}
                leftSection={<SignIn />}
                className={classes.nav}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(ROUTES_PATH.LOGIN);
                }}
              />
            </li>
          )}
        </ul>
      </Center>
    </AppShell>
  );
}
