<template>
  <div class="line-chart" :style="{ width: '100%', height: '250px' }">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

// Register all the controllers, elements, scales and plugins for Chart.js
Chart.register(...registerables)

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  if (chartCanvas.value) {
    renderChart()
  }
})

watch(
  () => props.data,
  () => {
    if (chartInstance) {
      updateChart()
    } else {
      renderChart()
    }
  },
  { deep: true },
)

function renderChart() {
  const ctx = chartCanvas.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((item) => item.label || ''),
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
          display: true,
          text: props.title,
        },
      },
    },
  })
}

function updateChart() {
  chartInstance.data.labels = props.data.map((item) => item.label || '')
  chartInstance.data.datasets[0].data = props.data.map((item) => item.value)
  chartInstance.update()
}
</script>

<style scoped>
.line-chart {
  margin: 20px 0;
}
</style>
