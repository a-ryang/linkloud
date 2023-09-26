import { PropsWithChildren } from "react";
import { RouteObject } from "react-router-dom";

function PrivateRoute({ children }: PropsWithChildren) {
  return children;
}

export const privateRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <PrivateRoute>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: ROUTE_PATH.LINK.REG,
        element: <LinksReg />,
      },
      {
        path: ROUTE_PATH.LIBRARY.LINKS,
        element: <LibraryLinks />,
      },
    ],
  },
];
