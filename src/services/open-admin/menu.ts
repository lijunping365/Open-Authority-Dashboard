import { request } from 'umi';

export async function queryMenuTree() {
  return request<API.MenuData[]>('/menu/tree');
}
