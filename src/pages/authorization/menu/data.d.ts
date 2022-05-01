export interface TableListItem {
  id: number;
  pid: number;
  level: number;
  icon: string;
  name: string;
  memo: string;
  path: string;
  sort: number;
  children: TableListItem[];
  enableStatus: number;
  createTime: Date;
  createUser: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  enableStatus?: number;
  name?: string;
  memo?: string;
  id?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
