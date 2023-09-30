/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_LOCAL_TOKEN_KEY: string;
}

// business
interface Member {
  id: number;
  nickname: string;
  picture: string;
  role: MemberRole;
}

type MemberRole = "USER" | "NEW_MEMBER" | "MEMBER" | "ADMIN";
