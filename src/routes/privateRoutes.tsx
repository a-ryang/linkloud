import { PropsWithChildren, lazy, useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";

import Layout from "@/components/Layout/Layout";
import useAuth from "@/features/auth/hooks/useAuth";

import ROUTES_PATH from "./routesPath";

const MyArticles = lazy(() => import("@/features/members/routes/MyArticles"));
const CreateArticle = lazy(() => import("@/features/articles/routes/Create"));
const EditArticle = lazy(() => import("@/features/articles/routes/Edit"));

function PrivateRoute({ children }: PropsWithChildren) {
  const { isLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES_PATH.LOGIN);
    }
  }, [isLoggedIn, navigate]);

  if (isLoading) return null;
  if (!isLoggedIn) return null;

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
