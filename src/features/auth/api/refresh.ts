import { get } from "@/libs/http-client";

import { TokenResponse } from "./socialLogin";

export function refresh() {
  return get<TokenResponse>("/v1/auth/refresh");
}
