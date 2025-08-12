import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    brand: {
      primary: '#4f46e5',
      secondary: '#7c3aed',
      accent: '#10b981',
      dark: '#1d1d1d',
      positive: '#10b981',
      negative: '#dc2626',
      info: '#3b82f6',
      warning: '#f59e0b'
    }
  }
})

app.mount('#app')
