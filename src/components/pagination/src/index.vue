<script setup lang="ts">
import { ref, watch } from 'vue'
defineOptions({
  name: 'qx-pagination',
})

const props = defineProps({
  /*分页器的排版方向*/
  justify: {
    type: String,
    default: 'end',
    validator: (value: string) => {
      return ['start', 'center', 'end'].includes(value)
    },
  },
})

// TODO： V-MODEL 优化
const currentPage = ref(1)
const pageSize = ref(10)

watch(currentPage, (newPage) => {
  emit('qx-current-change', newPage)
})

watch(pageSize, (newSize) => {
  emit('qx-size-change', newSize)
})

const emit = defineEmits(['qx-size-change', 'qx-current-change'])

// PREF： 废弃
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
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    ></el-pagination>
  </div>
</template>

<style scoped></style>
