import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConsonantClassView from '../views/ConsonantClassView.vue';
import DeadLiveView from '../views/DeadLiveView.vue';
import ShortLongView from '@/views/ShortLongView.vue';
import CharacterFlashCardView from '../views/CharacterFlashCardView.vue';
import CharacterAudioView from '../views/CharacterAudioView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/consonant-classes',
      name: 'consonant-classes',
      component: ConsonantClassView
    },
    {
      path: '/dead-live',
      name: 'dead-live',
      component: DeadLiveView
    },
    {
      path: '/short-long',
      name: 'short-long',
      component: ShortLongView
    },
    {
      path: '/character-flashcard',
      name: 'character-flashcard',
      component: CharacterFlashCardView
    },
    {
      path: '/character-audio',
      name: 'character-audio',
      component: CharacterAudioView
    },
  ]
})

export default router
