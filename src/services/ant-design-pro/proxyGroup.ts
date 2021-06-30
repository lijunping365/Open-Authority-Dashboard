import { request } from 'umi';


/** 获取分类列表 GET /proxygroup/page */
export async function fetchProxyGroupPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 分组名称 */
    name?: string
  }
) {
  return request('/proxygroup/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 新建规则 PUT /proxygroup/update */
export async function updateProxyGroup(params: Partial<API.ProxyGroupListItem>) {
  return request('/proxygroup/update', {
    method: 'PUT',
    data: {...params}
  });
}

/** 新建规则 POST /proxygroup/save */
export async function addProxyGroup(params: API.ProxyGroupListItem) {
  return request('/proxygroup/save', {
    method: 'POST',
    data: {...params}
  });
}

/** 删除规则 DELETE /proxygroup/delete */
export async function removeProxyGroup(params: {ids: number[]}) {
  return request('/proxygroup/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
