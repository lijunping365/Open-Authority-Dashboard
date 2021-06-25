import { request } from 'umi';
import {getAccessToken} from "@/utils/cache";

/** 登录接口 POST /login/type */
export async function login(body: API.LoginParams) {
  return request(`/login/${body.type}`, {
    method: 'POST',
    data: body,
  });
}

/** 退出登录接口 POST /login/outLogin */
export async function outLogin() {
  return request<Record<string, any>>('/login/outLogin', {
    method: 'POST',
    data: {accessToken: getAccessToken()}
  });
}


/** 发送验证码 POST /validate/code/type */
export async function getFakeCaptcha(params: Partial<API.CaptchaParams>) {
  return request(`/validate/code/${params.type}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
