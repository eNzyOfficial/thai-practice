import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import alphabetData from '../data/alphabet.json'

export const useAlphabetStore = defineStore('alphabet', () => {
  const data = ref(alphabetData)

  const tones = computed(() => data.value.filter(letter => letter.type === 'tone'))
  const consonants = computed(() => data.value.filter(letter => letter.type === 'consonant'))
  const vowels = computed(() => data.value.filter(letter => letter.type === 'vowel'))

  const characters = computed(() => data.value.filter(letter => ['consonant', 'vowel'].includes(letter.type)))
  const numbers = computed(() => data.value.filter(letter => letter.type === 'digit'))
  const live = computed(() => data.value.filter(letter => letter.is_live))
  const dead = computed(() => data.value.filter(letter => !letter.is_live))

  const classCharacters = computed(() => data.value.filter(letter => ['low', 'mid', 'high'].includes(letter.class)))
  const lowClass = computed(() => classCharacters.value.filter(letter => letter.class === 'low'))
  const midClass = computed(() => classCharacters.value.filter(letter => letter.class === 'mid'))
  const highClass = computed(() => classCharacters.value.filter(letter => letter.class === 'high'))

  function getClasses(classesArray) {
    return data.value.filter(letter => classesArray.includes(letter.class))
  }

  return {
    data,
    tones,
    consonants,
    vowels,
    characters,
    numbers,
    live,
    dead,
    classCharacters,
    lowClass,
    midClass,
    highClass,
    getClasses
  }
})
