import { Box, Loader } from "@mantine/core";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Deferrer from "../Deferrer";

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
            <div className="container mx-auto min-h-screen">
              <Loader type="dots" />
            </div>
          </Deferrer>
        }
      >
        <Outlet />
      </Suspense>
    </Box>
  );
}
