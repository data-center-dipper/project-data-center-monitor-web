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

const currentPage = ref(1)
const pageSize = ref(10)

watch(
  [currentPage, pageSize],
  ([newPage, newSize], [oldPage, oldSize]) => {
    if (newPage !== oldPage) {
      emit('qx-current-change', {
        currentPage: newPage,
        pageSize: newSize,
      })
      return
    }
    if (newSize !== oldSize) {
      emit('qx-size-change', {
        currentPage: newPage,
        pageSize: newSize,
      })
    }
  },
  { immediate: true },
)

const emit = defineEmits(['qx-size-change', 'qx-current-change'])
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
