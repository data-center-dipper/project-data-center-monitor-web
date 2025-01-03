import type { RouteRecordRaw } from 'vue-router'

const systemManagementRouter: Array<RouteRecordRaw> = [
    {
        path: '/system-management',
        component: () => import('@/layout/index.vue'),
        redirect: '/system-management/route-management',
        meta: {
            keepAlive: true,
            requiresAuth: true,
            title: '系统管理',
            key: 'system-management',
            to: { name: 'route-management' },
            icon: 'system'
        },
        children: [
            {
                path: '/system-management/route-management',
                name: 'route-management',
                component: () => import('@/views/system/children/route-management/index.vue'),
                meta: {
                    keepAlive: true,
                    requiresAuth: true,
                    title: '路由管理',
                    key: 'route-management',
                    to: { name: 'route-management' },
                    parentKey: 'system-management',
                },
            },
            {
                path: '/system-management/role-management',
                name: 'role-management',
                component: () => import('@/views/system/children/role-management/index.vue'),
                meta: {
                    keepAlive: true,
                    requiresAuth: true,
                    title: '角色管理',
                    key: 'role-management',
                    to: { name: 'role-management' },
                    parentKey: 'system-management',
                },
            },
            {
                path: '/system-management/user-management',
                name: 'user-management',
                component: () => import('@/views/system/children/user-management/index.vue'),
                meta: {
                    keepAlive: true,
                    requiresAuth: true,
                    title: '用户管理',
                    key: 'user-management',
                    to: { name: 'user-management' },
                    parentKey: 'system-management',
                },
            },
            {
                path: '/system-management/department-management',
                name: 'department-management',
                component: () => import('@/views/system/children/department-management/index.vue'),
                meta: {
                    keepAlive: true,
                    requiresAuth: true,
                    title: '部门管理',
                    key: 'department-management',
                    to: { name: 'department-management' },
                    parentKey: 'system-management',
                },
            },
        ],
    },
]

export default systemManagementRouter