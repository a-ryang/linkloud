import { Box } from "@mantine/core";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Deferrer from "../Deferrer";
import GlobalErrorBoundary from "../Errors/GlobalErrorBoundary";
import Spinner from "../Spinner";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box component="main" mih="100vh" bg="gray.1">
      <Suspense
        fallback={
          <Deferrer>
            <Spinner />
          </Deferrer>
        }
      >
        <GlobalErrorBoundary>
          <Outlet />
        </GlobalErrorBoundary>
      </Suspense>
    </Box>
  );
}
