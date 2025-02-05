<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import cacheRouter from '@/router/catche.ts'
import { useRouteTitle, useMobileDetection } from '@/hooks'
import { useCommonStore } from '@/store/modules/common.ts'

import Header from './components/Header/index.vue'
import Menu from './components/Menu/index.vue'
import Logo from './components/Logo/index.vue'
import Tab from './components/Tab/index.vue'

const asideRef = ref(null)
const menuDrawerRef = ref(null)

const commonStore = useCommonStore()
const { isCollapse } = storeToRefs(commonStore)

const { isMobile } = useMobileDetection()

useRouteTitle()
</script>

<template>
  <el-container>
    <el-aside
      v-if="!isMobile"
      ref="asideRef"
      :width="isCollapse ? 'auto' : '200px'"
      :class="{ 'shadow-md': isCollapse }"
    >
      <Logo />
      <Menu />
    </el-aside>
    <el-drawer ref="menuDrawerRef" v-else v-model="isCollapse" direction="ltr">
      <div>
        <Logo />
        <Menu />
      </div>
    </el-drawer>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <Tab />

      <el-main>
        <router-view v-slot="{ Component, route }">
          <component :key="route.path" :is="Component" />
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
  border-right: 1px solid #eee;
}

.el-header {
  --el-header-padding: 0;
  --el-header-height: auto;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.fade-transform-enter,
.fade-transform-leave-to {
  opacity: 0;
}

:deep(.el-drawer) {
  width: auto !important;
}

:deep(.el-drawer__header) {
  display: none;
}

:deep(.el-main) {
  --el-main-padding: 5px 20px;
}
</style>
