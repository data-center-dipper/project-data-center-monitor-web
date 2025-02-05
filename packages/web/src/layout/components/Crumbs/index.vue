<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { RouteMeta } from '@/router'
import { useRouteChange } from '@/hooks'
import { useCommonStore } from '@/store/modules/common.js'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()

// 递归获取面包屑路径
const getBreadcrumbPath = (
  routeName: string,
  breadcrumbPath: Array<{ title: string; path?: string }> = [],
): Array<{ title: string; path?: string }> => {
  const matchedRoute = router.getRoutes().find((r) => r.name === routeName)
  if (matchedRoute) {
    const meta = matchedRoute.meta as RouteMeta // 断言
    breadcrumbPath.unshift({
      title: meta.title || '', // 提供默认值
      path: meta.path || matchedRoute.path, // 使用路由的 path 作为 fallback
    })
    if (meta.parentKey) {
      return getBreadcrumbPath(meta.parentKey, breadcrumbPath)
    }
  }
  return breadcrumbPath
}

// 生成面包屑
const breadcrumbItems = computed(() => {
  return getBreadcrumbPath(route.name as string)
})

useRouteChange((newRoute) => {
  commonStore.toggleMenu(newRoute.path)
})
</script>

<template>
  <div class="breadcrumb text-gray-800">
    <el-breadcrumb separator="/">
      <!-- 渲染面包屑导航 -->
      <el-breadcrumb-item
        v-for="item in breadcrumbItems"
        :key="item.path"
        class="cursor-pointer"
        :to="{ path: item.path } as any"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped></style>
