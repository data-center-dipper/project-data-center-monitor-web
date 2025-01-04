import type { RouteRecordRaw } from 'vue-router'

const dashboardRouter: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        component: () => import('@/layout/index.vue'),
        name: 'dashboard',
        meta: {
            keepAlive: false,
            requiresAuth: true,
            title: '工作台',
            key: 'dashboard',
            to: { name: 'dashboard' },
            icon: 'workbench',
            singlePage: true
        },
        children: [
            {
                path: '',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '工作台',
                }
            }
        ],
    },
]

export default dashboardRouter