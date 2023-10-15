"use client";

import { Button, Center } from "@mantine/core";
import Link from "next/link";

import ROUTER from "@/constants/router";

import classes from "./not-found.module.css";

export default function NotFound() {
  return (
    <Center mih="100vh">
      <div className={classes.wrap}>
        <div className={classes["error-code"]}>404</div>
        <h1 className={classes.message}>존재하지 않는 페이지입니다</h1>
        <div>
          <Link href={ROUTER.HOME} legacyBehavior>
            <Button component="a" href={ROUTER.HOME}>
              홈으로
            </Button>
          </Link>
        </div>
      </div>
    </Center>
  );
}
