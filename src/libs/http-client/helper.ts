import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { refresh } from "@/features/auth/api/refresh";
import { setAccessToken } from "@/features/auth/utils";

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
export async function handleExpiredToken(e: unknown, request: InternalAxiosRequestConfig) {
  if (isRefreshing) {
    return handleApiRefreshing(e, request);
  }

  isRefreshing = true;

  return new Promise((resolve, reject) => {
    refresh()
      .then(({ accessToken }) => {
        setAccessToken(accessToken);

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

async function handleApiRefreshing(_e: unknown, request: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    // resolve, reject 함수를 넘겨 준후 processQueue 함수에서 이를 해결한다
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