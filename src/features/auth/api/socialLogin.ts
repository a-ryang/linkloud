import { post } from "@/libs/api";

import { TokenResponse } from "../types";

type SocialType = "google";

export interface SocialLoginRequest {
  socialType: SocialType;
  code: string;
}

export function socialLogin({ socialType, code }: SocialLoginRequest) {
  return post<TokenResponse>(`/v1/auth/${socialType}`, { socialType, code });
}
