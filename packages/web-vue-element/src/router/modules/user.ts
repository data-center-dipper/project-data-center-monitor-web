import type { RouteRecordRaw } from 'vue-router'

const userRouter: Array<RouteRecordRaw> = [
    {
        path: '/user',
        component: () => import('@/layout/index.vue'),
        redirect: '/user/user-info',
        meta: {
            keepAlive: false,
            requiresAuth: true,
            title: '个人中心',
            key: 'user',
            to: { name: 'user' },
        },
        children: [
            {
                path: 'user-info',
                name: 'userInfo',
                component: () => import('@/views/user/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '个人信息',
                    key: 'userInfo',
                    to: { name: 'userInfo' },
                },
            }
        ],
    },
]

export default userRouter