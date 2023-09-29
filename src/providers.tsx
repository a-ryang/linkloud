import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "./libs/react-query";
import router from "./routes";
import theme, { resolver } from "./styles/theme";

export default function Providers() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} cssVariablesResolver={resolver}>
          <RouterProvider router={router} />
        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
