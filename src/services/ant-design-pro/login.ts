import { request } from 'umi';

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
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
