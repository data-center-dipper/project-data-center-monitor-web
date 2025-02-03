<script setup lang="ts">
// 引入 Vue 的 ref 和 watch 函数，用于响应式数据绑定和监听
import { ref, watch } from 'vue'
// 从 pinia 中引入 storeToRefs，用于解构 store 状态为响应式引用
import { storeToRefs } from 'pinia'
// 导入缓存路由配置
import cacheRouter from '@/router/catche.ts'
// 自定义 hooks，用于处理页面标题和检测是否为移动端
import { useRouteTitle, useMobileDetection } from '@/hooks'
// 引入状态管理模块中的 commonStore
import { useCommonStore } from '@/store/modules/common.ts'

// 引入各个组件
import Header from './components/Header/index.vue'
import Menu from './components/Menu/index.vue'
import Logo from './components/Logo/index.vue'
import Tab from './components/Tab/index.vue'

// 定义侧边栏的 ref，用于获取 DOM 节点
const asideRef = ref(null)
// 定义抽屉菜单的 ref，用于获取 DOM 节点
const menuDrawerRef = ref(null)

// 使用 commonStore 来管理全局状态
const commonStore = useCommonStore()
// 解构出 isCollapse 状态，用于控制侧边栏或抽屉的展开与收起
const { isCollapse } = storeToRefs(commonStore)

// 检测是否为移动端，并将结果存储在 isMobile 中
const { isMobile } = useMobileDetection()

// 设置当前页面的标题
useRouteTitle()
</script>

<template>
  <!-- 主容器 -->
  <el-container>
    <!-- PC 端显示侧边栏 -->
    <el-aside
      v-if="!isMobile"
      ref="asideRef"
      :width="isCollapse ? 'auto' : '200px'"
      :class="{ 'shadow-md': isCollapse }"
    >
      <!-- 显示 Logo 组件 -->
      <Logo />
      <!-- 显示菜单组件 -->
      <Menu />
    </el-aside>
    <!-- 移动端显示抽屉菜单 -->
    <el-drawer ref="menuDrawerRef" v-else v-model="isCollapse" direction="ltr">
      <div>
        <!-- 在抽屉中显示 Logo 组件 -->
        <Logo />
        <!-- 在抽屉中显示菜单组件 -->
        <Menu />
      </div>
    </el-drawer>
    <!-- 右侧内容区域 -->
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header>
        <Header />
      </el-header>
      <!-- 标签页组件 -->
      <Tab />

      <!-- 主要内容区 这里以前遇到白屏问题，就是多个菜单切换来，切换后，然后来回几次就会出现白屏，后面经过测试发现，去掉transition过度效果就好了，但是加一个占位符，在组件未完全加载时显示，居然也能解决，但是却从来没有显示过加载中的样子，有点奇怪 -->
      <el-main>
        <router-view v-slot="{ Component, route }">
          <component :key="route.path" :is="Component" />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
/* 设置主容器的高度 */
.el-container {
  height: 100vh;
}

/* 设置侧边栏高度 */
.el-aside {
  height: 100%;
  overflow: hidden;
}

/* 自定义 header 样式 */
.el-header {
  --el-header-padding: 0;
  --el-header-height: auto;
}

/* 定义进入和离开时的过渡效果 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

/* 定义进入前和离开后的样式 */
.fade-transform-enter,
.fade-transform-leave-to {
  opacity: 0;
}

/* 深度选择器修改 el-drawer 样式 */
:deep(.el-drawer) {
  width: auto !important;
}

/* 隐藏 el-drawer 的默认头部 */
:deep(.el-drawer__header) {
  display: none;
}

/* 自定义 el-main 的内边距 */
:deep(.el-main) {
  --el-main-padding: 5px 20px;
}
</style>
