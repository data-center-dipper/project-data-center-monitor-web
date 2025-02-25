<template>
  <qx-card class="mt-3">
    <div class="flex flex-wrap">
      <div ref="chartRef1" style="width: 50%; height: 350px" class="mb-2"></div>
      <div ref="chartRef2" style="width: 50%; height: 350px" class="mb-2"></div>
      <div ref="chartRef3" style="width: 50%; height: 350px" class="mb-2"></div>
      <div ref="chartRef4" style="width: 50%; height: 350px" class="mb-2"></div>
    </div>
  </qx-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/modules/echarts/useEcharts.ts'
import QxCard from '@/components/Card/src/index.vue'

const chartRef1 = ref(null)
const chartRef2 = ref(null)
const chartRef3 = ref(null)
const chartRef4 = ref(null)

const { removeResize } = useECharts(chartRef1)

const data = [
  ['2000-06-05', 116],
  ['2000-06-06', 129],
  ['2000-06-07', 135],
  ['2000-06-08', 86],
  ['2000-06-09', 73],
  ['2000-06-10', 85],
  ['2000-06-11', 73],
  ['2000-06-12', 68],
  ['2000-06-13', 92],
  ['2000-06-14', 130],
  ['2000-06-15', 245],
  ['2000-06-16', 133],
  ['2000-06-17', 115],
  ['2000-06-18', 111],
  ['2000-06-19', 309],
  ['2000-06-20', 206],
  ['2000-06-21', 137],
  ['2000-06-22', 128],
  ['2000-06-23', 85],
  ['2000-06-24', 94],
  ['2000-06-25', 71],
  ['2000-06-26', 106],
  ['2000-06-27', 84],
  ['2000-06-28', 93],
  ['2000-06-29', 85],
  ['2000-06-30', 73],
  ['2000-07-01', 83],
  ['2000-07-02', 125],
  ['2000-07-03', 107],
  ['2000-07-04', 82],
  ['2000-07-05', 44],
  ['2000-07-06', 72],
  ['2000-07-07', 106],
  ['2000-07-08', 107],
  ['2000-07-09', 66],
  ['2000-07-10', 91],
  ['2000-07-11', 92],
  ['2000-07-12', 113],
  ['2000-07-13', 107],
  ['2000-07-14', 131],
  ['2000-07-15', 111],
  ['2000-07-16', 64],
  ['2000-07-17', 69],
  ['2000-07-18', 88],
  ['2000-07-19', 77],
  ['2000-07-20', 83],
  ['2000-07-21', 111],
  ['2000-07-22', 57],
  ['2000-07-23', 55],
  ['2000-07-24', 60],
]

const dateList = data.map((item) => item[0])
const valueList = data.map((item) => item[1])

const chartOptions = {
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
  ],
  title: {
    left: 'left',
    text: '主题指标图表',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    data: dateList,
  },
  yAxis: {},
  series: [
    {
      type: 'line',
      showSymbol: false,
      data: valueList,
    },
  ],
}

const chartRefs = [chartRef1, chartRef2, chartRef3, chartRef4]

onMounted(() => {
  chartRefs.forEach((chartRef) => {
    useECharts(chartRef).setOptions(chartOptions)
  })
})

onUnmounted(() => {
  removeResize()
})
</script>
