<script setup lang="ts">
// 导入 useRouteTitle 自定义 Hook，这个 Hook 可能用于根据当前路由动态设置页面标题。
import { useRouteTitle } from '@/hooks/index.ts';

// 调用 useRouteTitle 函数，这通常会在应用启动时执行，以确保页面标题根据当前路由正确设置。
useRouteTitle();
</script>

<template>
  <!-- <router-view /> 是一个占位符，Vue Router 会根据当前路由匹配的结果，在这里渲染相应的组件 -->
  <router-view />
</template>

<style scoped>
/* 这里可以定义作用于本组件的局部样式，scoped 属性确保这些样式仅应用于此组件内的元素 */
</style>