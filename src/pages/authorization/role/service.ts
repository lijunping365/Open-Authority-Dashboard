import { request } from 'umi';
import { TableListParams, TableListItem, RoleResourceData, RoleMenuData } from './data';

export async function queryRole(params?: TableListParams) {
  return request('/sys/role/page', {
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

export async function addRole(params: TableListItem) {
  return request('/sys/role/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRole(params: Partial<TableListItem>) {
  return request('/sys/role/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function allocResource(params?: Partial<RoleResourceData>) {
  return request('/sys/roleResource/allocResource', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function allocMenu(params?: Partial<RoleMenuData>) {
  return request('/sys/roleMenu/allocMenu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryMenu() {
  return request('/sys/menu/treeList?total=1');
}

export async function queryResource() {
  return request('/sys/resource/list?total=1');
}
