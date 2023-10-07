import { post } from "@/libs/api";

export function logout() {
  return post<void>("/v1/auth/logout");
}
