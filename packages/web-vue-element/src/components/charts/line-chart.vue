<template>
  <div
    class="line-chart relative overflow-hidden"
    style="width: 100%; height: 250px"
  >
    <canvas ref="chartCanvas"></canvas>
    <div
      v-if="props.title"
      class="absolute top-2 left-2 text-xl font-bold text-gray-700"
    >
      {{ props.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, PropType } from 'vue'
import { Chart, registerables } from 'chart.js'

interface DataItem {
  label: string
  value: number
}

const props = defineProps({
  data: {
    type: Array as PropType<DataItem[]>,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

// Reference to the canvas element
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: any = null

// Register all the controllers, elements, scales and plugins for Chart.js
Chart.register(...registerables)

onMounted(() => {
  console.log('LineChart mounted with data:', props.data) // Debug log
  if (chartCanvas.value) {
    renderChart()
  }
})

watch(
  () => props.data,
  (newData) => {
    console.log('Data updated:', newData) // Debug log
    if (chartInstance) {
      updateChart()
    } else {
      renderChart()
    }
  },
  { deep: true },
)

function renderChart() {
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  console.log('Rendering chart with data:', props.data)

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((item) => item.label),
      datasets: [
        {
          label: props.title,
          data: props.data.map((item) => item.value),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: '时间点',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: props.title,
          },
        },
      },
      plugins: {
        title: {
          display: false, // Use custom title display
        },
      },
    },
  })
}

function updateChart() {
  if (!chartInstance) return

  const maxDataPoints = 10 // Set maximum data points
  let newLabels = props.data.map((item) => item.label)
  let newData = props.data.map((item) => item.value)

  if (newLabels.length > maxDataPoints) {
    newLabels = newLabels.slice(-maxDataPoints)
    newData = newData.slice(-maxDataPoints)
  }

  chartInstance.data.labels = newLabels
  chartInstance.data.datasets[0].data = newData
  chartInstance.update()

  console.log('Updated chart with data:', newLabels, newData) // Debug log
}
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 250px;
}

.line-chart div {
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}
</style>
