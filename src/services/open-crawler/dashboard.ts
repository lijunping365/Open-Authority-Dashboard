import { request } from 'umi';

export async function fetchSpiderNumber() {
  return request('/statistic/number', {
    method: 'GET',
  });
}
