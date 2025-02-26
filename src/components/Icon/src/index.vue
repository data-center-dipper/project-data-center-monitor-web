<template>
  <i
    class="bre-icon inline-flex justify-center items-center relative"
    :style="{ ...customStyle, cursor: props.cursor }"
    v-bind="$attrs"
    :class="{
      smart: smart,
    }"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

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
const customStyle = computed(() => ({
  color: props.color ?? void 0,
}))
</script>

<style scoped>
.bre-icon {
  fill: currentColor;
  font-size: inherit;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(2px);
  }
  20% {
    transform: translateX(-2px);
  }
  30% {
    transform: translateX(2px);
  }
  40% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  60% {
    transform: translateX(-2px);
  }
  70% {
    transform: translateX(2px);
  }
  80% {
    transform: translateX(-2px);
  }
  90% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

.smart:hover {
  animation: shake 0.5s ease-in-out;
}
</style>
