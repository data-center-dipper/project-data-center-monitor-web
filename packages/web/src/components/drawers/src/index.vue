<template>
  <el-drawer v-model="drawerVisible" v-bind="$attrs" :direction="direction">
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  direction: {
    type: String,
    default: 'rtl',
    validator: (value: string) => ['ltr', 'rtl', 'ttb', 'btt'].includes(value),
  },
})

const emits = defineEmits([])

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
