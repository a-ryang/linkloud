import { AuthForm } from "@/features/auth/components";

import classes from "./style.module.css";

export default async function Login() {
  return (
    <div className={classes.wrap}>
      <AuthForm />
    </div>
  );
}
