<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TableOptions } from './interface.ts'

const props = defineProps<{
  // 表格配置
  options: TableOptions[]
  // 表格数据
  data: any[]
  // 是否开启分页
  pagination?: boolean
  // 当前是第几页的数据
  currentPage?: number
  // 总共有多少页的数据
  total?: number
  // 每页数量选择器配置
  pageSizes?: number[]
  // 当前每一页一页
  pageSize?: number
  // 分页的排列方式
  paginationLayout?: 'left' | 'center' | 'right'
  // loading 状态时的加载文案
  elementLoadingText?: string
  // 加载的图标名
  elementLoadingSpinner?: string
  // 加载的背景色
  elementLoadingBackground?: string
  // 加载 svg
  elementLoadingSvgViewBox?: string
  // 是否开启Loading 效果
  isLoading?: boolean
}>()

const emits = defineEmits(['size-change', 'current-change'])

// 过滤操作选项之后的配置、以及操作项的配置
const tableOptions = computed(() =>
  props.options.filter((item) => !item.action),
)
const actionOptions = computed(() => props.options.find((item) => item.action))

// 表格数据是否在加载中
const isLoadingComputed = computed(() => {
  if (props.isLoading) {
    return !props.data || !props.data.length
  } else {
    return false
  }
})

// 分页的页数改变
const handleSizeChange = (val: number) => {
  emits('size-change', val)
}

// 分页的页数改变
const handleCurrentChange = (val: number) => {
  emits('current-change', val)
}
</script>

<template>
  <el-table
    v-bind="$attrs"
    :data="data"
    v-loading="isLoadingComputed"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align || 'left'"
        :width="item.width || ''"
      >
        <template #default="scope">
          <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="actionOptions?.label"
      :align="actionOptions?.align || 'left'"
      :width="actionOptions?.width || ''"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <div
    class="flex mt-4"
    :class="{
      'justify-center': paginationLayout === 'center',
      'justify-end': paginationLayout === 'right',
      'justify-start': paginationLayout === 'left',
    }"
  >
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSizes!"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped></style>
