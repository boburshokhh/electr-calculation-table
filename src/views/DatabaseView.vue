<script setup>
import { ref, computed } from 'vue'
import { useWireStore } from '@/stores/wires'

const store = useWireStore()
const searchText = ref('')
const selectedColumns = ref(['current1', 'current2', 'current3'])

const filteredWires = computed(() => {
  if (!searchText.value) return store.expandedRows
  return store.expandedRows.filter(wire => 
    wire.section.toString().includes(searchText.value) ||
    wire.current1.toString().includes(searchText.value)
  )
})

const columns = [
  { name: 'index', label: '№', field: 'index', align: 'center' },
  { name: 'section', label: 'Сечение (мм²)', field: 'section', align: 'center', sortable: true },
  { name: 'current1', label: '1 провод (А)', field: 'current1', align: 'center', sortable: true },
  { name: 'current2', label: '2 провода (А)', field: 'current2', align: 'center', sortable: true },
  { name: 'current3', label: '3 провода (А)', field: 'current3', align: 'center', sortable: true },
  { name: 'current4', label: '4 провода (А)', field: 'current4', align: 'center', sortable: true },
  { name: 'current5', label: '5 проводов (А)', field: 'current5', align: 'center', sortable: true },
  { name: 'current6', label: '6 проводов (А)', field: 'current6', align: 'center', sortable: true },
  { name: 'resistance', label: 'R (Ом/км)', field: 'resistance', align: 'center', sortable: true }
]
</script>

<template>
  <q-page padding>
    <div class="text-h6 q-mb-md">
      <q-icon name="storage" class="q-mr-sm" />
      База данных проводов
    </div>

    <!-- Search -->
    <q-input
      v-model="searchText"
      label="Поиск по сечению или току"
      outlined
      clearable
      class="q-mb-md"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Mobile Card View -->
    <div class="block md:hidden">
      <q-card 
        v-for="(wire, index) in filteredWires" 
        :key="index" 
        class="q-mb-sm"
      >
        <q-card-section>
          <div class="row items-center q-mb-sm">
            <q-chip color="primary" text-color="white" size="sm">
              №{{ index + 1 }}
            </q-chip>
            <q-space />
            <div class="text-h6 text-weight-bold">{{ wire.section }} мм²</div>
          </div>
          
          <q-separator class="q-my-sm" />
          
          <div class="row q-col-gutter-sm">
            <div class="col-6 col-sm-4">
              <div class="text-center">
                <div class="text-weight-bold text-primary">{{ Number(wire.current1).toFixed(3) }}</div>
                <div class="text-caption">1 провод</div>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="text-center">
                <div class="text-weight-bold text-secondary">{{ Number(wire.current2).toFixed(3) }}</div>
                <div class="text-caption">2 провода</div>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="text-center">
                <div class="text-weight-bold text-accent">{{ Number(wire.current3).toFixed(3) }}</div>
                <div class="text-caption">3 провода</div>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="text-center">
                <div class="text-weight-bold text-positive">{{ Number(wire.current4).toFixed(3) }}</div>
                <div class="text-caption">4 провода</div>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="text-center">
                <div class="text-weight-bold text-warning">{{ Number(wire.current5).toFixed(3) }}</div>
                <div class="text-caption">5 проводов</div>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="text-center">
                <div class="text-weight-bold text-info">{{ Number(wire.current6).toFixed(3) }}</div>
                <div class="text-caption">6 проводов</div>
              </div>
            </div>
          </div>
          
          <q-separator class="q-my-sm" />
          
          <div class="text-center">
            <div class="text-weight-bold text-orange">{{ wire.resistance.toFixed(2) }} Ом/км</div>
            <div class="text-caption">Сопротивление</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Desktop Table View -->
    <div class="hidden md:block">
      <q-table
        :rows="filteredWires.map((wire, index) => ({ ...wire, index: index + 1 }))"
        :columns="columns"
        row-key="index"
        flat
        bordered
        :pagination="{ rowsPerPage: 20 }"
        class="wire-table"
      >
        <template v-slot:body-cell-section="props">
          <q-td :props="props">
            <q-chip color="primary" text-color="white" size="sm">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>
        
        <template v-slot:body-cell-current1="props">
          <q-td :props="props">
            <div class="text-weight-bold text-primary">{{ Number(props.value).toFixed(3) }}</div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-current2="props">
          <q-td :props="props">
            <div class="text-weight-bold text-secondary">{{ Number(props.value).toFixed(3) }}</div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-current3="props">
          <q-td :props="props">
            <div class="text-weight-bold text-accent">{{ Number(props.value).toFixed(3) }}</div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-current4="props">
          <q-td :props="props">
            <div class="text-weight-bold text-positive">{{ Number(props.value).toFixed(3) }}</div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-current5="props">
          <q-td :props="props">
            <div class="text-weight-bold text-warning">{{ Number(props.value).toFixed(3) }}</div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-current6="props">
          <q-td :props="props">
            <div class="text-weight-bold text-info">{{ Number(props.value).toFixed(3) }}</div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-resistance="props">
          <q-td :props="props">
            <div class="text-weight-bold text-orange">{{ props.value.toFixed(2) }}</div>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Stats -->
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Статистика базы</div>
        <div class="row q-col-gutter-md">
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h5 text-primary">{{ store.wireDatabase.length }}</div>
            <div class="text-caption">Всего типов</div>
          </div>
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h5 text-secondary">{{ Math.min(...store.wireDatabase.map(w => w.current1)).toFixed(3) }}</div>
            <div class="text-caption">Мин. ток (А)</div>
          </div>
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h5 text-accent">{{ Math.max(...store.wireDatabase.map(w => w.current1)).toFixed(3) }}</div>
            <div class="text-caption">Макс. ток (А)</div>
          </div>
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h5 text-warning">{{ (store.wireDatabase.reduce((s, w) => s + w.current1, 0) / store.wireDatabase.length).toFixed(3) }}</div>
            <div class="text-caption">Средний ток (А)</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.wire-table {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .block {
    display: block !important;
  }
  .hidden {
    display: none !important;
  }
}

@media (min-width: 769px) {
  .md\:block {
    display: block !important;
  }
  .md\:hidden {
    display: none !important;
  }
}
</style>


