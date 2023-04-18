// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Menu = {
    id: number;
    pid: number;
    level: number;
    icon: string;
    name: string;
    memo: string;
    path: string;
    sort: number;
    children: Menu[];
    enableStatus: number;
    createTime: Date;
    createUser: string;
  };

  type User  = {
    id: number;
    username: string;
    status: number;
    phone: string;
    createTime: Date
  };

  export interface MenuData {
    name: string;
    icon: string;
    path: string;
    children?: MenuData[];
  }

  export interface MenuDataItem {
    children?: MenuDataItem[];
    routes?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    icon?: string;
    locale?: string;
    name?: string;
    key?: string;
    path?: string;
    [key: string]: any;
  }

  // role begin
  type TableListItem = {
    id: number;
    name: string;
    memo: string;
    enableStatus: number;
    sort: number;
    menus: string;
    access: string;
    createUser: string;
    createTime: Date;
  }

  type TableListPagination = {
    total: number;
    pageSize: number;
    current: number;
  }

  type TableListData = {
    list: TableListItem[];
    pagination: Partial<TableListPagination>;
  }

  type TableListParams  = {
    enableStatus?: number;
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };
  }

  type ResourceData = {
    id: number;
    name: string;
  }

  type RoleResourceData = {
    roleId: number;
    resourceId: number[];
  }

  type RoleMenuData = {
    roleId: number;
    menuId: number[];
  }
  // role end

  type StatisticNumber = {
    taskTotalNum: number;
    taskRunningNum: number;
    scheduleTotalNum: number;
    scheduleSucceedNum: number;
    spiderTotalNum: number;
    spiderExeTotalNum: number;
    spiderExeSucceedNum: number;
    executorTotalNum: number;
    executorOnlineNum: number;
  }

  type StatisticReport = {
    date: Date;
    name: string;
    value: number;
  }

  type TreeData = {
    id: number;
    name: string;
    children: API.TreeData[];
  };

  type CurrentUser = {
    id:number;
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type CaptchaParams = {
    deviceId?: string;
    mobile?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    deviceId?: string;
    mobile?: string;
    captcha?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
