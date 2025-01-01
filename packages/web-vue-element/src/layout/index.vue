<script setup lang="ts">
import cacheRouter from '@/router/catche.ts'
import { useRouteTitle } from "@/hooks"

useRouteTitle()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cacheRouter">
      <component
          :is="Component"
          :key="route.path"
      />
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>
