"use client";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";

import theme, { resolver } from "@/styles/theme";

export default function MantineProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <ModalsProvider>
        <Notifications position="top-center" />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
