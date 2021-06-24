import { request } from 'umi';
import { setAccessToken, setRefreshToken } from '@/utils/cache';
import { refreshAppToken } from '@/services/ant-design-pro/api';
import { RequestOptionsInit } from 'umi-request';
import {HTTP_URL} from "../../config/env.config";

export const refreshToken = () => {
  return new Promise((resolve, reject) => {
    refreshAppToken()
      .then((res: any) => {
        if (res) {
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          resolve(res);
        }
      })
      .catch(() => {
        reject();
      });
  });
};

let retryRequest: any[] = []; // 存放当 token 过期之后，正在刷新 token 是发送来的请求
let isRefresh = false; // 是否在刷新 token

/**
 * 用于刷新 token
 * @param response
 * @param options
 */
export const onRefreshToken = (response: Response, options: RequestOptionsInit) => {
  const o: any = options;
  if (!isRefresh) {
    isRefresh = true;
    // 这里是去请求新的token 并返回promise 然后保存新的token
    return refreshToken().then((res: any) => {
      retryRequest.forEach((cb) => {
        cb(res.accessToken);
      });
      isRefresh = false;
      retryRequest = [];
      o.headers.Authorization = `Bearer ${res.accessToken}`;
      return request(response.url.replace(`${HTTP_URL}`, ''), options);
    });
  }
  return new Promise<Response>((resolve) => {
    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    retryRequest.push((accessToken: string) => {
      o.headers.Authorization = `Bearer ${accessToken}`;
      resolve(request(response.url.replace(`${HTTP_URL}`, ''), options));
    });
  });
};
