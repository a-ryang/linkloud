import { post } from "@/libs/http-client";

export interface SocialLoginDto {
  socialType: SocialType;
  code: string;
}

export interface TokenResponse {
  accessToken: string;
}

export function socialLogin({ socialType, code }: SocialLoginDto) {
  return post<TokenResponse>(`/v1/auth/${socialType}`, { socialType, code });
}
