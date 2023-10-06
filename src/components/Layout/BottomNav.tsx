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
        <House weight="fill" size={28} />
      </>,
      <>
        <House size={28} />
      </>,
    ],
  },
  {
    id: "my-links",
    name: "내 링크",
    href: ROUTES_PATH.MY_ARTICLES,
    icons: [
      <>
        <Link weight="fill" size={28} />
      </>,
      <>
        <Link size={28} />
      </>,
    ],
  },
  {
    id: "create-links",
    name: "링크 등록",
    href: ROUTES_PATH.CREATE_ARTICLE,
    icons: [
      <>
        <Plus weight="fill" size={28} />
      </>,
      <>
        <Plus size={28} />
      </>,
    ],
  },
  {
    id: "menu",
    name: "메뉴",
    href: ROUTES_PATH.MENU,
    icons: [
      <>
        <List weight="fill" size={28} />
      </>,
      <>
        <List size={28} />
      </>,
    ],
  },
];
