import { useContext } from "react";

import { AuthContext } from "../components/auth-provider";

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Need Auth Provider");
  }

  return auth;
}
