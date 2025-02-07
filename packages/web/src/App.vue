<script setup lang="ts">
import { useRouteTitle } from './hooks'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { DialogList } from './components/dialog/useDialog.tsx'

useRouteTitle()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
  <component v-for="(modal, index) in DialogList" :is="modal" :key="index" />
</template>

<style scoped></style>
