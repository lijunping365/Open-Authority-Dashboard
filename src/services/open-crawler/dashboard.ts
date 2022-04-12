import { request } from 'umi';

export async function fetchSpiderNumber() {
  return request('/statistic/number', {
    method: 'GET',
  });
}

export async function fetchSpiderReport() {
  return request('/statistic/report', {
    method: 'GET',
  });
}

