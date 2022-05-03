import { request } from 'umi';

export async function queryMenuTree() {
  return request<API.MenuData[]>('/sys/menu/tree');
}
