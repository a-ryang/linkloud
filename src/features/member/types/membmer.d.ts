declare interface Member {
  id: number;
  nickname: string;
  picture: string;
  role: Role;
}

declare type Role = "USER" | "NEW_MEMBER" | "MEMBER" | "ADMIN";
