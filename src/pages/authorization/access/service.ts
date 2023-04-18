import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryResource(params?: TableListParams) {
  return request('/sys/resource/page', {
    params: { ...params, pageNum: params?.current },
  });
}

export async function removeResource(params: { key: number[] }) {
  return request('/sys/resource/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addResource(params: TableListItem) {
  return request('/sys/resource/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateResource(params: Partial<TableListItem>) {
  return request('/sys/resource/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
