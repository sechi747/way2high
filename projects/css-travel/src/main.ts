import { createApp } from 'vue'
import Router from './router'
import App from './App.vue'
import './style/normalize.css'
import 'uno.css'

createApp(App)
  .use(Router)
  .mount('#app')
