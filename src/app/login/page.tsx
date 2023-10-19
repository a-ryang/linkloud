import { Metadata } from "next";

import { AuthForm } from "@/features/auth/components";

import classes from "./style.module.css";

export const metadata: Metadata = {
  title: "링클라우드 | 로그인",
  description: "간편하게 로그인하세요",
};

export default function Login() {
  return (
    <div className={classes.wrap}>
      <AuthForm />
    </div>
  );
}
