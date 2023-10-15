"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import ROUTER from "@/constants/router";
import useAuth from "@/features/auth/hooks/useAuth";

export default function PrivateLayout({ children }: PropsWithChildren) {
  const { isLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTER.LOGIN);
    }
  }, [isLoggedIn, router]);

  if (isLoading) return null;
  if (!isLoggedIn) return null;

  return children;
}
