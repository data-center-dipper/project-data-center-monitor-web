import type { RouteRecordRaw } from 'vue-router';

const userRouter: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: () => import('@/layout/index.vue'),
    redirect: '/user/user-info',
    name: 'user',
    meta: {
      keepAlive: false,
      requiresAuth: true,
      title: '个人中心',
      key: 'user',
      to: { name: 'user' },
      icon: 'individual',
    },
    children: [
      {
        path: '/user/user-info',
        name: 'userInfo',
        component: () => import('@/views/user/index.vue'),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: '个人信息',
          key: 'userInfo',
          to: { name: 'userInfo' },
          parentKey: 'user',
        },
      },
    ],
  },
];

export default userRouter;
