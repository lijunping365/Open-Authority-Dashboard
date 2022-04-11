﻿export default [
  {
    path: '/login',
    layout: false,
    name: 'login',
    component: './login',
    hideInMenu: true,
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'dashboard',
    icon: 'table',
    path: '/dashboard',
    component: './dashboard',
  },
  {
    name: 'spider',
    icon: 'smile',
    path: 'spider',
    component: './spider',
  },
  {
    name: 'spiderData',
    icon: 'smile',
    path: 'spiderData',
    component: './spiderData',
    hideInMenu: true,
  },
  {
    name: 'spiderLog',
    icon: 'smile',
    path: 'spiderLog',
    component: './spiderLog',
    hideInMenu: true,
  },
  {
    name: 'spiderProxy',
    icon: 'table',
    path: '/spiderProxy',
    component: './spiderProxy',
  },
  {
    name: 'spiderTask',
    icon: 'table',
    path: '/spiderTask',
    component: './spiderTask',
  },
  {
    name: 'taskLog',
    icon: 'smile',
    path: 'taskLog',
    component: './taskLog',
    hideInMenu: true,
  },
  {
    name: 'executor',
    icon: 'table',
    path: '/executor',
    component: './executor',
  },
  {
    name: 'admin',
    icon: 'table',
    path: '/admin',
    component: './admin',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
