import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUserSession } from "@/auth";
import ROUTER from "@/constants/router";
import { AuthForm } from "@/features/auth/components";

import classes from "./style.module.css";

export const metadata: Metadata = {
  title: "링클라우드 | 로그인",
  description: "간편하게 로그인하세요",
};

export default async function Login() {
  const session = await getUserSession();

  if (session) {
    redirect(ROUTER.HOME);
  }

  return (
    <div className={classes.wrap}>
      <AuthForm />
    </div>
  );
}
