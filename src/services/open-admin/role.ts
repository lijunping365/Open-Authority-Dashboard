import { request } from 'umi';

export async function queryRole(params?: API.TableListParams) {
  return request('/role/page', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRole(params: API.TableListItem) {
  return request('/role/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRole(params: Partial<API.TableListItem>) {
  return request('/role/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function allocResource(params?: Partial<API.RoleResourceData>) {
  return request('/roleResource/allocResource', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function allocMenu(params?: Partial<API.RoleMenuData>) {
  return request('/roleMenu/allocMenu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryMenu() {
  return request('/menu/tree');
}

export async function queryResource() {
  return request('/access/list');
}
