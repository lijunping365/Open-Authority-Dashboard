import { request } from 'umi';

export async function queryMenuPage(params?: API.TableListParams) {
  return request('/menu/page', {
    params,
  });
}

export async function removeMenu(params: { ids: number[] }) {
  return request('/menu/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addMenu(params: Partial<API.Menu>) {
  return request('/menu/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateMenu(params: Partial<API.Menu>) {
  return request('/menu/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryMenuTree() {
  return request<API.MenuData[]>('/menu/tree');
}
