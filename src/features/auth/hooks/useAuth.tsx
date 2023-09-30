import { useContext } from "react";

import { AuthContext } from "../components/AuthProvider";

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Need Auth Provider");
  }

  return auth;
}
