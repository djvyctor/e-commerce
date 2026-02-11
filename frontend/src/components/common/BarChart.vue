<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  horizontal: {
    type: Boolean,
    default: false
  },
  chartOptions: {
    type: Object,
    default: undefined
  }
})

const chartOptions = computed(() => {
  if (props.chartOptions) return props.chartOptions
  return props.horizontal
    ? {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    : { responsive: true }
})
</script>
