/**
 * @description 过滤需要缓存的路由，遍历路由配置并收集那些设置了 keepAlive 为 true 的路由名称。
 *
 * 此函数递归地遍历所有路由及其子路由，将需要缓存（keepAlive: true）的路由名称添加到 _cache 数组中。
 *
 * @param {Array<RouteRecordRaw>} _route - 所有路由表。每个元素代表一个路由配置对象。
 * @param {Array<RouteRecordName>} _cache - 缓存的路由表。用于存储需要被缓存的路由名称。
 * @return void - 该函数没有返回值，它直接修改传入的 _cache 参数。
 */
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
// 导入所有路由配置
import { routerArray } from './index.ts';

// 初始化缓存路由数组
const cacheRouter: any[] = [];

/**
 * 函数：filterKeepAlive
 * 遍历路由配置，找到需要缓存的路由，并将其名称添加到缓存数组中。
 */
function filterKeepAlive(_route: RouteRecordRaw[], _cache: RouteRecordName[]): void {
    // 对每个路由配置进行迭代
    _route.forEach((item) => {
        // 如果当前路由配置有 meta 属性且 keepAlive 为 true，并且路由有名称，则将其名称添加到缓存数组中
        if (item.meta?.keepAlive && item.name) {
            _cache.push(item.name);
        }
        // 如果当前路由有子路由并且子路由的数量不为零，则递归调用此函数处理子路由
        if (item.children && item.children.length !== 0) {
            filterKeepAlive(item.children, _cache);
        }
    });
}

// 调用 filterKeepAlive 函数，开始过滤需要缓存的路由
filterKeepAlive(routerArray, cacheRouter);

// 导出缓存路由数组，供其他地方使用
export default cacheRouter;