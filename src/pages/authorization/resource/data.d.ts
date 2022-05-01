export interface TableListItem {
  id: number;
  name: string;
  memo: string;
  path: string;
  enableStatus: number;
  createTime: Date;
  createUser: string;
}

export interface TableListParams extends API.PageQueryData {
  enableStatus?: number;
  name?: string;
  memo?: string;
  id?: number;
}
