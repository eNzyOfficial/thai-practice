import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import alphabetData from '../data/alphabet.json'

export const useAlphabetStore = defineStore('alphabet', () => {
  const data = ref(alphabetData)

  const tones = computed(() => data.value.filter(letter => letter.type === 'tone'))
  const consonants = computed(() => data.value.filter(letter => letter.type === 'consonant'))
  const vowels = computed(() => data.value.filter(letter => letter.type === 'vowel'))
  const marks = computed(() => data.value.filter(letter => letter.type === 'mark'))

  const characters = computed(() => data.value.filter(letter => ['consonant', 'vowel'].includes(letter.type)))
  const numbers = computed(() => data.value.filter(letter => letter.type === 'digit'))

  const deadLiveCharacters = computed(() => data.value.filter(letter => [true, false].includes(letter.is_live)))
  const live = computed(() => deadLiveCharacters.value.filter(letter => letter.is_live))
  const dead = computed(() => deadLiveCharacters.value.filter(letter => !letter.is_live))

  const classCharacters = computed(() => data.value.filter(letter => ['low', 'mid', 'high'].includes(letter.class)))
  const lowClass = computed(() => classCharacters.value.filter(letter => letter.class === 'low'))
  const midClass = computed(() => classCharacters.value.filter(letter => letter.class === 'mid'))
  const highClass = computed(() => classCharacters.value.filter(letter => letter.class === 'high'))

  const shortLongCharacters = computed(() => data.value.filter(letter => [true, false].includes(letter.is_short)))
  const short = computed(() => shortLongCharacters.value.filter(letter => letter.length === 'short'))
  const long = computed(() => shortLongCharacters.value.filter(letter => letter.length === 'long'))

  const finalConsonants = computed(() => data.value.filter(letter => !!letter.final_consonant))
  const finalConsonantCharacters = computed(() => finalConsonants.value.map(letter => letter.final_consonant).filter((value, index, self) => self.indexOf(value) === index))

  return {
    data,
    tones,
    consonants,
    vowels,
    marks,
    characters,
    numbers,
    deadLiveCharacters,
    live,
    dead,
    classCharacters,
    lowClass,
    midClass,
    highClass,
    shortLongCharacters,
    short,
    long,
    finalConsonants,
    finalConsonantCharacters
  }
})
