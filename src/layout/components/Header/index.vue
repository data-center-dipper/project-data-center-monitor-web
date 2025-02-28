<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Crumbs from '../Crumbs/index.vue'
import { useCommonStore } from '@/store/modules/common.ts'
import QxIcon from '@/components/Icon/src/index.vue'
import { ref } from 'vue'
import { mittBus } from '@/utils'
import { useFullscreen } from '@vueuse/core'

const size = ref(20)

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const handleToggleFullScreen = () => {
  toggleFullscreen()
}

const commonStore = useCommonStore()
const { isCollapse } = storeToRefs(commonStore)

const handleCollapse = () => {
  commonStore.toggleCollapse()
}

const openSearchDialog = () => {
  mittBus.emit('openSearchDialog')
}

const openSetting = () => {
  mittBus.emit('openSetting')
}
</script>

<template>
  <header
    class="flex justify-between items-center px-4 py-3 bg-gray-100 shadow-sm"
  >
    <div class="flex items-center space-x-1">
      <iconpark-icon
        size="24"
        :name="isCollapse ? 'unfold' : 'fold'"
        @click="handleCollapse"
        class="cursor-pointer"
      ></iconpark-icon>
      <!--  刷新当前路由 -->
      <qx-icon
        icon="refresh"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        color="#C0C0C0"
      ></qx-icon>
      <!--   快捷访问   -->
      <qx-icon
        icon="home"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        color="#C0C0C0"
      ></qx-icon>
      <Crumbs />
    </div>
    <div class="flex items-center space-x-1">
      <!--  搜索按钮  -->
      <div class="search-wrap relative bg-white rounded-md flex items-center">
        <div
          class="search-input flex items-center justify-between w-60 h-9 px-2.5 cursor-pointer border border-gray-200 rounded-md"
          @click="openSearchDialog"
        >
          <div class="left flex items-center">
            <qx-icon icon="search" size="1x" class="text-gray-600"></qx-icon>
            <span class="ml-2.5 text-gray-800 text-sm font-normal">搜索</span>
          </div>
          <div
            class="search-keydown flex items-center h-5 px-1.5 text-gray-400 bg-gray-200 border border-gray-200 rounded-md"
          >
            <span class="text-sm font-normal">Ctrl +</span>
            <span>k</span>
          </div>
        </div>
      </div>
      <!--  全屏切换 -->
      <qx-icon
        :icon="isFullscreen ? 'minimize' : 'expand'"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        @click="handleToggleFullScreen"
        color="#C0C0C0"
      ></qx-icon>
      <!--  设置  -->
      <qx-icon
        icon="gear"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        @click="openSetting"
        color="#C0C0C0"
      ></qx-icon>
      <!--  主题切换  -->
      <qx-icon
        icon="moon"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        color="#C0C0C0"
      ></qx-icon>
      <!--  语言切换 -->
      <qx-icon
        icon="language"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        color="#C0C0C0"
      ></qx-icon>
      <!-- 消息 -->
      <qx-icon
        icon="message"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        color="#C0C0C0"
      ></qx-icon>
      <!-- 锁定屏幕 -->
      <qx-icon
        icon="lock"
        size="1x"
        cursor="pointer"
        class="bg-transparent p-2 hover:bg-gray-300/80"
        color="#C0C0C0"
      ></qx-icon>
      <!-- 用户信息 -->
      <div class="user-avatar flex gap-2 items-center text-nowrap">
        <div class="avatar-name text-gray-600 text-sm">一勺</div>
        <div
          class="avatar p-3 bg-[linear-gradient(180deg,#FFA9D9_0%,#E83D3D_100%)] rounded-full cursor-pointer"
        ></div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
