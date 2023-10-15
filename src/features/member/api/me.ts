import { get } from "@/libs/http-client";

export function me(token: string) {
  return get<Member>("/v1/member/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
