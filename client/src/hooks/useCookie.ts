import { useState } from "react";

import { CookieOptions, getCookie, removeCookie, setCookie } from "@/libs/cookie";

interface UseCookie<T> {
  key: string;
  /** JSON */
  initialValue?: T;
}

export default function useCookie<T>({ key, initialValue }: UseCookie<T>) {
  const [value, setValue] = useState<T | null>(getCookie(key, initialValue));

  const updateCookie = (value: T, options?: CookieOptions) => {
    setValue(value);
    setCookie(key, value, options);
  };

  const clearCookie = () => {
    setValue(null);
    removeCookie(key);
  };

  return { value, updateCookie, clearCookie };
}
