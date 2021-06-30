import { request } from 'umi';


/** 获取分类列表 GET /type/rule */
export async function fetchTypePage(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 类型名称 */
    name?: string
  },
) {
  return request('/type/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 新建规则 PUT /type/update */
export async function updateType(params: Partial<API.TypeListItem>) {
  return request<API.RuleListItem>('/type/update', {
    method: 'PUT',
    data: {...params}
  });
}

/** 新建规则 POST /type/save */
export async function addType(params: API.TypeListItem) {
  return request<API.RuleListItem>('/type/save', {
    method: 'POST',
    data: {...params}
  });
}

/** 删除规则 DELETE /type/delete */
export async function removeType(params: {ids: number[]}) {
  return request('/type/delete', {
    method: 'PUT',
    data: {...params}
  });
}
