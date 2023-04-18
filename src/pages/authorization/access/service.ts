import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryResource(params?: TableListParams) {
  return request('/access/page', {
    params: { ...params, pageNum: params?.current },
  });
}

export async function removeResource(params: { key: number[] }) {
  return request('/access/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addResource(params: TableListItem) {
  return request('/access/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateResource(params: Partial<TableListItem>) {
  return request('/access/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
