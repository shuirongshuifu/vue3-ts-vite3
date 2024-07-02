import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { register } from "@/utils/register";

const app = createApp(App)

register(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
