import isBrowser from "@/utils/is-browser";

export interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  SameSite?: "None" | "Lax" | "Strict";
  Secure?: boolean;
  HttpOnly?: boolean;
}

export function getCookie<T>(key: string, initialValue?: T): T | null {
  if (!isBrowser) {
    return initialValue ?? null;
  }

  const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(key + "="));

  if (!cookieValue) {
    return initialValue ?? null;
  }

  try {
    const value = cookieValue.split("=")[1];
    const decodedValue = decodeURIComponent(value);

    if (decodedValue.startsWith("{") || decodedValue.startsWith("[")) {
      return JSON.parse(decodedValue) as T; // JSON 형식인지 확인하고, 아니면 디코딩된 값을 그대로 반환
    } else {
      return decodedValue as unknown as T; // JSON이 아닌 경우, 문자열을 그대로 반환
    }
  } catch {
    return initialValue ?? null;
  }
}

export function setCookie<T>(key: string, value: T, options?: CookieOptions) {
  if (!isBrowser) return;

  const stringValue = JSON.stringify(value);

  const optionsWithDefaults = {
    days: 7,
    path: "/",
    ...options,
  };

  const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString();

  document.cookie =
    key +
    "=" +
    encodeURIComponent(stringValue) +
    "; expires=" +
    expires +
    stringifyOptions(optionsWithDefaults);
}

export function removeCookie(key: string, options?: CookieOptions) {
  if (!isBrowser) return;

  document.cookie =
    key +
    "=; Max-Age=-99999999;" +
    stringifyOptions({
      ...options,
      path: "/",
    });
}

function stringifyOptions(options: CookieOptions): string {
  return Object.entries(options)
    .filter(([key]) => key !== "days")
    .map(([key, value]) => {
      if (value === false) {
        return ""; // false 값은 무시
      } else if (value === true) {
        return `${key}`; // true 값은 키만 반환
      } else {
        return `${key}=${value}`; // 그 외의 경우, "key=value" 형태로 반환
      }
    })
    .filter(Boolean) // 빈 문자열 제거
    .join("; "); // 모든 값을 세미콜론으로 구분된 하나의 문자열로 결합
}
