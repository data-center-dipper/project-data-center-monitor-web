<template>
  <el-scrollbar>
    <el-menu :collapse="isCollapse" :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleSelect">
      <el-sub-menu v-for="route in routerArray" :key="route.path" :index="route.path">
        <template #title>
          <iconpark-icon name="menu-fold-one"></iconpark-icon>
          <span>{{ (route.meta as RouteMeta).title }}</span>
        </template>
        <el-menu-item
            v-for="child in route.children"
            :key="child.path"
            :index="child.path"
        >
          {{ (child.meta as RouteMeta).title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/store/modules/common'
import { routerArray } from '@/router/index.ts'
import type { RouteMeta } from '@/router/index.ts'

const router = useRouter()
const { isCollapse } = storeToRefs(useCommonStore())

const activeMenu = ref('/kafka/kafka-home')

const handleSelect = (index: string) => {
  router.push(index)
}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 100%;
}
</style>
