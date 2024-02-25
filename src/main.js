import './assets/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NavBar from './components/NavBar.vue'


const app = createApp(App)

app.component('nav-bar', NavBar) // Daftarkan NavBar sebagai komponen lokal

app.use(router)

app.mount('#app')
