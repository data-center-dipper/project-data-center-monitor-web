<template>
  <qx-card class="mt-3">
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-checkbox-group>
  </qx-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import QxCard from '@/components/Card/src/index.vue'

const emits = defineEmits(['update:indicator'])

const checkList = ref(['cpu_usage', 'memory_usage'])

const options = [
  { label: 'CPU 使用率', value: 'cpu_usage' },
  { label: '内存使用情况', value: 'memory_usage' },
  { label: '磁盘使用率', value: 'disk_usage' },
  { label: '网络带宽', value: 'network_bandwidth' },
  { label: '进程监控', value: 'process_monitoring' },
  { label: '服务可用性', value: 'service_availability' },
  { label: '日志监控', value: 'log_monitoring' },
  { label: '异常警报', value: 'anomaly_alerts' },
  { label: '应用性能', value: 'application_performance' },
  {
    label: '磁盘大小',
    value: 0,
  },
  {
    label: '入站速率/1min',
    value: 1,
  },
  {
    label: '入站速率/5min',
    value: 2,
  },
  {
    label: '出站速率/1min',
    value: 3,
  },
  {
    label: '出站速率/5min',
    value: 4,
  },
  {
    label: '写入速率(条)/1min',
    value: 5,
  },
  {
    label: '写入速率(条)/15min',
    value: 6,
  },
]

watch(checkList, (newVal) => {
  emits('update:indicator', newVal)
})
</script>
