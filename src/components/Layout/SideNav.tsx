import { Button, Tooltip } from "@mantine/core";
import { House, Link, Plus, SignIn, SignOut } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "@/features/auth/hooks/useAuth";
import useLogout from "@/features/auth/hooks/useLogout";
import ROUTES_PATH from "@/routes/routesPath";

import LogoIcon from "../Icons/LogoIcon";

import classes from "./SideNav.module.css";

const ICON_SIZE = 28;

export default function SideNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleLogout = useLogout();

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
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES_PATH.LOGIN);
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
        <ul className={classes["nav-list"]}>
          <Logo />
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
                  classNames={{ inner: classes["nav-item"] }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                  }}
                >
                  {pathname === item.href ? item.icons[0] : item.icons[1]}
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

const Logo = () => {
  const navigate = useNavigate();
  return (
    <li>
      <h1>
        <Button
          variant="transparent"
          size="lg"
          component="a"
          fullWidth
          href={ROUTES_PATH.HOME}
          onClick={(e) => {
            e.preventDefault();
            navigate(ROUTES_PATH.HOME);
          }}
        >
          <LogoIcon size={50} />
        </Button>
      </h1>
    </li>
  );
};

const items = [
  {
    id: "home",
    name: "홈",
    href: ROUTES_PATH.HOME,
    icons: [
      <>
        <House weight="fill" size={ICON_SIZE} />
      </>,
      <>
        <House size={ICON_SIZE} />
      </>,
    ],
  },
  {
    id: "my-links",
    name: "내 링크",
    href: ROUTES_PATH.MY_ARTICLES,
    icons: [
      <>
        <Link weight="fill" size={ICON_SIZE} />
      </>,
      <>
        <Link size={ICON_SIZE} />
      </>,
    ],
  },
  {
    id: "create-links",
    name: "링크 등록",
    href: ROUTES_PATH.CREATE_ARTICLE,
    icons: [
      <>
        <Plus weight="fill" size={ICON_SIZE} />
      </>,
      <>
        <Plus size={ICON_SIZE} />
      </>,
    ],
  },
];
