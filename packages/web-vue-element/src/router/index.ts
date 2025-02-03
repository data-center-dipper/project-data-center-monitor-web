// 从 vue-router 导入类型定义和创建路由实例所需的函数
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义模块接口，确保每个模块导出的是一个包含默认属性的数组，该数组元素是带有 meta 数据的路由记录
interface Module {
  default: RouteRecordRawWithMeta[]
}

// 确保每个模块都是 Module 类型的映射表，键是模块路径，值是模块内容
interface ModuleList {
  [key: string]: Module
}

// 定义路由元数据接口，用于描述路由的附加信息，如是否需要缓存、是否需要认证等
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

// 扩展 RouteRecordRaw 类型，使其包含 meta 属性
type RouteRecordRawWithMeta = RouteRecordRaw & {
  meta: RouteMeta
}

// 动态导入所有位于 './modules/' 目录下的路由模块，并立即执行（eager: true），返回一个对象，键是模块路径，值是模块内容
const metaRouters: ModuleList = import.meta.glob('./modules/*.ts', {
  eager: true,
})

// 初始化路由数组，用于存放所有的路由配置
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

// 定义所有路由配置，包括静态定义的登录路由和其他动态加载的路由
const routes: RouteRecordRawWithMeta[] = [
  {
    path: '/',
    redirect: '/login',
    meta: { key: 'home', title: '首页' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'), // 动态导入登录页面组件
    meta: {
      keepAlive: false,
      requiresAuth: false,
      title: '登录',
      key: 'login',
      to: { name: 'login' },
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'), // 假设你有一个404页面
    meta: {
      keepAlive: false,
      requiresAuth: false,
      title: '页面未找到',
      key: 'not-found',
    },
  },
  ...routerArray, // 合并其他动态加载的路由
]

// 创建路由实例，使用 hash 模式的历史记录管理，并设置路由配置和滚动行为
const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式
  routes, // 路由配置
  strict: false, // 是否严格模式
  scrollBehavior: () => ({ left: 0, top: 0 }), // 切换页面时滚动到顶部
})

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.fullPath)
  console.log('Leaving route:', from.fullPath)
  console.log('Matched routes:', to.matched)
  next()
})

router.afterEach((to) => {
  console.log('Navigation finished to:', to.fullPath)
})

// 导出路由实例供其他地方使用
export default router
