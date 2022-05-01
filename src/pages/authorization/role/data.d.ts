export interface TableListItem {
  id: number;
  name: string;
  memo: string;
  enableStatus: number;
  sort: number;
  resources: ResourceData[];
  menus: MenuData[];
  createUser: string;
  createTime: Date;
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
  id?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface ResourceData {
  id: number;
  name: string;
}

export interface MenuData {
  id: number;
  name: string;
}

export interface RoleResourceData {
  roleId: number;
  resourceId: number[];
}

export interface RoleMenuData {
  roleId: number;
  menuId: number[];
}
