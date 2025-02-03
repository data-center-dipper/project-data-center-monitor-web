<script setup lang="ts">
import { ref, watch } from 'vue';

// 定义并设置默认值给组件属性（props）
const props = withDefaults(
  defineProps<{
    disableToday: boolean,
    startPlaceholder: string,
    endPlaceholder: string,
  }>(),
  {
    disableToday: true,
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
  },
)

const emits = defineEmits(['startDateChange', 'endDateChange'])

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const endTimeDisabled = ref<boolean>(true)

// 开始日期禁用规则函数
const startDisabledDate = (time: Date) => {
  if (props.disableToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }
  return false;
}

// 结束日期禁用规则函数
const endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < new Date(startDate.value).getTime();
  }
  return false;
}

watch(() => startDate.value, (val) => {
  if (!val) {
    endTimeDisabled.value = true;
    endDate.value = null;
    emits('startDateChange', null);
  } else {
    // 确保只在有效日期上调用 toISOString 方法
    const validStartDate = val instanceof Date && !isNaN(val.getTime()) ? new Date(val).toISOString().slice(0, 19).replace('T', ' ') : null;
    emits('startDateChange', validStartDate);
    endTimeDisabled.value = false;
  }
})

watch(() => endDate.value, (val) => {
  if (val) {
    const validEndDate = val instanceof Date && !isNaN(val.getTime()) ? new Date(val).toISOString().slice(0, 19).replace('T', ' ') : '';
    emits('endDateChange', {
      startDate: startDate.value instanceof Date && !isNaN(startDate.value.getTime()) ? new Date(startDate.value).toISOString().slice(0, 19).replace('T', ' ') : null,
      endDate: validEndDate,
    });
  }
})
</script>

<template>
  <!-- 创建一个包含两个日期选择器的容器 -->
  <div class="flex">
    <!-- 开始日期选择器 -->
    <div class="mr-[20px]">
      <el-date-picker
        v-model="startDate"
        type="datetime"
        :placeholder="startPlaceholder"
        :disabledDate="startDisabledDate"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width: 100%;"
      />
    </div>
    <!-- 结束日期选择器 -->
    <div>
      <el-date-picker
        v-model="endDate"
        type="datetime"
        :placeholder="endPlaceholder"
        :disabled="endTimeDisabled"
        :disabledDate="endDisabledDate"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width: 100%;"
      />
    </div>
  </div>
</template>