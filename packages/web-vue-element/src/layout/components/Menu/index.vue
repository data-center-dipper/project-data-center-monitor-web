<template>
  <el-scrollbar>
    <el-menu
        :router="false"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        @select="handleSelect"
    >
      <SubMenu :router-array="routerArray" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/store/modules/common'
import { useTagsStore } from '@/store/modules/tags.ts'
import SubMenu from './components/sub-menu.vue'
import { routerArray } from '@/router/index.ts'

const router = useRouter()
const commonStore = useCommonStore()
const tagsStore = useTagsStore()
const { isCollapse, activeMenu } = storeToRefs(commonStore)

const findNameByIndex = (routerArray, index) => {
  for (const route of routerArray) {
    if (route.children) {
      const item = route.children.find(child => child.path === index)
      if (item) {
        return item.meta.title
      }
    }
  }
  return null
}

const handleSelect = (index: string) => {
  console.log(routerArray)
  tagsStore.addTagView({ title: findNameByIndex(routerArray, index), path: index, fullPath: index, meta: { affix: false } })
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
