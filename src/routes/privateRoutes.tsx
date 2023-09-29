import { PropsWithChildren, lazy } from "react";
import { RouteObject } from "react-router-dom";

import Layout from "@/components/Layout/Layout";

import ROUTES_PATH from "./routesPath";

const MyArticles = lazy(() => import("@/features/members/routes/MyArticles"));
const CreateArticle = lazy(() => import("@/features/articles/routes/Create"));
const EditArticle = lazy(() => import("@/features/articles/routes/Edit"));

function PrivateRoute({ children }: PropsWithChildren) {
  return children;
}

const privateRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: ROUTES_PATH.MY_ARTICLES,
        element: <MyArticles />,
      },
      {
        path: ROUTES_PATH.CREATE_ARTICLE,
        element: <CreateArticle />,
      },
      {
        path: ROUTES_PATH.EDIT_ARTICLE,
        element: <EditArticle />,
      },
    ],
  },
];

export default privateRoutes;
