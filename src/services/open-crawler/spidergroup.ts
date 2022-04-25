import { request } from 'umi';

export async function fetchGroup() {
  return request('/group/page', {
    method: 'GET',
  });
}

export async function updateGroup(params: Partial<API.SpiderGroup>) {
  return request('/group/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addGroup(params: API.SpiderGroup) {
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
