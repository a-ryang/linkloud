import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Deferrer from "@/components/Deferrer";
import Spinner from "@/components/Spinner";
import { getMe } from "@/features/members/api/getMe";
import ApiError from "@/libs/error/ApiError";

import { logout as logoutReqeust } from "../api/logout";
import {
  SocialLoginRequest,
  socialLogin as socialLoginRequest,
} from "../api/socialLogin";
import { clearAccessToken, getAccessToken, setAccessToken } from "../utils";

const INITIAL_USER: Member = { id: 0, nickname: "", picture: "", role: "USER" };

interface AuthState {
  user: Member;
  error?: Error;
  isLoggedIn: boolean;
  isLoading: boolean;
}

interface AuthAction {
  socialLogin: (dto: SocialLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthState & AuthAction>({
  user: { ...INITIAL_USER },
  error: undefined,
  isLoggedIn: false,
  isLoading: true,
  socialLogin: async () => console.log("google login"),
  logout: async () => console.log("logout"),
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({ ...INITIAL_USER });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMountedRef = useRef(false);

  const socialLogin = async (data: SocialLoginRequest) => {
    try {
      setIsLoading(true);

      const { accessToken } = await socialLoginRequest(data);
      const user = await getMe(accessToken);

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
    await logoutReqeust();
  };

  useEffect(() => {
    const init = async (token?: string) => {
      // StrictMode 방지
      if (isMountedRef.current) return;
      isMountedRef.current = true;

      // local storage에 토큰 없음
      if (!token || token.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getMe(token);

        setUser(user);
        setIsLoggedIn(true);
      } catch (e) {
        console.error(e);
        if (e instanceof Error && e.message === "Expired refresh token") {
          throw new ApiError("로그인 기간이 오래되어 로그아웃 처리되었어요");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const token = getAccessToken() ?? "";
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
          <Spinner />
        </Deferrer>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
