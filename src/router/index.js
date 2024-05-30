import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConsonantsView from '../views/ConsonantView.vue'
import ClassView from '../views/ClassView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/consonants',
      name: 'consonants',
      component: ConsonantsView
    },
    {
      path: '/classes',
      name: 'classes',
      component: ClassView
    },
  ]
})

export default router
