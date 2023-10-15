import type { QueryClientConfig } from "@tanstack/react-query";

export const queryConfig: QueryClientConfig["defaultOptions"] = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};
