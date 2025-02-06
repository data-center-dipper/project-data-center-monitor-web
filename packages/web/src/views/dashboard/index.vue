<template>
  <el-button @click="openDrawer">打开抽屉</el-button>
  <qx-drawer direction="ltr" ref="drawer"></qx-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(null)

function openDrawer() {
  drawer.value.openDrawer()
}
</script>

<style scoped></style>
