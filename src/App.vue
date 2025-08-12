<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentTab = computed(() => route.name || 'calculator')

function setTab(tabName) {
  if (tabName !== route.name) {
    router.push({ name: tabName })
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-avatar>
          <q-icon name="bolt" />
        </q-avatar>
        <q-toolbar-title>
          Калькулятор проводов
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer class="bg-white text-primary">
      <q-tabs
        v-model="currentTab"
        dense
        active-color="primary"
        indicator-color="primary"
        class="text-grey"
        align="justify"
      >
        <q-tab 
          name="calculator" 
          icon="calculate" 
          label="Калькулятор"
          @click="setTab('calculator')"
        />
        <q-tab 
          name="database" 
          icon="storage" 
          label="База"
          @click="setTab('database')"
        />
        <q-tab 
          name="analytics" 
          icon="analytics" 
          label="Аналитика"
          @click="setTab('analytics')"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style>
.q-layout {
  height: 100vh;
}
</style>
