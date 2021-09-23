import { request } from 'umi';
import type {Spider} from "./data";

export async function fetchSpiderPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  }
) {
  return request('/spiderConfig/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateSpider(params: Partial<Spider>) {
  return request('/spiderConfig/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addSpider(params: Partial<Spider>) {
  return request('/spiderConfig/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeSpider(params: {ids: number[]}) {
  return request('/spiderConfig/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
