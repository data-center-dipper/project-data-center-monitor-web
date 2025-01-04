<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
import { computed } from 'vue'

interface Props {
  autoHide?: boolean // 是否自动隐藏滚动条
  class?: string // 自定义类名
  style?: Record<string, string> // 自定义样式
}

const props = withDefaults(defineProps<Props>(), {
  autoHide: true,
  forceVisible: false,
  class: '',
  style: () => ({}),
})

const customStyle = computed(() => ({
  ...props.style,
}))

const customClass = computed(() => [props.class])
</script>

<template>
  <Simplebar
      :auto-hide="autoHide"
      :class="customClass"
      :style="customStyle"
  >
    <slot />
  </Simplebar>
</template>

<style scoped>
</style>
