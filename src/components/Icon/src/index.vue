<script setup lang="ts">
import type { IconProps } from './interface.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'qx-icon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IconProps>(), {})

const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyle = computed(() => {
  return {
    color: props.color ?? void 0,
  }
})
</script>

<template>
  <i
    class="bre-icon inline-flex justify-center items-center relative"
    :style="{ ...customStyle, cursor: props.cursor }"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
.bre-icon {
  fill: currentColor;
  font-size: inherit;
}
</style>
