import { request } from 'umi';

/** 登录接口 POST /login/list */
export async function login(body: API.LoginParams) {
  return request(`/login/${body.type}`, {
    method: 'POST',
    data: body,
  });
}


/** 发送图片验证码 */
export async function getFakeImageCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create/image', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}


/** 发送算数图片验证码 */
export async function getFakeMathImageCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create/mathImage', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 发送短信验证码 */
export async function getFakeSmsCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create/sms', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}
