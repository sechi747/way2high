import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage/HomePage.vue'
import Playground from '@/pages/Playground/Playground.vue'

const routes = [
  { name: 'HomePage', path: '/', component: HomePage },
  { name: 'Playground', path: '/playground', component: Playground },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
