import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryMenu(params?: TableListParams) {
  return request('/sys/menu/treeList', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/sys/menu/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addMenu(params: TableListItem) {
  return request('/sys/menu/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateMenu(params: Partial<TableListItem>) {
  return request('/sys/menu/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
