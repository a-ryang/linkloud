"use client";

import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { COOKIE_ERROR_KEY } from "@/constants/config";
import useCookie from "@/hooks/useCookie";

export default function ErrorNotificationProvider({ children }: PropsWithChildren) {
  const { value: error, clearCookie } = useCookie<string>({ key: COOKIE_ERROR_KEY });
  const router = useRouter();

  useEffect(() => {
    if (error) {
      notifications.show({ message: error, color: "red" });
      clearCookie();
    }
  }, [error, router, clearCookie]);

  return <>{children}</>;
}
