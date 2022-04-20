// @ts-ignore
/* eslint-disable */

declare namespace API {
  type User  = {
    id: number;
    username: string;
    status: number;
    phone: string;
    createTime: Date
  };

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

  type Instance = {
    clientId: string;
    onlineTime: Date;
    status: string;
    weight: number;
  };

  type Spider = {
    id: number;
    name: string;
    url: string;
    method: string;
    params: string;
    headers: string;
    extractRule: string;
    retryTimes: number;
    sleepTime: number;
    createTime: Date;
    createUser: number;
  };

  type SpiderData = {
    id: number;
    spiderId: number;
    data: string;
    createTime: Date;
  };

  type SpiderLog = {
    id: number;
    spiderId: number;
    status: number;
    cause: string;
    createTime: Date;
  };

  type SpiderProxy = {
    id: number;
    ip: string;
    port: string;
    type: number;
    status: number;
    createTime: Date;
    verifyTime: Date;
  };

  type SpiderTask = {
    id: number;
    spiderId: number;
    taskName: string;
    handlerName: string;
    cronExpression: string;
    status: number;
    createTime: Date;
    createUser: number;
  };

  type TaskLog = {
    id: number;
    taskId: number;
    status: number;
    createTime: Date;
  }

  type CurrentUser = {
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

  type TypeListItem = {
    id?: number;
    name?: string;
    createTime?: string;
  };

  type ProxyGroupListItem = {
    id?: number;
    groupName?: string;
    createTime?: string;
  };

  type ProxyIpListItem = {
    id?: number;
    groupId?: number;
    ip?: string;
    port?: string;
    type?: number;
    status?: number;
    createTime?: string;
    verifyTime?: string;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type CaptchaParams = {
    type?: string;
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
