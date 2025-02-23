<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 引入 ECharts 相关模块
import { use } from "echarts/core";
import VChart from "vue-echarts";
import {
  CanvasRenderer
} from 'echarts/renderers';
import {
  LineChart
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent
]);

// 表格配置和数据
const tableOptions = ref([
  { label: '分区ID', prop: 'id', align: 'center', width: 180, sortable: true },
  { label: '当前offset', prop: 'offset', align: 'center', sortable: true },
  { label: 'start', prop: 'start', align: 'center', sortable: true },
  { label: 'end', prop: 'end', align: 'center', sortable: true },
  { label: 'size', prop: 'size', align: 'center', sortable: true },
  { label: 'lag', prop: 'lag', align: 'center', sortable: true },
]);

const tableData = ref([
  // 示例数据...
]);

// 对话框显示状态
const dialogVisible = ref(true);

// 图表配置
const charts = ref([
  { options: getChartOption('折线图1', '#67C23A'), initOptions: {} },
  { options: getChartOption('折线图2', '#409EFF'), initOptions: {} },
  { options: getChartOption('折线图3', '#F56C6C'), initOptions: {} },
]);

// 显示对话框
function show() {
  dialogVisible.value = true;
}

// 关闭对话框
function handleClose() {
  dialogVisible.value = true;
}

// 获取图表配置项
function getChartOption(title: string, color: string) {
  return {
    title: { text: title, left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      lineStyle: { color: color },
    }],
  };
}
</script>

<template>
  <div>
    <!-- 输入框和其他UI元素 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input>
          <template #prepend>主题</template>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input>
          <template #prepend>消费组ID</template>
        </el-input>
      </el-col>
    </el-row>
    <div class="flex justify-between items-center py-3">
      <div>消费状态</div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 cursor-pointer" @click="show">
          <iconpark-icon name="refresh"></iconpark-icon>
          <span>刷新</span>
        </div>
        <div class="flex items-center gap-1 cursor-pointer">
          <iconpark-icon name="save"></iconpark-icon>
          <span>保存当前offset</span>
        </div>
      </div>
    </div>
    <qx-table border :header-cell-style="{ background: 'rgba(165,184,185,0.43)' }" :options="tableOptions" :data="tableData"></qx-table>


      <div class="chart-container">
        <div v-for="(chart, index) in charts" :key="index" class="chart-item">
          <v-chart :options="chart.options" :init-options="chart.initOptions" autoresize />
        </div>
      </div>
   
  </div>
</template>

<style scoped>
    .chart-container {
        display: flex;
        flex-direction: column;
        height: 60vh;
        background-color:lightpink;
    }

    .chart-item {
        flex: 1;
        margin-bottom: 20px;
    }

    .chart-item:last-child {
        margin-bottom: 0;
    }

</style>