import type { RouteRecordRaw } from 'vue-router'

const dashboardRouter: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: () => import('@/layout/index.vue'),
    name: 'dashboardParent', // 更改父路由名称以避免冲突
    meta: {
      keepAlive: false,
      requiresAuth: true,
      title: '工作台',
      key: 'dashboard',
      to: { name: 'dashboardHome' }, // 更新跳转目标为具体的子路由名称
      icon: 'workbench',
      singlePage: true,
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'dashboardHome', // 明确命名子路由
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '工作台',
        },
      },
    ],
  },
]

export default dashboardRouter
