"use client";

import { NavLink } from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import ROUTER from "@/constants/router";
import useAuth from "@/features/auth/hooks/useAuth";
import useLogout from "@/features/auth/hooks/useLogout";

import classes from "./menu-list.module.css";

export function MenuList() {
  const { isLoggedIn } = useAuth();
  const handleLogout = useLogout();
  const router = useRouter();

  return (
    <ul className={classes["nav-list"]}>
      {isLoggedIn && (
        <li className={classes["nav-wrap"]}>
          <NavLink
            href={ROUTER.LOGOUT}
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
            href={ROUTER.LOGIN}
            label={"로그인"}
            leftSection={<SignIn />}
            className={classes.nav}
            onClick={(e) => {
              e.preventDefault();
              router.push(ROUTER.LOGIN);
            }}
          />
        </li>
      )}
    </ul>
  );
}
