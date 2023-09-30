import { get } from "@/libs/api";

import { TokenResponse } from "../types";

export function refresh() {
  return get<TokenResponse>("/v1/auth/refresh");
}
