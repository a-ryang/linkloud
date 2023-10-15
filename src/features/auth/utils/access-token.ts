import { LOCAL_TOKEN_KEY } from "@/constants/config";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/libs/local-storage";

export function getAccessToken() {
  return getFromLocalStorage<string>(LOCAL_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  return saveToLocalStorage(LOCAL_TOKEN_KEY, token);
}

export function clearAccessToken() {
  removeFromLocalStorage(LOCAL_TOKEN_KEY);
}
