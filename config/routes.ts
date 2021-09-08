export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
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
    name: 'task',
    icon: 'table',
    path: '/task',
    component: './task',
  },
  {
    name: 'log',
    icon: 'smile',
    path: 'log',
    component: './log',
  },
  {
    name: 'data',
    icon: 'smile',
    path: 'data',
    component: './data',
  },
  {
    name: 'executor',
    icon: 'table',
    path: '/executor',
    component: './executor',
  },
  {
    name: 'proxy',
    icon: 'table',
    path: '/proxy',
    component: './proxy',
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
