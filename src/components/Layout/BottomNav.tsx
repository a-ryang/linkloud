import { ActionIcon, Tooltip } from "@mantine/core";
import { House, Link, List, Plus } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";

import ROUTES_PATH from "@/routes/routesPath";

export default function BottomNav() {
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  // const handleClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  // };

  return (
    <nav className="fixed bottom-0 w-full pt-1 pb-2 px-4 border-t border-border bg-white z-10">
      <ul className="container mx-auto flex justify-between gap-1">
        {items.map((item) => (
          <li key={item.id} className="w-full">
            <Tooltip label={item.name}>
              <ActionIcon
                component="a"
                href={item.href}
                size="lg"
                w="100%"
                variant={pathname === item.href ? "filled" : "subtle"}
                // onClick={(e) => {
                //   e.preventDefault();
                //   handleClick()
                // }}
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
