import { Center, NavLink, Title } from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";
import ROUTES_PATH from "@/routes/routesPath";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="메뉴" />
      <Center mih="100%">
        <div className="w-full max-w-xs">
          <div className="my-6">
            <Title ml="md">메뉴</Title>
          </div>
          <ul className="max-w-xs py-4 rounded-xl bg-white">
            {items.map((item) => (
              <li key={item.label}>
                <NavLink
                  href={item.herf}
                  label={item.label}
                  leftSection={item.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.herf);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Center>
      <BottomNav />
    </>
  );
}

const items = [
  {
    label: "로그인",
    icon: <SignIn />,
    herf: ROUTES_PATH.LOGIN,
    needAuth: false,
  },
  {
    label: "로그아웃",
    icon: <SignOut />,
    herf: ROUTES_PATH.LOGOUT,
    needAuth: true,
  },
];
