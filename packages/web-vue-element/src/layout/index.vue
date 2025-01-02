<script setup lang="ts">
import { storeToRefs } from 'pinia'
import cacheRouter from '@/router/catche.ts'
import { useRouteTitle } from "@/hooks"
import { useCommonStore } from '@/store/modules/common.ts'
import Header from './components/Header/index.vue'
import Menu from './components/Menu/index.vue'
import Logo from './components/Logo/index.vue'

const commonStore = useCommonStore()
const { isCollapse } = storeToRefs(commonStore)

useRouteTitle()
</script>

<template>
  <el-container>
    <el-aside :width="isCollapse? 'auto' : '200px'">
      <Logo />
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="cacheRouter">
            <component
                :is="Component"
                :key="route.path"
            />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  height: 100%;
  overflow: hidden;
}
.el-header {
  --el-header-padding: 0;
}
</style>
