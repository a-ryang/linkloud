"use client";
import { Button, Tooltip } from "@mantine/core";
import { House, Link, MagnifyingGlass, Plus, SignIn, SignOut } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import ROUTER from "@/constants/router";
import useAuth from "@/features/auth/hooks/useAuth";
import useLogout from "@/features/auth/hooks/useLogout";

import { LogoLink } from "./logo-link";
import classes from "./sidebar.module.css";

const ICON_SIZE = 28;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const handleLogout = useLogout();

  const items = useMemo(
    () => [
      {
        id: "home",
        name: "홈",
        href: ROUTER.HOME,
        icon: <House weight={pathname === ROUTER.HOME ? "fill" : "regular"} size={28} />,
      },
      {
        id: "search",
        name: "검색",
        href: ROUTER.SEARCH,
        icon: (
          <MagnifyingGlass weight={pathname === ROUTER.SEARCH ? "bold" : "regular"} size={28} />
        ),
      },
      {
        id: "my-links",
        name: "내 링크",
        href: ROUTER.MY_ARTICLES,
        icon: <Link weight={pathname === ROUTER.MY_ARTICLES ? "fill" : "regular"} size={28} />,
      },
      {
        id: "create-links",
        name: "링크 등록",
        href: ROUTER.CREATE_ARTICLE,
        icon: <Plus weight={pathname === ROUTER.CREATE_ARTICLE ? "fill" : "regular"} size={28} />,
      },
    ],
    [pathname],
  );

  const RenderAuth = () => {
    if (isLoggedIn) {
      return (
        <li>
          <Tooltip label="로그아웃" openDelay={300}>
            <Button
              variant="subtle"
              color="default"
              size="lg"
              component="a"
              fullWidth
              radius="md"
              href={ROUTER.LOGOUT}
              classNames={{ inner: classes["nav-item"] }}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <SignOut size={ICON_SIZE} />
              <span className={classes["nav-item-label"]}>로그아웃</span>
            </Button>
          </Tooltip>
        </li>
      );
    }

    return (
      <li>
        <Tooltip label="로그인" openDelay={300}>
          <Button
            variant="subtle"
            color="default"
            size="lg"
            component="a"
            fullWidth
            radius="md"
            classNames={{ inner: classes["nav-item"] }}
            href={ROUTER.LOGIN}
            onClick={(e) => {
              e.preventDefault();
              router.push(ROUTER.LOGIN);
            }}
          >
            <SignIn size={ICON_SIZE} />
            <span className={classes["nav-item-label"]}>로그인</span>
          </Button>
        </Tooltip>
      </li>
    );
  };

  return (
    <aside className={classes.sidebar}>
      <h1 className="sr-only">사이드바</h1>
      <nav className={classes.nav}>
        <h1 className="sr-only">네비게이션</h1>
        <ul className={classes["nav-list"]}>
          <LogoLink />
          {items.map((item) => (
            <li key={item.id}>
              <Tooltip label={item.name} openDelay={300}>
                <Button
                  variant="subtle"
                  color="default"
                  size="lg"
                  component="a"
                  fullWidth
                  radius="md"
                  href={item.href}
                  classNames={{ inner: classes["nav-item"] }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.href);
                  }}
                >
                  {item.icon}
                  <span className={classes["nav-item-label"]}>{item.name}</span>
                </Button>
              </Tooltip>
            </li>
          ))}
          {RenderAuth()}
        </ul>
      </nav>
    </aside>
  );
}
