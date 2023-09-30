import { get } from "@/libs/api";

export function getMe(token: string) {
  return get<Member>("/v1/member/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
