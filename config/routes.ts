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
  },
  {
    name: 'spiderData',
    icon: 'smile',
    path: 'spiderData',
    component: './spiderData',
  },
  {
    name: 'executor',
    icon: 'table',
    path: '/executor',
    component: './executor',
  },
  {
    name: 'spiderProxy',
    icon: 'table',
    path: '/spiderProxy',
    component: './spiderProxy',
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
