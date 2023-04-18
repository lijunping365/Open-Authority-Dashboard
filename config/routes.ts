export default [
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
    name: 'user',
    icon: 'table',
    path: '/user',
    component: './user',
  },
  {
    path: '/authorization',
    name: 'authorization',
    icon: 'dashboard',
    routes: [
      {
        path: '/authorization/role',
        name: 'role',
        icon: 'dashboard',
        component: './authorization/role',
      },
      {
        path: '/authorization/menu',
        name: 'menu',
        icon: 'dashboard',
        component: './authorization/menu',
      },
      {
        path: '/authorization/access',
        name: 'access',
        icon: 'dashboard',
        component: './authorization/access',
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
