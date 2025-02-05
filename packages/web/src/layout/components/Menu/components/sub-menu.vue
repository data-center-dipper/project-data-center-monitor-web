<script setup lang="ts">
import type { RouteMeta } from '@/router/index.ts'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'SubMenu',
})

defineProps<{
  routerArray: any[]
}>()

const router = useRouter()
</script>

<template>
  <template v-for="subItem in routerArray" :key="subItem.path">
    <el-sub-menu
      v-if="
        subItem.children?.length && !(subItem.meta as RouteMeta)?.singlePage
      "
      :index="subItem.path"
    >
      <template #title>
        <iconpark-icon
          :name="(subItem.meta as RouteMeta)?.icon"
          size="18"
          class="mr-2"
        ></iconpark-icon>
        <span>{{ (subItem.meta as RouteMeta)?.title }}</span>
      </template>
      <SubMenu :router-array="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path">
      <iconpark-icon
        :name="(subItem.meta as RouteMeta)?.icon"
        size="18"
        class="mr-2"
      ></iconpark-icon>
      <span>{{ (subItem.meta as RouteMeta)?.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped></style>
