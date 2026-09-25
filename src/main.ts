import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Composables use native Vue reactivity — no state management library needed!
app.use(router)

app.mount('#app')
