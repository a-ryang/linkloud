import { LOCAL_TOKEN_KEY } from "@/configs";
import { getFromLocalStorage } from "@/libs/stroage/localStorage";

export default function getToken() {
  return getFromLocalStorage<string>(LOCAL_TOKEN_KEY);
}
