import { LOCAL_TOKEN_KEY } from "@/configs";
import { saveToLocalStorage } from "@/libs/stroage/localStorage";

export default function setToken(token: string) {
  return saveToLocalStorage(LOCAL_TOKEN_KEY, token);
}
