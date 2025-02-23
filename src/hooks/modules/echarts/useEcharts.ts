import { unref, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { echarts as echartsPlugin } from '@/plugins/index.ts'
import { defaultOptions } from './default-options.ts'

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
