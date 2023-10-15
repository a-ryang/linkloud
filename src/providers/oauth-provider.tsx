"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { PropsWithChildren } from "react";

import { GOOGLE_CLIENT_ID } from "@/constants/config";

export default function OauthProviders({ children }: PropsWithChildren) {
  return <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>;
}
