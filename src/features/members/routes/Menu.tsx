import { Center, NavLink, Title } from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";
import useAuth from "@/features/auth/hooks/useAuth";
import ROUTES_PATH from "@/routes/routesPath";

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
        <div className="w-full max-w-xs">
          <div className="my-6">
            <Title ml="md">메뉴</Title>
          </div>
          <ul className="max-w-xs py-4 rounded-xl bg-white">
            {isLoggedIn && (
              <li className="px-1">
                <NavLink
                  href={ROUTES_PATH.LOGOUT}
                  label={"로그아웃"}
                  leftSection={<SignOut />}
                  className="rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                />
              </li>
            )}
            {!isLoggedIn && (
              <li className="px-1">
                <NavLink
                  href={ROUTES_PATH.LOGIN}
                  label={"로그인"}
                  leftSection={<SignIn />}
                  className="rounded-lg"
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
