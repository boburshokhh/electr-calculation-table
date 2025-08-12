import { createRouter, createWebHistory } from 'vue-router'

const Calculator = () => import('@/views/CalculatorView.vue')
const Database = () => import('@/views/DatabaseView.vue')
const Analytics = () => import('@/views/AnalyticsView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/calculator' },
    { path: '/calculator', name: 'calculator', component: Calculator },
    { path: '/database', name: 'database', component: Database },
    { path: '/analytics', name: 'analytics', component: Analytics },
  ],
})

export default router
