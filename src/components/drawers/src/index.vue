<template>
  <el-drawer v-model="drawerVisible" v-bind="$attrs">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emits = defineEmits(['drawer-close'])

const drawerVisible = ref(false)

const openDrawer = () => {
  drawerVisible.value = true
}

const closeDrawer = () => {
  drawerVisible.value = false
}

defineExpose({
  openDrawer,
  closeDrawer,
})
</script>

<style lang="scss" scoped></style>
