import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Deferrer from "@/components/Deferrer";
import Spinner from "@/components/Spinner";
import { LOCAL_TOKEN_KEY } from "@/configs";
import { getMe } from "@/features/members/api/getMe";
import ApiError from "@/libs/error/ApiError";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/libs/stroage/localStorage";

import { logout as logoutReqeust } from "../api/logout";
import {
  SocialLoginRequest,
  socialLogin as socialLoginRequest,
} from "../api/socialLogin";
import getToken from "../utils/getToken";

const INITIAL_USER: Member = { id: 0, nickname: "", picture: "", role: "USER" };

interface AuthState {
  user: Member;
  token?: string;
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
  token: "",
  error: undefined,
  isLoggedIn: false,
  isLoading: true,
  socialLogin: async () => console.log("google login"),
  logout: async () => console.log("logout"),
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({ ...INITIAL_USER });
  const [token, setToken] = useState(
    getFromLocalStorage<string>(LOCAL_TOKEN_KEY) ?? "",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMountedRef = useRef(false);

  const socialLogin = async (data: SocialLoginRequest) => {
    try {
      setIsLoading(true);

      const { accessToken } = await socialLoginRequest(data);
      const user = await getMe(accessToken);

      saveToLocalStorage(LOCAL_TOKEN_KEY, accessToken);
      setToken(accessToken);
      setUser(user);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    removeFromLocalStorage(LOCAL_TOKEN_KEY);
    setToken("");
    setUser({ ...INITIAL_USER });
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

    const token = getToken() ?? "";
    init(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
