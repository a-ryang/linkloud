import { Center, NavLink, Title } from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";
import useAuth from "@/features/auth/hooks/useAuth";
import ROUTES_PATH from "@/routes/routesPath";

import classes from "./Menu.module.css";

export default function Menu() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES_PATH.HOME, { replace: true });
  };

  return (
    <>
      <SEO title="메뉴" />
      <Center mih="100%">
        <div className={classes.wrap}>
          <header className={classes.header}>
            <Title ml="md">메뉴</Title>
          </header>
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
        </div>
      </Center>
      <BottomNav />
    </>
  );
}
