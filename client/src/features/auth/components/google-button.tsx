"use client";

import { Button, Text } from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { GoogleLogo } from "@/components/icons/google-logo";
import ROUTER from "@/constants/router";

import useAuth from "../hooks/useAuth";

export function GoogleButton() {
  const { socialLogin } = useAuth();
  const router = useRouter();
  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await socialLogin({
          socialType: "google",
          code: codeResponse.code,
        });
        router.replace(ROUTER.HOME);
      } catch (e) {
        console.error(e);
      }
    },
    flow: "auth-code",
  });

  return (
    <Button fullWidth variant="default" radius="md" size="lg" onClick={handleLogin}>
      <GoogleLogo />
      <Text ml="md" size="sm">
        구글로 시작하기
      </Text>
    </Button>
  );
}
