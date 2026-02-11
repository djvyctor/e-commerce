<template>
  <div class="wave-chart-wrap">
    <div class="wave-bg" aria-hidden="true">
      <svg class="wave-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
        <path class="wave-path wave-path-1" d="M0,60 Q50,30 100,60 T200,60 T300,60 T400,60" fill="none" stroke="currentColor" stroke-width="1" />
        <path class="wave-path wave-path-2" d="M0,70 Q80,40 160,70 T320,70 T480,70" fill="none" stroke="currentColor" stroke-width="1" />
        <path class="wave-path wave-path-3" d="M0,50 Q40,80 80,50 T160,50 T240,50 T320,50 T400,50" fill="none" stroke="currentColor" stroke-width="1" />
      </svg>
    </div>
    <div class="chart-layer">
      <Line :data="staticChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const staticChartData = computed(() => {
  const source = props.chartData
  if (!source?.datasets?.length) return source
  const dataset = source.datasets[0]
  return {
    ...source,
    datasets: [{
      ...dataset,
      tension: 0.5,
      fill: true,
      borderColor: dataset.borderColor ?? '#60A5FA',
      backgroundColor: dataset.backgroundColor ?? 'rgba(96, 165, 250, 0.15)',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200
  },
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
      grid: { color: 'rgba(255,255,255,0.06)' },
      border: { display: false }
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255,255,255,0.6)' },
      border: { display: false }
    }
  }
}
</script>

<style scoped>
.wave-chart-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
}

.wave-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.wave-svg {
  width: 100%;
  height: 100%;
  color: rgba(96, 165, 250, 0.07);
}

.wave-path {
  animation: wave-drift 18s ease-in-out infinite;
}

.wave-path-2 {
  animation-delay: -6s;
  opacity: 0.7;
}

.wave-path-3 {
  animation-delay: -12s;
  opacity: 0.5;
}

@keyframes wave-drift {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-8%) translateY(2px); }
}

.chart-layer {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
