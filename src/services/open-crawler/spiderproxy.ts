import { request } from 'umi';

export async function fetchProxyPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 分组名称 */
    groupId?: any
    /** 分组名称 */
    host?: string
    /** 1:http | 2:https */
    scheme?: number
    /** 分组名称 */
    status?: number
  }
) {
  return request('/proxy/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateProxy(params: Partial<API.SpiderProxy>) {
  return request('/proxy/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addProxy(params: API.SpiderProxy) {
  return request('/proxy/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeProxy(params: {ids: number[]}) {
  return request('/proxy/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
