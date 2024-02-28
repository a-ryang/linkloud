"use client";

import { PropsWithChildren, createContext, useEffect, useRef, useState } from "react";

import { Deferrer } from "@/components/deferrer";
import { Loader } from "@/components/loader";
import { me } from "@/features/member/api/me";
import { ApiError } from "@/libs/error";

import { logout as logoutApi } from "../api/logout";
import { SocialLoginDto, socialLogin as socialLoginApi } from "../api/socialLogin";
import { clearAccessToken, getAccessToken, setAccessToken } from "../utils";

const INITIAL_USER: Member = { id: 0, nickname: "", picture: "", role: "USER" };

interface State {
  user: Member;
  error?: Error;
  isLoggedIn: boolean;
  isLoading: boolean;
}

interface Action {
  socialLogin: (dto: SocialLoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<State & Action>({
  user: { ...INITIAL_USER },
  error: undefined,
  isLoggedIn: false,
  isLoading: true,
  socialLogin: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({ ...INITIAL_USER });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMounted = useRef(false);

  const socialLogin = async (data: SocialLoginDto) => {
    try {
      setIsLoading(true);

      const { accessToken } = await socialLoginApi(data);
      const user = await me(accessToken);

      setAccessToken(accessToken);
      setUser(user);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    clearAccessToken();
    setUser({ ...INITIAL_USER });
    setIsLoggedIn(false);
    await logoutApi();
  };

  useEffect(() => {
    const init = async (token: string) => {
      // for StrictMode
      if (isMounted.current) return;
      isMounted.current = true;

      try {
        const user = await me(token);

        setUser(user);
        setIsLoggedIn(true);
      } catch (e) {
        clearAccessToken();
      } finally {
        setIsLoading(false);
      }
    };

    const token = getAccessToken() ?? "";
    if (!token || token.length === 0) {
      setIsLoading(false);
      return;
    }

    init(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        socialLogin,
        logout,
      }}
    >
      {isLoading && (
        <Deferrer>
          <Loader />
        </Deferrer>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
