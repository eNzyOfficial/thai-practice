import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConsonantClassView from '../views/ConsonantClassView.vue';
import DeadLiveView from '../views/DeadLiveView.vue';
import ShortLongView from '@/views/ShortLongView.vue';
import CharacterFlashCardView from '../views/CharacterFlashCardView.vue';
import CharacterAudioView from '../views/CharacterAudioView.vue';
import ToneRuleView from '../views/ToneRuleView.vue';
import FinalConsonantView from '../views/FinalConsonantView.vue';
import ConsonantWordView from '../views/ConsonantWordView.vue';
import CharacterInfoView from '../views/CharacterInfoView.vue';
import VowelFormChangeView from '../views/VowelFormChangeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/consonant/classes',
      name: 'consonant-classes',
      component: ConsonantClassView
    },
    {
      path: '/consonant/final',
      name: 'consonant-final',
      component: FinalConsonantView
    },
    {
      path: '/consonant/dead-live',
      name: 'consonant-dead-live',
      component: DeadLiveView
    },
    {
      path: '/consonant/words',
      name: 'consonant-words',
      component: ConsonantWordView
    },
    {
      path: '/vowel/short-long',
      name: 'vowel-short-long',
      component: ShortLongView
    },
    {
      path: '/vowel/form-change',
      name: 'vowel-form-change',
      component: VowelFormChangeView
    },
    {
      path: '/character/flashcard',
      name: 'character-flashcard',
      component: CharacterFlashCardView
    },
    {
      path: '/character/audio',
      name: 'character-audio',
      component: CharacterAudioView
    },
    {
      path: '/character/info',
      name: 'character-info',
      component: CharacterInfoView
    },
    {
      path: '/tone/rules',
      name: 'tone-rules',
      component: ToneRuleView
    }
  ]
})

export default router
