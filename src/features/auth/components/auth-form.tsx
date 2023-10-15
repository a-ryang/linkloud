"use client";

import { Container, Title, Image, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ROUTER from "@/constants/router";

import useAuth from "../hooks/useAuth";

import classes from "./auth-form.module.css";

import { GoogleButton } from ".";

export function AuthForm() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(ROUTER.HOME);
    }
  }, [isLoggedIn, router]);

  return (
    <Container size="lg">
      <div className={classes.inner}>
        <div className={classes.content}>
          <h1 className={classes.logo}>
            <Link href={ROUTER.HOME}>
              <Image src="/images/logo.svg" height={36} width={220} alt="linkloud" />
              <span className="sr-only">링클라우드</span>
            </Link>
          </h1>

          <Title order={2} className={classes.title}>
            유용한{" "}
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: "blue", to: "linkloudBlue" }}
            >
              링크
            </Text>
            를 공유하고 관리하세요
          </Title>

          <div className={classes["social-login"]}>
            <GoogleButton />
          </div>
        </div>
      </div>
    </Container>
  );
}
