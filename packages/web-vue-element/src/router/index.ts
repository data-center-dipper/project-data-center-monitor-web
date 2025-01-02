import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

interface Module {
    default: RouteRecordRawWithMeta[]
}

// 确保每个模块都是Module类型
interface ModuleList {
    [key: string]: Module
}

// meta信息接口
export interface RouteMeta {
    keepAlive?: boolean
    requiresAuth?: boolean
    title?: string
    key: string
    parentKey?: string
    icon?: string
}

// 更新RouteRecordRaw，使其包含meta
type RouteRecordRawWithMeta = RouteRecordRaw & {
    meta: RouteMeta
}

// 获取metaRouters
const metaRouters: ModuleList = import.meta.glob('./modules/*.ts', { eager: true })

export const routerArray: RouteRecordRawWithMeta[] = []

Object.keys(metaRouters).forEach((item) => {
    const module = metaRouters[item]
    if (module && Array.isArray(module.default)) {
        routerArray.push(...module.default as RouteRecordRawWithMeta[])
    } else {
        console.warn(`Module at ${item} does not have a default export that is an array of RouteRecordRaw`)
    }
})

const routes: RouteRecordRawWithMeta[] = [
    {
        path: '/',
        redirect: '/login',
        meta: { key: 'home', title: '首页' },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            keepAlive: false,
            requiresAuth: false,
            title: '登录',
            key: 'login',
        },
    },
    ...routerArray,
]

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: false,
    // 切换页面，滚动到最顶部
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
