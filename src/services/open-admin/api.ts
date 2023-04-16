import { request } from 'umi';

/** 获取当前的用户 GET /user/currentUser */
export async function queryCurrentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function queryUserMenu() {
  return request<API.MenuData[]>('/user/getUserMenus');
}
