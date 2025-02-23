import type { RouteRecordRaw } from 'vue-router'

const provingRouter: Array<RouteRecordRaw> = [
  {
    path: '/proving',
    component: () => import('@/layout/index.vue'),
    name: 'proving-management',
    redirect: '/proving/proving-nodes',
    meta: {
      keepAlive: false,
      requiresAuth: true,
      title: '试验场',
      key: 'proving-management',
      to: { name: 'proving' },
      icon: 'proving',
    },
    children: [
    {
        path: '/proving/proving-cluster',
        name: 'provingCluster',
        component: () =>
          import('@/views/proving/children/proving-cluster/index.vue'),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: '试验场',
          key: 'proving-cluster',
          to: { name: 'provingCluster' },
          parentKey: 'proving-management',
        },
      },
    ],
  },
]

export default provingRouter
