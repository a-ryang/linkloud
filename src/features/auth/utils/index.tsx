import { LOCAL_TOKEN_KEY } from "@/configs";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/libs/stroage/localStorage";

export function getAccessToken() {
  return getFromLocalStorage<string>(LOCAL_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  return saveToLocalStorage(LOCAL_TOKEN_KEY, token);
}

export function clearAccessToken() {
  removeFromLocalStorage(LOCAL_TOKEN_KEY);
}
