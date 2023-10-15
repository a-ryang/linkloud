"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { House, Link, List, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import ROUTER from "@/constants/router";

import classes from "./bottom-nav.module.css";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

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
      {
        id: "menu",
        name: "메뉴",
        href: ROUTER.MENU,
        icon: <List weight={pathname === ROUTER.MENU ? "fill" : "regular"} size={28} />,
      },
    ],
    [pathname],
  );

  return (
    <nav className={classes["bottom-nav"]}>
      <h1 className="sr-only">하단 네비게이션</h1>
      <ul className={clsx(classes["nav-list"], "container")}>
        {items.map((item) => (
          <li key={item.id} className="w-full">
            <Tooltip label={item.name}>
              <ActionIcon
                component="a"
                href={item.href}
                size="lg"
                w="100%"
                variant="subtle"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
              >
                <span className="sr-only">{item.name}</span>
                {item.icon}
              </ActionIcon>
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  );
}
