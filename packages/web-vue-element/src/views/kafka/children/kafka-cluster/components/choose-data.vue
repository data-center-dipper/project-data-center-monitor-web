<script setup lang="ts">
import { ref, watch } from 'vue'

// 定义并设置默认值给组件属性（props）
const props = withDefaults(
  defineProps<{
    /* 是否禁用选择今天之前的日期 */
    disableToday: boolean,
    /* 开始日期占位符 */
    startPlaceholder: string,
    /* 结束日期占位符 */
    endPlaceholder: string,
  }>(),
  {
    // 设置默认值
    disableToday: true,
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
  },
)

// 定义事件发射器，用于触发父组件监听的事件
const emits = defineEmits(['startDateChange', 'endDateChange'])

// 定义响应式变量：开始日期和结束日期
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

// 控制结束日期的选择是否被禁用
const endTimeDisabled = ref<boolean>(true)

// 开始日期禁用规则函数，如果disableToday为true，则不允许选择今天之前的日期
const startDisabledDate = (time: Date) => {
  if (props.disableToday) {
    // 禁用今天之前的日期
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
  }
}

// 结束日期禁用规则函数，不允许选择开始日期之前的日期
const endDisabledDate = (time: Date) => {
  if (startDate.value) {
    // 禁用在开始日期之前的日期
    return time.getTime() < startDate.value?.getTime() + 1000 * 60 * 60 * 24
  }
}

// 监听开始日期的变化
watch(
  () => startDate.value,
  (val) => {
    if (!val) {
      // 如果开始日期为空，则禁用结束日期选择，并清空结束日期
      endTimeDisabled.value = true
      endDate.value = null
    } else {
      // 触发开始日期变化事件
      emits('startDateChange', val)
      // 允许选择结束日期
      endTimeDisabled.value = false
    }
  },
)

// 监听结束日期的变化
watch(
  () => endDate.value,
  (val) => {
    if (val) {
      // 当选择了结束日期时，触发结束日期变化事件，并传递开始和结束日期
      emits('endDateChange', {
        startDate: startDate.value,
        endDate: val,
      })
    }
  },
)
</script>

<template>
  <!-- 创建一个包含两个日期选择器的容器 -->
  <div class="flex">
    <!-- 开始日期选择器 -->
    <div class="mr-[20px]">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabledDate="startDisabledDate"
        v-bind="$attrs.startOptions"
      />
    </div>
    <!-- 结束日期选择器 -->
    <div>
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endTimeDisabled"
        :disabledDate="endDisabledDate"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<style scoped></style>