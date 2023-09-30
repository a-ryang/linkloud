import { MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { GOOGLE_CLIENT_ID } from "./configs";
import AuthProvider from "./features/auth/components/AuthProvider";
import { queryClient } from "./libs/react-query";
import router from "./routes";
import theme, { resolver } from "./styles/theme";

export default function Providers() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} cssVariablesResolver={resolver}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </GoogleOAuthProvider>
        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
