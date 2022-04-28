import { request } from 'umi';

export async function fetchGroupPage(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request('/group/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchGroupTree() {
  return request('/group/tree', {
    method: 'GET',
  });
}


export async function updateGroup(params: Partial<API.SpiderGroup>) {
  return request('/group/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addGroup(params: Partial<API.SpiderGroup>) {
  return request('/group/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeGroup(params: {ids: number[]}) {
  return request('/group/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
