<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useWireStore } from '@/stores/wires'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useWireStore()

const state = reactive({
  inputCurrent: '',
  tolerance: 0.040,
  maxWires: 4,
  sortBy: 'wires',
})

const isCalculating = ref(false)
const hasSearched = ref(false)
const results = ref([])
const showSettings = ref(false)

const bestResult = computed(() => results.value[0])

const sortedResults = computed(() => {
  const sorted = [...results.value]
  const target = parseFloat((state.inputCurrent || '').replace(',', '.')) || 0
  switch (state.sortBy) {
    case 'wires':
      return sorted.sort((a, b) => a.wires.length === b.wires.length ? a.difference - b.difference : a.wires.length - b.wires.length)
    case 'accuracy':
      return sorted.sort((a, b) => a.difference - b.difference)
    case 'total':
      return sorted.sort((a, b) => Math.abs(a.totalCurrent - target) - Math.abs(b.totalCurrent - target))
    default:
      return sorted
  }
})

function exportResults() {
  const data = sortedResults.value.map((r, i) => ({
    rank: i + 1,
    totalCurrent: r.totalCurrent,
    wires: r.wires.map(w => `${w.section}мм²(${w.current}А)`).join(' + '),
    difference: r.difference,
  }))
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'wire-combinations.json'
  a.click()
  URL.revokeObjectURL(url)
  
  $q.notify({
    type: 'positive',
    message: 'Результаты экспортированы',
    position: 'top'
  })
}

function formatNum(n, digits = 3) {
  return Number(n).toFixed(digits)
}

async function calculateCombinations() {
  const raw = (state.inputCurrent || '').trim()
  if (!raw) {
    $q.notify({
      type: 'warning',
      message: 'Введите значение тока',
      position: 'top'
    })
    return
  }
  const target = parseFloat(raw.replace(',', '.'))
  if (!Number.isFinite(target)) {
    $q.notify({
      type: 'negative',
      message: 'Некорректное значение тока',
      position: 'top'
    })
    return
  }

  isCalculating.value = true
  hasSearched.value = true
  await nextTick()

  const wires = store.normalizedWires
  const found = []

  function tryPush(combo) {
    const total = combo.reduce((s, w) => s + w.current, 0)
    const diff = Math.abs(total - target)
    if (diff <= state.tolerance) {
      found.push({ wires: combo, totalCurrent: formatNum(total), difference: diff })
    }
  }

  // 1..maxWires комбинации (с повторениями)
  const max = Math.max(1, Math.min(state.maxWires, 10))

  function backtrack(startIndex, depth, current) {
    if (depth > 0) tryPush([...current])
    if (depth === max) return
    for (let i = startIndex; i < wires.length; i++) {
      current.push(wires[i])
      backtrack(i, depth + 1, current)
      current.pop()
    }
  }
  backtrack(0, 0, [])

  // сортировка по умолчанию: по длине, затем по погрешности
  found.sort((a, b) => a.wires.length === b.wires.length ? a.difference - b.difference : a.wires.length - b.wires.length)
  results.value = found
  isCalculating.value = false
  
  if (found.length === 0) {
    $q.notify({
      type: 'info',
      message: 'Комбинации не найдены. Попробуйте увеличить погрешность.',
      position: 'top'
    })
  } else {
    $q.notify({
      type: 'positive',
      message: `Найдено ${found.length} комбинаций`,
      position: 'top'
    })
  }
}
</script>

<template>
  <q-page padding>
    <!-- Input Section -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">
          <q-icon name="bolt" class="q-mr-sm" />
          Необходимый ток
        </div>
        
        <q-input
          v-model="state.inputCurrent"
          label="Введите ток (А)"
          placeholder="Например: 0.312 или 0,360"
          outlined
          type="number"
          step="0.001"
          @keyup.enter="calculateCombinations"
          class="q-mb-md"
        >
          <template v-slot:append>
            <q-icon name="bolt" />
          </template>
        </q-input>
        
        <div class="text-caption text-grey-6 q-mb-md">
          Допустимая погрешность: ±{{ state.tolerance }} А
        </div>
        
        <div class="row q-gutter-sm">
          <q-btn
            @click="calculateCombinations"
            :loading="isCalculating"
            color="primary"
            icon="search"
            label="Подобрать"
            class="col"
            size="lg"
          />
          <q-btn
            @click="showSettings = !showSettings"
            color="secondary"
            icon="settings"
            outline
            class="col-auto"
            size="lg"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- Settings Panel -->
    <q-slide-transition>
      <q-card v-show="showSettings" class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            <q-icon name="settings" class="q-mr-sm" />
            Настройки поиска
          </div>
          
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-4">
              <q-input
                v-model.number="state.tolerance"
                label="Погрешность (А)"
                type="number"
                step="0.001"
                min="0.001"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-input
                v-model.number="state.maxWires"
                label="Макс. проводов"
                type="number"
                min="1"
                max="10"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-select
                v-model="state.sortBy"
                label="Сортировка"
                :options="[
                  {label: 'По количеству проводов', value: 'wires'},
                  {label: 'По точности', value: 'accuracy'},
                  {label: 'По общему току', value: 'total'}
                ]"
                emit-value
                map-options
                outlined
                dense
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-slide-transition>

    <!-- Results Stats -->
    <div v-if="results.length > 0" class="row q-col-gutter-sm q-mb-md">
      <div class="col-4">
        <q-card class="text-center">
          <q-card-section class="q-pa-sm">
            <div class="text-h5 text-primary">{{ results.length }}</div>
            <div class="text-caption">Найдено</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="text-center">
          <q-card-section class="q-pa-sm">
            <div class="text-h5 text-secondary">{{ bestResult?.wires.length || 0 }}</div>
            <div class="text-caption">Мин. проводов</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="text-center">
          <q-card-section class="q-pa-sm">
            <div class="text-h5 text-accent">{{ ((bestResult?.difference||0) * 1000).toFixed(0) }}</div>
            <div class="text-caption">мА точность</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Results List -->
    <div v-if="results.length > 0">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">Результаты</div>
        <q-btn
          @click="exportResults"
          color="purple"
          icon="download"
          label="Экспорт"
          outline
          dense
        />
      </div>
      
      <q-card
        v-for="(result, index) in sortedResults"
        :key="index"
        class="q-mb-sm"
      >
        <q-card-section>
          <div class="row items-center q-mb-sm">
            <q-chip color="orange" text-color="white" icon="trophy">
              #{{ index + 1 }}
            </q-chip>
            <q-space />
            <div class="text-h6 text-primary">{{ result.totalCurrent }} А</div>
          </div>
          
          <div class="q-mb-sm">
            <q-chip
              v-for="(wire, wireIndex) in result.wires"
              :key="wireIndex"
              color="primary"
              text-color="white"
              class="q-mr-xs q-mb-xs"
            >
              {{ wire.section }}мм² ({{ wire.current }}А)
            </q-chip>
          </div>
          
          <q-separator class="q-my-sm" />
          
          <div class="row q-col-gutter-sm text-center">
            <div class="col-3">
              <div class="text-weight-bold text-positive">{{ result.wires.length }}</div>
              <div class="text-caption">Проводов</div>
            </div>
            <div class="col-3">
              <div class="text-weight-bold text-warning">{{ (result.difference * 1000).toFixed(1) }}</div>
              <div class="text-caption">мА погрешность</div>
            </div>
            <div class="col-3">
              <div class="text-weight-bold text-info">{{ ((1 - result.difference / parseFloat((state.inputCurrent||'0').replace(',', '.'))) * 100).toFixed(1) }}</div>
              <div class="text-caption">% точность</div>
            </div>
            <div class="col-3">
              <q-btn
                @click="navigator.clipboard.writeText(result.wires.map(w=>`${w.section}мм²(${w.current}А)`).join(' + '))"
                icon="content_copy"
                size="sm"
                color="grey-6"
                flat
                round
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- No Results -->
    <q-card v-else-if="state.inputCurrent && !isCalculating && hasSearched">
      <q-card-section class="text-center">
        <q-icon name="search_off" size="4rem" color="grey-5" />
        <div class="text-h6 q-mt-md">Комбинации не найдены</div>
        <div class="text-body2 text-grey-6">
          Попробуйте увеличить допустимую погрешность или изменить целевой ток
        </div>
      </q-card-section>
    </q-card>

    <!-- Loading -->
    <q-card v-if="isCalculating">
      <q-card-section class="text-center">
        <q-spinner size="3rem" color="primary" />
        <div class="text-h6 q-mt-md">Подбираю комбинации...</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>


