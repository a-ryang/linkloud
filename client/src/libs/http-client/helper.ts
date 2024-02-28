import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { COOKIE_ERROR_KEY } from "@/constants/config";
import { refresh } from "@/features/auth/api/refresh";
import { clearAccessToken, setAccessToken } from "@/features/auth/utils";

import { setCookie } from "../cookie";
import API_ERROR_MESSAGE from "../error/api-error-message";

import { instance } from ".";

interface FailedRequestQueueItem {
  resolve: (value?: unknown) => void;
  reject: (value?: unknown) => void;
}

class RefreshHelper {
  private isRefreshing: boolean;
  private failedApiQueue: FailedRequestQueueItem[] = [];

  constructor() {
    this.isRefreshing = false;
    this.failedApiQueue = [];
  }

  async handleExpiredAccessToken(error: unknown, request: InternalAxiosRequestConfig) {
    if (this.isRefreshing) {
      return this.pushToQueueWhileRefreshing(request);
    }

    this.isRefreshing = true;

    new Promise((resolve, reject) => {
      refresh()
        .then(({ accessToken }) => {
          setAccessToken(accessToken);

          request.headers.Authorization = `Bearer ${accessToken}`;

          this.processFailedQueue(null, accessToken);

          resolve(this.retryRequestWithInstance(request));
        })
        .catch((error) => {
          this.processFailedQueue(error, null);
          reject(error);
          if (error.message === API_ERROR_MESSAGE.RT_EXPIRED) {
            this.redirectToHomeWithAuthNotification();
          }
        });
    });
  }

  /** 토큰 갱신이 진행 중일 때 들어오는 요청들을 큐에 담는다 */
  private async pushToQueueWhileRefreshing(request: AxiosRequestConfig) {
    new Promise((resolve, reject) => {
      // resolve, reject 함수를 넘겨 준후 processQueue 함수에서 이를 해결한다
      this.failedApiQueue.push({ resolve, reject });
    })
      // failedApiQueue에서 resolve가 호출될 때
      .then((token) => {
        request.headers!.Authorization = `Bearer ${token}`;
        return this.retryRequestWithInstance(request);
      })
      // failedApiQueue에서 reject가 호출될 때
      .catch((error) => {
        return Promise.reject(error.message);
      });
  }

  /** 요청을 다시 시도 */
  private async retryRequestWithInstance(config: AxiosRequestConfig): Promise<unknown> {
    try {
      const response = await instance(config);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** refresh동안 보관된 실패한 요청을 처리 */
  private processFailedQueue(error: unknown, token: string | null) {
    this.failedApiQueue.forEach((request) => {
      if (error) {
        request.reject(error);
      } else {
        request.resolve(token);
      }
    });

    this.failedApiQueue = [];
  }

  private redirectToHomeWithAuthNotification() {
    this.isRefreshing = false;
    clearAccessToken();
    setCookie(COOKIE_ERROR_KEY, "로그인 기간이 오래되어 로그아웃 되었어요");
    window.location.href = "/";
  }
}

export const refreshHelper = new RefreshHelper();
