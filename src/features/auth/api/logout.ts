import { post } from "@/libs/http-client";

export function logout() {
  return post<void>("/v1/auth/logout");
}
