import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassView from '../views/ClassView.vue'
import DeadLiveView from '../views/DeadLiveView.vue'
import AlphabetFlashCardView from '../views/AlphabetFlashCardView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/classes',
      name: 'classes',
      component: ClassView
    },
    {
      path: '/dead-live',
      name: 'dead-live',
      component: DeadLiveView
    },
    {
      path: '/alphabet-flashcard',
      name: 'alphabet-flashcard',
      component: AlphabetFlashCardView
    },
  ]
})

export default router
