import { request } from 'umi';


/** 获取分类列表 GET /proxyip/page */
export async function fetchProxyIpPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 分组名称 */
    groupId?: string
    /** 分组名称 */
    ip?: string
    /** 分组名称 */
    type?: number
    /** 分组名称 */
    status?: number
  }
) {
  return request('/proxyip/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 新建规则 PUT /proxyip/update */
export async function updateProxyIp(params: Partial<API.ProxyIpListItem>) {
  return request('/proxyip/update', {
    method: 'PUT',
    data: {...params}
  });
}

/** 新建规则 POST /proxyip/save */
export async function addProxyIp(params: API.ProxyIpListItem) {
  return request('/proxyip/save', {
    method: 'POST',
    data: {...params}
  });
}

/** 删除规则 DELETE /proxyip/delete */
export async function removeProxyIp(params: {ids: number[]}) {
  return request('/proxyip/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
