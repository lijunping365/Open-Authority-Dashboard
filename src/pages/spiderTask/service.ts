import { request } from 'umi';
import type {ScheduleTask} from "./data";

export async function fetchScheduleTaskPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 爬虫id */
    spiderId?: any
    /** 任务状态 */
    status?: number
  }
) {
  return request('/spiderTask/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateScheduleTask(params: Partial<ScheduleTask>) {
  return request('/spiderTask/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addScheduleTask(params: ScheduleTask) {
  return request('/spiderTask/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeScheduleTask(params: {ids: number[]}) {
  return request('/spiderTask/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function startScheduleTask(id: number) {
  return request(`/spiderTask/start/${id}`, {
    method: 'PUT',
  });
}

export async function stopScheduleTask(id: number) {
  return request(`/spiderTask/stop/${id}`, {
    method: 'PUT',
  });
}
