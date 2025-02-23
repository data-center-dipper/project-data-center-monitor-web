<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineOptions({
  name: 'qx-pagination',
})

const props = defineProps({
  justify: {
    type: String,
    default: 'end',
    validator: (value: string) => {
      return ['start', 'center', 'end'].includes(value)
    },
  },
})

const emit = defineEmits(['qx-size-change', 'qx-current-change'])

function handleSizeChange(newSize: number) {
  emit('qx-size-change', newSize)
}

function handleCurrentChange(newPage: number) {
  emit('qx-current-change', newPage)
}
</script>

<template>
  <div class="flex mt-3" :class="`justify-${justify}`">
    <el-pagination
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<style scoped></style>
