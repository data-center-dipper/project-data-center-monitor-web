import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

interface Module {
  default: RouteRecordRawWithMeta[]
}

interface ModuleList {
  [key: string]: Module
}

export interface RouteMeta {
  keepAlive?: boolean // 是否启用组件缓存
  requiresAuth?: boolean // 是否需要身份验证
  title?: string // 页面标题
  key: string // 唯一标识符
  parentKey?: string // 父级唯一标识符
  icon?: string // 图标名称
  to?: { name: string } // 跳转目标
  path?: string // 路径
  singlePage?: boolean // 是否单页应用
}

type RouteRecordRawWithMeta = RouteRecordRaw & {
  meta: RouteMeta
}

const metaRouters: ModuleList = import.meta.glob('./modules/*.ts', {
  eager: true,
})

export const routerArray: RouteRecordRawWithMeta[] = []

// 遍历所有导入的模块
Object.keys(metaRouters).forEach((item) => {
  const module = metaRouters[item]
  // 如果模块存在且默认导出是一个数组，则将其添加到路由数组中
  if (module && Array.isArray(module.default)) {
    routerArray.push(...(module.default as RouteRecordRawWithMeta[]))
  } else {
    // 如果模块不符合预期结构，输出警告信息
    console.warn(
      `Module at ${item} does not have a default export that is an array of RouteRecordRaw`,
    )
  }
})

const routes: RouteRecordRawWithMeta[] = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: { key: 'home', title: '首页' },
  },
  ...routerArray,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      keepAlive: false,
      requiresAuth: false,
      title: '页面未找到',
      key: 'not-found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.fullPath)
  console.log('Leaving route:', from.fullPath)
  console.log('Matched routes:', to.matched)
  next()
})

router.afterEach((to) => {})

export default router
