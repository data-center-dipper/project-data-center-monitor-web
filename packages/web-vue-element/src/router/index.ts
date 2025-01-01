import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

interface Module {
    default: RouteRecordRaw[]
}
interface ModuleList {
    [key: string]: Module
}

const metaRouters: ModuleList = import.meta.glob('./modules/*.ts', { eager: true })

export const routerArray: RouteRecordRaw[] = []

Object.keys(metaRouters).forEach((item) => {
    const module = metaRouters[item]
    if (module && Array.isArray(module.default)) {
        routerArray.push(...module.default)
    } else {
        console.warn(`Module at ${item} does not have a default export that is an array of RouteRecordRaw`)
    }
})


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
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

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: false,
    // 切换页面，滚动到最顶部
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
