ECharts 配置说明：

官网地址：https://echarts.apache.org/examples/zh/editor.html?c=line-simple

具体源码:

`useECharts.ts`

```typescript
import { unref, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { echarts as echartsPlugin } from '@/plugins/index.ts'

const defaultOptions = {
  grid: {
    left: '0',
    right: '4%',
    bottom: '0%',
    top: '0',
    containLabel: true,
  },

  tooltip: {},
  yAxis: {
    axisLabel: {
      show: true,
      color: '#8c8c8c',
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e8e8e8',
        width: 1,
        type: 'solid',
      },
    },
  },
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e8e8e8',
        width: 1,
        type: 'solid',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#e8e8e8',
        width: 0,
        type: 'solid',
      },
    },
    axisLabel: {
      show: true,
      color: 'rgba(255,255,255, 0.6)',
    },
    axisTick: {
      show: false,
    },
  },
}

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light',
) {
  let chartInstance: echartsPlugin.ECharts | null = null
  let resizeHandler: () => void

  // 初始化echarts
  function initCharts() {
    const el = unref(elRef)
    if (!el) {
      return
    }
    chartInstance = echartsPlugin.init(el, theme)
    addResize()
  }

  // 配置
  function setOptions(options: EChartsOption | any) {
    // 默认配置
    if (!options.grid) {
      options.grid = defaultOptions.grid
    }

    if (!options.tooltip) {
      options.tooltip = defaultOptions.tooltip
    }

    if (options.yAxis) {
      const { axisLine, axisTick } = defaultOptions.yAxis

      if (!options.yAxis.axisLine) {
        options.yAxis.axisLine = axisLine
      }
      if (!options.yAxis.axisTick) {
        options.yAxis.axisTick = axisTick
      }
    }

    if (options.xAxis) {
      const { axisLine, splitLine, axisTick } = defaultOptions.xAxis

      if (!options.xAxis.axisLine) {
        options.xAxis.axisLine = axisLine
      }
      if (!options.xAxis.splitLine) {
        options.xAxis.splitLine = splitLine
      }
      if (!options.xAxis.axisTick) {
        options.xAxis.axisTick = axisTick
      }
    }

    if (unref(elRef).offsetHeight === 0) {
      setTimeout(() => {
        setOptions(options)
      }, 30)
      return
    }

    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts()
          if (!chartInstance) return
        }
        chartInstance.setOption(options)
      }, 30)
    })
  }

  // 监听窗口大小变化
  function addResize() {
    resizeHandler = () => {
      resize()
    }
    window.addEventListener('resize', resizeHandler)
  }

  // 移除监听
  function removeResize() {
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
    }
  }

  // 暴露 resize 方法
  function resize() {
    if (chartInstance) {
      chartInstance.resize()
    }
  }

  // 初始化时创建图表
  initCharts()

  return {
    setOptions,
    addResize,
    removeResize,
    resize,
    echartsPlugin,
  }
}
```

使用示例:

```html
<template>
  <div ref="chartRef" style="width: 100%; height: 400px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useECharts } from './useEcharts'

const chartRef = ref(null)

const { setOptions, removeResize } = useECharts(chartRef)

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
    {
      show: false,
      type: 'continuous',
      seriesIndex: 1,
      dimension: 0,
      min: 0,
      max: dateList.length - 1,
    },
  ],
  title: [
    {
      left: 'center',
      text: 'Y 轴渐变',
    },
    {
      top: '55%',
      left: 'center',
      text: 'X 轴渐变',
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
  xAxis: [
    {
      data: dateList,
    },
    {
      data: dateList,
      gridIndex: 1,
    },
  ],
  yAxis: [
    {},
    {
      gridIndex: 1,
    },
  ],
  grid: [
    {
      bottom: '60%',
    },
    {
      top: '60%',
    },
  ],
  series: [
    {
      type: 'line',
      showSymbol: false,
      data: valueList,
    },
    {
      type: 'line',
      showSymbol: false,
      data: valueList,
      xAxisIndex: 1,
      yAxisIndex: 1,
    },
  ],
}

onMounted(() => {
  setOptions(chartOptions)
})

onUnmounted(() => {
  removeResize()
})
</script>
```

效果:

<img src="https://github.com/user-attachments/assets/e89fd687-60a5-4497-bd03-9ea9c3c07f5e" alt="image-1" />