import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import Layout from "@/components/Layout/Layout";
import Menu from "@/features/members/routes/Menu";
import Home from "@/features/misc/routes/Home";

import ROUTES_PATH from "./routesPath";

const Login = lazy(() => import("@/features/auth/routes/Login"));
const NotFound = lazy(() => import("@/features/misc/routes/NotFound"));

const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: ROUTES_PATH.HOME,
        element: <Home />,
        index: true,
      },
      {
        path: ROUTES_PATH.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES_PATH.MENU,
        element: <Menu />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default publicRoutes;
