"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

import { queryConfig } from "@/libs/react-query";

export default function QueryProviders({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: queryConfig }));

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
