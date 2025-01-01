/**
 * @description 过滤需要缓存的路由
 * @param {Array} _route 所有路由表
 * @param {Array} _cache 缓存的路由表
 * @return void
 */
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import { routerArray } from './index.ts'
const cacheRouter: any[] = []

function filterKeepAlive(_route: RouteRecordRaw[], _cache: RouteRecordName[]): void {
    _route.forEach((item) => {
        item.meta?.keepAlive && item.name && _cache.push(item.name)
        item.children && item.children.length !== 0 && filterKeepAlive(item.children, _cache)
    })
}

filterKeepAlive(routerArray, cacheRouter)

export default cacheRouter
