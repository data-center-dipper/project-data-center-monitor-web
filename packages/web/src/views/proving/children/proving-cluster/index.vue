<template>
  <div ref="chartContainer" style="width: 600px; height: 400px;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'LineChart',
  setup() {
    const chartContainer = ref<HTMLDivElement | null>(null);
    let chartInstance: echarts.ECharts | null = null;

    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose();
      }

      if (chartContainer.value) {
        chartInstance = echarts.init(chartContainer.value);

        const option = {
          title: {
            text: 'ECharts Example'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        chartInstance.setOption(option);
      }
    };

    onMounted(() => {
      initChart();
    });

    return {
      chartContainer
    };
  }
});
</script>

<style scoped>
/* 在这里添加样式 */
</style>