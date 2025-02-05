<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /*是否禁用选择今天之前的日期*/
    disableToday: boolean
    /*开始日期占位符*/
    startPlaceholder: string
    /*结束日期占位符*/
    endPlaceholder: string
  }>(),
  {
    disableToday: true,
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
  },
)

const emits = defineEmits(['startDateChange', 'endDateChange'])

// 开始日期和结束日期
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
// 控制结束日期的禁用状态
const endTimeDisabled = ref<boolean>(true)

// 开始日期禁用日期
const startDisabledDate = (time: Date) => {
  if (props.disableToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
  }
}

// 结束日期禁用日期
const endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value?.getTime() + 1000 * 60 * 60 * 24
  }
}

watch(
  () => startDate.value,
  (val) => {
    if (!val) {
      endTimeDisabled.value = true
      endDate.value = null
    } else {
      emits('startDateChange', val)
      endTimeDisabled.value = false
    }
  },
)

watch(
  () => endDate.value,
  (val) => {
    if (val) {
      emits('endDateChange', {
        startDate: startDate.value,
        endDate: val,
      })
    }
  },
)
</script>

<template>
  <div class="flex">
    <div class="mr-[20px]">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabledDate="startDisabledDate"
        v-bind="$attrs.startOptions"
      />
    </div>
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
