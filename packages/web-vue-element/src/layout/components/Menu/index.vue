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
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useCommonStore } from '@/store/modules/common';
import SubMenu from './components/sub-menu.vue';
import { routerArray } from '@/router/index.ts';

const router = useRouter();
const commonStore = useCommonStore();
const { isCollapse, activeMenu } = storeToRefs(commonStore);

const handleSelect = (index: string) => {
  router.push(index);
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 100%;
}
</style>
