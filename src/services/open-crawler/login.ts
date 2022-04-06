import { request } from 'umi';

/** 登录接口 POST /login/list */
export async function login(body: API.LoginParams) {
  return request(`/login/${body.type}`, {
    method: 'POST',
    data: body,
  });
}


/** 发送验证码 POST /validate/code/list */
export async function getFakeCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create', {
    method: 'POST',
    data: {
      ...params,
    },
    responseType: 'blob'
  });
}
