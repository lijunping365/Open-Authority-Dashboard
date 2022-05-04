import React from 'react';
import type {BasicLayoutProps, Settings as LayoutSettings} from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrentUser } from './services/open-admin/api';
import {requestInterceptor, responseInterceptor} from "@/utils/request";
import {ignorePath} from "@/utils/utils";
import { queryMenuTree } from './services/open-admin/menu';
import {patchRoutes} from "@/utils/menu";
import defaultSettings from "../config/defaultSettings";

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
  menuData?: API.MenuDataItem[];
}> {
  if (ignorePath()) {
    try {
      const currentUser: any = await queryCurrentUser();
      const response: any[] = await queryMenuTree();
      const authRoutes = patchRoutes(response.length !== 0 ? response : []);
      return {
        currentUser,
        settings: defaultSettings,
        menuData: authRoutes,
      };
    } catch (error) {
      history.push('/login');
    }
  }
  return {
    settings: defaultSettings,
    menuData: [],
  };
}

/**
 * ProLayout 支持的api https://procomponents.ant.design/components/layout
 * */
export const layout = ({initialState}: {
  initialState: {
    settings?: LayoutSettings;
    currentUser?: API.CurrentUser;
    menuData?: API.MenuDataItem[];
  };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      if (!initialState?.currentUser && !ignorePath()) {
        history.push('/login');
      }
    },
    menuHeaderRender: undefined,
    menuDataRender: (menuData: any) => initialState.menuData || menuData,
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};
