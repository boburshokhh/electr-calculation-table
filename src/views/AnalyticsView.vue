<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useWireStore } from '@/stores/wires'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

const store = useWireStore()
const canvasRef = ref(null)
let chart

const chartType = ref('current1')
const chartTypes = [
  { label: '1 провод', value: 'current1' },
  { label: '2 провода', value: 'current2' },
  { label: '3 провода', value: 'current3' },
  { label: '4 провода', value: 'current4' },
  { label: '5 проводов', value: 'current5' },
  { label: '6 проводов', value: 'current6' }
]

function updateChart() {
  if (!chart) return
  
  const dataset = chartTypes.find(t => t.value === chartType.value)
  chart.data.datasets[0] = {
    label: `Ток ${dataset.label} от сечения (мм²)`,
    data: store.wireDatabase.map(w => w[chartType.value]),
    borderColor: '#4f46e5',
    backgroundColor: 'rgba(79,70,229,0.15)',
    tension: 0.3,
    pointRadius: 4,
    pointHoverRadius: 6
  }
  chart.update()
}

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: store.wireDatabase.map(w => String(w.section)),
      datasets: [{
        label: 'Ток (А) от сечения (мм²)',
        data: store.wireDatabase.map(w => w.current1),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79,70,229,0.15)',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: { display: false }
      },
      interaction: { mode: 'index', intersect: false },
      scales: { 
        y: { beginAtZero: true },
        x: { title: { display: true, text: 'Сечение (мм²)' } }
      }
    }
  })
})

onUnmounted(() => { if (chart) { chart.destroy(); chart = undefined } })
</script>

<template>
  <q-page padding>
    <div class="text-h6 q-mb-md">
      <q-icon name="analytics" class="q-mr-sm" />
      Аналитика и графики
    </div>

    <!-- Chart Controls -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md">Выберите тип графика</div>
        <q-select
          v-model="chartType"
          :options="chartTypes"
          emit-value
          map-options
          outlined
          @update:model-value="updateChart"
          class="q-mb-md"
        />
      </q-card-section>
    </q-card>

    <!-- Chart -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div style="height: 350px; position: relative;">
          <canvas ref="canvasRef"></canvas>
        </div>
      </q-card-section>
    </q-card>

    <!-- Stats Grid -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6 col-sm-3">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="cable" size="2rem" color="primary" />
            <div class="text-h5 text-primary q-mt-sm">{{ store.wireDatabase.length }}</div>
            <div class="text-caption">Всего типов проводов</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-sm-3">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="trending_down" size="2rem" color="secondary" />
            <div class="text-h5 text-secondary q-mt-sm">{{ Math.min(...store.wireDatabase.map(w => w.current1)).toFixed(3) }}</div>
            <div class="text-caption">Минимальный ток (А)</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-sm-3">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="trending_up" size="2rem" color="accent" />
            <div class="text-h5 text-accent q-mt-sm">{{ Math.max(...store.wireDatabase.map(w => w.current1)).toFixed(3) }}</div>
            <div class="text-caption">Максимальный ток (А)</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-sm-3">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="insights" size="2rem" color="warning" />
            <div class="text-h5 text-warning q-mt-sm">{{ (store.wireDatabase.reduce((s, w) => s + w.current1, 0) / store.wireDatabase.length).toFixed(3) }}</div>
            <div class="text-caption">Средний ток (А)</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Additional Analysis -->
    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Дополнительная информация</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="text-subtitle2 q-mb-sm">Распределение по сечению</div>
            <div class="row">
              <div class="col-6">
                <div class="text-body2">Малые (< 0.5 мм²):</div>
                <div class="text-weight-bold text-primary">
                  {{ store.wireDatabase.filter(w => w.section < 0.5).length }} типов
                </div>
              </div>
              <div class="col-6">
                <div class="text-body2">Большие (≥ 1.0 мм²):</div>
                <div class="text-weight-bold text-secondary">
                  {{ store.wireDatabase.filter(w => w.section >= 1.0).length }} типов
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="text-subtitle2 q-mb-sm">Эффективность</div>
            <div class="text-body2">
              Самый эффективный провод (ток/сечение):
              <div class="text-weight-bold text-accent q-mt-xs">
                {{ (() => {
                  const ratios = store.wireDatabase.map(w => ({ section: w.section, ratio: w.current1 / w.section }))
                  const best = ratios.reduce((a, b) => a.ratio > b.ratio ? a : b)
                  return `${best.section} мм² (${best.ratio.toFixed(3)} А/мм²)`
                })() }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>


