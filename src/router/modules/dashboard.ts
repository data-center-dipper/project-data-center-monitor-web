import type { RouteRecordRaw } from 'vue-router'

const dashboardRouter: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: () => import('@/layout/index.vue'),
    name: 'dashboardParent',
    meta: {
      keepAlive: false,
      requiresAuth: true,
      title: '工作台',
      key: 'dashboard',
      to: { name: 'dashboardHome' },
      icon: 'workbench',
      singlePage: true,
    },
    children: [
      {
        path: '',
        name: 'dashboardHome',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '工作台',
        },
      },
    ],
  },
]

export default dashboardRouter
