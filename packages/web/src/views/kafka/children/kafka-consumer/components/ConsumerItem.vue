<template>
  <div class="consumer-item">
    <!-- 表格显示消费者信息 -->
    <el-table :data="[formattedConsumer]" style="width: 100%">
      <el-table-column prop="topicName" ></el-table-column>
      <el-table-column prop="groupId" ></el-table-column>
      <el-table-column prop="businessProperty" ></el-table-column>
      <el-table-column prop="avgConsumeRate" ></el-table-column>
      <el-table-column prop="isDelayed" ></el-table-column>
      <el-table-column prop="lastUpdateTime" ></el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleRealTimeQuery(scope.row)">实时查询</el-button>
          <el-button type="primary" size="small" @click="handleViewHistory(scope.row)">查看历史</el-button>
          <el-button type="primary" size="small" @click="handleToggleMonitor(scope.row, true)">开启监控</el-button>
          <el-button type="primary" size="small" @click="handleToggleMonitor(scope.row, false)">关闭监控</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 实时查询弹窗 -->
    <el-dialog v-model="dialogVisibleRealTime" title="实时查询">
      <el-table :data="selectedConsumer.details" style="width: 100%">
        <el-table-column prop="topicName" label="topic名称"></el-table-column>
        <el-table-column prop="partition" label="分区"></el-table-column>
        <el-table-column prop="startOffset" label="数据起点offset"></el-table-column>
        <el-table-column prop="currentOffset" label="当前读取offset"></el-table-column>
        <el-table-column prop="endOffset" label="数据结尾offset"></el-table-column>
        <el-table-column prop="lag" label="延迟lag"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 查看历史弹窗 -->
    <el-dialog v-model="dialogVisibleHistory" title="查看历史">
      <div id="historyChart" style="width: 100%; height: 400px;"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  consumer: Object,
});

// 格式化消费者信息以便在表格中展示
const formattedConsumer = computed(() => ({
  topicName: props.consumer.topic,
  groupId: props.consumer.groupId,
  businessProperty: props.consumer.businessProperty,
  avgConsumeRate: props.consumer.avgConsumeRate,
  isDelayed: props.consumer.isDelayed ? '延迟' : '不延迟',
  lastUpdateTime: props.consumer.lastUpdateTime,
  details: props.consumer.details
}));

// 弹窗控制
const dialogVisibleRealTime = ref(false);
const dialogVisibleHistory = ref(false);
const selectedConsumer = ref(null);

function handleRealTimeQuery(consumer) {
  selectedConsumer.value = consumer;
  dialogVisibleRealTime.value = true;
}

function handleViewHistory(consumer) {
  selectedConsumer.value = consumer;
  dialogVisibleHistory.value = true;

  // 渲染折线图
  onMounted(() => {
    const chartDom = document.getElementById('historyChart');
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }
      ]
    };
    myChart.setOption(option);
  });
}

function handleToggleMonitor(consumer, enable) {
  console.log(`${enable ? '开启' : '关闭'} ${consumer.topicName} 的监控`);
}
</script>

<style scoped>
.consumer-item {
  margin-bottom: 20px;
}
</style>