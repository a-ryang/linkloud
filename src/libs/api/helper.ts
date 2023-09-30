import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { refresh } from "@/features/auth/api/refresh";
import setToken from "@/features/auth/utils/setToken";

import { instance } from ".";

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (value?: unknown) => void;
}

let failedApiQueue: QueueItem[] = [];

function processQueue(e: unknown, token: string | null) {
  failedApiQueue.forEach((req) => {
    if (e) {
      req.reject(e);
    } else {
      req.resolve(token);
    }
  });

  failedApiQueue = [];
}

async function requestWithInstance(config: AxiosRequestConfig) {
  try {
    const response = await instance(config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

let isRefreshing = false;

/** 토큰 만료 처리 */
export async function handleExpiredToken(
  e: unknown,
  request: InternalAxiosRequestConfig,
) {
  if (isRefreshing) {
    return handleApiRefreshing(e, request);
  }

  isRefreshing = true;

  return new Promise((resolve, reject) => {
    refresh()
      .then(({ accessToken }) => {
        setToken(accessToken);

        request.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        resolve(requestWithInstance(request));
      })
      .catch((err) => {
        processQueue(err, null);
        reject(err);
      });
  });
}

async function handleApiRefreshing(e: unknown, request: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    failedApiQueue.push({ resolve, reject });
  })
    .then((token) => {
      request.headers!.Authorization = `Bearer ${token}`;
      return requestWithInstance(request);
    })
    .catch((error) => {
      return Promise.reject(error.message);
    });
}
