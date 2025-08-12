<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const active = ref(route.name || 'calculator')

watch(() => route.name, (n) => { active.value = n })

function go(name) {
  if (name !== route.name) router.push({ name })
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1><i class="fas fa-bolt"></i> Калькулятор подбора проводов</h1>
      <p>Профессиональный инструмент для подбора оптимальных комбинаций проводов</p>
    </div>

    <div class="main-content">
      <div class="tabs">
        <button class="tab-button" :class="{ active: active==='calculator' }" @click="go('calculator')">
          <i class="fas fa-calculator"></i>
          Калькулятор
        </button>
        <button class="tab-button" :class="{ active: active==='database' }" @click="go('database')">
          <i class="fas fa-database"></i>
          База проводов
        </button>
        <button class="tab-button" :class="{ active: active==='analytics' }" @click="go('analytics')">
          <i class="fas fa-chart-line"></i>
          Аналитика
        </button>
      </div>

      <router-view />
    </div>
  </div>
</template>

<style scoped></style>


