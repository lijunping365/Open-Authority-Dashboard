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
    name: 'template',
    icon: 'table',
    path: '/template',
    routes: [
      {
        path: '/template/list',
        name: 'list',
        icon: 'smile',
        component: './template/list',
      },
    ],
  },
  {
    name: 'task',
    icon: 'table',
    path: '/task',
    routes: [
      {
        path: '/task/list',
        name: 'list',
        icon: 'smile',
        component: './task/list',
      },
    ],
  },
  {
    name: 'data',
    icon: 'table',
    path: '/data',
    routes: [
      {
        path: '/data/list',
        name: 'list',
        icon: 'smile',
        component: './data/list',
      },
      {
        path: '/data/real',
        name: 'real',
        icon: 'smile',
        component: './data/real',
      },
    ],
  },
  {
    name: 'util',
    icon: 'table',
    path: '/util',
    routes: [
      {
        path: '/util/proxy',
        name: 'proxy',
        icon: 'smile',
        component: './util/proxy',
      },
      {
        path: '/util/white',
        name: 'white',
        icon: 'smile',
        component: './util/white',
      },
    ],
  },
  {
    name: 'monitor',
    icon: 'table',
    path: '/monitor',
    routes: [
      {
        path: '/monitor/task',
        name: 'task',
        icon: 'smile',
        component: './monitor/task',
      }
    ],
  },
  {
    name: 'analysis',
    icon: 'table',
    path: '/analysis',
    routes: [
      {
        path: '/analysis/task',
        name: 'task',
        icon: 'smile',
        component: './analysis/task',
      },
      {
        path: '/analysis/ip',
        name: 'ip',
        icon: 'smile',
        component: './analysis/ip',
      },
    ],
  },
  {
    name: 'other',
    icon: 'table',
    path: '/other',
    routes: [
      {
        path: '/other/type',
        name: 'type',
        icon: 'smile',
        component: './other/type',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
