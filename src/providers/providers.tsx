import { PropsWithChildren } from "react";

import { AuthProvider } from "@/features/auth/components";

import ErrorNotificationProvider from "./error-notification-provider";
import MantineProviders from "./mantine-providers";
import OauthProviders from "./oauth-provider";
import QueryProviders from "./query-providers";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProviders>
      <MantineProviders>
        <OauthProviders>
          <AuthProvider>
            <ErrorNotificationProvider>{children}</ErrorNotificationProvider>
          </AuthProvider>
        </OauthProviders>
      </MantineProviders>
    </QueryProviders>
  );
}
