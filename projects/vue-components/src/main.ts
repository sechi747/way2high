import { createApp } from 'vue'
import App from './App.vue'
import { MessagePlugin } from '@/components/message/index'

createApp(App).use(MessagePlugin).mount('#app')
