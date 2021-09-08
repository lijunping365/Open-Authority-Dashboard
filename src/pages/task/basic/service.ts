import { request } from 'umi';
import {BasicShop, RejectData} from "./data";

export async function queryBasicShop(id: number) {
  return request<BasicShop>(`/shop/system/shop/basic/${id}`);
}

export async function addAuditRecord(params: Partial<RejectData>) {
  return request('/shop/system/shop/auditShop', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
