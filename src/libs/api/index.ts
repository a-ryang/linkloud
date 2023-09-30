import axios from "axios";
import * as qs from "qs";

import { getAccessToken } from "@/features/auth/utils";

import ApiError from "../error/ApiError";
import BaseError from "../error/BaseError";

import { handleExpiredToken } from "./helper";

export const instance = axios.create({
  baseURL: "/api",
  timeout: 3 * 1000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    const status = response.status;
    if (status >= 200 && status < 300) {
      return response.data;
    }

    return Promise.reject(response.data);
  },
  (e) => {
    if (e.response?.data?.["message"]) {
      const request = e.config;
      const message = e.response?.data?.["message"] as string;

      console.log("message ", message);

      if (message === "Expired access token") {
        handleExpiredToken(e, request);
        return;
      }

      return Promise.reject(
        new ApiError(e.response.data?.["message"], e.response.status),
      );
    }

    if (e.message.startsWith("timeout")) {
      return Promise.reject(new BaseError("Timeout Error", "Network timeout"));
    }

    return Promise.reject(new BaseError("Unknown Error", e.message));
  },
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
