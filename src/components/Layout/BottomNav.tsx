import { ActionIcon, Tooltip } from "@mantine/core";
import { House, Link, List, Plus } from "@phosphor-icons/react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

import ROUTES_PATH from "@/routes/routesPath";

import classes from "./BottomNav.module.css";

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={classes["bottom-nav"]}>
      <ul className={clsx(classes["nav-list"], "container")}>
        {items.map((item) => (
          <li key={item.id} className="w-full">
            <Tooltip label={item.name}>
              <ActionIcon
                component="a"
                href={item.href}
                size="lg"
                w="100%"
                variant={pathname === item.href ? "filled" : "subtle"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
              >
                <span className="sr-only">{item.name}</span>
                {pathname === item.href ? item.icons[0] : item.icons[1]}
              </ActionIcon>
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const items = [
  {
    id: "home",
    name: "홈",
    href: ROUTES_PATH.HOME,
    icons: [
      <>
        <House weight="fill" />
      </>,
      <>
        <House />
      </>,
    ],
  },
  {
    id: "my-links",
    name: "내 링크",
    href: ROUTES_PATH.MY_ARTICLES,
    icons: [
      <>
        <Link weight="fill" />
      </>,
      <>
        <Link />
      </>,
    ],
  },
  {
    id: "create-links",
    name: "링크 등록",
    href: ROUTES_PATH.CREATE_ARTICLE,
    icons: [
      <>
        <Plus weight="fill" />
      </>,
      <>
        <Plus />
      </>,
    ],
  },
  {
    id: "menu",
    name: "메뉴",
    href: ROUTES_PATH.MENU,
    icons: [
      <>
        <List weight="fill" />
      </>,
      <>
        <List />
      </>,
    ],
  },
];
